-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2022 at 11:55 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `goral_bike`
--

-- --------------------------------------------------------

--
-- Table structure for table `product_check`
--

DROP TABLE IF EXISTS `product_check`;
CREATE TABLE `product_check` (
  `product_check_id` int(5) NOT NULL,
  `product_check_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_check`
--

INSERT INTO `product_check` (`product_check_id`, `product_check_name`) VALUES
(1, '採用三種不同管壁厚薄度打造的全鋁合金車體'),
(2, '可鎖定前、後避震'),
(3, '配備升降座桿'),
(4, 'FLOAT LINK浮動連桿避震平台'),
(5, 'Shimano 1X 傳動系統'),
(6, '29er輪組'),
(7, '輕量CF3碳纖維車體，29er輪徑'),
(8, 'RockShox Reba 100mm避震前叉，支援遠端鎖定'),
(9, '相容無內胎系統的輪組，低滾動阻力的Maxxis車胎'),
(10, 'Shimano XT\\SLX 12s 傳動系統，油壓碟煞'),
(11, '車架支援升降座桿走線配置'),
(12, '碳纖維座桿'),
(13, 'XC\\Marathon 騎乘幾何'),
(14, 'Manitou Markhor 100mm避震前叉，支援遠端鎖定'),
(15, 'Shimano XT\\Deore 12s 傳動系統，油壓碟煞'),
(16, '隱藏式走線設計'),
(17, '採用三種不同的管壁厚度、平整焊接打造的全鋁合金車體；29er輪徑'),
(18, 'Shimano Deore 11s 傳動系統；油壓碟煞系統'),
(19, 'SMART ENTRY 內走線設計'),
(20, '平整焊接、雙重管壁厚度打造的全鋁合金車體；29er輪徑'),
(21, '較為直挺的騎乘幾何，騎乘操控舒適無負擔'),
(22, 'Shimano XT 12s 傳動系統；XT油壓碟煞系統'),
(23, 'Shimano XT\\SLX 2x12 傳動系統'),
(24, 'Shimano油壓碟煞系統'),
(25, '採用三種不同管壁厚薄度打造的全鋁合金車體，林道騎乘幾何最佳化'),
(26, 'FLOAT LINK浮動連桿避震平台，後避震行程為120mm設定；130mm避震前叉'),
(27, '可鎖定前、後避震'),
(28, 'Shimano 1X 傳動系統'),
(29, '配備升降座桿'),
(30, '29er輪組'),
(31, 'RockShox\'s SID SL 100mm避震前叉，支援遠端鎖定'),
(32, 'Reynolds碳纖維輪組，低滾動阻力的Maxxis車胎'),
(33, 'Shimano XT 12s 傳動系統，XT制動'),
(34, '碳纖維S-FLEX高吸震座桿'),
(35, '雙重管壁厚度打造的堅固耐用全鋁合金車體'),
(36, '140 mm 避震前叉'),
(37, '長延伸量(Reach)，頭管、立管角度最佳化，林道玩樂騎乘幾何'),
(38, '29er輪徑，2.4”車胎(車架可支援至2.5”)'),
(39, '超低跨高車架設計，搭配長行程伸降座桿'),
(40, '車架具備諸多擴充鎖孔；內走線設計');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product_check`
--
ALTER TABLE `product_check`
  ADD PRIMARY KEY (`product_check_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product_check`
--
ALTER TABLE `product_check`
  MODIFY `product_check_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;
