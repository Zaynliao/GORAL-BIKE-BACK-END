-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-07-07 18:13:31
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
-- 資料表結構 `customizeorder`
--

DROP TABLE IF EXISTS `customizeorder`;
CREATE TABLE `customizeorder` (
  `orderId` int(11) NOT NULL,
  `userID` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `mark` varchar(1000) DEFAULT NULL,
  `Frame_MAT` varchar(50) DEFAULT NULL,
  `Saddle_MAT` varchar(50) DEFAULT NULL,
  `Metal_MAT` varchar(50) DEFAULT NULL,
  `DerailleurRear_MAT` varchar(50) DEFAULT NULL,
  `Crankset_MAT` varchar(50) DEFAULT NULL,
  `Pedal_MAT` varchar(50) DEFAULT NULL,
  `Chain_MAT` varchar(50) DEFAULT NULL,
  `Cage_MAT` varchar(50) DEFAULT NULL,
  `Bottle_MAT` varchar(50) DEFAULT NULL,
  `Brakes_MAT` varchar(50) DEFAULT NULL,
  `PaintBlack_MAT` varchar(50) DEFAULT NULL,
  `Wheels_MAT` varchar(50) DEFAULT NULL,
  `Computer_MAT` varchar(50) DEFAULT NULL,
  `HandlebarTape_MAT` varchar(50) DEFAULT NULL,
  `Shifters_MAT` varchar(50) DEFAULT NULL,
  `Cassette_MAT` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `customizeorder`
--

INSERT INTO `customizeorder` (`orderId`, `userID`, `name`, `email`, `phone`, `mark`, `Frame_MAT`, `Saddle_MAT`, `Metal_MAT`, `DerailleurRear_MAT`, `Crankset_MAT`, `Pedal_MAT`, `Chain_MAT`, `Cage_MAT`, `Bottle_MAT`, `Brakes_MAT`, `PaintBlack_MAT`, `Wheels_MAT`, `Computer_MAT`, `HandlebarTape_MAT`, `Shifters_MAT`, `Cassette_MAT`) VALUES
(1, 16, 'sadas', 'janet91995@gmail.com', '912345678', '', '#123456', '#aaa', '#777', '#888', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'),
(2, NULL, 'asd', 'janet91995@gmail.com', '912345678', '', '#fff', '#777', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'),
(3, NULL, 'esfws', 'yove9438@gmail.com', '912345678', '', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'),
(4, 16, '123', 'janet91995@gmail.com', '912345678', '', '#261179', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#402929', '#fff', '#fff', '#fff', '#fff'),
(5, 16, 'asd', 'janet91995@gmail.com', '912345678', '', '#325b5f', '#112741', '#fff', '#fff', '#030c02', '#fff', '#fff', '#fff', '#fff', '#fff', '#ff0000', '#1cff00', '#fff', '#326276', '#fff', '#fff'),
(6, 16, '123123', 'janet91995@gmail.com', '912345678', '', '#411818', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'),
(7, 15, '123123', 'a123@gmail.com', '912345677', '', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'),
(8, 15, '123123', 'a123@gmail.com', '912345678', '11231545', '#eee', '#ccc', '#aaa', '#bbb', '#fef', '#bbb', '#111', '#222', '#333', '#444', '#555', '#666', '#777', '#888', '#999', '#000'),
(9, 15, '123123', 'a123@gmail.com', '912345678', '', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'),
(10, 15, '123123', 'a123@gmail.com', '912345678', '', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'),
(11, 15, '123123', 'a123@gmail.com', '912345679', '123', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'),
(12, 15, '123123', 'a123@gmail.com', '912345675', '', '#9b3030', '#de0000', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'),
(13, 15, '123123', 'a123@gmail.com', '912345672', '', '#309c3b', '#1c4ac1', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#05f716', '#fff', '#fff', '#fff', '#fff'),
(14, 15, '123123', 'a123@gmail.com', '912345679', 'qwe', '#e0e500', '#621e1e', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#975656', '#fff', '#2f1556', '#fff', '#fff'),
(15, 16, 'asd', 'janet91995@gmail.com', '912345678', '', '#351cd2', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#8d4848', '#fff', '#fff', '#fff', '#fff'),
(16, 16, 'asd', 'janet91995@gmail.com', '912345678', '123', '#5044a2', '#aaa', '#777', '#888', '#fff', '#fff', '#fff', '#811919', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'),
(17, 0, 'asd', 'yove9438@gmail.com', '912345678', '123', '#6a2b2b', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'),
(18, 16, 'asd', 'janet91995@gmail.com', '912345678', '', '#3b3560', '#aaa', '#777', '#888', '#fff', '#fff', '#fff', '#811919', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'),
(19, 16, 'asd', 'janet91995@gmail.com', '912345678', '', '#3b3560', '#aaa', '#777', '#888', '#fff', '#fff', '#fff', '#811919', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `customizeorder`
--
ALTER TABLE `customizeorder`
  ADD PRIMARY KEY (`orderId`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `customizeorder`
--
ALTER TABLE `customizeorder`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;
