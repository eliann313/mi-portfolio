import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ExternalLink, Plus, BookOpen, Lock } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { projects } from '../../data/projects';
import { colors, type ColorMap } from '../../utils/colors';
import type { Locale, Project } from '../../types';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay },
  }),
};

function StatusBadge({ status, t, c }: {
  status: Project['status'];
  t: { completed: string; inProgress: string; planned: string };
  c: ColorMap;
}) {
  const map: Record<Project['status'], { label: string; color: string }> = {
    'completed':   { label: t.completed,  color: '#4ade80' },
    'in-progress': { label: t.inProgress, color: c.accent },
    'planned':     { label: t.planned,    color: c.textMuted },
  };
  const item = map[status];
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded-full border flex-shrink-0"
      style={{ color: item.color, borderColor: item.color, backgroundColor: `${item.color}18` }}>
      {item.label}
    </span>
  );
}

export function Projects() {
  const { theme } = useTheme();
  const { locale, t } = useLanguage();
  const c = colors[theme];

  const [activeFilter, setActiveFilter] = useState<'all' | 'individual' | 'group'>('all');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const realProjects = projects.filter(p => !p.isPlaceholder);
  const placeholder = projects.find(p => p.isPlaceholder);

  const curatedTechs = [
    'PostgreSQL',
    'FastAPI',
    'Next.js 16',
    'TypeScript',
    'Dexie.js',
    'DuckDB-Wasm',
    'Playwright',
    'Prisma',
  ];

  const filteredProjects = realProjects.filter(p => {
    const matchesCategory = activeFilter === 'all' || p.type === activeFilter;
    const matchesTech = !selectedTech || p.stack.some(s => s.toLowerCase().includes(selectedTech.toLowerCase()));
    return matchesCategory && matchesTech;
  });

  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} custom={0}>
          <h2 className="section-title" style={{ color: c.textPrimary }}>{t.projects.title}</h2>
          <div className="section-divider" />
        </motion.div>

        {/* Filter Tabs & Tech Stack Filters */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp} custom={0.05}
          className="space-y-3 mb-8"
        >
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className="text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all cursor-pointer"
              style={{
                backgroundColor: activeFilter === 'all' ? `${c.accent}1f` : c.bgSurface,
                borderColor: activeFilter === 'all' ? c.accent : c.border,
                color: activeFilter === 'all' ? c.accent : c.textSecondary,
              }}
            >
              {t.projects.allFilter} ({realProjects.length})
            </button>
            <button
              onClick={() => setActiveFilter('individual')}
              className="text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all cursor-pointer"
              style={{
                backgroundColor: activeFilter === 'individual' ? `${c.accent}1f` : c.bgSurface,
                borderColor: activeFilter === 'individual' ? c.accent : c.border,
                color: activeFilter === 'individual' ? c.accent : c.textSecondary,
              }}
            >
              {t.projects.individualFilter} ({realProjects.filter(p => p.type === 'individual').length})
            </button>
            <button
              onClick={() => setActiveFilter('group')}
              className="text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all cursor-pointer"
              style={{
                backgroundColor: activeFilter === 'group' ? `${c.accent}1f` : c.bgSurface,
                borderColor: activeFilter === 'group' ? c.accent : c.border,
                color: activeFilter === 'group' ? c.accent : c.textSecondary,
              }}
            >
              {t.projects.groupFilter} ({realProjects.filter(p => p.type === 'group').length})
            </button>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono mr-1" style={{ color: c.textMuted }}>
              Stack:
            </span>
            {curatedTechs.map((tech) => {
              const isSelected = selectedTech === tech;
              return (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(isSelected ? null : tech)}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    isSelected ? 'font-bold shadow-sm' : 'opacity-75 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isSelected ? c.accent : c.bgElevated,
                    borderColor: isSelected ? c.accent : c.border,
                    color: isSelected ? '#ffffff' : c.textSecondary,
                  }}
                >
                  {tech}
                </button>
              );
            })}
            {selectedTech && (
              <button
                onClick={() => setSelectedTech(null)}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full underline ml-1 cursor-pointer transition-colors"
                style={{ color: c.accent }}
              >
                Limpiar ({selectedTech})
              </button>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              custom={idx * 0.08}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              className="rounded-xl overflow-hidden border flex flex-col group h-full"
              style={{ backgroundColor: c.bgSurface, borderColor: c.border, transition: 'border-color 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = c.accent;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px ${c.accentBorder}`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = c.border;
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Thumbnail Preview Banner - Full Width Edge to Edge */}
              {project.thumbnail && (
                <Link
                  to={`/proyectos/${project.id}`}
                  className="block relative overflow-hidden border-b w-full aspect-[16/9] min-h-[220px] sm:min-h-[260px] max-h-72 bg-black/20 flex-shrink-0"
                  style={{ borderColor: c.border }}
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs text-white font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-xs border border-white/20">
                      <BookOpen size={13} /> {t.projects.viewCaseStudy}
                    </span>
                  </div>
                </Link>
              )}

              {/* Content Section with Standard Padding - Stretches full remaining height */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div className="flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
                    <h3 className="font-semibold text-lg" style={{ color: c.textPrimary }}>
                      <Link to={`/proyectos/${project.id}`} className="hover:underline">
                        {project.title}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="tag text-xs" style={{ color: c.textMuted, backgroundColor: c.bgElevated, borderColor: c.border }}>
                        {project.type === 'group' ? t.projects.group : t.projects.individual}
                      </span>
                      <StatusBadge status={project.status} t={t.projects} c={c} />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-4" style={{ color: c.textSecondary }}>
                    {project.description[locale as Locale]}
                  </p>

                  {/* Contributions */}
                  {project.contributions[locale as Locale].length > 0 && (
                    <ul className="mb-4 space-y-1.5">
                      {project.contributions[locale as Locale].map((contribution, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: c.textSecondary }}>
                          <span className="mt-0.5 flex-shrink-0" style={{ color: c.accent }}>›</span>
                          <span>{contribution}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.stack.map(tech => (
                      <span key={tech} className="tag" style={{ color: c.textMuted, backgroundColor: c.bgElevated, borderColor: c.border }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Roles */}
                  {project.roles[locale as Locale] && project.roles[locale as Locale].length > 0 && (
                    <p className="text-xs mb-4" style={{ color: c.textMuted }}>
                      <span className="font-medium">{t.projects.role}:</span>{' '}
                      {project.roles[locale as Locale].join(' · ')}
                    </p>
                  )}
                </div>

                {/* Action Links Bar - Always pinned to the bottom */}
                <div className="flex items-center justify-between gap-2 flex-wrap pt-4 border-t mt-auto flex-shrink-0" style={{ borderColor: c.border }}>
                  <Link to={`/proyectos/${project.id}`} className="btn-primary !py-1.5 !px-3 !text-xs">
                    <BookOpen size={13} /> {t.projects.viewCaseStudy}
                  </Link>

                  <div className="flex items-center gap-2">
                    {project.links.demo && (
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                        className="btn-secondary !py-1.5 !px-3 !text-xs" style={{ cursor: 'pointer' }}>
                        <ExternalLink size={12} />{t.projects.viewDemo}
                      </a>
                    )}
                    {project.links.repo && project.links.repo !== '#' && !project.links.isPrivate && (
                      <a href={project.links.repo} target="_blank" rel="noopener noreferrer"
                        className="btn-secondary !py-1.5 !px-3 !text-xs" style={{ cursor: 'pointer' }}>
                        <FiGithub size={12} />{t.projects.viewRepo}
                      </a>
                    )}
                    {project.links.isPrivate && (
                      <span
                        className="btn-secondary !py-1.5 !px-3 !text-xs opacity-70 cursor-not-allowed inline-flex items-center gap-1.5"
                        title={locale === 'es' ? 'Repositorio Privado / Enterprise (Acceso Restringido)' : 'Private Repository (Restricted Access)'}
                      >
                        <Lock size={12} />{locale === 'es' ? 'Repo Privado' : 'Private Repo'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Placeholder */}
          {placeholder && (
            <motion.div
              custom={realProjects.length * 0.1}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
              className="rounded-xl p-6 border-2 border-dashed flex flex-col items-center justify-center min-h-52 gap-3"
              style={{ borderColor: c.border }}
            >
              <div className="w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center"
                style={{ borderColor: c.border }}>
                <Plus size={18} style={{ color: c.textMuted }} />
              </div>
              <p className="font-medium text-sm" style={{ color: c.textMuted }}>{t.projects.comingSoon}</p>
              <p className="text-xs text-center max-w-48" style={{ color: c.textMuted }}>{t.projects.comingSoonDesc}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
