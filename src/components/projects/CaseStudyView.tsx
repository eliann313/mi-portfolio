import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, CheckCircle2, AlertTriangle, Layers, Image as ImageIcon, X, ArrowRight, HelpCircle, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Lock, Database, Cpu, ShieldCheck, Code2 } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { caseStudies } from '../../data/caseStudies';
import { projects } from '../../data/projects';
import { colors } from '../../utils/colors';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { ArchitectureAndDBSchema } from './ArchitectureAndDBSchema';
import { VideoTimestampPlayer } from './VideoTimestampPlayer';
import type { Locale } from '../../types';

export function CaseStudyView() {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const { locale, t } = useLanguage();
  const c = colors[theme];

  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const study = slug ? caseStudies[slug] : undefined;
  const project = slug ? projects.find(p => p.id === slug) : undefined;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (activeImageIndex === null || !study?.screenshots) return;
      if (e.key === 'Escape') {
        setActiveImageIndex(null);
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex(prev => (prev !== null && prev < (study.screenshots?.length || 1) - 1 ? prev + 1 : 0));
        setIsZoomed(false);
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex(prev => (prev !== null && prev > 0 ? prev - 1 : (study.screenshots?.length || 1) - 1));
        setIsZoomed(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, study?.screenshots]);

  const realProjects = projects.filter(p => !p.isPlaceholder);
  const currentIndex = realProjects.findIndex(p => p.id === slug);
  const prevProject = currentIndex > 0 ? realProjects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < realProjects.length - 1 ? realProjects[currentIndex + 1] : null;

  if (!study || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ backgroundColor: c.bgBase }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: c.textPrimary }}>Proyecto no encontrado</h2>
        <Link to="/" className="btn-primary">
          <ArrowLeft size={16} /> {t.caseStudy.backToProjects}
        </Link>
      </div>
    );
  }

  const challenges = study.technicalChallenges[locale as Locale] || [];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6" style={{ backgroundColor: c.bgBase }}>
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors"
          style={{ color: c.accent }}
        >
          <ArrowLeft size={16} />
          {t.caseStudy.backToProjects}
        </Link>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full border"
              style={{ backgroundColor: `${c.accent}18`, color: c.accent, borderColor: c.accentBorder }}
            >
              {study.badge[locale as Locale]}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full border" style={{ color: c.textMuted, borderColor: c.border }}>
              {project.type === 'group' ? t.projects.group : t.projects.individual}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: c.textPrimary, letterSpacing: '-0.03em' }}>
            {study.projectTitle}
          </h1>

          <p className="text-lg leading-relaxed mb-6" style={{ color: c.textSecondary }}>
            {study.subtitle[locale as Locale]}
          </p>

          {/* Stack Pills & Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t" style={{ borderColor: c.border }}>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map(tech => (
                <span key={tech} className="tag text-xs" style={{ color: c.textMuted, backgroundColor: c.bgSurface, borderColor: c.border }}>
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn-primary !py-1.5 !px-3.5 !text-xs">
                  <ExternalLink size={13} /> {t.projects.viewDemo}
                </a>
              )}
              {project.links.repo && project.links.repo !== '#' && (
                <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="btn-secondary !py-1.5 !px-3.5 !text-xs">
                  <FiGithub size={13} /> {t.projects.viewRepo}
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Recruiter Technical Snapshot */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-xl border mb-10" style={{ backgroundColor: c.bgSurface, borderColor: c.border }}>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-wider mb-1 flex items-center gap-1.5" style={{ color: c.textMuted }}>
              <Cpu size={12} style={{ color: c.accent }} />
              {locale === 'es' ? 'Rol y Liderazgo' : 'Role & Ownership'}
            </span>
            <span className="text-xs font-semibold" style={{ color: c.textPrimary }}>
              {project.roles[locale as Locale].join(' · ')}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-wider mb-1 flex items-center gap-1.5" style={{ color: c.textMuted }}>
              <Code2 size={12} style={{ color: c.accent }} />
              {locale === 'es' ? 'Modalidad y Alcance' : 'Project Scope'}
            </span>
            <span className="text-xs font-semibold flex items-center gap-1.5" style={{ color: c.textPrimary }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.type === 'group' ? '#38bdf8' : c.accent }} />
              {project.type === 'group'
                ? (locale === 'es' ? 'Grupal (Scrum / Agile)' : 'Team (Scrum / Agile)')
                : (locale === 'es' ? 'Individual (End-to-End)' : 'Solo (End-to-End)')}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-wider mb-1 flex items-center gap-1.5" style={{ color: c.textMuted }}>
              <Database size={12} style={{ color: c.accent }} />
              {locale === 'es' ? 'Persistencia y Motor' : 'Database & Engine'}
            </span>
            <span className="text-xs font-semibold truncate" style={{ color: c.textPrimary }}>
              {study.dbSchema ? study.dbSchema.engine.split(' · ')[0] : (project.stack.find(s => s.toLowerCase().includes('sql') || s.toLowerCase().includes('mongo') || s.toLowerCase().includes('indexeddb') || s.toLowerCase().includes('firebase')) || 'Client State')}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-wider mb-1 flex items-center gap-1.5" style={{ color: c.textMuted }}>
              <ShieldCheck size={12} style={{ color: c.accent }} />
              {locale === 'es' ? 'Calidad y Pruebas' : 'Quality & Testing'}
            </span>
            <span className="text-xs font-semibold truncate" style={{ color: c.textPrimary }}>
              {project.stack.filter(s => s.includes('Playwright') || s.includes('Vitest') || s.includes('Pytest') || s.includes('Actions')).join(' + ') || (locale === 'es' ? 'Linting y Verificación' : 'Linting & Verification')}
            </span>
          </div>
        </div>

        {/* 1. Overview */}
        <section className="mb-10 rounded-xl p-6 border" style={{ backgroundColor: c.bgSurface, borderColor: c.border }}>
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2" style={{ color: c.textPrimary }}>
            <Layers size={18} style={{ color: c.accent }} />
            {t.caseStudy.overviewTitle}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: c.textSecondary }}>
            {study.overview[locale as Locale]}
          </p>
        </section>

        {/* 2. My Role & Key Contributions */}
        <section className="mb-10 rounded-xl p-6 border" style={{ backgroundColor: c.bgSurface, borderColor: c.border }}>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: c.textPrimary }}>
            <CheckCircle2 size={18} style={{ color: c.accent }} />
            {t.caseStudy.myRoleTitle}
          </h3>
          <ul className="space-y-2 text-sm">
            {study.myRoleDetailed[locale as Locale].map((contribution, idx) => (
              <li key={idx} className="flex items-start gap-2.5" style={{ color: c.textSecondary }}>
                <span className="mt-1 flex-shrink-0 font-bold" style={{ color: c.accent }}>✓</span>
                <span className="leading-relaxed">{contribution}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Architecture & PostgreSQL Relational Schema Explorer */}
        {(study.systemArchitecture || study.dbSchema) && (
          <ArchitectureAndDBSchema
            dbSchema={study.dbSchema}
            systemArchitecture={study.systemArchitecture}
          />
        )}

        {/* 3.1 Container Interconnect & Transaction Protocol Diagram */}
        {study.c4Diagram && (
          <section className="mb-10">
            <ArchitectureDiagram diagram={study.c4Diagram} />
          </section>
        )}

        {/* 3.2 Domains Breakdown (DDD) */}
        {study.domainsBreakdown && (
          <section className="mb-10 rounded-xl p-6 border" style={{ backgroundColor: c.bgSurface, borderColor: c.border }}>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: c.textPrimary }}>
              <Layers size={18} style={{ color: c.accent }} />
              {study.domainsBreakdown.title[locale as Locale] || t.caseStudy.domainsTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {study.domainsBreakdown.items.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-lg border flex flex-col justify-between" style={{ backgroundColor: c.bgElevated, borderColor: c.border }}>
                  <span className="font-semibold text-xs mb-1" style={{ color: c.accent }}>{item.name}</span>
                  <p className="text-xs leading-relaxed" style={{ color: c.textSecondary }}>{item.desc[locale as Locale]}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3.3 Architecture Highlights */}
        <section className="mb-10 rounded-xl p-6 border" style={{ backgroundColor: c.bgSurface, borderColor: c.border }}>
          <h3 className="font-bold text-lg mb-4" style={{ color: c.textPrimary }}>
            {t.caseStudy.architectureTitle}
          </h3>
          <ul className="space-y-2 text-sm">
            {study.architectureHighlights[locale as Locale].map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2.5" style={{ color: c.textSecondary }}>
                <span className="mt-1 flex-shrink-0" style={{ color: c.accent }}>›</span>
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 3.4 Key Architecture Decisions (ADRs) */}
        {study.adrs && (
          <section className="mb-10 rounded-xl p-6 border" style={{ backgroundColor: c.bgSurface, borderColor: c.border }}>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: c.textPrimary }}>
              <HelpCircle size={18} style={{ color: c.accent }} />
              {study.adrs.title[locale as Locale] || t.caseStudy.adrsTitle}
            </h3>
            <div className="space-y-4">
              {study.adrs.items.map((adr, idx) => (
                <div key={idx} className="p-4 rounded-lg border" style={{ backgroundColor: c.bgElevated, borderColor: c.border }}>
                  <p className="text-xs font-semibold mb-1.5" style={{ color: c.textPrimary }}>
                    {adr.question[locale as Locale]}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: c.textSecondary }}>
                    {adr.decision[locale as Locale]}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Technical Challenges & Engineering Solutions */}
        {challenges.length > 0 && (
          <section className="mb-10 rounded-xl p-6 border" style={{ backgroundColor: c.bgSurface, borderColor: c.border }}>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: c.textPrimary }}>
              <AlertTriangle size={18} style={{ color: c.accent }} />
              {t.caseStudy.technicalChallengesTitle}
            </h3>
            <div className="space-y-4">
              {challenges.map((challenge, idx) => (
                <div key={idx} className="p-4 rounded-lg border" style={{ backgroundColor: c.bgElevated, borderColor: c.border }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: '#f87171' }}>
                    {t.caseStudy.problemLabel}
                  </p>
                  <p className="text-xs mb-3 font-medium" style={{ color: c.textPrimary }}>
                    {challenge.problem}
                  </p>
                  <p className="text-xs font-semibold mb-1" style={{ color: '#4ade80' }}>
                    {t.caseStudy.solutionLabel}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: c.textSecondary }}>
                    {challenge.solution}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Video Demo (if present) */}
        {study.videoData && (
          <section className="mb-10">
            <VideoTimestampPlayer src={study.videoData.src} timestamps={study.videoData.timestamps} />
          </section>
        )}

        {/* 5.1 Interface & Showcase Gallery */}
        {study.screenshots && study.screenshots.length > 0 && (
          <section className="mb-10 rounded-xl p-6 border" style={{ backgroundColor: c.bgSurface, borderColor: c.border }}>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: c.textPrimary }}>
              <ImageIcon size={18} style={{ color: c.accent }} />
              {t.caseStudy.galleryTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {study.screenshots.map((shot, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className="rounded-lg overflow-hidden border cursor-pointer group flex flex-col justify-between transition-all hover:scale-[1.01]"
                  style={{ backgroundColor: c.bgElevated, borderColor: c.border }}
                >
                  <div className="overflow-hidden bg-black flex items-center justify-center min-h-[180px] max-h-[240px]">
                    <img
                      src={shot.url}
                      alt={shot.title[locale as Locale]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-xs mb-1" style={{ color: c.textPrimary }}>
                      {shot.title[locale as Locale]}
                    </h4>
                    <p className="text-[11px] leading-tight" style={{ color: c.textMuted }}>
                      {shot.caption[locale as Locale]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeImageIndex !== null && study.screenshots && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setActiveImageIndex(null);
                setIsZoomed(false);
              }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md p-4 sm:p-6 flex flex-col items-center justify-between cursor-pointer"
            >
              {/* Lightbox Top Control Bar */}
              <div
                onClick={e => e.stopPropagation()}
                className="w-full max-w-5xl flex items-center justify-between pb-3 cursor-default"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/20">
                    {activeImageIndex + 1} / {study.screenshots.length}
                  </span>
                  <h4 className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
                    {study.screenshots[activeImageIndex].title[locale as Locale]}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                    title={isZoomed ? 'Alejar' : 'Acercar'}
                  >
                    {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
                  </button>
                  <button
                    onClick={() => {
                      setActiveImageIndex(null);
                      setIsZoomed(false);
                    }}
                    className="p-2 rounded-lg bg-white/10 text-white hover:bg-red-500/80 transition-colors"
                    title="Cerrar (Esc)"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Main Image with Navigation Arrows */}
              <div
                onClick={e => e.stopPropagation()}
                className="relative w-full max-w-5xl flex-1 flex items-center justify-center overflow-auto cursor-default py-2"
              >
                {/* Prev Button */}
                {study.screenshots.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex(prev => (prev !== null && prev > 0 ? prev - 1 : study.screenshots!.length - 1));
                      setIsZoomed(false);
                    }}
                    className="absolute left-2 sm:left-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 border border-white/20 transition-all backdrop-blur-sm"
                    title="Anterior (Flecha Izq)"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}

                {/* Screenshot Display */}
                <img
                  src={study.screenshots[activeImageIndex].url}
                  alt={study.screenshots[activeImageIndex].title[locale as Locale]}
                  onClick={() => setIsZoomed(!isZoomed)}
                  className={`object-contain rounded-xl border border-white/20 shadow-2xl transition-transform duration-200 cursor-zoom-in ${
                    isZoomed ? 'scale-125 max-h-[85vh] cursor-zoom-out' : 'max-h-[72vh] max-w-full'
                  }`}
                />

                {/* Next Button */}
                {study.screenshots.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex(prev => (prev !== null && prev < study.screenshots!.length - 1 ? prev + 1 : 0));
                      setIsZoomed(false);
                    }}
                    className="absolute right-2 sm:right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 border border-white/20 transition-all backdrop-blur-sm"
                    title="Siguiente (Flecha Der)"
                  >
                    <ChevronRight size={24} />
                  </button>
                )}
              </div>

              {/* Bottom Caption */}
              <div
                onClick={e => e.stopPropagation()}
                className="max-w-2xl text-center pt-2 cursor-default"
              >
                <p className="text-xs text-gray-300 leading-relaxed">
                  {study.screenshots[activeImageIndex].caption[locale as Locale]}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 10. Bottom Action Card (CTA) */}
        <section className="mb-10 rounded-xl p-6 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ backgroundColor: c.bgSurface, borderColor: c.border }}>
          <div>
            <h4 className="font-bold text-base mb-1" style={{ color: c.textPrimary }}>{study.projectTitle}</h4>
            <p className="text-xs" style={{ color: c.textMuted }}>{project.stack.join(' · ')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2 !px-4 !text-xs">
                <ExternalLink size={13} /> {t.caseStudy.viewLiveDemo}
              </a>
            )}
            {project.links.repo && project.links.repo !== '#' && !project.links.isPrivate && (
              <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="btn-secondary !py-2 !px-4 !text-xs">
                <FiGithub size={13} /> {t.caseStudy.viewRepository}
              </a>
            )}
            {project.links.isPrivate && (
              <span
                className="btn-secondary !py-2 !px-4 !text-xs opacity-75 cursor-not-allowed inline-flex items-center gap-1.5"
                title={locale === 'es' ? 'Repositorio Privado / Enterprise (Acceso Restringido)' : 'Private Repository (Restricted Access)'}
              >
                <Lock size={13} /> {locale === 'es' ? 'Repositorio Privado' : 'Private Repository'}
              </span>
            )}
            <Link to="/#projects" className="btn-secondary !py-2 !px-4 !text-xs">
              <ArrowLeft size={13} /> {t.caseStudy.backToProjects}
            </Link>
          </div>
        </section>

        {/* 11. Next / Previous Project Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t" style={{ borderColor: c.border }}>
          {prevProject ? (
            <Link
              to={`/proyectos/${prevProject.id}`}
              className="p-4 rounded-xl border flex items-center gap-3 transition-colors group"
              style={{ backgroundColor: c.bgSurface, borderColor: c.border }}
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" style={{ color: c.accent }} />
              <div>
                <p className="text-[11px] font-medium" style={{ color: c.textMuted }}>{t.caseStudy.prevProject}</p>
                <p className="text-sm font-semibold" style={{ color: c.textPrimary }}>{prevProject.title}</p>
              </div>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link
              to={`/proyectos/${nextProject.id}`}
              className="p-4 rounded-xl border flex items-center justify-end gap-3 text-right transition-colors group sm:col-start-2"
              style={{ backgroundColor: c.bgSurface, borderColor: c.border }}
            >
              <div>
                <p className="text-[11px] font-medium" style={{ color: c.textMuted }}>{t.caseStudy.nextProject}</p>
                <p className="text-sm font-semibold" style={{ color: c.textPrimary }}>{nextProject.title}</p>
              </div>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" style={{ color: c.accent }} />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
