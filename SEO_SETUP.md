# SEO y Meta Tags - Guía de Configuración

## ✅ Meta Tags Implementados

He agregado todos los metadatos SEO esenciales en `index.html`:

### 1. **Meta Tags Básicos**
- ✅ Title optimizado para SEO
- ✅ Description (155-160 caracteres)
- ✅ Keywords relevantes
- ✅ Author y robots meta tags
- ✅ Canonical URL

### 2. **Open Graph (Facebook, LinkedIn, WhatsApp)**
- ✅ og:type, og:url, og:title, og:description
- ✅ og:image (1200x630px recomendado)
- ✅ og:locale y og:site_name

### 3. **Twitter Cards**
- ✅ twitter:card, twitter:title, twitter:description
- ✅ twitter:image
- ✅ twitter:creator

### 4. **Performance**
- ✅ Preconnect a Google Fonts y Google Analytics
- ✅ Async loading de scripts externos

---

## 📸 Crear Imágenes de Open Graph

### Imágenes Necesarias:

#### 1. **Open Graph Image** (para Facebook, LinkedIn, WhatsApp)
- **Nombre**: `og-image.jpg`
- **Tamaño**: 1200 x 630 píxeles
- **Ubicación**: `/public/og-image.jpg`
- **Contenido sugerido**:
  - Tu foto profesional
  - Nombre: "Vradis Florez"
  - Título: "Product Manager & Developer"
  - Fondo de marca (tu color principal)

#### 2. **Twitter Card Image**
- **Nombre**: `twitter-image.jpg`
- **Tamaño**: 1200 x 675 píxeles (16:9)
- **Ubicación**: `/public/twitter-image.jpg`
- **Contenido**: Similar al OG image pero en formato 16:9

### Herramientas para Crear las Imágenes:
- [Canva](https://www.canva.com/) - Plantillas de Open Graph gratis
- [Figma](https://www.figma.com/) - Diseño personalizado
- [Bannerbear](https://www.bannerbear.com/) - Generación automática

### Template Sugerido:
```
+---------------------------------+
|                                 |
|  [Tu Foto]   VRADIS FLOREZ     |
|              Product Manager    |
|              & Developer        |
|                                 |
|  🎯 Product Strategy            |
|  🎨 UX Design                   |
|  💻 Full-Stack Development      |
|                                 |
+---------------------------------+
```

---

## 🎨 Crear Favicons

### Favicons Necesarios:
1. `favicon.ico` - 32x32px (para navegadores antiguos)
2. `favicon-16x16.png` - 16x16px
3. `favicon-32x32.png` - 32x32px
4. `apple-touch-icon.png` - 180x180px (para iOS)

### Herramienta Recomendada:
**[Favicon.io](https://favicon.io/)** - Genera todos los tamaños automáticamente

1. Sube tu logo/inicial
2. Descarga el paquete
3. Copia los archivos a `/public/`

---

## 🔧 Personalizar URLs

**IMPORTANTE**: Reemplaza `https://vradis.com` con tu dominio real en:

1. **index.html** (líneas que debes cambiar):
   ```html
   <link rel="canonical" href="https://TU-DOMINIO.com" />
   <meta property="og:url" content="https://TU-DOMINIO.com/" />
   <meta property="og:image" content="https://TU-DOMINIO.com/og-image.jpg" />
   <meta name="twitter:url" content="https://TU-DOMINIO.com/" />
   <meta name="twitter:image" content="https://TU-DOMINIO.com/twitter-image.jpg" />
   ```

---

## 🐦 Actualizar Twitter Handle

Si tienes Twitter/X, actualiza:
```html
<meta name="twitter:creator" content="@TU_HANDLE_REAL" />
```

Si no tienes, elimina esa línea.

---

## 📊 Schema.org Structured Data (JSON-LD)

Para SEO avanzado, agrega esto en `index.html` antes de `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Vradis Florez",
  "url": "https://vradis.com",
  "image": "https://vradis.com/profile-photo.jpg",
  "sameAs": [
    "https://www.linkedin.com/in/vradisflorez/",
    "https://github.com/vradss"
  ],
  "jobTitle": "Product Manager & Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  },
  "alumniOf": {
    "@type": "Organization",
    "name": "42 Madrid"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Madrid",
    "addressCountry": "ES"
  },
  "knowsAbout": [
    "Product Management",
    "UX Design",
    "Frontend Development",
    "React",
    "TypeScript"
  ]
}
</script>
```

---

## 🧪 Verificar tu SEO

### 1. **Open Graph Debugger** (Facebook/LinkedIn)
- URL: https://developers.facebook.com/tools/debug/
- Pega tu URL y verifica que las imágenes se muestren correctamente

### 2. **Twitter Card Validator**
- URL: https://cards-dev.twitter.com/validator
- Verifica cómo se ve tu card en Twitter

### 3. **Google Rich Results Test**
- URL: https://search.google.com/test/rich-results
- Verifica tu structured data

### 4. **Lighthouse (Chrome DevTools)**
```bash
1. Abre Chrome DevTools (F12)
2. Ve a "Lighthouse" tab
3. Selecciona "SEO" + "Performance"
4. Click "Generate report"
```

Objetivo: **90+ en SEO**, **90+ en Performance**

---

## 📈 Mejoras Adicionales de SEO

### 1. **Robots.txt** (crear en `/public/robots.txt`)
```txt
User-agent: *
Allow: /

Sitemap: https://vradis.com/sitemap.xml
```

### 2. **Sitemap.xml** (crear en `/public/sitemap.xml`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://vradis.com/</loc>
    <lastmod>2024-11-24</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://vradis.com/#work</loc>
    <lastmod>2024-11-24</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vradis.com/#about</loc>
    <lastmod>2024-11-24</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 3. **Google Search Console**
1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Agrega tu propiedad (dominio)
3. Verifica propiedad (vía DNS o HTML)
4. Envía tu sitemap.xml

---

## 🎯 Checklist Final

- [ ] Reemplazar todas las URLs `https://vradis.com` con tu dominio real
- [ ] Crear `og-image.jpg` (1200x630px) y subirlo a `/public/`
- [ ] Crear `twitter-image.jpg` (1200x675px) y subirlo a `/public/`
- [ ] Crear favicons y subirlos a `/public/`
- [ ] Actualizar `@vradis` con tu handle real de Twitter (o eliminar)
- [ ] Agregar Schema.org JSON-LD (opcional pero recomendado)
- [ ] Crear `robots.txt` en `/public/`
- [ ] Crear `sitemap.xml` en `/public/`
- [ ] Verificar con Open Graph Debugger
- [ ] Verificar con Twitter Card Validator
- [ ] Verificar con Lighthouse (objetivo: 90+ SEO)
- [ ] Registrar en Google Search Console

---

## 📝 Keywords Actuales

He incluido estas keywords (ajústalas según tu enfoque):
- Product Manager
- UX Designer
- Frontend Developer
- React
- TypeScript
- Portfolio
- 42 Madrid
- Product Strategy
- Web Development
- Madrid

**Tip**: Usa [Google Keyword Planner](https://ads.google.com/home/tools/keyword-planner/) para encontrar keywords relevantes.

---

## 🚀 Performance Tips

Tu sitio ya tiene:
- ✅ Preconnect a dominios externos
- ✅ Async loading de scripts
- ✅ Optimización de imágenes
- ✅ Code splitting

Para más mejoras:
- Considera usar CDN (Cloudflare, Vercel Edge)
- Habilita compresión gzip/brotli en tu servidor
- Usa lazy loading para imágenes grandes
