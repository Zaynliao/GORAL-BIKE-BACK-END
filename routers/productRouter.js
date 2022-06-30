const { response } = require('express');
const express = require('express');
const router = express.Router();

// 引入 database
const pool = require('../utils/db');
router.get('/update_rating', (req, res, next) => {
  for (let index = 1; index < 142; index++) {
    let rating = 4 * Math.random() + 1;
    Math.round(rating * 10) / 10;
    pool.execute(
      `UPDATE product SET product_rating = ${rating} WHERE product.product_id = ${index}`
    );
  }
});
router.get('/product_all', async (req, res, next) => {
  let [productResults] = await pool.execute('SELECT * FROM product');
  res.json(productResults);
});
router.get('/', async (req, res, next) => {
  // console.log('product');
  let [data, fields] = await pool.execute(
    'SELECT * FROM product WHERE valid = ?', //<----- SQL -SELECT
    [1]
  );
  const category = req.query.category || false;
  const brand = req.query.brand || false;
  const minPrice = req.query.minPrice || 0;
  const maxPrice = req.query.maxPrice || 500000;
  const color = req.query.color || false;
  const search = req.query.search ? `%${req.query.search}%` : false;
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

  let query = ``;
  let conditionParams = [];

  if (category) {
    query += ` product_category_id = ? AND `;
    conditionParams.push(category);
  }
  if (brand) {
    query += ` product_brand_id = ? AND `;
    conditionParams.push(brand);
  }
  if (search) {
    query += ` product_name LIKE ? AND`;
    conditionParams.push(search);
  }
  if (color) {
    query += ` product_color = ? AND `;
    conditionParams.push(color);
  }

  // console.log(query);
  // console.log(conditionParams);

  let [pageResults] = await pool.execute(
    `SELECT * FROM product WHERE ${query} valid = ? AND product_price BETWEEN ? AND ? ORDER BY product_id DESC LIMIT ? OFFSET ? `,
    [...conditionParams, 1, minPrice, maxPrice, perPage, offset]
  );

  res.json({
    // 儲存跟頁碼有關的資料
    pagination: { total, lastPage, page },
    // 主資料
    data: pageResults,
  });
});
router.get('/product_id', async (req, res, next) => {
  let [pageResults] = await pool.execute(
    `SELECT * FROM product WHERE product_id = ?`,
    [req.query.product_id]
  );
  res.json({
    data: pageResults,
  });
});
router.get('/product_color', async (req, res, next) => {
  pool.execute(`SELECT color_value FROM product_color`);
  let [pageResults] = await pool.execute(
    'SELECT * FROM product_color WHERE valid = ?',
    [1]
  );
  res.json({
    data: pageResults,
  });
});

router.get('/product_brand', async (req, res, next) => {
  let [brandResults] = await pool.execute('SELECT * FROM product_brand');
  res.json(brandResults);
});

router.get('/product_category', async (req, res, next) => {
  let [categoryResults] = await pool.execute('SELECT * FROM product_category');
  res.json(categoryResults);
});

module.exports = router;
