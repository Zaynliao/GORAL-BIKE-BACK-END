const express = require('express');
const router = express.Router();

const pool = require('../utils/db'); // 引入 db

router.get('/', async (req, res, next) => {
  // ------------------------------------ 取得課程難度類別

  let [categoryGroup] = await pool.execute('SELECT * FROM `activity`');
  console.log(categoryGroup);
  res.json({
    data: categoryGroup, // 主資料
  });
});

module.exports = router;
