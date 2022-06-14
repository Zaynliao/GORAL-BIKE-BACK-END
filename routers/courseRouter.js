const { application } = require('express');
const express = require('express');
const router = express.Router();

// 引入 db
const pool = require('../utils/db');

// 取得 course 列表
router.get('/', async (req, res, next) => {
  let [data, fields] = await pool.execute(
    'SELECT classes.course_id, classes.course_category_id, classes.course_title, classes.course_pictures, classes.course_location_id, classes.course_date, classes.course_status_id, classes.course_price, classes.course_content, classes.course_inventory, classes.course_valid FROM classes LEFT JOIN course_category on classes.course_category_id = course_category.course_category_id WHERE classes.course_valid = ?',
    [1]
  );
  res.json(data);
});

module.exports = router;
