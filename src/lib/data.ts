export const IDENTITY = {
  name: "MAMADOU BOBO BAH",
  short: "M.B.B.",
  role: "SENIOR FULL STACK ENGINEER",
  positioning: "PRODUCT ENGINEER / IMPACT ORIENTED",
  location: "DAKAR. SENEGAL",
  phone: "+221 77 766 70 17",
  email: "bahmamadoubobosewa@gmail.com",
  github: "github.com/mamadbah2",
  githubHandle: "mamadbah2",
  heroTitle: "BUILD.PRODUCTS.THAT.SHIP",
  experienceYears: 3,
  projectsShipped: 30,
  automationGain: 35,
  hackathonDays: 5,
};

export const KPIS = [
  { label: "PROJECTS SHIPPED", val: 30, unit: "UNITS", suffix: "+" },
  { label: "AUTOMATION GAIN", val: 35, unit: "PERCENT", suffix: "%" },
  { label: "YEARS ACTIVE", val: 3, unit: "YEARS", suffix: "+" },
  { label: "UPTIME TARGET", val: 99.9, unit: "PERCENT", suffix: "%" },
];

export const GAUGES = [
  { name: "FULL STACK", val: 95 },
  { name: "AUTOMATION", val: 92 },
  { name: "PRODUCT SENSE", val: 88 },
  { name: "AI APPLIED", val: 78 },
  { name: "DEVOPS", val: 82 },
];

export const PROJECTS = [
  {
    id: 1, code: "01",
    title: "MABEX STORE",
    tag: "E-COMMERCE B2B/B2C",
    desc: "Plateforme transactionnelle multi-role avec logique commerciale reelle — catalogue, checkout, pricing par volume, dashboards vendeur/admin/client.",
    stack: ["NEXT.JS", "NODE", "TS", "MONGO", "JWT"],
    problem: "Besoin d'une plateforme transactionnelle multi-role avec logique commerciale reelle, pricing differencie et exploitation quotidienne par des operateurs non-tech.",
    solution: "Catalogue produit avec filtres, tunnel checkout optimise, back-office vendeur et admin, pricing par volume automatique, dashboards KPI temps-reel.",
    value: "Produit oriente conversion, adopte comme outil operationnel quotidien.",
    metric: { v: 3, u: "ROLES" },
  },
  {
    id: 2, code: "02",
    title: "MAMOU PRESTIGE AWARDS",
    tag: "VOTE + PAIEMENT",
    desc: "Digitalisation d'une campagne de vote avec paiement Orange Money, scoring pondere public/jury et garde-fous anti-fraude.",
    stack: ["NEXT.JS", "TS", "OM API"],
    problem: "Digitaliser une campagne de vote avec engagement public et monetisation, tout en garantissant l'integrite des resultats.",
    solution: "Plateforme de vote + paiement Orange Money, scoring pondere public/jury, systeme anti-fraude (rate-limit, fingerprint, verification paiement).",
    value: "Parcours utilisateur optimise et logique business transparente.",
    metric: { v: 100, u: "FRAUD.BLOCK" },
  },
  {
    id: 3, code: "03",
    title: "FARMER AUTOMATION",
    tag: "BACKEND + WHATSAPP",
    desc: "Backend d'automatisation WhatsApp, webhooks et reporting KPI pour piloter des operations terrain chronophages.",
    stack: ["GO", "WHATSAPP", "SHEETS"],
    problem: "Operations terrain chronophages et difficilement pilotables, remontees manuelles par SMS.",
    solution: "Backend d'automatisation WhatsApp, webhooks entrants/sortants, collecte de donnees structuree, reporting KPI sur Google Sheets.",
    value: "Gain de temps operationnel et meilleure prise de decision.",
    metric: { v: 35, u: "HOURS/WEEK" },
  },
  {
    id: 4, code: "04",
    title: "BUY-02",
    tag: "E-COMMERCE + AI",
    desc: "App e-commerce full stack en contexte projet intensif avec modele IA comprenant des langues africaines.",
    stack: ["JAVA", "SPRING", "REACT", "AI"],
    problem: "Construire une app e-commerce complete en contexte projet intensif, avec support de langues locales pour l'accessibilite.",
    solution: "Architecture full stack avec APIs metier, orientation parcours utilisateur et paiement. Integration d'un modele IA multilingue (wolof, peul).",
    value: "Demonstration de capacite a livrer vite avec differenciation produit.",
    metric: { v: 3, u: "LANGUAGES" },
  },
  {
    id: 5, code: "05",
    title: "MALWARE AI",
    tag: "ML CLASSIFICATION",
    desc: "Detection automatique de malwares via approche data/ML — entrainement de modeles supervises + interface d'inference.",
    stack: ["PYTHON", "SKLEARN", "STREAMLIT"],
    problem: "Detecter automatiquement des malwares via approche data/ML plutot que signatures statiques.",
    solution: "Entrainement et optimisation de modeles supervises (random forest, gradient boosting) + interface d'inference Streamlit.",
    value: "Demonstration concrete d'IA appliquee et exploitable par un analyste SOC.",
    metric: { v: 94, u: "ACCURACY.%" },
  },
  {
    id: 6, code: "06",
    title: "HACKATHON MUSEE",
    tag: "PROTOTYPE — 5 JOURS",
    desc: "Prototype fonctionnel d'experience digitale pour musee, livre en 5 jours en equipe.",
    stack: ["REACT", "NODE", "TEAM"],
    problem: "Concevoir rapidement une experience digitale innovante en equipe en contexte de pression.",
    solution: "Prototype fonctionnel, user journey teste, demo de bout en bout livrable en 5 jours.",
    value: "Capacite a executer vite et a trancher sous contrainte.",
    metric: { v: 5, u: "DAYS" },
  },
];

