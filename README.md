# 👨‍💻 Portfolio de Elian Nahuel

![Dependabot Status](https://img.shields.io/badge/dependabot-enabled-brightgreen?logo=dependabot)
![CI Build](https://github.com/eliann313/mi-portfolio/actions/workflows/ci.yml/badge.svg)

Bienvenido al repositorio de mi portfolio profesional. Soy **Elian Nahuel**, un Desarrollador Full Stack con fuerte especialización en el **Backend y la Arquitectura de Datos**.

Puedes ver el portfolio en vivo aquí: **[AÑADIR_URL_DE_VERCEL_AQUÍ]** *(Actualiza esto cuando lo despliegues)*

## 🚀 Sobre el Proyecto

Este portfolio fue diseñado e implementado con un enfoque minimalista, responsivo y de alto rendimiento. Utiliza componentes interactivos, soporte para internacionalización (i18n), cambio de tema dinámico (Light/Dark Mode) y medidas de ofuscación de datos para evitar el spam de scrapers automatizados.

### 🛠️ Stack Tecnológico

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Estilos:** Tailwind CSS 4 + CSS Nativo
- **Animaciones:** Framer Motion
- **Iconografía:** Lucide React & Devicon
- **CI/CD:** GitHub Actions (Validación de tipos y compilación)
- **Mantenimiento:** Dependabot

## ⚙️ Estructura de Funcionalidades Clave

- **Protección Antiespam Híbrida:** Los datos de contacto están ofuscados mediante Base64 en el código fuente, pero se renderizan de forma legible e interactiva para el usuario final (con copiado al portapapeles y notificaciones animadas).
- **Dark/Light Mode Dinámico:** Adaptación de colores, contrastes y filtros de íconos mediante detectores de media-queries y `localStorage`.
- **Tipado Estricto:** Código 100% tipado con TypeScript, asegurando la robustez de los datos.

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