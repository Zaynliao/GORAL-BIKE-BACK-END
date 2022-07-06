const { response } = require('express');
const express = require('express');
const router = express.Router();

// 引入 database
const pool = require('../utils/db');
router.get('/update_rating', async (req, res, next) => {
  for (let index = 1; index < 142; index++) {
    let rating = 4 * Math.random() + 1;
    rating = Math.round(rating * 10) / 10;
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
  const sortMethod = req.query.sortMethod || 'product_id DESC';
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

  let [totalLength] = await pool.execute(
    `SELECT * FROM product WHERE ${query} valid = ? AND product_price BETWEEN ? AND ? ORDER BY ${sortMethod} `,
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
  let offset = (page - 1) * perPage;
  // 取得當頁資料
  let [pageResults] = await pool.execute(
    `SELECT * FROM product WHERE ${query} valid = ? AND product_price BETWEEN ? AND ? ORDER BY ${sortMethod} LIMIT ? OFFSET ? `,
    [...conditionParams, 1, minPrice, maxPrice, perPage, offset]
  );
  if (pageResults.length === 0 && page > 1) {
    page = 1;
    offset = (page - 1) * perPage;
    [pageResults] = await pool.execute(
      `SELECT * FROM product WHERE ${query} valid = ? AND product_price BETWEEN ? AND ? ORDER BY ${sortMethod} LIMIT ? OFFSET ? `,
      [...conditionParams, 1, minPrice, maxPrice, perPage, offset]
    );
  }
  console.log(total)
  console.log(page)
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
router.get('/product_color_picker', async (req, res, next) => {
  const product_id = req.query.product_id || 0;
  // pool.execute(`SELECT color_id FROM product_product_color WHERE product_id = ?`, [bikeID]);
  let [pageResults] = await pool.execute(
    'SELECT GROUP_CONCAT(`product_color`.`color_name`) as color_name,GROUP_CONCAT(`product_color`.`color_value`) as hex_value FROM `product_product_color`,`product_color`,`product` WHERE `product`.`product_id` = `product_product_color`.`product_id` AND `product_product_color`.`product_color_id`=`product_color`.`color_id` AND `product`.`product_id`= ?;',
    [product_id]
  );
  res.json({
    color_name: pageResults[0].color_name,
    hex_value: pageResults[0].hex_value,
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
router.get('/product_color_picker', async (req, res, next) => {
  const product_id = req.query.product_id || 0;
  // pool.execute(`SELECT color_id FROM product_product_color WHERE product_id = ?`, [bikeID]);
  let [pageResults] = await pool.execute(
    'SELECT GROUP_CONCAT(`product_color`.`color_name`) as color_name,GROUP_CONCAT(`product_color`.`color_value`) as hex_value FROM `product_product_color`,`product_color`,`product` WHERE `product`.`product_id` = `product_product_color`.`product_id` AND `product_product_color`.`product_color_id`=`product_color`.`color_id` AND `product`.`product_id`= ?;',
    [product_id]
  );
  res.json({
    color_name: pageResults[0].color_name,
    hex_value: pageResults[0].hex_value,
  });
});
router.get('/product_parts', async (req, res, next) => {
  const product_id = req.query.product_id || 0;
  // pool.execute(`SELECT color_id FROM product_product_color WHERE product_id = ?`, [bikeID]);
  let [pageResults] = await pool.execute(
    'SELECT GROUP_CONCAT(`product_parts`.`product_parts`) as product_parts,GROUP_CONCAT(`product_parts`.`product_parts_images`) as product_parts_images FROM `product_product_parts`,`product_parts`,`product` WHERE `product`.`product_id` = `product_product_parts`.`product_id` AND `product_product_parts`.`product_parts_id`=`product_parts`.`product_parts_id` AND `product`.`product_id`= ?',
    [product_id]
  );
  res.json({
    product_parts_name: pageResults[0].product_parts,
    product_parts_image: pageResults[0].product_parts_images,
  });
});
router.get('/product_check', async (req, res, next) => {
  const product_id = req.query.product_id || 0;
  // pool.execute(`SELECT color_id FROM product_product_color WHERE product_id = ?`, [bikeID]);
  let [pageResults] = await pool.execute(
    'SELECT GROUP_CONCAT(`product_check`.`product_check_name`) as product_check FROM `product_product_check`,`product_check`,`product` WHERE `product`.`product_id` = `product_product_check`.`product_id` AND `product_product_check`.`product_check_id`=`product_check`.`product_check_id` AND `product`.`product_id`= ?',
    [product_id]
  );
  res.json({
    product_check_name: pageResults[0].product_check,
  });
});

module.exports = router;
