import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, AlertTriangle, Layers, Image as ImageIcon, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { caseStudies } from '../../data/caseStudies';
import { projects } from '../../data/projects';
import { colors } from '../../utils/colors';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { VideoTimestampPlayer } from './VideoTimestampPlayer';
import type { Locale } from '../../types';

export function CaseStudyView() {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const { locale, t } = useLanguage();
  const c = colors[theme];

  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const study = slug ? caseStudies[slug] : undefined;
  const project = slug ? projects.find(p => p.id === slug) : undefined;

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
                  <Github size={13} /> {t.projects.viewRepo}
                </a>
              )}
            </div>
          </div>
        </motion.div>

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

        {/* 3. Screenshots Gallery (if present) */}
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
              onClick={() => setActiveImageIndex(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm p-4 flex flex-col items-center justify-center cursor-pointer"
            >
              <button
                onClick={() => setActiveImageIndex(null)}
                className="absolute top-6 right-6 p-2 rounded-full border text-white hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.2)' }}
              >
                <X size={20} />
              </button>

              <div
                onClick={e => e.stopPropagation()}
                className="max-w-4xl max-h-[85vh] flex flex-col items-center cursor-default"
              >
                <img
                  src={study.screenshots[activeImageIndex].url}
                  alt={study.screenshots[activeImageIndex].title[locale as Locale]}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg border shadow-2xl"
                  style={{ borderColor: c.border }}
                />
                <div className="mt-4 text-center">
                  <h4 className="text-base font-bold text-white mb-1">
                    {study.screenshots[activeImageIndex].title[locale as Locale]}
                  </h4>
                  <p className="text-xs text-gray-300">
                    {study.screenshots[activeImageIndex].caption[locale as Locale]}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. Architecture C4 Diagram (if present) */}
        {study.c4Diagram && (
          <section className="mb-10">
            <ArchitectureDiagram diagram={study.c4Diagram} />
          </section>
        )}

        {/* 5. Architecture Highlights */}
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

        {/* 6. Technical Challenges */}
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

        {/* 7. Video Demo (Pochocleando) */}
        {study.videoData && (
          <section className="mb-10">
            <VideoTimestampPlayer src={study.videoData.src} timestamps={study.videoData.timestamps} />
          </section>
        )}
      </div>
    </div>
  );
}
