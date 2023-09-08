-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 08 sep. 2023 à 17:59
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `actiondrc`
--

-- --------------------------------------------------------

--
-- Structure de la table `affectations`
--

CREATE TABLE `affectations` (
  `id` int(11) NOT NULL,
  `fonction_id` int(11) NOT NULL,
  `emploie_id` int(11) NOT NULL,
  `contrat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `affectations`
--

INSERT INTO `affectations` (`id`, `fonction_id`, `emploie_id`, `contrat_id`) VALUES
(47, 9, 47, 19),
(49, 8, 54, 18);

-- --------------------------------------------------------

--
-- Structure de la table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `check_in_time` time(6) NOT NULL,
  `check_out_time` time(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `attendance`
--

INSERT INTO `attendance` (`id`, `employee_id`, `client_id`, `date`, `check_in_time`, `check_out_time`) VALUES
(5, 45, 8, '2023-08-30', '08:00:00.000000', '18:00:00.000000');

-- --------------------------------------------------------

--
-- Structure de la table `avantages`
--

CREATE TABLE `avantages` (
  `id` int(11) NOT NULL,
  `avantage_1` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `avantages`
--

INSERT INTO `avantages` (`id`, `avantage_1`) VALUES
(1, 'malade'),
(2, 'transport'),
(3, 'congé payant');

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `company_name` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `phone_number` int(50) NOT NULL,
  `contact_name` varchar(200) NOT NULL,
  `contact_email` varchar(100) NOT NULL,
  `rccm` int(255) DEFAULT NULL,
  `idnate` int(200) DEFAULT NULL,
  `contact_phone` int(10) NOT NULL,
  `apr` varchar(200) DEFAULT NULL,
  `province` varchar(200) NOT NULL,
  `pays` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id`, `company_name`, `address`, `phone_number`, `contact_name`, `contact_email`, `rccm`, `idnate`, `contact_phone`, `apr`, `province`, `pays`) VALUES
(8, 'action drc', 'Kintambo', 243824444, 'tite', 'tite@gmail.com', 2544, 724, 243824444, '', '', ''),
(9, 'LoginSmart', 'ngaliema', 2147483647, 'tite', 'tite@gmail.com', 854, 1024, 2147483647, '', '', ''),
(10, 'Bralima', 'ngaliema', 2147483647, 'brali', 'bralima@gmail.com', 101, 17, 243824444, '', '', ''),
(11, 'Bracongo', 'Gombe', 2147483647, 'Tite', 'bracongo@gmail.com', 210, 107, 2147483647, '', '', ''),
(12, 'Scpt', 'Gombe', 2147483647, 'Tithe', 'scpt@gmail.com', 210, 104, 2147483647, '210', 'Kinshasa', 'RDC');

-- --------------------------------------------------------

--
-- Structure de la table `competences`
--

CREATE TABLE `competences` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `competences`
--

INSERT INTO `competences` (`id`, `nom`) VALUES
(1, 'Informaticien'),
(2, 'Mecanicien'),
(3, 'Electricien');

-- --------------------------------------------------------

--
-- Structure de la table `contrats`
--

