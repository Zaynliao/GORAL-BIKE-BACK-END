-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-06-29 18:38:12
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
-- 資料表結構 `order_list`
--

DROP TABLE IF EXISTS `order_list`;
CREATE TABLE `order_list` (
  `order_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `order_create_time` datetime NOT NULL,
  `order_status` int(10) NOT NULL,
  `payment_method_id` int(10) NOT NULL,
  `payment_status_id` int(10) NOT NULL,
  `delivery_id` int(10) NOT NULL,
  `recipient` varchar(50) NOT NULL,
  `product_total` int(15) NOT NULL,
  `course_total` int(15) NOT NULL,
  `activity_total` int(15) NOT NULL,
  `total` int(15) NOT NULL,
  `order_address` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `remark` varchar(100) NOT NULL,
  `coupon_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `order_list`
--

INSERT INTO `order_list` (`order_id`, `user_id`, `order_create_time`, `order_status`, `payment_method_id`, `payment_status_id`, `delivery_id`, `recipient`, `product_total`, `course_total`, `activity_total`, `total`, `order_address`, `phone`, `remark`, `coupon_id`) VALUES
(24, 13, '2022-06-29 18:08:54', 1, 1, 2, 1, '潘奕辰', 34000, 0, 0, 34000, '臺南市永康區永忠路28號', '0945654789', '測試', 0);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `order_list`
--
ALTER TABLE `order_list`
  ADD PRIMARY KEY (`order_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_list`
--
ALTER TABLE `order_list`
  MODIFY `order_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;
