import { Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { personal } from '../../data/personal';
import { colors } from '../../utils/colors';

export function Footer() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const c = colors[theme];
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-8 px-6" style={{ borderTop: `1px solid ${c.border}` }}>
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs" style={{ color: c.textMuted }}>
          © {year} Elian Nahuel · {t.footer.rights}
        </p>
        <div className="flex items-center gap-3">
          {[
            { href: personal.github,   icon: <Github size={16} />,   label: 'GitHub' },
            { href: personal.linkedin, icon: <Linkedin size={16} />, label: 'LinkedIn' },
            { href: `mailto:${personal.email}`, icon: <Mail size={16} />, label: 'Email' },
          ].map(item => (
            <a key={item.label} href={item.href}
              target={item.href.startsWith('mailto') ? undefined : '_blank'}
              rel={item.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              style={{ color: c.textMuted, cursor: 'pointer', transition: 'color 0.2s' }}
              aria-label={item.label}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = c.accent; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = c.textMuted; }}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
