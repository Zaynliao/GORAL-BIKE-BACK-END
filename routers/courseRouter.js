const { response, application } = require('express');
const express = require('express');
const router = express.Router();

// 引入 db
const pool = require('../utils/db');

router.get('/', async (req, res, next) => {
  // 取得目前狀態
  let statu = req.query.statu || 1;
  // 取得價錢篩選
  let price = req.query.priceSubmit || [0, 10000];
  // 取得人數篩選
  let person = req.query.personSubmit || [0, 100];
  // 取得目前在第幾頁
  let page = req.query.page || 1;
  // 一頁幾筆
  const perPage = 9;
  // 計算每頁跳過幾筆顯示
  const offset = (page - 1) * perPage;
  // 取得當頁資料

  let [pageResults] = await pool.execute(
    `SELECT * FROM classes, course_category, course_location, course_status, venue WHERE classes.course_valid = ? AND classes.course_category_id = course_category.course_category_id AND classes.course_location_id = course_location.course_location_id AND classes.course_status_id = course_status.course_status_id AND course_location.course_venue_id = venue.id AND classes.course_status_id = ? AND classes.course_price BETWEEN ? AND ? AND classes.course_inventory BETWEEN ? AND ? ORDER BY classes.course_date DESC LIMIT ? OFFSET ? `,
    [1, statu, price[0], price[1], person[0], person[1], perPage, offset]
  );

  // 總筆數
  const total = pageResults.length;
  // 總頁數
  const lastPage = Math.ceil(total / perPage);

  res.json({
    // 儲存跟頁碼有關的資料
    pagination: { total, lastPage, page },

    // 主資料
    data: pageResults,
  });
});

module.exports = router;
