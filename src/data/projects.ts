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
        'Desarrollé Career Copilot (chatbot de orientación profesional) e implementé enrutamiento multi-proveedor de IA (Gemini 2.5 Flash como motor primario, soporte BYOK para OpenAI, Anthropic, Groq y OpenRouter con fallback automático).',
        'Implementé arquitectura privacy-first con perfiles anónimos, sanitización server-side de PII, URLs firmadas con expiración corta y cifrado de datos sensibles con AES-256-GCM.',
        'Configuré suite de pruebas unitarias (Vitest) y de extremo a extremo (Playwright) integradas en pipeline de CI/CD con GitHub Actions.',
      ],
      en: [
        'Led the end-to-end design and full-stack implementation of the dual-role platform and its guided workflow: CV Analysis → Job Match → Mock Interview.',
        'Developed Career Copilot (career assistance chatbot) and built multi-provider AI routing (Gemini 2.5 Flash as primary engine, BYOK support for OpenAI, Anthropic, Groq, OpenRouter with automatic fallback).',
        'Implemented a privacy-first architecture with anonymous profiles, server-side PII sanitization, short-lived signed URLs, and AES-256-GCM sensitive data encryption.',
        'Configured unit (Vitest) and end-to-end (Playwright) test suites integrated into CI/CD pipelines via GitHub Actions.',
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
      es: 'Sistema logístico empresarial multi-tenant en desarrollo comercial con aislamiento de datos por cliente, resiliencia offline y arquitectura por capas.',
      en: 'Enterprise multi-tenant logistics system currently under commercial development with client-level data isolation, offline resilience, and layered architecture.',
    },
    contributions: {
      es: [
        'Diseñé la arquitectura backend multi-tenant con aislamiento de datos por cliente a nivel de base de datos y modelado relacional gestionado con Alembic.',
        'Diseñé e implementé la arquitectura por capas (Onion Architecture) del backend y optimicé consultas complejas con SQLAlchemy.',
        'Desarrollé el motor de resiliencia y sincronización offline en el frontend (React 19 + IndexedDB) con cola de peticiones locales y reconciliación de conflictos.',
        'Diseñé e implementé el flujo de partial pick fulfillment con creación de tareas residuales en la misma orden e idempotency keys en transacciones de stock.',
        'Construí el módulo de notificaciones de alto valor WMS (5 alertas RBAC) y el sistema de reporte de incidencias.',
      ],
      en: [
        'Designed the multi-tenant backend architecture with client-level data isolation and relational data modeling managed via Alembic.',
        'Designed and implemented the backend layered architecture (Onion Architecture) and optimized complex queries using SQLAlchemy.',
        'Developed the frontend offline resilience and synchronization engine (React 19 + IndexedDB) featuring local request queues and conflict reconciliation.',
        'Designed and implemented the partial pick fulfillment workflow with residual task creation within the same order and idempotency keys on stock transactions.',
        'Built the high-value WMS notifications module (5 RBAC alert types) and the incident reporting system.',
      ],
    },
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'React 19', 'TypeScript', 'IndexedDB', 'SQLite'],
    roles: {
      es: ['Backend & Arquitectura', 'Frontend'],
      en: ['Backend & Architecture', 'Frontend'],
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
