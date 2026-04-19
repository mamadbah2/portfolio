export const IDENTITY = {
  name: "MAMADOU BOBO BAH",
  short: "M.B.B.",
  role: "FULL STACK ENGINEER",
  positioning: "JAVA / SPRING / ANGULAR / REACT / GO",
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
  { name: "JAVA / SPRING", val: 93 },
  { name: "FULL STACK",    val: 90 },
  { name: "DEVOPS",        val: 85 },
  { name: "SECURITE",      val: 82 },
  { name: "IA / ML",       val: 78 },
];

export const PROJECTS = [
  {
    id: 1, code: "01",
    title: "NEO4FLIX",
    tag: "GRAPHES / RECOMMANDATION",
    desc: "Moteur de recommandation base sur algorithmes de graphes Neo4j — 4 microservices Spring Boot, OAuth2/2FA, Angular, Docker.",
    stack: ["SPRING BOOT", "NEO4J", "ANGULAR", "OAUTH2", "DOCKER"],
    problem: "Proposer des recommandations personnalisees en exploitant les relations entre utilisateurs et contenus — sans ML classique.",
    solution: "4 microservices Spring Boot dedies, Neo4j pour les algorithmes de graphes (parcours, similarite, clustering), authentification OAuth2/2FA, front Angular, deploiement Docker.",
    value: "Recommandation en temps reel via graphes — architecture propre, securisee et extensible.",
    metric: { v: 4, u: "MICROSERVICES" },
  },
  {
    id: 2, code: "02",
    title: "MABEX STORE",
    tag: "E-COMMERCE B2B/B2C",
    desc: "Plateforme transactionnelle multi-role — catalogue, checkout, pricing par volume, dashboards vendeur/admin/client.",
    stack: ["NEXT.JS", "NODE", "TYPESCRIPT", "MONGODB", "JWT"],
    problem: "Besoin d'une plateforme transactionnelle multi-role avec logique commerciale reelle et exploitation quotidienne par des operateurs non-tech.",
    solution: "Catalogue produit avec filtres, tunnel checkout optimise, back-office vendeur et admin, pricing par volume automatique, dashboards KPI temps-reel.",
    value: "Produit oriente conversion, adopte comme outil operationnel quotidien.",
    metric: { v: 3, u: "ROLES" },
  },
  {
    id: 3, code: "03",
    title: "FARMER",
    tag: "AUTOMATISATION / GO",
    desc: "Backend Go d'automatisation WhatsApp — webhooks entrants/sortants, collecte structuree, reporting KPI automatise sur Google Sheets.",
    stack: ["GO", "WHATSAPP API", "GOOGLE SHEETS"],
    problem: "Operations terrain chronophages et difficilement pilotables, remontees manuelles par SMS.",
    solution: "Backend Go, webhooks WhatsApp entrants/sortants, collecte de donnees structuree, reporting KPI automatise sur Google Sheets.",
    value: "35h/semaine de taches manuelles eliminees. Meilleure visibilite operationnelle terrain en temps reel.",
    metric: { v: 35, u: "HOURS/WEEK" },
  },
  {
    id: 4, code: "04",
    title: "MALWARE AI",
    tag: "ML / SECURITE",
    desc: "Detection automatique de malwares par ML — pipeline complet SVM / Random Forest / KNN + interface d'inference Streamlit pour analyste SOC.",
    stack: ["PYTHON", "SCIKIT-LEARN", "STREAMLIT"],
    problem: "Detecter automatiquement des malwares via approche data/ML plutot que signatures statiques.",
    solution: "Pipeline ML complet : preparation des donnees, entrainement (SVM, Random Forest, KNN), optimisation GridSearchCV, interface d'inference Streamlit pour analyse de fichiers PE.",
    value: "94% de precision. Demonstration concrète d'IA appliquee a la securite — projet de master validé.",
    metric: { v: 94, u: "ACCURACY.%" },
  },
  {
    id: 5, code: "05",
    title: "SOCIAL-NETWORK",
    tag: "FULLSTACK / GO + NEXT",
    desc: "Reseau social fullstack — backend Go, front Next.js, messagerie temps reel WebSocket, profils, posts, suivi, packaging cross-platform AppImage.",
    stack: ["GO", "NEXT.JS", "SQLITE", "WEBSOCKET"],
    problem: "Construire un reseau social complet avec messagerie temps reel, gestion de profils et distribution cross-platform sur Linux.",
    solution: "Backend Go avec API REST + WebSocket, front Next.js, gestion des profils/posts/notifications temps reel, packaging AppImage pour distribution cross-platform.",
    value: "Stack Go+Next coherent de bout en bout — distribution native Linux via AppImage, valide en peer-review Zone01.",
    metric: { v: 1, u: "APPIMAGE" },
  },
  {
    id: 6, code: "06",
    title: "MULTIPLAYER FPS",
    tag: "RUST / GAME / RESEAU",
    desc: "FPS multijoueur temps reel en Rust — architecture client-serveur, synchronisation d'etat distribue, gestion de la latence reseau.",
    stack: ["RUST", "WEBSOCKET", "CLIENT-SERVEUR"],
    problem: "Implementer un FPS multijoueur avec synchronisation d'etat reseau en temps reel, concurrence et gestion de la latence.",
    solution: "Moteur de jeu Rust, architecture client-serveur, WebSocket pour synchronisation des positions/actions en temps reel, gestion du state distribue et de la concurrence.",
    value: "Maitrise Rust bas niveau, networking temps reel et concurrence — projet de prestige du tronc commun Zone01.",
    metric: { v: 60, u: "FPS.TARGET" },
  },
];

