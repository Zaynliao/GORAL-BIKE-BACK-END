const { application } = require('express');
const express = require('express');
const router = express.Router();

// 引入 database
const pool = require('../utils/db');

router.get('/', async (req, res, next) => {
  console.log('product');
  let [data, fields] = await pool.execute(
    'SELECT * FROM product WHERE valid = ?', //<----- SQL -SELECT
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
    'SELECT * FROM product WHERE valid = ? ORDER BY product_id DESC LIMIT ? OFFSET ? ',
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
