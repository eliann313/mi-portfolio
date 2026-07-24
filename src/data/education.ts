import type { EducationEntry, Language } from '../types';

export const educationEntries: EducationEntry[] = [
  {
    title: {
      es: 'Licenciatura en Ciencia de Datos',
      en: 'B.Sc. in Data Science',
    },
    institution: {
      es: 'Universidad de la Ciudad Autónoma de Buenos Aires',
      en: 'University of the Autonomous City of Buenos Aires',
    },
    period: '2026 – Presente',
    status: 'in-progress',
  },
  {
    title: {
      es: 'Tecnicatura Superior en Desarrollo de Software',
      en: 'Higher Technical Degree in Software Development',
    },
    institution: {
      es: 'Instituto de Formación Técnica Superior N°11',
      en: 'Higher Technical Training Institute N°11',
    },
    period: '2023 – 2025',
    status: 'completed',
  },
];

export const spokenLanguages: Language[] = [
  {
    language: { es: 'Español', en: 'Spanish' },
    level: { es: 'Nativo', en: 'Native' },
  },
  {
    language: { es: 'Inglés', en: 'English' },
    level: { es: 'Intermedio', en: 'Intermediate' },
    cefr: 'A2-B1',
    detail: {
      es: 'Lectura técnica fluida y comunicación escrita básica',
      en: 'Fluent technical reading and basic written communication',
    },
  },
];
