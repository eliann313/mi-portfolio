import type { CaseStudy } from '../types';

export const caseStudies: Record<string, CaseStudy> = {
  skillradar: {
    id: 'skillradar',
    projectTitle: 'SkillRadar',
    badge: {
      es: 'Flagship SaaS · Dual-Role Privacy-First',
      en: 'Flagship SaaS · Dual-Role Privacy-First',
    },
    subtitle: {
      es: 'Plataforma SaaS para optimización de CV, emparejamiento laboral y entrevistas simuladas asistidas por IA con arquitectura privacy-first y enrutamiento multi-proveedor.',
      en: 'SaaS platform for CV optimization, job matching, and AI-assisted mock interviews built with privacy-first architecture and multi-provider AI routing.',
    },
    overview: {
      es: 'SkillRadar es un producto SaaS integral diseñado para transformar la conexión entre desarrolladores y reclutadores técnicos. Permite a los candidatos optimizar su CV para sistemas ATS, evaluar la compatibilidad con vacantes laborales reales, practicar entrevistas con simuladores adaptativos de IA y ser descubiertos de forma anónima en un Talent Pool mediante emparejamiento doble ciego.',
      en: 'SkillRadar is a comprehensive SaaS platform designed to transform how technical candidates and recruiters connect. It enables developers to optimize their CVs for ATS engines, assess compatibility against real job descriptions, practice interviews with adaptive AI simulators, and get discovered anonymously via double-blind matching.',
    },
    architectureHighlights: {
      es: [
        'Enrutamiento de IA Multi-Proveedor (Google Gemini como motor primario, soporte BYOK para OpenAI, Anthropic Claude, Groq y OpenRouter con fallback automático).',
        'Cifrado de claves de API personales del lado del servidor utilizando AES-256-GCM y exención de rate-limiting (Upstash Redis).',
        'Sistema de privacidad Doble Ciego: sanitización server-side de PII (información personal identificable) y URLs firmadas de expiración corta.',
        'Pruebas automatizadas unitarias con Vitest y suites de extremo a extremo (E2E) con Playwright integradas en CI/CD mediante GitHub Actions.',
        'Persistencia relacional escalable con Prisma ORM y PostgreSQL serverless en Neon.',
      ],
      en: [
        'Multi-Provider AI Routing (Google Gemini as primary system engine, BYOK support for OpenAI, Anthropic Claude, Groq, OpenRouter with automatic fallback).',
        'Server-side encryption of user API keys using AES-256-GCM with rate-limiting bypass via Upstash Redis.',
        'Double-Blind Privacy System: server-side PII sanitization and short-lived signed URLs for candidate safety.',
        'Automated testing suite with Vitest unit tests and Playwright E2E testing integrated into GitHub Actions CI/CD.',
        'Scalable relational persistence with Prisma ORM and serverless PostgreSQL on Neon.',
      ],
    },
    myRoleDetailed: {
      es: [
        'Creador único y desarrollador full-stack del proyecto, asumiendo el diseño de arquitectura backend, modelado relacional y frontend.',
        'Diseñé el motor de cálculo ATS y el algoritmo de análisis semántico de verbos de impacto.',
        'Implementé el chatbot Career Copilot y el simulador de entrevistas con 3 niveles de exigencia (Estándar, Presión y Reclutador).',
        'Construí la suite de reclutamiento con Reverse Job-Matching e interfaz de sourcing semántico.',
      ],
      en: [
        'Sole creator and full-stack developer, designing the backend architecture, relational modeling, and UI.',
        'Designed the ATS scoring engine and semantic impact verb analysis algorithm.',
        'Implemented Career Copilot chatbot and 3-mode interview simulator (Standard, Pressure, Recruiter).',
        'Built the recruiter suite featuring Reverse Job-Matching and semantic sourcing interface.',
      ],
    },
    technicalChallenges: {
      es: [
        {
          problem: 'Garantizar privacidad absoluta del candidato (Doble Ciego) sin romper la capacidad de búsqueda de los reclutadores.',
          solution: 'Implementé sanitización server-side que remueve PII antes de almacenar el perfil en el Talent Pool público. La identidad del candidato solo se revela mediante firma criptográfica cuando el candidato acepta la solicitud de contacto.',
        },
        {
          problem: 'Gestionar fallos de disponibilidad o límites de cuotas de proveedores de IA de forma transparente para el usuario.',
          solution: 'Diseñé una canalización de enrutamiento resiliente impulsada por Vercel AI SDK que conmuta automáticamente entre Google Gemini, Groq y OpenRouter si el motor principal agota su cuota.',
        },
      ],
      en: [
        {
          problem: 'Guaranteeing complete candidate privacy (Double Blind) without hindering recruiter search capabilities.',
          solution: 'Implemented server-side sanitization stripping PII before storing candidate profiles in the public Talent Pool. Identities are revealed via cryptographic signature only after candidate acceptance.',
        },
        {
          problem: 'Handling AI provider outages or quota limits transparently for users.',
          solution: 'Designed a resilient routing pipeline using Vercel AI SDK that automatically fails over between Google Gemini, Groq, and OpenRouter if the primary engine exhausts quota.',
        },
      ],
    },
    c4Diagram: {
      title: {
        es: 'Diagrama de Arquitectura de Sistema (SkillRadar)',
        en: 'System Architecture Diagram (SkillRadar)',
      },
      nodes: [
        { id: 'client', label: 'Next.js 16 App Router', desc: 'React Server Components + Client Hooks + Tailwind CSS', type: 'client' },
        { id: 'auth', label: 'Auth.js v5 + AES-256', desc: 'Sesiones JWT, cifrado de claves API y sanitización PII', type: 'api' },
        { id: 'ai', label: 'Vercel AI SDK Engine', desc: 'Enrutamiento Multi-LLM (Gemini, OpenAI, Anthropic, Groq)', type: 'service' },
        { id: 'db', label: 'Prisma + Neon Postgres', desc: 'Persistencia de usuarios, análisis ATS, CVs y Talent Pool', type: 'db' },
      ],
      connections: [
        { from: 'client', to: 'auth', label: 'HTTPS REST / Server Actions' },
        { from: 'auth', to: 'ai', label: 'Inferencia LLM (BYOK / Fallback)' },
        { from: 'auth', to: 'db', label: 'Prisma ORM Queries' },
      ],
    },
  },

  'gridhub-wms': {
    id: 'gridhub-wms',
    projectTitle: 'GridHub WMS',
    badge: {
      es: 'Startup Logistics · Multi-Tenant Enterprise System',
      en: 'Startup Logistics · Multi-Tenant Enterprise System',
    },
    subtitle: {
      es: 'Sistema logístico empresarial multi-tenant con aislamiento de datos por cliente, resiliencia offline y arquitectura por capas.',
      en: 'Enterprise multi-tenant logistics management system with per-client data isolation, offline resilience, and layered architecture.',
    },
    overview: {
      es: 'GridHub WMS es una plataforma logística de grado empresarial diseñada para la gestión integral de depósitos, inventarios y distribución. Fue concebida con arquitectura multi-tenant para atender a múltiples clientes manteniendo estricto aislamiento de datos, soporte para operabilidad en áreas sin conectividad (offline-first) y control de ejecuciones mediante claves de idempotencia.',
      en: 'GridHub WMS is an enterprise-grade logistics platform designed for comprehensive warehouse, inventory, and fulfillment management. Built with a multi-tenant architecture to serve distinct clients with strict database isolation, offline-first execution queues, and transaction idempotency keys.',
    },
    architectureHighlights: {
      es: [
        'Arquitectura por capas backend (Onion Architecture) implementada con FastAPI, desacoplando dominio, servicios e infraestructura.',
        'Aislamiento multi-tenant estricto con PostgreSQL/SQLAlchemy y migraciones versionadas con Alembic.',
        'Sincronización offline-first en el frontend (React 19 + IndexedDB) con cola de peticiones locales y algoritmo de reconciliación de conflictos.',
        'Flujo de partial pick fulfillment con creación de tareas residuales en la misma orden e idempotency keys en StockMovement y Task.',
        'Módulo de notificaciones de alto valor con control de acceso basado en roles (5 alertas RBAC) y consolidación de expiraciones.',
      ],
      en: [
        'Backend Onion Architecture implemented with FastAPI, decoupling domain logic, application services, and infrastructure.',
        'Strict multi-tenant isolation with PostgreSQL/SQLAlchemy and versioned database migrations with Alembic.',
        'Offline-first synchronization engine in the frontend (React 19 + IndexedDB) featuring local request queues and conflict resolution algorithms.',
        'Partial pick fulfillment workflow with residual task creation and idempotency keys on StockMovement and Task transactions.',
        'High-value notification module with role-based access control (5 RBAC alert types) and batch expiration consolidation.',
      ],
    },
    myRoleDetailed: {
      es: [
        'Co-diseñador de la arquitectura backend multi-tenant y modelado relacional de datos.',
        'Líder del desarrollo del módulo de notificaciones de alto valor WMS y reporte de incidencias con resiliencia offline.',
        'Diseñé e implementé el flujo de cumplimiento parcial de picking (partial pick fulfillment) y claves de idempotencia.',
        'Implementé el motor de sincronización offline con IndexedDB en el frontend y modularización por características (Feature-based).',
      ],
      en: [
        'Co-designer of the multi-tenant backend architecture and relational data modeling.',
        'Lead developer of high-value WMS notifications and offline-resilient incident reporting.',
        'Designed and implemented partial pick fulfillment flows and transaction idempotency keys.',
        'Built the frontend offline sync engine with IndexedDB and feature-based module architecture.',
      ],
    },
    technicalChallenges: {
      es: [
        {
          problem: 'Permitir que los operadores de depósito registren movimientos de stock en zonas sin cobertura de internet sin perder consistencia.',
          solution: 'Diseñé una cola de transacciones locales en IndexedDB que intercepta las peticiones y las procesa secuencialmente al restablecer la conexión, usando claves de idempotencia para evitar duplicaciones.',
        },
        {
          problem: 'Garantizar el aislamiento absoluto entre tenants (clientes empresariales) a nivel de consultas y migraciones.',
          solution: 'Establecí middleware de contexto de tenant en FastAPI que inyecta automáticamente los filtros de tenant en la sesión de SQLAlchemy, asegurando que ninguna consulta pueda acceder a datos de otro cliente.',
        },
      ],
      en: [
        {
          problem: 'Allowing warehouse operators to record stock movements offline without losing data consistency.',
          solution: 'Designed an IndexedDB local transaction queue intercepting requests and processing them sequentially upon reconnection, backed by transaction idempotency keys.',
        },
        {
          problem: 'Ensuring absolute isolation between enterprise tenants at the query and migration level.',
          solution: 'Established tenant context middleware in FastAPI automatically injecting tenant filters into SQLAlchemy sessions.',
        },
      ],
    },
    c4Diagram: {
      title: {
        es: 'Diagrama de Arquitectura de Capas & Multi-Tenant (GridHub WMS)',
        en: 'Layered & Multi-Tenant Architecture Diagram (GridHub WMS)',
      },
      nodes: [
        { id: 'ui', label: 'React 19 Feature-Based Frontend', desc: 'IndexedDB Offline Queue + Lazy Loading', type: 'client' },
        { id: 'onion', label: 'FastAPI (Onion Architecture)', desc: 'Domain Entities -> Application Services -> Infrastructure', type: 'api' },
        { id: 'tenant', label: 'Tenant Context Middleware', desc: 'Inyección automática de aislamiento por cliente & RBAC', type: 'service' },
        { id: 'db', label: 'PostgreSQL / Alembic ORM', desc: 'Bases relacionales aisladas y migraciones versionadas', type: 'db' },
      ],
      connections: [
        { from: 'ui', to: 'onion', label: 'REST API / Idempotency Headers' },
        { from: 'onion', to: 'tenant', label: 'Verificación RBAC & Session Context' },
        { from: 'tenant', to: 'db', label: 'SQLAlchemy Scoped Queries' },
      ],
    },
  },

  pochocleando: {
    id: 'pochocleando',
    projectTitle: 'Pochocleando',
    badge: {
      es: 'Multimedia App · AI Assistant & TMDB API',
      en: 'Multimedia App · AI Assistant & TMDB API',
    },
    subtitle: {
      es: 'Aplicación web de reseñas de películas y series integrada con la API multimedia de TMDB y asistente inteligente de IA.',
      en: 'Movie and TV show review web application integrated with TMDB multimedia API featuring an intelligent AI assistant.',
    },
    overview: {
      es: 'Pochocleando es una plataforma web desarrollada para la exploración, calificación y recomendación de contenido audiovisual. Integra la API de TMDB para obtener información actualizada sobre películas y series, disponibilidad en plataformas de streaming en Argentina y un asistente inteligente (Pochi) impulsado por Gemini API.',
      en: 'Pochocleando is a web platform built for searching, reviewing, and getting personalized movie and series recommendations. It integrates TMDB API for streaming platform availability in Argentina and features a built-in AI assistant (Pochi) powered by Gemini API.',
    },
    architectureHighlights: {
      es: [
        'Backend desarrollado en Node.js y Express con esquemas de datos modelados en MongoDB y Mongoose.',
        'Integración con TMDB REST API para catálogo multimedia y disponibilidad en servicios de streaming (HBO Max, Netflix, etc.).',
        'Asistente conversacional de recomendación (Pochi) alimentado por Gemini API.',
        'Frontend SPA desarrollado con Angular y TypeScript.',
      ],
      en: [
        'Backend built with Node.js and Express featuring data schemas modeled in MongoDB & Mongoose.',
        'Integration with TMDB REST API for multimedia catalog and streaming platform availability (HBO Max, Netflix, etc.).',
        'Conversational recommendation assistant (Pochi) powered by Gemini API.',
        'SPA Frontend developed with Angular and TypeScript.',
      ],
    },
    myRoleDetailed: {
      es: [
        'Diseñé e implementé los esquemas de datos con MongoDB y Mongoose para usuarios, reseñas y listas de favoritos.',
        'Desarrollé la autenticación de usuarios y la gestión de sesiones de backend.',
        'Construí componentes de UI en Angular e integré las consultas de la API de TMDB.',
        'Participé en la integración del asistente de IA Pochi (Gemini API).',
      ],
      en: [
        'Designed and implemented MongoDB & Mongoose data schemas for users, reviews, and favorite lists.',
        'Developed backend user authentication and session management.',
        'Built Angular UI components and integrated TMDB API endpoints.',
        'Participated in integrating Pochi AI recommendation assistant (Gemini API).',
      ],
    },
    technicalChallenges: {
      es: [
        {
          problem: 'Consolidar datos heterogéneos de TMDB API con la base de datos interna de reseñas y favoritos sin penalizar los tiempos de respuesta.',
          solution: 'Modelé colecciones optimizadas en MongoDB agregando índices compuestos por tmdb_id y user_id, reduciendo la latencia de consulta.',
        },
      ],
      en: [
        {
          problem: 'Consolidating heterogeneous data from TMDB API with internal review & favorite databases.',
          solution: 'Modeled optimized MongoDB collections with compound indexes on tmdb_id and user_id, reducing query latency.',
        },
      ],
    },
    videoData: {
      src: '/Demo Pochocleando.mp4',
      timestamps: [
        {
          seconds: 0,
          timeLabel: '0:00',
          title: { es: 'Inicio & Grilla Multimedia', en: 'Home & Multimedia Grid' },
          description: { es: 'Exploración del catálogo de películas y series populares.', en: 'Browsing trending movies and TV show catalogs.' },
        },
        {
          seconds: 52,
          timeLabel: '0:52',
          title: { es: 'Asistente Pochi Bot en Acción', en: 'Pochi Bot Assistant in Action' },
          description: { es: 'Demostración del recomendador con Pochi Bot (Gemini API).', en: 'Live movie recommendations with Pochi Bot (Gemini API).' },
        },
        {
          seconds: 140,
          timeLabel: '2:20',
          title: { es: 'Buscador & Disponibilidad Streaming', en: 'Search & Streaming Availability' },
          description: { es: 'Filtro en tiempo real y proveedores donde ver el contenido (HBO Max).', en: 'Live filtering and streaming availability in Argentina.' },
        },
        {
          seconds: 255,
          timeLabel: '4:15',
          title: { es: 'Perfil, Favoritos & Créditos IFTS 11', en: 'Profile, Favorites & IFTS 11 Credits' },
          description: { es: 'Gestión de listas personales de usuario y footer del proyecto.', en: 'User personal lists and academic project presentation footer.' },
        },
      ],
    },
  },

  pokeapp: {
    id: 'pokeapp',
    projectTitle: 'PokeApp',
    badge: {
      es: 'Hybrid Web/Mobile App · PokeAPI & Firebase Auth',
      en: 'Hybrid Web/Mobile App · PokeAPI & Firebase Auth',
    },
    subtitle: {
      es: 'Aplicación híbrida web y móvil integrada con PokeAPI, autenticación Firebase y customización de avatares.',
      en: 'Hybrid web and mobile application integrated with PokeAPI, featuring Firebase authentication and avatar customization.',
    },
    overview: {
      es: 'PokeApp es una aplicación híbrida web/mobile desarrollada con Ionic y Angular. Proporciona una experiencia nativa móvil para buscar Pokémon, consultar estadísticas de combate, calcular debilidades de tipo, personalizar fichas de entrenador con avatares de sprites clásicos y gestionar favoritos respaldados en Firebase Auth.',
      en: 'PokeApp is a hybrid web/mobile application built with Ionic and Angular. It delivers a native mobile experience for searching Pokémon, analyzing battle stats, calculating type weaknesses, customizing trainer profiles with classic sprite avatars, and managing favorites backed by Firebase Auth.',
    },
    architectureHighlights: {
      es: [
        'Interfaz de usuario híbrida web y mobile desarrollada con Ionic Framework y Angular.',
        'Autenticación de usuarios segura y almacenamiento con Firebase Auth.',
        'Consumo e integración de PokeAPI REST en tiempo real con calculador de debilidades.',
        'Módulo de personalización de perfil de entrenador con selector de sprites.',
      ],
      en: [
        'Hybrid web/mobile UI built with Ionic Framework and Angular.',
        'Secure user authentication and state management via Firebase Auth.',
        'Real-time PokeAPI REST consumption with base stat and weakness calculators.',
        'Trainer profile customization module featuring classic sprite selection.',
      ],
    },
    myRoleDetailed: {
      es: [
        'Implementé la autenticación de usuarios utilizando Firebase Auth.',
        'Integré el consumo de PokeAPI REST para la visualización de estadísticas y tipos.',
        'Desarrollé la interfaz híbrida en Ionic y Angular.',
      ],
      en: [
        'Implemented user authentication using Firebase Auth.',
        'Integrated PokeAPI REST endpoints for stats and type weakness retrieval.',
        'Developed hybrid mobile UI components using Ionic and Angular.',
      ],
    },
    technicalChallenges: {
      es: [
        {
          problem: 'Mantener un rendimiento fluido de renderizado de sprites y listas dinámicas en dispositivos móviles con recursos limitados.',
          solution: 'Apliqué lazy loading de componentes en Angular y almacenamiento en caché local de imágenes de PokeAPI, logrando animaciones suaves a 60 FPS.',
        },
      ],
      en: [
        {
          problem: 'Maintaining smooth rendering performance for mobile devices with resource constraints.',
          solution: 'Applied Angular lazy loading and local caching for PokeAPI images achieving 60 FPS animations.',
        },
      ],
    },
  },
};
