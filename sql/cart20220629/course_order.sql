-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-06-29 18:32:40
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
-- 資料表結構 `course_order`
--

DROP TABLE IF EXISTS `course_order`;
CREATE TABLE `course_order` (
  `order_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `course_order`
--
ALTER TABLE `course_order`
  ADD PRIMARY KEY (`order_id`,`course_id`);
COMMIT;