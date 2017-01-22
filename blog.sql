-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 20, 2017 at 09:49 PM
-- Server version: 10.1.11-MariaDB
-- PHP Version: 7.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` longtext NOT NULL,
  `section` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `tag` varchar(255) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `title`, `text`, `section`, `author`, `tag`, `date`) VALUES
(13, 'تست عنوان', 'تست متن', 'تست بخش بندی', 'afshin', 'تست تگ', '1395-10-28'),
(14, 'safshin', 'test', 'neda', 'afshin', 'tag', '1395-10-30');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `role`) VALUES
(1, 'superadmin'),
(2, 'admin'),
(3, 'user'),
(4, 'member');

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `section`
--

INSERT INTO `section` (`id`, `title`) VALUES
(1, 'اخبار'),
(2, 'درهم'),
(3, '999');

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `id` char(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `expire` int(11) DEFAULT NULL,
  `data` longblob,
  `token` char(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`id`, `expire`, `data`, `token`) VALUES
('44pphoa8g2go00vu7edeck40h5', 0, 0x31343834363332353038, ''),
('9040931i1cbenajieq3vse1oh1', 1484849609, 0x624746755a33787a4f6a5536496d5a684c556c53496a74306232746c626e787a4f6a4d794f6949305932466b4d446332596a5978595745314d7a6b3159545a6d4d7a5a684d6a63784d54417a5a4745334e79493756584e6c636c394a5a4878704f6a4537, '4cad076b61aa5395a6f36a271103da77'),
('aut1qdqqo950bnsba2plpt1g90', 1484765851, 0x624746755a33787a4f6a5536496d5a684c556c53496a74306232746c626e787a4f6a4d794f694a694e7a67355954677a5954526c4e545a685a6a63304f4751784d7a686b595756684d545a694e44637a4e53493756584e6c636c394a5a4878704f6a4537, 'b789a83a4e56af748d138daea16b4735'),
('rb5i9mnvgr7kci73o73hcll6c1', 1484907329, 0x624746755a33787a4f6a5536496d5a684c556c53496a733d, '');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `token` char(32) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `ip` char(32) NOT NULL,
  `login` int(11) NOT NULL,
  `hash` char(32) NOT NULL,
  `role_id` int(11) DEFAULT '0',
  `expire` int(11) DEFAULT NULL,
  `data` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `token`, `username`, `password`, `profile_id`, `ip`, `login`, `hash`, `role_id`, `expire`, `data`) VALUES
(1, '4cad076b61aa5395a6f36a271103da77', 'afshin', '$2y$12$wu9uwHCBfuLp7SP6gDc3UOP2VObdavInsmijKj76tXF1eER0pLzey', 1, '127.0.0.1', 0, '6c05ba18bedea99bc3858778bef9e3f8', 3, 1484848409, 'a:2:{s:6:"active";s:1:"0";s:10:"activeCode";s:32:"b5ed0836df03dad11c18d336c5078219";}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
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
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
