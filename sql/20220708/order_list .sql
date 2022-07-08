-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-07-08 07:53:02
-- 伺服器版本： 10.4.24-MariaDB
-- PHP 版本： 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `goral_bike`
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
  `discount_price` int(20) NOT NULL,
  `discount_total` int(20) NOT NULL,
  `order_address` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `remark` varchar(100) NOT NULL,
  `coupon_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `order_list`
--

INSERT INTO `order_list` (`order_id`, `user_id`, `order_create_time`, `order_status`, `payment_method_id`, `payment_status_id`, `delivery_id`, `recipient`, `product_total`, `course_total`, `activity_total`, `total`, `discount_price`, `discount_total`, `order_address`, `phone`, `remark`, `coupon_id`) VALUES
(25, 13, '2022-07-07 20:43:38', 1, 1, 2, 1, '潘奕辰', 22000, 0, 0, 22000, 1100, 20900, '臺南市永康區永忠路28號', '0934545978', '測試', 2);

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
  MODIFY `order_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
