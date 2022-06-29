const express = require('express');
const router = express.Router();
const pool = require('../utils/db'); // 引入 db
const sgMail = require('@sendgrid/mail');
const randomString = require('randomstring');
const moment = require('moment');
const alert = require('alert');

router.post('/resend', async (req, res) => {
  try {
    // 檢查用戶是否已存在
    let [users] = await pool.execute(
      'SELECT email FROM users WHERE email = ? ',
      [req.body.email]
    );
    if (users.length === 0) {
      // 這個 email 有註冊過
      return res.status(400).json({ code: 3007, error: '不存在此使用者' });
    }

    // 產生指定長度的隨機字串(用於驗證)
    const verifyCode = randomString.generate(10);

    // 設定時間戳記
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
          msg: '發生錯誤，請稍後在試',
        });
      }
    };

    // 更新用戶用於驗證的驗證碼，時間戳記
    const [resend] = await pool.execute(
      'UPDATE users SET verify_string = ? WHERE email = ?',
      [verifyCode, req.body.email]
    );
    console.log(resend);
    sendMail();

    return res.json({
      code: 200,
      msg: '新的驗證信已寄出',
    });
  } catch (err) {
    console.error(err);
    return res.json({
      code: 3006,
      msg: '發生錯誤，請稍後在試',
    });
  }
});

// http://localhost:3001/api/verify/:verifyString
router.get('/:verifyString', async (req, res, next) => {
  try {
    // 抓 verifyString 的內容
    const { verifyString } = req.params;
    // 驗證碼字串
    const verifyStr = verifyString.split('&')[0].split('=')[1];
    // console.log(verifyStr);
    // 驗證信發送時間
    const signupTimeStamp = verifyString.split('&')[1].split('=')[1];
    // 點擊驗證信網址的時間
    const currentTime = moment().valueOf();
    const currentTimeStamp = Math.floor(currentTime / 1000);
    const checkTimeDiff = (signupTimeStamp, currentTimeStamp) => {
      const timeDiff = currentTimeStamp - signupTimeStamp;
      const minuteCheck = timeDiff / 60;
      return minuteCheck;
    };

    if (checkTimeDiff(signupTimeStamp, currentTimeStamp) > 5) {
      alert('已超時驗證，請重新請求驗證信');
      res.redirect(process.env.FRONTEND_URL);
      return;
    } else {
      const [checkStatus] = await pool.execute(
        'SELECT valid FROM users WHERE verify_string = ?',
        [verifyStr]
      );
      // console.log('checkStatus', checkStatus);
      if (checkStatus[0].valid === 1) {
        alert('此電子信箱已驗證過');
        res.redirect(process.env.FRONTEND_URL);
        return;
      }
      const [setVerify] = await pool.execute(
        'UPDATE users SET valid=1 WHERE verify_string = ?',
        [verifyStr]
      );
      console.log(setVerify);
      if (setVerify.warningStatus === 0) {
        alert('驗證成功');
        res.redirect(process.env.FRONTEND_URL);
        return;
      }
    }
  } catch (err) {
    console.error(err);
    return res.json({
      code: 3006,
      msg: '發生錯誤，請稍後在試',
    });
  }
});

module.exports = router;
