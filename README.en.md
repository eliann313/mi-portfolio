# 👨‍💻 Professional Portfolio — Elian Nahuel

[![Leer en español](https://img.shields.io/badge/Idioma-Espa%C3%B1ol-blue.svg)](README.md)
![Dependabot Status](https://img.shields.io/badge/dependabot-enabled-brightgreen?logo=dependabot)
![CI Build](https://github.com/eliann313/mi-portfolio/actions/workflows/ci.yml/badge.svg)

> [!NOTE]
> **Leer este README en español:** [README.md](README.md)

Welcome to my professional portfolio repository. I am **Elian Nahuel**, a Full Stack Developer focused on **Backend Development and Data Modeling**, currently pursuing a **Bachelor's Degree in Data Science** (Universidad de la Ciudad de Buenos Aires - UDECI) and holding a **Higher Technical Degree in Software Development** (IFTS N°11).

🌐 **Live Portfolio:** [elian-nahuel-portfolio.vercel.app](https://elian-nahuel-portfolio.vercel.app/)

---

## 📌 Featured Projects

### 🟢 1. [SkillRadar](https://skillradar-app.vercel.app) *(Dual-Role SaaS — Personal Project)*
- **Description:** Privacy-first SaaS platform featuring guided workflows for CV analysis, job matching, and AI-assisted mock interviews.
- **Tech Stack:** Next.js 16 (App Router), TypeScript, Prisma, Neon (PostgreSQL), Vercel AI SDK, Playwright, GitHub Actions.
- **Repository:** [github.com/eliann313/SkillRadar](https://github.com/eliann313/SkillRadar)

### 🟡 2. GridHub WMS *(Multi-Tenant Logistics System — Startup / Commercial)*
- **Description:** Enterprise logistics management system with per-client data isolation, offline resilience (IndexedDB), and layered architecture (Onion Architecture).
- **Tech Stack:** Python, FastAPI, SQLAlchemy, Alembic, React 19, TypeScript, IndexedDB, SQLite.

### 🔵 3. [Pochocleando](https://github.com/Antonio-sharp-plus/Pochocleando) *(AI-Powered Multimedia Review App — Group Project)*
- **Description:** Movie and TV show review web app integrated with TMDB API and featuring an AI assistant (Pochi) powered by Gemini API.
- **Tech Stack:** Node.js, Express, MongoDB, Mongoose, Angular, TypeScript, Gemini API.

### 🟣 4. [PokeApp](https://github.com/Juamp1Sch/Proyect-Pokedex) *(Hybrid Web/Mobile App — Group Project)*
- **Description:** Responsive hybrid application featuring Firebase authentication and external REST API consumption.
- **Tech Stack:** Ionic, Angular, TypeScript, Firebase Auth, PokeAPI.

---

## ⚡ Performance & Optimization (Lighthouse)

The portfolio was subjected to strict production performance audits via Google Lighthouse (deployed on **Vercel's** global CDN), achieving outstanding scores:

| Platform | Performance ⚡ | Accessibility ♿ | Best Practices 🛡️ | SEO 🔍 |
| :--- | :---: | :---: | :---: | :---: |
| **Desktop** | **100** | **100** | **100** | **100** |
| **Mobile** | **98** | **100** | **100** | **100** |

### 🛠️ Optimization Strategies Applied:
- **Zero Blocking CDNs (Font & Icon Trap Eradication):** Fonts are served locally using `@fontsource/dm-sans` and `@fontsource/dm-mono`. Technology logos in the Skills section are injected as clean inline SVGs via `react-icons`.
- **Layout Shift Prevention (CLS: ~0.00):** Minimum heights enforced on key header containers (Hero) to prevent layout shifts during font loading.
- **Accessibility & Contrast Rigor (WCAG AA):** Color palette tailored to ensure all secondary texts comfortably exceed the 4.5:1 contrast ratio required for visual accessibility.
- **SEO & Social Cards:** Comprehensive OpenGraph and Twitter Card metadata setup, paired with `og-image.png` (1200x630) generation for social sharing previews.

---

## 🛠️ Portfolio Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4 + Native CSS
- **Animations:** Framer Motion
- **Iconography:** Lucide React & React Icons
- **CI/CD:** GitHub Actions (Type checking & compilation validation)
- **Maintenance:** Dependabot

---

## 💻 Local Development

```bash
# 1. Clone repository
git clone https://github.com/eliann313/mi-portfolio.git
cd mi-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Validate build
npm run build
```
