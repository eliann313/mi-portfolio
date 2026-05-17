import type { Project } from '../types';

export const projects: Project[] = [
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
        'Diseño de arquitectura backend multi-tenant con aislamiento de datos por cliente',
        'Modelado relacional y gestión de migraciones con Alembic',
        'Definición de arquitectura por capas (Onion Architecture)',
        'Desarrollo de módulos frontend en React (TSX) integrados al backend vía API REST',
        'Trabajo colaborativo con Trello y metodologías ágiles',
      ],
      en: [
        'Designed multi-tenant backend architecture with per-client data isolation',
        'Relational data modeling and migration management with Alembic',
        'Defined layered architecture (Onion Architecture)',
        'Developed frontend modules in React (TSX) integrated with the backend via REST API',
        'Collaborative work with Trello and agile methodologies',
      ],
    },
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'React', 'TypeScript', 'SQLite'],
    roles: ['Backend', 'Architecture', 'Frontend'],
    links: {
      repo: '#', // TODO: agregar URL de repo
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
    roles: ['Backend', 'Frontend', 'AI Integration'],
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
    roles: ['Frontend', 'Mobile', 'API Integration'],
    links: {
      repo: '#', // TODO: agregar URL de repo
    },
  },
];
