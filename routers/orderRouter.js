const express = require('express');
const router = express.Router();
const pool = require('../utils/db'); // 引入 db

router.get('/:userId', async (req, res) => {
  // 拉出用戶session
  const serverUserData = req.session.user;
  // console.log(serverUserData);
  if (serverUserData) {
    // 拉出個人訂單列表
    let [orderList] = await pool.execute(
      `
      SELECT order_list.*,order_status.order_status,payment_method.payment_method_name, payment_status.payment_status,delivery.delivery_method FROM order_list, payment_method, payment_status, order_status, delivery 
      WHERE order_list.order_status = order_status.id
      AND order_list.payment_method_id = payment_method.id
      AND order_list.payment_status_id = payment_status.id
      AND order_list.delivery_id = delivery.delivery_id
      AND order_list.user_id = ?`,
      [serverUserData.user_id]
    );
    res.json({ code: 200, data: orderList });
  } else {
    res.status(400).json({ code: 3010, error: '使用者尚未登入' });
  }
});

module.exports = router;