export const SKILL_GROUPS = [
  {
    title: "JAVA / SPRING",
    items: [
      { name: "JAVA 17+ / SPRING BOOT", s: 93 },
      { name: "SPRING SECURITY / OAUTH2", s: 88 },
      { name: "SPRING DATA / JPA", s: 88 },
      { name: "API REST / GRAPHQL", s: 90 },
      { name: "MICROSERVICES / KAFKA", s: 82 },
    ],
  },
  {
    title: "FRONTEND",
    items: [
      { name: "ANGULAR / RXJS", s: 85 },
      { name: "REACT / NEXT.JS", s: 90 },
      { name: "TYPESCRIPT", s: 92 },
      { name: "JAVASCRIPT", s: 92 },
    ],
  },
  {
    title: "AUTRES LANGAGES",
    items: [
      { name: "GO", s: 85 },
      { name: "PYTHON", s: 80 },
      { name: "RUST", s: 68 },
      { name: "NODE.JS", s: 78 },
    ],
  },
  {
    title: "SECURITE & ARCHI",
    items: [
      { name: "OWASP TOP 10", s: 82 },
      { name: "JWT / OAUTH2 / 2FA", s: 85 },
      { name: "SOLID / DDD / TDD", s: 85 },
      { name: "ARCHI HEXAGONALE", s: 80 },
    ],
  },
  {
    title: "DEVOPS & DELIVERY",
    items: [
      { name: "DOCKER", s: 88 },
      { name: "JENKINS / GH ACTIONS", s: 85 },
      { name: "LINUX / SHELL / ANSIBLE", s: 85 },
      { name: "SONARQUBE / NEXUS", s: 80 },
    ],
  },
  {
    title: "DATA & IA",
    items: [
      { name: "POSTGRES / MYSQL", s: 85 },
      { name: "MONGODB / NEO4J", s: 80 },
      { name: "ELASTICSEARCH / REDIS", s: 72 },
      { name: "ML / SCIKIT-LEARN", s: 78 },
    ],
  },
];

export const EXPERIENCE = [
  {
    period: "2024 — NOW",
    periodLong: "NOV 2024 — PRESENT",
    title: "BOCALIEN — CODING MENTOR & ADMIN TECHNIQUE",
    org: "ZONE01 DAKAR",
    missions: [
      "Coding mentor : accompagnement technique des talents, peer review, deblocage sur les projets du cursus.",
      "Deploiement et maintenance de la plateforme de formation 01edu en conteneurs Docker (infra on-premise).",
      "Administration Linux de 150+ postes Ubuntu : VLAN, pare-feu, DNS/DHCP, Ansible, disponibilite 99.9%.",
      "Developpement d'outils d'automatisation (Go, Python, Bash) connectes a l'API GraphQL — -35% de charge manuelle.",
    ],
  },
  {
    period: "2023 — NOW",
    periodLong: "OCT 2023 — PRESENT",
    title: "INGENIEUR LOGICIEL FULL STACK (SPEC. JAVA)",
    org: "ZONE01 DAKAR — PROGRAMME INTENSIF",
    missions: [
      "Spécialisation Java Full Stack : Spring Boot, Hibernate/JPA, Angular, microservices, Kafka, CI/CD.",
      "30+ projets livres sous contrainte reelle : peer-review, audits croises, standard qualite eleve.",
      "Projets phares : neo4flix (graphes Neo4j), lets-travel (microservices), safe-zone (OWASP), mr-jenk (CI/CD).",
      "TDD (JUnit 5), SonarQube, Nexus, Docker — pratiques enterprise appliquees sur chaque livrable.",
    ],
  },
  {
    period: "2022 — NOW",
    periodLong: "2022 — PRESENT",
    title: "DEVELOPPEUR FREELANCE FULL STACK",
    org: "INDEPENDANT",
    missions: [
      "mabex-store : e-commerce B2B/B2C (Next.js, MongoDB, JWT) — multi-role, pricing par volume.",
      "farmer : automatisation WhatsApp en Go — webhooks, collecte KPI, -35h/semaine.",
      "mamou-prestige-awards : vote + paiement Orange Money, anti-fraude, scoring pondere.",
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
  { n: "01", b: "PROBLEM SOLVER",   t: "Je cible les solutions utiles, livrables et durables." },
  { n: "02", b: "SECURITY MINDSET", t: "OWASP, MSSI en cours — securite integree des la conception." },
  { n: "03", b: "FULL SPECTRUM",    t: "Java/Spring, Angular, Go, Rust, DevOps, ML — tout le stack." },
  { n: "04", b: "PEER TO PEER",     t: "Forme a 42. Peer review, rigueur, collaboration technique." },
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
