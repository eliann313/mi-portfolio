import { SpeedInsights } from '@vercel/speed-insights/react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Education } from './components/sections/Education';
import { Languages } from './components/sections/Languages';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Navbar />
        <main>
          <Hero />

          <Skills />
          <Projects />
          <Education />
          <Languages />
          <Contact />
        </main>
        <Footer />
        <SpeedInsights />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
