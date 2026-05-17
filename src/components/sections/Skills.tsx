import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { skillCategories } from '../../data/skills';
import { colors } from '../../utils/colors';
import type { Locale } from '../../types';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay },
  }),
};

export function Skills() {
  const { theme } = useTheme();
  const { locale, t } = useLanguage();
  const c = colors[theme];

  return (
    <section id="skills" className="section-padding" style={{ backgroundColor: c.bgSurface }}>
      <div className="section-container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} custom={0}>
          <h2 className="section-title" style={{ color: c.textPrimary }}>{t.skills.title}</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={catIdx}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp} custom={catIdx * 0.07}
              className="rounded-xl p-5 border"
              style={{ backgroundColor: c.bgElevated, borderColor: c.border }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: c.accent }}>
                {cat.category[locale as Locale]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono font-medium"
                    style={{ backgroundColor: c.bgBase, borderColor: c.border, color: c.textSecondary }}
                  >
                    {skill.icon && (
                      <i
                        className={`${skill.icon} text-base leading-none`}
                        aria-hidden="true"
                        style={
                          theme === 'dark' && (skill.name === 'SQLAlchemy' || skill.name === 'Linux')
                            ? { filter: 'invert(1) brightness(1.6)' }
                            : undefined
                        }
                      />
                    )}
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
