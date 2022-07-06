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

router.get('/detail/:orderId', async (req, res) => {
  const orderId = req.params.orderId;

  let [orderDetail] = await pool.execute(
    `
      SELECT order_list.*,order_status.order_status,payment_method.payment_method_name, payment_status.payment_status,delivery.delivery_method FROM order_list, payment_method, payment_status, order_status, delivery 
      WHERE order_list.order_status = order_status.id
      AND order_list.payment_method_id = payment_method.id
      AND order_list.payment_status_id = payment_status.id
      AND order_list.delivery_id = delivery.delivery_id
      AND order_list.order_id = ?`,
    [orderId]
  );

  let [orderProduct] = await pool.execute(
    `
      SELECT product_order.*, product.product_price, product.product_name, product.product_images 
      FROM product_order,product 
      WHERE order_id = ? 
      AND product_order.product_id = product.product_id;`,
    [orderId]
  );
  const orderProductDetail = orderProduct.map((item) => {
    return {
      id: item.product_id,
      price: item.product_price,
      name: item.product_name,
      image: item.product_images,
      quantity: item.quantity,
    };
  });
  let [orderCourse] = await pool.execute(
    `
      SELECT course_order.*, classes.course_price, classes.course_title, classes.course_pictures
      FROM course_order,classes 
      WHERE order_id = ? 
      AND course_order.course_id = classes.course_id;`,
    [orderId]
  );
  let [orderActivity] = await pool.execute(
    `
      SELECT activity_order.*, activity.activity_fee, activity.activity_name, activity.activity_pictures 
      FROM activity_order,activity 
      WHERE order_id = ? 
      AND activity_order.activity_id = activity.activity_id;`,
    [orderId]
  );
  res.json({
    data: orderDetail,
    productData: orderProductDetail,
    courseData: [],
    activity: [],
  });
});

module.exports = router;
