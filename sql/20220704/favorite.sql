-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022 年 07 月 04 日 04:11
-- 伺服器版本： 10.4.24-MariaDB
-- PHP 版本： 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- 資料庫: `goral_bike`
--

-- --------------------------------------------------------

--
-- 資料表結構 `favorite_activity`
--

CREATE TABLE `favorite_activity` (
  `favorite_user_id` int(11) NOT NULL,
  `favorite_activity_id` int(11) NOT NULL,
  `favorite_is` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `favorite_course`
--

CREATE TABLE `favorite_course` (
  `favorite_user_id` int(11) NOT NULL,
  `favorite_course_id` int(11) NOT NULL,
  `favorite_is` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `favorite_product`
--

CREATE TABLE `favorite_product` (
  `favorite_user_id` int(11) NOT NULL,
  `favorite_product_id` int(11) NOT NULL,
  `favorite_is` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `favorite_activity`
--
ALTER TABLE `favorite_activity`
  ADD PRIMARY KEY (`favorite_user_id`,`favorite_activity_id`);

--
-- 資料表索引 `favorite_course`
--
ALTER TABLE `favorite_course`
  ADD PRIMARY KEY (`favorite_user_id`,`favorite_course_id`);

--
-- 資料表索引 `favorite_product`
--
ALTER TABLE `favorite_product`
  ADD PRIMARY KEY (`favorite_user_id`,`favorite_product_id`);
COMMIT;
