# Introduction

Projet de gestion des tâches permettant d'afficher une todo list et de stocker ces tâches dans une base de données relationnelle.

Les fonctionnalités de cette application web sont :
 - lister les tâches à faire
 - ajouter une nouvelle tâche à la liste : nom, description et deadline
 - marquer une tâche comme terminée
 - supprimer une tâche de liste

La page web est développée avec bootstrap. 
Les tâches sont stockées dans une base de données mySQL 

L'application a été conçu pour une version SSR (Server-Side Rendering) 
Une page annexe, pour la version SPA (Single-Page Application), a été créée en REACT JS ne permettant ici qu'un simple affichage des tâches stockées en base


# Installation

Installer node
Installer lodash
Installer express
Installer mysql

Créer en local une base de données mySQL nommée taskdb et une table task (cf. script)

## Script de création de la table pour stocker les tâches

CREATE TABLE `task` (
  `idtask` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `statut` int NOT NULL DEFAULT '0',
  `date_fin` date DEFAULT NULL,
  `dead_line` date DEFAULT NULL,
  PRIMARY KEY (`idtask`) )

##=> Pour la version REACT : 
  Installer react-bootstrap (bootstrap@5.1.3)


# Utilisation 

Sur l'invite de commande, lancer l'instruction :
node app_todo.js

Aller sur localhost:3000 et appeler la page /get-task

##=> Pour le lancement de la version REACT :
  Utiliser l'URL  http://localhost:3000/todoListReact.html
