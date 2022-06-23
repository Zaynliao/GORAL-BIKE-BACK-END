const express = require('express');
const router = express.Router();

// 引入 database
const pool = require('../utils/db');

router.get('/', async (req, res, next) => {
  //   console.log('news');

  let page = req.query.page || 1;
  // 一頁幾筆
  const perPage = 6;
  // 計算每頁跳過幾筆顯示
  const offset = (page - 1) * perPage;
  // 取得當頁資料

  const [newsResults] = await pool.execute(
    'SELECT `news`.*,`newspicture`.`name` FROM `news_picture`,`newspicture`,`news` WHERE `news_picture`.`news_id`=`news`.`id` AND `news_picture`.`picture_id`=`newspicture`.`id` GROUP BY `news`.`id` ORDER BY `news`.`date` DESC'
  );

  const [newsLimitResults] = await pool.execute(
    'SELECT `news`.*,`newspicture`.`name` FROM `news_picture`,`newspicture`,`news` WHERE `news_picture`.`news_id`=`news`.`id` AND `news_picture`.`picture_id`=`newspicture`.`id` GROUP BY `news`.`id` ORDER BY `news`.`date` DESC  LIMIT ? OFFSET ? ',
    [perPage, offset]
  );

  const [hotNewsResults] = await pool.execute(
    'SELECT `news`.*,`newspicture`.`name` FROM `news_picture`,`newspicture`,`news` WHERE `news_picture`.`news_id`=`news`.`id` AND `news_picture`.`picture_id`=`newspicture`.`id` GROUP BY `news`.`touch` DESC LIMIT 10'
  );

  res.json({
    newsResults: newsResults,
    newsLimitResults: newsLimitResults,
    hotNewsResults: hotNewsResults,
  });
});

router.get('/newsDetail', async (req, res, next) => {
  //   console.log('news');
  let newsID = req.query.newsID || 1;

  const touch = await pool.execute(
    'SELECT touch FROM `news` WHERE `news`.`id` = ?',
    [newsID]
  );
  console.log(touch[0][0].touch);
  const resultTouch = (touch[0][0].touch += 1);
  await pool.execute('UPDATE `news` SET `touch` = ? WHERE `news`.`id` = ?', [
    resultTouch,
    newsID,
  ]);

  const [newsResults] = await pool.execute(
    'SELECT `news`.* FROM `news` WHERE `news`.`id`=?',
    [newsID]
  );

  const [newsPicture] = await pool.execute(
    'SELECT `newspicture`.`name` FROM `news_picture`,`newspicture`,`news` WHERE `news_picture`.`news_id`=`news`.`id` AND `news_picture`.`picture_id`=`newspicture`.`id` AND `news`.`id`=?',
    [newsID]
  );

  res.json({
    newsResults: newsResults,
    newsPicture: newsPicture,
  });
});

module.exports = router;
