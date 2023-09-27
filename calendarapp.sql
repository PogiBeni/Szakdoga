-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2023 at 10:35 AM
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
(38, 'Teszt', 74, 'Pogány Beni', 'teszt');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `creatorId` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `taskName` varchar(255) NOT NULL,
  `color` varchar(7) NOT NULL,
  `startDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `startTime` varchar(5) NOT NULL,
  `endDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `endTime` varchar(5) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `creatorId`, `groupId`, `label`, `taskName`, `color`, `startDate`, `startTime`, `endDate`, `endTime`, `description`) VALUES
(76, 74, 37, '', 'Alma', 'green', '2023-09-24 22:00:00', '10:00', '2023-09-24 22:00:00', '12:00', 'alma szedés'),
(77, 74, 0, '', 'asd', '#9933FF', '2023-09-25 22:00:00', '1:00', '2023-09-25 22:00:00', '2:00', 'asd'),
(78, 74, 0, '', 'ad', '#4169E1', '2023-09-25 22:00:00', '13:00', '2023-09-25 22:00:00', '13:39', 'asd'),
(79, 74, 0, '', 'df', '#4169E1', '2023-09-03 22:00:00', '13:41', '2023-09-27 22:00:00', '13:47', 'df'),
(80, 74, 0, '', 'ff', '#4169E1', '2023-09-24 22:00:00', '01:00', '2023-09-24 22:00:00', '02:00', 'ff'),
(81, 74, 37, '', 'asd', '#EE4B2B', '2023-09-24 22:00:00', '01:00', '2023-09-24 22:00:00', '01:00', 'asd'),
(82, 74, 0, '', 'ggg', '#EE4B2B', '2023-09-18 22:00:00', '01:00', '2023-09-18 22:00:00', '01:00', 'ggg'),
(83, 74, 0, '', 'hhh', '#EE4B2B', '2023-09-18 22:00:00', '01:00', '2023-09-18 22:00:00', '02:00', 'hhh'),
(84, 74, 0, '', 'ttt', '#EE4B2B', '2023-09-18 22:00:00', '01:00', '2023-09-18 22:00:00', '01:00', 'ttt'),
(85, 74, 0, '', 'ffd', '#4169E1', '2023-09-14 22:00:00', '01:00', '2023-09-14 22:00:00', '02:00', 'fdf'),
(86, 74, 37, '', 'ac', '#4169E1', '2023-08-31 22:00:00', '01:00', '2023-08-31 22:00:00', '01:00', 'ac'),
(87, 74, 0, '', 'fg', '#4169E1', '2023-08-31 22:00:00', '01:00', '2023-08-31 22:00:00', '02:00', 'fg'),
(88, 74, 0, '', 'fgd', '#4169E1', '2023-08-31 22:00:00', '01:00', '2023-08-31 22:00:00', '02:00', 'fgd'),
(89, 74, 0, '', 'ads', '#4169E1', '2023-08-31 22:00:00', '01:00', '2023-08-31 22:00:00', '01:00', 'asd'),
(90, 74, 0, '', 'asd', '#4169E1', '2023-09-03 22:00:00', '01:00', '2023-09-03 22:00:00', '01:00', 'asd'),
(91, 74, 0, '', 'vvvvvvv', '#4169E1', '2023-09-03 22:00:00', '01:00', '2023-09-03 22:00:00', '02:00', 'avvvvv'),
(92, 74, 0, '', 'avvv', '#4169E1', '2023-09-05 22:00:00', '01:00', '2023-09-05 22:00:00', '02:00', 'avvv'),
(93, 74, 0, '', 'bbbbbbbb', '#4169E1', '2023-09-06 22:00:00', '01:00', '2023-09-06 22:00:00', '02:00', 'bbbbbbbbb'),
(94, 74, 0, '', 'aa', '#4169E1', '2023-09-06 22:00:00', '14:20', '2023-09-06 22:00:00', '14:20', 'aa'),
(95, 74, 0, '', 'as', '#4169E1', '2023-09-06 22:00:00', '01:02', '2023-09-06 22:00:00', '01:02', 'asf'),
(96, 74, 37, '', 'asd', '#4169E1', '2023-09-06 22:00:00', '01:02', '2023-09-06 22:00:00', '01:02', 'asd'),
(97, 74, 0, '', '11', '#4169E1', '2023-09-09 22:00:00', '1:00', '2023-09-09 22:00:00', '1:00', '11'),
(98, 74, 37, '', 'sad', '#4169E1', '2023-09-26 20:00:00', '1:00', '2023-09-26 20:00:00', '2:00', 'ads'),
(99, 74, 0, '', 'asdasd', '#4169E1', '2023-09-09 20:00:00', '1:00', '2023-09-09 20:00:00', '2:00', 'asd'),
(100, 74, 37, '', '10', '#4169E1', '2023-09-09 22:00:00', '10:00', '2023-09-09 22:00:00', '10:00', '10'),
(101, 74, 38, '', '2023/27/09', '#4169E1', '2023-09-26 22:00:00', '8:00', '2023-09-26 22:00:00', '9:00', '2023/27/09'),
(102, 74, 0, '', 'teszt', '#4169E1', '2023-09-27 22:00:00', '1:00', '2023-09-27 22:00:00', '2:00', 'teszt'),
(103, 74, 37, '', 'yes', '#4169E1', '2023-09-19 22:00:00', '1:00', '2023-09-19 22:00:00', '2:00', 'yes'),
(104, 74, 0, 'Fontos', 'asd', '#4169E1', '2023-09-19 22:00:00', '1:00', '2023-09-19 22:00:00', '2:00', 'asd'),
(105, 74, 0, 'Alma', 'rr', '#4169E1', '2023-09-19 22:00:00', '1:00', '2023-09-19 22:00:00', '2:00', 'rr'),
(106, 74, 37, '', 'asd', '#4169E1', '2023-09-27 07:30:21', '1:00', '2023-09-27 07:30:21', '2:00', 'asd'),
(107, 74, 0, '', 'asd', '#4169E1', '2023-09-27 07:30:21', '1:00', '2023-09-27 07:30:21', '2:00', 'asd'),
(108, 74, 0, '', 'asd', '#4169E1', '2023-09-27 07:30:21', '1:00', '2023-09-27 07:30:21', '2:00', 'asd'),
(109, 74, 0, '', 'a', '#4169E1', '2023-09-27 22:00:00', '1:00', '2023-09-27 22:00:00', '2:00', 'a'),
(110, 74, 37, 'Alma', 'adsdasd', '#4169E1', '2023-09-27 07:39:16', '1:00', '2023-09-27 07:39:16', '2:00', 'asdasd'),
(111, 74, 0, 'Alma', 'asd', '#4169E1', '2023-09-27 07:39:16', '1:00', '2023-09-27 07:39:16', '2:00', 'asd'),
(112, 74, 0, '', 'asd', '#FFBF00', '2023-09-02 22:00:00', '1:00', '2023-09-02 22:00:00', '2:00', 'asd'),
(113, 74, 0, 'Alma', 'rrr', '#FFBF00', '2023-09-02 22:00:00', '1:00', '2023-09-02 22:00:00', '1:00', 'rrr'),
(114, 74, 0, '', 'asd', '#4169E1', '2023-09-27 08:24:52', '1:00', '2023-09-27 08:24:52', '2:00', 'asd'),
(115, 74, 0, 'korte', 'asd', '#4169E1', '2023-09-27 08:25:53', '1:00', '2023-09-27 08:25:53', '1:00', 'asd'),
(116, 74, 0, 'fa', 'reeee', '#4169E1', '2023-09-27 08:33:52', '1:00', '2023-09-27 08:33:52', '1:00', 'reee');

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
(56, 38, 75);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `usertogroup`
--
ALTER TABLE `usertogroup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
