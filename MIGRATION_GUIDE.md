# 🔄 Guía de Migración - OptimizedImage

Esta guía te ayudará a migrar tus componentes actuales para usar el nuevo sistema de optimización de imágenes con soporte responsive completo.

---

## 🎯 Cambios Requeridos

### 1. Importaciones

```tsx
// ❌ Antes
import imageSrc from 'figma:asset/[hash].png';

// ✅ Después
import imageSrc from 'figma:asset/[hash].png';
import { OptimizedImage } from '@/components/OptimizedImage';
```

---

## 📝 Ejemplos de Migración

### Ejemplo 1: Imagen Simple

```tsx
// ❌ ANTES
<img
  src={projectImage}
  alt="Project screenshot"
/>

// ✅ DESPUÉS
<OptimizedImage
  src={projectImage}
  alt="Project screenshot"
  aspectRatio="16/9"
  className="rounded-lg"
/>
```

**Beneficios:**
- ✅ Lazy loading automático
- ✅ WebP con fallback PNG
- ✅ Previene layout shift
- ✅ Srcset responsive generado

---

### Ejemplo 2: Hero Image (Above the fold)

```tsx
// ❌ ANTES
<div className="hero-section">
  <img
    src={heroImage}
    alt="Hero"
    style={{ width: '100%' }}
  />
</div>

// ✅ DESPUÉS
<div className="hero-section">
  <OptimizedImage
    src={heroImage}
    alt="Hero"
    priority={true}  // ⚠️ IMPORTANTE: No lazy loading para hero
    responsiveWidths={{
      xs: 400,   // Mobile pequeño
      sm: 600,   // Mobile grande
      md: 900,   // Tablet
      lg: 1200,  // Laptop
      xl: 1500,  // Desktop
      '2xl': 1800 // Desktop grande
    }}
    aspectRatio="21/9"
    className="w-full h-auto"
  />
</div>
```

**Beneficios:**
- ✅ Carga inmediata (priority)
- ✅ Imágenes específicas para cada dispositivo
- ✅ Menor ancho de banda en móviles
- ✅ Mejor LCP score

---

### Ejemplo 3: Grid de Proyectos

```tsx
// ❌ ANTES
<div className="grid grid-cols-3 gap-4">
  {projects.map(project => (
    <div key={project.id}>
      <img src={project.image} alt={project.title} />
    </div>
  ))}
</div>

// ✅ DESPUÉS
<div className="grid-responsive"> {/* Utility class: 1→4 cols responsive */}
  {projects.map(project => (
    <div key={project.id} className="overflow-hidden rounded-lg">
      <OptimizedImage
        src={project.image}
        alt={project.title}
        aspectRatio="4/3"
        responsiveWidths={{
          xs: 300,
          sm: 350,
          md: 400,
          lg: 350,  // 3 columnas = menor ancho
          xl: 300   // 4 columnas = menor ancho
        }}
        className="hover:scale-110 transition-transform duration-300"
      />
    </div>
  ))}
</div>
```

**Beneficios:**
- ✅ Grid responsive automático
- ✅ Lazy loading (solo cargan al hacer scroll)
- ✅ Anchos optimizados por layout
- ✅ Animaciones GPU-accelerated

---

### Ejemplo 4: Imagen de Fondo

```tsx
// ❌ ANTES
<div
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover'
  }}
>
  <h1>Contenido</h1>
</div>

// ✅ DESPUÉS
import { OptimizedBackgroundImage } from '@/components/OptimizedImage';

<OptimizedBackgroundImage
  src={bgImage}
  alt="Background pattern"
  className="min-h-screen"
>
  <div className="container-responsive section-padding">
    <h1>Contenido</h1>
  </div>
</OptimizedBackgroundImage>
```

**Beneficios:**
- ✅ Fondo optimizado
- ✅ z-index correcto
- ✅ Responsive automático

---

### Ejemplo 5: Modal con Imagen Grande

