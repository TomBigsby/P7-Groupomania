-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : jeu. 29 juil. 2021 à 17:15
-- Version du serveur :  5.7.32
-- Version de PHP : 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `p7_groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `Comments`
--

CREATE TABLE `Comments` (
  `commentId` mediumint(5) UNSIGNED NOT NULL,
  `commentAuthorId` mediumint(9) NOT NULL,
  `commentAuthorUserName` varchar(100) NOT NULL,
  `commentAuthorAvatarUrl` varchar(100) NOT NULL,
  `commentAuthorCommentDate` datetime NOT NULL,
  `commentAuthorMessage` text NOT NULL,
  `postId` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Comments`
--

INSERT INTO `Comments` (`commentId`, `commentAuthorId`, `commentAuthorUserName`, `commentAuthorAvatarUrl`, `commentAuthorCommentDate`, `commentAuthorMessage`, `postId`) VALUES
(128, 74, 'Georas Clifton', 'http://localhost:4200/images/CiriloHedylstone.jpg1627562430637.jpg', '2021-07-29 14:45:21', 'Let\'s make a nice big leafy tree.', 104),
(129, 74, 'Georas Clifton', 'http://localhost:4200/images/CiriloHedylstone.jpg1627562430637.jpg', '2021-07-29 14:45:31', 'A tree cannot be straight if it has a crooked trunk', 104),
(130, 76, 'Natka Oram', 'http://localhost:4200/images/AnnabellaBaily.jpg1627562824225.jpg', '2021-07-29 14:47:24', 'That\'s the way I look when I get home late; black and blue.', 104),
(131, 76, 'Natka Oram', 'http://localhost:4200/images/AnnabellaBaily.jpg1627562824225.jpg', '2021-07-29 14:47:24', 'We\'ll paint one happy little tree right here.', 104),
(134, 79, 'Claudius Prater', 'http://localhost:4200/images/AnnabellaBaily.jpg1627567255452.jpg', '2021-07-29 16:01:14', 'That\'s the way I look when I get home late; black and blue.', 104),
(135, 80, 'Hewe Trim', 'undefined', '2021-07-29 18:09:39', 'Premier commentaire', 108);

-- --------------------------------------------------------

--
-- Structure de la table `Publications`
--

CREATE TABLE `Publications` (
  `postId` mediumint(5) UNSIGNED NOT NULL,
  `userId` smallint(5) UNSIGNED NOT NULL,
  `username` varchar(100) NOT NULL,
  `avatarUrl` varchar(100) DEFAULT NULL,
  `postDate` datetime NOT NULL,
  `postTitle` varchar(200) NOT NULL,
  `imageUrl` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Publications`
--

INSERT INTO `Publications` (`postId`, `userId`, `username`, `avatarUrl`, `postDate`, `postTitle`, `imageUrl`) VALUES
(104, 74, 'Georas Clifton', 'http://localhost:4200/images/CiriloHedylstone.jpg1627562430637.jpg', '2021-07-29 14:45:21', 'Let\'s make a nice big leafy tree.', 'http://localhost:4200/images/111-417x258.jpg1627562721372.jpg'),
(107, 76, 'Natka Oram', 'http://localhost:4200/images/AnnabellaBaily.jpg1627562824225.jpg', '2021-07-29 14:50:46', 'Nice little fluffy clouds laying around in the sky being lazy.', 'http://localhost:4200/images/244-458x151.jpg1627563046469.jpg'),
(108, 76, 'Natka Oram', 'http://localhost:4200/images/AnnabellaBaily.jpg1627562824225.jpg', '2021-07-29 14:52:09', 'We\'ll paint one happy little tree right here.', 'http://localhost:4200/images/250-304x242.jpg1627563129824.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `userId` mediumint(9) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(60) NOT NULL,
  `username` varchar(100) NOT NULL,
  `avatarUrl` varchar(100) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`userId`, `email`, `password`, `username`, `avatarUrl`, `isAdmin`) VALUES
(74, '3b179de5ef256c8d2a2538127546dbc378b318cb', '$2b$10$tQvd7RAGqRy1Abehvf08WO/VywNPGk4b/VUgGOmiYc97kgYNA4M72', 'Georas Clifton', 'http://localhost:4200/images/CiriloHedylstone.jpg1627562430637.jpg', 0),
(76, 'a18a7a0c558236bf8613cc6995fe2699133d178e', '$2b$10$gdr.90dZfyKL1yqnwPpG9.yUQM8iZULhyL/6kkeqfQljGtuoLiMyu', 'Natka Oram', 'http://localhost:4200/images/AnnabellaBaily.jpg1627562824225.jpg', 0),
(77, 'a5993204d80826afb7f857e429991496883f402d', '$2b$10$wE5NZvPkSXMDvVvJiFM6ducb2Ncl2hhfatSh3EoEUOQcYeayDoyam', 'Adriaens MacIlwrick', 'undefined', 0),
(78, '1c6ffdfd452231afc4c4fc6e8eefec47a6b20087', '$2b$10$9ENHgTRZMlN/ms1EElNEzulbpmhElGba5SU8u3ZR1inoCvDTQDTCS', 'Marci Perrelle', 'undefined', 0),
(79, '0f8fa3cb7ad7c9d9aee23ac4322f4b256af688d9', '$2b$10$DYbbBkIpmG/.ZOjY/eXtr.GgamQY746NqZvHefwnR4Szvp7YToefW', 'Claudius Prater', 'http://localhost:4200/images/AnnabellaBaily.jpg1627567255452.jpg', 0),
(80, 'b8a65cab75ffa86bf741bf7bc69a9290f122c744', '$2b$10$UZtEf0k6A8Zn2jF3HMqIhep9q6bxro.8PDpevtJ7yPz20zn50uKtq', 'Hewe Trim', 'undefined', 0),
(82, '4b803a029b0e889f0a74118ffa5cba19a514f681', '$2b$10$2FPy30BmqqMnTOUqBiVRgeARTaL1t0M//i3ClpDiClXdhdH15YyoC', 'Sunny Gloster', 'http://localhost:4200/images/CiriloHedylstone.jpg1627576252423.jpg', 0),
(83, '3ecbea747f1605e309b0cb181a318e2229769b71', '$2b$10$PNuNCpyr8et6OMoyAjBmYe6qhNER5MctYUAWFQEfUbnAYnWpn1vji', 'Max', 'undefined', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`commentId`);

--
-- Index pour la table `Publications`
--
ALTER TABLE `Publications`
  ADD PRIMARY KEY (`postId`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `commentId` mediumint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT pour la table `Publications`
--
ALTER TABLE `Publications`
  MODIFY `postId` mediumint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `userId` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
