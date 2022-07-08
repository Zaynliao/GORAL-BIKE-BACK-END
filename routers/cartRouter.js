const express = require('express');
const router = express.Router();
const pool = require('../utils/db'); // 引入 db

//  將收件人資訊寫進order_list
//  如果存在商品列表將商品寫進product_order
//  如果存在課程列表將將課程寫進course_order
//  如果存在活動列表將將活動寫進activity_order
router.post('/', async (req, res, next) => {
  try {
    console.log('cart資訊', req.body);
    const {
      user_id,
      order_status_id,
      payment_method_id,
      payment_status_id,
      recipientInfo,
      product_total,
      course_total,
      activity_total,
      total,
      discount_price,
      discount_total,
      product_item,
      course_item,
      activity_item,
      coupon_id,
    } = req.body;

    const { recipient, delivery, address, phone, note } = recipientInfo;
    let [order] = await pool.execute(
      `INSERT INTO order_list
      (user_id,
      order_create_time,
      order_status,
      payment_method_id,
      payment_status_id,
      product_total,
      course_total,
      activity_total,
      total,
      discount_price,
      discount_total,
      coupon_id,
      recipient,
      delivery_id,
      order_address,
      phone,
      remark)
      VALUE (?,NOW(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        user_id,
        order_status_id,
        payment_method_id,
        payment_status_id,
        product_total,
        course_total,
        activity_total,
        total,
        discount_price,
        discount_total,
        coupon_id,
        recipient,
        delivery,
        address,
        phone,
        note,
      ]
    );
    const orderID = order.insertId;
    if (product_item.length !== 0) {
      for (let i = 0; i < product_item.length; i++) {
        const item = product_item[i];
        const [productResult] = await pool.execute(
          `INSERT INTO product_order (order_id, product_id, quantity)
          VALUES(?, ?, ?)`,
          [orderID, item.id, item.quantity]
        );
      }
    }
    if (course_item.length !== 0) {
      for (let i = 0; i < course_item.length; i++) {
        const item = course_item[i];
        const [courseResult] = await pool.execute(
          `INSERT INTO course_order (order_id, course_id, quantity)
          VALUES(?, ?, ?)`,
          [orderID, item.id, item.quantity]
        );
      }
    }
    if (activity_item.length !== 0) {
      for (let i = 0; i < activity_item.length; i++) {
        const item = activity_item[i];
        const [activityResult] = await pool.execute(
          `INSERT INTO activity_order (order_id, activity_id, quantity)
          VALUES(?, ?, ?)`,
          [orderID, item.id, item.quantity]
        );
      }
    }

    const [updateCoupon] = await pool.execute(
      `UPDATE user_coupons SET coupons_is = ? WHERE coupons_user_id = ? AND coupons_id = ?`,
      [0, user_id, coupon_id]
    );

    return res.json({ code: 200, msg: '訂單已成立' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ code: 3006, error: '發生錯誤，請稍後在試' });
  }
});

module.exports = router;
