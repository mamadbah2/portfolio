# Portfolio content

Toute la donnée du portfolio vit ici. Le fichier `src/lib/data.ts` est **généré** à partir de ces .md par `scripts/build-content.mjs` (ne pas l'éditer à la main).

## Workflow

```
# Ajouter un nouvel item
npm run new:project mon-slug      # → content/projects/07-mon-slug.md
npm run new:job poste-acme        # → content/experience/04-poste-acme.md
npm run new:cert aws-saa          # → content/certs/03-aws-saa.md
npm run new:edu master-data       # → content/education/05-master-data.md

# Édite le .md créé, puis :
npm run dev                       # regénère data.ts + lance Next.js
```

`predev` et `prebuild` régénèrent automatiquement `src/lib/data.ts` avant chaque `npm run dev` ou `npm run build`. Pour forcer une régénération seule : `npm run build:content`.

## Structure

| Dossier / fichier | Type | Source de |
|-------------------|------|-----------|
| `identity.md` | singleton | `IDENTITY` |
| `kpis.md`, `gauges.md`, `definitions.md`, `sections.md` | singletons (liste plate dans le frontmatter) | `KPIS`, `GAUGES`, `DEFINITIONS`, `SECTIONS` |
| `skill-groups/NN-*.md` | 1 fichier par groupe | `SKILL_GROUPS` |
| `projects/NN-*.md` | 1 fichier par projet (frontmatter + corps) | `PROJECTS` |
| `experience/NN-*.md` | 1 fichier par job (frontmatter + bullets) | `EXPERIENCE` |
| `education/NN-*.md` | 1 fichier par diplôme | `EDUCATION` |
| `certs/NN-*.md` | 1 fichier par certif | `CERTS` |

Le préfixe numérique (`01-`, `02-`, ...) impose l'ordre d'affichage. Les fichiers sont triés alphabétiquement.

## Conventions par type

### Projet
- Frontmatter : `id`, `code`, `title`, `tag`, `desc`, `stack[]`, `metric { v, u }`, `color` (hex, **toujours quoté** car `#` est un commentaire YAML), `mockup` (`dashboard|ecommerce|terminal|social|game`), `screenshots[]` (paths relatifs `/screenshots/<slug>/...`).
- Corps : 3 sections obligatoires `## Problem`, `## Solution`, `## Value`. Chacune devient un champ string.

### Expérience
- Frontmatter : `period` (court, ex. `2024 — NOW`), `periodLong` (ex. `NOV 2024 — PRESENT`), `title`, `org`.
- Corps : liste à puces (`- ...`). Chaque puce devient un élément de `missions[]`.

### Education / Cert
- Frontmatter only (pas de corps).
- `period` et `periodLong` toujours quotés s'ils contiennent des chiffres seuls (`"2024"`).

### Skill group
- Frontmatter : `title`, `items[]` (chaque item : `{ name, s }` où `s` est un score 0-100).

## Pièges YAML

- **Toujours quoter** : valeurs commençant par `#` (couleurs hex), `+` (téléphones, suffixes), ou ne contenant que des chiffres (`"2024"`).
- Pour les listes inline d'objets, la syntaxe `{ key: value, key: value }` fonctionne tant qu'aucune valeur ne contient `,`, `:`, `{`, `}`. Sinon repasser en bloc multilignes.
