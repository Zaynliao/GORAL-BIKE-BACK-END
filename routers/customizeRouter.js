const express = require('express');
const router = express.Router();

// 引入 database
const pool = require('../utils/db');
router.post('/', async (req, res, next) => {
  const userID = req.body.userID || null;
  const [result] = await pool.execute(
    'SELECT * FROM `customizeorder` WHERE `customizeorder`.`userID` = ?',
    [userID]
  );

  console.log(result);

  res.json({
    result: result,
  });
});
router.post('/UpdateCustomer', async (req, res, next) => {
  const orderID = req.body.orderID || null;
  const stateArray = Object.keys(req.body.state).map(
    (key) => req.body.state[key]
  );
  const [result] = await pool.execute(
    'UPDATE `customizeorder` SET `Frame_MAT` = ?, `Saddle_MAT` = ?, `Metal_MAT` = ?, `DerailleurRear_MAT` = ?, `Crankset_MAT` = ?, `Pedal_MAT` = ?, `Chain_MAT` = ?, `Cage_MAT` = ?, `Bottle_MAT` = ?, `Brakes_MAT` = ?, `PaintBlack_MAT` = ?, `Wheels_MAT` = ?, `Computer_MAT` = ?, `HandlebarTape_MAT` = ?, `Shifters_MAT` = ?, `Cassette_MAT` = ? WHERE `customizeorder`.`orderId` = ?',
    [...stateArray, orderID]
  );

  console.log(result);

  res.json({
    result: result,
  });
});
router.post('/InsertCustomer', async (req, res, next) => {
  const stateArray = Object.keys(req.body.state).map(
    (key) => req.body.state[key]
  );
  const valueArray = Object.keys(req.body.value).map(
    (key) => req.body.value[key]
  );
  const userID = req.body.userID;
  console.log(req.body.userID);
  // console.log(valueArray);
  // console.log(stateArray);

  const [result] = await pool.execute(
    'INSERT INTO `customizeorder` (`orderId`,`userID`, `name`, `email`, `phone`, `mark`, `Frame_MAT`, `Saddle_MAT`, `Metal_MAT`, `DerailleurRear_MAT`, `Crankset_MAT`, `Pedal_MAT`, `Chain_MAT`, `Cage_MAT`, `Bottle_MAT`, `Brakes_MAT`, `PaintBlack_MAT`, `Wheels_MAT`, `Computer_MAT`, `HandlebarTape_MAT`, `Shifters_MAT`, `Cassette_MAT`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [userID, ...valueArray, ...stateArray]
  );

  console.log(result);
  res.json({
    Results: 'ok',
    ResultsFieldCount: result.fieldCount,
  });
});

module.exports = router;
