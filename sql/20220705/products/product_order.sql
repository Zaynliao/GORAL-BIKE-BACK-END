-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2022 at 11:58 AM
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
-- Table structure for table `product_order`
--

DROP TABLE IF EXISTS `product_order`;
CREATE TABLE `product_order` (
  `id` int(10) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `order_count` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_order`
--

INSERT INTO `product_order` (`id`, `product_id`, `order_id`, `order_count`) VALUES
(9, 2, 1, 1),
(10, 3, 1, 1),
(11, 4, 1, 1),
(12, 49, 2, 1),
(13, 52, 2, 1),
(14, 54, 2, 1),
(15, 56, 2, 1),
(16, 50, 3, 1),
(17, 51, 3, 1),
(18, 60, 3, 1),
(19, 61, 3, 1),
(20, 7, 4, 1),
(21, 65, 4, 1),
(22, 67, 4, 1),
(23, 69, 4, 1),
(24, 141, 4, 1),
(25, 16, 5, 1),
(26, 26, 5, 1),
(27, 49, 5, 1),
(32, 66, 7, 1),
(33, 67, 7, 1),
(34, 68, 7, 1),
(35, 57, 8, 1),
(36, 58, 8, 1),
(37, 59, 8, 1),
(38, 60, 8, 1),
(39, 61, 8, 1),
(40, 3, 9, 1),
(41, 50, 9, 1),
(42, 51, 9, 1),
(43, 57, 9, 1),
(44, 1, 10, 1),
(45, 2, 10, 1),
(46, 3, 10, 1),
(47, 4, 10, 1),
(48, 7, 10, 1),
(49, 9, 10, 1),
(50, 14, 10, 1),
(51, 15, 10, 1),
(52, 16, 10, 1),
(53, 26, 10, 1),
(54, 46, 10, 1),
(55, 47, 10, 1),
(56, 48, 10, 1),
(57, 49, 10, 1),
(58, 50, 10, 1),
(59, 51, 10, 1),
(60, 52, 10, 1),
(61, 54, 10, 1),
(62, 56, 10, 1),
(63, 57, 10, 1),
(64, 58, 10, 1),
(65, 59, 10, 1),
(66, 60, 10, 1),
(67, 61, 10, 1),
(68, 62, 10, 1),
(69, 63, 10, 1),
(70, 64, 10, 1),
(71, 65, 10, 1),
(72, 66, 10, 1),
(73, 67, 10, 1),
(74, 68, 10, 1),
(75, 69, 10, 1),
(76, 70, 10, 1),
(77, 71, 10, 1),
(78, 73, 10, 1),
(79, 141, 10, 1),
(80, 49, 11, 1),
(81, 52, 11, 1),
(82, 54, 11, 1),
(83, 63, 12, 1),
(84, 64, 12, 1),
(85, 65, 12, 1),
(86, 50, 13, 1),
(87, 64, 13, 1),
(88, 3, 19, 1),
(89, 4, 19, 1),
(90, 26, 18, 1),
(91, 46, 18, 1),
(92, 47, 18, 1),
(93, 26, 17, 1),
(94, 46, 17, 1),
(95, 49, 17, 1),
(96, 3, 14, 1),
(97, 4, 14, 1),
(98, 14, 14, 1),
(99, 15, 14, 1),
(102, 9, 16, 1),
(103, 14, 16, 1),
(104, 16, 16, 1),
(105, 26, 16, 1),
(106, 46, 16, 1),
(107, 1, 15, 1),
(108, 2, 15, 1),
(109, 3, 15, 1),
(110, 4, 15, 1),
(111, 5, 15, 1),
(112, 6, 15, 1),
(113, 7, 15, 1),
(114, 8, 15, 1),
(115, 9, 15, 1),
(116, 10, 15, 1),
(117, 11, 15, 1),
(118, 12, 15, 1),
(119, 13, 15, 1),
(120, 14, 15, 1),
(121, 15, 15, 1),
(122, 16, 15, 1),
(123, 17, 15, 1),
(124, 18, 15, 1),
(125, 19, 15, 1),
(126, 20, 15, 1),
(127, 21, 15, 1),
(128, 22, 15, 1),
(129, 23, 15, 1),
(130, 24, 15, 1),
(131, 25, 15, 1),
(132, 26, 15, 1),
(133, 27, 15, 1),
(134, 28, 15, 1),
(135, 29, 15, 1),
(136, 30, 15, 1),
(137, 31, 15, 1),
(138, 32, 15, 1),
(139, 33, 15, 1),
(140, 34, 15, 1),
(141, 35, 15, 1),
(142, 36, 15, 1),
(143, 37, 15, 1),
(144, 38, 15, 1),
(145, 39, 15, 1),
(146, 40, 15, 1),
(147, 41, 15, 1),
(148, 42, 15, 1),
(149, 43, 15, 1),
(150, 44, 15, 1),
(151, 45, 15, 1),
(152, 46, 15, 1),
(153, 47, 15, 1),
(154, 48, 15, 1),
(155, 49, 15, 1),
(156, 50, 15, 1),
(157, 51, 15, 1),
(158, 52, 15, 1),
(159, 53, 15, 1),
(160, 54, 15, 1),
(161, 55, 15, 1),
(162, 56, 15, 1),
(163, 57, 15, 1),
(164, 58, 15, 1),
(165, 59, 15, 1),
(166, 60, 15, 1),
(167, 61, 15, 1),
(168, 62, 15, 1),
(169, 63, 15, 1),
(170, 64, 15, 1),
(171, 65, 15, 1),
(172, 66, 15, 1),
(173, 67, 15, 1),
(174, 68, 15, 1),
(175, 69, 15, 1),
(176, 70, 15, 1),
(177, 71, 15, 1),
(178, 72, 15, 1),
(179, 73, 15, 1),
(180, 141, 15, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product_order`
--
ALTER TABLE `product_order`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product_order`
--
ALTER TABLE `product_order`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;
COMMIT;