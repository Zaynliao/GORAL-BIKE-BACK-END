const express = require('express');
const router = express.Router();
const moment = require('moment');

const pool = require('../utils/db'); // 引入 db

///------------------------------------------------------------------------------------- /course

router.get('/', async (req, res, next) => {
  let searchWord = req.query.search || ''; // 取得關鍵字
  let statu = req.query.statu || ''; // 取得目前狀態
  let category = req.query.category || ''; // 取得分類
  let sortMethod = req.query.sortMethod || 'hotSort'; // 取得排序方法
  let cardStyle = req.query.cardStyle || 'row'; // 陳列方式

  switch (sortMethod) {
    case 'hotSort':
      sortMethodString = `ORDER BY course_enrollment DESC`;
      break;
    case 'newSort':
      sortMethodString = `ORDER BY course_date DESC`;
      break;
    case 'cheapSort':
      sortMethodString = `ORDER BY course_price ASC`;
      break;
    case 'expensiveSort':
      sortMethodString = `ORDER BY course_price DESC`;
      break;
  }

  let page = req.query.page || 1; // 取得目前在第幾頁

  const perPage = cardStyle === 'row' ? 3 : 6; // 一頁幾筆
  const offset = (page - 1) * perPage; // 計算每頁跳過幾筆顯示

  // ------------------------------------ 取得報名狀態類別

  let [stateGroup] = await pool.execute(`SELECT * FROM course_status`);

  let newStatu = stateGroup.map((v, i) => {
    return v.course_status_name;
  });

  // ------------------------------------ 取得課程難度類別

  let [categoryGroup] = await pool.execute(`SELECT * FROM course_category`);

  let newCategory = categoryGroup.map((v, i) => {
    return v.course_category_name;
  });

  // ------------------------------------ 取得最低價
  let [minPrice] = await pool.execute(
    `SELECT MIN(course_price) AS minPrice FROM classes`
  );
  let [sqlMinPrice] = minPrice.map((v) => {
    return v.minPrice;
  });

  // ------------------------------------ 取得最高價
  let [maxPrice] = await pool.execute(
    `SELECT MAX(course_price) AS maxPrice FROM classes`
  );
  let [sqlMaxPrice] = maxPrice.map((v) => {
    return v.maxPrice;
  });

  let price = req.query.priceSubmit || [sqlMinPrice, sqlMaxPrice]; // 取得價錢範圍

  // ------------------------------------ 取得最少人數
  let [minPerson] = await pool.execute(
    `SELECT MIN(course_enrollment) AS minPerson FROM classes`
  );
  let [sqlMinPerson] = minPerson.map((v) => {
    return v.minPerson;
  });

  // ------------------------------------ 取得最多人數
  let [maxPerson] = await pool.execute(
    `SELECT MAX(course_enrollment) AS maxPerson FROM classes`
  );
  let [sqlMaxPerson] = maxPerson.map((v) => {
    return v.maxPerson;
  });

  let person = req.query.personSubmit || [sqlMinPerson, sqlMaxPerson]; // 取得人數範圍
  // ------------------------------------ 取得最先日期

  let [earlyDate] = await pool.execute(
    `SELECT MIN(course_date) AS earlyDate FROM classes`
  );
  let [startDate] = earlyDate.map((v) => {
    return v.earlyDate;
  });

  let startTime = startDate.getTime();
  let finalStartDate = moment(startTime).format('yyyy-MM-DD');

  let startDateRange = req.query.startDateSubmit || finalStartDate; // 取得最早日期

  // ------------------------------------ 取得最後日期

  let [lateDate] = await pool.execute(
    `SELECT MAX(course_date) AS lateDate FROM classes`
  );
  let [endDate] = lateDate.map((v) => {
    return v.lateDate;
  });

  let endTime = endDate.getTime();
  let finalEndDate = moment(endTime).format('yyyy-MM-DD');

  let endDateRange = req.query.endDateSubmit || finalEndDate; // 取得最晚日期

  let dateRange = [startDateRange, endDateRange]; // 日期範圍

  // ------------------------------------ 判斷是否篩選

  let query = '';
  let conditionParams = [];
  if (statu) {
    query += ` AND classes.course_status_id = ?`;
    conditionParams.push(statu);
  }
  if (searchWord) {
    query += ` AND course_title LIKE ?`;
    conditionParams.push('%' + searchWord + '%');
  }
  if (price) {
    query += ` AND course_price BETWEEN ? AND ?`;
    conditionParams.push(price[0], price[1]);
  }
  if (person) {
    query += ` AND course_enrollment BETWEEN ? AND ?`;
    conditionParams.push(person[0], person[1]);
  }

  if (category) {
    query += ` AND classes.course_category_id IN (${category})`;
  }

  if (dateRange) {
    query += ` AND course_date BETWEEN ? AND ?`;
    conditionParams.push(dateRange[0], dateRange[1]);
  }

  // console.log(query);
  // console.log(conditionParams);

  // ------------------------------------ 篩選過的資料
  let [filterResult] = await pool.execute(
    `SELECT * FROM classes, course_category, course_location, course_status, venue, course_contents 
    WHERE classes.course_valid = ? 
    AND classes.course_category_id = course_category.course_category_id 
    AND classes.course_location_id = course_location.course_location_id 
    AND classes.course_status_id = course_status.course_status_id 
    AND course_location.course_venue_id = venue.id 
    AND classes.course_content_id = course_contents.course_content_id ${query} ${sortMethodString} `,
    [1, ...conditionParams]
  );
  // ------------------------------------ 分頁資料

  let [pageResults] = await pool.execute(
    `SELECT * FROM classes, course_category, course_location, course_status, venue, course_contents 
    WHERE classes.course_valid = ? 
    AND classes.course_category_id = course_category.course_category_id 
    AND classes.course_location_id = course_location.course_location_id 
    AND classes.course_status_id = course_status.course_status_id 
    AND course_location.course_venue_id = venue.id 
    AND classes.course_content_id = course_contents.course_content_id ${query} ${sortMethodString} LIMIT ? OFFSET ?`,
    [1, ...conditionParams, perPage, offset]
  );

  const total = filterResult.length; // 總筆數
  const lastPage = Math.ceil(total / perPage); // 總頁數

  let [classResults] = await pool.execute(`SELECT * FROM classes`);

  res.json({
    pagination: { total, lastPage, page }, // 頁碼有關的資料
    stateGroup: newStatu, // 狀態
    priceRange: { sqlMinPrice, sqlMaxPrice }, // 價錢範圍
    personRange: { sqlMinPerson, sqlMaxPerson }, // 人數範圍
    dateRange: { finalStartDate, finalEndDate }, // 時間範圍
    categoryGroup: newCategory, // 類別
    data: pageResults, // 主資料
    classFullDtaa: classResults,
  });
});

///------------------------------------------------------------------------------------- /course/1

router.get('/:courseId', async (req, res, next) => {
  // req.params | 取得網址上的參數
  // req.params.stockId
  let [data] = await pool.execute(
    'SELECT * FROM classes, course_category, course_location, course_status, venue, course_contents WHERE course_id = ? AND classes.course_category_id = course_category.course_category_id AND classes.course_location_id = course_location.course_location_id AND classes.course_status_id = course_status.course_status_id AND course_location.course_venue_id = venue.id AND classes.course_content_id = course_contents.course_content_id',
    [req.params.courseId]
  );

  res.json({
    data: data,
  });
});

module.exports = router;
