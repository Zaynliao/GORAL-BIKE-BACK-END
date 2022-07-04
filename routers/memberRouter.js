const express = require('express');
const router = express.Router();
const pool = require('../utils/db'); // 引入 db
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');

const storage = multer.diskStorage({
  // 設定儲存的目的地 （檔案夾）
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'images', 'members'));
  },
  // 重新命名使用者上傳的圖片名稱
  filename: function (req, file, cb) {
    // 剛學習一個新的套件，可以把拿到的物件或變數印出來看看
    // 看看裡面有沒有放什麼有用的東西
    // console.log('multer filename', file);
    // 通常我們會選擇重新命名使用者上傳的圖片名稱
    // 以避免重複的檔名或是惡意名稱，也比較好管理
    let ext = file.originalname.split('.').pop();
    let newFilename = `${Date.now()}.${ext}`;
    cb(null, newFilename);
    // {
    //   fieldname: 'photo',
    //   originalname: 'japan04-200.jpg',
    //   encoding: '7bit',
    //   mimetype: 'image/jpeg'
    // }
  },
});
const uploader = multer({
  // 設定儲存的位置
  storage: storage,
  // 過濾圖片
  // 可以想成是 photo 這個欄位的「資料驗證」
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/png'
    ) {
      cb('這些是不被接受的格式', false);
    } else {
      // cb(錯誤, 結果)
      cb(null, true);
    }
  },
  // 檔案尺寸的過濾
  // 一般不會上傳太大的圖片尺寸，以免到時候前端開啟得很慢
  limits: {
    // 1k = 1024
    fileSize: 200 * 1024,
  },
});

// /api/member/profile
router.get('/profile/:userId', async (req, res, next) => {
  // console.log('註冊的資料', req.body);
  try {
    let [members] = await pool.execute(
      `
    SELECT name,email,phone,photo FROM users 
    WHERE user_id = ?`,
      [req.params.userId]
    );
    let member = members[0];
    // console.log(member);
    res.json({ code: 200, msg: '成功傳送會員資料', data: member });
  } catch (error) {
    res.status(400).json({ code: 3006, error: '發生錯誤，請稍後在試' });
  }
});

// /api/member/update
router.post(
  '/profile/update',
  uploader.single('photo'),
  async (req, res, next) => {
    // console.log('更新的資料', req.body);

    // 確認有沒有這個帳號
    let [check] = await pool.execute('SELECT * FROM users WHERE user_id = ?', [
      req.body.user_id,
    ]);
    if (check.length === 0) {
      // 如果沒有，就回覆錯誤
      // 這個 email 沒有註冊過
      return res.status(400).json({ code: 3003, error: '沒有該用戶' });
    }

    // 圖片處理完成後，會被放在 req 物件裡
    // console.log('req.file', req.file);
    // 最終前端需要的網址: http://localhost:3001/public/members/1655003030907.jpg
    // 可以由後端來組合這個網址，也可以由前端來組合
    // 記得不要把 http://locahost:3001 這個存進資料庫，因為正式環境部署會不同
    // 目前這個專案採用：儲存 members/1655003030907.jpg 這樣格式
    // 使用者不一定有上傳圖片，所以要確認 req 是否有 file
    let photo = req.file ? req.file.filename : '';

    let [members] = await pool.execute(
      `UPDATE users 
      SET photo = ?, 
      name = ?, 
      email = ?, 
      phone = ?  
      WHERE user_id = ?`,
      [photo, req.body.name, req.body.email, req.body.phone, req.body.user_id]
    );
    let returnUser = {
      user_id: req.body.user_id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      photo: photo,
    };
    req.session.user = returnUser;
    // console.log(members);
    res.json({ code: 0, msg: '更新資料成功' });
  }
);

router.post('/password/update', async (req, res) => {
  // 確認有沒有這個帳號
  let [users] = await pool.execute('SELECT * FROM users WHERE user_id = ?', [
    req.body.user_id,
  ]);
  if (users.length === 0) {
    // 如果沒有，就回覆錯誤
    // 這個 email 沒有註冊過
    return res.status(400).json({ code: 3003, error: '沒有該用戶' });
  }
  let user = users[0];

  let passwordCompareResult = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );

  if (passwordCompareResult === false) {
    return res.status(400).json({ code: 3004, error: '舊密碼錯誤' });
  }

  let hashPassword = await bcrypt.hash(req.body.newPassword, 10);

  let [result] = await pool.execute('UPDATE users SET password = ?', [
    hashPassword,
  ]);
  console.log('update result:', result);
  res.json({ code: 0, msg: '密碼修改成功，請重新登入' });
});

router.post('/favorite/update', async (req, res, next) => {
  // console.log('更新的資料', req.body.courseId);
  const userId = 1; // 收藏測試用 userId
  if (req.body.courseId !== '') {
    let [checkFavorite] = await pool.execute(
      `SELECT * FROM course_favorite WHERE favorite_user_id = ? AND favorite_course_id = ?`,
      [userId, req.body.courseId]
    );
    // console.log('是否有資料', checkFavorite);

    if (checkFavorite.length > 0) {
      let [deleteFavorite] = await pool.execute(
        `DELETE FROM course_favorite WHERE favorite_user_id = ? AND favorite_course_id = ?`,
        [userId, req.body.courseId]
      );
      // console.log('刪除資料', deleteFavorite);
    } else {
      let [insertFavorite] = await pool.execute(
        `INSERT INTO course_favorite (favorite_user_id, favorite_course_id) VALUES (?, ?)`,
        [userId, req.body.courseId]
      );
      // console.log('插入資料', insertFavorite);
    }
  }
  res.json({ result: '更新資料成功' });
});

router.get('/favorite', async (req, res, next) => {
  const userId = 1; // 收藏測試用 userId
  let [favoriteResults] = await pool.execute(
    `SELECT * FROM classes
    LEFT JOIN course_status ON course_status.course_status_id = classes.course_status_id
    LEFT JOIN course_category ON course_category.course_category_id = classes.course_category_id
    LEFT JOIN course_contents ON course_contents.course_content_id = classes.course_content_id
    LEFT JOIN course_location ON course_location.course_location_id  = classes.course_location_id
    LEFT JOIN venue ON venue.id = course_location.course_venue_id
    RIGHT JOIN course_favorite ON course_favorite.favorite_course_id = classes.course_id AND course_favorite.favorite_user_id = ? WHERE course_valid = ?`,
    [userId, 1]
  );
  res.json({
    data: favoriteResults, // 主資料
  });
});

module.exports = router;
