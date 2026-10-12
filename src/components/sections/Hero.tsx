import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { MapPin, Download, Mail } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { personal } from '../../data/personal';
import { colors } from '../../utils/colors';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay },
  }),
};

export function Hero() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const c = colors[theme];
  const [copied, setCopied] = useState(false);
  const [showCvMenu, setShowCvMenu] = useState(false);

  const handleEmailClick = () => {
    const email = atob('ZWxpYW4ubmFodWVsMDM0OEBnbWFpbC5jb20=');
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    window.location.href = `mailto:${email}`;
  };

  return (
    <section id="hero" className="section-padding">
      <div className="section-container">
        <div className="hero-grid">

          {/* ── Columna izquierda: Identidad + CTAs ── */}
          <div className="hero-left">

            {/* Name */}
            <motion.h1
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4"
              style={{ color: c.textPrimary, letterSpacing: '-0.04em' }}
            >
              {personal.name}
            </motion.h1>

            {/* Role */}
            <motion.p
              custom={0.1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-lg sm:text-xl font-medium mb-3"
              style={{ color: c.accent }}
            >
              {t.hero.role}
            </motion.p>

            {/* Subtitle */}
            <motion.p
              custom={0.2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-sm sm:text-base mb-3"
              style={{ color: c.textSecondary }}
            >
              {t.hero.subtitle}
            </motion.p>

            {/* Location */}
            <motion.div
              custom={0.3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center gap-1.5 mb-8"
            >
              <MapPin size={13} style={{ color: c.textMuted }} />
              <span className="text-sm" style={{ color: c.textMuted }}>{t.hero.location}</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              custom={0.4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3"
            >
              {/* Bilingual CV Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowCvMenu(!showCvMenu)}
                  className="btn-primary flex items-center gap-2 cursor-pointer"
                  aria-expanded={showCvMenu}
                >
                  <Download size={14} />
                  {t.hero.downloadCV}
                  <span className="text-[10px] opacity-80">▾</span>
                </button>

                <AnimatePresence>
                  {showCvMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute left-0 top-full mt-2 w-56 rounded-xl border p-1.5 shadow-xl z-50 backdrop-blur-md"
                      style={{ backgroundColor: c.bgElevated, borderColor: c.border }}
                    >
                      <a
                        href="/CV_Elian_Nahuel_ES.pdf"
                        download="CV_Elian_Nahuel_ES.pdf"
                        onClick={() => setShowCvMenu(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors hover:bg-white/10 cursor-pointer"
                        style={{ color: c.textPrimary }}
                      >
                        <span className="flex items-center gap-2">
                          <span>🇦🇷</span>
                          <span>CV (Español)</span>
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10" style={{ color: c.accent }}>PDF</span>
                      </a>
                      <a
                        href="/CV_Elian_Nahuel_EN.pdf"
                        download="CV_Elian_Nahuel_EN.pdf"
                        onClick={() => setShowCvMenu(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors hover:bg-white/10 cursor-pointer"
                        style={{ color: c.textPrimary }}
                      >
                        <span className="flex items-center gap-2">
                          <span>🇺🇸</span>
                          <span>Resume (English)</span>
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10" style={{ color: c.accent }}>PDF</span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ cursor: 'pointer' }}>
                <FiGithub size={14} />
                GitHub
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ cursor: 'pointer' }}>
                <FiLinkedin size={14} />
                LinkedIn
              </a>
              <div className="relative">
                <button
                  onClick={handleEmailClick}
                  className="btn-secondary"
                  style={{ cursor: 'pointer' }}
                >
                  <Mail size={14} />
                  Email
                </button>
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap border shadow-lg z-50"
                      style={{
                        backgroundColor: c.bgElevated,
                        borderColor: c.accentBorder,
                        color: c.accent,
                      }}
                    >
                      ¡Copiado! 📋
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ── Columna derecha: Perfil Profesional ── */}
          <motion.div
            id="about"
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="hero-right"
            style={{
              borderLeft: `1px solid ${c.border}`,
              paddingLeft: '2rem',
              minHeight: '260px',
            }}
          >
            <h2 className="section-title mb-3" style={{ color: c.textPrimary }}>
              {t.about.title}
            </h2>
            <div
              className="section-divider"
              style={{ marginBottom: '1.5rem' }}
            />

            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: c.textSecondary }}
            >
              {t.about.bio}
            </p>

            <div className="flex flex-wrap gap-2">
              {t.about.badges.map((badge, i) => (
                <motion.span
                  key={badge}
                  custom={0.3 + i * 0.05}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="accent-tag tag"
                >
                  {badge}
                </motion.span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
