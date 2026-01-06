import { useState, useEffect } from 'react'

/**
 * Hook para detectar media queries
 * Útil para responsive design y optimizaciones (reduced motion, etc.)
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    
    // Actualizar estado inicial
    setMatches(mediaQuery.matches)

    // Handler para cambios
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Escuchar cambios (moderno)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    } else {
      // Fallback para navegadores antiguos
      mediaQuery.addListener(handler)
      return () => mediaQuery.removeListener(handler)
    }
  }, [query])

  return matches
}

