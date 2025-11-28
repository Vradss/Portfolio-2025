# Google Analytics 4 - Guía de Configuración

## 📋 Pasos para Configurar Google Analytics

### 1. Crear Cuenta de Google Analytics
1. Ve a [Google Analytics](https://analytics.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Click en "Admin" (engranaje abajo a la izquierda)
4. Click en "Create Property"
5. Completa la información:
   - **Property name**: Vrads Portfolio
   - **Time zone**: Tu zona horaria (Europe/Madrid)
   - **Currency**: EUR
6. Click "Next" y completa la información del negocio
7. Click "Create"

### 2. Obtener tu Measurement ID
1. En la propiedad creada, ve a **Data Streams**
2. Click en "Add stream" > "Web"
3. Ingresa tu URL: `https://tudominio.com`
4. Click "Create stream"
5. **Copia tu Measurement ID** (formato: `G-XXXXXXXXXX`)

### 3. Configurar el Measurement ID en tu Proyecto

#### Opción A: Directamente en index.html (más simple)
1. Abre `/index.html`
2. Reemplaza `G-XXXXXXXXXX` con tu Measurement ID real en las líneas 10 y 15
3. Guarda el archivo

#### Opción B: Usando variables de entorno (más seguro)
1. Crea un archivo `.env` en la raíz del proyecto:
   ```bash
   VITE_GA_MEASUREMENT_ID=G-TU-ID-REAL
   ```
2. Agrega `.env` a tu `.gitignore` (ya debería estar)
3. En producción (Vercel), agrega la variable en Settings > Environment Variables

### 4. Actualizar analytics.ts
1. Abre `/src/lib/analytics.ts`
2. Reemplaza `G-XXXXXXXXXX` en la línea 38 con tu ID real
3. Guarda el archivo

---

## 🎯 Cómo Usar Analytics en tu Código

### Trackear vista de proyecto
```typescript
import { trackProjectView } from '@/lib/analytics'

// Cuando un usuario ve un proyecto
trackProjectView(project.id, project.title)
```

### Trackear clicks en redes sociales
```typescript
import { trackSocialClick } from '@/lib/analytics'

// En los botones de LinkedIn/GitHub
onClick={() => trackSocialClick('linkedin')}
onClick={() => trackSocialClick('github')}
```

### Trackear descarga de resume
```typescript
import { trackResume - PM - DIC2025.pdfDownload } from '@/lib/analytics'

// En el botón de descarga
onClick={() => trackResumeDownload()}
```

### Trackear clicks de contacto
```typescript
import { trackContactClick } from '@/lib/analytics'

// En botones de contacto
onClick={() => trackContactClick('hero_section')}
onClick={() => trackContactClick('footer')}
```

---

## 📊 Métricas que se Trackean Automáticamente

- ✅ **Page Views**: Cada vez que se carga una página
- ✅ **Session Duration**: Tiempo que pasa el usuario en el sitio
- ✅ **Bounce Rate**: Porcentaje de usuarios que salen rápidamente
- ✅ **Geographic Location**: De dónde vienen tus visitantes
- ✅ **Device Type**: Desktop, Mobile, Tablet
- ✅ **Traffic Source**: Google, directo, redes sociales, etc.

## 📊 Métricas Personalizadas Disponibles

Después de implementar los eventos en tu código, podrás ver:
- 📈 Qué proyectos son más vistos
- 🔗 Qué redes sociales generan más clicks
- 📄 Cuántas personas descargan tu resume
- 📧 De dónde vienen los clicks de contacto
- 📜 Profundidad de scroll (engagement)

---

## 🚀 Verificar que Funciona

### 1. Modo Development
1. Abre tu sitio en el navegador
2. Abre DevTools (F12) > Console
3. Escribe: `window.dataLayer`
4. Deberías ver un array con datos

### 2. Google Analytics Real-Time
1. Ve a Google Analytics
2. Click en "Reports" > "Realtime"
3. Navega por tu sitio
4. Deberías ver tu actividad en tiempo real

### 3. Google Tag Assistant (Extensión)
1. Instala [Google Tag Assistant](https://tagassistant.google.com/)
2. Abre tu sitio
3. Click en la extensión
4. Debería mostrar tu tag de GA4 funcionando

---

## ⚡ Optimización de Rendimiento

Tu implementación actual es óptima:
- ✅ Script `async` para carga no bloqueante
- ✅ Carga después del HTML principal
- ✅ Funciones helper optimizadas
- ✅ Type-safe con TypeScript
- ✅ Zero-impact en performance inicial

---

## 🔒 Privacidad y GDPR

Si tu audiencia es europea, considera:
1. Agregar un banner de cookies
2. Usar `anonymize_ip: true` en la config de GA
3. Documentar en tu Privacy Policy el uso de GA

Ejemplo de config con anonimización:
```javascript
gtag('config', 'G-XXXXXXXXXX', {
  page_path: window.location.pathname,
  send_page_view: true,
  anonymize_ip: true  // Anonimiza IPs
});
```

---

## 📝 Próximos Pasos

1. [ ] Obtener tu Measurement ID de Google Analytics
2. [ ] Reemplazar `G-XXXXXXXXXX` en `index.html` (líneas 10 y 15)
3. [ ] Reemplazar `G-XXXXXXXXXX` en `src/lib/analytics.ts` (línea 38)
4. [ ] Implementar tracking de eventos en componentes clave
5. [ ] Verificar en Google Analytics Real-Time
6. [ ] (Opcional) Agregar banner de cookies para GDPR

---

## 🛠️ Ejemplo de Implementación en Componentes

### En WorkSection.tsx (trackear clicks de proyecto)
```typescript
import { trackProjectView } from '@/lib/analytics'

const handleViewProject = (projectId: number) => {
  const project = projects.find(p => p.id === projectId)
  if (project) {
    trackProjectView(project.id, project.title)
  }
  setSelectedProjectId(projectId)
}
```

### En Navigation.tsx (trackear clicks de resume)
```typescript
import { trackResumeDownload } from '@/lib/analytics'

const handleDownloadResume = () => {
  trackResumeDownload()
  const link = document.createElement('a')
  link.href = '/Resume - PM - DIC2025.pdf'
  link.download = 'VRADIS_Resume - PM - DIC2025.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
```

---

## 📞 Soporte

- [Documentación oficial de GA4](https://support.google.com/analytics/answer/9304153)
- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)
