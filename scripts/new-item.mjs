#!/usr/bin/env node
// Scaffolds a new content item (project | experience | education | cert).
// Usage:
//   node scripts/new-item.mjs <type> <slug>
//   npm run new:project social-feed
//   npm run new:job staff-engineer-acme
//   npm run new:cert aws-saa
//   npm run new:edu master-data-science

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const TYPES = {
  project: {
    dir: 'projects',
    template: ({ id, code }) => `---
id: ${id}
code: "${code}"
title: TODO
tag: TODO / TODO
desc: TODO une phrase qui resume le projet.
stack: [TODO, TODO]
metric: { v: 0, u: TODO }
color: "#7c3aed"
mockup: dashboard
screenshots: []
---

## Problem
TODO le besoin / la douleur que le projet resout.

## Solution
TODO l'approche technique en 2-3 lignes.

## Value
TODO le resultat / impact mesurable.
`,
  },
  experience: {
    dir: 'experience',
    template: () => `---
period: YYYY — NOW
periodLong: MMM YYYY — PRESENT
title: TODO TITRE DU POSTE
org: TODO ENTREPRISE
---

- TODO premiere mission / responsabilite cle.
- TODO deuxieme mission.
- TODO impact ou metrique chiffree.
`,
  },
  education: {
    dir: 'education',
    template: () => `---
title: TODO INTITULE DU DIPLOME
org: TODO ECOLE
period: "YY—YY"
periodLong: YYYY — YYYY
---
`,
  },
  cert: {
    dir: 'certs',
    template: () => `---
title: TODO INTITULE DE LA CERTIFICATION
org: TODO EMETTEUR
period: "YYYY"
---
`,
  },
};

const [, , typeArg, slugArg] = process.argv;

if (!typeArg || !TYPES[typeArg]) {
  console.error(`usage: node scripts/new-item.mjs <${Object.keys(TYPES).join('|')}> <slug>`);
  process.exit(1);
}
if (!slugArg) {
  console.error('error: missing <slug> (e.g. "social-feed", "ccna")');
  process.exit(1);
}

const slug = slugArg.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)/g, '');
if (!slug) {
  console.error('error: slug must contain at least one alphanumeric character');
  process.exit(1);
}

const { dir, template } = TYPES[typeArg];
const targetDir = path.join(ROOT, 'content', dir);
fs.mkdirSync(targetDir, { recursive: true });

const existing = fs.readdirSync(targetDir).filter(f => f.endsWith('.md'));
if (existing.some(f => f.endsWith(`-${slug}.md`))) {
  console.error(`error: slug "${slug}" already exists in content/${dir}/`);
  process.exit(1);
}

const maxPrefix = existing
  .map(f => parseInt(f.slice(0, 2), 10))
  .filter(n => !Number.isNaN(n))
  .reduce((a, b) => Math.max(a, b), 0);
const nextNum = maxPrefix + 1;
const code = String(nextNum).padStart(2, '0');
const filename = `${code}-${slug}.md`;
const filepath = path.join(targetDir, filename);

fs.writeFileSync(filepath, template({ id: nextNum, code }));

console.log(`✓ created content/${dir}/${filename}`);
console.log(`  edit it, then run \`npm run dev\` (data.ts is regenerated automatically).`);
