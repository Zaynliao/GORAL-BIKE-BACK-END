-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-06-29 09:51:25
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
-- 資料表結構 `classes`
--

CREATE TABLE `classes` (
  `course_id` int(3) NOT NULL,
  `course_category_id` int(3) NOT NULL,
  `course_title` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_pictures` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_venue_id` int(3) NOT NULL,
  `course_location_id` int(3) NOT NULL,
  `course_date` date NOT NULL,
  `course_enrollment` int(3) NOT NULL,
  `course_start_time` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_end_time` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_status_id` int(2) NOT NULL,
  `course_price` int(7) NOT NULL,
  `course_content_id` int(3) NOT NULL,
  `course_inventory` int(3) NOT NULL,
  `course_valid` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `classes`
--

INSERT INTO `classes` (`course_id`, `course_category_id`, `course_title`, `course_pictures`, `course_venue_id`, `course_location_id`, `course_date`, `course_enrollment`, `course_start_time`, `course_end_time`, `course_status_id`, `course_price`, `course_content_id`, `course_inventory`, `course_valid`) VALUES
(1, 1, '越野小學堂', 'Taoyuan-20220115.jpg', 0, 8, '2022-01-08', 6, '2021-12-25T10:00', '2022-01-04T10:00', 3, 600, 1, 0, 1),
(2, 2, '越野小學堂', 'Taichung-20220115.jpg', 0, 8, '2022-01-15', 6, '2022-01-01T10:00', '2022-01-12T10:00', 3, 1400, 2, 0, 1),
(3, 2, 'MTB 訓練營', '003-Taoyuan-20220415.jpg', 1, 4, '2022-01-22', 12, '2022-01-05T10:00', '2022-01-19T10:00', 3, 1000, 3, 0, 1),
(5, 2, '越野跨領域', 'rZwq0pTgnilTZhCVjCwRvd1LuAEP2lEfU0GMZJnx-web.jpg', 0, 15, '2022-01-30', 20, '2022-01-18T10:00', '2022-01-27T10:00', 3, 2400, 4, 0, 1),
(35, 1, 'MTB MEETUP', 'north001.jpg', 0, 4, '2022-04-30', 20, '2022-04-13T16:07', '2022-04-27T16:07', 2, 1200, 5, 20, 1),
(40, 1, '米奇帶你騎入回憶的漩渦', 'UoJ2hclJrMOuUNQgkNTp1zpxLYYurstZtIBhGvB0-thumb.jpg', 0, 4, '2022-05-07', 20, '2022-04-20T10:00', '2022-05-04T10:00', 2, 500, 6, 20, 1),
(41, 1, '綸綸帶給你歡樂無騎限', 'JgPQyggJZ9U9HdweyKSzyLhED4UEutPRyMqHHb9s-banner.jpg', 0, 4, '2022-05-14', 20, '2022-04-19T10:00', '2022-05-10T10:00', 2, 500, 7, 20, 1),
(42, 1, 'MTB 親子課程', 'hC8Sx1VkN9Z1VHRGIKvIpEMURiepTu2FUSwpjBCs-web.jpg', 0, 4, '2022-04-02', 20, '2022-03-16T10:00', '2022-03-30T22:00', 3, 600, 8, 20, 1),
(43, 2, 'MTB 大雜燴', 'mhbbaVT0tHjG4HaT7t9ivj0sv1zKk8xYVB5hiR13-banner.jpg', 0, 4, '2022-05-28', 20, '2022-05-10T10:00', '2022-05-24T10:00', 1, 1000, 1, 20, 1),
(44, 2, '越野三項墾丁訓練營', '004-Kenting-20221211.jpg', 0, 15, '2022-06-04', 12, '2022-05-18T10:00', '2022-05-31T10:00', 1, 7600, 2, 12, 1),
(45, 2, '越野三項墾丁訓練營', 'Kenting002.jpg', 0, 15, '2022-06-11', 12, '2022-05-24T10:00', '2022-06-07T10:00', 1, 7600, 3, 12, 1),
(46, 1, '登山車訓練營', '006-north-20221219.jpg', 0, 4, '2022-06-18', 10, '2022-05-31T10:00', '2022-06-14T10:00', 1, 2000, 4, 10, 1),
(47, 1, 'MTB MEETUP', 'Taoyuan-001.jpg', 0, 4, '2022-05-01', 20, '2022-04-17T10:00', '2022-04-27T10:00', 2, 1000, 5, 20, 1),
(48, 1, 'MTB MEETUP', '004Taoyuan-.jpg', 0, 8, '2022-05-08', 15, '2022-04-24T10:00', '2022-05-04T10:00', 2, 2000, 6, 15, 1),
(50, 2, '越野小學堂', 'north001.jpg', 0, 8, '2022-01-16', 6, '2022-01-01T10:00', '2022-01-12T10:00', 3, 1400, 7, 0, 1),
(51, 2, 'MTB 訓練營', 'o2g10honToyU5Pef5ehLZCxGwxRKfWQ045QKkmZz-web.jpg', 0, 3, '2022-04-03', 12, '2022-03-16T10:00', '2022-03-30T10:00', 3, 1000, 8, 0, 1),
(52, 2, '越野跨領域', 'Kenting001.jpg', 0, 15, '2022-01-29', 20, '2022-01-12T10:00', '2022-01-26T10:00', 3, 2400, 1, 0, 1),
(53, 1, 'MTB MEETUP', 'north001.jpg', 0, 4, '2022-01-16', 20, '2021-12-23T16:07', '2022-01-13T16:07', 3, 1200, 2, 20, 1),
(54, 1, '米奇帶你騎入回憶的漩渦', '8ugXldbt8fmQjV08UbPUem2tPqJJwOIStXXvXKHw-web.jpg', 0, 4, '2022-03-20', 20, '2022-03-03T10:00', '2022-03-17T10:00', 3, 500, 3, 20, 1),
(55, 1, '綸綸帶給你歡樂無騎限', 'JgPQyggJZ9U9HdweyKSzyLhED4UEutPRyMqHHb9s-banner.jpg', 0, 4, '2022-02-26', 20, '2022-02-09T10:00', '2022-02-23T10:00', 3, 500, 4, 20, 1),
(56, 1, 'MTB 親子課程', 'aQj9jor81ZisiizAXUEul1nv55A2noaBFXzei4Ac-banner.jpg', 0, 1, '2022-05-21', 20, '2022-05-03T10:00', '2022-05-17T22:00', 1, 600, 5, 20, 1),
(58, 1, '綸綸帶給你歡樂無騎限', 'JgPQyggJZ9U9HdweyKSzyLhED4UEutPRyMqHHb9s-banner.jpg', 0, 4, '2022-02-26', 20, '2022-02-09T10:00', '2022-02-23T10:00', 3, 500, 6, 20, 1),
(59, 1, 'MTB 親子課程', 'aQj9jor81ZisiizAXUEul1nv55A2noaBFXzei4Ac-banner.jpg', 0, 1, '2022-05-21', 20, '2022-05-03T10:00', '2022-05-17T22:00', 1, 600, 7, 20, 1),
(60, 1, 'MTB MEETUP', 'north001.jpg', 0, 4, '2022-01-16', 20, '2021-12-23T16:07', '2022-01-13T16:07', 3, 1200, 8, 20, 1),
(61, 1, '米奇帶你騎入回憶的漩渦', '8ugXldbt8fmQjV08UbPUem2tPqJJwOIStXXvXKHw-web.jpg', 0, 4, '2022-03-20', 20, '2022-03-03T10:00', '2022-03-17T10:00', 3, 500, 1, 20, 1),
(62, 1, '綸綸帶給你歡樂無騎限', 'JgPQyggJZ9U9HdweyKSzyLhED4UEutPRyMqHHb9s-banner.jpg', 0, 4, '2022-02-26', 20, '2022-02-09T10:00', '2022-02-23T10:00', 3, 500, 4, 20, 1),
(63, 1, 'MTB 親子課程', 'aQj9jor81ZisiizAXUEul1nv55A2noaBFXzei4Ac-banner.jpg', 0, 1, '2022-05-21', 20, '2022-05-03T10:00', '2022-05-17T22:00', 1, 600, 2, 20, 1),
(64, 1, '綸綸帶給你歡樂無騎限', 'JgPQyggJZ9U9HdweyKSzyLhED4UEutPRyMqHHb9s-banner.jpg', 0, 4, '2022-02-26', 20, '2022-02-09T10:00', '2022-02-23T10:00', 3, 500, 3, 20, 1),
(65, 1, 'MTB 親子課程', 'aQj9jor81ZisiizAXUEul1nv55A2noaBFXzei4Ac-banner.jpg', 0, 1, '2022-05-21', 20, '2022-05-03T10:00', '2022-05-17T22:00', 1, 600, 5, 20, 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `course_id` (`course_id`,`course_category_id`,`course_title`,`course_pictures`,`course_location_id`,`course_date`,`course_start_time`,`course_end_time`,`course_status_id`,`course_price`,`course_inventory`,`course_valid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `classes`
--
ALTER TABLE `classes`
  MODIFY `course_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
COMMIT;
