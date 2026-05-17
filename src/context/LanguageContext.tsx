import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Locale, Translations } from '../types';
import { translations } from '../i18n';

interface LanguageContextType {
  locale: Locale;
  toggleLocale: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function getInitialLocale(): Locale {
  const stored = localStorage.getItem('locale');
  if (stored === 'es' || stored === 'en') return stored;
  return navigator.language.startsWith('es') ? 'es' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const toggleLocale = () => {
    setLocale(prev => (prev === 'es' ? 'en' : 'es'));
  };

  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguageContext must be used inside LanguageProvider');
  return ctx;
}
