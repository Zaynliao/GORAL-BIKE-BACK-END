const { response, application } = require('express');
const express = require('express');
const router = express.Router();
const moment = require('moment');

const pool = require('../utils/db'); // 引入 db

///------------------------------------------------------------------------------------- /activity

router.get('/', async (req, res, next) => {
  // ------------------------------------------------------ 不用額外處理的前端網頁字串

  let searchWord = req.query.search || ''; // 取得關鍵字
  let statu = req.query.statu || 1; // 取得目前狀態
  let price = req.query.priceSubmit || [0, 10000]; // 取得價錢篩選
  let person = req.query.personSubmit || [0, 100]; // 取得人數篩選

  // ------------------------------------------------------ 要額外處理的前端網頁字串

  let category = req.query.category || [0]; // 取得難度

  let sortMethod = req.query.sortMethod || 'hotSort'; // 取得排序方法
  {
    switch (sortMethod) {
      case 'hotSort':
        sortMethodString = `ORDER BY activity.activity_persons DESC`;
        break;
      case 'newSort':
        sortMethodString = `ORDER BY activity.activity_date DESC`;
        break;
      case 'cheapSort':
        sortMethodString = `ORDER BY activity.activity_fee ASC`;
        break;
      case 'expensiveSort':
        sortMethodString = `ORDER BY activity.activity_fee DESC`;
        break;
    }
  }

  let page = req.query.page || 1; // 取得目前在第幾頁

  const perPage = 9; // 一頁幾筆
  const offset = (page - 1) * perPage; // 計算每頁跳過幾筆顯示

  // ------------------------------------ 取得報名狀態類別

  let [stateGroup] = await pool.execute(`SELECT * FROM activity_status`);

  let newStatu = stateGroup.map((v, i) => {
    return v.activity_status_name;
  });

  // ------------------------------------ 取得課程難度類別

  let [categoryGroup] = await pool.execute(`SELECT * FROM venue`);

  let newCategory = categoryGroup.map((v, i) => {
    return v.venue_name;
  });
  // ------------------------------------ 取得最先日期

  let [earlyDate] = await pool.execute(
    `SELECT MIN(activity_date) AS earlyDate FROM activity`
  );
  let [startDate] = earlyDate.map((v) => {
    return v.earlyDate;
  });

  let startTime = startDate.getTime();
  let finalStartDate = moment(startTime).format('yyyy-MM-DD');

  let startDateRange = req.query.startDateSubmit || finalStartDate; // 取得最早日期

  // ------------------------------------ 取得最後日期

  let [lateDate] = await pool.execute(
    `SELECT MAX(activity_date) AS lateDate FROM activity`
  );
  let [endDate] = lateDate.map((v) => {
    return v.lateDate;
  });

  let endTime = endDate.getTime();
  let finalEndDate = moment(endTime).format('yyyy-MM-DD');

  let endDateRange = req.query.endDateSubmit || finalEndDate; // 取得最晚日期

  // ------------------------------------ 取得當頁資料

  let [pageResults] = await pool.execute(
    `  SELECT * FROM activity, activity_status, venue
    WHERE activity.activity_valid = ?
    AND activity.activity_venue_id = venue.id
    AND activity.activity_status_id = activity_status.id
    AND activity.activity_status_id = ?
    AND activity.activity_fee BETWEEN ? AND ?
    AND activity.activity_persons BETWEEN ? AND ?
    AND activity.activity_date BETWEEN ? AND ?
    AND activity.activity_name LIKE ?
    AND activity.activity_venue_id IN (?) 
    ${sortMethodString}
    LIMIT ?
    OFFSET ?`,
    [
      1,
      statu,
      price[0],
      price[1],
      person[0],
      person[1],
      startDateRange,
      endDateRange,
      '%' + searchWord + '%',
      category.toString(),
      perPage,
      offset,
    ]
  );

  console.log(category.toString());

  const total = pageResults.length; // 總筆數
  const lastPage = Math.ceil(total / perPage); // 總頁數
  let [activityResults] = await pool.execute(`SELECT * FROM activity`);

  res.json({
    pagination: { total, lastPage, page }, // 頁碼有關的資料
    stateGroup: newStatu, // 課程報名狀態類別
    categoryGroup: newCategory, // 課程難度類別
    dateRange: { finalStartDate, finalEndDate },
    data: pageResults, // 主資料
    activityFullDtaa: activityResults,
  });
});

///------------------------------------------------------------------------------------- /course/1

router.get('/:courseId', async (req, res, next) => {
  // req.params | 取得網址上的參數
  // req.params.stockId
  let [data] = await pool.execute(
    'SELECT * FROM activity, activity_status, venue WHERE activity.activity_id = ? AND activity.activity_venue_id = venue.id AND activity.activity_status_id = activity_status.id',
    [req.params.courseId]
  );

  res.json({
    data: data,
  });
});

module.exports = router;
