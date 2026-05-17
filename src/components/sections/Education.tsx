import { motion } from 'framer-motion';
import { GraduationCap, CheckCircle, Clock } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { educationEntries } from '../../data/education';
import { colors } from '../../utils/colors';
import type { Locale } from '../../types';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay },
  }),
};

export function Education() {
  const { theme } = useTheme();
  const { locale, t } = useLanguage();
  const c = colors[theme];

  return (
    <section id="education" className="section-padding" style={{ backgroundColor: c.bgSurface }}>
      <div className="section-container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} custom={0}>
          <h2 className="section-title" style={{ color: c.textPrimary }}>{t.education.title}</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="flex flex-col gap-4 max-w-2xl">
          {educationEntries.map((entry, idx) => (
            <motion.div
              key={idx}
              custom={idx * 0.1}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
              className="rounded-xl p-5 border flex gap-4"
              style={{ backgroundColor: c.bgElevated, borderColor: c.border }}
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: c.accentBg }}>
                <GraduationCap size={18} style={{ color: c.accent }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                  <h3 className="font-semibold text-sm" style={{ color: c.textPrimary }}>
                    {entry.title[locale as Locale]}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs font-medium flex-shrink-0"
                    style={{
                      color: entry.status === 'completed'
                        ? (theme === 'dark' ? '#4ade80' : '#15803d')
                        : (theme === 'dark' ? c.accent : '#0e7490'),
                    }}>
                    {entry.status === 'completed' ? <CheckCircle size={12} /> : <Clock size={12} />}
                    {entry.status === 'completed' ? t.education.completed : t.education.inProgress}
                  </span>
                </div>
                <p className="text-sm mb-1" style={{ color: c.textSecondary }}>
                  {entry.institution[locale as Locale]}
                </p>
                <p className="text-xs font-mono" style={{ color: c.textMuted }}>{entry.period}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
