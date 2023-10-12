-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2023 at 03:16 PM
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
(52, 'Alma1', 74, 'Pogány Beni', 'almasssdsda');

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
(18, 'sad', 's', 's'),
(19, 'Hungary', 'Kecskemét', 'Izsáki út 2.');

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
(157, 74, 52, 'Fontos', 'Banana', '#FFBF00', '2023-10-11 09:23:00', '12:00', 'Banana', 19),
(158, 74, NULL, NULL, 'asd', '#9933FF', '2023-10-13 22:00:00', '14:00', 'asd', NULL),
(159, 74, NULL, NULL, 'test', '#9933FF', '2023-10-12 20:00:00', '2:00', 'test', NULL),
(160, 74, NULL, NULL, 'q', '#00A36C', '2023-10-11 22:00:00', '1:00', 'q', NULL),
(161, 74, NULL, NULL, 'asd', '#00A36C', '2023-10-07 22:00:00', '2:00', 'asd', NULL),
(162, 74, NULL, NULL, 'fg', '#00A36C', '2023-10-08 22:00:00', '2:00', 'asd', NULL),
(163, 74, NULL, NULL, 'rreeee', '#EE4B2B', '2023-10-09 22:00:00', '2:00', 'reeee', NULL);

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
(78, 'a@a', '$2b$10$4FwrKefZseLU44XR5irMteheybLf9FQYSDNM0UNtFxX6Fj2k1SmPa', 'aaa', ''),
(79, 'drago2162@gmail.com', '$2b$10$bl3Hr3VSqFF6DHt2A1/mTeDDLEC60rCn2oEAn5dZIZ791D10h3NpS', 'Benedek Pogány', 'https://lh3.googleusercontent.com/a/ACg8ocI1C8IRgpCeUzDyu7PtXmol2qXG_s_fM8obi2UjE3DVGw=s96-c');

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
(74, 52, 74);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `groupId` (`groupId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usertogroup`
--
ALTER TABLE `usertogroup`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groupId` (`groupId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=164;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `usertogroup`
--
ALTER TABLE `usertogroup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`groupId`) REFERENCES `groups` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `usertogroup`
--
ALTER TABLE `usertogroup`
  ADD CONSTRAINT `usertogroup_ibfk_1` FOREIGN KEY (`groupId`) REFERENCES `groups` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
