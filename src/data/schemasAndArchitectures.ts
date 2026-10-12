import type { CaseStudyDBSchema, SystemArchitecture } from '../types';

// ============================================================================
// 1. GRIDHUB WMS — Schemas & Architecture
// ============================================================================

export const gridhubDBSchema: CaseStudyDBSchema = {
  title: {
    es: 'Modelo de Datos Relacional PostgreSQL — GridHub WMS',
    en: 'PostgreSQL Relational Data Model — GridHub WMS',
  },
  engine: 'PostgreSQL · SQLModel (SQLAlchemy) + Alembic Migrations',
  overview: {
    es: 'Esquema relacional con aislamiento multi-inquilino estricto (client_id indexado), partición topológica en 7 zonas logísticas, control de stock con restricción única cuádruple, cola outbox transaccional y snapshots inmutables de auditoría.',
    en: 'Multi-tenant relational schema with strict tenant isolation (indexed client_id), 7-zone warehouse topology, quad-tuple stock unique constraints, transactional outbox queue, and immutable fulfillment snapshots.',
  },
  tables: [
    {
      name: 'client',
      domain: 'admin',
      description: {
        es: 'Inquilino empresarial raíz. Aísla toda la operatoria y datos del depósito.',
        en: 'Root enterprise tenant. Isolates all operational and inventory data.',
      },
      columns: [
        { name: 'id', type: 'INT', isPk: true },
        { name: 'name', type: 'VARCHAR(100)' },
        { name: 'code', type: 'VARCHAR(50)', isUnique: true },
        { name: 'is_active', type: 'BOOLEAN' },
      ],
    },
    {
      name: 'warehouse',
      domain: 'warehouse',
      description: {
        es: 'Depósito físico. Restricción única de nombre y dirección por inquilino.',
        en: 'Physical warehouse facility. Unique name and address per tenant.',
      },
      columns: [
        { name: 'id', type: 'INT', isPk: true },
        { name: 'client_id', type: 'INT', isFk: true, ref: 'client.id' },
        { name: 'name', type: 'VARCHAR(100)' },
        { name: 'address', type: 'VARCHAR(255)' },
        { name: 'is_active', type: 'BOOLEAN' },
      ],
    },
    {
      name: 'location',
      domain: 'warehouse',
      description: {
        es: 'Ubicación física única (6-tupla) con zona (RECEIVING, PICKING, RESERVE, PACKING, etc.) y volumetría.',
        en: '6-tuple physical storage slot with zone classification and max volumetric capacity.',
      },
      columns: [
        { name: 'id', type: 'INT', isPk: true },
        { name: 'warehouse_id', type: 'INT', isFk: true, ref: 'warehouse.id' },
        { name: 'client_id', type: 'INT', isFk: true, ref: 'client.id' },
        { name: 'zone', type: 'ENUM (RECEIVING, PICKING, RESERVE, PACKING, STAGING_OUT, QUARANTINE, RETURNS)' },
        { name: 'aisle', type: 'VARCHAR(10)' },
        { name: 'rack', type: 'VARCHAR(10)' },
        { name: 'level', type: 'VARCHAR(10)' },
        { name: 'bin', type: 'VARCHAR(10)' },
        { name: 'max_volume', type: 'DECIMAL(15,3)' },
        { name: 'is_pickable', type: 'BOOLEAN' },
      ],
    },
    {
      name: 'item',
      domain: 'catalog',
      description: {
        es: 'Maestro de productos con clasificación ABC, códigos EAN/DUN-14, volumetría y serialización.',
        en: 'Master product item with ABC classification, EAN/DUN-14 barcodes, and dimensions.',
      },
      columns: [
        { name: 'id', type: 'INT', isPk: true },
        { name: 'client_id', type: 'INT', isFk: true, ref: 'client.id' },
        { name: 'sku', type: 'INT' },
        { name: 'name', type: 'VARCHAR(200)' },
        { name: 'ean', type: 'VARCHAR(14)' },
        { name: 'dun14', type: 'VARCHAR(14)' },
        { name: 'uxb', type: 'INT (>0)' },
        { name: 'clasification', type: 'ENUM (A, B, C)' },
        { name: 'volume_per_unit', type: 'DECIMAL(12,3)' },
        { name: 'requires_serial', type: 'BOOLEAN' },
      ],
    },
    {
      name: 'stock',
      domain: 'inventory',
      description: {
        es: 'Balance de stock por ubicación y lote. Restricción única: (item_id, location_id, lot_id, client_id).',
        en: 'Inventory balance per location and lot. Unique constraint: one item per location per lot.',
      },
      columns: [
        { name: 'id', type: 'INT', isPk: true },
        { name: 'client_id', type: 'INT', isFk: true, ref: 'client.id' },
        { name: 'item_id', type: 'INT', isFk: true, ref: 'item.id' },
        { name: 'location_id', type: 'INT', isFk: true, ref: 'location.id' },
        { name: 'lot_id', type: 'INT (NULLABLE)', isFk: true, ref: 'lot.id' },
        { name: 'quantity', type: 'INT' },
        { name: 'reserved_quantity', type: 'INT' },
      ],
    },
    {
      name: 'lot',
      domain: 'inventory',
      description: {
        es: 'Lote de trazabilidad con fecha de recepción y vencimiento para FIFO/FEFO.',
        en: 'Traceability lot record with expiration and receipt dates supporting FEFO/FIFO dispatch.',
      },
      columns: [
        { name: 'id', type: 'INT', isPk: true },
        { name: 'client_id', type: 'INT', isFk: true, ref: 'client.id' },
        { name: 'item_id', type: 'INT', isFk: true, ref: 'item.id' },
        { name: 'lot_number', type: 'VARCHAR(100)' },
        { name: 'expiration_date', type: 'DATE' },
        { name: 'receipt_date', type: 'DATETIME' },
      ],
    },
    {
      name: 'stockmovement',
      domain: 'inventory',
      description: {
        es: 'Libro mayor inmutable de movimientos con check constraint riguroso según movement_type.',
        en: 'Immutable movement ledger strictly validated with location check constraints per type.',
      },
      columns: [
        { name: 'id', type: 'INT', isPk: true },
        { name: 'client_id', type: 'INT', isFk: true, ref: 'client.id' },
        { name: 'item_id', type: 'INT', isFk: true, ref: 'item.id' },
        { name: 'lot_id', type: 'INT (NULLABLE)', isFk: true, ref: 'lot.id' },
        { name: 'quantity', type: 'INT (>0)' },
        { name: 'from_location', type: 'INT (NULLABLE)', isFk: true, ref: 'location.id' },
        { name: 'to_location', type: 'INT (NULLABLE)', isFk: true, ref: 'location.id' },
        { name: 'movement_type', type: 'ENUM (IN, OUT, TRANSFER, ADJ, DELETE, PICK_RECEIPT)' },
        { name: 'movement_date', type: 'DATETIME' },
      ],
    },
    {
      name: 'replenishmentrule',
      domain: 'inventory',
      description: {
        es: 'Regla de reabastecimiento min/max (ROP) para disparo automático RESERVE -> PICKING.',
        en: 'Automated min/max replenishment rule (ROP) from RESERVE high-bay to PICKING.',
      },
      columns: [
        { name: 'id', type: 'INT', isPk: true },
        { name: 'client_id', type: 'INT', isFk: true, ref: 'client.id' },
        { name: 'item_id', type: 'INT', isFk: true, ref: 'item.id' },
        { name: 'location_id', type: 'INT', isFk: true, ref: 'location.id' },
        { name: 'min_quantity', type: 'INT (>=0)' },
        { name: 'max_quantity', type: 'INT (>min)' },
        { name: 'is_active', type: 'BOOLEAN' },
      ],
    },
    {
      name: 'order',
      domain: 'operations',
      description: {
        es: 'Pedido de expedición con estrategia de picking (FIFO/FEFO), fecha de reparto y transportista.',
        en: 'Outbound dispatch order with picking strategy (FIFO/FEFO), delivery route, and carrier.',
      },
      columns: [
        { name: 'id', type: 'INT', isPk: true },
        { name: 'client_id', type: 'INT', isFk: true, ref: 'client.id' },
        { name: 'reference', type: 'VARCHAR(100)' },
        { name: 'status', type: 'ENUM (PENDING, IN_PROGRESS, COMPLETED, CANCELLED)' },
        { name: 'strategy', type: 'ENUM (FIFO, FEFO, NONE)' },
        { name: 'delivery_date', type: 'DATE (INDEXED)' },
        { name: 'carrier', type: 'VARCHAR(100)' },
      ],
    },
    {
      name: 'orderline',
      domain: 'operations',
      description: {
        es: 'Línea de pedido con control de cantidad solicitada vs abastecida.',
        en: 'Order detail line tracking requested vs fulfilled quantities.',
      },
      columns: [
        { name: 'id', type: 'INT', isPk: true },
        { name: 'order_id', type: 'INT', isFk: true, ref: 'order.id' },
        { name: 'client_id', type: 'INT', isFk: true, ref: 'client.id' },
        { name: 'item_id', type: 'INT', isFk: true, ref: 'item.id' },
        { name: 'requested_quantity', type: 'INT (>0)' },
        { name: 'fulfilled_quantity', type: 'INT (>=0)' },
      ],
    },
    {
      name: 'task',
      domain: 'operations',
      description: {
        es: 'Tarea operativa de picking asignada al operario con clave de idempotencia anti-duplicados.',
        en: 'Atomic picking task dispatched to worker devices with idempotency key guard.',
      },
      columns: [
        { name: 'id', type: 'INT', isPk: true },
        { name: 'order_id', type: 'INT', isFk: true, ref: 'order.id' },
        { name: 'item_id', type: 'INT', isFk: true, ref: 'item.id' },
        { name: 'from_location_id', type: 'INT', isFk: true, ref: 'location.id' },
        { name: 'assigned_to_user_id', type: 'INT (NULLABLE)', isFk: true, ref: 'user.id' },
        { name: 'quantity', type: 'INT (>0)' },
        { name: 'status', type: 'ENUM (PENDING, ASSIGNED, IN_PROGRESS, DONE, CANCELLED)' },
        { name: 'idempotency_key', type: 'VARCHAR(255)', isUnique: true },
      ],
    },
    {
      name: 'pickertable',
      domain: 'operations',
      description: {
        es: 'Mesa de trabajo física en tiempo real para empaque, consolidación y validación de órdenes.',
        en: 'Physical packing workstation entity coordinating order assembly and verification.',
      },
      columns: [
        { name: 'id', type: 'INT', isPk: true },
        { name: 'warehouse_id', type: 'INT', isFk: true, ref: 'warehouse.id' },
        { name: 'code', type: 'VARCHAR(50)' },
        { name: 'status', type: 'ENUM (AVAILABLE, IN_USE, VALIDATING, MAINTENANCE)' },
        { name: 'active_user_id', type: 'INT (NULLABLE)', isFk: true, ref: 'user.id' },
        { name: 'order_id', type: 'INT (NULLABLE)', isFk: true, ref: 'order.id' },
        { name: 'packing_location_id', type: 'INT (NULLABLE)', isFk: true, ref: 'location.id' },
      ],
    },
    {
      name: 'orderfulfillment',
      domain: 'operations',
      description: {
        es: 'Snapshot inmutable de cierre de orden. Punto de enlace para sincronización con ERP externo.',
        en: 'Immutable closure snapshot generated when an order finishes. ERP integration point.',
      },
      columns: [
        { name: 'id', type: 'INT', isPk: true },
        { name: 'client_id', type: 'INT', isFk: true, ref: 'client.id' },
        { name: 'order_id', type: 'INT', isUnique: true, isFk: true, ref: 'order.id' },
        { name: 'total_lines', type: 'INT' },
        { name: 'total_units_fulfilled', type: 'INT' },
        { name: 'picker_names', type: 'JSON' },
        { name: 'erp_sync_status', type: 'ENUM (PENDING, SYNCED, ERROR)' },
        { name: 'erp_synced_at', type: 'DATETIME (NULLABLE)' },
      ],
    },
    {
      name: 'erp_outbound_event',
      domain: 'integration',
      description: {
        es: 'Cola del patrón Transactional Outbox para ERP con tokens de leasing y reintentos exponenciales.',
        en: 'Transactional Outbox event queue with distributed lease tokens and retry backoff.',
      },
      columns: [
        { name: 'id', type: 'INT', isPk: true },
        { name: 'client_id', type: 'INT', isFk: true, ref: 'client.id' },
        { name: 'event_id', type: 'UUID', isUnique: true },
        { name: 'event_type', type: 'ENUM (ORDER_CLOSED, ORDER_DISPATCHED, RECEIPT_CONFIRMED, STOCK_ADJUSTED)' },
        { name: 'aggregate_type', type: 'VARCHAR(64)' },
        { name: 'aggregate_id', type: 'INT' },
        { name: 'payload_json', type: 'TEXT' },
        { name: 'status', type: 'ENUM (PENDING, PROCESSING, SENT, ERROR)' },
        { name: 'lease_token', type: 'VARCHAR(36) (NULLABLE)' },
        { name: 'lease_expires_at', type: 'DATETIME (NULLABLE)' },
      ],
    },
  ],
  relationships: [
    { from: 'client', to: 'warehouse', type: '1:N', label: 'Inquilino posee depósitos' },
    { from: 'warehouse', to: 'location', type: '1:N', label: 'Topología física de ubicaciones' },
    { from: 'item', to: 'stock', type: '1:N', label: 'Balance de existencias' },
    { from: 'location', to: 'stock', type: '1:N', label: 'Stock asignado en posición' },
    { from: 'lot', to: 'stock', type: '1:N', label: 'Trazabilidad por lote' },
    { from: 'location', to: 'replenishmentrule', type: '1:N', label: 'Regla de reorden en picking' },
    { from: 'order', to: 'orderline', type: '1:N', label: 'Líneas de la orden' },
    { from: 'order', to: 'task', type: '1:N', label: 'Tareas operativas de picking' },
    { from: 'order', to: 'orderfulfillment', type: '1:1', label: 'Documento inmutable de cierre' },
    { from: 'orderfulfillment', to: 'erp_outbound_event', type: '1:1', label: 'Disparo a Transactional Outbox' },
    { from: 'warehouse', to: 'pickertable', type: '1:N', label: 'Mesas físicas de preparación' },
    { from: 'stock', to: 'stockmovement', type: '1:N', label: 'Kardex inmutable de movimientos' },
  ],
};

