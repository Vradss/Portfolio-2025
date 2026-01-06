'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import profileImage from '@/assets/about-section/profile-photo.png'
import workingImage from '@/assets/about-section/working-at-desk.webp'
import mountainImage from '@/assets/about-section/mountain-landscape.png'
import innomakersImage from '@/assets/about-section/innomakers.jpg'
import madrid42PresImage from '@/assets/about-section/42madrid_pres.jpg'

// Configuración de las capas parallax - 5 fotos contenidas en su sección
const parallaxLayers = [
  {
    id: 'madrid42pres',
    image: madrid42PresImage,
    alt: '42 Madrid presentation event',
    depth: 0.4,
    zIndex: 15,
    initialPosition: { x: '50%', y: '15%' },
    size: 'w-48 lg:w-[260px]'
  },
  {
    id: 'mountain',
    image: mountainImage,
    alt: 'Woman with sunglasses by the lake and mountains',
    depth: 0.55,
    zIndex: 20,
    initialPosition: { x: '82%', y: '35%' },
    size: 'w-52 lg:w-[280px]'
  },
  {
    id: 'innomakers',
    image: innomakersImage,
    alt: 'Innomakers project',
    depth: 0.7,
    zIndex: 25,
    initialPosition: { x: '65%', y: '60%' },
    initialPositionMobile: { x: '70%', y: '50%' },
    size: 'w-68 lg:w-[380px]'
  },
  {
    id: 'working',
    image: workingImage,
    alt: 'Working on laptop in office',
    depth: 0.85,
    zIndex: 30,
    initialPosition: { x: '28%', y: '55%' },
    size: 'w-64 lg:w-[360px]'
  },
  {
    id: 'profile',
    image: profileImage,
    alt: 'Digital Product Manager working on laptop with code',
    depth: 1.0,
    zIndex: 40,
    initialPosition: { x: '15%', y: '28%' },
    size: 'w-72 lg:w-[400px]'
  }
]

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const rafId = useRef<number | null>(null)
  const isMobileRef = useRef<boolean>(false)
  const windowHeightRef = useRef<number>(0)

  // Detectar mobile una sola vez y cachear window height
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768
    windowHeightRef.current = window.innerHeight

    const handleResize = () => {
      isMobileRef.current = window.innerWidth < 768
      windowHeightRef.current = window.innerHeight
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handler optimizado de scroll con useCallback
  const updateScroll = useCallback(() => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const sectionTop = rect.top

    if (sectionTop < windowHeightRef.current && sectionTop + rect.height > 0) {
      setScrollY(-sectionTop)
    }
  }, [])

  // Hook para trackear el scroll con requestAnimationFrame
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        rafId.current = requestAnimationFrame(() => {
          updateScroll()
          ticking = false
        })
        ticking = true
      }
    }

    updateScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [updateScroll])

  return (
    <>
      {/* Sección de Imágenes Parallax - superpone 10% del AboutTextSection */}
      <section
        ref={containerRef}
        className="relative w-full overflow-hidden z-20"
        style={{
          height: '180vh',
          backgroundColor: 'transparent',
          marginTop: '-10vh' // Superpone aproximadamente 10% de la sección anterior
        }}
      >
        {/* Capas parallax 3D - Desktop y Mobile */}
        <div className="relative w-full h-full">
          {parallaxLayers.map((layer) => {
            // Calcular el desplazamiento parallax basado en scrollY y depth
            // En mobile usamos un efecto más sutil (60% del efecto desktop para mejor performance)
            const parallaxOffset = scrollY * layer.depth * (isMobileRef.current ? 0.6 : 1)

            // Calcular blur y fade out basado en scrollY
            // Las imágenes deben desaparecer ANTES de que aparezca el título SKILLS
            // Sección es 180vh, las imágenes desaparecen al final con más espacio en mobile
            // Las imágenes más abajo (mayor y%) tardan más en desaparecer
            const positionY = parseFloat(layer.initialPosition.y) / 100 // Convertir porcentaje a decimal (0-1)
            
            // Cachear window height para evitar múltiples accesos
            const windowHeight = windowHeightRef.current || (typeof window !== 'undefined' ? window.innerHeight : 0)
            
            // Asegurar que las imágenes sean visibles al inicio (scrollY negativo o pequeño)
            // Solo aplicar fade cuando scrollY sea positivo y suficiente
            const fadeStart = windowHeight * (1.2 + positionY * 0.2)  // Ajustar según posición vertical
            const fadeEnd = windowHeight * (1.6 + positionY * 0.2)    // Ajustar según posición vertical
            
            // Solo calcular fade si scrollY es positivo y mayor que fadeStart
            let fadeProgress = 0
            if (scrollY > fadeStart) {
              fadeProgress = Math.min((scrollY - fadeStart) / (fadeEnd - fadeStart), 1)
            }

            // Blur: 0px → 20px en mobile, 30px en desktop (reducido en mobile para mejor performance)
            const blurAmount = fadeProgress * (isMobileRef.current ? 20 : 30)
            // Opacity: 1 → 0 (fade completo) - las imágenes más abajo se mantienen visibles más tiempo
            // Asegurar que la opacidad sea 1 cuando scrollY es negativo o pequeño
            const imageOpacity = scrollY < fadeStart 
              ? 1 
              : Math.max(1 - (fadeProgress * (1.3 - positionY * 0.2)), 0) // Fade más lento para imágenes más abajo

            // Usar posición mobile si está definida y estamos en mobile
            const position = isMobileRef.current && (layer as any).initialPositionMobile 
              ? (layer as any).initialPositionMobile 
              : layer.initialPosition

            return (
              <div
                key={layer.id}
                className={`absolute pointer-events-none ${layer.size} h-auto`}
                style={{
                  left: position.x,
                  top: position.y,
                  zIndex: layer.zIndex,
                  transform: `translate3d(-50%, calc(-50% + ${parallaxOffset}px), 0)`,
                  willChange: 'transform, opacity',
                  filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none',
                  opacity: imageOpacity,
                  transition: 'opacity 0.3s ease-out, filter 0.3s ease-out'
                }}
                >
                <img
                  src={layer.image}
                  alt={layer.alt}
                  className="w-full h-auto object-cover shadow-2xl"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )
          })}
        </div>

        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none z-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </div>
      </section>
    </>
  )
}