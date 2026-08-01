import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { useActiveSection } from '../../hooks/useActiveSection';
import { colors } from '../../utils/colors';

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'education', 'languages', 'contact'];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const activeSectionHook = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const c = colors[theme];

  const isHomePage = location.pathname === '/';
  const activeSection = isHomePage ? activeSectionHook : 'projects';

  const navLinks = [
    { id: 'about',     label: t.nav.about },
    { id: 'skills',    label: t.nav.skills },
    { id: 'projects',  label: t.nav.projects },
    { id: 'education', label: t.nav.education },
    { id: 'languages', label: t.nav.languages },
    { id: 'contact',   label: t.nav.contact },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const navbarHeight = 72; // 64px navbar + 8px buffer
    const top = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleLinkClick = (id: string) => {
    setMenuOpen(false);
    if (!isHomePage) {
      navigate(`/#${id}`);
    } else {
      scrollToSection(id);
    }
  };

  const navBg = theme === 'dark' ? 'rgba(9,9,11,0.85)' : 'rgba(255,255,255,0.85)';
  const navBorder = theme === 'dark' ? 'rgba(39,39,42,0.8)' : 'rgba(228,228,231,0.8)';

  return (
    <header className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: navBg, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: `1px solid ${navBorder}`, transition: 'background-color 0.3s ease' }}>
      <nav className="section-container flex items-center justify-between h-16 px-6">

        {/* Logo */}
        <button onClick={() => handleLinkClick('hero')} style={{ color: c.textPrimary, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
          className="flex items-center font-semibold text-sm tracking-wide" aria-label="Ir al inicio">
          Elian Nahuel
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <li key={link.id}>
              <button
                onClick={() => handleLinkClick(link.id)}
                style={{
                  color: activeSection === link.id ? c.accent : c.textSecondary,
                  cursor: 'pointer', background: 'none', border: 'none', padding: 0,
                  transition: 'color 0.2s',
                }}
                className="text-sm font-medium"
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Lang toggle */}
          <button
            onClick={toggleLocale}
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-md border text-xs font-mono font-semibold"
            style={{ borderColor: c.border, color: c.textSecondary, cursor: 'pointer', background: 'none', transition: 'color 0.2s, border-color 0.2s' }}
            aria-label={`Switch to ${locale === 'es' ? 'English' : 'Español'}`}
          >
            {locale === 'es' ? 'EN' : 'ES'}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-md border"
            style={{ borderColor: c.border, color: c.textSecondary, cursor: 'pointer', background: 'none', transition: 'color 0.2s, border-color 0.2s' }}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md border"
            style={{ borderColor: c.border, color: c.textSecondary, cursor: 'pointer', background: 'none', transition: 'color 0.2s' }}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ borderTop: `1px solid ${c.border}`, backgroundColor: theme === 'dark' ? 'rgba(9,9,11,0.97)' : 'rgba(255,255,255,0.97)', overflow: 'hidden' }}
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="w-full text-left py-2.5 text-sm font-medium"
                    style={{ color: activeSection === link.id ? c.accent : c.textSecondary, cursor: 'pointer', background: 'none', border: 'none' }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2" style={{ borderTop: `1px solid ${c.border}` }}>
                <button
                  onClick={() => { toggleLocale(); setMenuOpen(false); }}
                  className="py-2.5 text-sm font-mono font-medium"
                  style={{ color: c.textSecondary, cursor: 'pointer', background: 'none', border: 'none' }}
                >
                  {locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
