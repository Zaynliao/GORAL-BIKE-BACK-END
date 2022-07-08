const express = require('express');
const router = express.Router();
const moment = require('moment');
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

// /api/member/profile/update
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

// /api/member/password/update
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
  // console.log('update result:', result);
  res.json({ code: 0, msg: '密碼修改成功，請重新登入' });
});

router.post('/favorite/update', async (req, res, next) => {
  let favoriteMethod = req.body.favoriteMethod; // 收藏的方法 : product/course/activity

  // 收藏目標 id 不為空才做
  if (req.body.courseId !== '') {
    // 檢查是否有收藏的資料
    let [checkFavorite] = await pool.execute(
      `SELECT * FROM favorite_${favoriteMethod} WHERE favorite_user_id = ? AND favorite_${favoriteMethod}_id = ?`,
      [req.body.userId, req.body.courseId]
    );

    // 有收藏資料則刪除收藏資料 -> 有愛心變成沒愛心
    if (checkFavorite.length > 0) {
      let [deleteFavorite] = await pool.execute(
        `DELETE FROM favorite_${favoriteMethod} WHERE favorite_user_id = ? AND favorite_${favoriteMethod}_id = ?`,
        [req.body.userId, req.body.courseId]
      );
    } else {
      // 沒收藏資料則新增收藏資料 -> 沒愛心變成有愛心
      let [insertFavorite] = await pool.execute(
        `INSERT INTO favorite_${favoriteMethod} (favorite_user_id, favorite_${favoriteMethod}_id) VALUES (?, ?)`,
        [req.body.userId, req.body.courseId]
      );
    }
  }
  res.json({ result: '更新收藏資料成功' });
});

router.get('/favorite/course', async (req, res, next) => {
  let sortMethod = req.query.sortMethod || 'newSort';
  let page = req.query.page || 1;
  let sortCourseMethodString = '';

  switch (sortMethod) {
    case 'oldSort':
      sortCourseMethodString = `ORDER BY course_date ASC`;
      break;
    case 'newSort':
      sortCourseMethodString = `ORDER BY course_date DESC`;
      break;
    case 'cheapSort':
      sortCourseMethodString = `ORDER BY course_price ASC`;
      break;
    case 'expensiveSort':
      sortCourseMethodString = `ORDER BY course_price DESC`;
      break;
  }

  // ------------------------------------ user 收藏資料
  let [favoriteResult] = await pool.execute(
    `SELECT * FROM classes 
    RIGHT JOIN favorite_course 
    ON favorite_course.favorite_course_id = classes.course_id 
    AND favorite_course.favorite_user_id = ? WHERE course_valid = ?`,
    [req.query.userId, 1]
  );

  // ------------------------------------ 分頁資料
  const perPage = 3;
  const offset = (page - 1) * perPage;

  let [favoritePageResults] = await pool.execute(
    `SELECT * FROM classes
    LEFT JOIN course_status ON course_status.course_status_id = classes.course_status_id
    LEFT JOIN course_category ON course_category.course_category_id = classes.course_category_id
    LEFT JOIN course_contents ON course_contents.course_content_id = classes.course_content_id
    LEFT JOIN course_location ON course_location.course_location_id  = classes.course_location_id
    LEFT JOIN venue ON venue.id = course_location.course_venue_id
    RIGHT JOIN favorite_course ON favorite_course.favorite_course_id = classes.course_id 
    AND favorite_course.favorite_user_id = ? 
    WHERE course_valid = ? 
    ${sortCourseMethodString} 
    LIMIT ? 
    OFFSET ?`,
    [req.query.userId, 1, perPage, offset]
  );

  const total = favoriteResult.length; // 總筆數
  const lastPage = Math.ceil(total / perPage); // 總頁數

  res.json({
    pagination: { total, lastPage, page }, // 頁碼資料
    data: favoritePageResults, // 主資料
  });
});

