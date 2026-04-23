# MBB / Portfolio — Dual Experience

Le portfolio de **Mamadou Bobo Bah** (Full Stack Engineer Confirmé, Dakar).

Deux expériences du même CV, selon l'humeur du visiteur :

- **Retro Console** — un appareil électronique des années 80 reconverti en CV. LCD phosphore, PCB, boutons physiques, buzzer WebAudio, 5 thèmes.
- **Editorial Kinetic** — un portfolio clair, typographie XXL Fraunces, sculpture 3D terracotta derrière le nom, projets en scroll horizontal, shaders WebGL, lentille curseur.

Une page d'accueil **split-cinématique** laisse choisir (et mémorise le choix en `localStorage`).

> **Stack visible** : Next.js 16, React 19, TypeScript, Tailwind 4.
> **Stack invisible** : WebGL (ogl), three.js + R3F + drei, GSAP + ScrollTrigger, Lenis, DSEG, scanlines CSS, VT323.

---

## Le concept

### Côté retro

Au lieu d'un énième `<section class="hero">` avec gradient violet et cards en `border-radius-2xl`, j'ai voulu construire **un objet**. Un truc qui ressemble à un appareil de mesure que ton oncle ingénieur garderait dans son atelier — ou à un terminal de Star Trek (saison 1, budget serré).

Le portfolio se présente comme un boîtier en plastique injecté brun-vert : un écran LCD au milieu, un PCB visible sur les bords, des boutons physiques en bas, des LEDs qui clignotent, un buzzer qui couine quand tu cliques. Tu peux changer le thème (BLEU / VERT / AMBRE / ROUGE / MONO) avec un vrai bouton, ou avec la touche `T`.

Dans la section PROJECTS, il y a une **mini-télé CRT** en bas à droite qui affiche les screenshots en boucle, avec du bruit de signal des années 80, une animation de tuning avant que le signal se cale, et des scanlines bleutées par-dessus.

### Côté editorial

La variante "pro" répond à un besoin simple : la console retro n'est pas un format de lecture naturel pour les recruteurs. L'éditorial est une lecture scrollable classique, avec :

- Un **hero** Fraunces XXL, nom révélé lettre par lettre (stagger GSAP), dot terracotta sur le point final.
- Une **sculpture 3D** (icosaèdre distordu, MeshDistortMaterial) qui flotte derrière le nom, réagit à la souris et au scroll, puis s'efface progressivement.
- Un **shader WebGL** en arrière-plan du hero : champ de bruit fbm en palette éditoriale, qui suit discrètement le curseur.
- Une **lentille WebGL** suivant le curseur, amplifiée au survol des éléments interactifs.
- Les **projets en scroll horizontal cinématique** : la section se pin, le track glisse de droite à gauche au scroll vertical. Chaque card garde un effet de displacement + RGB-split au hover.
- Les **rails de section** (01..06) sticky en haut pendant la lecture.
- La **timeline Parcours** qui se remplit en scrub au scroll.
- **Lenis** pour le smooth scroll, synchronisé à GSAP ScrollTrigger.

Tout est coupé proprement sous `prefers-reduced-motion: reduce`, et le layout dégrade en stack vertical sur mobile (pas de sculpture, pas de horizontal, pas de cursor lens).

---

## Architecture