```tsx
// ❌ ANTES
<Dialog>
  <DialogContent>
    <img src={fullSizeImage} alt="Detail" />
  </DialogContent>
</Dialog>

// ✅ DESPUÉS
<Dialog>
  <DialogContent className="max-w-6xl">
    <OptimizedImage
      src={fullSizeImage}
      alt="Project detail view"
      priority={true}  // Modal debe cargar rápido
      responsiveWidths={{
        xs: 350,
        sm: 550,
        md: 750,
        lg: 950,
        xl: 1200
      }}
      aspectRatio="16/10"
      className="w-full rounded-md"
    />
  </DialogContent>
</Dialog>
```

---

### Ejemplo 6: Carousel/Slider

```tsx
import { Carousel } from '@/components/ui/carousel';

// ✅ BUENA PRÁCTICA
<Carousel>
  {images.map((img, index) => (
    <CarouselItem key={index}>
      <OptimizedImage
        src={img.src}
        alt={img.alt}
        priority={index === 0}  // Solo primera imagen priority
        responsiveWidths={{
          xs: 350,
          sm: 600,
          md: 800,
          lg: 1000
        }}
        aspectRatio="16/9"
        className="w-full"
      />
    </CarouselItem>
  ))}
</Carousel>
```

---

## 🎨 Ejemplos con Breakpoints Responsive

### Texto + Imagen Lado a Lado

```tsx
<div className="
  container-responsive
  section-padding
  grid grid-cols-1 lg:grid-cols-2
  gap-6 md:gap-8 lg:gap-12
  items-center
">
  {/* Texto */}
  <div className="order-2 lg:order-1">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
      Título Responsive
    </h2>
    <p className="text-base md:text-lg text-muted-foreground">
      Descripción que escala según el viewport.
    </p>
  </div>

  {/* Imagen */}
  <div className="order-1 lg:order-2">
    <OptimizedImage
      src={featureImage}
      alt="Feature showcase"
      responsiveWidths={{
        xs: 350,   // Full width en mobile
        sm: 550,
        md: 700,
        lg: 500,   // 50% width en desktop
        xl: 600
      }}
      aspectRatio="4/3"
      className="rounded-lg shadow-xl"
    />
  </div>
</div>
```

---

### Hero Section Completo

```tsx
export function HeroSection() {
  // Precargar imagen crítica
  usePreloadImage(heroImage);

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <OptimizedBackgroundImage
        src={bgPattern}
        alt=""
        priority={true}
        className="absolute inset-0 opacity-10"
      />

      {/* Content */}
      <div className="container-responsive text-center z-10">
        <h1 className="
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
          font-bold
          mb-4 sm:mb-6 md:mb-8
          animate-fadeIn
        ">
          BORN TO INNOVATE
        </h1>

        {/* Hero Image */}
        <OptimizedImage
          src={heroImage}
          alt="Hero showcase"
          priority={true}
          responsiveWidths={{
            xs: 350,
            sm: 600,
            md: 800,
            lg: 1000,
            xl: 1200,
            '2xl': 1400
          }}
          aspectRatio="16/9"
          className="
            mx-auto
            rounded-2xl
            shadow-2xl
            max-w-full
            gpu-accelerate
          "
        />
      </div>
    </section>
  );
}
```

---

## 🔍 Debugging

### Verificar que WebP se está sirviendo

1. **Chrome DevTools:**
   - Abre DevTools → Network tab
   - Filtra por "Img"
   - Verifica que veas archivos `.webp` cargando

2. **Inspeccionar Element:**
   ```html
   <!-- Deberías ver algo así: -->
   <img
     src="/assets/image.png"
     srcset="
       /assets/image.webp?w=640 640w,
       /assets/image.webp?w=1024 1024w,
       ...
     "
   />
   ```

3. **Comprobar tamaño descargado:**
   - Network tab → Size column
   - Deberías ver ~70% menos que antes

---

## ⚡ Performance Checklist

Antes de hacer deploy, verifica:

- [ ] Todas las imágenes hero tienen `priority={true}`
- [ ] Todas las imágenes tienen `aspectRatio` definido
- [ ] Imágenes below-the-fold tienen lazy loading (default)
- [ ] `responsiveWidths` definidos para imágenes grandes
- [ ] No hay más de 3-4 imágenes priority en una página
- [ ] Ejecutaste `npm run optimize-images`
- [ ] Lighthouse score > 90

