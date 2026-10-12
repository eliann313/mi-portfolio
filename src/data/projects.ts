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
    id: 'gridhub-wms',
    title: 'GridHub WMS',
    type: 'group',
    status: 'in-progress',
    description: {
      es: 'Sistema logístico empresarial multi-tenant con aislamiento de datos por cliente, Screaming Architecture por dominios, resiliencia offline y motores inteligentes de almacenamiento.',
      en: 'Enterprise multi-tenant logistics system with per-client data isolation, domain-driven Screaming Architecture, offline resilience, and intelligent storage engines.',
    },
    contributions: {
      es: [
        'Diseñé la Screaming Architecture orientada a 8 dominios funcionales cohesivos en backend (FastAPI/SQLModel con organización simétrica, 142 DTOs, servicios OOP puros y thin routers) y frontend modular en React 19, con +90% de cobertura (745+ tests Pytest y Vitest).',
        'Desarrollé el motor de resiliencia y sincronización offline-first en frontend (React 19 + IndexedDB) con cola local de mutaciones, reconciliación automática de conflictos y claves de idempotencia para operabilidad sin conexión en depósitos.',
        'Diseñé la API de integración B2B para sistemas ERP externos con catálogo dinámico y patrón Transactional Outbox para despacho asíncrono y fiable de eventos logísticos sin pérdida de mensajes.',
        'Implementé los motores algorítmicos de logística interna: asignación inteligente de almacenamiento (Put Away por rotación ABC, zona y volumen) y cálculo automático de reabastecimiento por punto de reorden (ROP) y reglas min/max.',
        'Optimicé la capa de datos en PostgreSQL para entornos multi-tenant de alta carga, eliminando consultas N+1, diseñando índices parciales por cliente y consolidando el pipeline automatizado de consistencia de migraciones con Alembic.',
      ],
      en: [
        'Architected full-stack Screaming Architecture structured into 8 cohesive functional domains on backend (FastAPI/SQLModel with symmetric organization, 142 DTOs, pure OOP services, and thin routers) and modular React 19 frontend, achieving +90% test coverage (745+ Pytest & Vitest tests).',
        'Engineered frontend offline-first synchronization and resilience engine (React 19 + IndexedDB) with local mutation queues, conflict reconciliation, and transaction idempotency keys for uninterrupted warehouse operations.',
        'Designed B2B ERP integration API with configurable catalogs and Transactional Outbox pattern for reliable, asynchronous logistics event dispatch with zero message loss.',
        'Implemented internal algorithmic logistics engines: intelligent storage allocation (Put Away based on ABC velocity, zone, and capacity) and automated Reorder Point (ROP) replenishment under min/max inventory rules.',
        'Optimized PostgreSQL data layer for high-throughput multi-tenant workloads by eliminating N+1 queries, designing tenant-scoped partial indexes, and automating migration health pipelines with Alembic.',
      ],
    },
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'React 19', 'TypeScript', 'IndexedDB', 'Pytest', 'Vitest'],
    roles: {
      es: ['Backend, Frontend y Arquitectura'],
      en: ['Backend, Frontend & Architecture'],
    },
    links: {},
  },
  {
    id: 'dataforge',
    title: 'DataForge',
    type: 'individual',
    status: 'in-progress',
    description: {
      es: 'Plataforma de análisis de datos autoservicio y local-first, que combina motores en el cliente (DuckDB-Wasm, Pyodide para Python científico y Rust) con plantillas especializadas (Análisis libre, Finanzas en ARS/USD, Ventas y Encuestas).',
      en: 'Local-first self-service data analytics platform combining client-side engines (DuckDB-Wasm, Pyodide for scientific Python, and Rust) with specialized templates (Free analysis, Personal finances in ARS/USD, Sales, and Surveys).',
    },
    contributions: {
      es: [
        'Diseñé la arquitectura local-first del monolito modular cliente, desacoplando la UI (Next.js 16) del cómputo analítico mediante Web Workers aislados.',
        'Diseñé la orquestación multi-engine en el navegador: DuckDB-Wasm como motor SQL/tabular columnar primario, Pyodide (Python, NumPy, SciPy) para modelos estadísticos/forecasting y Rust/Wasm para algoritmos de alta intensidad (DTW).',
        'Modelé plantillas de dominio reutilizables: Análisis Libre, Finanzas Personales (registro manual y bancario en ARS/USD con cotizaciones oficial/MEP/CCL), Ventas y Encuestas, preservando el linaje de datos.',
        'Construí parsers de ingesta para CSV y XLSX en Web Worker con inferencia de esquemas, cálculo de agregaciones y preview paginado (100k filas en 867 ms con 0 long tasks en UI).',
        'Implementé el dominio de proyectos con casos de uso puros, persistencia local transaccional (IndexedDB + OPFS), harness de benchmarks locales y suites de prueba (Vitest y Playwright).',
      ],
      en: [
        'Architected the local-first modular client-side architecture decoupling static UI (Next.js 16) from analytical computing using isolated Web Workers.',
        'Designed client-side multi-engine orchestration: DuckDB-Wasm as primary columnar SQL engine, Pyodide (Python, NumPy, SciPy) for statistical models/forecasting, and Rust/Wasm for compute-heavy algorithms (DTW).',
        'Modeled reusable domain templates: Free Analysis, Personal Finance (manual & bank ledger in ARS/USD with official/MEP/CCL rates), Sales, and Surveys, strictly preserving data lineage.',
        'Built off-main-thread CSV and XLSX ingestion parsers in Web Workers with schema inference, aggregate calculations, and paginated previews (100k rows in 867 ms with 0 UI long tasks).',
        'Implemented the projects domain with pure use cases, transactional local persistence (IndexedDB + OPFS), local benchmark harness, and comprehensive test suites (Vitest & Playwright).',
      ],
    },
    stack: ['Next.js 16', 'TypeScript', 'DuckDB-Wasm', 'Python (Pyodide)', 'Rust (Wasm)', 'Web Workers', 'IndexedDB', 'Tailwind CSS', 'Vitest', 'Playwright'],
    roles: {
      es: ['Creador', 'Arquitecto de Software', 'Desarrollador Full Stack'],
      en: ['Creator', 'Software Architect', 'Full Stack Developer'],
    },
    links: {
      demo: 'https://data-forge-analysis.vercel.app',
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
