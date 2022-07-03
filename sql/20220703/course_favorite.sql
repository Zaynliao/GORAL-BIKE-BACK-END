-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022 年 07 月 03 日 10:34
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
-- 資料表結構 `course_favorite`
--

CREATE TABLE `course_favorite` (
  `favorite_user_id` int(11) NOT NULL,
  `favorite_course_id` int(11) NOT NULL,
  `favorite_is` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `course_favorite`
--

INSERT INTO `course_favorite` (`favorite_user_id`, `favorite_course_id`, `favorite_is`) VALUES
(1, 41, 0),
(1, 43, 0),
(1, 44, 0),
(1, 45, 0),
(1, 46, 0),
(1, 56, 0),
(1, 59, 0),
(1, 63, 0),
(1, 65, 0),
(2, 1, 0),
(2, 4, 0);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `course_favorite`
--
ALTER TABLE `course_favorite`
  ADD PRIMARY KEY (`favorite_user_id`,`favorite_course_id`);
COMMIT;
