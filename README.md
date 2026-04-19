# MBB / OS — Portfolio

Le portfolio de **Mamadou Bobo Bah** (Senior Full Stack Engineer, Dakar). Mais surtout : un appareil électronique des années 80 reconverti en CV.

> **Stack visible** : Next.js 16, React 19, TypeScript, Tailwind 4.
> **Stack invisible** : DSEG, scanlines, glow vert phosphore, et probablement trop d'heures sur la position des vis du bezel.

---

## Le concept

Au lieu d'un énième `<section class="hero">` avec gradient violet et cards en `border-radius-2xl`, j'ai voulu construire **un objet**. Un truc qui ressemble à un appareil de mesure que ton oncle ingénieur garderait dans son atelier — ou à un terminal de Star Trek (saison 1, budget serré).

Le portfolio se présente comme un boîtier en plastique injecté brun-vert : un écran LCD au milieu, un PCB visible sur les bords, des boutons physiques en bas, des LEDs qui clignotent, un buzzer qui couine quand tu cliques. Tu peux changer le thème (BLEU / VERT / AMBRE / ROUGE / MONO) avec un vrai bouton, ou avec la touche `T` parce que j'ai prévu les raccourcis clavier comme un homme civilisé.

Et dans la section PROJECTS, il y a une **mini-télé CRT** en bas à droite qui t'affiche les screenshots du projet en boucle, avec :
- du bruit de signal des années 80 (chunky snow, V-hold rolling bar, flicker à 11 Hz),
- une animation de tuning qui dure 1.2s avant que le signal "se cale",
- des scanlines bleutées par-dessus, parce que sinon ce serait juste une `<img>` et où serait la dignité ?

---

## Pourquoi ça vaut le détour

Honnêtement, j'aurais pu livrer ça en 4 jours avec un template Tailwind. Mais alors :
- Tu n'aurais pas eu droit à 6 thèmes synchronisés entre le bouton physique, le panneau de tweaks, et le shortcut clavier.
- Tu n'aurais pas vu les **chiffres animés en DSEG7** qui font « tic-tic-tic » en montant comme un compteur kilométrique.
- Tu n'aurais pas pu lire la liste des projets dans un **carrousel piloté par les flèches du clavier** avec un effet de pelliculage pixelisé entre chaque transition.
- Et surtout, tu n'aurais pas eu le bouton MUTE qui marche vraiment (l'audio est géré au niveau module avec WebAudio, pas un `<audio src>` random).

Bref, c'est sur-ingéniéré pour un portfolio. C'était le but.

---

## Architecture

```
src/
  app/                  # Next.js App Router (layout, page, icon.svg)
  components/
    App.tsx             # state machine globale (section, focus, theme, mute)
    chrome.tsx          # bezel, status bar, bottom rail, boot screen
    screens.tsx         # tous les écrans (Home, About, Projects, Skills, Career, Edu, Contact, CRTViewer)
    tweaks.tsx          # panneau de réglage (thème, glow, scanlines, ghosting…)
  lib/
    data.ts             # GÉNÉRÉ par scripts/build-content.mjs — ne pas éditer

content/                # source de vérité (markdown + frontmatter)
  projects/01-neo4flix.md
  experience/01-bocalien.md
  certs/01-ccna.md
  ...                   # cf. content/README.md pour les conventions

scripts/
  build-content.mjs     # markdown → src/lib/data.ts
  new-item.mjs          # scaffold (npm run new:project, new:job, ...)

public/
  screenshots/<projet>/ # captures réelles des projets (servies par le CRTViewer)
```

---

## Développement

```bash
npm install
npm run dev            # http://localhost:3000 (regénère data.ts automatiquement)
```

Toutes les commandes utiles :

| Commande | Effet |
|---|---|
| `npm run dev` | dev server (predev → build:content) |
| `npm run build` | production build statique (prebuild → build:content) |
| `npm run build:content` | régénère `src/lib/data.ts` à partir de `content/` |
| `npm run new:project <slug>` | crée `content/projects/NN-<slug>.md` |
| `npm run new:job <slug>` | crée `content/experience/NN-<slug>.md` |
| `npm run new:cert <slug>` | crée `content/certs/NN-<slug>.md` |
| `npm run new:edu <slug>` | crée `content/education/NN-<slug>.md` |

**Ajouter un projet** prend littéralement 30 secondes : `npm run new:project mon-truc`, tu remplis le markdown, tu lances `npm run dev`, c'est dans le carrousel.

---

## Déploiement

Le portfolio est exporté en statique (`output: 'export'`) et servi par **GitHub Pages** sur push vers `main`. Le workflow vit dans `.github/workflows/deploy.yml`.

URL prod : `https://mamadbah2.github.io/portfolio/`

---

## Raccourcis clavier (parce qu'oui, il y en a)

| Touche | Effet |
|---|---|
| `1`–`7` | navigation directe entre sections |
| `←` / `→` | naviguer dans la liste des projets |
| `Enter` | ouvrir le détail du projet focalisé |
| `T` | cycler les thèmes (BLEU → VERT → AMBRE → ROUGE → MONO) |
| `M` | mute / unmute le buzzer |
| `Y` | ouvrir le panneau de tweaks (glow, scanlines, ghosting…) |

---

## Crédits design

Pas de crédits. C'est moi. Si ça te rappelle quelque chose c'est probablement parce que tu as déjà touché un Game Boy, une calculatrice TI, un magnétoscope VHS, ou un oscilloscope Tektronix. Tous mes amis d'enfance.

---

Pour me joindre (sans passer par cette interface) : `bahmamadoubobosewa@gmail.com` · [github.com/mamadbah2](https://github.com/mamadbah2)
