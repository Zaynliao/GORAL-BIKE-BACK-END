-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-06-29 18:41:33
-- 伺服器版本： 10.4.24-MariaDB
-- PHP 版本： 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- 資料庫: `goral_bike`
--

-- --------------------------------------------------------

--
-- 資料表結構 `product_order`
--

DROP TABLE IF EXISTS `product_order`;
CREATE TABLE `product_order` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `product_order`
--

INSERT INTO `product_order` (`order_id`, `product_id`, `quantity`) VALUES
(24, 1, 1),
(24, 2, 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `product_order`
--
ALTER TABLE `product_order`
  ADD PRIMARY KEY (`product_id`,`order_id`);
COMMIT;
