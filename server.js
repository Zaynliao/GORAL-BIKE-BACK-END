// npm init -f
// npm i express
const express = require('express');
// 利用 express 建立一個 express application
const app = express();
const cors = require('cors');
// path 為內建套件
const path = require('path');
require('dotenv').config();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

let pool = require('./utils/db'); // 重構 | 把 db.js 引入

// express 處理靜態資料
// 靜態資料: html, css 檔案, javascript 檔案, 圖片, 影音檔...
// express 少數內建的中間件 static
// 方法1: 不要指定網址 /
app.use(express.static(path.join(__dirname, 'assets')));
// http://localhost:3001/images/test1.jpg
// 方法2: 指定網址 public
app.use(
  '/images/81pic',
  express.static(path.join(__dirname, 'public', '81pic'))
);
// http://localhost:3001/images/members  --> public/members
// http://localhost:3001/images/members/1655003608497.jpg

// express.urlencoded 要讓 express 認得 req 裡 body 裡面的資料
app.use(express.urlencoded({ extended: true }));
// 要讓 express 認得 req 裡 json
app.use(express.json());

const CourseRouter = require('./routers/courseRouter'); // 引進 router

app.use('/api/course', CourseRouter); // 使用 router

app.use((req, res, next) => {
  console.log('所有路由的後面 => 404', req.path);
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error('來自四個參數的錯誤處理中間件', req.path, err);
  res.status(500).send('Server Error: 請洽系統管理員');
});

app.listen(3001, () => {
  console.log('server start at 3001');
});
