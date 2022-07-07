-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-07-06 20:57:37
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
-- 資料表結構 `coupons`
--

DROP TABLE IF EXISTS `coupons`;
CREATE TABLE `coupons` (
  `id` int(5) NOT NULL,
  `coupon_name` varchar(50) NOT NULL,
  `coupon_content` varchar(100) NOT NULL,
  `coupon_expiry_date` date NOT NULL,
  `coupon_discount` int(3) NOT NULL DEFAULT 0,
  `valid` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `coupons`
--

INSERT INTO `coupons` (`id`, `coupon_name`, `coupon_content`, `coupon_expiry_date`, `coupon_discount`, `valid`) VALUES
(1, '首次購買券', '初次見面，單筆訂單 77 折', '2032-05-31', 77, 1),
(2, '久久回顧券', '好久不見，單筆訂單 95 折', '2022-07-13', 95, 1),
(3, '國家紀念券', '放假快樂，單筆訂單 88 折', '2022-01-08', 88, 1),
(4, '父親快樂券', '父親節快樂，單筆訂單 88 折', '2021-08-15', 88, 1),
(5, '恭喜發財券', '新年快樂，單筆訂單 88 折', '2022-02-27', 88, 1),
(6, '母親快樂券', '母親節快樂，單筆訂單 88 折', '2022-05-21', 88, 1),
(7, '兒童快樂券', '善待兒童，世界和平，單筆訂單 88 折', '2022-04-08', 88, 1),
(8, '購物快樂券', '1111 購物節是狂歡的時節，單筆訂單 88 折', '2022-06-25', 88, 1),
(9, '忠誠顧客券', '累積 5 筆交易即可得到，單筆訂單 5 折', '2032-06-30', 50, 1),
(10, '生日快樂券', '生日是值得慶祝的一天，單筆訂單 6 折', '2022-06-25', 60, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `user_coupons`
--

DROP TABLE IF EXISTS `user_coupons`;
CREATE TABLE `user_coupons` (
  `coupons_user_id` int(11) NOT NULL,
  `coupons_id` int(11) NOT NULL,
  `coupons_is` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `user_coupons`
--

INSERT INTO `user_coupons` (`coupons_user_id`, `coupons_id`, `coupons_is`) VALUES
(1, 1, 1),
(1, 2, 0),
(1, 3, 1),
(1, 4, 0),
(1, 5, 1),
(1, 6, 0),
(1, 7, 1),
(1, 8, 0),
(1, 9, 1),
(1, 10, 0),
(13, 1, 1),
(13, 2, 0),
(13, 3, 1),
(13, 4, 0),
(13, 5, 1),
(13, 6, 0),
(13, 7, 1),
(13, 8, 0),
(13, 9, 1),
(13, 10, 0);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `user_coupons`
--
ALTER TABLE `user_coupons`
  ADD PRIMARY KEY (`coupons_user_id`,`coupons_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;
