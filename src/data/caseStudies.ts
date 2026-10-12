import type { CaseStudy } from '../types';

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
        title: { es: 'Dashboard y Contacto Doble Ciego', en: 'Dashboard & Double-Blind Contact' },
        caption: { es: 'Solicitudes de reclutadores con perfil anónimo y aceptación condicional.', en: 'Recruiter requests with anonymous profiles and conditional acceptance.' },
      },
      {
        url: '/projects/skillradar/2.png',
        title: { es: 'Métricas y Score ATS (100/100)', en: 'ATS Score & Metrics Dashboard' },
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
        title: { es: 'Auditoría y Análisis de GitHub', en: 'GitHub Profile & Code Auditor' },
        caption: { es: 'Evaluación automatizada de fortalezas, áreas de mejora y lenguajes.', en: 'Automated evaluation of strengths, opportunities, and languages.' },
      },
      {
        url: '/projects/skillradar/6.png',
        title: { es: 'Creador de CV y Previsualizador ATS A4', en: 'CV Builder & ATS A4 Preview' },
        caption: { es: 'Editor estructurado de currículum con análisis de verbos de impacto.', en: 'Structured resume editor with impact verb evaluation.' },
      },
      {
        url: '/projects/skillradar/7.png',
        title: { es: 'Auditor de Perfil de LinkedIn', en: 'LinkedIn Profile Auditor' },
        caption: { es: 'Evaluación de SEO y visibilidad para reclutadores técnicos.', en: 'SEO and recruiter visibility evaluation for LinkedIn profiles.' },
      },
      {
        url: '/projects/skillradar/8.png',
        title: { es: 'Talent Pool y Búsqueda Semántica', en: 'Talent Pool & Semantic Sourcing' },
        caption: { es: 'Herramienta de Reverse Job-Matching e IA sourcing para reclutadores.', en: 'Reverse Job-Matching tool and AI sourcing suite for recruiters.' },
      },
      {
        url: '/projects/skillradar/9.png',
        title: { es: 'Gestión de Vacantes de Empleo', en: 'Recruiter Jobs Dashboard' },
        caption: { es: 'Panel para la publicación y administración de ofertas laborales.', en: 'Dashboard for creating and managing technical job postings.' },
      },
      {
        url: '/projects/skillradar/10.png',
        title: { es: 'Configuración de IA y BYOK (Cifrado AES-256)', en: 'AI BYOK Configuration (AES-256 Encryption)' },
        caption: { es: 'Almacenamiento seguro de API keys personales y selección de inferencia.', en: 'Secure personal API key storage and preferred inference provider selection.' },
      },
    ],
  },

  dataforge: {
    id: 'dataforge',
    projectTitle: 'DataForge',
    badge: {
      es: 'Plataforma Analítica · DuckDB-Wasm y Local-First',
      en: 'Analytics Platform · Local-First DuckDB-Wasm',
    },
    subtitle: {
      es: 'Plataforma de análisis de datos autoservicio, browser-native y local-first, con motor columnar DuckDB-Wasm en Web Workers y procesamiento sin servidores.',
      en: 'Browser-native, local-first self-service data analytics platform powered by DuckDB-Wasm in Web Workers with zero-cloud computation.',
    },
    overview: {
      es: 'DataForge es una plataforma de análisis y exploración de datos local-first diseñada para ejecutar procesamiento analítico de alto rendimiento directamente en el navegador sin intermediación de servidores de cálculo ni costos de infraestructura. Combina la potencia del motor columnar DuckDB compilado a WebAssembly con parsers dedicados en Web Workers para ofrecer consultas SQL inmediatas, cálculo de agregaciones estadísticas y transformación de datasets tabulares preservando privacidad absoluta de los datos.',
      en: 'DataForge is a local-first data analytics platform built to execute high-performance analytical processing directly in the browser without server-side compute or cloud infrastructure costs. It combines the columnar power of DuckDB compiled to WebAssembly with dedicated Web Worker parsers to provide instant SQL queries, statistical aggregates, and tabular transformations while maintaining absolute data privacy.',
    },
    architectureHighlights: {
      es: [
        'Arquitectura Browser-Native Local-First: procesamiento 100% en el cliente, sin costos de cómputo en la nube ni transferencia externa de datasets confidenciales.',
        'Motor analítico columnar DuckDB-Wasm embebido en un Web Worker dedicado con inicio diferido, reinicio resiliente y contratos tipados.',
        'Canalización de ingesta off-main-thread con parsers de CSV y XLSX en Web Workers dedicados (0 long-tasks, 100k filas procesadas en 867 ms).',
        'Capa de persistencia local estructurada con IndexedDB versionada para guardar proyectos, esquemas, linaje y análisis reproducibles.',
        'Harness de benchmarks automatizado con medianas de 5 corridas y suite integral de tests unitarios (Vitest 20/20) y E2E (Playwright 18/18 en Chromium y Firefox).',
      ],
      en: [
        'Local-First Browser-Native Architecture: 100% client-side data processing with zero cloud compute costs and zero external confidential data transfers.',
        'Columnar analytical engine DuckDB-Wasm embedded in a dedicated Web Worker featuring deferred startup, resilient restart, and typed message contracts.',
        'Off-main-thread ingestion pipeline with dedicated CSV and XLSX Web Worker parsers (0 main-thread long tasks, 100k rows processed in 867 ms).',
        'Structured local persistence layer powered by versioned IndexedDB to store projects, schemas, lineage, and reproducible workflows.',
        'Automated local benchmark harness featuring 5-run medians and full testing suites with Vitest (20/20) and multi-browser Playwright E2E (18/18).',
      ],
    },
    myRoleDetailed: {
      es: [
        'Creador único y arquitecto de software del proyecto, liderando el diseño técnico integral, especificaciones de arquitectura (ADRs) y Roadmap maestro.',
        'Diseñé el protocolo de mensajería RPC tipado entre React 19 / Next.js y el Web Worker analítico para transferir buffers sin serialización pesada.',
        'Construí los parsers de ingesta para CSV y XLSX con detección automática de delimitadores, inferencia de tipos y previews paginados.',
        'Diseñé el modelo de dominio de proyectos y la persistencia transaccional en IndexedDB.',
        'Implementé el arnés de benchmark automatizado y las suites de prueba unitaria y end-to-end con integración continua.',
      ],
      en: [
        'Sole creator and software architect, establishing master technical roadmaps, Architecture Decision Records (ADRs), and core system specifications.',
        'Designed typed RPC messaging protocol between React 19 / Next.js and the analytical Web Worker to transfer buffers without heavy serialization.',
        'Engineered CSV and XLSX parsers with automatic delimiter detection, schema inference, and high-performance paginated previews.',
        'Architected the domain project models and transactional persistence on IndexedDB.',
        'Built automated benchmark harness and rigorous unit and end-to-end testing suites integrated into CI pipelines.',
      ],
    },
    technicalChallenges: {
      es: [
        {
          problem: 'Procesar grandes volúmenes de datos tabulares en el cliente sin bloquear la tasa de refresco ni congelar la interfaz de usuario.',
          solution: 'Aislé todo el cómputo intensivo (ingesta, parseo y motor DuckDB-Wasm) en Web Workers independientes comunicados mediante Transferable Objects y TypedArrays, garantizando 0 long tasks en el hilo principal.',
        },
        {
          problem: 'Permitir que el usuario guarde y retome análisis entre sesiones sin contar con una base de datos en la nube.',
          solution: 'Modelé una capa de persistencia transaccional sobre IndexedDB con versionado de esquemas y contratos de repositorio desacoplados de la UI.',
        },
      ],
      en: [
        {
          problem: 'Processing large tabular datasets on the client without stuttering UI frames or freezing responsiveness.',
          solution: 'Isolated all intensive computing (ingestion, parsing, and DuckDB-Wasm engine) into background Web Workers communicating via Transferable Objects and TypedArrays, ensuring 0 main-thread long tasks.',
        },
        {
          problem: 'Enabling users to save and resume analysis across sessions without relying on a remote cloud database.',
          solution: 'Modeled a transactional persistence layer over IndexedDB featuring schema migrations and pure repository contracts decoupled from the UI.',
        },
      ],
    },
    c4Diagram: {
      title: {
        es: 'Diagrama de Arquitectura Local-First & Worker Pipeline (DataForge)',
        en: 'Local-First & Worker Pipeline Architecture Diagram (DataForge)',
      },
      nodes: [
        { id: 'ui', label: 'Next.js 16 Static UI', desc: 'React 19 + Tailwind CSS + Drag & Drop Workspace', type: 'client' },
        { id: 'parser', label: 'Ingestion Worker (CSV/XLSX)', desc: 'Parsers off-main-thread, inferencia de tipos y previews', type: 'service' },
        { id: 'engine', label: 'DuckDB-Wasm Worker', desc: 'Motor analítico columnar SQL y agregaciones estadísticas', type: 'service' },
        { id: 'store', label: 'IndexedDB Local Store', desc: 'Persistencia local transaccional de proyectos y linaje', type: 'db' },
      ],
      connections: [
        { from: 'ui', to: 'parser', label: 'Raw File Buffers (Transferable)' },
        { from: 'parser', to: 'engine', label: 'Arrow Table / Parquet Streams' },
        { from: 'engine', to: 'ui', label: 'Query Results & Metrics' },
        { from: 'ui', to: 'store', label: 'Project Metadata & Saved Queries' },
      ],
    },
    screenshots: [
      {
        url: '/projects/dataforge/1.png',
        title: { es: 'Espacio de Trabajo Analítico y Panel (Oscuro / Claro)', en: 'Analytical Workspace & Dashboard (Dark / Light)' },
        caption: { es: 'Diseño integral de la suite de análisis con vista de datasets, KPIs y explorador visual.', en: 'Comprehensive analytics suite design with dataset views, KPIs, and visual data explorer.' },
      },
      {
        url: '/projects/dataforge/2.png',
        title: { es: 'Explorador de Tablas y Editor SQL Columnar', en: 'Table Explorer & Columnar SQL Editor' },
        caption: { es: 'Interfaz de consulta reactiva sobre DuckDB-Wasm con sugerencias y vista previa paginada.', en: 'Reactive query interface over DuckDB-Wasm with syntax suggestions and paginated previews.' },
      },
      {
        url: '/projects/dataforge/3.png',
        title: { es: 'Visualizaciones y Preparación de Pipelines de Datos', en: 'Data Visualizations & Pipeline Preparation' },
        caption: { es: 'Gráficos interactivos, agregaciones estadísticas descriptivas y linaje de datos.', en: 'Interactive charts, descriptive statistical aggregations, and data lineage tracking.' },
      },
    ],
  },

  'gridhub-wms': {
    id: 'gridhub-wms',
    projectTitle: 'GridHub WMS',
    badge: {
      es: 'Logística Empresarial · Sistema Multi-Tenant',
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
        'Rediseño modular de Dashboard de Operaciones y Supervisor con Omnibox global, comparativas de actividad entre depósitos y métricas OTIF (SLA).',
        'Motores de almacenamiento y logística interna: algoritmo de Put Away inteligente (clasificación ABC, zona y volumen) y cálculo automático de punto de reorden (ROP).',
        'Flujo de partial pick fulfillment con creación de tareas residuales en la misma orden e idempotency keys en StockMovement y Task.',
        'Módulo de notificaciones de alto valor con control de acceso basado en roles (5 alertas RBAC) y catálogo dinámico de reportes conmutables.',
      ],
      en: [
        'Backend Onion Architecture implemented with FastAPI, decoupling domain logic, application services, and infrastructure.',
        'Strict multi-tenant isolation with PostgreSQL/SQLAlchemy and versioned database migrations with Alembic.',
        'Offline-first synchronization engine in the frontend (React 19 + IndexedDB) featuring local request queues and conflict resolution algorithms.',
        'Supervisor & Operations Dashboard redesign featuring global Omnibox search, cross-warehouse activity comparisons, and OTIF SLA fulfillment metrics.',
        'Internal logistics engines: intelligent Put Away algorithm (ABC classification, zones, and volume) and automated Reorder Point (ROP) calculation.',
        'Partial pick fulfillment workflow with residual task creation and idempotency keys on StockMovement and Task transactions.',
        'High-value notification module with role-based access control (5 RBAC alert types) and switchable dynamic reports catalog.',
      ],
    },
    myRoleDetailed: {
      es: [
        'Co-diseñador de la arquitectura backend multi-tenant y modelado relacional de datos.',
        'Co-diseñé el rediseño del Dashboard de Supervisor/Operaciones con Omnibox global y visualización de SLAs configurados.',
        'Implementé motores de logística interna: sugerencia inteligente de Put Away y cálculo de punto de reorden.',
        'Líder del desarrollo del módulo de notificaciones de alto valor WMS y reporte de incidencias con resiliencia offline.',
        'Diseñé e implementé el flujo de cumplimiento parcial de picking (partial pick fulfillment) y claves de idempotencia.',
        'Implementé el motor de sincronización offline con IndexedDB en el frontend y optimizaciones de consultas en PostgreSQL.',
      ],
      en: [
        'Co-designer of the multi-tenant backend architecture and relational data modeling.',
        'Co-designed the Supervisor & Operations Dashboard redesign featuring global Omnibox search and configured SLA tracking.',
        'Implemented internal logistics engines: intelligent Put Away suggestions and Reorder Point (ROP) calculations.',
        'Lead developer of high-value WMS notifications and offline-resilient incident reporting.',
        'Designed and implemented partial pick fulfillment flows and transaction idempotency keys.',
        'Built the frontend offline sync engine with IndexedDB and executed PostgreSQL query optimizations.',
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
        url: '/projects/prop2/c4-architecture.png',
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
