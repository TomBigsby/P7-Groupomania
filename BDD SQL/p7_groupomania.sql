-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : jeu. 01 juin 2023 à 12:01
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
(138, 87, 'Rustin Ketts', 'https://avatars.dicebear.com/api/male/ClaudiusPrater.svg', '2021-07-29 22:50:29', 'In life you need colors.', 108),
(139, 87, 'Rustin Ketts', 'https://avatars.dicebear.com/api/male/ClaudiusPrater.svg', '2021-07-29 22:52:19', 'This is the way you take out your flustrations.', 108),
(140, 87, 'Rustin Ketts', 'https://avatars.dicebear.com/api/male/ClaudiusPrater.svg', '2021-07-29 22:52:22', 'They say everything looks better with odd numbers of things.', 108),
(141, 87, 'Rustin Ketts', 'https://avatars.dicebear.com/api/male/ClaudiusPrater.svg', '2021-07-29 22:53:26', 'Painting should do one thing. It should put happiness in your heart.', 108),
(142, 87, 'Rustin Ketts', 'https://avatars.dicebear.com/api/male/ClaudiusPrater.svg', '2021-07-29 23:05:58', 'Nice little fluffy clouds laying around in the sky being lazy.', 108),
(143, 87, 'Rustin Ketts', 'https://avatars.dicebear.com/api/male/ClaudiusPrater.svg', '2021-07-29 23:07:36', 'Everything\'s not great in life, but we can still find beauty in it.', 108),
(144, 87, 'Rustin Ketts', 'https://avatars.dicebear.com/api/male/ClaudiusPrater.svg', '2021-07-29 23:07:48', 'Let\'s get wild today.', 108),
(146, 87, 'Rustin Ketts', 'https://avatars.dicebear.com/api/male/ClaudiusPrater.svg', '2021-07-29 23:08:55', 'Let\'s make a nice big leafy tree.', 108),
(149, 87, 'Rustin Ketts', 'https://avatars.dicebear.com/api/male/ClaudiusPrater.svg', '2021-07-29 23:13:05', 'A tree cannot be straight if it has a crooked trunk.', 108),
(151, 87, 'Rustin Ketts', 'https://avatars.dicebear.com/api/male/ClaudiusPrater.svg', '2021-07-29 23:22:52', 'You don\'t have to spend all your time thinking about what you\'re doing, you just let it happen.', 108),
(153, 87, 'Rustin Ketts', 'https://avatars.dicebear.com/api/male/ClaudiusPrater.svg', '2021-07-29 23:26:46', 'That easy.', 104),
(157, 87, 'Rustin Ketts', 'https://avatars.dicebear.com/api/male/ClaudiusPrater.svg', '2021-07-29 23:31:57', 'I was blessed with a very steady hand; and it comes in very handy when you\'re doing these little delicate things.', 108),
(284, 77, 'Adriaens MacIlwrick', 'https://avatars.dicebear.com/api/male/AdriaensMacIlwrick.svg', '2023-05-31 10:52:58', 'Prem\'s', 113),
(315, 76, 'Natka Oram', 'http://localhost:4200/images/AnnabellaBaily.jpg1627562824225.jpg', '2023-05-31 12:28:41', 'Dan ate the clouds like cotton candy', 113),
(316, 85, 'Hervey Easterby', 'https://avatars.dicebear.com/api/male/HerveyEasterby.svg', '2023-06-01 12:41:30', 'At that moment she realized she had a sixth sense.', 114),
(317, 76, 'Natka Oram', 'http://localhost:4200/images/AnnabellaBaily.jpg1627562824225.jpg', '2023-06-01 12:42:32', 'Italy is my favorite country; in fact, I plan to spend two weeks there next year.', 114),
(318, 74, 'Georas Clifton', 'https://avatars.dicebear.com/api/female/GeorasClifton.svg', '2023-06-01 12:50:38', 'She discovered van life is difficult with 2 cats and a dog.', 115),
(319, 74, 'Georas Clifton', 'https://avatars.dicebear.com/api/female/GeorasClifton.svg', '2023-06-01 12:50:39', 'The secret ingredient to his wonderful life was crime.', 108),
(320, 77, 'Adriaens MacIlwrick', 'https://avatars.dicebear.com/api/male/AdriaensMacIlwrick.svg', '2023-06-01 12:51:42', 'He liked to play with words in the bathtub', 115),
(321, 85, 'Hervey Easterby', 'https://avatars.dicebear.com/api/male/HerveyEasterby.svg', '2023-06-01 12:52:56', 'Pink horses galloped across the sea', 115),
(322, 85, 'Hervey Easterby', 'https://avatars.dicebear.com/api/male/HerveyEasterby.svg', '2023-06-01 12:52:57', 'Her hair was windswept as she rode in the black convertible', 113),
(323, 86, 'Wilden Letham', 'https://avatars.dicebear.com/api/female/WildenLetham.svg', '2023-06-01 12:53:20', 'My biggest joy is roasting almonds while stalking prey', 115),
(324, 86, 'Wilden Letham', 'https://avatars.dicebear.com/api/female/WildenLetham.svg', '2023-06-01 12:53:20', 'Getting up at dawn is for the birds', 108),
(325, 87, 'Rustin Ketts', 'https://avatars.dicebear.com/api/male/ClaudiusPrater.svg', '2023-06-01 12:54:21', 'Joyce enjoyed eating pancakes with ketchup', 115),
(326, 87, 'Rustin Ketts', 'https://avatars.dicebear.com/api/male/ClaudiusPrater.svg', '2023-06-01 12:54:21', 'He ran out of money, so he had to stop playing poker', 114);

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
(108, 76, 'Natka Oram', 'http://localhost:4200/images/AnnabellaBaily.jpg1627562824225.jpg', '2021-07-29 14:52:09', 'We\'ll paint one happy little tree right here.', 'http://localhost:4200/images/250-304x242.jpg1627563129824.jpg'),
(113, 77, 'Adriaens MacIlwrick', 'https://avatars.dicebear.com/api/male/AdriaensMacIlwrick.svg', '2023-05-31 10:52:58', 'Alone on the sea', 'http://localhost:4200/images/124-600x400.jpg1685523178325.jpg'),
(114, 86, 'Wilden Letham', 'https://avatars.dicebear.com/api/female/WildenLetham.svg', '2023-06-01 12:36:34', '25 years later, she still regretted that specific moment', 'http://localhost:4200/images/653-600x400.jpg1685615794825.jpg'),
(115, 79, 'Claudius Prater', 'http://localhost:4200/images/AnnabellaBaily.jpg1627567255452.jpg', '2023-06-01 12:37:56', 'The beauty of the sunset was obscured by the industrial cranes', 'http://localhost:4200/images/412-600x400.jpg1685615876094.jpg');

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
(74, '3b179de5ef256c8d2a2538127546dbc378b318cb', '$2b$10$tQvd7RAGqRy1Abehvf08WO/VywNPGk4b/VUgGOmiYc97kgYNA4M72', 'Georas Clifton', 'https://avatars.dicebear.com/api/female/GeorasClifton.svg', 0),
(76, 'a18a7a0c558236bf8613cc6995fe2699133d178e', '$2b$10$gdr.90dZfyKL1yqnwPpG9.yUQM8iZULhyL/6kkeqfQljGtuoLiMyu', 'Natka Oram', 'https://avatars.dicebear.com/api/female/NatkaOram.svg', 0),
(77, 'a5993204d80826afb7f857e429991496883f402d', '$2b$10$wE5NZvPkSXMDvVvJiFM6ducb2Ncl2hhfatSh3EoEUOQcYeayDoyam', 'Adriaens MacIlwrick', 'https://avatars.dicebear.com/api/male/AdriaensMacIlwrick.svg', 0),
(78, '1c6ffdfd452231afc4c4fc6e8eefec47a6b20087', '$2b$10$9ENHgTRZMlN/ms1EElNEzulbpmhElGba5SU8u3ZR1inoCvDTQDTCS', 'Marci Perrelle', 'https://avatars.dicebear.com/api/female/MarciPerrelle.svg', 0),
(79, '0f8fa3cb7ad7c9d9aee23ac4322f4b256af688d9', '$2b$10$DYbbBkIpmG/.ZOjY/eXtr.GgamQY746NqZvHefwnR4Szvp7YToefW', 'Claudius Prater', 'https://avatars.dicebear.com/api/male/ClaudiusPrater.svg', 0),
(80, 'b8a65cab75ffa86bf741bf7bc69a9290f122c744', '$2b$10$UZtEf0k6A8Zn2jF3HMqIhep9q6bxro.8PDpevtJ7yPz20zn50uKtq', 'Hewe Trim', 'https://avatars.dicebear.com/api/female/HeweTrim.svg', 0),
(85, 'b65e3784daff5df7f94d1ac966ebc76bb96c9b32', '$2b$10$oQ2jagNlCs4FoZVuGKBtdOEsi5bh3C2cH/oNfiqhwAftB8P2mH/jS', 'Hervey Easterby', 'https://avatars.dicebear.com/api/male/HerveyEasterby.svg', 0),
(86, 'd0498c6c6ce636e9e6226a285d97e913df8e8ebf', '$2b$10$chCabwFSZ/wjIEnQKxAfHe7bWP75Bn5RrzwruVMjiWnemcoUeZfEq', 'Wilden Letham', 'https://avatars.dicebear.com/api/female/WildenLetham.svg', 1),
(87, 'b1fc3e53f2fa6f4f7bc8d1ec3e889fe1c10086b7', '$2b$10$Ao7vVGaJjIX2pOlhghdbY.FyUGBzqMgxgykSVy9rk4IA882ocDT6e', 'Rustin Ketts', 'https://avatars.dicebear.com/api/male/ClaudiusPrater.svg', 0);

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
  MODIFY `commentId` mediumint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=327;

--
-- AUTO_INCREMENT pour la table `Publications`
--
ALTER TABLE `Publications`
  MODIFY `postId` mediumint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `userId` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
