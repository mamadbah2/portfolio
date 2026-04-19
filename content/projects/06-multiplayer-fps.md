---
id: 6
code: "06"
title: MULTIPLAYER FPS
tag: RUST / GAME / RESEAU
desc: FPS multijoueur temps reel en Rust — architecture client-serveur, synchronisation d'etat distribue, gestion de la latence reseau.
stack: [RUST, WEBSOCKET, CLIENT-SERVEUR]
metric: { v: 60, u: FPS.TARGET }
color: "#d97706"
mockup: game
screenshots:
  - /screenshots/multiplayer-fps/gameplay-1.png
  - /screenshots/multiplayer-fps/gameplay-2.png
---

## Problem
Implementer un FPS multijoueur avec synchronisation d'etat reseau en temps reel, concurrence et gestion de la latence.

## Solution
Moteur de jeu Rust, architecture client-serveur, WebSocket pour synchronisation des positions/actions en temps reel, gestion du state distribue et de la concurrence.

## Value
Maitrise Rust bas niveau, networking temps reel et concurrence — projet de prestige du tronc commun Zone01.
