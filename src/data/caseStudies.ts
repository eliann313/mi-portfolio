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
            es: 'Evalúa densidad y afinidad semántica de skills requeridas, verbos de acción en pretérito perfecto, métricas cuantificables (fórmula X-Y-Z de Google) y estructura estandarizada legible por parsers ATS clásicos.',
            en: 'Evaluates required skills density and semantic matching, past-tense impact action verbs, quantified accomplishments (Google X-Y-Z formula), and ATS-friendly parsing structure.',
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
            es: 'Elimina sesgos en el reclutamiento técnico y protege la privacidad laboral del desarrollador activo, revelando sus datos de contacto solo con consentimiento explícito firmado.',
            en: 'Eliminates hiring bias and shields actively employed developers, unlocking contact details only after explicit cryptographically signed consent.',
          },
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
      es: 'Plataforma Analítica · Runtimes Client-Side y Local-First',
      en: 'Analytics Platform · Client-Side Runtimes & Local-First',
    },
    subtitle: {
      es: 'Plataforma analítica autoservicio y local-first ejecutada 100% en el navegador, que combina DuckDB-Wasm, Python científico (Pyodide) y Rust para análisis libre, finanzas personales en ARS/USD y reportes reproducibles.',
      en: 'Browser-native, local-first self-service analytics platform executing 100% in the browser, combining DuckDB-Wasm, scientific Python (Pyodide), and Rust for open analysis, personal finance in ARS/USD, and reproducible reports.',
    },
    overview: {
      es: 'DataForge es una plataforma de análisis y exploración de datos local-first concebida para que cualquier usuario pueda importar, limpiar, transformar, analizar estadísticamente, visualizar y reportar datos sin servidores ni subida de archivos confidenciales a la nube. Su arquitectura modular desacopla la UI de múltiples runtimes analíticos en Web Workers (DuckDB-Wasm para SQL y columnar, Pyodide para modelos estadísticos en Python, y Rust para algoritmos de alta intensidad) con plantillas especializadas para Análisis Libre, Finanzas Personales (ARS/USD), Negocios y Encuestas.',
      en: 'DataForge is a local-first data exploration and analytics workbench designed to allow anyone to import, clean, transform, model, visualize, and report data without servers or confidential cloud file uploads. Its modular architecture decouples the UI from multiple client-side analytical runtimes in Web Workers (DuckDB-Wasm for columnar SQL, Pyodide for scientific Python models, and Rust for compute-intensive tasks) with dedicated templates for Free Analysis, Personal Finance (ARS/USD), Sales, and Surveys.',
    },
    architectureHighlights: {
      es: [
        'Arquitectura Browser-Native Local-First: procesamiento 100% en el cliente sin costos de cómputo en la nube ni transferencia externa de datasets.',
        'Orquestación Multi-Engine en Web Workers: DuckDB-Wasm como motor SQL columnar primario, Pyodide (Python, NumPy, Pandas, SciPy) para modelos estadísticos/forecasting y Rust/Wasm para algoritmos de alta intensidad (DTW).',
        'Plantillas de dominio especializadas: Análisis Libre, Finanzas Personales (registro manual y bancario en ARS/USD con cotizaciones oficial/MEP/CCL y sin dobles conteos), Ventas y Encuestas.',
        'Canalización de ingesta off-main-thread con parsers de CSV y XLSX en Web Workers dedicados (0 long-tasks en UI, 100k filas procesadas en 867 ms).',
        'Persistencia local estructurada con IndexedDB versionada y OPFS para guardar proyectos, esquemas, linaje y análisis reproducibles.',
        'Harness de benchmarks automatizado con medianas de 5 corridas y suite integral de tests unitarios (Vitest 20/20) y E2E (Playwright 18/18 en Chromium y Firefox).',
      ],
      en: [
        'Local-First Browser-Native Architecture: 100% client-side data processing with zero cloud compute costs and zero external confidential data transfers.',
        'Multi-Engine Orchestration in Web Workers: DuckDB-Wasm for primary columnar SQL, Pyodide (Python, NumPy, Pandas, SciPy) for statistical models/forecasting, and Rust/Wasm for compute-heavy tasks (DTW).',
        'Specialized Domain Templates: Free Analysis, Personal Finance (manual & bank ledger in ARS/USD with official/MEP/CCL rates, avoiding double counts), Sales, and Surveys.',
        'Off-main-thread ingestion pipeline with dedicated CSV and XLSX Web Worker parsers (0 main-thread long tasks, 100k rows processed in 867 ms).',
        'Structured local persistence layer powered by versioned IndexedDB and OPFS to store projects, schemas, lineage, and reproducible workflows.',
        'Automated local benchmark harness featuring 5-run medians and full testing suites with Vitest (20/20) and multi-browser Playwright E2E (18/18).',
      ],
    },
    myRoleDetailed: {
      es: [
        'Creador único y arquitecto de software del proyecto, liderando el diseño técnico integral, especificaciones de arquitectura (ADRs) y Roadmap maestro.',
        'Diseñé la arquitectura modular por capacidades (Screaming / Feature-first) y el orquestador desacoplado de runtimes analíticos cliente (DuckDB-Wasm, Pyodide, Rust).',
        'Modelé los contratos y flujos de plantillas especializadas (Finanzas personales con soporte dual ARS/USD, cotizaciones y conciliación bancaria).',
        'Construí los parsers de ingesta para CSV y XLSX con detección automática de delimitadores, inferencia de tipos y previews paginados off-main-thread.',
        'Implementé el dominio de proyectos con persistencia transaccional en IndexedDB, el harness de benchmark automatizado y las suites de prueba en CI.',
      ],
      en: [
        'Sole creator and software architect, establishing master technical roadmaps, Architecture Decision Records (ADRs), and core system specifications.',
        'Architected feature-first modular system boundaries and the decoupled client-side analytical runtime orchestrator (DuckDB-Wasm, Pyodide, Rust).',
        'Modeled domain contracts and workflows for specialized templates (Personal finance with ARS/USD dual-currency support, market rate schemas, and bank reconciliation).',
        'Engineered off-main-thread CSV and XLSX parsers with automatic delimiter detection, schema inference, and high-performance paginated previews.',
        'Built transactional project domain persistence on IndexedDB, automated benchmark harness, and CI-integrated testing suites.',
      ],
    },
    technicalChallenges: {
      es: [
        {
          problem: 'Coordinar múltiples motores analíticos (DuckDB-Wasm, Pyodide, Rust) en el navegador sin bloquear el render loop de la UI ni asumir copias de memoria zero-copy.',
          solution: 'Diseñé adaptadores dedicados en Web Workers independientes que se comunican mediante contratos tipados y buffers transferibles (Transferable Objects / TypedArrays), garantizando 0 long tasks en la interfaz.',
        },
        {
          problem: 'Modelar plantillas de negocio avanzadas (como Finanzas Personales en ARS/USD) sin violar el principio de inmutabilidad de datos originales.',
          solution: 'Establecí una separación estricta entre la fuente original del dataset y la capa de transformaciones, preservando linaje auditable y permitiendo reconciliación de cotizaciones y categorizaciones reproducibles.',
        },
      ],
      en: [
        {
          problem: 'Coordinating multiple analytical engines (DuckDB-Wasm, Pyodide, Rust) in the browser without freezing the UI render loop or assuming zero-copy memory between WASM boundaries.',
          solution: 'Designed dedicated worker adapters in isolated Web Workers communicating via typed contracts and Transferable Objects / TypedArrays, ensuring 0 main-thread long tasks.',
        },
        {
          problem: 'Modeling complex business templates (like ARS/USD Personal Finance) without violating raw source immutability principles.',
          solution: 'Established strict decoupling between raw dataset sources and transformation layers, maintaining auditable data lineage and reproducible exchange-rate reconciliation.',
        },
      ],
    },
    adrs: {
      title: {
        es: 'Decisiones de Arquitectura Local-First y Motores Cliente',
        en: 'Local-First Architecture & Client Runtimes Decisions',
      },
      items: [
        {
          question: {
            es: '¿Por qué ejecutar los motores en el cliente (DuckDB-Wasm y Pyodide) en vez de un backend tradicional?',
            en: 'Why execute client runtimes (DuckDB-Wasm & Pyodide) instead of a traditional backend?',
          },
          decision: {
            es: 'Garantiza privacidad absoluta al nunca subir datasets confidenciales a la nube (finanzas personales, encuestas, etc.) y elimina los costos de infraestructura de servidores analíticos.',
            en: 'Guarantees zero-trust privacy since sensitive datasets (personal finance, surveys) never leave the browser, while eliminating cloud compute bills.',
          },
        },
        {
          question: {
            es: '¿Por qué Web Workers dedicados para ingesta y cómputo?',
            en: 'Why dedicated Web Workers for ingestion and computation?',
          },
          decision: {
            es: 'Aísla las operaciones intensivas de CPU del hilo principal del navegador, manteniendo la UI en 60 FPS sin bloqueos visuales durante el procesamiento de datos tabulares.',
            en: 'Isolates CPU-heavy parsing and computation from the main UI thread, ensuring a smooth 60 FPS user experience with zero interface freezes.',
          },
        },
      ],
    },
    c4Diagram: {
      title: {
        es: 'Diagrama de Arquitectura Local-First & Motores Cliente (DataForge)',
        en: 'Local-First & Client Engines Architecture Diagram (DataForge)',
      },
      nodes: [
        { id: 'ui', label: 'Next.js 16 UI + ECharts', desc: 'React 19 + Tailwind CSS + Drag & Drop Workspace y plantillas', type: 'client' },
        { id: 'parser', label: 'Ingestion Worker (CSV/XLSX)', desc: 'Parsers off-main-thread, inferencia de tipos y previews', type: 'service' },
        { id: 'engine', label: 'Runtimes WASM (DuckDB/Py/Rust)', desc: 'DuckDB-Wasm (SQL columnar) + Pyodide (Python) + Rust (DTW)', type: 'service' },
        { id: 'store', label: 'IndexedDB + OPFS Store', desc: 'Persistencia local transaccional de proyectos, linaje y análisis', type: 'db' },
      ],
      connections: [
        { from: 'ui', to: 'parser', label: 'Raw File Buffers (Transferable)' },
        { from: 'parser', to: 'engine', label: 'Arrow Tables & Transformed Datasets' },
        { from: 'engine', to: 'ui', label: 'Query Results, Insights & Charts' },
        { from: 'ui', to: 'store', label: 'Project Metadata, Lineage & Local State' },
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
        'Sincronización Offline-First (React 19 + IndexedDB): cola local de mutaciones, reconciliación automática de conflictos y claves de idempotencia para operabilidad ininterrumpida en zonas ciegas.',
        'Integración B2B ERP y Transactional Outbox: API de interoperabilidad con sistemas empresariales externos, catálogo configurable y despacho garantizado de eventos asíncronos sin pérdida de mensajes.',
        'Optimización de PostgreSQL y Calidad de Migraciones: eliminación de consultas N+1, índices parciales para multi-tenancy a escala de producción y pipeline automatizado de salud de migraciones con Alembic.',
        'Motores Algorítmicos de Logística Interna: asignación inteligente de almacenamiento (Put Away por rotación ABC, zona y volumen) y cálculo automático de punto de reorden (ROP).',
        'Rediseño Integral de Inicio por Rol y Omnibox Global: Centro de Mando para Supervisor y Mi Turno para Picker con paleta de comandos calificada (sku:, loc:), comparativas interdepósito y SLAs OTIF.',
        'Gestión Operativa Avanzada: flujo de partial pick fulfillment con tareas residuales, módulo de devoluciones/logística inversa (RMA), transferencias interdepósito y validación en mesas de trabajo con blindaje FIFO/FEFO.',
        'Gobernanza de Calidad y Testing: suites integrales de pruebas de extremo a extremo (E2E) con Playwright sobre PostgreSQL QA real y suites continuas en Vitest y Pytest integradas en CI/CD con GitHub Actions.',
      ],
      en: [
        'Fullstack Screaming Architecture: symmetric organization of the backend into 8 cohesive functional domains (admin, auth, catalog, inventory, warehouse, operations, analytics, integration) decoupling models, 142 schema DTOs, pure OOP services, and thin routers.',
        'Offline-First Synchronization (React 19 + IndexedDB): local mutation queues, automated conflict reconciliation, and transaction idempotency keys for uninterrupted offline warehouse operations.',
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
        'Desarrollé el motor de resiliencia y sincronización offline en React 19 con IndexedDB, incorporando colas transaccionales locales y reporte automatizado de conflictos.',
        'Diseñé la API de integración B2B para sistemas ERP externos e implementé el patrón Transactional Outbox para comunicación asíncrona confiable.',
        'Diseñé y desarrollé de punta a punta el nuevo inicio por rol (Centro de Mando de Supervisor y Mi Turno para Picker), la Omnibox global de búsqueda rápida y el catálogo dinámico de reportes.',
        'Implementé los motores algorítmicos de Put Away inteligente y abastecimiento automático por punto de reorden (ROP).',
        'Optimicé la capa de base de datos en PostgreSQL para producción, erradicando consultas N+1 y creando índices parciales para entornos multi-tenant.',
        'Lideré la validación de calidad del sistema con pruebas Playwright E2E sobre bases PostgreSQL QA reales y suites automatizadas en Vitest y Pytest.',
      ],
      en: [
        'Architected and implemented full-stack Screaming Architecture, structuring the system into 8 cohesive functional domains with 142 normalized DTOs, pure OOP services, and thin routers.',
        'Developed the frontend offline resilience and synchronization engine in React 19 with IndexedDB, featuring local mutation queues and automated conflict reporting.',
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
