import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'skillradar',
    title: 'SkillRadar',
    type: 'individual',
    status: 'completed',
    description: {
      es: 'Plataforma dual-role (developer/recruiter) enfocada en la privacidad, con flujo narrativo integrado de análisis de CV, emparejamiento laboral y entrevistas simuladas asistidas por IA.',
      en: 'Privacy-first, dual-role (developer/recruiter) platform featuring an integrated narrative flow of CV analysis, job matching, and AI-assisted mock interviews.',
    },
    contributions: {
      es: [
        'Creador del proyecto, liderando el diseño completo y la implementación de la plataforma.',
        'Diseño e implementación del flujo narrativo guiado: CV Analysis → Job Match → Mock Interview.',
        'Desarrollo de Career Copilot, un chatbot inteligente con comportamiento y acceso adaptado según el rol de recruiter o developer.',
        'Implementación de enrutamiento de IA multi-provider (Gemini 2.5 Flash como motor primario del sistema y soporte BYOK para OpenAI, Anthropic Claude, Groq y OpenRouter con fallback automático en cascada).',
        'Configuración de pruebas de extremo a extremo (E2E) con Playwright e integración de CI/CD con GitHub Actions.',
        'Arquitectura privacy-first con perfiles de candidatos completamente anónimos para garantizar privacidad.'
      ],
      en: [
        'Project creator, leading the overall design and full-stack implementation of the platform.',
        'Designed and implemented the integrated narrative flow: CV Analysis → Job Match → Mock Interview.',
        'Developed Career Copilot, an intelligent chatbot with behavior and access tailored to recruiter and developer roles.',
        'Implemented multi-provider AI routing (Gemini 2.5 Flash as primary system engine, and BYOK support for OpenAI, Anthropic Claude, Groq, and OpenRouter with automatic cascading fallback).',
        'Configured end-to-end (E2E) testing with Playwright and integrated CI/CD workflows using GitHub Actions.',
        'Privacy-first architecture featuring completely anonymous candidate profiles to guarantee user privacy.'
      ]
    },
    stack: ['Next.js', 'TypeScript', 'Prisma', 'Neon', 'Tailwind CSS', 'Playwright', 'GitHub Actions'],
    roles: {
      es: ['Creador', 'Arquitecto de Software', 'Desarrollador Full Stack'],
      en: ['Creator', 'Software Architect', 'Full Stack Developer']
    },
    links: {
      demo: 'https://skillradar-app.vercel.app',
      repo: 'https://github.com/eliann313/SkillRadar'
    }
  },
  {
    id: 'gridhub-wms',
    title: 'GridHub WMS',
    type: 'group',
    status: 'in-progress',
    description: {
      es: 'Sistema multi-tenant de gestión logística empresarial con aislamiento de datos por cliente y arquitectura por capas.',
      en: 'Multi-tenant enterprise logistics management system with per-client data isolation and layered architecture.',
    },
    contributions: {
      es: [
        'Diseño de arquitectura backend multi-tenant con aislamiento de datos por cliente y modelo relacional con Alembic.',
        'Diseño e implementación del módulo de Notificaciones de Alto Valor WMS (5 alertas RBAC, consolidación de expiraciones en lote) y sistema de Reporte de Incidencias con resiliencia offline (IndexedDB).',
        'Diseño e implementación del flujo de partial pick fulfillment: creación de tareas residuales en la misma orden, from_location_id nullable, soporte de available_quantity negativo e idempotency keys en Task y StockMovement.',
        'Diseño e implementación del sistema de sincronización offline con cola de peticiones local (IndexedDB) y reconciliación de conflictos.',
        'Diseño e implementación de la modularización del frontend (React 19) basada en Feature-based architecture y lazy loading.',
        'Definición de arquitectura por capas (Onion Architecture) del backend y optimización de consultas complejas con SQLAlchemy.'
      ],
      en: [
        'Designed multi-tenant backend architecture with per-client data isolation and relational data modeling with Alembic.',
        'Designed and implemented the high-value WMS Notifications module (5 RBAC alert types, batch expiration consolidation) and Incident Reporting system with offline resilience (IndexedDB).',
        'Designed and implemented the partial pick fulfillment flow: residual task creation within the same order, nullable from_location_id, negative available_quantity support, and idempotency keys in Task and StockMovement.',
        'Designed and implemented the offline synchronization system using local request queues (IndexedDB) and conflict reconciliation.',
        'Designed and implemented the frontend modularization (React 19) using Feature-based architecture and lazy loading.',
        'Defined backend layered architecture (Onion Architecture) and optimized complex queries using SQLAlchemy.'
      ],
    },
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'React 19', 'TypeScript', 'IndexedDB', 'SQLite'],
    roles: {
      es: ['Backend', 'Arquitectura', 'Frontend'],
      en: ['Backend & Architecture', 'Frontend'],
    },
    links: {
      repo: '#',
    },
  },
  {
    id: 'pochocleando',
    title: 'Pochocleando',
    type: 'group',
    status: 'completed',
    description: {
      es: 'Aplicación web de reseñas de películas y series integrada con TMDB API, con asistente de IA incorporado.',
      en: 'Movie and TV show review web app integrated with TMDB API, featuring a built-in AI assistant.',
    },
    contributions: {
      es: [
        'Diseño e implementación de esquemas de datos con MongoDB y Mongoose (usuarios, reseñas, favoritos)',
        'Implementación de autenticación y gestión de sesiones de usuario',
        'Desarrollo frontend con Angular y TypeScript',
        'Participación en Pochi, asistente de IA integrado usando Gemini Flash 2.5 API',
        'Integración con TMDB API para datos de contenido multimedia',
      ],
      en: [
        'Designed and implemented data schemas with MongoDB and Mongoose (users, reviews, favorites)',
        'Implemented authentication and user session management',
        'Frontend development with Angular and TypeScript',
        'Participated in Pochi, an integrated AI assistant using Gemini Flash 2.5 API',
        'Integrated with TMDB API for multimedia content data',
      ],
    },
    stack: ['JavaScript', 'TypeScript', 'Angular', 'Node.js', 'Express', 'MongoDB', 'Gemini API'],
    roles: {
      es: ['Backend', 'Frontend', 'Integración de IA'],
      en: ['Backend', 'Frontend', 'AI Integration'],
    },
    links: {
      demo: 'https://pochocleando.com',
    },
  },
  {
    id: 'pokeapp',
    title: 'PokeApp',
    type: 'group',
    status: 'completed',
    description: {
      es: 'Aplicación híbrida web/mobile integrada con PokeAPI, con autenticación Firebase y experiencia nativa en móvil.',
      en: 'Hybrid web/mobile application integrated with PokeAPI, featuring Firebase authentication and native mobile experience.',
    },
    contributions: {
      es: [
        'Implementación de autenticación con Firebase',
        'Consumo e integración de API externa (PokeAPI)',
        'Desarrollo de interfaz híbrida con Ionic y Angular',
        'Diseño de la experiencia de usuario para plataformas web y mobile',
      ],
      en: [
        'Implemented authentication with Firebase',
        'Consumed and integrated external API (PokeAPI)',
        'Developed hybrid interface with Ionic and Angular',
        'Designed user experience for web and mobile platforms',
      ],
    },
    stack: ['TypeScript', 'Angular', 'Ionic', 'Firebase', 'HTML', 'CSS'],
    roles: {
      es: ['Frontend', 'Mobile', 'Integración de APIs'],
      en: ['Frontend', 'Mobile', 'API Integration'],
    },
    links: {
      repo: '#', // TODO: agregar URL de repo
    },
  },
];
