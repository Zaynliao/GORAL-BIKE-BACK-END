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
-- Table structure for table `product_parts`
--

DROP TABLE IF EXISTS `product_parts`;
CREATE TABLE `product_parts` (
  `product_parts_id` int(5) NOT NULL,
  `product_parts` varchar(50) NOT NULL,
  `product_parts_images` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_parts`
--

INSERT INTO `product_parts` (`product_parts_id`, `product_parts`, `product_parts_images`) VALUES
(1, 'RACELITE 61 ALUMINIUM', 'RACELITE 61 ALUMINIUM.png'),
(2, 'X-TAPER HEADTUBE', 'X-TAPER HEADTUBE.png'),
(3, 'SMOOTH WELDING', 'SMOOTH WELDING.png'),
(4, 'INTERNAL CABLE ROUTING', 'INTERNAL CABLE ROUTING.png'),
(5, 'DOWN TUBE EXIT', 'DOWN TUBE EXIT.png'),
(6, 'K-MOUNT', 'K-MOUNT.png'),
(7, 'C-MOUNT', 'C-MOUNT.png'),
(8, 'TECHNO FORMING SYSTEM', 'TECHNO FORMING SYSTEM.png'),
(9, 'F-MOUNT', 'F-MOUNT.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product_parts`
--
ALTER TABLE `product_parts`
  ADD PRIMARY KEY (`product_parts_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product_parts`
--
ALTER TABLE `product_parts`
  MODIFY `product_parts_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;
