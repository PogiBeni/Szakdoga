-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2023 at 03:09 PM
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
  `color` varchar(7) NOT NULL,
  `creatorUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `groupName`, `color`, `creatorUserId`) VALUES
(0, 'None', '', -1),
(3, 'sasdfdsf', 'green', 54),
(4, 'asdadas', '#EE4B2B', 54),
(5, 'Alma', 'green', 45),
(6, 'Alma', '#4169E1', 72),
(7, 'Almoo', '#EE4B2B', 72),
(8, 'Almbbaa', '#ffe135', 72),
(9, 'Almbbaa', '#ffe135', 72);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `creatorId` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `taskName` varchar(255) NOT NULL,
  `color` varchar(7) NOT NULL,
  `startDate` date NOT NULL,
  `startTime` varchar(5) NOT NULL,
  `endDate` date NOT NULL,
  `endTime` varchar(5) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `creatorId`, `groupId`, `taskName`, `color`, `startDate`, `startTime`, `endDate`, `endTime`, `description`) VALUES
(17, 47, 0, 'Kutya séta', '#4169E1', '2023-09-03', '12:00', '2023-09-03', '13:00', 'Kutya séta'),
(18, 47, 0, 'Kutya séta', '#4169E1', '2023-09-03', '12:00', '2023-09-03', '13:00', 'Kutya séta'),
(19, 45, 0, 'a', '#4169E1', '2023-09-04', '14:00', '2023-09-04', '15:00', 'adadsa'),
(20, 47, 0, 'Szakdogát csinálni', '#EE4B2B', '2023-09-13', '10:00', '2023-09-13', '14:00', 'Szakdogát csinálni'),
(21, 47, 0, 'Alma', '#4169E1', '2023-09-11', '1:00', '2023-09-11', '2:00', 'Alma'),
(22, 45, 0, 'Szakdoga', '#EE4B2B', '2023-09-18', '1:00', '2023-09-18', '16:00', 'Csinálom a szakdogát\n'),
(23, 45, 0, 'Szakdoga', '#EE4B2B', '2023-09-18', '1:00', '2023-09-18', '16:00', 'Csinálom a szakdogát\n'),
(24, 72, 0, 'tht', 'green', '2023-09-16', '2:00', '2023-09-18', '3:00', '4324');

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
(45, 'a@a', '$2b$10$1tMyjZg5qmZJF42xQN.LYe8wOFo3NjiEW6LG1vvd9JtnzegH5HklS', 'a', ''),
(48, 'b@b', '$2b$10$R70k7qKKOm57my2z1nu3Wei/twbU6MXZtAWOfNuSLMcEwBmw7YWpK', 'b', ''),
(49, 'c@c', '$2b$10$gWs8phxbgcwdVBKwYitUZO0mAaqpZRtFmjEEbivdJ06b9.8ldRCzu', 'c', ''),
(50, 'd@d', '$2b$10$2CpVZY7AZrOULpPpUTc05ek239n9t2owaoW2mIoANmiKnEg4eVjIS', 'd', ''),
(51, 'k@k', '$2b$10$kXCNMRfNgYTQ.GaR1pAFOu7o4rJmFw.D.6HNVc83eU/HHevZr/oGC', 'k', ''),
(52, 'f@f', '$2b$10$s/.MYAOYVVwZsvj/0/MoK.KkFAwww1iAuE944kJKUBXExPwkTkEE6', 'f', ''),
(53, 'k@k', '$2b$10$oY5curr1aIoEwroi.WsvWOMoBCqH2fFRcTmkmdlcee0u0afrHIpy2', 'k', ''),
(56, '', '$2b$10$AZQMTPoLJQZNPmYbgQpkHON1CLTzTXCm4kGQ/fPmWIv8F51uaBsne', '', ''),
(57, '', '$2b$10$NhQhM7l6bQr.u910iV2pce5twYheU9pNVuguqiW3YUKDb5gZqH0gm', 'a', ''),
(65, 'h@h', '$2b$10$ufaRKk1CQPG73yJWmqE6WON4s3R/dXEM9qGcRCs76BvtHN5GzqCmC', 'a', ''),
(66, 'sda@adsad', '$2b$10$KDsWOGZgg/9Mwh5LeMzf3.pH1yj7zc1bumgkX3l2934IuxzLWMTCK', 'sada', ''),
(67, 'hgfhasdafg@dsfgsdgf', '$2b$10$p3UujXYA8QPK0xYc1GRfQOjFK6I5RAcA4iH0R9NvNrv.NepXY1uau', 'srawsfsd', ''),
(68, 'asdasdasdad@asdas', '$2b$10$jcHfXZJIPMcUF0CyNDPfWeNupufobQWYrtCjUEOdkQM3Y4QjIndFC', 'sadasd', ''),
(69, 'd@a', '$2b$10$5SZ01aJA6ljs1YWEWptmguaSJHvRqZJsBwDANxtrQr/to43z2VnfC', 'dsfvsdfg', ''),
(70, 'asd@asd', '$2b$10$bDvYYCxkY.Uro9uRVVVOM.IM1KZM78i3j6miVqTuS72WpryB7U/hW', 'asdsadad', ''),
(72, 'poganybenedek@gmail.com', '$2b$10$TiAuw6gbJDBhrha.kaW/i.qNW1W2bKi.OLdPMmabFdDex2kFONsOq', 'Pogány Beni', 'https://lh3.googleusercontent.com/a/ACg8ocJ6oz78vjv5TeM_VPwz1QRLzBAsr5HACpsIbJixo0ElLw=s96-c');

-- --------------------------------------------------------

--
-- Table structure for table `usertogroup`
--

DROP TABLE IF EXISTS `usertogroup`;
CREATE TABLE `usertogroup` (
  `userId` int(11) NOT NULL,
  `groupId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
