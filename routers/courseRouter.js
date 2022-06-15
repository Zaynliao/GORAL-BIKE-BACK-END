const { application } = require('express');
const express = require('express');
const router = express.Router();

// 引入 db
const pool = require('../utils/db');

// 取得 course 列表
router.get('/', async (req, res, next) => {
  let [data, fields] = await pool.execute(
    'SELECT * FROM classes LEFT JOIN course_category on classes.course_category_id = course_category.course_category_id WHERE classes.course_valid = ?',
    [1]
  );
  res.json(data);
});

module.exports = router;