---

## 🎯 Cuándo Usar Cada Opción

### `priority={true}`
✅ Hero images
✅ Logo del sitio
✅ Primera imagen above-the-fold
❌ Imágenes de footer
❌ Imágenes en carousels (excepto la primera)

### `responsiveWidths`
✅ Hero images
✅ Full-width images
✅ Imágenes en grids con cambio de columnas
❌ Iconos pequeños
❌ Imágenes de tamaño fijo

### `aspectRatio`
✅ TODAS las imágenes (previene layout shift)
✅ Especialmente crítico para imágenes lazy-loaded

---

## 📊 Antes vs Después

### Tu Hero Section Actual

```tsx
// ANTES: ~6MB cargados, 4.5s LCP
<div className="hero">
  <img src={heroImagePNG} /> {/* 6MB PNG */}
</div>

// DESPUÉS: ~800KB cargados, 1.2s LCP
<OptimizedImage
  src={heroImagePNG}
  priority={true}
  responsiveWidths={{ xs: 400, md: 900, xl: 1500 }}
  aspectRatio="16/9"
/>
```

**Mejora:**
- 87% menos datos
- 73% más rápido
- Mejor para SEO
- Mejor experiencia móvil

---

## 🚀 Migración Paso a Paso

### Fase 1: Imágenes Hero (1 hora)
1. Identifica tus imágenes above-the-fold
2. Envuelve en `<OptimizedImage>` con `priority={true}`
3. Define `responsiveWidths` y `aspectRatio`
4. Testa en mobile + desktop

### Fase 2: Grids de Proyectos (30 min)
1. Reemplaza `<img>` en loops
2. Añade `aspectRatio` consistente
3. Usa clase `grid-responsive`
4. Verifica lazy loading en DevTools

### Fase 3: Backgrounds (15 min)
1. Cambia `backgroundImage` por `<OptimizedBackgroundImage>`
2. Ajusta z-index si es necesario

### Fase 4: Testing (30 min)
1. Ejecuta Lighthouse
2. Verifica WebP en Network tab
3. Testa en mobile real
4. Valida aspect ratios

---

## 💡 Pro Tips

### 1. Preload Imágenes Críticas
```tsx
import { usePreloadImage } from '@/components/OptimizedImage';

function MyComponent() {
  usePreloadImage('/assets/hero.png');
  // Imagen se precarga antes de renderizar
}
```

### 2. Placeholder Personalizado
```tsx
<OptimizedImage
  src={image}
  placeholder="empty"  // Sin blur effect
/>
```

### 3. Callback de Carga
```tsx
<OptimizedImage
  src={image}
  onLoadComplete={() => {
    console.log('Imagen cargada!');
    // Trigger analytics, animaciones, etc.
  }}
/>
```

### 4. Aspect Ratios Comunes
```tsx
aspectRatio="16/9"   // Widescreen
aspectRatio="4/3"    // Standard
aspectRatio="1/1"    // Square
aspectRatio="21/9"   // Ultrawide
aspectRatio="3/4"    // Portrait
```

---

## ❓ FAQ

**P: ¿Debo borrar los PNG originales?**
R: NO. Los PNG son el fallback para navegadores sin soporte WebP.

**P: ¿Funciona con imágenes externas?**
R: Sí, pero sin optimización WebP. Solo para assets locales.

**P: ¿Puedo usar con Next.js Image?**
R: No, este componente es específico para Vite. Next.js tiene su propio sistema.

**P: ¿Afecta al SEO?**
R: Positivamente! Mejora LCP y CLS, factores clave de Core Web Vitals.

**P: ¿Cómo debuggear lazy loading?**
R: DevTools → Network → Throttling → Slow 3G. Verás las imágenes cargando progresivamente.

---

**¿Más preguntas?** Consulta `OPTIMIZATIONS.md` o la documentación de Sharp.

**Happy optimizing! ⚡**
