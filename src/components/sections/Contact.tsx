import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';
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

export function Contact() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const c = colors[theme];
  const [copied, setCopied] = useState(false);

  const links = [
    { id: 'email',    label: t.contact.emailLabel, icon: <Mail size={18} />,     value: 'elian.nahuel0348@gmail.com' },
    { id: 'linkedin', label: 'LinkedIn',           icon: <Linkedin size={18} />, value: 'linkedin.com/in/eliannahuel' },
    { id: 'github',   label: 'GitHub',             icon: <Github size={18} />,   value: 'github.com/eliann313' },
  ] as const;

  const handleCardClick = (id: 'email' | 'linkedin' | 'github') => {
    if (id === 'email') {
      const email = atob('ZWxpYW4ubmFodWVsMDM0OEBnbWFpbC5jb20=');
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      window.location.href = `mailto:${email}`;
    } else if (id === 'linkedin') {
      window.open(atob('aHR0cHM6Ly9saW5rZWRpbi5jb20vaW4vZWxpYW5uYWh1ZWw='), '_blank', 'noopener,noreferrer');
    } else if (id === 'github') {
      window.open(atob('aHR0cHM6Ly9naXRodWIuY29tL2VsaWFubjMxMw=='), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: c.bgSurface }}>
      <div className="section-container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} custom={0}>
          <h2 className="section-title" style={{ color: c.textPrimary }}>{t.contact.title}</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="flex flex-col gap-3.5 max-w-md">
          {links.map((link, idx) => (
            <motion.div
              key={link.id}
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick(link.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(link.id);
                }
              }}
              custom={0.05 + idx * 0.07}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{
                y: -4,
                borderColor: c.accent,
                backgroundColor: theme === 'dark' ? c.bgElevated : c.bgBase,
                boxShadow: theme === 'dark' 
                  ? '0 10px 25px -5px rgba(0,0,0,0.5), 0 8px 10px -6px rgba(0,0,0,0.5)' 
                  : '0 10px 25px -5px rgba(0,0,0,0.06), 0 8px 10px -6px rgba(0,0,0,0.06)'
              }}
              className="flex items-center gap-4 p-4 rounded-xl border select-none outline-none"
              style={{
                backgroundColor: theme === 'dark' ? c.bgSurface : c.bgElevated,
                borderColor: c.border,
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <span style={{ color: c.accent }} className="flex-shrink-0">{link.icon}</span>
              <div className="flex-grow">
                <p className="text-xs font-semibold mb-0.5 uppercase tracking-wider" style={{ color: c.textMuted }}>{link.label}</p>
                <p className="text-sm font-medium break-all" style={{ color: c.textPrimary }}>{link.value}</p>
              </div>
              
              {link.id === 'email' && (
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.85, x: 10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.85, x: 10 }}
                      className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-md border shadow-sm whitespace-nowrap ml-auto"
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
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
