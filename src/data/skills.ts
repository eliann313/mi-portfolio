import {
  SiPython, SiFastapi, SiNodedotjs, SiPostgresql, SiMongodb, SiSqlite,
  SiReact, SiAngular, SiIonic, SiTypescript, SiJavascript, SiHtml5, SiCss,
  SiDocker, SiGit, SiGithub, SiLinux, SiSqlalchemy, SiMongoose, SiExpress,
  SiNextdotjs, SiVercel, SiPrisma, SiGithubactions, SiPytest, SiVitest
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import type { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    category: { es: 'Stack Principal (Backend & Data)', en: 'Core Stack (Backend & Data)' },
    skills: [
      { name: 'Python',     icon: SiPython },
      { name: 'FastAPI',    icon: SiFastapi },
      { name: 'Node.js',    icon: SiNodedotjs },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Neon',       icon: SiPostgresql },
      { name: 'MongoDB',    icon: SiMongodb },
      { name: 'SQLite',     icon: SiSqlite },
      { name: 'C#',         icon: TbBrandCSharp },
    ],
    description: {
      es: 'C# aplicado a bases teóricas: Programación Orientada a Objetos y Concurrencia (multihilos, semáforos y locks).',
      en: 'C# applied to theoretical bases: Object-Oriented Programming and Concurrency (multithreading, semaphores, and locks).'
    }
  },
  {
    category: { es: 'Ecosistema & Frontend', en: 'Ecosystem & Frontend' },
    skills: [
      { name: 'React',      icon: SiReact },
      { name: 'Next.js',    icon: SiNextdotjs },
      { name: 'Angular',    icon: SiAngular },
      { name: 'Ionic',      icon: SiIonic },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'HTML',       icon: SiHtml5 },
      { name: 'CSS',        icon: SiCss },
    ],
  },
  {
    category: { es: 'Herramientas & DevOps', en: 'Tools & DevOps' },
    skills: [
      { name: 'Docker',     icon: SiDocker },
      { name: 'Vercel',     icon: SiVercel },
      { name: 'Prisma',     icon: SiPrisma },
      { name: 'Git',        icon: SiGit },
      { name: 'GitHub',     icon: SiGithub },
      { name: 'Linux',      icon: SiLinux },
      { name: 'SQLAlchemy', icon: SiSqlalchemy },
      { name: 'Alembic',    icon: undefined },
      { name: 'Mongoose',   icon: SiMongoose },
      { name: 'Express',    icon: SiExpress },
      { name: 'Playwright', icon: undefined },
      { name: 'Pytest',     icon: SiPytest },
      { name: 'Vitest',     icon: SiVitest },
      { name: 'CI/CD',      icon: SiGithubactions },
    ],
  },
];
