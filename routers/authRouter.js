const express = require('express');
const router = express.Router();
const pool = require('../utils/db'); // 引入 db
const sgMail = require('@sendgrid/mail');
const randomString = require('randomstring');
const moment = require('moment');

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

  // 產生指定長度的隨機字串(用於驗證)
  const verifyCode = randomString.generate(10);
  // 產生時間戳記

  const joinTime = moment().valueOf();
  const joinTimeStamp = Math.floor(joinTime / 1000);

  // 寄送驗證信設定
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: req.body.email,
    from: 'Goral Bike <goralbiker@gmail.com>',
    subject: '歡迎您註冊羊百克網站',
    text: '您好，請點選以下連結進行驗證',
    html: `
      <div>
          <a href=${process.env.MAILING_URL}/api/verify/v=${verifyCode}&t=${joinTimeStamp}>請點此處進行驗證</a>
          <p>或是直接複製下列網址貼到瀏覽器上做驗證</p>
          <span>${process.env.MAILING_URL}/api/verify/v=${verifyCode}&t=${joinTimeStamp}</span>
      </div>
      `,
  };

  const sendMail = async () => {
    try {
      await sgMail.send(msg);
    } catch (err) {
      console.error(err);
      return res.json({
        code: 3006,
        error: '發生錯誤，請稍後在試',
      });
    }
  };

  // 密碼雜湊
  let hashPassword = await bcrypt.hash(req.body.password, 10);

  // 存入資料庫
  let [result] = await pool.execute(
    `INSERT INTO users (name, password, email, phone, create_time,verify_string) 
    VALUES (?, ?, ?, ?, NOW(),?)`,
    [req.body.name, hashPassword, req.body.email, req.body.phone, verifyCode]
  );

  sendMail();
  console.log('insert result:', result);
  res.json({ code: 0, msg: '註冊成功，請至您的信箱收取驗證信以驗證身份' });
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
  res.json({ code: 0, user: returnUser, msg: '登入成功' });
});

// /api/member/logout
router.get('/logout', async (req, res, next) => {
  console.log(req.session);
  req.session.destroy();
  res.clearCookie('connect.sid'); // clean up!
  return res.json({ code: 0, msg: '登出成功' });
});

module.exports = router;