export const gridhubArchitecture: SystemArchitecture = {
  title: {
    es: 'Arquitectura de Sistema — GridHub WMS',
    en: 'System Architecture — GridHub WMS',
  },
  summary: {
    es: 'Arquitectura por capas con Screaming Architecture en 8 dominios, resiliencia offline-first en clientes móviles, Transactional Outbox hacia ERPs y PostgreSQL optimizado.',
    en: 'Layered Screaming Architecture across 8 functional domains, offline-first mobile client resilience, Transactional Outbox for external ERPs, and optimized PostgreSQL.',
  },
  layers: [
    {
      name: { es: 'Capa Cliente Móvil & Web', en: 'Mobile & Web Client Layer' },
      badge: { es: 'Frontend PWA', en: 'Frontend PWA' },
      color: '#3B82F6',
      components: [
        {
          name: 'React 19 + Vite + Tailwind v4',
          desc: { es: 'Dashboard por rol (Supervisor / Picker) y Omnibox con búsqueda calificada.', en: 'Role-based dashboards (Supervisor / Picker) and qualified Omnibox palette.' },
          tech: { es: 'Framework UI', en: 'UI Framework' },
        },
        {
          name: 'Dexie.js 4.4 + dexie-react-hooks',
          desc: { es: 'Almacenamiento reactivo local en IndexedDB y cola FIFO de mutaciones offline.', en: 'Local reactive IndexedDB store with FIFO offline mutation queue.' },
          tech: { es: 'Almacén Local Reactivo', en: 'Local-First Store' },
        },
        {
          name: 'Vite PWA Service Worker',
          desc: { es: 'Caché de estáticos para operatividad continua sin conexión de red.', en: 'App shell caching ensuring uninterrupted warehouse floor operation.' },
          tech: { es: 'Service Worker PWA', en: 'PWA Service Worker' },
        },
      ],
    },
    {
      name: { es: 'Capa de Entrada & API Gateway', en: 'API Gateway & Entry Layer' },
      badge: { es: 'Backend FastAPI', en: 'FastAPI Backend' },
      color: '#10B981',
      components: [
        {
          name: { es: 'Routers Delgados FastAPI (8 Dominios)', en: 'FastAPI Thin Routers (8 Domains)' },
          desc: { es: 'Endpoints desacoplados organizados por dominio funcional (admin, auth, catalog, etc.).', en: 'Thin routers cleanly organized per functional domain package.' },
          tech: 'Python 3.12',
        },
        {
          name: { es: 'Pydantic v2 (142 DTOs Normalizados)', en: 'Pydantic v2 (142 Normalized DTOs)' },
          desc: { es: 'Validación estricta de payloads, contratos de entrada/salida y serialización.', en: 'Strict contract schemas, runtime validation, and serialization.' },
          tech: { es: 'Contratos de Datos', en: 'Data Contracts' },
        },
        {
          name: { es: 'Inyección de Dependencias JWT & Multi-tenant', en: 'JWT & Multi-tenant Dependency Injection' },
          desc: { es: 'Inyección de sesión de usuario y contexto de tenant client_id verificado.', en: 'Session context injection with verified client_id tenant isolation.' },
          tech: { es: 'Seguridad & RBAC', en: 'Security & RBAC' },
        },
      ],
    },
    {
      name: { es: 'Capa de Servicios de Dominio', en: 'Domain Service Layer' },
      badge: { es: 'Dominio Central', en: 'Core Business' },
      color: '#F59E0B',
      components: [
        {
          name: { es: 'Servicio de Movimientos & Ubicaciones', en: 'Movement & Allocation Service' },
          desc: { es: 'Motor de Put Away inteligente (ABC y volumetría) y reglas de reorden (ROP).', en: 'Smart Put Away allocation (ABC velocity & volume) and ROP triggers.' },
          tech: { es: 'Motor Logístico', en: 'Logistics Engine' },
        },
        {
          name: { es: 'Servicio de Picking & Mesas de Armado', en: 'Picking & Table Service' },
          desc: { es: 'Asignación de tareas con estrategia FIFO/FEFO y verificación en mesas de armado.', en: 'FIFO/FEFO picking tasks and packing table verification workflows.' },
          tech: { es: 'Operaciones', en: 'Operations' },
        },
        {
          name: { es: 'Worker Daemon de Despacho al ERP', en: 'ERP Outbound Worker Daemon' },
          desc: { es: 'Worker en background que reclama eventos outbox mediante tokens de leasing.', en: 'Background worker claiming pending outbox events using lease tokens.' },
          tech: { es: 'Worker Asíncrono', en: 'Async Worker' },
        },
      ],
    },
    {
      name: { es: 'Capa de Persistencia & Base de Datos', en: 'Persistence & Database Layer' },
      badge: { es: 'PostgreSQL Relacional', en: 'PostgreSQL Relational' },
      color: '#8B5CF6',
      components: [
        {
          name: { es: 'Motor Relacional PostgreSQL', en: 'PostgreSQL Relational Engine' },
          desc: { es: 'Restricciones de integridad referencial, índices parciales multi-tenant y checks.', en: 'Foreign keys, partial tenant indexes, and check constraints.' },
          tech: { es: 'Base de Datos', en: 'Database' },
        },
        {
          name: { es: 'Mapeo Objeto-Relacional SQLModel & Alembic', en: 'SQLModel & SQLAlchemy ORM' },
          desc: { es: 'Mapeo objeto-relacional tipado con migraciones versionadas de Alembic.', en: 'Type-safe ORM mapping with automated Alembic migration pipeline.' },
          tech: { es: 'ORM & Migraciones', en: 'ORM & Migrations' },
        },
      ],
    },
  ],
  dataFlow: [
    { step: 1, title: { es: 'Operación Offline', en: 'Offline Operation' }, desc: { es: 'El operario confirma una tarea de picking sin señal; Dexie.js persiste la mutación en cola local con idempotency_key.', en: 'Worker completes pick without signal; Dexie.js enqueues mutation with idempotency_key.' } },
    { step: 2, title: { es: 'Reconexión & Sync', en: 'Reconnection & Sync' }, desc: { es: 'Al detectar conexión, useOfflineSync envía la cola en lote; FastAPI valida idempotencia y ejecuta movimientos.', en: 'Network restored; useOfflineSync flushes queue; FastAPI validates idempotency and applies movements.' } },
    { step: 3, title: { es: 'Cierre & Snapshot', en: 'Closure & Snapshot' }, desc: { es: 'Al completarse la orden, se genera un OrderFulfillment inmutable y se inserta un evento en ERPOutboundEvent en la misma transacción.', en: 'Order completes; an immutable OrderFulfillment and ERPOutboundEvent are inserted in one single transaction.' } },
    { step: 4, title: { es: 'Despacho al ERP', en: 'ERP Dispatch' }, desc: { es: 'El worker asíncrono toma el evento con lease_token, lo envía al ERP externo y marca el evento como SENT.', en: 'Outbound worker claims event with lease_token, posts to external ERP, and marks event SENT.' } },
  ],
};

