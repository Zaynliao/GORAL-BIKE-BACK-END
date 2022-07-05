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
router.get('/insert_product_check_142to148', async (req, res, next) => {
  for (let index = 142; index <= 148; index++) {
    let arr = [];
    for (let i = 0; i < 6; i++) {
      let check = [6,5,4,3,2,1];
      await pool.execute(
        "INSERT INTO `product_product_check` (`product_id`, `product_check_id`) VALUES ('" +
          index +
          "', '" +
          check[i] +
          "')"
      );
    }
    // console.log(arr);
  }
});
router.get('/insert_product_check', async (req, res, next) => {
  for (let index = 73; index > 0; index--) {
    let arr = [];
    for (let i = 0; i < 6; i++) {
      let check = Math.round(23 * Math.random() + 1);
      while (arr.indexOf(check) !== -1) {
        check = Math.round(23 * Math.random() + 1);
      }
      arr.push(check);
      await pool.execute(
        "INSERT INTO `product_product_check` (`product_id`, `product_check_id`) VALUES ('" +
          index +
          "', '" +
          check +
          "')"
      );
    }
    // console.log(arr);
  }
});

router.get('/insert_product_parts_142to148', async (req, res, next) => {
  for (let index = 142; index <= 148; index++) {
    let arr = [8,7,6,5,4,1]

    for (let i = 0; i < 6; i++) {
      await pool.execute(
        "INSERT INTO `product_product_parts` (`product_id`, `product_parts_id`) VALUES ('" +
          index +
          "', '" +
          arr[i] +
          "')"
      );
    }
    // console.log(arr);
  }
});

router.get('/insert_product_parts', async (req, res, next) => {
  for (let index = 73; index > 0; index--) {
    let arr = [];
    let random = Math.ceil(9 * Math.random());

    for (let i = 0; i < random; i++) {
      let parts = Math.ceil(9 * Math.random());
      while (arr.indexOf(parts) !== -1) {
        parts = Math.ceil(9 * Math.random());
      }
      arr.push(parts);
      await pool.execute(
        "INSERT INTO `product_product_parts` (`product_id`, `product_parts_id`) VALUES ('" +
          index +
          "', '" +
          parts +
          "')"
      );
    }
    // console.log(arr);
  }
});