CREATE TABLE `contrats` (
  `id` int(11) NOT NULL,
  `contract_type` varchar(200) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `contract_status` varchar(100) NOT NULL,
  `client_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `contrats`
--

INSERT INTO `contrats` (`id`, `contract_type`, `start_date`, `end_date`, `contract_status`, `client_id`, `employee_id`) VALUES
(18, 'interim', '2023-08-22', '2023-08-24', 'En cours', 8, 0),
(19, 'journalier', '2023-08-25', '2023-09-30', 'En attente', 10, 0),
(20, 'interim', '2023-08-25', '2023-08-30', 'En cours', 11, 0),
(22, 'CDD', '2023-09-10', '2023-10-10', 'En attente', 12, 0),
(23, 'journalier', '2023-10-03', '2024-01-03', 'En attente', 10, 0);

-- --------------------------------------------------------

--
-- Structure de la table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` varchar(1) NOT NULL DEFAULT 'h',
  `address` varchar(100) NOT NULL,
  `phone_number` varchar(100) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `identification_number` varchar(45) DEFAULT NULL,
  `etat_civil` varchar(200) NOT NULL,
  `number_inpp` varchar(200) DEFAULT NULL,
  `number_cnss` varchar(200) DEFAULT NULL,
  `nombre_enfant` varchar(200) DEFAULT NULL,
  `identification_type` varchar(255) NOT NULL,
  `skills` varchar(100) NOT NULL,
  `certifications` varchar(100) NOT NULL,
  `employment_status` varchar(50) NOT NULL,
  `contrat_id` int(11) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `est_supprime` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `employees`
--

INSERT INTO `employees` (`id`, `first_name`, `last_name`, `date_of_birth`, `gender`, `address`, `phone_number`, `email`, `identification_number`, `etat_civil`, `number_inpp`, `number_cnss`, `nombre_enfant`, `identification_type`, `skills`, `certifications`, `employment_status`, `contrat_id`, `source`, `est_supprime`) VALUES
(45, 'Malu', 'miguel', '2023-08-24', 'h', 'ngaliema', '2147483647', 'user@gmail.com', '122', 'celibataire', '131', '321', '4', 'Carte d\'identité', 'Informaticien', 'Licence', 'Interne', 19, '1692788764257-illustrator.png', 0),
(47, 'Rabby', 'kilolo', '1999-08-22', 'h', 'Kalamu', '2147483647', 'rabby@gmail.com', '121', 'celibataire', '231', '321', '0', 'Carte d\'identité', 'Mecanicien', 'Licence', 'Interne', 19, '1693223159413-maxim_nguz.PNG', 0),
(51, 'Khuwa', 'jordy', '2023-08-31', 'h', 'debonhomme', '243824562776', 'jordyumba@gmail.com', '121', 'celibataire', '12-121', '21-22', '0', 'Carte d\'identité', 'Informaticien', 'Licence', 'Interne', NULL, '1693492924487-faustin_bongali.PNG', 1),
(54, 'Ndambi', 'Acha', '2023-09-08', 'h', 'debonhomme', '243824562776', 'achandambi@gmail.com', '231', 'celibataire', '12-121', '1AC-12', '0', 'Carte d\'identité', 'Electricien', 'Licence', 'Interne', 18, '1694177407696-apropos1.jpg', 0);

-- --------------------------------------------------------

--
-- Structure de la table `fonction`
--

CREATE TABLE `fonction` (
  `id` int(11) NOT NULL,
  `contrat_id` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `avantages` varchar(255) DEFAULT NULL,
  `prix` decimal(10,2) DEFAULT NULL,
  `salaire` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `fonction`
--

INSERT INTO `fonction` (`id`, `contrat_id`, `client_id`, `skills`, `avantages`, `prix`, `salaire`) VALUES
(6, 18, NULL, '1', 'Malade et transport', '200.00', '150.00'),
(7, 18, NULL, '2', 'Transport', '300.00', '150.00'),
(8, 18, NULL, '3', 'Assurance maladie', '200.00', '150.00'),
(9, 19, NULL, '1', 'Assurance maladie', '300.00', '200.00'),
(12, 18, NULL, '1', 'Transport', '200.00', '150.00');

-- --------------------------------------------------------

--
-- Structure de la table `fonctions`
--

CREATE TABLE `fonctions` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `avantages` text DEFAULT NULL,
  `prix` decimal(10,2) DEFAULT NULL,
  `salaire` decimal(10,2) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `horaire_conge` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `fonctions`
--

INSERT INTO `fonctions` (`id`, `nom`, `avantages`, `prix`, `salaire`, `client_id`, `horaire_conge`) VALUES
(1, 'Informaticien', 'malade, transport, congé payé', '200.00', '180.00', NULL, '20'),
(2, 'Mecanicien', 'Maladie, transport', '200.00', '150.00', NULL, '50'),
(3, 'Nounou', 'Malade, transport', '150.00', '100.00', NULL, '20'),
(4, 'Electricien', 'Malade, transport', '200.00', '150.00', NULL, '30');

-- --------------------------------------------------------

--
-- Structure de la table `fonction_client`
--

CREATE TABLE `fonction_client` (
  `fonction_id` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `horaires`
--

CREATE TABLE `horaires` (
  `id` int(11) NOT NULL,
  `agent_id` int(11) DEFAULT NULL,
  `day_of_week` varchar(10) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `informations`
--

CREATE TABLE `informations` (
  `id` int(11) NOT NULL,
  `contrat_id` int(11) DEFAULT NULL,
  `nom` varchar(200) DEFAULT NULL,
  `avantages` varchar(255) DEFAULT NULL,
  `prix` varchar(200) DEFAULT NULL,
  `salaire` varchar(200) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `invoice_date` date NOT NULL,
  `due_date` date NOT NULL,
  `total_amount` int(255) NOT NULL,
  `status` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `invoices`
--

INSERT INTO `invoices` (`id`, `client_id`, `invoice_date`, `due_date`, `total_amount`, `status`) VALUES
(8, 9, '2023-08-20', '2023-08-21', 200, 'payée'),
(9, 9, '2023-08-20', '2023-08-21', 200, 'payée');

-- --------------------------------------------------------

--
-- Structure de la table `leave_requests`
--

CREATE TABLE `leave_requests` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `leave_type` varchar(200) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `mission`
--

CREATE TABLE `mission` (
  `id` int(11) NOT NULL,
  `agent_id` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `heureEntrant` time DEFAULT NULL,
  `heureSortant` time DEFAULT NULL,
  `jour` varchar(200) DEFAULT NULL,
  `site` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `mission`
--

INSERT INTO `mission` (`id`, `agent_id`, `client_id`, `heureEntrant`, `heureSortant`, `jour`, `site`, `created_at`, `updated_at`) VALUES
(32, 45, 10, '08:00:00', '17:00:00', '2', 2, '2023-08-28 11:26:05', '2023-08-28 11:26:05'),
(33, 45, 10, '08:00:00', '17:00:00', '3', 2, '2023-08-28 11:26:05', '2023-08-28 11:26:05'),
(34, 45, 10, '08:00:00', '17:00:00', '4', 2, '2023-08-28 11:26:05', '2023-08-28 11:26:05'),
(35, 45, 10, '08:00:00', '17:00:00', '5', 2, '2023-08-28 11:26:05', '2023-08-28 11:26:05'),
(39, 46, 8, '08:00:00', '17:00:00', '2', 1, '2023-09-05 10:21:29', '2023-09-05 10:21:29'),
(40, 46, 8, '08:00:00', '17:00:00', '3', 1, '2023-09-05 10:21:29', '2023-09-05 10:21:29'),
(41, 46, 8, '09:00:00', '17:00:00', '4', 1, '2023-09-05 10:21:29', '2023-09-05 10:21:29'),
(42, 46, 8, '10:00:00', '17:00:00', '5', 1, '2023-09-05 10:21:29', '2023-09-05 10:21:29'),
(43, 46, 8, '08:00:00', '17:00:00', '7', 1, '2023-09-05 10:21:29', '2023-09-05 10:21:29'),
(44, 46, 8, '09:00:00', '16:00:00', '6', 1, '2023-09-05 10:21:29', '2023-09-05 10:21:29'),
(45, 46, 8, '00:00:00', '00:00:00', '8', 1, '2023-09-05 10:21:29', '2023-09-05 10:21:29'),
(46, 54, 8, '08:00:00', '17:00:00', '2', 2, '2023-09-08 15:42:08', '2023-09-08 15:42:08'),
(47, 54, 8, '09:00:00', '16:00:00', '3', 2, '2023-09-08 15:42:08', '2023-09-08 15:42:08'),
(48, 54, 8, '10:00:00', '17:00:00', '4', 2, '2023-09-08 15:42:08', '2023-09-08 15:42:08'),
(49, 54, 8, '08:00:00', '17:30:00', '5', 2, '2023-09-08 15:42:08', '2023-09-08 15:42:08'),
(50, 54, 8, '09:00:00', '17:00:00', '6', 2, '2023-09-08 15:42:08', '2023-09-08 15:42:08'),
(51, 54, 8, '08:00:00', '15:00:00', '7', 2, '2023-09-08 15:42:08', '2023-09-08 15:42:08');

-- --------------------------------------------------------

--
-- Structure de la table `niveauetude`
--

CREATE TABLE `niveauetude` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `niveauetude`
--

INSERT INTO `niveauetude` (`id`, `titre`) VALUES
(1, 'Licence'),
(2, 'Graduat'),
(3, 'Humanité'),
(4, 'Secondaire'),
(5, 'Primaire');

-- --------------------------------------------------------

--
-- Structure de la table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `payment_date` date NOT NULL,
  `amount` int(11) NOT NULL,
  `payment_method` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `payments`
--

INSERT INTO `payments` (`id`, `invoice_id`, `payment_date`, `amount`, `payment_method`) VALUES
(5, 8, '2023-08-19', 200, 'chèque');

-- --------------------------------------------------------

--
-- Structure de la table `pays`
--

CREATE TABLE `pays` (
  `id` int(11) NOT NULL,
  `nom` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `pays`
--

INSERT INTO `pays` (`id`, `nom`) VALUES
(1, 'RDC');

-- --------------------------------------------------------

--
-- Structure de la table `province`
--

CREATE TABLE `province` (
  `id` int(11) NOT NULL,
  `nom` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `province`
--

INSERT INTO `province` (`id`, `nom`) VALUES
(1, 'Bas-Uele'),
(2, 'Équateur'),
(3, 'Haut-Katanga'),
(4, 'Haut-Lomami'),
(5, 'Haut-Uele'),
(6, 'Ituri'),
(7, 'Kasaï'),
(8, 'Kasaï central'),
(9, 'Kasaï oriental'),
(10, 'Kinshasa'),
(11, 'Kongo-Central'),
(12, 'Kwango'),
(13, 'Kwilu'),
(14, 'Lomami'),
(15, 'Lualaba'),
(16, 'Mai-Ndombe'),
(17, 'Maniema'),
(18, 'Mongala'),
(19, 'Nord-Kivu'),
(20, 'Nord-Ubangi'),
(21, 'Sankuru'),
(22, 'Sud-Kivu'),
(23, 'Sud-Ubangi'),
(24, 'Tanganyika'),
(25, 'Tshopo'),
(26, 'Tshuapa');

-- --------------------------------------------------------

--
-- Structure de la table `salaire`
--

CREATE TABLE `salaire` (
  `id` int(11) NOT NULL,
  `montant` decimal(10,2) NOT NULL,
  `fonction_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `sites`
--

CREATE TABLE `sites` (
  `id` int(11) NOT NULL,
  `contrat_id` int(11) DEFAULT NULL,
  `nom_site` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `sites`
--

INSERT INTO `sites` (`id`, `contrat_id`, `nom_site`) VALUES
(1, NULL, 'site 1'),
(2, NULL, 'site2');

-- --------------------------------------------------------

--
-- Structure de la table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `nom_status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `status`
--

INSERT INTO `status` (`id`, `nom_status`) VALUES
(1, 'Interne'),
(2, 'Externe');

-- --------------------------------------------------------

--
-- Structure de la table `statuscontrat`
--

CREATE TABLE `statuscontrat` (
  `id` int(11) NOT NULL,
  `nomContrat` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `statuscontrat`
--

INSERT INTO `statuscontrat` (`id`, `nomContrat`) VALUES
(14, 'actif'),
(15, 'terminé'),
(16, 'resilié');

-- --------------------------------------------------------

--
-- Structure de la table `statusmontant`
--

CREATE TABLE `statusmontant` (
  `id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `statusmontant`
--

INSERT INTO `statusmontant` (`id`, `status`) VALUES
(1, 'en attente'),
(2, 'payée');

-- --------------------------------------------------------

--
-- Structure de la table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `contract_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `task_description` varchar(255) NOT NULL,
  `task_date` date NOT NULL,
  `task_hours` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `typecontrat`
--

CREATE TABLE `typecontrat` (
  `id` int(11) NOT NULL,
  `nom` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `typecontrat`
--

INSERT INTO `typecontrat` (`id`, `nom`) VALUES
(1, 'CDD'),
(2, 'CDI'),
(5, 'interim'),
(6, 'journalier');

-- --------------------------------------------------------

--
-- Structure de la table `type_piece`
--

CREATE TABLE `type_piece` (
  `id` int(11) NOT NULL,
  `nom_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `type_piece`
--

INSERT INTO `type_piece` (`id`, `nom_type`) VALUES
(1, 'Carte d\'identité'),
(2, 'Passport'),
(3, 'Permis de conduire');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `img`, `password`) VALUES
(2, 'acha', 'achandambi@gmail.com', NULL, '$2a$10$lE2U3ncvDpXGpTjaSvO2Je4RNtviPPRLAM6B.hk4CbcQP1oPseKbW');

-- --------------------------------------------------------

--
-- Structure de la table `weekdays`
--

CREATE TABLE `weekdays` (
  `id` int(11) NOT NULL,
  `days` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `weekdays`
--

INSERT INTO `weekdays` (`id`, `days`) VALUES
(2, 'Lundi'),
(3, 'Mardi'),
(4, 'Mercredi'),
(5, 'Jeudi'),
(6, 'Vendredi'),
(7, 'Samedi'),
(8, 'Dimanche');

-- --------------------------------------------------------

--
-- Structure de la table `work_schedule`
--

CREATE TABLE `work_schedule` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `weekday` varchar(40) NOT NULL,
  `start_time` time(6) NOT NULL,
  `end_time` time(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `affectations`
--
ALTER TABLE `affectations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `emploie_id` (`emploie_id`),
  ADD KEY `contrat_id` (`contrat_id`),
  ADD KEY `fonction_id` (`fonction_id`);

--
-- Index pour la table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `clientId` (`client_id`);

--
-- Index pour la table `avantages`
--
ALTER TABLE `avantages`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `competences`
--
ALTER TABLE `competences`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `contrats`
--
ALTER TABLE `contrats`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contrat_id` (`contrat_id`);

--
-- Index pour la table `fonction`
--
ALTER TABLE `fonction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contrat_id` (`contrat_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Index pour la table `fonctions`
--
ALTER TABLE `fonctions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- Index pour la table `fonction_client`
--
ALTER TABLE `fonction_client`
  ADD KEY `fonction_id` (`fonction_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Index pour la table `horaires`
--
ALTER TABLE `horaires`
  ADD PRIMARY KEY (`id`),
  ADD KEY `agent_id` (`agent_id`);

--
-- Index pour la table `informations`
--
ALTER TABLE `informations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contrat_id` (`contrat_id`);

--
-- Index pour la table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- Index pour la table `leave_requests`
--
ALTER TABLE `leave_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Index pour la table `mission`
--
ALTER TABLE `mission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `agent_id` (`agent_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Index pour la table `niveauetude`
--
ALTER TABLE `niveauetude`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_id` (`invoice_id`);

--
-- Index pour la table `pays`
--
ALTER TABLE `pays`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `province`
--
ALTER TABLE `province`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `salaire`
--
ALTER TABLE `salaire`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fonction_id` (`fonction_id`);

--
-- Index pour la table `sites`
--
ALTER TABLE `sites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contrat_id` (`contrat_id`);

--
-- Index pour la table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `statuscontrat`
--
ALTER TABLE `statuscontrat`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `statusmontant`
--
ALTER TABLE `statusmontant`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contract_id` (`contract_id`),
  ADD KEY `employee` (`employee_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Index pour la table `typecontrat`
--
ALTER TABLE `typecontrat`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `type_piece`
--
ALTER TABLE `type_piece`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `weekdays`
--
ALTER TABLE `weekdays`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `work_schedule`
--
ALTER TABLE `work_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `clienId` (`client_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `affectations`
--
ALTER TABLE `affectations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pour la table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `avantages`
--
ALTER TABLE `avantages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `competences`
--
ALTER TABLE `competences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `contrats`
--
ALTER TABLE `contrats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT pour la table `fonction`
--
ALTER TABLE `fonction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `fonctions`
--
ALTER TABLE `fonctions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `horaires`
--
ALTER TABLE `horaires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `informations`
--
ALTER TABLE `informations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `leave_requests`
--
ALTER TABLE `leave_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `mission`
--
ALTER TABLE `mission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT pour la table `niveauetude`
--
ALTER TABLE `niveauetude`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `pays`
--
ALTER TABLE `pays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `province`
--
ALTER TABLE `province`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `salaire`
--
ALTER TABLE `salaire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `sites`
--
ALTER TABLE `sites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `statuscontrat`
--
ALTER TABLE `statuscontrat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `statusmontant`
--
ALTER TABLE `statusmontant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `typecontrat`
--
ALTER TABLE `typecontrat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `type_piece`
--
ALTER TABLE `type_piece`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `weekdays`
--
ALTER TABLE `weekdays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `work_schedule`
--
ALTER TABLE `work_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `affectations`
--
ALTER TABLE `affectations`
  ADD CONSTRAINT `affectations_ibfk_2` FOREIGN KEY (`emploie_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `affectations_ibfk_3` FOREIGN KEY (`contrat_id`) REFERENCES `contrats` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `affectations_ibfk_4` FOREIGN KEY (`fonction_id`) REFERENCES `fonction` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `clientId` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employeeId` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`contrat_id`) REFERENCES `contrats` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`contrat_id`) REFERENCES `contrats` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `fonction`
--
ALTER TABLE `fonction`
  ADD CONSTRAINT `fonction_ibfk_1` FOREIGN KEY (`contrat_id`) REFERENCES `contrats` (`id`),
  ADD CONSTRAINT `fonction_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`);

--
-- Contraintes pour la table `fonctions`
--
ALTER TABLE `fonctions`
  ADD CONSTRAINT `fonctions_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `fonction_client`
--
ALTER TABLE `fonction_client`
  ADD CONSTRAINT `fonction_client_ibfk_1` FOREIGN KEY (`fonction_id`) REFERENCES `fonction` (`id`),
  ADD CONSTRAINT `fonction_client_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`);

--
-- Contraintes pour la table `horaires`
--
ALTER TABLE `horaires`
  ADD CONSTRAINT `horaires_ibfk_1` FOREIGN KEY (`agent_id`) REFERENCES `employees` (`id`);

--
-- Contraintes pour la table `informations`
--
ALTER TABLE `informations`
  ADD CONSTRAINT `informations_ibfk_1` FOREIGN KEY (`contrat_id`) REFERENCES `contrats` (`id`);

--
-- Contraintes pour la table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `mission`
--
ALTER TABLE `mission`
  ADD CONSTRAINT `mission_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`);

--
-- Contraintes pour la table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `sites`
--
ALTER TABLE `sites`
  ADD CONSTRAINT `sites_ibfk_1` FOREIGN KEY (`contrat_id`) REFERENCES `contrats` (`id`);

--
-- Contraintes pour la table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `client_id` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contract_id` FOREIGN KEY (`contract_id`) REFERENCES `contrats` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `work_schedule`
--
ALTER TABLE `work_schedule`
  ADD CONSTRAINT `clienId` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employeId` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