// ============================================================================
// 2. SKILLRADAR — Schemas & Architecture
// ============================================================================

export const skillradarDBSchema: CaseStudyDBSchema = {
  title: {
    es: 'Modelo de Datos Relacional PostgreSQL — SkillRadar',
    en: 'PostgreSQL Relational Data Model — SkillRadar',
  },
  engine: 'Neon PostgreSQL Serverless · Prisma 7.10.0',
  overview: {
    es: 'Esquema relacional dual (desarrollador y reclutador) en Neon PostgreSQL. Soporta autenticación Auth.js v5, almacenamiento estructurado de análisis ATS en JSON, cifrado de claves personales con AES-256-GCM y privacidad de doble ciego mediante ofuscación y revelación por estado.',
    en: 'Dual-role relational schema in Neon PostgreSQL. Powers Auth.js v5, structured JSON ATS analysis storage, AES-256-GCM encrypted BYOK keys, and Double-Blind candidate privacy with state-driven revelation.',
  },
  tables: [
    {
      name: 'User',
      domain: 'auth',
      description: {
        es: 'Usuario dual-role (desarrollador y reclutador) con claves BYOK cifradas (AES-256-GCM).',
        en: 'Dual-role user entity with AES-256-GCM encrypted BYOK keys.',
      },
      columns: [
        { name: 'id', type: 'CUID', isPk: true },
        { name: 'email', type: 'VARCHAR', isUnique: true },
        { name: 'role', type: 'VARCHAR (Rol)' },
        { name: 'geminiApiKey', type: 'TEXT (Cifrado)' },
        { name: 'groqApiKey', type: 'TEXT (Cifrado)' },
        { name: 'defaultAiProvider', type: 'VARCHAR' },
        { name: 'defaultAiModel', type: 'VARCHAR' },
        { name: 'careerPath', type: 'VARCHAR (NULLABLE)' },
        { name: 'isPublicProfile', type: 'BOOLEAN' },
        { name: 'publicUsername', type: 'VARCHAR (UNIQUE)' },
      ],
    },
    {
      name: 'Resume',
      domain: 'cv',
      description: {
        es: 'CV subido y parseado (pdf-parse). Contiene el texto crudo y el análisis JSON estructurado (0-100 STAR).',
        en: 'Uploaded CV parsed text and structured JSON ATS evaluation (0-100 STAR rubric).',
      },
      columns: [
        { name: 'id', type: 'CUID', isPk: true },
        { name: 'userId', type: 'CUID', isFk: true, ref: 'User.id' },
        { name: 'fileName', type: 'VARCHAR' },
        { name: 'rawText', type: 'TEXT' },
        { name: 'atsScore', type: 'INT (0-100)' },
        { name: 'analysis', type: 'JSON (Rubro aditivo STAR, keywords, legibilidad, gaps)' },
        { name: 'isActive', type: 'BOOLEAN' },
      ],
    },
    {
      name: 'JobMatch',
      domain: 'matching',
      description: {
        es: 'Evaluación de compatibilidad entre un CV activo y una descripción de oferta laboral pegada por el usuario.',
        en: 'Match evaluation comparing active CV against pasted job description.',
      },
      columns: [
        { name: 'id', type: 'CUID', isPk: true },
        { name: 'userId', type: 'CUID', isFk: true, ref: 'User.id' },
        { name: 'resumeId', type: 'CUID (NULLABLE)', isFk: true, ref: 'Resume.id' },
        { name: 'jobOfferText', type: 'TEXT' },
        { name: 'matchScore', type: 'INT (0-100)' },
        { name: 'analysis', type: 'JSON (Skills coincidentes, faltantes y recomendaciones)' },
      ],
    },
    {
      name: 'GithubAnalysis',
      domain: 'analytics',
      description: {
        es: 'Análisis de actividad y calidad en GitHub: patrones de commit, calidad de READMEs y señales de seniority.',
        en: 'GitHub profile telemetry: commit streaks, README quality, and seniority signals.',
      },
      columns: [
        { name: 'id', type: 'CUID', isPk: true },
        { name: 'userId', type: 'CUID', isFk: true, ref: 'User.id' },
        { name: 'githubUser', type: 'VARCHAR' },
        { name: 'profileScore', type: 'INT' },
        { name: 'senioritySignals', type: 'JSON' },
        { name: 'detectedPatterns', type: 'JSON' },
      ],
    },
    {
      name: 'InterviewSession',
      domain: 'simulator',
      description: {
        es: 'Sesión de entrevista interactiva con IA: registro conversacional y debriefing de retroalimentación.',
        en: 'Interactive AI mock interview session tracking messages and contextual debrief.',
      },
      columns: [
        { name: 'id', type: 'CUID', isPk: true },
        { name: 'userId', type: 'CUID', isFk: true, ref: 'User.id' },
        { name: 'company', type: 'VARCHAR' },
        { name: 'score', type: 'INT (NULLABLE)' },
        { name: 'messages', type: 'JSON (Historial del simulador)' },
        { name: 'debrief', type: 'JSON (Fortalezas y áreas de mejora)' },
      ],
    },
    {
      name: 'JobPosting',
      domain: 'recruiter',
      description: {
        es: 'Búsqueda laboral publicada por un reclutador con habilidades requeridas y etapas de pipeline.',
        en: 'Recruiter job vacancy posting with required skills taxonomy and hiring stages.',
      },
      columns: [
        { name: 'id', type: 'CUID', isPk: true },
        { name: 'recruiterId', type: 'CUID', isFk: true, ref: 'User.id' },
        { name: 'title', type: 'VARCHAR' },
        { name: 'company', type: 'VARCHAR' },
        { name: 'location', type: 'VARCHAR' },
        { name: 'remoteType', type: 'VARCHAR (remote, hybrid, onsite)' },
        { name: 'requiredSkills', type: 'JSON' },
        { name: 'status', type: 'VARCHAR (draft, published, closed)' },
      ],
    },
    {
      name: 'ContactRequest',
      domain: 'recruiter',
      description: {
        es: 'Núcleo del Doble Ciego: reclutador contacta con perfil anonimizado (DEV-XXXXXX); datos revelados al aceptar.',
        en: 'Double-Blind core: recruiter reaches candidate anonymously; contact unmasked upon acceptance.',
      },
      columns: [
        { name: 'id', type: 'CUID', isPk: true },
        { name: 'recruiterId', type: 'CUID', isFk: true, ref: 'User.id' },
        { name: 'developerId', type: 'CUID', isFk: true, ref: 'User.id' },
        { name: 'message', type: 'TEXT' },
        { name: 'status', type: 'VARCHAR (pending, accepted, declined)' },
      ],
    },
    {
      name: 'JobPostingApplication',
      domain: 'recruiter',
      description: {
        es: 'Postulación formal de un desarrollador a una vacante con vinculación de CV.',
        en: 'Candidate application to a specific job vacancy with linked resume.',
      },
      columns: [
        { name: 'id', type: 'CUID', isPk: true },
        { name: 'jobPostingId', type: 'CUID', isFk: true, ref: 'JobPosting.id' },
        { name: 'developerId', type: 'CUID', isFk: true, ref: 'User.id' },
        { name: 'resumeId', type: 'CUID (NULLABLE)', isFk: true, ref: 'Resume.id' },
        { name: 'status', type: 'VARCHAR (submitted, screening, interview, hired, rejected)' },
      ],
    },
    {
      name: 'InterviewScorecard',
      domain: 'recruiter',
      description: {
        es: 'Ficha de evaluación técnica estructurada 1:1 con la postulación del candidato.',
        en: 'Structured evaluation scorecard in 1:1 relationship with job application.',
      },
      columns: [
        { name: 'id', type: 'CUID', isPk: true },
        { name: 'applicationId', type: 'CUID', isUnique: true, isFk: true, ref: 'JobPostingApplication.id' },
        { name: 'recruiterId', type: 'CUID', isFk: true, ref: 'User.id' },
        { name: 'criteria', type: 'JSON' },
        { name: 'overall', type: 'INT' },
        { name: 'comment', type: 'TEXT (NULLABLE)' },
      ],
    },
    {
      name: 'RoadmapTask',
      domain: 'copilot',
      description: {
        es: 'Plan de acción personalizado del Career Copilot con tareas e hitos de aprendizaje.',
        en: 'Personalized career copilot roadmap task generated from skill gaps.',
      },
      columns: [
        { name: 'id', type: 'CUID', isPk: true },
        { name: 'userId', type: 'CUID', isFk: true, ref: 'User.id' },
        { name: 'skill', type: 'VARCHAR' },
        { name: 'step', type: 'VARCHAR' },
        { name: 'done', type: 'BOOLEAN' },
      ],
    },
  ],
  relationships: [
    { from: 'User', to: 'Resume', type: '1:N', label: 'Candidato posee versiones de CV' },
    { from: 'Resume', to: 'JobMatch', type: '1:N', label: 'CV evaluado contra vacantes' },
    { from: 'User', to: 'GithubAnalysis', type: '1:N', label: 'Auditoría técnica de repositorios' },
    { from: 'User', to: 'InterviewSession', type: '1:N', label: 'Sesiones de simulador con IA' },
    { from: 'User', to: 'JobPosting', type: '1:N', label: 'Reclutador publica vacantes' },
    { from: 'JobPosting', to: 'JobPostingApplication', type: '1:N', label: 'Postulaciones recibidas' },
    { from: 'JobPostingApplication', to: 'InterviewScorecard', type: '1:1', label: 'Ficha de puntuación técnica' },
    { from: 'User', to: 'ContactRequest', type: '1:N', label: 'Solicitud con blindaje Doble Ciego' },
    { from: 'User', to: 'RoadmapTask', type: '1:N', label: 'Hitos del Career Copilot' },
  ],
};