```
src/
  app/
    (chooser)/                 # root layout A — split-cinématique avec mémorisation localStorage
      layout.tsx               # fonts chooser (JetBrains Mono + Fraunces)
      page.tsx                 # <Chooser />
      chooser.css
    (retro)/                   # root layout B — JetBrains Mono + VT323
      layout.tsx
      retro.css                # ancien globals.css, scopé sous .retro
      retro/page.tsx           # <App />
    (pro)/                     # root layout C — Fraunces + Inter
      layout.tsx
      pro.css
      pro/page.tsx             # <Pro />
  components/
    App.tsx                    # retro : state machine globale (section, focus, theme, mute)
    chrome.tsx                 # retro : bezel, status bar, bottom rail, boot screen
    screens.tsx                # retro : tous les écrans (Home, About, Projects, Skills, Career, Edu, Contact, CRTViewer)
    tweaks.tsx                 # retro : panneau de réglage
    Chooser.tsx                # page d'accueil split-cinématique
    shared/
      ExperienceSwitch.tsx     # pill de bascule retro ↔ pro
    pro/
      Pro.tsx                  # orchestrateur éditorial (wrap Lenis + GSAP choreography)
      Hero.tsx
      Bio.tsx
      Projects.tsx
      Experience.tsx
      Skills.tsx
      Education.tsx
      Contact.tsx
      Footer.tsx
      scroll/                  # GSAP + Lenis + split-letter
        LenisProvider.tsx
        useGsapScrollChoreography.ts
        SplitChars.tsx
      webgl/                   # couche motion WebGL
        rafLoop.ts             # orchestrateur rAF unique
        HeroField.tsx          # shader fbm du hero (ogl)
        HeroSculpture.tsx      # sculpture 3D R3F (gated desktop + motion)
        Scene3D.tsx            # contenu de la scène 3D
        CursorLens.tsx         # lentille curseur (ogl)
        ProjectCanvas.tsx      # displacement image projet (ogl)
        shaders/               # fragments GLSL (heroField, imageDisplace, cursorBlob)
        util/                  # readPalette, noiseTexture
  lib/
    data.ts                    # GÉNÉRÉ par scripts/build-content.mjs — ne pas éditer

content/                       # source de vérité (markdown + frontmatter)
  projects/01-neo4flix.md
  experience/01-bocalien.md
  certs/01-ccna.md
  ...                          # cf. content/README.md pour les conventions

scripts/
  build-content.mjs            # markdown → src/lib/data.ts
  new-item.mjs                 # scaffold (npm run new:project, new:job, ...)

public/
  screenshots/<projet>/        # captures réelles des projets
```

---

## Développement

```bash
npm install
npm run dev            # http://localhost:3000 (regénère data.ts automatiquement)
```

| Commande | Effet |
|---|---|
| `npm run dev` | dev server (predev → build:content) |
| `npm run build` | production build statique (prebuild → build:content) |
| `npm run build:content` | régénère `src/lib/data.ts` à partir de `content/` |
| `npm run new:project <slug>` | crée `content/projects/NN-<slug>.md` |
| `npm run new:job <slug>` | crée `content/experience/NN-<slug>.md` |
| `npm run new:cert <slug>` | crée `content/certs/NN-<slug>.md` |
| `npm run new:edu <slug>` | crée `content/education/NN-<slug>.md` |

**Ajouter un projet** prend littéralement 30 secondes : `npm run new:project mon-truc`, tu remplis le markdown, tu lances `npm run dev`, c'est dans les deux expériences.

---

## Déploiement

Le portfolio est exporté en statique (`output: 'export'`) et servi par **GitHub Pages** sur push vers `main`. Le workflow vit dans `.github/workflows/deploy.yml`.

URL prod : `https://mamadbah2.github.io/portfolio/`

La variable d'env `GITHUB_PAGES=1` active le `basePath: '/portfolio'` et le préfixage des assets. Les trois routes générées sont `/`, `/retro/`, `/pro/`.

---

## Navigation entre expériences

- Arrivée racine → page **chooser** (si localStorage vide), ou redirection directe vers la dernière expérience choisie (script inline pre-hydration, pas de flash).
- Depuis le chooser, chaque panneau est un `<a href>` ; `localStorage.setItem('mbb.experience', <target>)` puis `router.replace()` pour éviter une boucle back-button.
- Depuis n'importe quelle expérience, un petit pill `▸ retro` / `▸ editorial` en haut à droite bascule. Le footer de chaque expérience propose `back to portal →` vers `/?reset=1` qui force l'affichage du chooser.

---

## Raccourcis clavier (retro uniquement)

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

Pas de crédits. C'est moi. Si la variante retro te rappelle quelque chose, c'est probablement parce que tu as déjà touché un Game Boy, une calculatrice TI, un magnétoscope VHS, ou un oscilloscope Tektronix. Si la variante éditoriale te rappelle quelque chose, c'est que tu passes probablement trop de temps sur godly.website et awwwards — bienvenue au club.

---

Pour me joindre (sans passer par cette interface) : `bahmamadoubobosewa@gmail.com` · [github.com/mamadbah2](https://github.com/mamadbah2)
