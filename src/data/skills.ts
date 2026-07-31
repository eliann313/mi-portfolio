import {
  SiPython, SiFastapi, SiNodedotjs, SiPostgresql, SiMongodb, SiSqlite,
  SiReact, SiAngular, SiIonic, SiTypescript, SiJavascript, SiHtml5, SiCss,
  SiDocker, SiGit, SiGithub, SiLinux, SiSqlalchemy, SiMongoose, SiExpress,
  SiNextdotjs, SiVercel, SiPrisma, SiGithubactions, SiPytest, SiVitest
} from 'react-icons/si';
import { CSharpIcon, PlaywrightIcon, AlembicIcon } from '../components/icons/CustomTechIcons';
import type { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    category: { es: 'Backend & Bases de Datos', en: 'Backend & Databases' },
    skills: [
      { name: 'Python',     icon: SiPython },
      { name: 'FastAPI',    icon: SiFastapi },
      { name: 'Node.js',    icon: SiNodedotjs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'C#*',        icon: CSharpIcon },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Neon',       icon: SiPostgresql },
      { name: 'MongoDB',    icon: SiMongodb },
      { name: 'SQLite',     icon: SiSqlite },
    ],
    description: {
      es: 'C# aplicado a bases teóricas: Programación Orientada a Objetos y Concurrencia (multihilos, semáforos y locks).',
      en: 'C# applied to theoretical foundations: Object-Oriented Programming and Concurrency (multithreading, semaphores, and locks).'
    }
  },
  {
    category: { es: 'Frontend & Mobile', en: 'Frontend & Mobile' },
    skills: [
      { name: 'React',      icon: SiReact },
      { name: 'Next.js',    icon: SiNextdotjs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'Angular',    icon: SiAngular },
      { name: 'Ionic',      icon: SiIonic },
      { name: 'HTML5',      icon: SiHtml5 },
      { name: 'CSS3',       icon: SiCss },
    ],
  },
  {
    category: { es: 'ORM, Testing & DevOps', en: 'ORM, Testing & DevOps' },
    skills: [
      { name: 'Prisma',     icon: SiPrisma },
      { name: 'SQLAlchemy', icon: SiSqlalchemy },
      { name: 'Alembic',    icon: AlembicIcon },
      { name: 'Mongoose',   icon: SiMongoose },
      { name: 'Express',    icon: SiExpress },
      { name: 'Docker',     icon: SiDocker },
      { name: 'Playwright', icon: PlaywrightIcon },
      { name: 'Vitest',     icon: SiVitest },
      { name: 'Pytest',     icon: SiPytest },
      { name: 'Git',        icon: SiGit },
      { name: 'GitHub',     icon: SiGithub },
      { name: 'CI/CD',      icon: SiGithubactions },
      { name: 'Vercel',     icon: SiVercel },
      { name: 'Linux',      icon: SiLinux },
    ],
  },
];
