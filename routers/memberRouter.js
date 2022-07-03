const express = require('express');
const router = express.Router();
const pool = require('../utils/db'); // 引入 db

// /api/member/profile
router.post('/profile', async (req, res, next) => {
  // console.log('註冊的資料', req.body);

  let [members] = await pool.execute(
    'SELECT user.*, level_name.name AS levelName FROM user JOIN level_name ON user.level = level_name.id WHERE identity_card = ?',
    [req.body.identity_card]
  );
  let member = members[0];
  console.log(member);
  res.json({ member });
});

// /api/member/update
router.post('/update', async (req, res, next) => {
  // console.log('更新的資料', req.body);

  let [members] = await pool.execute(
    'UPDATE user SET img = ?, nick_name = ?, phone = ?  WHERE id = ?',
    [req.body.img, req.body.nick_name, req.body.phone, req.body.id]
  );
  console.log(members);
  res.json({ result: '更新資料成功' });
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
