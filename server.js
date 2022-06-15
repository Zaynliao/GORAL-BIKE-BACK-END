const express = require('express');
// 利用 express 建立一個 express application
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// 跨源
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

// 把 db.js 引入
let pool = require('./utils/db');

// express.urlencoded 要讓 express 認得 req 裡 body 裡面的資料
app.use(express.urlencoded({ extended: true }));
// 要讓 express 認得 req 裡 json
app.use(express.json());

// 在 public 的 images 的裡面的檔案
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
// http://localhost:3001/images/callback-hell.png

// 引進 router
const CourseRouter = require('./routers/courseRouter');
// 使用 router
app.use('/api/course', CourseRouter);

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
