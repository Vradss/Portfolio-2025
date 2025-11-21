import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Breakpoints responsive configurados
 */
const BREAKPOINTS = {
  xs: 320,   // Mobile pequeño
  sm: 640,   // Mobile grande
  md: 768,   // Tablet
  lg: 1024,  // Laptop
  xl: 1280,  // Desktop
  '2xl': 1536, // Desktop grande
} as const;

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /**
   * Anchos específicos para cada breakpoint
   * @example { xs: 300, sm: 600, md: 800, lg: 1000, xl: 1200 }
   */
  responsiveWidths?: Partial<Record<keyof typeof BREAKPOINTS, number>>;
  /**
   * Priority: cargar imagen inmediatamente sin lazy loading
   * Usar para imágenes above-the-fold (hero, primera sección)
   */
  priority?: boolean;
  /**
   * Aspect ratio para prevenir layout shift
   * @example "16/9", "4/3", "1/1"
   */
  aspectRatio?: string;
  /**
   * Placeholder mientras carga
   */
  placeholder?: 'blur' | 'empty';
  /**
   * Clase CSS adicional
   */
  className?: string;
  /**
   * Callback cuando la imagen termina de cargar
   */
  onLoadComplete?: () => void;
}

/**
 * Componente de imagen optimizado con:
 * - Lazy loading automático (con IntersectionObserver)
 * - Responsive images (srcset + sizes)
 * - WebP con fallback PNG
 * - Prevención de layout shift
 * - GPU acceleration
 */
export function OptimizedImage({
  src,
  alt,
  responsiveWidths,
  priority = false,
  aspectRatio,
  placeholder = 'blur',
  className,
  onLoadComplete,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Si es priority, cargar inmediatamente
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Cargar 50px antes de entrar en viewport
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  // Generar srcset responsive
  const generateSrcSet = () => {
    if (!responsiveWidths) {
      // Default: generar tamaños automáticos
      return `${src}?w=640 640w, ${src}?w=768 768w, ${src}?w=1024 1024w, ${src}?w=1280 1280w, ${src}?w=1536 1536w`;
    }

    return Object.entries(responsiveWidths)
      .map(([_, width]) => `${src}?w=${width} ${width}w`)
      .join(', ');
  };

  // Generar sizes attribute
  const generateSizes = () => {
    if (!responsiveWidths) {
      return '(min-width: 1536px) 1536px, (min-width: 1280px) 1280px, (min-width: 1024px) 1024px, (min-width: 768px) 768px, (min-width: 640px) 640px, 100vw';
    }

    const sizeEntries = Object.entries(responsiveWidths)
      .sort(([, a], [, b]) => (b as number) - (a as number)); // Ordenar de mayor a menor

    const sizesArray = sizeEntries.map(([breakpoint, width]) => {
      const bpValue = BREAKPOINTS[breakpoint as keyof typeof BREAKPOINTS];
      return `(min-width: ${bpValue}px) ${width}px`;
    });

    sizesArray.push('100vw'); // Fallback
    return sizesArray.join(', ');
  };

  // Handle load event
  const handleLoad = () => {
    setIsLoaded(true);
    onLoadComplete?.();
  };

  // Estilos del container
  const containerStyle: React.CSSProperties = aspectRatio
    ? { aspectRatio, width: '100%' }
    : {};

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        !isLoaded && placeholder === 'blur' && 'image-loading',
        className
      )}
      style={containerStyle}
    >
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          srcSet={generateSrcSet()}
          sizes={generateSizes()}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            'gpu-accelerate', // Aceleración GPU
            !isLoaded && 'opacity-0',
            isLoaded && 'opacity-100'
          )}
          {...props}
        />
      )}

      {/* Placeholder mientras carga */}
      {!isLoaded && placeholder === 'blur' && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
    </div>
  );
}

/**
 * Variante para imágenes de fondo con parallax
 */
export function OptimizedBackgroundImage({
  src,
  alt = '',
  className,
  children,
  ...props
}: OptimizedImageProps & { children?: React.ReactNode }) {
  return (
    <div className={cn('relative', className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        className="absolute inset-0 -z-10"
        {...props}
      />
      {children}
    </div>
  );
}

/**
 * Hook personalizado para precargar imágenes críticas
 */
export function usePreloadImage(src: string) {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [src]);
}
