import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { spokenLanguages } from '../../data/education';
import { colors } from '../../utils/colors';
import type { Locale } from '../../types';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay },
  }),
};

export function Languages() {
  const { theme } = useTheme();
  const { locale, t } = useLanguage();
  const c = colors[theme];

  return (
    <section id="languages" className="section-padding">
      <div className="section-container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} custom={0}>
          <h2 className="section-title" style={{ color: c.textPrimary }}>{t.languages.title}</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
          {spokenLanguages.map((lang, idx) => (
            <motion.div
              key={idx}
              custom={idx * 0.1}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
              className="flex-1 rounded-xl p-5 border"
              style={{ backgroundColor: c.bgSurface, borderColor: c.border }}
            >
              {/* Language name */}
              <p className="font-semibold text-base mb-2" style={{ color: c.textPrimary }}>
                {lang.language[locale as Locale]}
              </p>

              {/* Level + CEFR inline */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-sm font-medium" style={{ color: c.accent }}>
                  {lang.level[locale as Locale]}
                </span>
                {lang.cefr && (
                  <span
                    className="text-xs font-mono px-1.5 py-0.5 rounded border"
                    style={{
                      color: c.textMuted,
                      borderColor: c.border,
                      backgroundColor: c.bgElevated,
                    }}
                  >
                    {lang.cefr}
                  </span>
                )}
              </div>

              {/* Detail */}
              {lang.detail && (
                <p className="text-xs leading-relaxed" style={{ color: c.textSecondary }}>
                  {lang.detail[locale as Locale]}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
