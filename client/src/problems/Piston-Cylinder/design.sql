-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: ofcmikjy9x4lroa2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306
-- Generation Time: Aug 05, 2018 at 10:27 PM
-- Server version: 5.7.19-log
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prntcdsszgqddxh8`
--

-- --------------------------------------------------------

--
-- Table structure for table `design`
--

CREATE TABLE IF NOT EXISTS `design` (
  `id` int(11) NOT NULL,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8_unicode_ci
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `design`
--

INSERT INTO `design` (`name`, `type`, `value`) VALUES
('startup', 'Piston-Cylinder', '{"constants":[{"name":"PI","value":3.141592653589793,"units":"_"}],"design_parameters":[{"name":"PRESSURE","value":500,"oldvalue":500,"units":"LB/SQ-IN","lmin":0,"lmax":1,"cmin":0,"cmax":1500,"ioclass":0,"sdlim":0,"smin":0.06666666666666667,"smax":1500,"vmin":0,"vmax":-0.6666666666666666},{"name":"RADIUS","value":0.4,"oldvalue":0.4,"units":"INCH","lmin":1,"lmax":1,"cmin":0,"cmax":0.5,"ioclass":0,"sdlim":0,"smin":0.4,"smax":0.5,"vmin":-1,"vmax":-0.19999999999999996},{"name":"THICKNESS","value":0.04,"oldvalue":0.04,"units":"INCH","lmin":1,"lmax":1,"cmin":0,"cmax":0.05,"ioclass":0,"sdlim":0,"smin":0.04,"smax":0.05,"vmin":-1,"vmax":-0.20000000000000004}],"state_variables":[{"name":"FORCE","value":251.32741228718348,"oldvalue":0,"units":"LBS.","lmin":1,"lmax":0,"cmin":1000,"cmax":0,"ioclass":0,"sdlim":0,"smin":1000,"smax":0.06666666666666667,"vmin":0.7486725877128165,"vmax":0},{"name":"AREA","value":0.5026548245743669,"oldvalue":0,"units":"SQ.-IN.","lmin":0,"lmax":0,"cmin":0,"cmax":0,"ioclass":0,"sdlim":0,"smin":0.06666666666666667,"smax":0.06666666666666667,"vmin":0,"vmax":0},{"name":"STRESS","value":2500,"oldvalue":0,"units":"PSI","lmin":0,"lmax":1,"cmin":0,"cmax":3000,"ioclass":0,"sdlim":0,"smin":0.06666666666666667,"smax":3000,"vmin":0,"vmax":-0.16666666666666666}],"labels":[{"name":"COMMENT","value":"PCYL Default startup file ..."}],"name":"startup","type":"Piston-Cylinder","version":"1.2","result":{"objective_value":0.5605106435926049,"termination_condition":"None","violated_constraint_count":0},"system_controls":{"ioopt":3,"maxit":100,"weapon":1,"nmerit":1,"fix_wt":1.5,"con_wt":1,"zero_wt":10,"viol_wt":1,"mfn_wt":0.01,"objmin":0.00005,"del":1,"delmin":0.0001,"tol":0.0001,"smallnum":1e-7}}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `design`
--
ALTER TABLE `design`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `design`
--
ALTER TABLE `design`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=50;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
