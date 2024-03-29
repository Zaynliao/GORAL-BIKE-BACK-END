const express = require('express');
// 利用 express 建立一個 express application
const app = express();
const passport = require('passport');
const cors = require('cors');
// path 為內建套件
const path = require('path');
// 讀取環境設定
require('dotenv').config();

// 跨源
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  })
);

//啟用session
const expressSession = require('express-session');
let FileStore = require('session-file-store')(expressSession);
app.use(
  expressSession({
    store: new FileStore({
      path: path.join(__dirname, '..', 'sessions'),
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  })
);

// 把 db.js 引入
let pool = require('./utils/db');
// passport 設定
app.use(passport.initialize());
app.use(passport.session());

// express 處理靜態資料
// 靜態資料: html, css 檔案, javascript 檔案, 圖片, 影音檔...
// express 少數內建的中間件 static
// 方法2: 指定網址 public
// app.use('/images', imagesRouter);
// 在 public 的 images 的裡面的檔案
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
// http://localhost:3001/images/callback-hell.png
// http://localhost:3001/images/members  --> public/members
// http://localhost:3001/images/members/1655003608497.jpg

// express.urlencoded 要讓 express 認得 req 裡 body 裡面的資料
app.use(express.urlencoded({ extended: true }));
// 要讓 express 認得 req 裡 json
app.use(express.json());

// 引進 router
const CourseRouter = require('./routers/courseRouter');
const ActivityRouter = require('./routers/activityRouter');
const ProductRouter = require('./routers/productRouter');
const NewsRouter = require('./routers/newsRouter');
const AuthRouter = require('./routers/authRouter');
const MemberRouter = require('./routers/memberRouter');
const sessionRouter = require('./routers/sessionRouter');
const verifyRouter = require('./routers/verifyRouter');
const CartRouter = require('./routers/cartRouter');
const OrderRouter = require('./routers/orderRouter');
const CustomizeRouter = require('./routers/customizeRouter');
const SocialRouter = require('./routers/socialRouter');
// 使用 router
app.use('/api/auth', AuthRouter);
app.use('/api/verify', verifyRouter);
app.use('/api/member', MemberRouter);
app.use('/api/session', sessionRouter);
app.use('/api/course', CourseRouter);
app.use('/api/activity', ActivityRouter);
app.use('/api/product', ProductRouter);
app.use('/api/news', NewsRouter);
app.use('/api/cart', CartRouter);
app.use('/api/order', OrderRouter);
app.use('/api/customize', CustomizeRouter);
app.use('/api/social', SocialRouter);

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

//將 express 放進 http 中開啟 Server 的 3000 port ，正確開啟後會在 console 中印出訊息
// const server = require('http')
//   .Server(app)
//   .listen(3001, () => {
//     console.log('open server!');
//   });

//將啟動的 Server 送給 socket.io 處理
// const io = require('socket.io')(server);

// const socket = require('socket.io');
// const io = socket(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });

// //監聽 Server 連線後的所有事件，並捕捉事件 socket 執行
// io.on('connection', (socket) => {
//   //經過連線後在 console 中印出訊息
//   console.log('success connect!');
//   //監聽透過 connection 傳進來的事件
//   socket.on('getMessage', (message) => {
//     //回傳 message 給發送訊息的 Client
//     socket.emit('getMessage', message);
//   });
// });
