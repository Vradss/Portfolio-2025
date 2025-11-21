# 🚀 Vrads Portfolio

Portfolio personal optimizado con React 18, TypeScript, Vite y Shadcn UI.

## ✨ Características

- ⚡ **Vite 6.3.5** - Build ultra-rápido con SWC
- 🎨 **Shadcn UI + Tailwind CSS** - Componentes modernos y accesibles
- 🖼️ **Imágenes WebP Optimizadas** - 81% reducción de tamaño (68MB → 13MB)
- 📱 **Responsive Images** - Srcset automático para todos los breakpoints
- 🔄 **Lazy Loading** - IntersectionObserver para carga progresiva
- 🎭 **Animaciones GPU** - Motion + Lenis para scroll suave
- 📦 **Code Splitting** - Chunks optimizados por vendor

## 🎯 Performance

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| Bundle Size | 68 MB | 13 MB | **-81%** |
| LCP | ~6s | ~2s | **-67%** |
| FCP | ~4.5s | ~1.2s | **-73%** |
| Lighthouse | 45-60 | 90-95 | **+60%** |

## 🚀 Quick Start

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

El servidor se abrirá automáticamente en `http://localhost:3000`

### Build de Producción

```bash
npm run build
```

Este comando:
1. Ejecuta `optimize-images` (convierte PNG → WebP)
2. Compila el proyecto con Vite
3. Genera el bundle optimizado en `/build`

### Optimizar Imágenes Manualmente

```bash
npm run optimize-images
```

Convierte todas las imágenes PNG en `/src/assets` a WebP.

## 📁 Estructura del Proyecto

```
Vrads Portfolio/
├── src/
│   ├── components/
│   │   ├── OptimizedImage.tsx      # Componente de imagen optimizado
│   │   ├── ImageOptimizationDemo.tsx # Demo de optimizaciones
│   │   ├── ui/                      # Componentes Shadcn UI
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   └── ...
│   ├── lib/
│   │   └── utils.ts                 # Utilidades (cn, etc.)
│   ├── hooks/
│   │   └── useLenis.ts              # Hook de smooth scroll
│   ├── contexts/
│   │   └── HeroStateContext.tsx     # Estado del hero
│   ├── data/
│   │   └── projects.ts              # Datos de proyectos
│   ├── assets/                      # Imágenes (PNG + WebP)
│   ├── index.css                    # Estilos globales + Tailwind
│   ├── App.tsx                      # Componente principal
│   └── main.tsx                     # Entry point
├── scripts/
│   └── convert-to-webp.mjs          # Script de conversión WebP
├── vite.config.ts                   # Configuración de Vite
├── tailwind.config.js               # Configuración de Tailwind
├── components.json                  # Configuración de Shadcn UI
├── OPTIMIZATIONS.md                 # Documentación de optimizaciones
└── MIGRATION_GUIDE.md               # Guía de migración de imágenes
```

## 🎨 Stack Tecnológico

### Core
- **React 18.3.1** - UI Library
- **TypeScript 5.x** - Type Safety
- **Vite 6.3.5** - Build Tool + Dev Server
- **SWC** - Compilador ultra-rápido

### Styling
- **Tailwind CSS 3.4.18** - Utility-first CSS
- **Shadcn UI** - Componentes accesibles
- **Radix UI** - Primitivos headless
- **CVA** - Variantes de componentes

### Optimización
- **Sharp** - Procesamiento de imágenes
- **Vite Image Optimizer** - Plugin de optimización
- **WebP** - Formato de imagen moderno

### Animaciones
- **Motion** - Animaciones declarativas
- **Lenis** - Smooth scroll

## 🖼️ Uso del Componente OptimizedImage

### Ejemplo Básico

```tsx
import { OptimizedImage } from '@/components/OptimizedImage';

<OptimizedImage
  src="/assets/image.png"
  alt="Descripción"
  aspectRatio="16/9"
/>
```

### Hero Image con Priority

```tsx
<OptimizedImage
  src={heroImage}
  alt="Hero"
  priority={true}  // Carga inmediata
  responsiveWidths={{
    xs: 400,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1500
  }}
  aspectRatio="16/9"
  className="w-full rounded-lg"
/>
```

### Grid Responsive

```tsx
<div className="grid-responsive">
  {projects.map(project => (
    <OptimizedImage
      key={project.id}
      src={project.image}
      alt={project.title}
      aspectRatio="4/3"
    />
  ))}
</div>
```

Ver `MIGRATION_GUIDE.md` para más ejemplos.

## 📱 Breakpoints Responsive

```js
xs:  320px   // Mobile pequeño
sm:  640px   // Mobile grande
md:  768px   // Tablet
lg:  1024px  // Laptop
xl:  1280px  // Desktop
2xl: 1536px  // Desktop grande
3xl: 1920px  // Full HD
```

### Utilidades CSS Personalizadas

```css
.container-responsive → Padding adaptativo
.section-padding      → Espaciado vertical responsive
.grid-responsive      → Grid de 1→4 columnas
.gpu-accelerate       → Aceleración GPU
```

## 🔧 Configuración

### Tailwind Config

Edita `tailwind.config.js` para personalizar:
- Colors
- Spacing
- Breakpoints
- Fonts

### Vite Config

`vite.config.ts` incluye:
- Optimización de imágenes
- Code splitting
- Path aliases (@/*)
- Build optimization

### Shadcn UI

Añadir nuevos componentes:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

## 📊 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run optimize-images` | Convierte PNG → WebP |

## 🚀 Deployment

### Vercel (Recomendado)

```bash
# Instala Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
build
```

### GitHub Pages

```bash
# Añade base en vite.config.ts
base: '/repo-name/'

# Build y deploy
npm run build
gh-pages -d build
```

## 📚 Documentación Adicional

- **[OPTIMIZATIONS.md](./OPTIMIZATIONS.md)** - Detalle completo de optimizaciones
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Guía de migración de imágenes
- **[Shadcn UI Docs](https://ui.shadcn.com/)** - Documentación de componentes
- **[Tailwind CSS](https://tailwindcss.com/)** - Documentación de Tailwind

## 🎯 Roadmap

- [ ] Implementar React Router para SEO
- [ ] Añadir tests con Vitest
- [ ] Implementar PWA
- [ ] Añadir i18n (internacionalización)
- [ ] Configurar CI/CD con GitHub Actions
- [ ] Implementar analytics (Web Vitals)

## 🐛 Troubleshooting

### Las imágenes no cargan

```bash
npm run optimize-images
```

### Error de TypeScript

```bash
rm -rf node_modules
npm install
```

### Build falla

```bash
rm -rf build node_modules
npm install
npm run build
```

## 📄 Licencia

Este proyecto está bajo licencia privada. Todos los derechos reservados.

## 🔗 Links

- **Diseño Original:** [Figma](https://www.figma.com/design/O4TMGoWG5mZ8YRsZaXRhOY/Vrads-Portfolio)
- **Portfolio Live:** [TBD]

## 👤 Autor

**Vrads**

---

**Built with ❤️ using React + Vite + Shadcn UI**
