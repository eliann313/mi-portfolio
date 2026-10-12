import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'skillradar',
    title: 'SkillRadar',
    type: 'individual',
    status: 'completed',
    description: {
      es: 'Plataforma SaaS dual-role (developer/recruiter) enfocada en la privacidad, con flujo guiado de análisis de CV, emparejamiento laboral y entrevistas simuladas asistidas por IA.',
      en: 'Privacy-first dual-role (developer/recruiter) SaaS platform featuring an integrated workflow of CV analysis, job matching, and AI-assisted mock interviews.',
    },
    contributions: {
      es: [
        'Lideré el diseño e implementación full stack de la plataforma dual-role y su flujo guiado: CV Analysis → Job Match → Mock Interview.',
        'Desarrollé Career Copilot y el módulo de Career Path persistente con roadmap interactivo multi-rubro, tracking de hitos, alertas y analíticas de progreso.',
        'Implementé el modo Recruiter Demo (Guest Recruiter): exploración interactiva de solo lectura para reclutadores sin registro, con aislamiento total de la base de datos real para proteger la privacidad de candidatos y mitigar riesgos IDOR.',
        'Diseñé el enrutamiento multi-proveedor de IA (Google Gemini como motor primario, soporte BYOK para OpenAI, Anthropic, Groq y OpenRouter) con cifrado AES-256-GCM.',
        'Configuré suites de pruebas automatizadas (Vitest y Playwright) integradas en CI/CD con GitHub Actions y baseline de migraciones en Prisma ORM.',
      ],
      en: [
        'Led the end-to-end design and full-stack implementation of the dual-role platform and its guided workflow: CV Analysis → Job Match → Mock Interview.',
        'Developed Career Copilot and persistent Career Path module featuring a multi-domain interactive roadmap, milestone tracking, proactive alerts, and progress analytics.',
        'Implemented Recruiter Demo mode (Guest Recruiter): interactive read-only exploration for recruiters without registration, strictly isolated from production DB to guarantee candidate privacy and prevent IDOR vulnerabilities.',
        'Designed multi-provider AI routing (Google Gemini as primary engine, BYOK support for OpenAI, Anthropic, Groq, OpenRouter) with AES-256-GCM sensitive data encryption.',
        'Configured automated testing suites (Vitest & Playwright) integrated into GitHub Actions CI/CD and Prisma migration baselines.',
      ],
    },
    stack: ['Next.js 16', 'TypeScript', 'Prisma', 'Neon (PostgreSQL)', 'Tailwind CSS', 'Vercel AI SDK', 'Playwright', 'GitHub Actions'],
    roles: {
      es: ['Creador', 'Desarrollador Full Stack'],
      en: ['Creator', 'Full Stack Developer'],
    },
    links: {
      demo: 'https://skillradar-app.vercel.app',
      repo: 'https://github.com/eliann313/SkillRadar',
    },
  },
  {
    id: 'dataforge',
    title: 'DataForge',
    type: 'individual',
    status: 'in-progress',
    description: {
      es: 'Plataforma de análisis de datos autoservicio, browser-native y local-first, con motor columnar DuckDB-Wasm en Web Workers y procesamiento sin servidores.',
      en: 'Browser-native, local-first self-service data analytics platform powered by DuckDB-Wasm in Web Workers with zero-cloud computation.',
    },
    contributions: {
      es: [
        'Diseñé la arquitectura client-side local-first desacoplando la UI estática (Next.js 16) del cómputo analítico mediante Web Workers dedicados.',
        'Integré DuckDB-Wasm en worker en segundo plano con ciclo de vida diferido, reinicio resiliente y mensajería tipada, logrando 0 long-tasks en el hilo principal.',
        'Desarrollé parsers de ingesta para CSV y XLSX en Web Worker con inferencia de esquemas, cálculo de agregaciones y vista previa paginada de alta velocidad (100k filas en 867 ms).',
        'Implementé el dominio de proyectos con casos de uso desacoplados y persistencia local transaccional mediante IndexedDB versionada.',
        'Construí harness automatizado de benchmarks locales (medianas de 5 corridas) y suites de testing con Vitest (20/20) y Playwright E2E (18/18 en Chromium y Firefox).',
      ],
      en: [
        'Designed the local-first client-side architecture decoupling static UI (Next.js 16) from analytical computation using dedicated Web Workers.',
        'Integrated DuckDB-Wasm in a background worker with deferred initialization, resilient restart, and typed messaging protocol, achieving 0 main-thread long tasks.',
        'Built CSV and XLSX ingestion parsers in Web Workers featuring schema inference, aggregate calculations, and high-performance paginated previews (100k rows in 867 ms).',
        'Implemented the projects domain with decoupled use cases and transactional local persistence via versioned IndexedDB.',
        'Constructed an automated local benchmark harness (5-run medians) and testing suites with Vitest (20/20) and Playwright E2E (18/18 across Chromium and Firefox).',
      ],
    },
    stack: ['Next.js 16', 'TypeScript', 'DuckDB-Wasm', 'Web Workers', 'IndexedDB', 'Tailwind CSS', 'Vitest', 'Playwright', 'GitHub Actions'],
    roles: {
      es: ['Creador', 'Arquitecto de Software', 'Desarrollador Full Stack'],
      en: ['Creator', 'Software Architect', 'Full Stack Developer'],
    },
    links: {
      repo: 'https://github.com/eliann313/DataForge',
    },
  },
  {
    id: 'prop2',
    title: 'Prop²',
    type: 'group',
    status: 'completed',
    description: {
      es: 'Plataforma inmobiliaria peer-to-peer (venta y alquiler directo sin comisiones) con arquitectura backend por dominios, frontend responsive mobile-first y seguridad avanzada.',
      en: 'Peer-to-peer real estate platform (direct sales and rentals without broker fees) featuring domain-driven backend architecture, mobile-first responsive frontend, and advanced security.',
    },
    contributions: {
      es: [
        'Lideré el diseño e implementación de la arquitectura backend por dominios (Screaming / Hexagonal) con servicios desacoplados del ORM y repositorios tipados.',
        'Diseñé el modelo relacional en PostgreSQL serverless (Neon) mediante Prisma 7 con driver adapter HTTP y migraciones versionadas.',
        'Implementé el frontend responsive completo (mobile-first) con buscador dinámico, filtros por URL (precio, tipo, ambientes, comodidades) y sincronización reactiva.',
        'Construí el perfil público de vendedor, el panel de administración de inmuebles y la bandeja de consultas recibidas (inbox) con estados (pendiente, respondida, archivada) y paginación.',
        'Integré notificaciones transaccionales por correo SMTP (Nodemailer), subida directa firmada a Cloudinary, rate-limiting con Upstash Redis y marco legal formal.',
      ],
      en: [
        'Led the design and implementation of domain-driven backend architecture (Screaming / Hexagonal) decoupling core services from the ORM with typed repositories.',
        'Designed relational data model on serverless PostgreSQL (Neon) using Prisma 7 HTTP driver adapters and versioned migrations.',
        'Implemented complete mobile-first responsive frontend with dynamic search, URL-synced multi-filter drawers (price, property type, rooms, amenities), and reactive state sync.',
        'Built public seller profiles, property management dashboard, and received inquiries inbox with lifecycle states (pending, answered, archived) and pagination.',
        'Integrated transactional SMTP notifications (Nodemailer), signed Cloudinary direct uploads, Upstash Redis rate-limiting, and legal policies framework.',
      ],
    },
    stack: ['Next.js 16', 'TypeScript', 'Prisma 7', 'Neon (PostgreSQL)', 'Auth.js v5', 'Tailwind CSS', 'Upstash Redis', 'Cloudinary', 'Nodemailer', 'Vitest'],
    roles: {
      es: ['Backend, Frontend y Arquitectura', 'Líder Técnico'],
      en: ['Backend, Frontend & Architecture', 'Technical Lead'],
    },
    links: {
      demo: 'https://prop2inmuebles.vercel.app',
      repo: 'https://github.com/eliann313/Prop2',
    },
  },
  {
    id: 'gridhub-wms',
    title: 'GridHub WMS',
    type: 'group',
    status: 'in-progress',
    description: {
      es: 'Sistema logístico empresarial multi-tenant con aislamiento de datos por cliente, resiliencia offline, algoritmos de almacenamiento y arquitectura por capas.',
      en: 'Enterprise multi-tenant logistics system with per-client data isolation, offline resilience, intelligent storage algorithms, and layered architecture.',
    },
    contributions: {
      es: [
        'Diseñé la arquitectura backend multi-tenant (Onion Architecture) con FastAPI, PostgreSQL y aislamiento por tenant con migraciones Alembic.',
        'Desarrollé el motor de resiliencia y sincronización offline en frontend (React 19 + IndexedDB) con colas locales, reconciliación y claves de idempotencia.',
        'Co-diseñé el rediseño del Dashboard de Supervisor y Operaciones con Omnibox global, comparativas de actividad entre depósitos y seguimiento de métricas OTIF (SLA).',
        'Implementé motores de logística interna: sugerencia inteligente de Put Away (criterios ABC, volumen y zona) y cálculo automático de punto de reorden (ROP).',
        'Construí el catálogo de reportes conmutables (tarjetas vs tablas), navegación móvil con bottom bar y optimización de consultas reduciendo drásticamente roundtrips en PostgreSQL.',
      ],
      en: [
        'Designed backend multi-tenant architecture (Onion Architecture) with FastAPI, PostgreSQL, and per-tenant isolation managed via Alembic migrations.',
        'Developed frontend offline resilience engine (React 19 + IndexedDB) with local queues, conflict reconciliation, and transaction idempotency keys.',
        'Co-designed Supervisor Operations Dashboard redesign featuring global Omnibox search, multi-warehouse activity comparisons, and OTIF SLA fulfillment metrics.',
        'Implemented internal logistics engines: intelligent Put Away suggestions (ABC classification, volume, and zone rules) and automated Reorder Point (ROP) calculation.',
        'Built switchable reports catalog (cards vs tables), native mobile bottom-bar navigation, and PostgreSQL query optimizations drastically reducing database roundtrips.',
      ],
    },
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'React 19', 'TypeScript', 'IndexedDB'],
    roles: {
      es: ['Backend y Arquitectura', 'Frontend y Operaciones'],
      en: ['Backend & Architecture', 'Frontend & Operations'],
    },
    links: {},
  },
  {
    id: 'pochocleando',
    title: 'Pochocleando',
    type: 'group',
    status: 'completed',
    description: {
      es: 'Aplicación web de reseñas de películas y series integrada con la API multimedia de TMDB y asistente inteligente de IA.',
      en: 'Movie and TV show review web app integrated with TMDB multimedia API featuring an intelligent AI assistant.',
    },
    contributions: {
      es: [
        'Diseñé e implementé los esquemas de datos con MongoDB y Mongoose (usuarios, reseñas, listas de favoritos).',
        'Implementé la autenticación de usuarios y la gestión de sesiones en el backend con Node.js y Express.',
        'Desarrollé la interfaz de usuario con Angular y TypeScript consumiendo la API multimedia de TMDB.',
        'Participé en la integración de Pochi, el asistente de IA incorporado alimentado por Gemini API.',
      ],
      en: [
        'Designed and implemented MongoDB & Mongoose data schemas for users, reviews, and favorite lists.',
        'Implemented user authentication and session management on the backend using Node.js and Express.',
        'Developed the frontend user interface with Angular and TypeScript consuming TMDB multimedia API.',
        'Participated in integrating Pochi, the built-in AI assistant powered by Gemini API.',
      ],
    },
    stack: ['JavaScript', 'TypeScript', 'Angular', 'Node.js', 'Express', 'MongoDB', 'Gemini API'],
    roles: {
      es: ['Backend', 'Frontend', 'Integración de IA'],
      en: ['Backend', 'Frontend', 'AI Integration'],
    },
    links: {
      repo: 'https://github.com/Antonio-sharp-plus/Pochocleando',
    },
  },
  {
    id: 'pokeapp',
    title: 'PokeApp',
    type: 'group',
    status: 'completed',
    description: {
      es: 'Aplicación híbrida web/mobile integrada con PokeAPI, autenticación con Firebase y experiencia nativa.',
      en: 'Hybrid web/mobile application integrated with PokeAPI, featuring Firebase authentication and native experience.',
    },
    contributions: {
      es: [
        'Implementé la autenticación de usuarios utilizando Firebase Auth.',
        'Integré el consumo de la REST API externa (PokeAPI) para la consulta de información en tiempo real.',
        'Desarrollé la experiencia de usuario e interfaz híbrida (Web / Mobile) utilizando Ionic y Angular.',
      ],
      en: [
        'Implemented user authentication using Firebase Auth.',
        'Integrated external REST API (PokeAPI) consumption for real-time information retrieval.',
        'Developed hybrid (Web / Mobile) user interface and experience using Ionic and Angular.',
      ],
    },
    stack: ['TypeScript', 'Angular', 'Ionic', 'Firebase', 'HTML', 'CSS'],
    roles: {
      es: ['Frontend', 'Mobile', 'Integración de APIs'],
      en: ['Frontend', 'Mobile', 'API Integration'],
    },
    links: {
      repo: 'https://github.com/Juamp1Sch/Proyect-Pokedex',
    },
  },
];