router.get('/product_detailed_description_add', async (req, res, next) => {
  for (let i = 1; i <= 142; i++) {
    arr = [
      '單避震高階車款，輕量的CF3碳纖維車體，搭配主流零件規格，RockShox SID避震前叉，Reynold碳纖維輪組，Shimano XT傳動組件與制動系統，S-FLEX高吸震座桿。&break從單避震登山車的問世，發展至今，已讓無數的車友，找到對運動的熱情，對大自然的尊敬，痛快地享受騎乘樂趣，這也似乎成了品牌的使命！在29er大輪徑蔚為潮流後，我們依然提供多種不同組合的產品，讓每個人都能擁有適宜的單避震登山車，使您更有自信地越過一個又一個、最原始的林道挑戰，生活中配伴您的運動好夥伴。無論是碳纖維還是鋁合金車體的BIG.NNE，皆為29er輪徑規格；騎乘幾何，碳纖版與LITE規格的車架，為競賽取向，而TFS與SPEED規格的鋁合金車架，騎乘姿勢較為直挺舒適。依車架材質與多層次零組件搭配，組合出豐富的產品線內容。BIG.NINE車系，可謂是長年造車工藝演化進程的代表性產品，象徵著美利達品牌精神，人人都可以找到合適的自行車，最重要的是，「Made in Taiwan」，就是品質的保證。',
      '輕量高性能競賽級鋁合金單避震登山車，XC\\Marathon適用，2x12傳通配置。',
      '單避震進階車款，輕量的CF3碳纖維車體，Shimano XT傳動組件與制動系統，RockShox Reba避震前叉，相容無內胎系統的輪組，S-FLEX高吸震座桿。&break 從單避震登山車的問世，發展至今，已讓無數的車友，找到對運動的熱情，對大自然的尊敬，痛快地享受騎乘樂趣，這也似乎成了品牌的使命！在29er大輪徑蔚為潮流後，我們依然提供多種不同組合的產品，讓每個人都能擁有適宜的單避震登山車，使您更有自信地越過一個又一個、最原始的林道挑戰，生活中配伴您的運動好夥伴。無論是碳纖維還是鋁合金車體的BIG.NNE，皆為29er輪徑規格；騎乘幾何，碳纖版與LITE規格的車架，為競賽取向，而TFS與SPEED規格的鋁合金車架，騎乘姿勢較為直挺舒適。依車架材質與多層次零組件搭配，組合出豐富的產品線內容。BIG.NINE車系，可謂是長年造車工藝演化進程的代表性產品，象徵著美利達品牌精神，人人都可以找到合適的自行車，最重要的是，「Made in Taiwan」，就是品質的保證。 ',
      '單避震中階車款，輕量的CF3碳纖維車體，Shimano傳動組件與制動系統，RockShox避震前叉，相容無內胎系統的輪組。&break從單避震登山車的問世，發展至今，已讓無數的車友，找到對運動的熱情，對大自然的尊敬，痛快地享受騎乘樂趣，這也似乎成了品牌的使命！在29er大輪徑蔚為潮流後，我們依然提供多種不同組合的產品，讓每個人都能擁有適宜的單避震登山車，使您更有自信地越過一個又一個、最原始的林道挑戰，生活中配伴您的運動好夥伴。無論是碳纖維還是鋁合金車體的BIG.NNE，皆為29er輪徑規格；騎乘幾何，碳纖版與LITE規格的車架，為競賽取向，而TFS與SPEED規格的鋁合金車架，騎乘姿勢較為直挺舒適。依車架材質與多層次零組件搭配，組合出豐富的產品線內容。BIG.NINE車系，可謂是長年造車工藝演化進程的代表性產品，象徵著美利達品牌精神，人人都可以找到合適的自行車，最重要的是，「Made in Taiwan」，就是品質的保證。',
      '單避震初階車款，CF3碳纖維車體，Shimano傳動組件與制動系統，Manitou避震前叉。&break從單避震登山車的問世，發展至今，已讓無數的車友，找到對運動的熱情，對大自然的尊敬，痛快地享受騎乘樂趣，這也似乎成了品牌的使命！在29er大輪徑蔚為潮流後，我們依然提供多種不同組合的產品，讓每個人都能擁有適宜的單避震登山車，使您更有自信地越過一個又一個、最原始的林道挑戰，生活中配伴您的運動好夥伴。無論是碳纖維還是鋁合金車體的BIG.NNE，皆為29er輪徑規格；騎乘幾何，碳纖版與LITE規格的車架，為競賽取向，而TFS與SPEED規格的鋁合金車架，騎乘姿勢較為直挺舒適。依車架材質與多層次零組件搭配，組合出豐富的產品線內容。BIG.NINE車系，可謂是長年造車工藝演化進程的代表性產品，象徵著美利達品牌精神，人人都可以找到合適的自行車，最重要的是，「Made in Taiwan」，就是品質的保證。',
      '最頂規的鋁合金單避震車，採用三種不同的管壁厚度、平整焊接打造的全鋁合金車架，偏競賽設定的騎乘幾何，Manitou避震前叉，Shimano傳動系統。&break從單避震登山車的問世，發展至今，已讓無數的車友，找到對運動的熱情，對大自然的尊敬，痛快地享受騎乘樂趣，這也似乎成了品牌的使命！在29er大輪徑蔚為潮流後，我們依然提供多種不同組合的產品，讓每個人都能擁有適宜的單避震登山車，使您更有自信地越過一個又一個、最原始的林道挑戰，生活中配伴您的運動好夥伴。無論是碳纖維還是鋁合金車體的BIG.NNE，皆為29er輪徑規格；騎乘幾何，碳纖版與LITE規格的車架，為競賽取向，而TFS與SPEED規格的鋁合金車架，騎乘姿勢較為直挺舒適。依車架材質與多層次零組件搭配，組合出豐富的產品線內容。BIG.NINE車系，可謂是長年造車工藝演化進程的代表性產品，象徵著美利達品牌精神，人人都可以找到合適的自行車，最重要的是，「Made in Taiwan」，就是品質的保證。',
      '採用三種不同的管壁厚度、平整焊接打造的全鋁合金車架，偏競賽設定的騎乘幾何，Manitou避震前叉，Shimano Deore 11s 傳動系統。&break從單避震登山車的問世，發展至今，已讓無數的車友，找到對運動的熱情，對大自然的尊敬，痛快地享受騎乘樂趣，這也似乎成了品牌的使命！在29er大輪徑蔚為潮流後，我們依然提供多種不同組合的產品，讓每個人都能擁有適宜的單避震登山車，使您更有自信地越過一個又一個、最原始的林道挑戰，生活中配伴您的運動好夥伴。無論是碳纖維還是鋁合金車體的BIG.NNE，皆為29er輪徑規格；騎乘幾何，碳纖版與LITE規格的車架，為競賽取向，而TFS與SPEED規格的鋁合金車架，騎乘姿勢較為直挺舒適。依車架材質與多層次零組件搭配，組合出豐富的產品線內容。BIG.NINE車系，可謂是長年造車工藝演化進程的代表性產品，象徵著美利達品牌精神，人人都可以找到合適的自行車，最重要的是，「Made in Taiwan」，就是品質的保證。',
      '採用三種不同的管壁厚度、平整焊接打造的全鋁合金車架，偏競賽設定的騎乘幾何，Shimano 1x11s 傳動系統，Manitou避震前叉，油壓碟煞。&break從單避震登山車的問世，發展至今，已讓無數的車友，找到對運動的熱情，對大自然的尊敬，痛快地享受騎乘樂趣，這也似乎成了品牌的使命！在29er大輪徑蔚為潮流後，我們依然提供多種不同組合的產品，讓每個人都能擁有適宜的單避震登山車，使您更有自信地越過一個又一個、最原始的林道挑戰，生活中配伴您的運動好夥伴。無論是碳纖維還是鋁合金車體的BIG.NNE，皆為29er輪徑規格；騎乘幾何，碳纖版與LITE規格的車架，為競賽取向，而TFS與SPEED規格的鋁合金車架，騎乘姿勢較為直挺舒適。依車架材質與多層次零組件搭配，組合出豐富的產品線內容。BIG.NINE車系，可謂是長年造車工藝演化進程的代表性產品，象徵著美利達品牌精神，人人都可以找到合適的自行車，最重要的是，「Made in Taiwan」，就是品質的保證。',
      '車架為採用平整焊接、雙重管壁厚度的鋁合金管材所打造，較為直挺的騎乘幾何。Shimano XTSLX 2x12傳動系統，油壓碟煞，Manitou避震前叉。&break從單避震登山車的問世，發展至今，已讓無數的車友，找到對運動的熱情，對大自然的尊敬，痛快地享受騎乘樂趣，這也似乎成了品牌的使命！在29er大輪徑蔚為潮流後，我們依然提供多種不同組合的產品，讓每個人都能擁有適宜的單避震登山車，使您更有自信地越過一個又一個、最原始的林道挑戰，生活中配伴您的運動好夥伴。無論是碳纖維還是鋁合金車體的BIG.NNE，皆為29er輪徑規格；騎乘幾何，碳纖版與LITE規格的車架，為競賽取向，而TFS與SPEED規格的鋁合金車架，騎乘姿勢較為直挺舒適。依車架材質與多層次零組件搭配，組合出豐富的產品線內容。BIG.NINE車系，可謂是長年造車工藝演化進程的代表性產品，象徵著美利達品牌精神，人人都可以找到合適的自行車，最重要的是，「Made in Taiwan」，就是品質的保證。',
      '車架為採用平整焊接、雙重管壁厚度的鋁合金管材所打造，較為直挺的騎乘幾何。Shimano SLX 寬齒域傳動系統，油壓碟煞，Manitou避震前叉。&break從單避震登山車的問世，發展至今，已讓無數的車友，找到對運動的熱情，對大自然的尊敬，痛快地享受騎乘樂趣，這也似乎成了品牌的使命！在29er大輪徑蔚為潮流後，我們依然提供多種不同組合的產品，讓每個人都能擁有適宜的單避震登山車，使您更有自信地越過一個又一個、最原始的林道挑戰，生活中配伴您的運動好夥伴。無論是碳纖維還是鋁合金車體的BIG.NNE，皆為29er輪徑規格；騎乘幾何，碳纖版與LITE規格的車架，為競賽取向，而TFS與SPEED規格的鋁合金車架，騎乘姿勢較為直挺舒適。依車架材質與多層次零組件搭配，組合出豐富的產品線內容。BIG.NINE車系，可謂是長年造車工藝演化進程的代表性產品，象徵著美利達品牌精神，人人都可以找到合適的自行車，最重要的是，「Made in Taiwan」，就是品質的保證。 ',
      '車架為採用平整焊接、雙重管壁厚度的鋁合金管材所打造，較為直挺的騎乘幾何。Shimano SLX 寬齒域傳動系統，油壓碟煞，Manitou避震前叉。&從單避震登山車的問世，發展至今，已讓無數的車友，找到對運動的熱情，對大自然的尊敬，痛快地享受騎乘樂趣，這也似乎成了品牌的使命！在29er大輪徑蔚為潮流後，我們依然提供多種不同組合的產品，讓每個人都能擁有適宜的單避震登山車，使您更有自信地越過一個又一個、最原始的林道挑戰，生活中配伴您的運動好夥伴。無論是碳纖維還是鋁合金車體的BIG.NNE，皆為29er輪徑規格；騎乘幾何，碳纖版與LITE規格的車架，為競賽取向，而TFS與SPEED規格的鋁合金車架，騎乘姿勢較為直挺舒適。依車架材質與多層次零組件搭配，組合出豐富的產品線內容。BIG.NINE車系，可謂是長年造車工藝演化進程的代表性產品，象徵著美利達品牌精神，人人都可以找到合適的自行車，最重要的是，「Made in Taiwan」，就是品質的保證。',
    ];
    let random = parseInt(Math.random() * arr.length);
    let randomText = arr[random];
    console.log(randomText);
    await pool.execute(
      `UPDATE product SET product_detail_description = '${randomText}' WHERE product.product_id = ${i}`
    );
  }
});

