import type { CaseStudy } from '../types';
import {
  gridhubDBSchema,
  gridhubArchitecture,
  skillradarDBSchema,
  skillradarArchitecture,
  prop2DBSchema,
  prop2Architecture,
  dataforgeDBSchema,
  dataforgeArchitecture,
} from './schemasAndArchitectures';

export const caseStudies: Record<string, CaseStudy> = {
  skillradar: {
    id: 'skillradar',
    projectTitle: 'SkillRadar',
    badge: {
      es: 'SaaS Insignia · Doble Rol y Privacidad',
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
        'Módulo de Career Path persistente con roadmap interactivo multi-rubro, tracking de hitos formativos, analíticas de evolución y alertas automáticas.',
        'Modo Recruiter Demo (Guest Recruiter): exploración interactiva de solo lectura para reclutadores sin registro, con aislamiento estricto de base de datos para preservar el Doble Ciego y eliminar riesgos IDOR.',
        'Cifrado de claves de API personales del lado del servidor utilizando AES-256-GCM y exención de rate-limiting (Upstash Redis).',
        'Sistema de privacidad Doble Ciego: sanitización server-side de PII (información personal identificable) y URLs firmadas de expiración corta.',
        'Pruebas automatizadas unitarias con Vitest y suites de extremo a extremo (E2E) con Playwright integradas en CI/CD mediante GitHub Actions.',
        'Persistencia relacional escalable con Prisma ORM, baseline de migraciones y PostgreSQL serverless en Neon.',
      ],
      en: [
        'Multi-Provider AI Routing (Google Gemini as primary system engine, BYOK support for OpenAI, Anthropic Claude, Groq, OpenRouter with automatic fallback).',
        'Persistent Career Path module with multi-domain interactive roadmaps, milestone tracking, evolution analytics, and automated progress alerts.',
        'Recruiter Demo Mode (Guest Recruiter): interactive read-only exploration for recruiters without sign-up, strictly isolated from production DB to preserve Double-Blind privacy and eliminate IDOR vectors.',
        'Server-side encryption of user API keys using AES-256-GCM with rate-limiting bypass via Upstash Redis.',
        'Double-Blind Privacy System: server-side PII sanitization and short-lived signed URLs for candidate safety.',
        'Automated testing suite with Vitest unit tests and Playwright E2E testing integrated into GitHub Actions CI/CD.',
        'Scalable relational persistence with Prisma ORM, migration baselines, and serverless PostgreSQL on Neon.',
      ],
    },
    myRoleDetailed: {
      es: [
        'Creador único y desarrollador full-stack del proyecto, asumiendo el diseño de arquitectura backend, modelado relacional y frontend.',
        'Diseñé el motor de cálculo ATS, el algoritmo de análisis semántico de verbos de impacto y el módulo de Career Path persistente.',
        'Implementé el chatbot Career Copilot y el simulador de entrevistas con 3 niveles de exigencia (Estándar, Presión y Reclutador).',
        'Construí la suite de reclutamiento con Reverse Job-Matching, búsqueda semántica y el modo Recruiter Demo aislado.',
      ],
      en: [
        'Sole creator and full-stack developer, designing the backend architecture, relational modeling, and UI.',
        'Designed the ATS scoring engine, semantic impact verb analysis algorithm, and persistent Career Path module.',
        'Implemented Career Copilot chatbot and 3-mode interview simulator (Standard, Pressure, Recruiter).',
        'Built the recruiter suite featuring Reverse Job-Matching, semantic sourcing, and isolated Recruiter Demo mode.',
      ],
    },
    technicalChallenges: {
      es: [
        {
          problem: 'Garantizar privacidad absoluta del candidato (Doble Ciego) sin romper la capacidad de búsqueda de los reclutadores.',
          solution: 'Implementé sanitización server-side que remueve PII antes de almacenar el perfil en el Talent Pool público. La identidad del candidato permanece blindada con identificadores ofuscados DEV-XXXXXX generados con SHA-256, y solo se revela tras la aceptación explícita de la solicitud de contacto persistida en PostgreSQL.',
        },
        {
          problem: 'Gestionar fallos de disponibilidad o límites de cuotas de proveedores de IA de forma transparente para el usuario.',
          solution: 'Diseñé una canalización de enrutamiento resiliente impulsada por Vercel AI SDK que conmuta automáticamente en cascada entre Google Gemini 3.8 Flash, Gemini 3.7, Groq y OpenRouter con validación estricta Zod y motor heurístico offline.',
        },
      ],
      en: [
        {
          problem: 'Guaranteeing complete candidate privacy (Double Blind) without hindering recruiter search capabilities.',
          solution: 'Implemented server-side sanitization stripping PII before publishing candidate profiles in the Talent Pool. Candidate identity remains masked via SHA-256 hashed DEV-XXXXXX IDs and is unmasked only upon explicit contact request acceptance in PostgreSQL.',
        },
        {
          problem: 'Handling AI provider outages or quota limits transparently for users.',
          solution: 'Designed a resilient multi-model failover pipeline using Vercel AI SDK cascading across Google Gemini 3.8 Flash, Gemini 3.7, Groq, and OpenRouter with strict Zod validation and offline heuristic fallback.',
        },
      ],
    },
    adrs: {
      title: {
        es: 'Criterios de Evaluación ATS y Decisiones de Arquitectura',
        en: 'ATS Evaluation Criteria & Architecture Decisions',
      },
      items: [
        {
          question: {
            es: '¿Cuáles son los criterios del motor de scoring y análisis de CV (ATS)?',
            en: 'What are the scoring and CV analysis criteria (ATS)?',
          },
          decision: {
            es: 'Rúbrica aditiva estructurada de 0 a 100 evaluada con Vercel AI SDK y Zod: 15 pts datos de contacto parseables, 25 pts secciones estándar, 20 pts legibilidad máquina, 20 pts keywords en contexto de proyectos y 20 pts logros cuantificados con impacto medible (fórmula X-Y-Z de Google), con clamp determinista.',
            en: 'Additive 0-to-100 rubric validated with Vercel AI SDK and Zod: 15 pts parseable contact, 25 pts standard sections, 20 pts machine readability, 20 pts in-context keywords, and 20 pts quantified achievements (Google X-Y-Z formula), guarded by deterministic clamping.',
          },
        },
        {
          question: {
            es: '¿Cómo se garantiza la veracidad y consistencia en las entrevistas simuladas?',
            en: 'How are truthfulness and consistency guaranteed in mock interviews?',
          },
          decision: {
            es: 'El simulador valida las respuestas del candidato contrastándolas con la experiencia real declarada en su CV parseado, penalizando contradicciones y evitando alucinaciones de roles no ejercidos.',
            en: 'The simulator verifies candidate answers against actual work history in the parsed CV, penalizing contradictions and preventing hallucinated roles.',
          },
        },
        {
          question: {
            es: '¿Por qué Privacidad Doble Ciego en lugar de perfiles públicos abiertos?',
            en: 'Why Double-Blind Privacy instead of public candidate profiles?',
          },
          decision: {
            es: 'Elimina sesgos en el reclutamiento técnico y protege la privacidad laboral del desarrollador activo, sanitizando PII en servidor y revelando datos de contacto únicamente tras la aceptación explícita de la solicitud persistida en base de datos.',
            en: 'Eliminates hiring bias and shields actively employed developers, stripping PII server-side and unlocking contact details only after explicit candidate acceptance persisted in the database.',
          },
        },
      ],
    },
    dbSchema: skillradarDBSchema,
    systemArchitecture: skillradarArchitecture,
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
        title: { es: 'Dashboard Principal y Modo Demo', en: 'Main Dashboard & Demo Mode' },
        caption: { es: 'Doble Ciego activo y KPIs de actividad en tiempo real.', en: 'Active Double-Blind status and real-time activity KPIs.' },
      },
      {
        url: '/projects/skillradar/2.png',
        title: { es: 'Métricas ATS y Desglose Base 0', en: 'ATS Metrics & Zero-Base Breakdown' },
        caption: { es: 'Puntajes ATS 78, Tech 71 y Credibilidad 84 con rúbrica aditiva.', en: 'ATS 78, Tech 71, and Credibility 84 scores with additive rubric.' },
      },
      {
        url: '/projects/skillradar/3.png',
        title: { es: 'Simulador de Entrevista Técnica', en: 'Technical Interview Simulator' },
        caption: { es: 'Práctica interactiva en modos Estándar, Presión y Reclutador.', en: 'Interactive practice in Standard, Pressure, and Recruiter modes.' },
      },
      {
        url: '/projects/skillradar/4.png',
        title: { es: 'Career Copilot con Selector Multi-Modelo', en: 'Career Copilot with Multi-Model Selector' },
        caption: { es: 'Asistente profesional con soporte para Gemini 3.8 Flash, Groq y OpenRouter.', en: 'Career guidance assistant with Gemini 3.8 Flash, Groq, and OpenRouter support.' },
      },
      {
        url: '/projects/skillradar/5.png',
        title: { es: 'Auditoría de Repositorios y Lenguajes de GitHub', en: 'GitHub Repository & Language Audit' },
        caption: { es: 'Distribución de código, detección de fortalezas y recomendaciones.', en: 'Code distribution analysis, highlighted strengths, and recommendations.' },
      },
      {
        url: '/projects/skillradar/6.png',
        title: { es: 'Creador de CV con Previsualizador ATS A4 y Análisis de Verbos', en: 'CV Builder with A4 ATS Preview & Verb Analysis' },
        caption: { es: 'Editor estructurado y hoja A4 en tiempo real con análisis de verbos.', en: 'Structured editor and real-time A4 sheet with impact verb analysis.' },
      },
      {
        url: '/projects/skillradar/7.png',
        title: { es: 'Auditoría SEO de Perfil de LinkedIn', en: 'LinkedIn Profile SEO Audit' },
        caption: { es: 'Evaluación de visibilidad y optimización para reclutadores técnicos.', en: 'Visibility evaluation and strategic optimization for technical recruiters.' },
      },
      {
        url: '/projects/skillradar/8.png',
        title: { es: 'Base de Talentos con Doble Ciego', en: 'Double-Blind Talent Pool' },
        caption: { es: 'Perfiles DEV-XXXXXX anonimizados con scoring semántico.', en: 'Anonymized DEV-XXXXXX candidate profiles with semantic scoring.' },
      },
      {
        url: '/projects/skillradar/9.png',
        title: { es: 'Ofertas de Empleo y Gestión de Candidaturas', en: 'Job Postings & Application Tracking' },
        caption: { es: 'Panel de vacantes publicadas y tracking de aplicaciones técnicas.', en: 'Published job vacancies board and technical application tracking.' },
      },
      {
        url: '/projects/skillradar/10.png',
        title: { es: 'Configuración de IA y Privacidad BYOK', en: 'AI Configuration & BYOK Privacy' },
        caption: { es: 'Cifrado AES-256 de API keys personales y selección de proveedor.', en: 'AES-256 encryption for personal API keys and model provider selection.' },
      },
    ],
  },

  'gridhub-wms': {
    id: 'gridhub-wms',
    projectTitle: 'GridHub WMS',
    badge: {
      es: 'Logística Empresarial · Screaming Architecture & Multi-Tenant',
      en: 'Enterprise Logistics · Screaming Architecture & Multi-Tenant',
    },
    subtitle: {
      es: 'Sistema logístico empresarial multi-tenant con Screaming Architecture orientada a 8 dominios, resiliencia offline, integración B2B con ERPs y optimización de base de datos.',
      en: 'Enterprise multi-tenant logistics management system with 8-domain Screaming Architecture, offline resilience, B2B ERP integration, and database optimization.',
    },
    overview: {
      es: 'GridHub WMS es una plataforma logística de grado empresarial concebida para la gestión integral de depósitos, inventarios y distribución. Implementa una Screaming Architecture fullstack simétrica estructurada en 8 dominios funcionales, aislamiento de datos estricto por cliente (multi-tenant), motor de resiliencia y sincronización offline-first con IndexedDB y claves de idempotencia, interoperabilidad B2B con sistemas ERP mediante Transactional Outbox y optimización de rendimiento en PostgreSQL para alta concurrencia.',
      en: 'GridHub WMS is an enterprise-grade logistics platform designed for comprehensive warehouse, inventory, and fulfillment management. It implements a symmetric fullstack Screaming Architecture across 8 functional domains, strict per-client multi-tenant data isolation, frontend offline-first synchronization with IndexedDB and idempotency keys, B2B ERP integration via Transactional Outbox, and high-concurrency database optimizations on PostgreSQL.',
    },
    architectureHighlights: {
      es: [
        'Screaming Architecture Fullstack: organización simétrica del backend en 8 dominios funcionales cohesivos (admin, auth, catalog, inventory, warehouse, operations, analytics, integration) desacoplando modelos, 142 DTOs de schemas, servicios OOP puros y thin routers de transporte.',
        'Sincronización Offline-First (React 19 + Dexie.js / IndexedDB + PWA): colas locales FIFO reactivas (dexie-react-hooks), resolución de conflictos y claves de idempotencia para operabilidad ininterrumpida en zonas ciegas.',
        'Integración B2B ERP y Transactional Outbox: API de interoperabilidad con sistemas empresariales externos, catálogo configurable y despacho garantizado de eventos asíncronos sin pérdida de mensajes.',
        'Optimización de PostgreSQL y Calidad de Migraciones: eliminación de consultas N+1, índices parciales para multi-tenancy a escala de producción y pipeline automatizado de salud de migraciones con Alembic.',
        'Motores Algorítmicos de Logística Interna: asignación inteligente de almacenamiento (Put Away por rotación ABC, zona y volumen) y cálculo automático de punto de reorden (ROP).',
        'Rediseño Integral de Inicio por Rol y Omnibox Global: Centro de Mando para Supervisor y Mi Turno para Picker con paleta de comandos calificada (sku:, loc:), comparativas interdepósito y SLAs OTIF.',
        'Gestión Operativa Avanzada: flujo de partial pick fulfillment con tareas residuales, módulo de devoluciones/logística inversa (RMA), transferencias interdepósito y validación en mesas de trabajo con blindaje FIFO/FEFO.',
        'Gobernanza de Calidad y Testing: suites integrales de pruebas de extremo a extremo (E2E) con Playwright sobre PostgreSQL QA real y suites continuas en Vitest y Pytest integradas en CI/CD con GitHub Actions.',
      ],
      en: [
        'Fullstack Screaming Architecture: symmetric organization of the backend into 8 cohesive functional domains (admin, auth, catalog, inventory, warehouse, operations, analytics, integration) decoupling models, 142 schema DTOs, pure OOP services, and thin routers.',
        'Offline-First Synchronization (React 19 + Dexie.js / IndexedDB + PWA): reactive local FIFO mutation queues (dexie-react-hooks), conflict reconciliation, and transaction idempotency keys for uninterrupted warehouse operations.',
        'B2B ERP Integration & Transactional Outbox Pattern: enterprise interoperability API with configurable catalogs and guaranteed asynchronous event dispatch with zero message loss.',
        'PostgreSQL Optimization & Migration Integrity: elimination of N+1 query bottlenecks, tenant-scoped partial indexing, and automated migration health pipelines with Alembic.',
        'Algorithmic Internal Logistics Engines: intelligent Put Away location allocation (ABC classification, capacity, and velocity) and automated Reorder Point (ROP) min/max replenishment.',
        'Role-Based Dashboard Redesign & Global Omnibox: Command Center for Supervisors and My Shift for Pickers featuring qualified command palette search (sku:, loc:), multi-warehouse comparisons, and OTIF SLA metrics.',
        'Advanced Operational Management: partial pick fulfillment with residual task generation, RMA reverse logistics module, inter-warehouse stock transfers, and packing table verification with FIFO/FEFO rules.',
        'Quality Governance & Testing: comprehensive Playwright End-to-End (E2E) suites executing on real PostgreSQL QA instances, plus multi-layer Vitest and Pytest suites integrated into GitHub Actions CI/CD.',
      ],
    },
    myRoleDetailed: {
      es: [
        'Diseñé e implementé la Screaming Architecture en backend y frontend, estructurando el sistema en 8 dominios funcionales cohesivos con 142 DTOs normalizados, servicios OOP puros y routers delgados.',
        'Desarrollé el motor de resiliencia y sincronización offline en React 19 con Dexie.js (IndexedDB) y Service Worker (Vite PWA), incorporando colas transaccionales locales y reporte automatizado de conflictos.',
        'Diseñé la API de integración B2B para sistemas ERP externos e implementé el patrón Transactional Outbox para comunicación asíncrona confiable.',
        'Diseñé y desarrollé de punta a punta el nuevo inicio por rol (Centro de Mando de Supervisor y Mi Turno para Picker), la Omnibox global de búsqueda rápida y el catálogo dinámico de reportes.',
        'Implementé los motores algorítmicos de Put Away inteligente y abastecimiento automático por punto de reorden (ROP).',
        'Optimicé la capa de base de datos en PostgreSQL para producción, erradicando consultas N+1 y creando índices parciales para entornos multi-tenant.',
        'Lideré la validación de calidad del sistema con pruebas Playwright E2E sobre bases PostgreSQL QA reales y suites automatizadas en Vitest y Pytest.',
      ],
      en: [
        'Architected and implemented full-stack Screaming Architecture, structuring the system into 8 cohesive functional domains with 142 normalized DTOs, pure OOP services, and thin routers.',
        'Developed the frontend offline resilience and synchronization engine in React 19 with Dexie.js (IndexedDB) and Vite PWA Service Worker, featuring local mutation queues and automated conflict reporting.',
        'Designed B2B ERP integration APIs and implemented the Transactional Outbox pattern for reliable asynchronous enterprise communication.',
        'Designed and built the role-based dashboard from end to end (Supervisor Command Center & Picker My Shift), the global Omnibox search palette, and dynamic reports catalog.',
        'Implemented algorithmic Put Away suggestion and automated Reorder Point (ROP) inventory replenishment engines.',
        'Optimized the PostgreSQL production database layer, eradicating N+1 query bottlenecks and crafting tenant-scoped partial indexes for multi-tenant throughput.',
        'Led full-stack quality validation with Playwright E2E suites running on real PostgreSQL QA databases and automated Vitest & Pytest test runs.',
      ],
    },
    domainsBreakdown: {
      title: {
        es: 'Los 8 Dominios Funcionales Cohesivos (Screaming Architecture & DDD)',
        en: 'The 8 Cohesive Functional Domains (Screaming Architecture & DDD)',
      },
      items: [
        { name: '1. admin', desc: { es: 'Plataforma SaaS, activación de inquilinos, auditoría inmutable de eventos, configuraciones globales y feedback.', en: 'SaaS platform management, tenant activation, immutable audit logging, global settings, and feedback.' } },
        { name: '2. auth', desc: { es: 'Autenticación JWT, gestión de usuarios, roles RBAC granulares, recuperación de claves y preferencias.', en: 'JWT authentication, user management, granular RBAC roles, password recovery, and preferences.' } },
        { name: '3. catalog', desc: { es: 'Maestro de artículos (SKU, códigos de barra, clases ABC, volumetría), proveedores y adaptadores ERP.', en: 'Master item catalog (SKU, barcodes, ABC classes, dimensions), suppliers, and ERP adapters.' } },
        { name: '4. inventory', desc: { es: 'Control de existencias físicas, lotes, vencimientos, estados de calidad y auditoría de movimientos.', en: 'Physical stock tracking, lots, expirations, quality status gates, and movement auditing.' } },
        { name: '5. warehouse', desc: { es: 'Topología física de depósitos, ubicaciones, etiquetas de racks/pasillos y plano interactivo.', en: 'Warehouse layout topology, physical storage locations, rack labeling, and interactive map.' } },
        { name: '6. operations', desc: { es: 'Gestión de pedidos, tareas de picking (FIFO/FEFO), carros multibolsa y mesas de consolidación.', en: 'Order processing, picking workflows (FIFO/FEFO), multi-bin carts, and packing tables.' } },
        { name: '7. analytics', desc: { es: 'Catálogo de 17 reportes operativos, rotación ABC, ocupación de depósitos y seguimiento de SLAs OTIF.', en: '17 operational reports, ABC velocity, warehouse occupancy, and OTIF SLA fulfillment tracking.' } },
        { name: '8. integration', desc: { es: 'Sincronización offline-first (IndexedDB), scanner QR, notificaciones y Transactional Outbox para ERP.', en: 'Offline-first sync (IndexedDB), QR scanning, alerts, and Transactional Outbox for ERPs.' } },
      ],
    },
    adrs: {
      title: {
        es: 'Decisiones de Arquitectura y Diseño Técnico (ADRs)',
        en: 'Key Architecture & Engineering Decisions (ADRs)',
      },
      items: [
        {
          question: {
            es: '¿Por qué Transactional Outbox en vez de peticiones HTTP directas al ERP externo?',
            en: 'Why Transactional Outbox instead of direct synchronous HTTP calls to external ERPs?',
          },
          decision: {
            es: 'Garantiza consistencia transaccional y entrega fiable at-least-once sin riesgo de perder movimientos de inventario ante cortes de red o caídas del servicio externo.',
            en: 'Guarantees transactional consistency and at-least-once reliable delivery with zero inventory movement data loss during network outages or third-party downtime.',
          },
        },
        {
          question: {
            es: '¿Por qué priorizar Playwright E2E sobre pruebas puramente unitarias?',
            en: 'Why prioritize Playwright E2E over purely unit testing?',
          },
          decision: {
            es: 'En sistemas logísticos críticos, los errores de mayor impacto ocurren en la integración: concurrencia en reservas de stock, navegación de Omnibox y renderizado multi-dispositivo con PostgreSQL QA real.',
            en: 'In critical logistics systems, high-severity defects occur at integration boundaries: stock reservation race conditions, Omnibox navigation, and multi-device UI with real PostgreSQL QA.',
          },
        },
        {
          question: {
            es: '¿Por qué Screaming Architecture orientada a 8 paquetes de dominio?',
            en: 'Why Screaming Architecture structured into 8 domain packages?',
          },
          decision: {
            es: 'Permite que la estructura del código grite el negocio logístico en lugar del framework, aislando modelos, DTOs y servicios puros para facilitar mantenimiento y escalabilidad del equipo.',
            en: 'Enables the codebase structure to scream logistics business capabilities rather than the web framework, isolating models, DTOs, and pure services for scalability.',
          },
        },
      ],
    },
    dbSchema: gridhubDBSchema,
    systemArchitecture: gridhubArchitecture,
    technicalChallenges: {
      es: [
        {
          problem: 'Permitir que los operadores de depósito registren movimientos de stock en zonas sin cobertura de internet sin perder consistencia.',
          solution: 'Diseñé una cola de transacciones locales en IndexedDB que intercepta las peticiones y las procesa secuencialmente al restablecer la conexión, usando claves de idempotencia para evitar duplicaciones.',
        },
        {
          problem: 'Garantizar el despacho fiable de eventos operativos hacia ERPs externos sin incurrir en transacciones distribuidas complejas.',
          solution: 'Implementé el patrón Transactional Outbox guardando los eventos en la misma transacción relacional de base de datos antes de publicarlos de forma asíncrona y resiliente a fallas de red.',
        },
        {
          problem: 'Garantizar aislamiento absoluto y alto rendimiento entre clientes empresariales (multi-tenancy) a escala.',
          solution: 'Diseñé middleware de contexto de tenant en FastAPI junto con índices parciales por cliente en PostgreSQL y optimización de queries para eliminar cuellos de botella N+1.',
        },
      ],
      en: [
        {
          problem: 'Allowing warehouse operators to record stock movements offline without losing data consistency.',
          solution: 'Designed an IndexedDB local transaction queue intercepting requests and processing them sequentially upon reconnection, backed by transaction idempotency keys.',
        },
        {
          problem: 'Ensuring reliable dispatch of operational events to external ERPs without complex distributed transactions.',
          solution: 'Implemented the Transactional Outbox pattern storing events within the primary relational transaction before asynchronously delivering them with at-least-once guarantees.',
        },
        {
          problem: 'Ensuring absolute isolation and high query performance across enterprise clients (multi-tenancy) at scale.',
          solution: 'Engineered FastAPI tenant context middleware coupled with tenant-scoped PostgreSQL partial indexes and eager-loading optimizations to eliminate N+1 bottlenecks.',
        },
      ],
    },
    c4Diagram: {
      title: {
        es: 'Diagrama de Arquitectura Screaming por Dominios & Multi-Tenant (GridHub WMS)',
        en: 'Domain-Driven Screaming & Multi-Tenant Architecture Diagram (GridHub WMS)',
      },
      nodes: [
        { id: 'ui', label: 'React 19 Frontend Modular', desc: 'IndexedDB Offline Queue + Dashboards por Rol (Supervisor/Picker)', type: 'client' },
        { id: 'screaming', label: 'FastAPI (Screaming Architecture)', desc: '8 Dominios Funcionales Cohesivos + Thin Routers + Servicios OOP', type: 'api' },
        { id: 'outbox', label: 'Transactional Outbox & ERP B2B', desc: 'Despacho garantizado de eventos asíncronos sin pérdida de mensajes', type: 'service' },
        { id: 'db', label: 'PostgreSQL / Alembic Multi-Tenant', desc: 'Aislamiento estricto por cliente, índices parciales y 0 consultas N+1', type: 'db' },
      ],
      connections: [
        { from: 'ui', to: 'screaming', label: 'REST API / Idempotency Headers' },
        { from: 'screaming', to: 'outbox', label: 'Eventos de Dominio Post-Commit' },
        { from: 'screaming', to: 'db', label: 'SQLAlchemy Scoped Queries' },
        { from: 'outbox', to: 'db', label: 'Outbox Event State & Polling' },
      ],
    },
    screenshots: [
      {
        url: '/projects/gridhub/1.png',
        title: { es: 'Dashboard de Supervisor y Operaciones', en: 'Supervisor & Operations Dashboard' },
        caption: { es: 'Visión consolidada de actividad de depósito, métricas de cumplimiento OTIF y tareas pendientes.', en: 'Consolidated warehouse activity view, OTIF fulfillment metrics, and pending tasks.' },
      },
      {
        url: '/projects/gridhub/2.png',
        title: { es: 'Omnibox Global y Búsqueda de Órdenes', en: 'Global Omnibox & Order Search' },
        caption: { es: 'Paleta de comandos y acceso rápido para operadores a órdenes, productos y ubicaciones.', en: 'Command palette and quick operator access to orders, SKUs, and warehouse locations.' },
      },
      {
        url: '/projects/gridhub/3.png',
        title: { es: 'Gestión y Tablero de Tareas Operativas', en: 'Operations Tasks Management Board' },
        caption: { es: 'Supervisión en tiempo real de tareas de picking, replenishment y movimientos de stock.', en: 'Real-time monitoring of picking tasks, replenishment, and stock movements.' },
      },
      {
        url: '/projects/gridhub/4.png',
        title: { es: 'Motor de Put Away Inteligente (Criterios ABC)', en: 'Intelligent Put Away Engine (ABC Rules)' },
        caption: { es: 'Algoritmo de recomendación de ubicaciones de guardado por rotación, zona y volumen.', en: 'Location recommendation algorithm based on product velocity, zone, and capacity.' },
      },
      {
        url: '/projects/gridhub/5.png',
        title: { es: 'Catálogo Dinámico de Reportes y Auditoría', en: 'Dynamic Reports & Inventory Audit Catalog' },
        caption: { es: 'Vistas alternables (cards vs tabla plana) para auditoría de stock y trazabilidad.', en: 'Switchable views (cards vs flat table) for stock auditing and traceability.' },
      },
      {
        url: '/projects/gridhub/c4-architecture.svg',
        title: { es: 'Diagrama de Arquitectura de Capas C4 y Multi-Tenant', en: 'C4 Layered & Multi-Tenant Architecture Diagram' },
        caption: { es: 'Desglose visual de capas (React 19 -> FastAPI Onion -> Tenant Middleware -> Postgres/Alembic).', en: 'Visual breakdown of architecture layers (React 19 -> FastAPI Onion -> Tenant Middleware -> Postgres/Alembic).' },
      },
    ],
  },

  dataforge: {
    id: 'dataforge',
    projectTitle: 'DataForge',
    badge: {
      es: 'Plataforma Analítica · Local-First y Motores Wasm',
      en: 'Analytics Platform · Local-First & Wasm Engines',
    },
    subtitle: {
      es: 'Plataforma de análisis de datos autoservicio en el navegador con DuckDB-Wasm, Pyodide (Python), Rust, preservación estricta de linaje DAG y cero telemetría externa.',
      en: 'Browser-native self-service data analytics platform powered by DuckDB-Wasm, Pyodide (Python), Rust, strict DAG data lineage, and zero external telemetry.',
    },
    overview: {
      es: 'DataForge es una plataforma de análisis de datos autoservicio, orientada a la privacidad y ejecutada íntegramente en el cliente (local-first). Permite importar archivos tabulares (CSV, XLSX, Parquet, JSON), explorar y perfilar esquemas, aplicar transformaciones reproducibles con preservación determinista de linaje (Data Lineage), ejecutar consultas SQL analíticas de baja latencia con DuckDB-Wasm, computar modelos estadísticos y pronósticos de series temporales en Python (Pyodide) y compilar reportes ejecutivos con visualizaciones de Apache ECharts, todo sin requerir servidores de backend ni incurrir en costos de infraestructura cloud.',
      en: 'DataForge is a privacy-first, client-side self-service data analytics platform executed entirely in the browser (local-first). It empowers users to import tabular files (CSV, XLSX, Parquet, JSON), explore and profile schemas, execute reproducible transformations with deterministic data lineage, run sub-millisecond analytical SQL queries via DuckDB-Wasm, perform statistical modeling and time-series forecasting in Python (Pyodide), and compile executive reports with Apache ECharts—all with zero backend servers and zero cloud infrastructure costs.',
    },
    architectureHighlights: {
      es: [
        'Arquitectura Monolítica Modular Client-Side (Screaming Architecture) con separación estricta en capas de Dominio, Aplicación, Infraestructura y Presentación.',
        'Orquestación multi-motor en Web Workers aislados: DuckDB-Wasm como motor SQL columnar OLAP primario, Pyodide (Python científico) para modelos inferenciales/forecasting diferidos, y Rust/Wasm para algoritmos numéricos de alta intensidad (DTW).',
        'Preservación determinista del linaje de datos (Data Lineage) mediante un grafo acíclico dirigido (DAG) de transformaciones inmutables sin mutar los archivos fuente originales.',
        'Parsers off-main-thread para CSV, XLSX y Parquet con inferencia automática de esquemas y tipos semánticos (moneda, temporales, categóricos) sin bloquear el render loop de React.',
        'Validación preventiva de cardinalidad y fan-out en operaciones JOIN y APPEND (ADR-0007) para evitar explosiones combinatorias y duplicaciones en memoria.',
        'Plantillas de dominio especializadas: Análisis Libre, Finanzas Personales (doble moneda ARS/USD, cotizaciones Oficial/MEP/CCL y prevención de doble contabilización), Ventas y Encuestas.',
        'Persistencia transaccional local en IndexedDB (Dexie.js) para recetas de proyectos y OPFS (Origin Private File System) para almacenamiento seguro de archivos.',
        'Suite automatizada de pruebas unitarias con Vitest y pruebas E2E con Playwright (31/31 suites verificadas en R1).',
      ],
      en: [
        'Client-side Modular Monolith (Screaming Architecture) strictly decoupling Domain, Application, Infrastructure, and Presentation layers.',
        'Multi-engine orchestration across isolated Web Workers: DuckDB-Wasm as primary columnar OLAP engine, Pyodide (scientific Python) for lazy-loaded inferential models, and Rust/Wasm for intensive numerical algorithms (DTW).',
        'Deterministic Data Lineage preservation using an immutable transformation Directed Acyclic Graph (DAG) leaving original source buffers untouched.',
        'Off-main-thread CSV, XLSX, and Parquet parsers featuring automatic schema inference and semantic role detection without freezing the React render loop.',
        'Preventative cardinality and fan-out validation on JOIN and APPEND operations (ADR-0007) preventing combinational row duplication in memory.',
        'Specialized domain templates: Free Analysis, Personal Finance (segregated ARS/USD ledger with Official/MEP/CCL exchange rates), Sales, and Surveys.',
        'Transactional local persistence in IndexedDB (Dexie.js) for project recipes and OPFS (Origin Private File System) for zero-network byte streaming.',
        'Automated testing suite with Vitest unit tests and Playwright E2E suites (31/31 verified tests in R1 release).',
      ],
    },
    myRoleDetailed: {
      es: [
        'Creador único y arquitecto de software: definí la visión de producto, la arquitectura hexagonal cliente y el roadmap técnico de entregas (R1 cerrado con 31/31 tests E2E).',
        'Diseñé el orquestador multi-engine y el canal de comunicación asíncrono tipado entre la UI de React y los Web Workers de DuckDB-Wasm y Pyodide.',
        'Implementé el motor de linaje de datos y transformaciones DAG, garantizando inmutabilidad de fuentes y pre-validación de cardinalidad en operaciones JOIN y APPEND.',
        'Modelé la plantilla de Finanzas Personales con contabilidad bimoneda (ARS/USD), segregación estricta de transferencias y tipos de cambio históricos.',
      ],
      en: [
        'Sole creator and software architect: defined product vision, client-side hexagonal architecture, and technical milestone roadmap (R1 completed with 31/31 E2E tests).',
        'Designed the multi-engine orchestrator and typed message-passing bridge between the React UI and DuckDB-Wasm/Pyodide Web Workers.',
        'Engineered the data lineage engine and transformation DAG, guaranteeing source immutability and cardinality pre-checks on JOIN and APPEND operations.',
        'Modeled the Personal Finance template with dual-currency (ARS/USD) accounting, strict transfer segregation, and historical exchange rates.',
      ],
    },
    technicalChallenges: {
      es: [
        {
          problem: 'Ejecutar cómputo analítico intensivo y queries SQL complejas sobre grandes datasets sin bloquear el hilo principal de renderizado de la interfaz.',
          solution: 'Aislé por completo DuckDB-Wasm, los parsers de ingesta y Pyodide en Web Workers independientes con canales de mensajes basados en Transferable Objects y TypedArrays. La interfaz de usuario mantiene 60 FPS estables mientras el motor ejecuta agregaciones vectorizadas sobre millones de registros en segundo plano.',
        },
        {
          problem: 'Prevenir duplicación accidental de filas y explosión de memoria (fan-out) durante transformaciones JOIN y combinaciones APPEND en el navegador.',
          solution: 'Diseñé una etapa de análisis de cardinalidad previa a la ejecución (ADR-0007). El sistema analiza la unicidad de las columnas clave y el ratio de fan-out; si detecta relaciones muchos a muchos (M:N) no deseadas, advierte al usuario con el impacto proyectado en filas antes de materializar la operación en memoria.',
        },
        {
          problem: 'Garantizar reproducibilidad científica y linaje de datos (Data Lineage) sin duplicar archivos pesados en el almacenamiento local del navegador.',
          solution: 'Implementé un modelo de versiones derivadas inmutables basado en grafos acíclicos dirigidos (DAG). En lugar de clonar el dataset completo en cada paso, cada nodo almacena la receta determinista de transformación y punteros a los identificadores de origen (lineage_parent_ids), recalculando o persistiendo instantáneas de forma diferida en IndexedDB.',
        },
      ],
      en: [
        {
          problem: 'Executing heavy analytical compute and complex SQL queries on large datasets without freezing the browser UI main thread.',
          solution: 'Completely isolated DuckDB-Wasm, ingestion parsers, and Pyodide into dedicated Web Workers using structured message passing with Transferable Objects and TypedArrays. The UI maintains a constant 60 FPS while the engine executes vectorized queries on millions of rows in the background.',
        },
        {
          problem: 'Preventing accidental row duplication and memory exhaustion (fan-out) during in-browser JOIN and APPEND combinations.',
          solution: 'Engineered an upfront cardinality inspection phase (ADR-0007) that inspects key uniqueness and fan-out ratios before execution. If unintended many-to-many relationships are detected, the system alerts the user with projected row impacts before materializing data in memory.',
        },
        {
          problem: 'Guaranteeing scientific data lineage and auditability without duplicating massive file buffers in browser storage.',
          solution: 'Implemented an immutable DAG-based derived version model. Instead of duplicating datasets at every transform step, nodes persist deterministic transformation recipes and parent pointers (lineage_parent_ids), lazily computing or persisting snapshots in IndexedDB.',
        },
      ],
    },
    domainsBreakdown: {
      title: {
        es: 'Módulos y Dominios Funcionales (Screaming Architecture Cliente)',
        en: 'Functional Domains & Modules (Client Screaming Architecture)',
      },
      items: [
        { name: '1. projects', desc: { es: 'Entidad raíz del espacio de trabajo, metadatos, plantillas activas y gestión transaccional.', en: 'Root workspace entity, metadata, active templates, and transactional management.' } },
        { name: '2. datasets', desc: { es: 'Ingesta multi-formato off-main-thread, detección de tipos, inferencia de roles semánticos y buffer columnar.', en: 'Off-main-thread multi-format ingestion, type detection, semantic role inference, and columnar buffer.' } },
        { name: '3. pipelines', desc: { es: 'Grafo acíclico dirigido (DAG) de transformaciones con pre-validación de cardinalidad y fan-out.', en: 'Directed Acyclic Graph (DAG) transformation pipeline with cardinality and fan-out pre-validation.' } },
        { name: '4. analysis', desc: { es: 'Consultas SQL analíticas sobre DuckDB-Wasm y modelos inferenciales avanzados en Pyodide.', en: 'Analytical SQL queries powered by DuckDB-Wasm and advanced inferential models in Pyodide.' } },
        { name: '5. reports', desc: { es: 'Report Builder ejecutivo modular con bloques de texto, hallazgos, metodología y exportación PDF/HTML.', en: 'Modular executive Report Builder with narrative blocks, findings, methodology, and PDF/HTML export.' } },
        { name: '6. finance', desc: { es: 'Contabilidad personal bimoneda (ARS/USD), cotizaciones (Oficial/MEP/CCL) y prevención de doble cómputo.', en: 'Personal finance dual-currency ledger (ARS/USD), exchange rates (Official/MEP/CCL), and double-counting prevention.' } },
      ],
    },
    adrs: {
      title: {
        es: 'Decisiones de Arquitectura y Diseño Técnico (ADR)',
        en: 'Architecture Decision Records (ADRs)',
      },
      items: [
        {
          question: {
            es: '¿Por qué Next.js con exportación estática (Static Export) en lugar de un backend tradicional?',
            en: 'Why Next.js with Static Export instead of a traditional backend?',
          },
          decision: {
            es: 'ADR-0001: Para garantizar una arquitectura local-first pura con costo de infraestructura cloud igual a cero, cero latencia de red en las consultas analíticas y privacidad total (los datos privados del usuario nunca salen de su máquina). Next.js estático se despliega en cualquier CDN global mientras DuckDB-Wasm y Web Workers asumen el 100% del cómputo.',
            en: 'ADR-0001: Guarantees pure local-first architecture with zero cloud infrastructure cost, zero network latency on analytical queries, and total user privacy. Static Next.js deploys on any global CDN while DuckDB-Wasm and Web Workers handle 100% of analytical compute.',
          },
        },
        {
          question: {
            es: '¿Cómo se orquestan múltiples motores analíticos (DuckDB-Wasm, Pyodide y Rust)?',
            en: 'How are multi-engine analytics orchestrated (DuckDB-Wasm, Pyodide, and Rust)?',
          },
          decision: {
            es: 'ADR-0002: DuckDB-Wasm actúa como motor SQL columnar primario para carga tabular, filtros y agregaciones de alta velocidad. Pyodide (Python científico) se carga de forma diferida (lazy loading) solo cuando el usuario solicita análisis inferencial avanzado o series temporales (ARIMA/Prophet), evitando descargar el runtime de 20 MB innecesariamente.',
            en: 'ADR-0002: DuckDB-Wasm serves as primary columnar SQL engine for ingestion, filtering, and rapid aggregations. Pyodide (scientific Python) is lazy-loaded only when advanced inferential statistics or time series forecasting (ARIMA/Prophet) are requested, saving 20 MB initial downloads.',
          },
        },
        {
          question: {
            es: '¿Cómo se maneja la persistencia y linaje sin agotar las cuotas del navegador?',
            en: 'How are persistence and lineage managed without exhausting browser quotas?',
          },
          decision: {
            es: 'ADR-0003, ADR-0004 y ADR-0005: IndexedDB almacena las definiciones estructuradas de proyectos, metadatos de columnas y el DAG de operaciones (recetas livianas). Los datos derivados se calculan en memoria de forma reactiva y el Origin Private File System (OPFS) se reserva para streaming de archivos binarios crudos sin saturar el heap de JavaScript.',
            en: 'ADR-0003, ADR-0004, and ADR-0005: IndexedDB persists structured project definitions, schema metadata, and transformation DAGs (lightweight recipes). Derived datasets are evaluated reactively in memory, reserving OPFS for raw binary streaming without JavaScript heap bloat.',
          },
        },
      ],
    },
    dbSchema: dataforgeDBSchema,
    systemArchitecture: dataforgeArchitecture,
    screenshots: [
      {
        url: '/projects/dataforge/1.png',
        title: { es: 'Flujo Completo de la Plataforma Analítica', en: 'End-to-End Analytics Platform Workflow' },
        caption: { es: 'Visión panorámica de las capacidades: Landing, ingesta de archivos multi-formato, exploración con detección de tipos, perfilado estadístico y calidad de datos, análisis automático con correlaciones, visualizaciones interactivas con Apache ECharts, pipeline visual de transformaciones, series temporales y Report Builder exportable.', en: 'Comprehensive workflow overview: Landing, multi-format file ingestion, type detection schema exploration, statistical profiling and data quality, automated correlation analysis, interactive Apache ECharts visualizations, visual transformation pipeline, time series analysis, and exportable Report Builder.' },
      },
      {
        url: '/projects/dataforge/2.png',
        title: { es: 'Dashboard de Análisis, Series Temporales y Consola SQL', en: 'Analytics Dashboard, Time Series & SQL Workspace' },
        caption: { es: 'Entorno de trabajo avanzado: Dashboard con datasets de ejemplo, importación local segura sin backend, análisis exploratorio con roles semánticos inferidos, pronósticos de series temporales con Prophet/Python, entrenamiento de modelos en navegador con curva ROC, editor SQL interactivo sobre DuckDB y gestión de almacenamiento en IndexedDB/OPFS.', en: 'Advanced workspace: Interactive dashboard with sample datasets, secure local ingestion without backends, exploratory analysis with inferred semantic roles, time series forecasting with Prophet/Python, in-browser machine learning model training with ROC curves, interactive DuckDB SQL editor, and IndexedDB/OPFS browser quota management.' },
      },
      {
        url: '/projects/dataforge/3.png',
        title: { es: 'Pipeline DAG de Transformaciones y Generador de Informes', en: 'Transformation DAG Pipeline & Report Generator' },
        caption: { es: 'Flujo de trabajo guiado: Importación multi-fuente, perfilado con mini-histogramas sparkline y métricas de completitud, análisis exploratorio con KPIs ejecutivos, pipeline visual con operaciones encadenadas y previsualización de resultados, modelos SARIMA con intervalo de confianza y generador de reportes ejecutivos.', en: 'Guided analytics pipeline: Multi-source import, schema profiling with sparkline mini-histograms and completeness metrics, exploratory analysis with executive KPIs, visual DAG pipeline with chained operations and live result preview, SARIMA forecasting with confidence intervals, and executive report generator.' },
      },
    ],
  },

  prop2: {
    id: 'prop2',
    projectTitle: 'Prop²',
    badge: {
      es: 'Plataforma Inmobiliaria · Full Stack Peer-to-Peer',
      en: 'Real Estate SaaS · Peer-to-Peer Full-Stack Platform',
    },
    subtitle: {
      es: 'Plataforma inmobiliaria peer-to-peer para publicación, venta y alquiler directo de inmuebles en Argentina sin intermediarios, con arquitectura backend basada en dominios, frontend responsive mobile-first y seguridad avanzada.',
      en: 'Peer-to-peer real estate platform for direct property sales and rentals in Argentina without agency fees, featuring domain-driven backend architecture, mobile-first responsive frontend, and advanced security.',
    },
    overview: {
      es: 'Prop² es una plataforma web full-stack concebida para conectar directamente a propietarios con compradores o inquilinos en Argentina, eliminando comisiones e intermediarios. Su desarrollo combina una arquitectura backend robusta inspirada en Screaming Architecture y principios hexagonales con una experiencia de usuario completa y responsive, equipada con catálogo interactivo, filtros avanzados sincronizados en URL, perfil de vendedor y bandeja de gestión de consultas directas.',
      en: 'Prop² is a full-stack web platform built to directly connect property owners with buyers or tenants in Argentina, bypassing real estate agency fees. Its development combines a domain-driven backend architecture separating business logic from ORM persistence with a complete mobile-first user experience featuring interactive catalogs, URL-synced filters, seller profiles, and a direct inquiry management inbox.',
    },
    architectureHighlights: {
      es: [
        'Organización por dominios funcionales (Screaming Architecture) desacoplando la capa de servicios de Prisma y Next.js.',
        'Frontend responsive mobile-first completo con buscador dinámico, drawers de filtros por URL (precio, tipo, ambientes, comodidades) y sincronización reactiva.',
        'Panel de administración de publicaciones y bandeja de consultas recibidas (inbox) con estados de ciclo de vida (pendiente, respondida, archivada) y paginación.',
        'Persistencia relacional en PostgreSQL serverless (Neon) mediante Prisma 7 con driver adapter HTTP y migraciones versionadas.',
        'Autenticación robusta con Auth.js v5 (Credenciales + Google OAuth), derivación optimista con proxy.ts en Next 16 y verificación por correo.',
        'Notificaciones transaccionales por correo SMTP (Nodemailer), subida directa firmada a Cloudinary y control de abuso con Upstash Redis.',
        'Pruebas unitarias e integración aisladas con Vitest y validación de esquemas con Zod 4.',
      ],
      en: [
        'Domain-driven folder organization (Screaming Architecture) decoupling business service layers from Prisma and Next.js.',
        'Complete mobile-first responsive frontend with dynamic search, URL-synced multi-filter drawers (price, property type, rooms, amenities), and reactive state sync.',
        'Listing management dashboard and received inquiries inbox featuring lifecycle states (pending, answered, archived) and pagination.',
        'Relational persistence on serverless PostgreSQL (Neon) using Prisma 7 HTTP driver adapters and versioned migrations.',
        'Robust authentication via Auth.js v5 (Credentials + Google OAuth), Next 16 proxy.ts optimistic route protection, and email verification.',
        'Transactional SMTP email notifications (Nodemailer), signed direct browser-to-Cloudinary image uploads, and Upstash Redis rate limiting.',
        'Isolated unit and integration test suites built with Vitest and strict schema validation with Zod 4.',
      ],
    },
    myRoleDetailed: {
      es: [
        'Líder del desarrollo técnico full stack y diseño de la arquitectura por dominios.',
        'Diseñé el modelo de datos relacional (User, Property, Image, Favorite, Inquiry, VerificationToken) en Prisma 7 y PostgreSQL.',
        'Implementé el frontend responsive de búsqueda con filtros dinámicos en URL y la bandeja de gestión de consultas del vendedor.',
        'Construí el flujo completo de autenticación y notificaciones transaccionales por correo SMTP (Nodemailer).',
        'Desarrollé el wizard de publicación de inmuebles con geocoding dinámico y subida directa firmada a Cloudinary.',
      ],
      en: [
        'Technical lead driving full-stack development, domain-driven software design, and system architecture.',
        'Designed the relational data model (User, Property, Image, Favorite, Inquiry, VerificationToken) in Prisma 7 & PostgreSQL.',
        'Implemented the responsive search frontend with dynamic URL-synced filters and the seller inquiries management inbox.',
        'Constructed complete authentication pipelines and transactional SMTP email notifications (Nodemailer).',
        'Built the property creation wizard featuring dynamic geocoding and signed Cloudinary direct uploads.',
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
    adrs: {
      title: {
        es: 'Decisiones de Arquitectura Hexagonal y Seguridad',
        en: 'Hexagonal Architecture & Security Decisions',
      },
      items: [
        {
          question: {
            es: '¿Por qué Arquitectura Hexagonal con repositorios tipados desacoplados del ORM?',
            en: 'Why Hexagonal Architecture with typed repositories decoupled from Prisma?',
          },
          decision: {
            es: 'Mantiene las reglas de negocio inmobiliarias (estados de publicación, verificación, consultas) independientes de la base de datos, facilitando tests unitarios rápidos y aislados.',
            en: 'Keeps business logic (listing lifecycle, verification, inquiries) agnostic of the persistence layer, enabling fast isolated unit tests.',
          },
        },
        {
          question: {
            es: '¿Por qué subidas directas firmadas browser-to-Cloudinary?',
            en: 'Why direct signed browser-to-Cloudinary uploads?',
          },
          decision: {
            es: 'Evita que el servidor Next.js procese megabytes de imágenes pesadas, previniendo límites de timeout y memoria en funciones serverless.',
            en: 'Bypasses Next.js serverless functions from processing large image payloads, preventing memory exhaustion and execution timeouts.',
          },
        },
      ],
    },
    dbSchema: prop2DBSchema,
    systemArchitecture: prop2Architecture,
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
        url: '/projects/prop2/1.png',
        title: { es: 'Búsqueda Avanzada y Catálogo (Desktop)', en: 'Advanced Search & Property Catalog (Desktop)' },
        caption: { es: 'Filtros dinámicos sincronizados por URL, paginación reactiva y tarjetas de inmuebles.', en: 'Dynamic URL-synced filters, reactive pagination, and property listing cards.' },
      },
      {
        url: '/projects/prop2/2.png',
        title: { es: 'Bandeja de Consultas Recibidas (Inbox)', en: 'Received Inquiries Inbox & Lead Management' },
        caption: { es: 'Gestión de consultas directas propietario-interesado con tracking de estados y paginación.', en: 'Direct owner-buyer inquiry tracking with status flows and pagination.' },
      },
      {
        url: '/projects/prop2/3.png',
        title: { es: 'Experiencia Móvil y Filtros Desplegables', en: 'Mobile Experience & Drawer Filters' },
        caption: { es: 'Diseño responsive mobile-first adaptado para búsqueda táctil y filtros rápidos.', en: 'Mobile-first responsive design tailored for touch exploration and quick filters.' },
      },
      {
        url: '/projects/prop2/4.png',
        title: { es: 'Gestión Móvil de Consultas de Inmuebles', en: 'Mobile Property Inquiry Management' },
        caption: { es: 'Visualización clara de mensajes y contacto directo desde dispositivos móviles.', en: 'Clear message overview and direct lead contact on mobile screens.' },
      },
      {
        url: '/projects/prop2/c4-architecture.svg',
        title: { es: 'Diagrama de Arquitectura Hexagonal C4', en: 'C4 Hexagonal Architecture Diagram' },
        caption: { es: 'Organización por dominios funcionales desacoplando la capa de servicios de Prisma.', en: 'Domain-driven folder organization decoupling business service layers from Prisma.' },
      },
    ],
  },

  pochocleando: {
    id: 'pochocleando',
    projectTitle: 'Pochocleando',
    badge: {
      es: 'Aplicación Multimedia · Asistente IA y TMDB API',
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
          title: { es: 'Inicio y Grilla Multimedia', en: 'Home & Multimedia Grid' },
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
          title: { es: 'Buscador y Disponibilidad Streaming', en: 'Search & Streaming Availability' },
          description: { es: 'Filtro en tiempo real y proveedores donde ver el contenido (HBO Max).', en: 'Live filtering and streaming availability in Argentina.' },
        },
        {
          seconds: 255,
          timeLabel: '4:15',
          title: { es: 'Perfil, Favoritos y Créditos IFTS 11', en: 'Profile, Favorites & IFTS 11 Credits' },
          description: { es: 'Gestión de listas personales de usuario y footer del proyecto.', en: 'User personal lists and academic project presentation footer.' },
        },
      ],
    },
    screenshots: [
      {
        url: '/projects/pochocleando/1.png',
        title: { es: 'Versión Móvil y Flotante Pochi', en: 'Mobile Version & Floating Pochi' },
        caption: { es: 'Diseño responsive adaptado a pantallas pequeñas con acceso rápido al bot.', en: 'Responsive design for mobile screens with floating bot access.' },
      },
      {
        url: '/projects/pochocleando/2.png',
        title: { es: 'Disponibilidad en Streaming', en: 'Streaming Platform Availability' },
        caption: { es: 'Consulta de plataformas donde ver el título en Argentina (HBO Max).', en: 'Checking streaming availability in Argentina (HBO Max).' },
      },
      {
        url: '/projects/pochocleando/3.png',
        title: { es: 'Vista de Escritorio y Filtros', en: 'Desktop View & Category Filters' },
        caption: { es: 'Navegación completa por categorías de películas y series.', en: 'Full navigation through movie and series categories.' },
      },
      {
        url: '/projects/pochocleando/4.png',
        title: { es: 'Perfil de Usuario y Favoritos', en: 'User Profile & Favorite Lists' },
        caption: { es: 'Panel de control de listas guardadas e historial personal.', en: 'Control panel for saved lists and personal history.' },
      },
      {
        url: '/projects/pochocleando/5.png',
        title: { es: 'Footer Académico e Integración TMDB', en: 'Academic Footer & TMDB Integration' },
        caption: { es: 'Créditos del desarrollo académico para el IFTS 11.', en: 'Academic development credits for IFTS N°11.' },
      },
    ],
  },

  pokeapp: {
    id: 'pokeapp',
    projectTitle: 'PokeApp',
    badge: {
      es: 'Aplicación Híbrida Web/Móvil · PokeAPI y Firebase',
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
