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
    isPrivate?: boolean;
  };
  thumbnail?: string;
  isPlaceholder?: boolean;
}

export interface VideoTimestamp {
  seconds: number;
  timeLabel: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
}

export interface CaseStudyDomain {
  name: string;
  desc: Record<Locale, string>;
}

export interface CaseStudyADR {
  question: Record<Locale, string>;
  decision: Record<Locale, string>;
}

export interface CaseStudyTableColumn {
  name: string;
  type: string;
  isPk?: boolean;
  isFk?: boolean;
  ref?: string;
  isUnique?: boolean;
}

export interface CaseStudyTable {
  name: string;
  domain?: string;
  description?: Record<Locale, string>;
  columns: CaseStudyTableColumn[];
}

export interface CaseStudyRelationship {
  from: string;
  to: string;
  type: '1:N' | '1:1' | 'N:M';
  label: string;
}

export interface CaseStudyDBSchema {
  title: Record<Locale, string>;
  engine: string;
  overview: Record<Locale, string>;
  tables: CaseStudyTable[];
  relationships: CaseStudyRelationship[];
}

export interface ArchitectureLayer {
  name: Record<Locale, string>;
  badge?: string | Record<Locale, string>;
  color?: string;
  components: {
    name: string | Record<Locale, string>;
    desc: Record<Locale, string>;
    tech?: string | Record<Locale, string>;
  }[];
}

export interface ArchitectureFlowStep {
  step: number;
  title: Record<Locale, string>;
  desc: Record<Locale, string>;
}

export interface SystemArchitecture {
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  layers: ArchitectureLayer[];
  dataFlow?: ArchitectureFlowStep[];
}

export interface CaseStudy {
  id: string;
  projectTitle: string;
  badge: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  overview: Record<Locale, string>;
  architectureHighlights: Record<Locale, string[]>;
  myRoleDetailed: Record<Locale, string[]>;
  technicalChallenges: Record<Locale, { problem: string; solution: string }[]>;
  domainsBreakdown?: {
    title: Record<Locale, string>;
    items: CaseStudyDomain[];
  };
  adrs?: {
    title: Record<Locale, string>;
    items: CaseStudyADR[];
  };
  dbSchema?: CaseStudyDBSchema;
  systemArchitecture?: SystemArchitecture;
  c4Diagram?: {
    title: Record<Locale, string>;
    nodes: { id: string; label: string; desc: string; type: 'client' | 'api' | 'db' | 'service' }[];
    connections: { from: string; to: string; label: string }[];
  };
  videoData?: {
    src: string;
    timestamps: VideoTimestamp[];
  };
  screenshots?: {
    url: string;
    title: Record<Locale, string>;
    caption: Record<Locale, string>;
  }[];
}

import type React from 'react';

export interface Skill {
  name: string;
  icon?: React.ElementType;
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
    cvSpanish?: string;
    cvEnglish?: string;
    cvModalTitle?: string;
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
    viewCaseStudy: string;
    role: string;
    allFilter: string;
    individualFilter: string;
    groupFilter: string;
    techFilterAll?: string;
  };
  caseStudy: {
    backToProjects: string;
    overviewTitle: string;
    myRoleTitle: string;
    architectureTitle: string;
    technicalChallengesTitle: string;
    videoDemoTitle: string;
    galleryTitle: string;
    timestampsTitle: string;
    problemLabel: string;
    solutionLabel: string;
    nextProject: string;
    prevProject: string;
    viewLiveDemo: string;
    viewRepository: string;
    domainsTitle: string;
    adrsTitle: string;
    schemaTitle?: string;
    architectureDiagramTitle?: string;
    tabArchitecture?: string;
    tabSchema?: string;
    viewErdDiagram?: string;
    viewTableInspector?: string;
    lightboxClose?: string;
    lightboxNext?: string;
    lightboxPrev?: string;
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