router.get('/favorite/activity', async (req, res, next) => {
  let sortMethod = req.query.sortMethod || 'newSort';
  let page = req.query.page || 1;
  let sortActivityMethodString = '';

  switch (sortMethod) {
    case 'oldSort':
      sortActivityMethodString = `ORDER BY activity.activity_date ASC`;
      break;
    case 'newSort':
      sortActivityMethodString = `ORDER BY activity.activity_date DESC`;
      break;
    case 'cheapSort':
      sortActivityMethodString = `ORDER BY activity.activity_fee ASC`;
      break;
    case 'expensiveSort':
      sortActivityMethodString = `ORDER BY activity.activity_fee DESC`;
      break;
  }

  const perPage = 3;
  const offset = (page - 1) * perPage;

  let [favoriteActivityResult] = await pool.execute(
    `SELECT * FROM activity 
    RIGHT JOIN favorite_activity 
    ON favorite_activity.favorite_activity_id = activity.activity_id 
    AND favorite_activity.favorite_user_id = ? 
    WHERE activity_valid = ? `,
    [req.query.userId, 1]
  );

  let [favoritePageResults] = await pool.execute(
    `SELECT * FROM activity
    LEFT JOIN activity_status 
    ON activity.activity_status_id = activity_status.id
    LEFT JOIN venue 
    ON activity.activity_venue_id = venue.id
    RIGHT JOIN favorite_activity 
    ON favorite_activity.favorite_activity_id = activity.activity_id 
    AND favorite_activity.favorite_user_id = ? 
    WHERE activity_valid = ? 
    ${sortActivityMethodString} 
    LIMIT ? 
    OFFSET ?`,
    [req.query.userId, 1, perPage, offset]
  );

  const total = favoriteActivityResult.length; // 總筆數
  const lastPage = Math.ceil(total / perPage); // 總頁數

  res.json({
    pagination: { total, lastPage, page }, // 頁碼資料
    data: favoritePageResults, // 主資料
  });
});

router.get('/favorite/product', async (req, res, next) => {
  let sortMethod = req.query.sortMethod || 'newSort';
  let page = req.query.page || 1;
  let sortProductMethodString = '';

  switch (sortMethod) {
    case 'oldSort':
      sortProductMethodString = `ORDER BY product.product_update ASC`;
      break;
    case 'newSort':
      sortProductMethodString = `ORDER BY product.product_update DESC`;
      break;
    case 'cheapSort':
      sortProductMethodString = `ORDER BY product.product_price ASC`;
      break;
    case 'expensiveSort':
      sortProductMethodString = `ORDER BY product.product_price DESC`;
      break;
  }

  let [favoriteProductResults] = await pool.execute(
    `SELECT * FROM product RIGHT JOIN favorite_product ON favorite_product.favorite_product_id = product.product_id AND favorite_product.favorite_user_id = ? WHERE valid = ?`,
    [req.query.userId, 1]
  );

  const total = favoriteProductResults.length;
  const perPage = 9;
  const lastPage = Math.ceil(total / perPage);
  const offset = (page - 1) * perPage;

  let [favoritePageResults] = await pool.execute(
    `SELECT * FROM product RIGHT JOIN favorite_product ON favorite_product.favorite_product_id = product.product_id AND favorite_product.favorite_user_id = ? WHERE valid = ? ${sortProductMethodString} LIMIT ? OFFSET ? `,
    [req.query.userId, 1, perPage, offset]
  );
  res.json({
    pagination: { total, lastPage, page },
    data: favoritePageResults, // 主資料
  });
});

router.get('/coupon', async (req, res, next) => {
  let [couponResults] = await pool.execute(
    `SELECT * FROM coupons LEFT JOIN user_coupons ON user_coupons.coupons_id = coupons.id WHERE user_coupons.coupons_user_id = ? AND user_coupons.coupons_is = ?`,
    [req.query.userId, req.query.couponsIs]
  );

  res.json({
    data: couponResults, // 主資料
  });
});

router.get('/coupon/unused', async (req, res, next) => {
  let [couponResults] = await pool.execute(
    `SELECT user_coupons.coupons_id,coupons.coupon_name,coupons.coupon_content,coupon_discount FROM coupons 
    LEFT JOIN user_coupons 
    ON user_coupons.coupons_id = coupons.id 
    WHERE user_coupons.coupons_user_id = ? 
    AND user_coupons.coupons_is = ?
    ORDER BY user_coupons.coupons_id`,
    [req.query.userId, 1]
  );

  res.json({
    data: couponResults, // 主資料
  });
});

module.exports = router;
