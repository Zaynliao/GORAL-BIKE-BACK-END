-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-06-28 16:33:13
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
-- 資料表結構 `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(8) NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` datetime NOT NULL,
  `verify_string` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valid` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`user_id`, `name`, `password`, `email`, `phone`, `photo`, `create_time`, `verify_string`, `valid`) VALUES
(1, 'Eason', '$2b$10$l4mgOLEcsNakcn.UuV6ZuOQL56dcO12N6CIOE4wd/TlvU39RfIPz2', 'Eason@test.com', '0933456789', '', '2022-06-27 13:33:28', '', 1),
(2, 'Alan', '$2b$10$B3OY9Y0GW6ag1nE57kGlt.Ye7yF1w0wSBpo9f3woUn4/8NJ75Snqa', 'Alan@test.com', '0955456789', '', '2022-06-27 13:34:19', '', 1),
(3, '王小明', '$2b$10$Tm9ixMusINNGwHPrRKhUhOXPGKX6kgVTXBp1T97wLO/m5VnKQt9Uq', 'tom@test.com', '0956123456', '', '2022-06-27 13:50:04', '', 1),
(4, 'wade', '$2b$10$Cp59FFQc.ZOECBe7ztze6OSqOYJbpAt5/.S2l2aM38cYnuB8f1a6S', 'wade@test.com', '0956123478', '', '2022-06-27 13:55:45', '', 1),
(5, 'mike', '$2b$10$1dXvdqt/A8kA7wBuwQQgYepKLPnBzEYw59.1JcPRuOXhI72KJav7G', 'mike@test.com', '0900000011', '', '2022-06-27 14:06:46', '', 1),
(6, 'sara', '$2b$10$RG8cuw0fXw9ClCTOBbLeUOnwktD/XUozBW3zBaYdR/zZH0kNQGb8S', 'sara@test.com', '0956123456', '', '2022-06-27 14:20:05', '', 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;