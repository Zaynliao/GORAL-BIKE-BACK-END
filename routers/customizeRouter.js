const express = require('express');
const router = express.Router();

// 引入 database
const pool = require('../utils/db');
router.post('/', async (req, res, next) => {
  console.log(req.body);
  res.json({ state: 'good' });
});
module.exports = router;
