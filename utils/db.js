require('dotenv').config;

const mysql = require('mysql2');

let pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_POST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
  })
  .promise();

module.exports = pool;
