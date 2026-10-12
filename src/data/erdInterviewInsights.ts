import type { Locale } from '../types';

export interface TableInterviewInsight {
  tableName: string;
  architectureRole: Record<Locale, string>;
  interviewRationale: Record<Locale, string>;
  keyInvariant: Record<Locale, string>;
}

export const erdInterviewInsights: Record<string, TableInterviewInsight> = {
  // =========================================================================
  // GRIDHUB WMS
  // =========================================================================
  client: {
    tableName: 'client',
    architectureRole: {
      es: 'Inquilino empresarial raíz (Multi-Tenant Core). Aísla completamente la operatoria, catálogo e inventario de cada empresa.',
      en: 'Root enterprise tenant (Multi-Tenant Core). Completely isolates logistics operations, catalog, and inventory per company.',
    },
    interviewRationale: {
      es: 'En una entrevista, explica que GridHub usa aislamiento multi-inquilino a nivel de fila (Row-Level Security/Filter) con client_id indexado en todas las tablas operativas. Esto permite una arquitectura SaaS económica sin la sobrecarga de crear bases de datos separadas por cliente.',
      en: 'In an interview, explain that GridHub uses row-level multi-tenant isolation with indexed client_id across all operational tables. This delivers cost-efficient SaaS scaling without the operational overhead of provisioning separate databases per tenant.',
    },
    keyInvariant: {
      es: 'Todas las transacciones y consultas de stock o tareas validan forzosamente la pertenencia al client_id autenticado.',
      en: 'All inventory transactions and task queries enforce strict validation against the authenticated client_id.',
    },
  },
  warehouse: {
    tableName: 'warehouse',
    architectureRole: {
      es: 'Depósito o centro de distribución físico. Permite que un cliente gestione múltiples naves logísticas.',
      en: 'Physical warehouse or distribution center. Enables a single client to run multiple logistics facilities.',
    },
    interviewRationale: {
      es: 'Separa la infraestructura física de la lógica empresarial. Cada depósito posee su propia topología de pasillos y sus propias mesas de armado (pickertables).',
      en: 'Decouples physical logistics infrastructure from business logic. Each warehouse maintains its own aisle topology and packing workstations.',
    },
    keyInvariant: {
      es: 'Restricción única compuesta (client_id, name) para evitar duplicidad de depósitos dentro de la misma empresa.',
      en: 'Composite unique constraint (client_id, name) preventing naming collisions within the same enterprise.',
    },
  },
  location: {
    tableName: 'location',
    architectureRole: {
      es: 'Topología física de ubicaciones en 6 niveles: Depósito, Zona, Pasillo, Rack, Nivel y Casillero (Bin).',
      en: '6-tuple physical storage slot: Warehouse, Zone, Aisle, Rack, Level, and Bin.',
    },
    interviewRationale: {
      es: 'Menciona que la ubicación no es un simple string, sino una tupla física estricta con zonas tipadas (RECEIVING, PICKING, RESERVE, PACKING, etc.) y volumetría máxima. Esto es lo que permite que el motor de Put-Away sugiera automáticamente dónde guardar la mercadería según rotación ABC.',
      en: 'Highlight that locations are not plain strings, but strict 6-tuples with zone classifications (RECEIVING, PICKING, RESERVE, etc.) and maximum volumetric capacity, powering automated Put-Away algorithms based on ABC velocity.',
    },
    keyInvariant: {
      es: 'Restricción única de 6 campos: (warehouse_id, zone, aisle, rack, level, bin) y validación de volumen máximo.',
      en: '6-field composite uniqueness constraint: (warehouse_id, zone, aisle, rack, level, bin) plus volumetric capacity caps.',
    },
  },
  item: {
    tableName: 'item',
    architectureRole: {
      es: 'Maestro de productos y catálogo logístico con clasificación de rotación ABC y códigos de barra.',
      en: 'Product master catalog with ABC turnover classification and industrial barcode support.',
    },
    interviewRationale: {
      es: 'Explica que incorpora códigos EAN-13 (unidad) y DUN-14 (bulto cerrado), unidades por bulto (UXB) y flag requires_serial para trazabilidad unitaria de productos electrónicos o de alto valor.',
      en: 'Explain that it stores both EAN-13 (unit) and DUN-14 (case) barcodes, units per case (UXB), and a requires_serial flag for high-value asset tracking.',
    },
    keyInvariant: {
      es: 'SKU único por inquilino; volumen unitario requerido para cálculo de ocupación cúbica de casilleros.',
      en: 'Unique SKU per tenant; mandatory volumetric unit footprint for slot occupancy math.',
    },
  },
  stock: {
    tableName: 'stock',
    architectureRole: {
      es: 'Balance de existencias en tiempo real por ubicación física y lote de fabricación.',
      en: 'Real-time inventory balance per physical location and manufacturing lot.',
    },
    interviewRationale: {
      es: 'En la entrevista te preguntaron sobre esto: explica que stock NO es solo una columna quantity en item, sino una tabla relacional con restricción única cuádruple (item_id, location_id, lot_id, client_id). Separa cantidad física de cantidad reservada para evitar doble despacho en órdenes simultáneas.',
      en: 'Key interview point: stock is not merely a quantity column in item, but a dedicated relation with a quad unique constraint (item_id, location_id, lot_id, client_id), segregating available quantity from reserved quantity.',
    },
    keyInvariant: {
      es: 'Restricción única cuádruple: (item_id, location_id, lot_id, client_id) con reserved_quantity <= quantity.',
      en: 'Quad-tuple unique constraint: (item_id, location_id, lot_id, client_id) ensuring reserved_quantity <= quantity.',
    },
  },
  lot: {
    tableName: 'lot',
    architectureRole: {
      es: 'Trazabilidad de lotes de producción con fecha de elaboración, recepción y vencimiento.',
      en: 'Manufacturing lot tracking with production, receipt, and expiration dates.',
    },
    interviewRationale: {
      es: 'Fundamental para industrias farmacéuticas o alimenticias. Permite implementar despacho FEFO (First Expired, First Out) de forma determinista en lugar de solo FIFO.',
      en: 'Crucial for pharma and food logistics. Enables deterministic FEFO (First Expired, First Out) picking logic instead of crude FIFO.',
    },
    keyInvariant: {
      es: 'Número de lote único por producto e inquilino con validación de fecha de caducidad posterior a fecha de recepción.',
      en: 'Unique lot identifier per item and client with expiration date strictly after receipt date.',
    },
  },
  stockmovement: {
    tableName: 'stockmovement',
    architectureRole: {
      es: 'Libro mayor inmutable de movimientos de stock (patrón Event Ledger / Auditoría Transaccional).',
      en: 'Immutable stock movement ledger (Event Ledger / Audit Pattern).',
    },
    interviewRationale: {
      es: 'Explica que el stock nunca se modifica a ciegas con un UPDATE arbitrario: cada cambio de inventario exige insertar un registro en stockmovement con check constraints estrictos según el movement_type (IN exige to_location, OUT exige from_location, TRANSFER exige ambos).',
      en: 'Explain that inventory balances are never blindly overwritten with arbitrary UPDATEs: every balance change inserts an immutable stockmovement ledger row validated with strict check constraints per movement type.',
    },
    keyInvariant: {
      es: 'Solo inserciones (append-only); check constraints en base de datos para from_location y to_location según movement_type.',
      en: 'Append-only storage; database check constraints on from_location and to_location per movement_type.',
    },
  },
  replenishmentrule: {
    tableName: 'replenishmentrule',
    architectureRole: {
      es: 'Regla de reorden automático (ROP: Reorder Point) entre zonas RESERVE y PICKING.',
      en: 'Automated min/max replenishment rule (ROP) from RESERVE high-bay slots to PICKING slots.',
    },
    interviewRationale: {
      es: 'Explica cómo se mantiene lleno el pasillo de preparación: cuando el stock en la ubicación de picking cae por debajo del umbral mínimo, un trigger/servicio genera una tarea interna de reabastecimiento desde las posiciones altas de reserva.',
      en: 'Explain warehouse floor replenishment: when picking slot inventory drops below the min threshold, an automated service generates an internal replenishment task from reserve storage.',
    },
    keyInvariant: {
      es: 'min_quantity < max_quantity y ubicación de destino catalogada con is_pickable = true.',
      en: 'min_quantity < max_quantity constraint, with target location flagged as is_pickable = true.',
    },
  },
  order: {
    tableName: 'order',
    architectureRole: {
      es: 'Cabecera de orden de pedido con estado del ciclo de vida (PENDING, PICKING, PACKED, DISPATCHED).',
      en: 'Order header tracking dispatch lifecycle states (PENDING, PICKING, PACKED, DISPATCHED).',
    },
    interviewRationale: {
      es: 'Representa el pedido de salida. Coordina las líneas de pedido y la asignación a mesas de empaque. Las transiciones de estado son atómicas para prevenir condiciones de carrera entre operarios.',
      en: 'Coordinates outbound customer orders, order lines, and packing workstation assignments with atomic state transitions.',
    },
    keyInvariant: {
      es: 'Número de orden único por cliente y máquina de estados finita que impide volver a estados previos.',
      en: 'Unique order number per client with state machine guards preventing backwards status mutations.',
    },
  },
  orderline: {
    tableName: 'orderline',
    architectureRole: {
      es: 'Línea de pedido individual que especifica producto, cantidad solicitada y unidades despachadas.',
      en: 'Individual order line item specifying product, requested units, and fulfilled units.',
    },
    interviewRationale: {
      es: 'Desacopla el pedido general de las unidades específicas. Permite despacho parcial y verificación línea por línea durante el empaque.',
      en: 'Decouples high-level order intent from item-level quantities, supporting split picks and line-by-line verification.',
    },
    keyInvariant: {
      es: 'fulfilled_quantity <= requested_quantity y verificación de integridad referencial con order_id e item_id.',
      en: 'fulfilled_quantity <= requested_quantity with strict foreign keys to order_id and item_id.',
    },
  },
  task: {
    tableName: 'task',
    architectureRole: {
      es: 'Tarea atómica de picking asignada al operario móvil con clave de idempotencia anti-duplicados.',
      en: 'Atomic picking task dispatched to worker devices with idempotency key guard.',
    },
    interviewRationale: {
      es: 'Punto clave de resiliencia: si el operario pierde conexión Wi-Fi en el depósito y confirma una tarea en Dexie.js, al reconectarse se envía la tarea con su idempotency_key. El servidor rechaza cualquier reintento duplicado garantizando que no se descuente stock dos veces.',
      en: 'Resilience linchpin: when an offline worker confirms a pick, the sync queue dispatches with idempotency_key. The server rejects duplicates, guaranteeing inventory is never decremented twice.',
    },
    keyInvariant: {
      es: 'Restricción UNIQUE sobre idempotency_key para garantizar procesamiento exactamente-una-vez (effectively-once).',
      en: 'UNIQUE constraint on idempotency_key delivering effectively-once operational processing.',
    },
  },
  pickertable: {
    tableName: 'pickertable',
    architectureRole: {
      es: 'Mesa de trabajo física en tiempo real para consolidación, control de calidad y empaque.',
      en: 'Physical packing workstation entity coordinating order assembly, QA, and packaging.',
    },
    interviewRationale: {
      es: 'Evita la congestión física en el depósito: cada mesa tiene un estado (AVAILABLE, IN_USE, VALIDATING) y un operario activo asignado. El sistema bloquea la mesa mientras se audita un pedido.',
      en: 'Prevents warehouse floor congestion: workstations maintain real-time statuses (AVAILABLE, IN_USE, VALIDATING) with operator leasing.',
    },
    keyInvariant: {
      es: 'Una mesa solo puede procesar una orden activa a la vez (active_order_id único cuando no es null).',
      en: 'Workstation lock constraint: at most one active order processed per station simultaneously.',
    },
  },
  orderfulfillment: {
    tableName: 'orderfulfillment',
    architectureRole: {
      es: 'Snapshot inmutable de auditoría generado al completar el empaque de una orden.',
      en: 'Immutable closure audit snapshot generated upon order packing completion.',
    },
    interviewRationale: {
      es: 'En entrevistas, esto demuestra visión senior: en vez de confiar en que las tablas de pedidos o precios no cambien en el futuro, orderfulfillment congela un snapshot inmutable (líneas cumplidas, operarios involucrados, fecha exacta). Es el disparador para la integración con el ERP.',
      en: 'Senior engineering design pattern: freezes an immutable snapshot of lines, quantities, and picker IDs upon completion, decoupling historical audit records from mutable order tables.',
    },
    keyInvariant: {
      es: 'Relación 1:1 estricta con order (order_id UNIQUE); registro inmutable protegido contra modificaciones.',
      en: 'Strict 1:1 relationship with order (order_id UNIQUE); immutable snapshot record.',
    },
  },
  erp_outbound_event: {
    tableName: 'erp_outbound_event',
    architectureRole: {
      es: 'Cola del patrón Transactional Outbox para comunicación asíncrona y confiable con ERPs externos.',
      en: 'Transactional Outbox event queue for asynchronous, resilient external ERP integration.',
    },
    interviewRationale: {
      es: 'Pregunta clásica de arquitectura de microservicios: si el ERP del cliente está caído, ¿falla el cierre del pedido en el depósito? Respuesta: NO, porque usamos Transactional Outbox. El cierre del pedido y la inserción del evento se hacen en la MISMA transacción ACID en PostgreSQL. Un worker independiente reclama eventos con lease_token y reintentos exponenciales.',
      en: 'Classic distributed systems design: if the client ERP is down, the warehouse does not block. Closing an order and enqueuing an outbox event execute in ONE atomic PostgreSQL transaction. A worker daemon claims events via lease tokens with exponential backoff.',
    },
    keyInvariant: {
      es: 'event_id UUID único; lease_token y lease_expires_at para prevenir procesamiento concurrente por múltiples workers.',
      en: 'Unique UUID event_id with distributed lease_token and lease_expires_at preventing double-dispatch across worker daemons.',
    },
  },

  // =========================================================================
  // SKILLRADAR
  // =========================================================================
  User: {
    tableName: 'User',
    architectureRole: {
      es: 'Entidad central de usuario para desarrolladores y reclutadores, con claves BYOK cifradas (AES-256-GCM).',
      en: 'Central user entity for developers and recruiters, holding AES-256-GCM encrypted BYOK keys.',
    },
    interviewRationale: {
      es: 'Explica que las claves personales de Gemini/Groq nunca se guardan en texto plano en la base de datos: se cifran con AES-256-GCM usando una master key en el servidor. Además, maneja roles diferenciados y soporte para perfiles públicos anonimizados.',
      en: 'Explain that user BYOK keys are encrypted at rest with AES-256-GCM using a server-side secret key. Manages dual roles and public developer profiles.',
    },
    keyInvariant: {
      es: 'Email único y claves de API cifradas con vector de inicialización (IV) y tag de autenticación.',
      en: 'Unique email constraint; BYOK keys stored as ciphertext + IV + auth tag payload.',
    },
  },
  Resume: {
    tableName: 'Resume',
    architectureRole: {
      es: 'CV subido y evaluado: almacena el texto extraído (pdf-parse) y el árbol JSON estructurado con la rúbrica STAR (0-100).',
      en: 'Uploaded and graded CV: holds parsed text and structured JSON AST with STAR 0-100 scoring.',
    },
    interviewRationale: {
      es: 'Menciona que el scoring ATS no es una caja negra: el campo analysis guarda un rubro aditivo estructurado (contacto, keywords en contexto, verbos de acción, métricas cuantificables STAR y legibilidad) validado mediante esquemas Zod en el backend.',
      en: 'Highlight that the ATS score is deterministic: the analysis field stores an additive rubric (contact, keywords, action verbs, STAR metrics, readability) validated with Zod schemas.',
    },
    keyInvariant: {
      es: 'atsScore acotado de 0 a 100; solo una versión de CV marcada como isActive = true por usuario.',
      en: 'atsScore bounded [0, 100]; exactly one CV version flagged as isActive = true per user.',
    },
  },
  JobMatch: {
    tableName: 'JobMatch',
    architectureRole: {
      es: 'Evaluación de compatibilidad entre un CV activo y una descripción de oferta laboral pegada por el usuario.',
      en: 'Match evaluation comparing active CV against pasted job description.',
    },
    interviewRationale: {
      es: 'Demuestra cómo se calcula el fit técnico sin necesidad de bases de datos vectoriales costosas: se realiza inferencia estructurada con LLM extrayendo habilidades requeridas vs demostradas.',
      en: 'Demonstrates high-accuracy skill match without expensive vector database infrastructure through structured LLM schema extraction.',
    },
    keyInvariant: {
      es: 'Vinculación de clave foránea a User y Resume con matchScore normalizado de 0 a 100.',
      en: 'Foreign key link to User and Resume with normalized matchScore [0, 100].',
    },
  },
  GithubAnalysis: {
    tableName: 'GithubAnalysis',
    architectureRole: {
      es: 'Telemetría de repositorios en GitHub: patrones de commit, calidad de documentación y señales de seniority.',
      en: 'GitHub telemetry: commit cadence, README documentation quality, and seniority signals.',
    },
    interviewRationale: {
      es: 'Complementa el CV con evidencia verificable en código real. Analiza diversidad de stacks, frecuencia de contribución y buenas prácticas en repositorios públicos.',
      en: 'Complements the CV with verifiable engineering telemetry from real repositories: commit frequency, documentation rigor, and stack diversity.',
    },
    keyInvariant: {
      es: 'githubUser único por usuario con timestamp de última auditoría para evitar rate limiting de la API de GitHub.',
      en: 'Unique githubUser per user with cached audit timestamps respecting GitHub API rate limits.',
    },
  },
  InterviewSession: {
    tableName: 'InterviewSession',
    architectureRole: {
      es: 'Sesión de simulador de entrevistas técnicas con IA conversacional y debriefing de fortalezas.',
      en: 'Interactive AI mock technical interview session tracking conversation turns and debrief.',
    },
    interviewRationale: {
      es: 'Guarda el historial completo de preguntas y respuestas simuladas, permitiendo que el modelo evalúe la coherencia técnica, la comunicación y proponga mejoras en el debrief.',
      en: 'Preserves interactive Q&A transcripts, prompting the LLM to grade technical depth, communication clarity, and concrete debrief recommendations.',
    },
    keyInvariant: {
      es: 'Array de mensajes estructurados en JSON con puntuación de rendimiento y retroalimentación contextual.',
      en: 'Structured JSON message history with performance scorecard and contextual feedback.',
    },
  },
  JobPosting: {
    tableName: 'JobPosting',
    architectureRole: {
      es: 'Vacante laboral publicada por un reclutador con habilidades requeridas y etapas de pipeline.',
      en: 'Recruiter job vacancy posting with required skills taxonomy and hiring stages.',
    },
    interviewRationale: {
      es: 'Permite a las empresas buscar candidatos en el Talent Pool filtrando por habilidades concretas y nivel de score ATS sin ver información personal de los desarrolladores.',
      en: 'Allows companies to source candidates in the Talent Pool by required skills and verified ATS thresholds without seeing personal PII.',
    },
    keyInvariant: {
      es: 'recruiterId como clave foránea a User con rol recruiter; status acotado (draft, published, closed).',
      en: 'Foreign key to User with recruiter role; strictly bounded status (draft, published, closed).',
    },
  },
  ContactRequest: {
    tableName: 'ContactRequest',
    architectureRole: {
      es: 'Núcleo del Doble Ciego: reclutador contacta con perfil anonimizado (DEV-XXXXXX); datos revelados al aceptar.',
      en: 'Double-Blind core: recruiter reaches candidate anonymously; contact unmasked upon acceptance.',
    },
    interviewRationale: {
      es: 'Aspecto central de privacidad: el reclutador solo ve el hash DEV-XXXXXX y las métricas técnicas. Cuando envía un ContactRequest, el desarrollador recibe la propuesta y decide si acepta. Solo al aceptar (status = accepted) el backend expone los datos de contacto.',
      en: 'Core privacy design: recruiters only see the DEV-XXXXXX pseudonym. If a ContactRequest is accepted by the candidate, the backend shifts state and securely unmasks email and name.',
    },
    keyInvariant: {
      es: 'Estado controlado (pending, accepted, declined) con restricción única sobre (recruiterId, developerId) activa.',
      en: 'State machine (pending, accepted, declined) with unique constraint on active (recruiterId, developerId) pairs.',
    },
  },
  JobPostingApplication: {
    tableName: 'JobPostingApplication',
    architectureRole: {
      es: 'Postulación formal de un candidato a una búsqueda laboral con vinculación del CV evaluado.',
      en: 'Candidate application to a specific job vacancy with linked resume.',
    },
    interviewRationale: {
      es: 'Organiza el embudo de contratación en etapas claras (submitted, screening, interview, hired, rejected).',
      en: 'Powers candidate pipeline progression stages (submitted, screening, interview, hired, rejected).',
    },
    keyInvariant: {
      es: 'Restricción única (jobPostingId, developerId) para evitar postulaciones duplicadas a la misma vacante.',
      en: 'Unique constraint (jobPostingId, developerId) preventing duplicate submissions.',
    },
  },
  InterviewScorecard: {
    tableName: 'InterviewScorecard',
    architectureRole: {
      es: 'Ficha de evaluación técnica estructurada 1:1 con la postulación del candidato.',
      en: 'Structured evaluation scorecard in 1:1 relationship with job application.',
    },
    interviewRationale: {
      es: 'Estandariza los criterios de evaluación de los entrevistadores para eliminar sesgos y generar métricas comparables entre candidatos.',
      en: 'Standardizes technical assessment criteria to eliminate interviewer bias and produce comparable telemetry.',
    },
    keyInvariant: {
      es: 'Relación 1:1 estricta con JobPostingApplication (applicationId UNIQUE).',
      en: 'Strict 1:1 relationship with JobPostingApplication (applicationId UNIQUE).',
    },
  },
  RoadmapTask: {
    tableName: 'RoadmapTask',
    architectureRole: {
      es: 'Plan de acción personalizado del Career Copilot con tareas e hitos de aprendizaje.',
      en: 'Personalized career copilot roadmap task generated from skill gaps.',
    },
    interviewRationale: {
      es: 'Convierte las debilidades detectadas en el análisis del CV en un plan de acción concreto paso a paso.',
      en: 'Translates skill gaps identified in ATS audits into concrete actionable learning tasks.',
    },
    keyInvariant: {
      es: 'Vinculación a User con flag booleano done para seguimiento de progreso.',
      en: 'Linked to User with done boolean flag tracking skill development progress.',
    },
  },

  // =========================================================================
  // PROP²
  // =========================================================================
  usuario: {
    tableName: 'usuario',
    architectureRole: {
      es: 'Usuario de la plataforma (comprador, vendedor, admin). Compatible con PrismaAdapter de Auth.js v5.',
      en: 'Platform user (buyer, seller, admin) fully compatible with Auth.js v5 PrismaAdapter.',
    },
    interviewRationale: {
      es: 'Soporta autenticación con credenciales y OAuth, con control de roles (comprador, vendedor, admin) y estado de cuenta (activo, baneado).',
      en: 'Supports both OAuth and credentials auth, role-based access control, and account moderation flags.',
    },
    keyInvariant: {
      es: 'Email único con normalización a minúsculas y clave foránea en todas las publicaciones creadas.',
      en: 'Unique normalized email with foreign key cascades on authored property listings.',
    },
  },
  token_verificacion: {
    tableName: 'token_verificacion',
    architectureRole: {
      es: 'Tokens efímeros de seguridad con hash SHA-256 para verificación de email y recuperación de clave.',
      en: 'Single-use SHA-256 hashed security tokens for email verification and password resets.',
    },
    interviewRationale: {
      es: 'Principio de seguridad básica: el token plano nunca se almacena en base de datos. Solo se guarda el hash SHA-256 con fecha de expiración estricta y se consume de forma atómica en una transacción.',
      en: 'Security best practice: plaintext tokens are never persisted in the DB. Only SHA-256 hashes with expiration dates are stored and consumed atomically.',
    },
    keyInvariant: {
      es: 'token_hash único; validación de expira_en > now() al momento del canje.',
      en: 'token_hash UNIQUE constraint; verified expira_en > now() upon redemption.',
    },
  },
  publicacion: {
    tableName: 'publicacion',
    architectureRole: {
      es: 'Inmueble publicado con geocodificación Nominatim, precios Decimal(14,2) y columna generada tsvector con índice GIN.',
      en: 'Property listing with Nominatim geocoordinates, Decimal precision, and generated tsvector with GIN index.',
    },
    interviewRationale: {
      es: 'Gran punto de entrevista en bases de datos: Prop² utiliza una columna generada tsvector autocalculada en PostgreSQL con un índice GIN (publicacion_busqueda_idx). Esto permite búsquedas full-text ultrarrápidas en español sin pagar por Algolia ni lidiar con la eventual consistencia de Elasticsearch. Además, los precios usan Decimal(14,2) para evitar errores de redondeo en monedas internacionales.',
      en: 'Strong database interview highlight: Prop² utilizes a generated tsvector column in PostgreSQL with a GIN index (publicacion_busqueda_idx), delivering instant full-text search without external Algolia/Elasticsearch infrastructure costs. Decimal(14,2) prevents floating-point rounding errors.',
    },
    keyInvariant: {
      es: 'Columna busqueda GENERATED ALWAYS con índice GIN; precios positivos y latitud/longitud válidas.',
      en: 'busqueda column GENERATED ALWAYS with GIN index; positive price bounds and valid geocoordinates.',
    },
  },
  imagen_publicacion: {
    tableName: 'imagen_publicacion',
    architectureRole: {
      es: 'Fotografías vinculadas con public_id de Cloudinary para orden, portada y borrado individual.',
      en: 'Photos with Cloudinary public_id enabling sorting, cover selection, and atomic deletion.',
    },
    interviewRationale: {
      es: 'Desacopla el almacenamiento multimedia: el cliente sube directamente las imágenes a Cloudinary mediante firmas criptográficas generadas por el servidor. La base de datos solo almacena el public_id y las URLs optimizadas con thumbnails.',
      en: 'Decoupled media management: client uploads directly to Cloudinary using signed ephemeral signatures. The database only stores Cloudinary public_id and URLs.',
    },
    keyInvariant: {
      es: 'Exactamente una imagen marcada como es_portada = true por publicación; orden numérico incremental.',
      en: 'Exactly one image marked as es_portada = true per listing; sequential order index.',
    },
  },
  caracteristica: {
    tableName: 'caracteristica',
    architectureRole: {
      es: 'Catálogo normalizado de comodidades y servicios (piscina, cochera, seguridad, etc.).',
      en: 'Normalized taxonomy of amenities and services (pool, parking, security, credit-eligible).',
    },
    interviewRationale: {
      es: 'Evita campos booleanos dispersos (tiene_piscina, tiene_cochera, etc.) en la tabla publicacion. Permite agregar nuevas comodidades dinámicamente sin alterar el esquema relacional.',
      en: 'Eliminates sparse boolean columns (has_pool, has_parking) in the property table, allowing new amenities to be added dynamically without running database migrations.',
    },
    keyInvariant: {
      es: 'Slug único y nombre único con clasificación por categoría (servicio, comodidad).',
      en: 'Unique slug and name with category classification (servicio, comodidad).',
    },
  },
  publicacion_caracteristica: {
    tableName: 'publicacion_caracteristica',
    architectureRole: {
      es: 'Tabla intermedia N:M entre publicaciones y comodidades para filtrado combinable.',
      en: 'N:M join table linking property listings with amenities for combinable filters.',
    },
    interviewRationale: {
      es: 'Permite consultas SQL eficientes con cláusulas WHERE caracteristica_id IN (...) y agregaciones para filtros combinables en el drawer de búsqueda.',
      en: 'Enables high-performance SQL WHERE caracteristica_id IN (...) queries and faceted aggregations in the search drawer.',
    },
    keyInvariant: {
      es: 'Clave primaria compuesta: (publicacion_id, caracteristica_id) con borrado en cascada.',
      en: 'Composite primary key (publicacion_id, caracteristica_id) with ON DELETE CASCADE.',
    },
  },
  favorito: {
    tableName: 'favorito',
    architectureRole: {
      es: 'Inmuebles guardados por usuarios con restricción única compuesta (usuario_id, publicacion_id).',
      en: 'Saved favorite properties guarded with composite unique constraint.',
    },
    interviewRationale: {
      es: 'Implementación limpia de marcadores con protección estricta a nivel de base de datos contra duplicados.',
      en: 'Clean bookmarking implementation guarded with a database-level composite unique constraint.',
    },
    keyInvariant: {
      es: 'Restricción única compuesta (usuario_id, publicacion_id) para garantizar idempotencia en el guardado.',
      en: 'Composite unique constraint (usuario_id, publicacion_id) guaranteeing idempotent saves.',
    },
  },
  mensaje_contacto: {
    tableName: 'mensaje_contacto',
    architectureRole: {
      es: 'Consulta o lead comercial. Soporta compradores anónimos (usuario_id nullable) y canal (WhatsApp, form, email).',
      en: 'Lead inquiry supporting guest buyers (nullable usuario_id) and channel preferences.',
    },
    interviewRationale: {
      es: 'Permite capturar leads tanto de usuarios registrados como de compradores invitados (usuario_id nullable). Registra el medio preferido de contacto y notifica al vendedor por email mediante Nodemailer.',
      en: 'Captures leads from both authenticated users and guest buyers (nullable usuario_id), tracking contact channel preferences and dispatching owner notifications via Nodemailer.',
    },
    keyInvariant: {
      es: 'Clave foránea a publicacion con estado del lead (nueva, leida, atendida).',
      en: 'Foreign key to publicacion with lead status tracking (nueva, leida, atendida).',
    },
  },
};
