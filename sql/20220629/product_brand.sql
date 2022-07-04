-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 29, 2022 at 12:13 PM
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
-- Table structure for table `product_brand`
--

DROP TABLE IF EXISTS `product_brand`;
CREATE TABLE `product_brand` (
  `brand_id` int(4) NOT NULL,
  `brand_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_brand`
--

INSERT INTO `product_brand` (`brand_id`, `brand_name`) VALUES
(1, 'XC/MARATHON'),
(2, 'MARATHON/TRAIL'),
(3, 'TRAIL'),
(4, 'ALL MOUNTAIN'),
(5, 'ENDURO');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product_brand`
--
ALTER TABLE `product_brand`
  ADD PRIMARY KEY (`brand_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product_brand`
--
ALTER TABLE `product_brand`
  MODIFY `brand_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;