export const SKILL_GROUPS = [
  {
    title: "FULL STACK PRODUIT",
    items: [
      { name: "REACT / NEXT.JS", s: 95 },
      { name: "NODE.JS", s: 92 },
      { name: "TYPESCRIPT", s: 90 },
      { name: "REST / GRAPHQL", s: 88 },
      { name: "ARCHITECTURE WEB", s: 85 },
      { name: "JAVASCRIPT", s: 95 },
    ],
  },
  {
    title: "IA & AUTOMATION",
    items: [
      { name: "PYTHON", s: 82 },
      { name: "SCIKIT-LEARN", s: 78 },
      { name: "MODEL INTEGRATION", s: 80 },
      { name: "WORKFLOW AUTOMATION", s: 90 },
    ],
  },
  {
    title: "GROWTH & DATA",
    items: [
      { name: "FUNNEL DESIGN", s: 85 },
      { name: "KPI INSTRUMENTATION", s: 82 },
      { name: "CONVERSION LOGIC", s: 80 },
    ],
  },
  {
    title: "ARCHITECTURE",
    items: [
      { name: "MICROSERVICES", s: 80 },
      { name: "SOLID / DDD", s: 82 },
      { name: "TEST COVERAGE", s: 78 },
      { name: "SONARQUBE", s: 75 },
    ],
  },
  {
    title: "DEVOPS & DELIVERY",
    items: [
      { name: "DOCKER", s: 88 },
      { name: "JENKINS / GH ACTIONS", s: 82 },
      { name: "LINUX / SHELL", s: 85 },
      { name: "ANSIBLE", s: 72 },
      { name: "NEXUS", s: 70 },
    ],
  },
  {
    title: "STACK COMPLEMENT",
    items: [
      { name: "JAVA / SPRING", s: 82 },
      { name: "POSTGRES / MYSQL", s: 85 },
      { name: "MONGO / NEO4J", s: 80 },
      { name: "SECURITE / OWASP", s: 75 },
      { name: "JWT / AUTH", s: 85 },
    ],
  },
];

export const EXPERIENCE = [
  {
    period: "2024 — NOW",
    periodLong: "NOV 2024 — PRESENT",
    title: "DEVELOPPEUR FULL STACK & ADMINISTRATEUR TECHNIQUE",
    org: "ZONE01 DAKAR — BOCALIEN",
    missions: [
      "Deploiement, maintenance et amelioration continue d'une plateforme critique (Docker, infra on-premise).",
      "Developpement d'outils d'automatisation connectes a des APIs GraphQL.",
      "Structuration des flux operationnels (incidents, support, monitoring).",
      "Reduction de 35% des taches manuelles et meilleure visibilite operationnelle.",
    ],
  },
  {
    period: "2023 — 2024",
    periodLong: "OCT 2023 — NOV 2024",
    title: "DEVELOPPEUR FULL STACK (SPEC. JAVA)",
    org: "ZONE01 DAKAR",
    missions: [
      "Livraison de 30+ projets avec contraintes reelles de qualite et delais.",
      "Plateforme e-commerce orientee parcours utilisateur, paiement et performance.",
      "Integration d'un modele IA multilingue (langues africaines).",
      "Mise en place CI/CD (Jenkins, SonarQube, Docker).",
    ],
  },
  {
    period: "2023 — 2025",
    periodLong: "2023 — 2025",
    title: "DEVELOPPEUR FREELANCE FULL STACK",
    org: "INDEPENDANT",
    missions: [
      "Conception de plateformes web, APIs et automatisations orientees conversion.",
      "Cycle court, iteration rapide avec feedback terrain.",
    ],
  },
];

export const EDUCATION = [
  { title: "MASTER SECURITE DES SYSTEMES D'INFORMATION", org: "ESP DAKAR", period: "25—26", periodLong: "2025 — 2026 (EN COURS)" },
  { title: "LICENCE GENIE LOGICIEL, SYSTEMES & RESEAUX", org: "ISM DAKAR", period: "22—25", periodLong: "2022 — 2025" },
  { title: "PROGRAMME INTENSIF INGENIERIE LOGICIELLE", org: "ZONE01 DAKAR", period: "23—25", periodLong: "2023 — 2025" },
];

export const CERTS = [
  { title: "WEB SECURITY FUNDAMENTALS", org: "OWASP TRACK", period: "2024" },
  { title: "DOCKER & CI/CD PIPELINE", org: "IN-HOUSE", period: "2024" },
  { title: "ML APPLIED — MALWARE DETECTION", org: "PROJECT CERT", period: "2024" },
];

export const DEFINITIONS = [
  { n: "01", b: "PROBLEM SOLVER", t: "Je privilegie les solutions utiles et livrables vite." },
  { n: "02", b: "IMPACT MINDSET", t: "Je relie la technique aux objectifs metier." },
  { n: "03", b: "POLYVALENCE", t: "Produit, architecture, operations, automatisation." },
  { n: "04", b: "COLLABORATION", t: "A l'aise avec profils tech et non-tech." },
];

export const SECTIONS = [
  { id: "HOME",     label: "HOME" },
  { id: "ABOUT",    label: "ABOUT" },
  { id: "PROJECTS", label: "PROJECTS" },
  { id: "SKILLS",   label: "SKILLS" },
  { id: "EXP",      label: "CAREER" },
  { id: "EDU",      label: "FORMATION" },
  { id: "CONTACT",  label: "CONTACT" },
];
