const express = require('express');
const router = express.Router();
const pool = require('../utils/db'); // 引入 db

// /api/member/profile
router.post('/profile', async (req, res, next) => {
  console.log('註冊的資料', req.body);

  let [members] = await pool.execute(
    'SELECT user.*, level_name.name AS levelName FROM user JOIN level_name ON user.level = level_name.id WHERE identity_card = ?',
    [req.body.identity_card]
  );
  let member = members[0];
  console.log(member);
  res.json({ member });
});

// /api/member/update
router.post('/update', async (req, res, next) => {
  console.log('更新的資料', req.body);

  let [members] = await pool.execute(
    'UPDATE user SET img = ?, nick_name = ?, phone = ?  WHERE id = ?',
    [req.body.img, req.body.nick_name, req.body.phone, req.body.id]
  );
  console.log(members);
  res.json({ result: '更新資料成功' });
});

module.exports = router;
