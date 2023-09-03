-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2023 at 08:07 PM
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
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `creatorId` int(11) NOT NULL,
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

INSERT INTO `tasks` (`id`, `creatorId`, `taskName`, `color`, `startDate`, `startTime`, `endDate`, `endTime`, `description`) VALUES
(17, 47, 'Kutya séta', '#4169E1', '2023-09-03', '12:00', '2023-09-03', '13:00', 'Kutya séta'),
(18, 47, 'Kutya séta', '#4169E1', '2023-09-03', '12:00', '2023-09-03', '13:00', 'Kutya séta');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

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
(47, 'poganybenedek@gmail.com', '', 'Pogány Beni', 'https://lh3.googleusercontent.com/a/AAcHTteHDGjuQwV_rEooeUFbGp8ImaqQmunx_xB4SXxCNYr0zQ=s96-c'),
(48, 'b@b', '$2b$10$R70k7qKKOm57my2z1nu3Wei/twbU6MXZtAWOfNuSLMcEwBmw7YWpK', 'b', ''),
(49, 'c@c', '$2b$10$gWs8phxbgcwdVBKwYitUZO0mAaqpZRtFmjEEbivdJ06b9.8ldRCzu', 'c', ''),
(50, 'd@d', '$2b$10$2CpVZY7AZrOULpPpUTc05ek239n9t2owaoW2mIoANmiKnEg4eVjIS', 'd', ''),
(51, 'k@k', '$2b$10$kXCNMRfNgYTQ.GaR1pAFOu7o4rJmFw.D.6HNVc83eU/HHevZr/oGC', 'k', ''),
(52, 'f@f', '$2b$10$s/.MYAOYVVwZsvj/0/MoK.KkFAwww1iAuE944kJKUBXExPwkTkEE6', 'f', ''),
(53, 'k@k', '$2b$10$oY5curr1aIoEwroi.WsvWOMoBCqH2fFRcTmkmdlcee0u0afrHIpy2', 'k', ''),
(54, 'drago2162@gmail.com', '', 'Benedek Pogány', 'https://lh3.googleusercontent.com/a/AAcHTtelUx0OvW1Dn7oGsh6kQ48it1G9pvle9YTzPPb9eeGeRA=s96-c');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
