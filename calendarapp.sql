-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2023 at 02:15 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `calendarapp`
--
CREATE DATABASE IF NOT EXISTS `calendarapp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `calendarapp`;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `groupName` varchar(100) NOT NULL,
  `creatorUserId` int(11) NOT NULL,
  `creatorName` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `groupName`, `creatorUserId`, `creatorName`, `description`) VALUES
(37, 'Alma', 74, 'Pogány Beni', 'alma\n'),
(38, 'Teszt', 74, 'Pogány Beni', 'teszt'),
(39, 'Pogány Benedek group', 74, 'Pogány Beni', 'teszt');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `country` varchar(50) NOT NULL,
  `cityName` varchar(255) NOT NULL,
  `streetName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `country`, `cityName`, `streetName`) VALUES
(11, 'asd', 'asd', 'asd'),
(12, 'sadas', 'sdad', 'asda'),
(13, 'eq', 'wqe', 'eqw'),
(14, 'sad', 'asd', 'sadas'),
(15, 'Hungary', 'Kecskemét', 'Czollner Köz 45.'),
(16, 'Hungary', 'Kecskemét', 'Czollner Köz 45.'),
(17, '2', '2', '2'),
(18, 'sad', 's', 's');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `creatorId` int(11) NOT NULL,
  `groupId` int(11) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `taskName` varchar(255) NOT NULL,
  `color` varchar(7) NOT NULL,
  `startDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `startTime` varchar(5) NOT NULL,
  `description` varchar(255) NOT NULL,
  `locationId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `creatorId`, `groupId`, `label`, `taskName`, `color`, `startDate`, `startTime`, `description`, `locationId`) VALUES
(145, 74, NULL, NULL, 'asd', '#4169E1', '2023-10-05 11:08:53', '1:00', 'ads', NULL),
(146, 74, NULL, NULL, 'asd', '#4169E1', '2023-10-05 11:08:53', '2:00', 'asd', 11),
(147, 74, NULL, NULL, 'asdasd', '#4169E1', '2023-10-05 11:16:15', '1:00', 'asdasd', 12),
(148, 74, NULL, NULL, 'fgegw', '#4169E1', '2023-10-05 11:16:15', '1:00', 'weq', 13),
(149, 74, NULL, NULL, 'sad', '#4169E1', '2023-10-05 22:00:00', '2:00', 'sad', 14),
(150, 74, 37, NULL, 'Teszt', '#ffe135', '2023-10-05 22:00:00', '13:00', 'asd', 15),
(151, 74, NULL, 'Fontos', 'ad', '#EE4B2B', '2023-10-05 22:00:00', '1:00', 'asd', 16),
(152, 74, NULL, NULL, 'fff', '#4169E1', '2023-10-05 11:51:17', '1:00', 'fff', NULL),
(153, 74, 38, '2', '2', '#4169E1', '2023-10-05 11:53:30', '2:00', '2', 17),
(154, 74, 37, '2', 'asd', '#4169E1', '2023-10-05 11:56:25', '1:00', 'ss', 18),
(155, 74, NULL, NULL, 'yes', '#4169E1', '2023-09-30 22:00:00', '1:00', 'yes', NULL),
(156, 74, NULL, NULL, 'test', '#4169E1', '2023-10-07 22:00:00', '1:00', 'test', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `linkToPicture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `fullName`, `linkToPicture`) VALUES
(74, 'poganybenedek@gmail.com', '$2b$10$L3rWYLjSrB5Mk0mH4/5n5uWVn3wBdpOdoRPnry4bnq3lmoEkhf0c6', 'Pogány Beni', 'https://lh3.googleusercontent.com/a/ACg8ocJ6oz78vjv5TeM_VPwz1QRLzBAsr5HACpsIbJixo0ElLw=s96-c'),
(75, 'kisjanos@alma.com', '$2b$10$3mmWegV36yckmgB68/i2gevF2Qxn1LpAFF8UHXIyuEIzxA5SDlGMa', 'Kis János', ''),
(76, 'kamuelek@kamuelek.hu', '$2b$10$pQYatLWtIPnbQQeGW/H5zuIkoI2HU5KAnLCaDbDCmtfaDyJXFtV2K', 'Kamu Elek', ''),
(77, 'alma@alma.hu', '$2b$10$mUkxVM9Ak8uBtVzYrizxTOUZGnm/CdyauquBSiIwz.q8gaG/22FxO', 'Alma man', ''),
(78, 'a@a', '$2b$10$4FwrKefZseLU44XR5irMteheybLf9FQYSDNM0UNtFxX6Fj2k1SmPa', 'aaa', '');

-- --------------------------------------------------------

--
-- Table structure for table `usertogroup`
--

DROP TABLE IF EXISTS `usertogroup`;
CREATE TABLE `usertogroup` (
  `id` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usertogroup`
--

INSERT INTO `usertogroup` (`id`, `groupId`, `userId`) VALUES
(50, 34, 75),
(51, 37, 74),
(52, 37, 77),
(53, 38, 74),
(54, 38, 76),
(56, 38, 75),
(58, 38, 78),
(59, 39, 74);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usertogroup`
--
ALTER TABLE `usertogroup`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `usertogroup`
--
ALTER TABLE `usertogroup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
