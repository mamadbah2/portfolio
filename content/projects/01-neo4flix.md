---
id: 1
code: "01"
title: NEO4FLIX
tag: GRAPHES / RECOMMANDATION
desc: Moteur de recommandation base sur algorithmes de graphes Neo4j — 4 microservices Spring Boot, OAuth2/2FA, Angular, Docker.
stack: [SPRING BOOT, NEO4J, ANGULAR, OAUTH2, DOCKER]
metric: { v: 4, u: MICROSERVICES }
color: "#7c3aed"
mockup: dashboard
screenshots:
  - /screenshots/neo4flix/home.png
  - /screenshots/neo4flix/list.png
  - /screenshots/neo4flix/list-movie.png
  - /screenshots/neo4flix/movie-detail.png
  - /screenshots/neo4flix/settings.png
---

## Problem
Proposer des recommandations personnalisees en exploitant les relations entre utilisateurs et contenus — sans ML classique.

## Solution
4 microservices Spring Boot dedies, Neo4j pour les algorithmes de graphes (parcours, similarite, clustering), authentification OAuth2/2FA, front Angular, deploiement Docker.

## Value
Recommandation en temps reel via graphes — architecture propre, securisee et extensible.
