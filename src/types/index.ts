// ============================================================
// Locale
// ============================================================
export type Locale = 'es' | 'en';

// ============================================================
// Data Types
// ============================================================
export interface Project {
  id: string;
  title: string;
  type: 'group' | 'individual';
  status: 'completed' | 'in-progress' | 'planned';
  description: Record<Locale, string>;
  contributions: Record<Locale, string[]>;
  stack: string[];
  roles: Record<Locale, string[]>;
  links: {
    demo?: string;
    repo?: string;
  };
  isPlaceholder?: boolean;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: Record<Locale, string>;
  skills: Skill[];
  description?: Record<Locale, string>;
}

export interface EducationEntry {
  title: Record<Locale, string>;
  institution: Record<Locale, string>;
  period: string;
  status: 'completed' | 'in-progress';
}

export interface Language {
  language: Record<Locale, string>;
  level: Record<Locale, string>;
  cefr?: string;
  detail?: Record<Locale, string>;
}

// ============================================================
// i18n — UI Translations Shape
// ============================================================
export interface Translations {
  nav: {
    about: string;
    skills: string;
    projects: string;
    education: string;
    languages: string;
    contact: string;
  };
  hero: {
    role: string;
    subtitle: string;
    location: string;
    downloadCV: string;
    contactMe: string;
    availability: string;
  };
  about: {
    title: string;
    bio: string;
    badges: string[];
  };
  skills: {
    title: string;
  };
  projects: {
    title: string;
    group: string;
    individual: string;
    completed: string;
    inProgress: string;
    planned: string;
    comingSoon: string;
    comingSoonDesc: string;
    viewDemo: string;
    viewRepo: string;
    role: string;
  };
  education: {
    title: string;
    completed: string;
    inProgress: string;
  };
  languages: {
    title: string;
  };
  contact: {
    title: string;
    subtitle: string;
    emailLabel: string;
  };
  footer: {
    rights: string;
    madeWith: string;
  };
}