export const skillradarArchitecture: SystemArchitecture = {
  title: {
    es: 'Arquitectura de Sistema — SkillRadar',
    en: 'System Architecture — SkillRadar',
  },
  summary: {
    es: 'Arquitectura moderna con Next.js 16 App Router, Vercel AI SDK orquestando cascadas multi-modelo (Gemini 3.8 Flash, Groq, OpenRouter), cifrado AES-256-GCM y persistencia serverless en Neon Postgres.',
    en: 'Modern architecture with Next.js 16 App Router, Vercel AI SDK multi-model failover cascade (Gemini 3.8 Flash, Groq, OpenRouter), AES-256-GCM encryption, and Neon Postgres.',
  },
  layers: [
    {
      name: { es: 'Capa Frontend & Experiencia', en: 'Frontend & UX Layer' },
      badge: { es: 'Next.js 16 SSR', en: 'Next.js 16 SSR' },
      color: '#3B82F6',
      components: [
        {
          name: 'React 19 Server & Client Components',
          desc: { es: 'Vistas optimizadas con streaming SSR, Tailwind CSS y animaciones fluidas con Framer Motion.', en: 'Streaming SSR components with Tailwind CSS and Framer Motion animations.' },
          tech: 'Next.js App Router',
        },
        {
          name: { es: 'Radar de Habilidades & Simulador UI', en: 'Skill Radar & Mock Simulator UI' },
          desc: { es: 'Visualizador de radar SVG interactivo y simulador de chat en tiempo real.', en: 'Interactive SVG skill radar chart and real-time chat mock simulator.' },
          tech: { es: 'UI Interactiva', en: 'Interactive UI' },
        },
      ],
    },
    {
      name: { es: 'Capa de Seguridad, Criptografía & PII', en: 'Security, Crypto & PII Layer' },
      badge: { es: 'Blindaje Anti-Fugas', en: 'Zero-Leak Guard' },
      color: '#EF4444',
      components: [
        {
          name: { es: 'Bóveda Cifrada AES-256-GCM', en: 'AES-256-GCM Secret Vault' },
          desc: { es: 'Cifrado simétrico de API keys del usuario (BYOK) persistidas en Postgres y descifradas solo en memoria.', en: 'AES-256-GCM encryption for BYOK keys decrypted strictly in server memory.' },
          tech: { es: 'Criptografía Node', en: 'Node Crypto' },
        },
        {
          name: { es: 'Doble Ciego & Sanitizador SHA-256', en: 'Double-Blind & SHA-256 Obfuscator' },
          desc: { es: 'Genera identificadores anónimos DEV-XXXXXX y remueve nombres, emails y teléfonos antes de la IA y el Talent Pool.', en: 'SHA-256 DEV-XXXXXX anonymizer stripping PII before LLM calls and Talent Pool.' },
          tech: { es: 'Sanitizador de PII', en: 'PII Sanitizer' },
        },
        {
          name: 'Upstash Redis Rate Limiting',
          desc: { es: 'Control de cuotas y protección contra abuso en endpoints de inferencia de IA.', en: 'Sliding-window rate limiter preventing API abuse on AI endpoints.' },
          tech: 'Upstash Redis',
        },
      ],
    },
    {
      name: { es: 'Capa de Orquestación de IA & LLMs', en: 'AI Orchestration & LLM Layer' },
      badge: { es: 'Orquestación AI SDK', en: 'Vercel AI SDK' },
      color: '#8B5CF6',
      components: [
        {
          name: { es: 'Cascada Multi-Proveedor Resiliente', en: 'Resilient Multi-Provider Cascade' },
          desc: { es: 'Enrutamiento primario a Gemini 3.8 Flash con failover automático a Gemini 3.7, Groq y OpenRouter.', en: 'Gemini 3.8 Flash primary with automated fallback to Gemini 3.7, Groq, and OpenRouter.' },
          tech: { es: 'Failover Multi-Modelo', en: 'Multi-LLM Failover' },
        },
        {
          name: { es: 'Inferencia Estructurada con Zod', en: 'Zod Structured Inference' },
          desc: { es: 'Extracción estricta de ATS (rúbrica 0-100 aditiva, verbos de impacto y métricas STAR) con clamp determinista.', en: 'Zod structured JSON extraction with deterministic validation and clamping.' },
          tech: { es: 'Validación Zod', en: 'Zod & Schema Guard' },
        },
        {
          name: { es: 'Simulador Heurístico Offline', en: 'Offline Heuristic Simulator' },
          desc: { es: 'Motor de contingencia local basado en expresiones regulares y 22 keywords cuando no hay keys activas.', en: 'Local regex keyword parser fallback ensuring 100% test reliability.' },
          tech: { es: 'Contingencia Offline', en: 'Offline Fallback' },
        },
      ],
    },
    {
      name: { es: 'Capa de Persistencia Serverless', en: 'Serverless Persistence Layer' },
      badge: { es: 'Base de Datos Cloud', en: 'Cloud Database' },
      color: '#10B981',
      components: [
        {
          name: 'Neon PostgreSQL Serverless',
          desc: { es: 'Base de datos en la nube con escalado a cero, pooling de conexiones y latencia ultra-baja.', en: 'Cloud database with scale-to-zero, connection pooling, and low latency.' },
          tech: { es: 'Postgres Serverless', en: 'Serverless Postgres' },
        },
        {
          name: 'Prisma ORM 7.10.0',
          desc: { es: 'Cliente tipado con soporte de transacciones y adaptadores de pool para Neon.', en: 'Type-safe client with pool adapters for serverless PostgreSQL.' },
          tech: 'Prisma Client',
        },
      ],
    },
  ],
  dataFlow: [
    { step: 1, title: { es: 'Ingesta de CV', en: 'CV Ingestion' }, desc: { es: 'El candidato sube su PDF; pdf-parse extrae texto y el sanitizador elimina PII (email, teléfono, links) antes de cualquier llamada externa.', en: 'Candidate uploads PDF; pdf-parse extracts text and sanitizer strips PII before external calls.' } },
    { step: 2, title: { es: 'Inferencia & Rúbrica ATS', en: 'Inference & ATS Rubric' }, desc: { es: 'Vercel AI SDK invoca a Gemini 3.8 Flash con esquema Zod; se evalúan secciones estándar, keywords en contexto y métricas STAR.', en: 'Vercel AI SDK queries Gemini 3.8 Flash with Zod schema, grading contact info, keywords, and STAR achievements.' } },
    { step: 3, title: { es: 'Talent Pool Doble Ciego', en: 'Double-Blind Talent Pool' }, desc: { es: 'El candidato figura con hash DEV-XXXXXX en el Talent Pool; reclutadores ven skills y scores pero no sus datos personales.', en: 'Candidate appears with DEV-XXXXXX hash in talent pool; recruiters see skills and score but no personal PII.' } },
    { step: 4, title: { es: 'Revelación por Consentimiento', en: 'Consent-Based Unmasking' }, desc: { es: 'Si el reclutador envía ContactRequest y el desarrollador la acepta, el backend conmuta el estado en DB y expone los datos de contacto.', en: 'When candidate accepts ContactRequest, backend updates status in DB and safely unmasks contact info.' } },
  ],
};

