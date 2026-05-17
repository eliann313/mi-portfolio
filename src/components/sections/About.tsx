import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { colors } from '../../utils/colors';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay },
  }),
};

export function About() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const c = colors[theme];

  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} custom={0}>
          <h2 className="section-title" style={{ color: c.textPrimary }}>{t.about.title}</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="max-w-3xl">
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp} custom={0.1}
            className="text-base leading-relaxed mb-8"
            style={{ color: c.textSecondary }}
          >
            {t.about.bio}
          </motion.p>

          <div className="flex flex-wrap gap-2">
            {t.about.badges.map((badge, i) => (
              <motion.span
                key={badge}
                custom={0.15 + i * 0.05}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                className="accent-tag tag"
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
