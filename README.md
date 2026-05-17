# 👨‍💻 Portfolio de Elian Nahuel

![Dependabot Status](https://img.shields.io/badge/dependabot-enabled-brightgreen?logo=dependabot)
![CI Build](https://github.com/eliann313/mi-portfolio/actions/workflows/ci.yml/badge.svg)

Bienvenido al repositorio de mi portfolio profesional. Soy **Elian Nahuel**, un Desarrollador Full Stack orientado a **Backend y la Arquitectura de Datos**.

Podes ver el portfolio en vivo acá: **[https://elian-nahuel-portfolio.vercel.app/](https://elian-nahuel-portfolio.vercel.app/)**

---

## ⚡ Rendimiento y Optimización (Lighthouse)

El portfolio fue sometido a estrictas auditorías de rendimiento en producción mediante Google Lighthouse (desplegado en el CDN global de **Vercel**), logrando una calificación sobresaliente:

| Plataforma | Performance ⚡ | Accessibility ♿ | Best Practices 🛡️ | SEO 🔍 |
| :--- | :---: | :---: | :---: | :---: |
| **Escritorio (Desktop)** | **100** | **100** | **100** | **100** |
| **Móvil (Mobile)** | **98** | **100** | **100** | **100** |

### 🛠️ Estrategias de Optimización Aplicadas:
- **Zero CDNs Bloqueantes (Font & Icon Trap Eradication):** Se eliminó el CDN externo de Devicon (ahorro de 776 KiB críticos) y las consultas DNS a Google Fonts. Las tipografías se sirven de forma local y optimizada mediante paquetes de `@fontsource/dm-sans` y `@fontsource/dm-mono`. Los logos de tecnologías de la sección de Skills se inyectan como SVGs puros en línea mediante `react-icons`.
- **Prevención de Layout Shifts (CLS: ~0.00):** Estructuración de alturas mínimas en contenedores estratégicos de la cabecera (Hero) para evitar saltos o reajustes de layout desagradables al cargarse las fuentes tipográficas.
- **Accesibilidad y Contraste Exigente (WCAG AA):** Ajuste cromático minucioso en la paleta de grises (`src/utils/colors.ts`) para el modo oscuro (`dark`), garantizando que todos los textos secundarios (pequeños y en monoespacio) superen con soltura el ratio de contraste 4.5:1 exigido para personas con dificultades visuales.
- **Indexación y SEO Limpio:** Inclusión y estructuración del archivo `robots.txt` para guiar a los rastreadores automatizados y evitar la indexación errónea del `index.html`.

---

## 🚀 Sobre el Proyecto

Este portfolio fue diseñado e implementado con un enfoque minimalista, responsivo y de alto rendimiento. Utiliza componentes interactivos, soporte para internacionalización (i18n), cambio de tema dinámico (Light/Dark Mode) y medidas de ofuscación de datos para evitar el spam de scrapers automatizados.

### 🛠️ Stack Tecnológico

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Estilos:** Tailwind CSS 4 + CSS Nativo
- **Animaciones:** Framer Motion
- **Iconografía:** Lucide React & React Icons (Simple Icons)
- **CI/CD:** GitHub Actions (Validación de tipos y compilación)
- **Mantenimiento:** Dependabot

---

## ⚙️ Estructura de Funcionalidades Clave

- **Protección Antiespam Híbrida:** Los datos de contacto están ofuscados mediante Base64 en el código fuente, pero se renderizan de forma legible e interactiva para el usuario final (con copiado al portapapeles y notificaciones animadas).
- **Dark/Light Mode Dinámico:** Adaptación de colores, contrastes y filtros de íconos mediante detectores de media-queries y `localStorage`.
- **Tipado Estricto:** Código 100% tipado con TypeScript, asegurando la robustez de los datos.

---

## 💻 Desarrollo Local

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina:

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/eliann313/mi-portfolio.git
   cd mi-portfolio
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Levantar el servidor local**
   ```bash
   npm run dev
   ```
   *La aplicación estará disponible en `http://localhost:5173`*

4. **Validar la compilación (Type Checking & Build)**
   ```bash
   npm run build
   ```