// ============================================================================
// 3. PROP² — Schemas & Architecture
// ============================================================================

export const prop2DBSchema: CaseStudyDBSchema = {
  title: {
    es: 'Modelo de Datos Relacional PostgreSQL — Prop²',
    en: 'PostgreSQL Relational Data Model — Prop²',
  },
  engine: 'Neon PostgreSQL Serverless · Prisma ORM',
  overview: {
    es: 'Esquema relacional de marketplace inmobiliario con búsqueda full-text nativa acelerada por tsvector y GIN en PostgreSQL, tipos numéricos Decimal(14,2) para evitar errores de redondeo en precios y expensas, y desacoplamiento multimedia con Cloudinary.',
    en: 'Real estate marketplace schema featuring native PostgreSQL full-text search with tsvector and GIN index, Decimal(14,2) precision for prices and fees, and decoupled Cloudinary media management.',
  },
  tables: [
    {
      name: 'usuario',
      domain: 'auth',
      description: {
        es: 'Usuario de la plataforma (comprador, vendedor, admin). Compatible con PrismaAdapter de Auth.js v5.',
        en: 'Platform user (buyer, seller, admin) fully compatible with Auth.js v5 PrismaAdapter.',
      },
      columns: [
        { name: 'id', type: 'UUID', isPk: true },
        { name: 'email', type: 'VARCHAR', isUnique: true },
        { name: 'name', type: 'VARCHAR (NULLABLE)' },
        { name: 'rol', type: 'ENUM (comprador, vendedor, admin)' },
        { name: 'estado', type: 'ENUM (activo, baneado)' },
        { name: 'telefono', type: 'VARCHAR (NULLABLE)' },
      ],
    },
    {
      name: 'publicacion',
      domain: 'properties',
      description: {
        es: 'Inmueble publicado con geocodificación Nominatim, precios Decimal(14,2) y columna generada tsvector con índice GIN.',
        en: 'Property listing with Nominatim geocoordinates, Decimal precision, and generated tsvector with GIN index.',
      },
      columns: [
        { name: 'id', type: 'UUID', isPk: true },
        { name: 'usuario_id', type: 'UUID', isFk: true, ref: 'usuario.id' },
        { name: 'titulo', type: 'VARCHAR(255)' },
        { name: 'descripcion', type: 'TEXT' },
        { name: 'tipo_inmueble', type: 'ENUM (casa, depto, ph, terreno, local, oficina, galpon, cochera)' },
        { name: 'operacion', type: 'ENUM (venta, alquiler)' },
        { name: 'precio', type: 'DECIMAL(14,2) (Sin redondeo binario)' },
        { name: 'moneda', type: 'ENUM (ARS, USD)' },
        { name: 'expensas', type: 'DECIMAL(14,2) (NULLABLE, siempre ARS)' },
        { name: 'provincia', type: 'VARCHAR(100)' },
        { name: 'ciudad', type: 'VARCHAR(100)' },
        { name: 'barrio', type: 'VARCHAR(100) (NULLABLE)' },
        { name: 'latitud', type: 'DECIMAL(10,7)' },
        { name: 'longitud', type: 'DECIMAL(10,7)' },
        { name: 'superficie_cubierta', type: 'DECIMAL(10,2)' },
        { name: 'superficie_total', type: 'DECIMAL(10,2)' },
        { name: 'ambientes', type: 'INT (NULLABLE)' },
        { name: 'dormitorios', type: 'INT (NULLABLE)' },
        { name: 'banios', type: 'INT (NULLABLE)' },
        { name: 'estado_publicacion', type: 'ENUM (borrador, activa, pausada, eliminada)' },
        { name: 'busqueda', type: 'tsvector GENERATED ALWAYS (Índice GIN publicacion_busqueda_idx)' },
      ],
    },
    {
      name: 'imagen_publicacion',
      domain: 'media',
      description: {
        es: 'Fotografías vinculadas con public_id de Cloudinary para orden, portada y borrado individual.',
        en: 'Photos with Cloudinary public_id enabling sorting, cover selection, and atomic deletion.',
      },
      columns: [
        { name: 'id', type: 'UUID', isPk: true },
        { name: 'publicacion_id', type: 'UUID', isFk: true, ref: 'publicacion.id' },
        { name: 'public_id', type: 'VARCHAR (Cloudinary public ID)' },
        { name: 'url', type: 'VARCHAR' },
        { name: 'url_thumbnail', type: 'VARCHAR (NULLABLE)' },
        { name: 'orden', type: 'INT' },
        { name: 'es_portada', type: 'BOOLEAN' },
      ],
    },
    {
      name: 'caracteristica',
      domain: 'catalog',
      description: {
        es: 'Catálogo de comodidades y servicios (apto crédito, piscina, cochera, seguridad, etc.).',
        en: 'Amenities and services taxonomy (pool, parking, security, credit-eligible).',
      },
      columns: [
        { name: 'id', type: 'UUID', isPk: true },
        { name: 'nombre', type: 'VARCHAR', isUnique: true },
        { name: 'slug', type: 'VARCHAR', isUnique: true },
        { name: 'categoria', type: 'ENUM (servicio, comodidad)' },
      ],
    },
    {
      name: 'publicacion_caracteristica',
      domain: 'catalog',
      description: {
        es: 'Tabla intermedia N:M entre publicaciones y comodidades para filtrado combinable.',
        en: 'N:M join table linking property listings with amenities for combinable filters.',
      },
      columns: [
        { name: 'publicacion_id', type: 'UUID', isPk: true, isFk: true, ref: 'publicacion.id' },
        { name: 'caracteristica_id', type: 'UUID', isPk: true, isFk: true, ref: 'caracteristica.id' },
      ],
    },
    {
      name: 'favorito',
      domain: 'social',
      description: {
        es: 'Inmuebles guardados por usuarios con restricción única compuesta (usuario_id, publicacion_id).',
        en: 'Saved favorite properties guarded with composite unique constraint.',
      },
      columns: [
        { name: 'id', type: 'UUID', isPk: true },
        { name: 'usuario_id', type: 'UUID', isFk: true, ref: 'usuario.id' },
        { name: 'publicacion_id', type: 'UUID', isFk: true, ref: 'publicacion.id' },
      ],
    },
    {
      name: 'mensaje_contacto',
      domain: 'crm',
      description: {
        es: 'Consulta o lead comercial. Soporta compradores anónimos (usuario_id nullable) y canal (WhatsApp, form, email).',
        en: 'Lead inquiry supporting guest buyers (nullable usuario_id) and channel preferences.',
      },
      columns: [
        { name: 'id', type: 'UUID', isPk: true },
        { name: 'publicacion_id', type: 'UUID', isFk: true, ref: 'publicacion.id' },
        { name: 'usuario_id', type: 'UUID (NULLABLE)', isFk: true, ref: 'usuario.id' },
        { name: 'nombre_contacto', type: 'VARCHAR' },
        { name: 'email_contacto', type: 'VARCHAR' },
        { name: 'telefono_contacto', type: 'VARCHAR (NULLABLE)' },
        { name: 'mensaje', type: 'TEXT' },
        { name: 'medio_contacto', type: 'ENUM (whatsapp, formulario, email)' },
        { name: 'estado', type: 'ENUM (nueva, leida, atendida)' },
      ],
    },
    {
      name: 'token_verificacion',
      domain: 'auth',
      description: {
        es: 'Tokens de un solo uso con hash SHA-256 para verificación de email y recuperación de contraseña.',
        en: 'Single-use SHA-256 hashed tokens for email verification and password resets.',
      },
      columns: [
        { name: 'id', type: 'UUID', isPk: true },
        { name: 'usuario_id', type: 'UUID', isFk: true, ref: 'usuario.id' },
        { name: 'token_hash', type: 'VARCHAR', isUnique: true },
        { name: 'tipo', type: 'ENUM (verificacion_email, recuperacion_password)' },
        { name: 'expira_en', type: 'DATETIME' },
      ],
    },
  ],
  relationships: [
    { from: 'usuario', to: 'publicacion', type: '1:N', label: 'Propietario crea publicaciones' },
    { from: 'publicacion', to: 'imagen_publicacion', type: '1:N', label: 'Galería de fotos ordenadas' },
    { from: 'publicacion', to: 'publicacion_caracteristica', type: '1:N', label: 'Comodidades asociadas' },
    { from: 'caracteristica', to: 'publicacion_caracteristica', type: '1:N', label: 'Catálogo de atributos' },
    { from: 'usuario', to: 'favorito', type: '1:N', label: 'Inmuebles guardados en favoritos' },
    { from: 'publicacion', to: 'mensaje_contacto', type: '1:N', label: 'Bandeja de consultas recibidas' },
    { from: 'usuario', to: 'token_verificacion', type: '1:N', label: 'Tokens de seguridad con hash SHA-256' },
  ],
};

