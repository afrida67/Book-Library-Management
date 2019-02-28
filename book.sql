-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2019 at 07:52 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.1.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sys`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `description` varchar(511) DEFAULT NULL,
  `photo_path` varchar(650) DEFAULT 'default.png'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `title`, `author`, `description`, `photo_path`) VALUES
(14, 'Eloquent JavaScript', 'Marijn Haverbeke', 'Completely revised and updated, this best-selling introduction to programming in JavaScript focuses on writing real applications.JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon', 'image-1551378606835.jpg'),
(15, 'Head First Design Patterns', 'Bert Bates, Kathy Sierra, Eric Freeman, Elisabeth Robson', 'Head First is a series of introductory instructional books to many topics, published by O\'Reilly Media. It stresses an unorthodox, visually intensive, reader-involving combination of puzzles, jokes, nonstandard design and layout, and an engaging, conversational style to immerse the reader in a given topic.  Originally, the series covered programming and software engineering, but is now expanding to other topics in science, mathematics and business, due to success. The series was created by Bert Bates and K', 'image-1551378727174.jpg'),
(17, 'You Dont Know JS', 'Kyle Simpson', 'To understand this binding, we have to understand the call-site: the location in code where a function is called (not where it\'s declared). We must inspect the call-site to answer the question: what\'s this this a reference to?\r\n\r\nFinding the call-site is generally: \"go locate where a function is called from\", but it\'s not always that easy, as certain coding patterns can obscure the true call-site.', 'image-1551379642460.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
