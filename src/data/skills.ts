import type { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    category: { es: 'Stack Principal (Backend & Data) 🚀', en: 'Core Stack (Backend & Data) 🚀' },
    skills: [
      { name: 'Python',     icon: 'devicon-python-plain colored' },
      { name: 'FastAPI',    icon: 'devicon-fastapi-plain colored' },
      { name: 'Node.js',    icon: 'devicon-nodejs-plain colored' },
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
      { name: 'MongoDB',    icon: 'devicon-mongodb-plain colored' },
      { name: 'SQLite',     icon: 'devicon-sqlite-plain colored' },
    ],
  },
  {
    category: { es: 'Ecosistema & Frontend 💻', en: 'Ecosystem & Frontend 💻' },
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
    category: { es: 'Herramientas, ORMs & DevOps 🛠️', en: 'Tools, ORMs & DevOps 🛠️' },
    skills: [
      { name: 'Docker',     icon: 'devicon-docker-plain colored' },
      { name: 'Git',        icon: 'devicon-git-plain colored' },
      { name: 'GitHub',     icon: 'devicon-github-original' },
      { name: 'Linux',      icon: 'devicon-linux-plain' },
      { name: 'SQLAlchemy', icon: 'devicon-sqlalchemy-plain' },
      { name: 'Alembic',    icon: undefined },
      { name: 'Mongoose',   icon: 'devicon-mongoose-original colored' },
      { name: 'Express',    icon: 'devicon-express-original' },
      { name: 'C#',         icon: 'devicon-csharp-plain colored' },
      { name: 'CI/CD',      icon: undefined },
    ],
  },
];
