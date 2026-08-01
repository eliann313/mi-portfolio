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
    screenshots: [
      {
        url: '/projects/skillradar/1.png',
        title: { es: 'Dashboard & Contacto Doble Ciego', en: 'Dashboard & Double-Blind Contact' },
        caption: { es: 'Solicitudes de reclutadores con perfil anónimo y aceptación condicional.', en: 'Recruiter requests with anonymous profiles and conditional acceptance.' },
      },
      {
        url: '/projects/skillradar/2.png',
        title: { es: 'Métricas & Score ATS (100/100)', en: 'ATS Score & Metrics Dashboard' },
        caption: { es: 'Analizador de puntuación ATS, afinidad de empleo y límites de cuota.', en: 'ATS score analyzer, job match affinity, and monthly quota limits.' },
      },
      {
        url: '/projects/skillradar/3.png',
        title: { es: 'Simulador de Entrevistas Asistidas por IA', en: 'AI Interview Simulator' },
        caption: { es: 'Práctica interactiva en 3 modos: Estándar, Presión y Reclutador.', en: 'Interactive practice in 3 modes: Standard, Pressure, and Recruiter.' },
      },
      {
        url: '/projects/skillradar/4.png',
        title: { es: 'Career Copilot Conversacional', en: 'Career Copilot AI Chatbot' },
        caption: { es: 'Chatbot de orientación profesional con selector de modelo LLM.', en: 'Career guidance chatbot featuring LLM model selection.' },
      },
      {
        url: '/projects/skillradar/5.png',
        title: { es: 'Auditoría & Análisis de GitHub', en: 'GitHub Profile & Code Auditor' },
        caption: { es: 'Evaluación automatizada de fortalezas, áreas de mejora y lenguajes.', en: 'Automated evaluation of strengths, opportunities, and languages.' },
      },
      {
        url: '/projects/skillradar/6.png',
        title: { es: 'Creador de CV & Previsualizador ATS A4', en: 'CV Builder & ATS A4 Preview' },
        caption: { es: 'Editor estructurado de currículum con análisis de verbos de impacto.', en: 'Structured resume editor with impact verb evaluation.' },
      },
      {
        url: '/projects/skillradar/7.png',
        title: { es: 'Auditor de Perfil de LinkedIn', en: 'LinkedIn Profile Auditor' },
        caption: { es: 'Evaluación de SEO y visibilidad para reclutadores técnicos.', en: 'SEO and recruiter visibility evaluation for LinkedIn profiles.' },
      },
      {
        url: '/projects/skillradar/8.png',
        title: { es: 'Talent Pool & Búsqueda Semántica', en: 'Talent Pool & Semantic Sourcing' },
        caption: { es: 'Herramienta de Reverse Job-Matching e IA sourcing para reclutadores.', en: 'Reverse Job-Matching tool and AI sourcing suite for recruiters.' },
      },
      {
        url: '/projects/skillradar/9.png',
        title: { es: 'Gestión de Vacantes de Empleo', en: 'Recruiter Jobs Dashboard' },
        caption: { es: 'Panel para la publicación y administración de ofertas laborales.', en: 'Dashboard for creating and managing technical job postings.' },
      },
      {
        url: '/projects/skillradar/10.png',
        title: { es: 'Configuración de IA & BYOK (Cifrado AES-256)', en: 'AI BYOK Configuration (AES-256 Encryption)' },
        caption: { es: 'Almacenamiento seguro de API keys personales y selección de inferencia.', en: 'Secure personal API key storage and preferred inference provider selection.' },
      },
    ],
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
    screenshots: [
      {
        url: '/projects/gridhub/c4-architecture.png',
        title: { es: 'Diagrama de Arquitectura de Capas C4 & Multi-Tenant', en: 'C4 Layered & Multi-Tenant Architecture Diagram' },
        caption: { es: 'Desglose visual de capas (React 19 -> FastAPI Onion -> Tenant Middleware -> Postgres/Alembic).', en: 'Visual breakdown of architecture layers (React 19 -> FastAPI Onion -> Tenant Middleware -> Postgres/Alembic).' },
      },
    ],
  },

  prop2: {
    id: 'prop2',
    projectTitle: 'Prop²',
    badge: {
      es: 'Real Estate SaaS · Peer-to-Peer Backend Platform',
      en: 'Real Estate SaaS · Peer-to-Peer Backend Platform',
    },
    subtitle: {
      es: 'Plataforma inmobiliaria peer-to-peer para publicación, venta y alquiler directo de inmuebles en Argentina sin intermediarios, con arquitectura backend basada en dominios y seguridad avanzada.',
      en: 'Peer-to-peer real estate platform for direct property sales and rentals in Argentina without agency fees, featuring domain-driven backend architecture and advanced security.',
    },
    overview: {
      es: 'Prop² es una plataforma web full-stack concebida para conectar directamente a propietarios con compradores o inquilinos en Argentina, eliminando comisiones e intermediarios. Su enfoque técnico principal radica en una arquitectura backend robusta inspirada en Screaming Architecture y principios hexagonales, desacoplando los servicios de dominio de la infraestructura y el ORM.',
      en: 'Prop² is a full-stack web platform built to directly connect property owners with buyers or tenants in Argentina, bypassing real estate agency fees. Its technical core is built on a domain-driven architecture separating business logic from infrastructure and ORM persistence.',
    },
    architectureHighlights: {
      es: [
        'Organización por dominios funcionales (Screaming Architecture) desacoplando la capa de servicios de Prisma y Next.js.',
        'Persistencia relacional en PostgreSQL serverless (Neon) mediante Prisma 7 con driver adapter HTTP y migraciones versionadas.',
        'Autenticación robusta con Auth.js v5 (Credenciales + Google OAuth), derivación optimista con proxy.ts en Next 16 y verificación por tokens temporales en Resend.',
        'Subida directa firmada de imágenes desde el navegador a Cloudinary y control de abuso/rate-limiting con Upstash Redis.',
        'Pruebas unitarias e integración aisladas con Vitest y validación de esquemas con Zod 4.',
      ],
      en: [
        'Domain-driven folder organization (Screaming Architecture) decoupling business service layers from Prisma and Next.js.',
        'Relational persistence on serverless PostgreSQL (Neon) using Prisma 7 HTTP driver adapters and versioned migrations.',
        'Robust authentication via Auth.js v5 (Credentials + Google OAuth), Next 16 proxy.ts optimistic route protection, and temporary email tokens via Resend.',
        'Signed direct browser-to-Cloudinary image uploads and adaptive rate-limiting powered by Upstash Redis.',
        'Isolated unit and integration test suites built with Vitest and strict schema validation with Zod 4.',
      ],
    },
    myRoleDetailed: {
      es: [
        'Líder del desarrollo técnico y diseño de la arquitectura backend por dominio.',
        'Diseñé el modelo de datos relacional (User, Property, Image, Favorite, VerificationToken) en Prisma 7 y PostgreSQL.',
        'Implementé el flujo completo de autenticación (Registro, Login, Email Verification, Reset Password).',
        'Construí el wizard de publicación de inmuebles con geocoding dinámico y subida de imágenes Cloudinary.',
      ],
      en: [
        'Technical lead driving backend architecture and domain-driven software design.',
        'Designed the relational data model (User, Property, Image, Favorite, VerificationToken) in Prisma 7 & PostgreSQL.',
        'Implemented the complete authentication pipeline (Register, Login, Email Verification, Password Reset).',
        'Built the property creation wizard featuring dynamic geocoding and Cloudinary direct uploads.',
      ],
    },
    technicalChallenges: {
      es: [
        {
          problem: 'Evitar que la capa de negocio quede fuertemente acoplada al ORM y a los endpoints del framework web.',
          solution: 'Establecí la regla de repositorios aislados (*Repository.ts) como único acceso a Prisma, permitiendo que la capa de servicios sea testeable de manera 100% aislada en Vitest.',
        },
        {
          problem: 'Procesar imágenes pesadas de inmuebles sin saturar la memoria ni los tiempos de ejecución Serverless del backend.',
          solution: 'Implementé subidas directas firmadas desde el cliente a Cloudinary mediante URLs efímeras generadas en el backend, desacoplando completamente el tráfico multimedia del servidor principal.',
        },
      ],
      en: [
        {
          problem: 'Preventing core business logic from becoming tightly coupled to the ORM and framework API routes.',
          solution: 'Established isolated repository modules (*Repository.ts) as the sole access point to Prisma, ensuring domain service logic remains 100% isolated and testable in Vitest.',
        },
        {
          problem: 'Processing heavy property photos without overloading serverless function memory or execution timeouts.',
          solution: 'Implemented direct signed browser-to-Cloudinary uploads via short-lived backend-generated URLs, fully decoupling media traffic from the core server.',
        },
      ],
    },
    c4Diagram: {
      title: {
        es: 'Diagrama de Arquitectura Hexagonal / Por Dominios (Prop²)',
        en: 'Hexagonal / Domain-Driven Architecture Diagram (Prop²)',
      },
      nodes: [
        { id: 'app', label: 'Next.js 16 App Router + proxy.ts', desc: 'Composición de rutas public, auth, vendedor y admin', type: 'client' },
        { id: 'actions', label: 'Server Actions & Zod Validations', desc: 'Validación de entrada, orquestación y control RBAC', type: 'api' },
        { id: 'domain', label: 'Domain Services (Pure Logic)', desc: 'Servicios aislados sin dependencias de HTTP ni ORM', type: 'service' },
        { id: 'infra', label: 'Prisma 7 + Neon Postgres & Redis', desc: 'Repositories aislados, Neon driver adapter y Upstash', type: 'db' },
      ],
      connections: [
        { from: 'app', to: 'actions', label: 'HTTPS Server Actions / Forms' },
        { from: 'actions', to: 'domain', label: 'Invocación de Servicios de Dominio' },
        { from: 'domain', to: 'infra', label: 'Prisma Repositories & Adapters' },
      ],
    },
    screenshots: [
      {
        url: '/projects/prop2/c4-architecture.png',
        title: { es: 'Diagrama de Arquitectura Hexagonal & Por Dominios', en: 'Hexagonal & Domain-Driven Architecture Diagram' },
        caption: { es: 'Estructura por capas (App Router -> Server Actions Zod -> Services -> Repositories Prisma 7).', en: 'Layered structure (App Router -> Server Actions Zod -> Services -> Repositories Prisma 7).' },
      },
    ],
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
    screenshots: [
      {
        url: '/projects/pochocleando/1.png',
        title: { es: 'Versión Móvil & Flotante Pochi', en: 'Mobile Version & Floating Pochi' },
        caption: { es: 'Diseño responsive adaptado a pantallas pequeñas con acceso rápido al bot.', en: 'Responsive design for mobile screens with floating bot access.' },
      },
      {
        url: '/projects/pochocleando/2.png',
        title: { es: 'Disponibilidad en Streaming', en: 'Streaming Platform Availability' },
        caption: { es: 'Consulta de plataformas donde ver el título en Argentina (HBO Max).', en: 'Checking streaming availability in Argentina (HBO Max).' },
      },
      {
        url: '/projects/pochocleando/3.png',
        title: { es: 'Vista de Escritorio & Filtros', en: 'Desktop View & Category Filters' },
        caption: { es: 'Navegación completa por categorías de películas y series.', en: 'Full navigation through movie and series categories.' },
      },
      {
        url: '/projects/pochocleando/4.png',
        title: { es: 'Perfil de Usuario & Favoritos', en: 'User Profile & Favorite Lists' },
        caption: { es: 'Panel de control de listas guardadas e historial personal.', en: 'Control panel for saved lists and personal history.' },
      },
      {
        url: '/projects/pochocleando/5.png',
        title: { es: 'Footer Académico & Integración TMDB', en: 'Academic Footer & TMDB Integration' },
        caption: { es: 'Créditos del desarrollo académico para el IFTS 11.', en: 'Academic development credits for IFTS N°11.' },
      },
    ],
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
          problem: 'Implementar autenticación de usuarios segura y gestión de sesión persistente en una arquitectura híbrida web/mobile.',
          solution: 'Integré Firebase Auth con Ionic y Angular, implementando Guards de navegación para rutas protegidas y almacenamiento en tiempo real de favoritos del usuario.',
        },
      ],
      en: [
        {
          problem: 'Implementing secure user authentication and persistent session management within a hybrid web/mobile architecture.',
          solution: 'Integrated Firebase Auth with Ionic and Angular, implementing navigation Guards for protected routes and real-time user favorites synchronization.',
        },
      ],
    },
    screenshots: [
      {
        url: '/projects/pokeapp/1.png',
        title: { es: 'Autenticación con Firebase Auth', en: 'Firebase Auth Flow' },
        caption: { es: 'Vistas móviles de Iniciar Sesión, Registro y Recuperación de Contraseña.', en: 'Mobile views for Login, Registration, and Password Reset.' },
      },
      {
        url: '/projects/pokeapp/2.png',
        title: { es: 'Pokédex & Stats de Pikachu', en: 'Pokédex & Pikachu Base Stats' },
        caption: { es: 'Estadísticas de combate, cálculo de debilidad ante Tierra y botón de descargar ficha.', en: 'Battle stats, Ground weakness calculation, and download card feature.' },
      },
      {
        url: '/projects/pokeapp/3.png',
        title: { es: 'Ficha de Entrenador Personalizable', en: 'Customizable Trainer Profile' },
        caption: { es: 'Vista de perfil de Ash Ketchum con Nivel y Región Kanto.', en: 'Profile view for Ash Ketchum featuring Level and Kanto Region.' },
      },
      {
        url: '/projects/pokeapp/4.png',
        title: { es: 'Selector de Avatares / Sprites Clásicos', en: 'Classic Sprite Avatar Selector' },
        caption: { es: 'Modal para seleccionar entrenadores clásicos (Brock, Misty, Blue, Oak).', en: 'Modal for selecting classic trainer avatars (Brock, Misty, Blue, Oak).' },
      },
      {
        url: '/projects/pokeapp/5.png',
        title: { es: 'Lista de Favoritos', en: 'User Favorite List' },
        caption: { es: 'Gestión de Pokémon guardados en la cuenta de usuario.', en: 'Management of saved Pokémon under the user account.' },
      },
    ],
  },
};
