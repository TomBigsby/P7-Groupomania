<h1>Openclassrooms - Projet 7 - Groupomania</h1>



<h1>Installation</h1>


<br/>
<h2>Partie Frontend</h2>

- Depuis le terminal, accéder au dossier `frontend`, puis
```
npm install
npm install yarn
```
- puis se rendre à l'adresse `http://localhost:3000`
- puis lancer le serveur Front
```
yarn start
```

<br/><br/>
<h2>Partie Backend</h2>

Cloner la partie backend depuis ce lien : <https://github.com/TomBigsby/P7-Groupomania/tree/SQL>

Il faut ensuite créer un fichier `.env` dans le répertoire `backend` et copier le texte présent dans le fichier `env.txt` envoyé avec les livrables (pour l'évaluateur OpencCLassrooms). Enregistrer le fichier.

Depuis le terminal, accéder au dossier `backend`, puis
```
npm install
```
- se rendre à l'adresse `http://localhost:4200`

- puis lancer le serveur back :
```
nodemon server
```

<br/><br/>

<h2>Installation de la base de donnéee SQL</h2>

2 solutions : <br/>
- importer le fichier SQL qui se trouve à la racine du projet dans un programe de gestion de BDD (mySQL par exemple)
```
SQL/p7_groupomania.sql
```
- Ou récupérer dans ce même fichier le code pour créer les 3 TABLES du projet avec les requêtes SQL
exemple : 
```
CREATE TABLE `Users` (
  `userId` mediumint(9) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(60) NOT NULL,
  `username` varchar(100) NOT NULL,
  `avatarUrl` varchar(100) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```


<br/><br/>
### A Savoir

**Versions utilisées :** 
- node.js v14.15
- React JS v17.0.2
- yarn v1.22.10


**Page d'inscription :**
Par mesure de sécurité, les champs requièrent une adresse email valide et un mot de passe sécurisé.
La compléxité du mot de passe nécessite une majuscule, une minuscule, de 7 à 15 caractères et au moins un caractère spécial suivants : ! @ # $ % ^ & *