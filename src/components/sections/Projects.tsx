import { motion } from 'framer-motion';
import { ExternalLink, Github, Plus, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { projects } from '../../data/projects';
import { colors, type ColorMap } from '../../utils/colors';
import type { Locale, Project } from '../../types';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay },
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

  const realProjects = projects.filter(p => !p.isPlaceholder);
  const placeholder = projects.find(p => p.isPlaceholder);

  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} custom={0}>
          <h2 className="section-title" style={{ color: c.textPrimary }}>{t.projects.title}</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {realProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              custom={idx * 0.1}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              className="rounded-xl p-6 border flex flex-col justify-between"
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
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
                  <h3 className="font-semibold text-base" style={{ color: c.textPrimary }}>{project.title}</h3>
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
              </div>

              <div className="mt-auto pt-2">
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

                {/* Links */}
                <div className="flex items-center justify-between gap-2 flex-wrap pt-3 border-t" style={{ borderColor: c.border }}>
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
                    {project.links.repo && project.links.repo !== '#' && (
                      <a href={project.links.repo} target="_blank" rel="noopener noreferrer"
                        className="btn-secondary !py-1.5 !px-3 !text-xs" style={{ cursor: 'pointer' }}>
                        <Github size={12} />{t.projects.viewRepo}
                      </a>
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
