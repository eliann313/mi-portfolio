# 👨‍💻 Portfolio Profesional — Elian Nahuel

[![Read in English](https://img.shields.io/badge/Language-English-blue.svg)](README.en.md)
![Dependabot Status](https://img.shields.io/badge/dependabot-enabled-brightgreen?logo=dependabot)
![CI Build](https://github.com/eliann313/mi-portfolio/actions/workflows/ci.yml/badge.svg)

> [!NOTE]
> **Read this README in English:** [README.en.md](README.en.md)

Bienvenido al repositorio de mi portfolio profesional. Soy **Elian Nahuel**, Desarrollador Full Stack orientado a **Backend y Modelado de Datos**, actualmente cursando la **Licenciatura en Ciencia de Datos** (Universidad de la Ciudad de Buenos Aires - UDECI) y graduado como **Técnico Superior en Desarrollo de Software** (Instituto de Formación Técnica Superior N°11 - IFTS N°11).

🌐 **Portfolio en vivo:** [elian-nahuel-portfolio.vercel.app](https://elian-nahuel-portfolio.vercel.app/)

---

## 📌 Proyectos Destacados

### 🟢 1. [SkillRadar](https://skillradar-app.vercel.app) *(SaaS Dual-Role — Proyecto Personal)*
- **Descripción:** Plataforma SaaS privacy-first con flujo guiado de análisis de CV, emparejamiento laboral y entrevistas simuladas asistidas por IA.
- **Tech Stack:** Next.js 16 (App Router), TypeScript, Prisma, Neon (PostgreSQL), Vercel AI SDK, Playwright, GitHub Actions.
- **Repo:** [github.com/eliann313/SkillRadar](https://github.com/eliann313/SkillRadar)

### 🟡 2. GridHub WMS *(Sistema Logístico Multi-Tenant — Startup / Comercial)*
- **Descripción:** Sistema de gestión logística empresarial con aislamiento de datos por cliente, resiliencia offline (IndexedDB) y arquitectura por capas (Onion Architecture).
- **Tech Stack:** Python, FastAPI, SQLAlchemy, Alembic, React 19, TypeScript, IndexedDB, SQLite.

### 🔵 3. [Pochocleando](https://github.com/Antonio-sharp-plus/Pochocleando) *(App Multimedia con IA — Proyecto Grupal)*
- **Descripción:** App de reseñas de películas y series integrada con TMDB API y asistente de IA (Pochi) impulsado por Gemini API.
- **Tech Stack:** Node.js, Express, MongoDB, Mongoose, Angular, TypeScript, Gemini API.

### 🟣 4. [PokeApp](https://github.com/Juamp1Sch/Proyect-Pokedex) *(App Híbrida Web/Mobile — Proyecto Grupal)*
- **Descripción:** Aplicación híbrida responsive con autenticación Firebase y consumo de REST API externa.
- **Tech Stack:** Ionic, Angular, TypeScript, Firebase Auth, PokeAPI.

---

## ⚡ Rendimiento y Optimización (Lighthouse)

El portfolio fue sometido a strictly auditorías de rendimiento en producción mediante Google Lighthouse (desplegado en el CDN global de **Vercel**), logrando una calificación sobresaliente:

| Plataforma | Performance ⚡ | Accessibility ♿ | Best Practices 🛡️ | SEO 🔍 |
| :--- | :---: | :---: | :---: | :---: |
| **Escritorio (Desktop)** | **100** | **100** | **100** | **100** |
| **Móvil (Mobile)** | **98** | **100** | **100** | **100** |

### 🛠️ Estrategias de Optimización Aplicadas:
- **Zero CDNs Bloqueantes (Font & Icon Trap Eradication):** Las fuentes se sirven localmente mediante `@fontsource/dm-sans` y `@fontsource/dm-mono`. Los íconos de tecnologías de la sección de Skills se inyectan como SVGs puros en línea mediante `react-icons`.
- **Prevención de Layout Shifts (CLS: ~0.00):** Estructuración de alturas mínimas en contenedores estratégicos de la cabecera (Hero) para evitar saltos de layout.
- **Accesibilidad y Contraste Exigente (WCAG AA):** Paleta de colores ajustada para que todos los textos superen el ratio de contraste 4.5:1 exigido para personas con dificultades visuales.
- **SEO & Social Cards:** Configuración completa de metadatos OpenGraph, Twitter Cards y generación de `og-image.png` (1200x630) para previsualizaciones impecables al compartir el enlace.

---

## 🛠️ Stack Tecnológico del Portfolio

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Estilos:** Tailwind CSS 4 + CSS Nativo
- **Animaciones:** Framer Motion
- **Iconografía:** Lucide React & React Icons
- **CI/CD:** GitHub Actions (Validación de tipos y compilación)
- **Mantenimiento:** Dependabot

---

## 💻 Desarrollo Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/eliann313/mi-portfolio.git
cd mi-portfolio

# 2. Instalar dependencias
npm install

# 3. Levantar servidor de desarrollo
npm run dev

# 4. Validar compilación
npm run build
```