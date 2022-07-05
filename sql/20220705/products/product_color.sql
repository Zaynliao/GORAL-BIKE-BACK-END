-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2022 at 11:56 AM
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
-- Table structure for table `product_color`
--

DROP TABLE IF EXISTS `product_color`;
CREATE TABLE `product_color` (
  `color_id` int(4) NOT NULL,
  `color_name` varchar(22) NOT NULL,
  `color_value` varchar(10) NOT NULL,
  `valid` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_color`
--

INSERT INTO `product_color` (`color_id`, `color_name`, `color_value`, `valid`) VALUES
(1, 'Brown', '#643225', 1),
(2, 'Red', '#D30000', 1),
(3, 'Orange', '#F4890A', 1),
(4, 'Yellow', '#F4C10A', 0),
(5, 'Green', '#80A23F', 1),
(6, 'Cyan', '#3FA29C', 1),
(7, 'Teal', '#3F72A2', 1),
(8, 'Indigo', '#3F49A2', 1),
(9, 'Violet', '#6628B6', 1),
(10, 'Dark Grey', '#3E3E3E', 1),
(11, 'Light Grey', '#C4C4C4', 0),
(12, 'White', '#F6F6F6', 1),
(13, 'Black', '#000000', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product_color`
--
ALTER TABLE `product_color`
  ADD PRIMARY KEY (`color_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product_color`
--
ALTER TABLE `product_color`
  MODIFY `color_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;
