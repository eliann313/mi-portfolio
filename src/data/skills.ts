import type { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    category: { es: 'Stack Principal (Backend & Data)', en: 'Core Stack (Backend & Data)' },
    skills: [
      { name: 'Python',     icon: 'devicon-python-plain colored' },
      { name: 'FastAPI',    icon: 'devicon-fastapi-plain colored' },
      { name: 'Node.js',    icon: 'devicon-nodejs-plain colored' },
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
      { name: 'MongoDB',    icon: 'devicon-mongodb-plain colored' },
      { name: 'SQLite',     icon: 'devicon-sqlite-plain colored' },
      { name: 'C#',         icon: 'devicon-csharp-plain colored' },
    ],
    description: {
      es: 'C# aplicado a bases teóricas: Programación Orientada a Objetos y Concurrencia (multihilos, semáforos y locks).',
      en: 'C# applied to theoretical bases: Object-Oriented Programming and Concurrency (multithreading, semaphores, and locks).'
    }
  },
  {
    category: { es: 'Ecosistema & Frontend', en: 'Ecosystem & Frontend' },
    skills: [
      { name: 'React',      icon: 'devicon-react-original colored' },
      { name: 'Angular',    icon: 'devicon-angularjs-plain colored' },
      { name: 'Ionic',      icon: 'devicon-ionic-original colored' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'HTML',       icon: 'devicon-html5-plain colored' },
      { name: 'CSS',        icon: 'devicon-css3-plain colored' },
    ],
  },
  {
    category: { es: 'Herramientas & DevOps', en: 'Tools & DevOps' },
    skills: [
      { name: 'Docker',     icon: 'devicon-docker-plain colored' },
      { name: 'Git',        icon: 'devicon-git-plain colored' },
      { name: 'GitHub',     icon: 'devicon-github-original' },
      { name: 'Linux',      icon: 'devicon-linux-plain' },
      { name: 'SQLAlchemy', icon: 'devicon-sqlalchemy-plain' },
      { name: 'Alembic',    icon: undefined },
      { name: 'Mongoose',   icon: 'devicon-mongoose-original colored' },
      { name: 'Express',    icon: 'devicon-express-original' },
      { name: 'CI/CD',      icon: undefined },
    ],
  },
];
