const { response, application } = require('express');
const express = require('express');
const router = express.Router();

const pool = require('../utils/db'); // 引入 db

router.get('/', async (req, res, next) => {
  let sortMethod = req.query.sortMethod || 'hotSort'; // 取得排序方法
  {
    switch (sortMethod) {
      case 'hotSort':
        sortMethodString = `ORDER BY (classes.course_enrollment/classes.course_inventory) DESC`;
        break;
      case 'newSort':
        sortMethodString = `ORDER BY classes.course_date DESC`;
        break;
      case 'cheapSort':
        sortMethodString = `ORDER BY classes.course_price ASC `;
        break;
      case 'expensiveSort':
        sortMethodString = `ORDER BY classes.course_price DESC `;
        break;
    }
  }
  let statu = req.query.statu || 1; // 取得目前狀態
  let price = req.query.priceSubmit || [0, 10000]; // 取得價錢篩選
  let person = req.query.personSubmit || [0, 100]; // 取得人數篩選
  let category = req.query.category || [0]; // 取得課程難度
  if (category) {
    categorySQLArray = ` AND classes.course_category_id IN (${category})`;
  }
  {
    category === '' ? (categorySQLArray = '') : categorySQLArray;
  }
  let page = req.query.page || 1; // 取得目前在第幾頁
  const perPage = 9; // 一頁幾筆
  const offset = (page - 1) * perPage; // 計算每頁跳過幾筆顯示

  // ------------------------------------ 取得報名狀態類別

  let [stateGroup] = await pool.execute(`SELECT * FROM course_status`);

  let newStatu = stateGroup.map((v, i) => {
    return v.course_status_name;
  });
  // ------------------------------------ 取得課程難度類別

  let [categoryGroup] = await pool.execute(`SELECT * FROM course_category`);

  let newCategory = categoryGroup.map((v, i) => {
    return v.course_category_name;
  });

  // ------------------------------------ 取得當頁資料

  let [pageResults] = await pool.execute(
    `SELECT * FROM classes, course_category, course_location, course_status, venue WHERE classes.course_valid = ? AND classes.course_category_id = course_category.course_category_id AND classes.course_location_id = course_location.course_location_id AND classes.course_status_id = course_status.course_status_id AND course_location.course_venue_id = venue.id AND classes.course_status_id = ? AND classes.course_price BETWEEN ? AND ? AND classes.course_inventory BETWEEN ? AND ? ${categorySQLArray} ${sortMethodString} LIMIT ? OFFSET ? `,
    [1, statu, price[0], price[1], person[0], person[1], perPage, offset]
  );

  const total = pageResults.length; // 總筆數
  const lastPage = Math.ceil(total / perPage); // 總頁數

  res.json({
    pagination: { total, lastPage, page }, // 頁碼有關的資料
    stateGroup: newStatu, // 課程報名狀態類別
    categoryGroup: newCategory, // 課程難度類別
    data: pageResults, // 主資料
  });
});

router.get('/:courseId', async (req, res, next) => {
  // req.params | 取得網址上的參數
  // req.params.stockId
  let [data] = await pool.execute(
    'SELECT * FROM classes, course_category, course_location, course_status, venue WHERE course_id = ? AND classes.course_category_id = course_category.course_category_id AND classes.course_location_id = course_location.course_location_id AND classes.course_status_id = course_status.course_status_id AND course_location.course_venue_id = venue.id',
    [req.params.courseId]
  );

  res.json({
    data: data,
  });
});
module.exports = router;
