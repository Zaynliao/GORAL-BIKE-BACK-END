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
router.get('/product_description_add', async (req, res, next) => {
  for (let i = 1; i <= 141; i++) {
    let random = parseInt(Math.random() * 21);
    arr = [
      '中階碳纖維單避震登山車，適用XC\\Marathon騎乘環境。CF3碳纖維車架，主流零組件搭配。',
      '輕量高性能競賽級鋁合金單避震登山車，XC\\Marathon適用，2x12傳通配置。',
      '輕量高性能競賽級鋁合金單避震登山車，XC\\Marathon適用，Shimano 1X 傳動系統。 ',
      '鋁合金單避震登山車，採用較為直挺的騎乘幾何設定，Shimano XT\\SLX 2x12零組件搭配。',
      '鋁合金單避震登山車，採用較為直挺的騎乘幾何設定，Shimano Deore 2x10組件搭配，Suntour避震前叉。',
      '鋁合金單避震登山車，採用較為直挺的騎乘幾何設定，Shimano 2x9零組件搭配，Suntour避震前叉。',
      '鋁合金單避震登山車，採用較為直挺的騎乘幾何設定，2x9 零組件搭配， RockShox避震前叉。',
      '鋁合金單避震登山車，採用較為直挺的騎乘幾何設定，Shimano 2x8 零組件搭配， Suntour避震前叉。',
      '鋁合金單避震登山車，採用較為直挺的騎乘幾何設定，Shimano 3x8 零組件搭配， Suntour避震前叉。',
      '27.5鋁合金單避震登山車，採用較為直挺的騎乘幾何設定，1x10 傳動系統，100mm行程避震前叉。 ',
      '27.5鋁合金單避震登山車，採用較為直挺的騎乘幾何設定，2x9 傳動系統，RockShox 100mm行程避震前叉。 ',
      '27.5鋁合金單避震登山車，採用較為直挺的騎乘幾何設定，3x8 傳動系統，100mm行程避震前叉。 ',
      'BIG.TRAIL中階車款，長行程避震，林道騎乘幾何，爬坡下坡，享受林道樂趣！ ',
      'BIG.TRAIL入門車款，120mm長行程避震，林道騎乘幾何！',
      'BIG.TRAIL親民車款，長行程避震，林道騎乘幾何！',
      '2021年最受歡迎的BIG.TRAIL車型，合宜的零組件搭配，合宜的售價！',
      '27.5鋁合金單避震登山車，採用較為直挺的騎乘幾何設定，2x8 傳動系統，100mm行程避震前叉。',
      '27.5鋁合金單避震登山車，採用較為直挺的騎乘幾何設定，2x9 傳動系統，100mm行程避震前叉。',
      '27.5鋁合金單避震登山車，採用較為直挺的騎乘幾何設定，2x10 傳動系統，100mm行程避震前叉。',
      '鋁合金單避震登山車，採用較為直挺的騎乘幾何設定，3x9 零組件搭配， RockShox避震前叉。',
    ];
    let randomText = arr[random];
    console.log(randomText);
    await pool.execute(
      `UPDATE product SET product_description = '${randomText}' WHERE product.product_id = ${i}`
    );
  }
});

router.get('/product_color_push', async (req, res, next) => {
  for (let i = 70; i >= 1; i--) {
    await pool.execute(`INSERT INTO 'product_product_color' ('product_id', 'product_color_id') VALUES ('${i}', '');`);
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

  let [totalLength] = await pool.execute(
    `SELECT * FROM product WHERE ${query} valid = ? AND product_price BETWEEN ? AND ? ORDER BY product_id DESC `,
    [...conditionParams, 1, minPrice, maxPrice]
  );
  // 取得目前在第幾頁
  let page = req.query.page || 1;
  // 總筆數
  const total = totalLength.length;
  // 一頁幾筆
  const perPage = 9;
  // 總頁數
  const lastPage = Math.ceil(total / perPage);

  // 計算每頁跳過幾筆顯示
  const offset = (page - 1) * perPage;
  // 取得當頁資料
  let [pageResults] = await pool.execute(
    `SELECT * FROM product WHERE ${query} valid = ? AND product_price BETWEEN ? AND ? ORDER BY product_id DESC LIMIT ? OFFSET ? `,
    [...conditionParams, 1, minPrice, maxPrice, perPage, offset]
  );
  console.log('total', total);
  console.log(lastPage);
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
