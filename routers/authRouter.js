const express = require('express');
const router = express.Router();
const pool = require('../utils/db'); // 引入 db

const { body, validationResult } = require('express-validator');

// 啟用密碼雜湊
const bcrypt = require('bcrypt');

const registerRules = [
  body('name').notEmpty().withMessage('未填寫姓名'),
  body('phone')
    .matches(/^09[0-9]{8}$/)
    .withMessage('不符合電話號碼格式'),
  body('email').isEmail().withMessage('Email 未填寫正確'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('密碼長度至少為6')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    .withMessage('需要包含1個英文及數字'),
  body('rePassword')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('密碼驗證不一致'),
];

// /api/member/register
router.post('/register', registerRules, async (req, res, next) => {
  // 1. req.params <-- 網址上的路由參數
  // 2. req.query <-- 網址上的 query string
  // 3. req.body <-- 通常是表單用的
  console.log('註冊的資料', req.body);

  // 驗證資料
  const validateResult = validationResult(req);
  console.log('驗證結果:', validateResult.errors);

  if (!validateResult.isEmpty()) {
    let error = validateResult.array();
    return res.status(400).json({ code: 3001, error: error });
  }

  // 確認email有沒有註冊過
  let [users] = await pool.execute('SELECT email FROM users WHERE email = ? ', [
    req.body.email,
  ]);
  if (users.length !== 0) {
    // 這個 email 有註冊過
    return res.status(400).json({ code: 3002, error: '這個email已經註冊過' });
  }

  // 密碼雜湊
  let hashPassword = await bcrypt.hash(req.body.password, 10);

  // 存入資料庫
  let [result] = await pool.execute(
    `INSERT INTO users (name, password, email, phone, create_time) 
    VALUES (?, ?, ?, ?, NOW())`,
    [req.body.name, hashPassword, req.body.email, req.body.phone]
  );
  console.log('insert result:', result);
  res.json({ code: 0, result: '註冊成功' });
});

// /api/member/login
router.post('/login', async (req, res, next) => {
  // 確認有沒有這個帳號
  let [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [
    req.body.email,
  ]);
  if (users.length === 0) {
    // 如果沒有這個帳號，就回覆錯誤
    return res.status(400).json({ code: 3003, error: '帳號或密碼錯誤' });
  }
  //如果程式碼能執行到這，表示MEMBER至少有一個資料
  //把這個會員資料拿出來
  let user = users[0];

  // 如果有，確認密碼
  let passwordCompareResult = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (passwordCompareResult === false) {
    return res.status(400).json({ code: 3004, error: '帳號或密碼錯誤' });
  }

  // 密碼符合，就開始寫 session
  let returnUser = {
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    photo: user.photo,
  };
  req.session.user = returnUser;
  console.log(req.session);
  //回覆資料給前端
  res.json({ code: 0, user: returnUser, message: '登入成功' });
});

// /api/member/logout
router.get('/logout', async (req, res, next) => {
  console.log(req.session);
  req.session.destroy();
  res.clearCookie('connect.sid'); // clean up!
  return res.json({ code: 0, result: '登出成功' });
});

module.exports = router;