export const prop2Architecture: SystemArchitecture = {
  title: {
    es: 'Arquitectura de Sistema — Prop²',
    en: 'System Architecture — Prop²',
  },
  summary: {
    es: 'Arquitectura hexagonal pragmática construida en Next.js App Router, búsqueda Full-Text con tsvector y GIN en PostgreSQL, subida directa firmada a Cloudinary y Auth.js v5.',
    en: 'Pragmatic hexagonal architecture in Next.js App Router, PostgreSQL native tsvector GIN full-text search, direct signed Cloudinary uploads, and Auth.js v5.',
  },
  layers: [
    {
      name: { es: 'Capa de Presentación & Búsqueda', en: 'Presentation & Search Layer' },
      badge: { es: 'Next.js 16 SSR', en: 'Next.js 16 SSR' },
      color: '#3B82F6',
      components: [
        {
          name: { es: 'Drawer de Búsqueda Sincronizado en URL', en: 'URL-Synchronized Search Drawer' },
          desc: { es: 'Filtros combinados de precio, moneda, ambientes y comodidades sincronizados con searchParams.', en: 'Multi-filter drawer with searchParams URL sync (price, currency, rooms, amenities).' },
          tech: 'Next.js & React 19',
        },
        {
          name: { es: 'Dashboard Inmobiliario & Bandeja de Leads', en: 'Real Estate Dashboard & Leads Inbox' },
          desc: { es: 'Gestión de ciclo de vida (borrador, activa, pausada) y panel de mensajes recibidos (nueva, atendida).', en: 'Listing lifecycle management and inquiry lead inbox with status badges.' },
          tech: { es: 'Portal Vendedor', en: 'Seller Portal' },
        },
      ],
    },
    {
      name: { es: 'Capa de Aplicación & Dominio', en: 'Application & Domain Layer' },
      badge: { es: 'Núcleo Hexagonal', en: 'Hexagonal Core' },
      color: '#F59E0B',
      components: [
        {
          name: { es: 'Servicios de Dominio & Esquemas Zod', en: 'Domain Services & Zod Schemas' },
          desc: { es: 'Aislamiento de reglas de negocio: cálculo de expensas, validación de superficies y geocodificación.', en: 'Business rules isolation: fee calculation, surface consistency, and geocoding.' },
          tech: { es: 'TypeScript Estricto', en: 'Strict TypeScript' },
        },
        {
          name: { es: 'Adaptador de Geocodificación Nominatim', en: 'Nominatim Geocoding Adapter' },
          desc: { es: 'Resolución automática de latitud/longitud a partir de dirección, barrio y ciudad.', en: 'Automated reverse geocoding from street address and neighborhood via Nominatim.' },
          tech: 'OpenStreetMap API',
        },
      ],
    },
    {
      name: { es: 'Capa de Integraciones Externas', en: 'External Integrations Layer' },
      badge: { es: 'Servicios Cloud', en: 'Cloud Services' },
      color: '#10B981',
      components: [
        {
          name: { es: 'Subidas Directas Firmadas a Cloudinary', en: 'Cloudinary Signed Direct Uploads' },
          desc: { es: 'El navegador sube imágenes directamente a Cloudinary mediante firmas criptográficas generadas en servidor.', en: 'Browser directly uploads photos to Cloudinary using server-signed signatures.' },
          tech: 'Cloudinary SDK',
        },
        {
          name: { es: 'Envío de Emails Transaccionales (Nodemailer)', en: 'SMTP Email Delivery (Nodemailer)' },
          desc: { es: 'Envío de notificaciones transaccionales ante nuevos mensajes de contacto y verificación de cuentas.', en: 'Transactional notifications on new inquiry messages and account verification.' },
          tech: 'Nodemailer',
        },
        {
          name: { es: 'Limitador de Tasa Upstash Redis', en: 'Upstash Redis Rate Limiter' },
          desc: { es: 'Protección contra spam en formularios de contacto y endpoints de autenticación.', en: 'Spam protection on inquiry forms and credentials authentication routes.' },
          tech: 'Upstash Redis',
        },
      ],
    },
    {
      name: { es: 'Capa de Persistencia & Base de Datos', en: 'Persistence & Database Layer' },
      badge: { es: 'Neon PostgreSQL', en: 'Neon PostgreSQL' },
      color: '#8B5CF6',
      components: [
        {
          name: { es: 'Búsqueda Full-Text PostgreSQL (tsvector + GIN)', en: 'PostgreSQL Full-Text Search (tsvector + GIN)' },
          desc: { es: 'Columna busqueda autogenerada en base de datos con índice GIN para búsquedas de texto a alta velocidad.', en: 'Generated tsvector column with GIN index for high-performance title/description matching.' },
          tech: { es: 'PostgreSQL Nativo', en: 'Native PostgreSQL' },
        },
        {
          name: { es: 'Cliente Tipado Prisma ORM', en: 'Prisma ORM Client' },
          desc: { es: 'Mapeo relacional con snake_case en PostgreSQL (@map) y camelCase en TypeScript.', en: 'Relational mapping with snake_case DB columns and camelCase TypeScript entities.' },
          tech: 'Prisma Client',
        },
      ],
    },
  ],
  dataFlow: [
    { step: 1, title: { es: 'Creación & Geocodificación', en: 'Listing Creation & Geocoding' }, desc: { es: 'El vendedor completa el formulario; el servidor valida con Zod y geocodifica la ubicación con Nominatim antes de guardar.', en: 'Seller submits form; server validates with Zod and geocodes coordinates with Nominatim.' } },
    { step: 2, title: { es: 'Subida Directa de Fotos', en: 'Direct Photo Upload' }, desc: { es: 'El cliente solicita firma criptográfica efímera al servidor y envía los archivos directamente al CDN de Cloudinary.', en: 'Client requests ephemeral signature from server and uploads image bytes directly to Cloudinary CDN.' } },
    { step: 3, title: { es: 'Búsqueda Full-Text', en: 'Full-Text Search Query' }, desc: { es: 'El comprador filtra en el drawer; PostgreSQL ejecuta búsqueda full-text con tsvector y GIN junto con filtros numéricos Decimal.', en: 'Buyer searches; PostgreSQL executes tsvector GIN full-text matching combined with Decimal filters.' } },
    { step: 4, title: { es: 'Contacto & Notificación', en: 'Inquiry & Notification' }, desc: { es: 'El interesado envía un mensaje (con o sin cuenta); se guarda el lead en DB y se notifica al propietario por email.', en: 'Buyer sends inquiry (authenticated or guest); lead is persisted and owner is notified via email.' } },
  ],
};
