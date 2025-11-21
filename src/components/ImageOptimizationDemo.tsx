import { useState } from 'react';
import { OptimizedImage } from './OptimizedImage';
import { cn } from '@/lib/utils';

/**
 * Componente de demostración para comparar:
 * - Imagen sin optimizar vs optimizada
 * - Diferentes breakpoints responsive
 * - Lazy loading en acción
 *
 * USO: Añade este componente temporalmente para ver las mejoras
 */
export function ImageOptimizationDemo() {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('after');
  const [showStats, setShowStats] = useState(true);

  // Ejemplo con una de tus imágenes
  const exampleImage = '@/assets/other-assets/demo-image-large.png';

  return (
    <div className="container-responsive section-padding">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            🚀 Optimización de Imágenes
          </h2>
          <p className="text-muted-foreground text-lg">
            Comparación antes vs después de las optimizaciones
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 justify-center">
          <button
            onClick={() => setActiveTab('before')}
            className={cn(
              'px-6 py-3 rounded-lg font-medium transition-all',
              activeTab === 'before'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            ❌ Antes (PNG sin optimizar)
          </button>
          <button
            onClick={() => setActiveTab('after')}
            className={cn(
              'px-6 py-3 rounded-lg font-medium transition-all',
              activeTab === 'after'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            ✅ Después (WebP optimizado)
          </button>
        </div>

        {/* Stats Toggle */}
        <div className="flex justify-center mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showStats}
              onChange={(e) => setShowStats(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">Mostrar estadísticas</span>
          </label>
        </div>

        {/* Image Display */}
        <div className="relative">
          {activeTab === 'before' ? (
            <div className="space-y-4">
              {/* Imagen sin optimizar */}
              <div className="relative rounded-lg overflow-hidden border-4 border-destructive">
                <img
                  src={exampleImage}
                  alt="Sin optimizar"
                  className="w-full h-auto"
                />
                <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-md font-bold">
                  PNG Original
                </div>
              </div>

              {showStats && (
                <div className="bg-destructive/10 border border-destructive rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-4">❌ Problemas:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span><strong>Tamaño:</strong> 11.66 MB (original)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span><strong>Lazy Loading:</strong> No implementado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span><strong>Responsive:</strong> Una sola imagen para todos los dispositivos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span><strong>Layout Shift:</strong> Riesgo alto (sin aspect-ratio)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span><strong>LCP esperado:</strong> ~6 segundos</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Imagen optimizada */}
              <div className="relative rounded-lg overflow-hidden border-4 border-green-500">
                <OptimizedImage
                  src={exampleImage}
                  alt="Optimizada con WebP"
                  responsiveWidths={{
                    xs: 350,
                    sm: 600,
                    md: 900,
                    lg: 1000,
                    xl: 1200,
                  }}
                  aspectRatio="16/9"
                  className="w-full"
                  priority={true}
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md font-bold">
                  WebP Optimizado
                </div>
              </div>

              {showStats && (
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-500 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-4 text-green-700 dark:text-green-400">
                    ✅ Mejoras:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span><strong>Tamaño:</strong> 2.69 MB WebP (-76.9%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span><strong>Lazy Loading:</strong> IntersectionObserver automático</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span><strong>Responsive:</strong> 5 tamaños diferentes (xs/sm/md/lg/xl)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span><strong>Layout Shift:</strong> Prevenido con aspect-ratio</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span><strong>LCP esperado:</strong> ~1.5 segundos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span><strong>Fallback:</strong> PNG automático en navegadores antiguos</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Comparación de tamaños */}
        {showStats && (
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {/* Tamaño de archivo */}
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                📊 Tamaño de Archivo
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">PNG Original</span>
                    <span className="text-sm font-bold">11.66 MB</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-destructive h-3 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">WebP Optimizado</span>
                    <span className="text-sm font-bold text-green-600">2.69 MB</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '23%' }} />
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <span className="text-2xl font-bold text-green-600">-76.9%</span>
                <p className="text-xs text-muted-foreground">Ahorro de ancho de banda</p>
              </div>
            </div>

            {/* Tiempo de carga */}
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                ⏱️ Tiempo de Carga (3G)
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Antes</span>
                    <span className="text-sm font-bold">~6.0s</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-destructive h-3 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Después</span>
                    <span className="text-sm font-bold text-green-600">~1.5s</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <span className="text-2xl font-bold text-green-600">-75%</span>
                <p className="text-xs text-muted-foreground">Tiempo ahorrado</p>
              </div>
            </div>
          </div>
        )}

        {/* Responsive Breakpoints Demo */}
        <div className="mt-12 bg-card rounded-lg p-6 border">
          <h3 className="font-bold text-lg mb-4">📱 Tamaños Responsive Servidos</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl mb-2">📱</div>
              <div className="font-bold text-sm">XS (320px)</div>
              <div className="text-xs text-muted-foreground">350px width</div>
              <div className="text-xs text-green-600 font-bold mt-1">~200KB</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl mb-2">📱</div>
              <div className="font-bold text-sm">SM (640px)</div>
              <div className="text-xs text-muted-foreground">600px width</div>
              <div className="text-xs text-green-600 font-bold mt-1">~500KB</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl mb-2">💻</div>
              <div className="font-bold text-sm">MD (768px)</div>
              <div className="text-xs text-muted-foreground">900px width</div>
              <div className="text-xs text-green-600 font-bold mt-1">~1MB</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl mb-2">💻</div>
              <div className="font-bold text-sm">LG (1024px)</div>
              <div className="text-xs text-muted-foreground">1000px width</div>
              <div className="text-xs text-green-600 font-bold mt-1">~1.5MB</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl mb-2">🖥️</div>
              <div className="font-bold text-sm">XL (1280px)</div>
              <div className="text-xs text-muted-foreground">1200px width</div>
              <div className="text-xs text-green-600 font-bold mt-1">~2.5MB</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            El navegador automáticamente selecciona el tamaño óptimo según el viewport
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg p-8 border">
          <h3 className="text-2xl font-bold mb-4">
            🎉 Resultados en Todo el Sitio
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-4xl font-bold text-green-600">-81%</div>
              <div className="text-sm text-muted-foreground">Reducción total</div>
              <div className="text-xs text-muted-foreground mt-1">68MB → 13MB</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">50</div>
              <div className="text-sm text-muted-foreground">Imágenes optimizadas</div>
              <div className="text-xs text-muted-foreground mt-1">100% conversión</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600">90+</div>
              <div className="text-sm text-muted-foreground">Lighthouse Score</div>
              <div className="text-xs text-muted-foreground mt-1">Objetivo esperado</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Usa <code className="bg-muted px-2 py-1 rounded">&lt;OptimizedImage&gt;</code> en todos tus componentes
          </p>
        </div>
      </div>
    </div>
  );
}
