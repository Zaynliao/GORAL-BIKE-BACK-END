-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2022 at 11:59 AM
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
-- Table structure for table `product_product_color`
--

DROP TABLE IF EXISTS `product_product_color`;
CREATE TABLE `product_product_color` (
  `product_id` int(5) NOT NULL,
  `product_color_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_product_color`
--

INSERT INTO `product_product_color` (`product_id`, `product_color_id`) VALUES
(141, 1),
(141, 2),
(141, 3),
(141, 5),
(141, 6),
(141, 7),
(141, 8),
(141, 10),
(142, 1),
(142, 2),
(142, 3),
(142, 5),
(142, 6),
(142, 7),
(142, 8),
(142, 10),
(143, 1),
(143, 2),
(143, 3),
(143, 5),
(143, 6),
(143, 7),
(143, 8),
(143, 10),
(144, 1),
(144, 2),
(144, 3),
(144, 5),
(144, 6),
(144, 7),
(144, 8),
(144, 10),
(145, 1),
(145, 2),
(145, 3),
(145, 5),
(145, 6),
(145, 7),
(145, 8),
(145, 10),
(146, 1),
(146, 2),
(146, 3),
(146, 5),
(146, 6),
(146, 7),
(146, 8),
(146, 10),
(147, 1),
(147, 2),
(147, 3),
(147, 5),
(147, 6),
(147, 7),
(147, 8),
(147, 10),
(148, 1),
(148, 2),
(148, 3),
(148, 5),
(148, 6),
(148, 7),
(148, 8),
(148, 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product_product_color`
--
ALTER TABLE `product_product_color`
  ADD PRIMARY KEY (`product_id`,`product_color_id`);
COMMIT;
