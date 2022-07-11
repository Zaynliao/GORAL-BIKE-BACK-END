const express = require('express');
const router = express.Router();

//db連線模組
const pool = require('../utils/db');

// /api/session/user
router.get('/user', (req, res, next) => {
  if (req.session.user) {
    //表示登入過
    return res.json(req.session.user);
  } else {
    //表示尚未登入
    res.clearCookie('connect.sid');
    return res.status(403).json({ code: 3002, error: '尚未登入' });
  }
});

module.exports = router;
