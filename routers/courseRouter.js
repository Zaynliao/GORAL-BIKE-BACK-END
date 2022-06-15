const { application } = require('express');
const express = require('express');
const router = express.Router();

// 引入 db
const pool = require('../utils/db');

router.get('/', async (req, res, next) => {
  let [data, fields] = await pool.execute(
    'SELECT * FROM classes WHERE course_valid = ?',
    [1]
  );

  // 取得目前在第幾頁
  let page = req.query.page || 1;
  // 總筆數
  const total = data.length;
  // 一頁幾筆
  const perPage = 7;
  // 總頁數
  const lastPage = Math.ceil(total / perPage);
  // 計算每頁跳過幾筆顯示
  const offset = (page - 1) * perPage;
  // 取得當頁資料

  let [pageResults] = await pool.execute(
    'SELECT * FROM classes, course_category, course_location, course_status, venue WHERE classes.course_valid = ? AND classes.course_category_id = course_category.course_category_id AND classes.course_location_id = course_location.course_location_id AND classes.course_status_id = course_status.course_status_id AND course_location.course_venue_id = venue.id ORDER BY classes.course_date DESC LIMIT ? OFFSET ? ',
    [1, perPage, offset]
  );

  res.json({
    // 儲存跟頁碼有關的資料
    pagination: { total, lastPage, page },
    // 主資料
    data: pageResults,
  });
});

module.exports = router;