router.get('/product_description_add', async (req, res, next) => {
  for (let i = 1; i <= 142; i++) {
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
    await pool.execute(
      `UPDATE product SET product_description = '${randomText}' WHERE product.product_id = ${i}`
    );
  }
});

router.get('/product_color_push', async (req, res, next) => {
  for (let i = 73; i >= 1; i--) {
    await pool.execute(
      `INSERT INTO 'product_product_color' ('product_id', 'product_color_id') VALUES ('${i}', '');`
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
  console.log(sortMethod);
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
  const offset = (page - 1) * perPage;
  // 取得當頁資料
  let [pageResults] = await pool.execute(
    `SELECT * FROM product WHERE ${query} valid = ? AND product_price BETWEEN ? AND ? ORDER BY ${sortMethod} LIMIT ? OFFSET ? `,
    [...conditionParams, 1, minPrice, maxPrice, perPage, offset]
  );

  // console.log(pageResults);
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
    'SELECT GROUP_CONCAT(`product_color`.`color_name`) as color_name,GROUP_CONCAT(`product_color`.`color_value`) as hex_value FROM `product_product_color`,`product_color`,`product` WHERE `product`.`product_id` = `product_product_color`.`product_id` AND `product_product_color`.`product_color_id`=`product_color`.`color_id` AND `product`.`product_id`=?;',
    [product_id]
  );
  console.log(pageResults);
  console.log(product_id);
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
  console.log(pageResults);
  console.log(product_id);
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
  console.log(pageResults);
  console.log(product_id);
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
  console.log(pageResults);
  console.log(product_id);
  res.json({
    product_check_name: pageResults[0].product_check
  });
});

module.exports = router;
