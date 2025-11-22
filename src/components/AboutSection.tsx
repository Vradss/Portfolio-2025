'use client'

import { useRef, useEffect, useState } from 'react'
import profileImage from '@/assets/about-section/profile-photo.png'
import workingImage from '@/assets/about-section/working-at-desk.png'
import mountainImage from '@/assets/about-section/mountain-landscape.png'
import presentacion42Image from '@/assets/about-section/presentacion_42.jpg'
import innomakersImage from '@/assets/about-section/innomakers.jpg'
import madrid42PresImage from '@/assets/about-section/42madrid_pres.jpg'

// Configuración de las capas parallax - 5 fotos contenidas en su sección
// Las capas más lejanas son más pequeñas para crear sensación de profundidad 3D
const parallaxLayers = [
  {
    id: 'madrid42pres',
    image: madrid42PresImage,
    alt: '42 Madrid presentation event',
    depth: 0.4,
    zIndex: 15,
    initialPosition: { x: '50%', y: '20%' },
    size: 'w-44 lg:w-[240px]'
  },
  {
    id: 'mountain',
    image: mountainImage,
    alt: 'Woman with sunglasses by the lake and mountains',
    depth: 0.55,
    zIndex: 20,
    initialPosition: { x: '78%', y: '30%' },
    size: 'w-48 lg:w-[260px]'
  },
  {
    id: 'innomakers',
    image: innomakersImage,
    alt: 'Innomakers project',
    depth: 0.7,
    zIndex: 25,
    initialPosition: { x: '70%', y: '65%' },
    size: 'w-64 lg:w-[360px]' // Agrandada
  },
  {
    id: 'working',
    image: workingImage,
    alt: 'Working on laptop in office',
    depth: 0.85,
    zIndex: 30,
    initialPosition: { x: '30%', y: '70%' },
    size: 'w-60 lg:w-[340px]'
  },
  {
    id: 'profile',
    image: profileImage,
    alt: 'Digital Product Manager working on laptop with code',
    depth: 1.0, // Capa más cercana - se mueve mucho más
    zIndex: 40,
    initialPosition: { x: '18%', y: '50%' },
    size: 'w-64 lg:w-[380px]'
  }
]

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [rotatingWord, setRotatingWord] = useState(0) // Índice de la palabra rotando

  const rotatingWords = ['builder', 'coder', 'maker']

  // Hook para rotar las palabras cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingWord((prev) => (prev + 1) % rotatingWords.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Hook para trackear el scroll y calcular el offset de parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      // Obtener la posición de la sección relativa al viewport
      const rect = containerRef.current.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionHeight = rect.height

      // Calcular scroll solo cuando la sección está visible
      if (sectionTop < window.innerHeight && sectionTop + sectionHeight > 0) {
        // Scroll relativo a la sección (negativo cuando scrolleamos hacia abajo)
        setScrollY(-sectionTop)
      }
    }

    handleScroll() // Ejecutar al montar
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Sección de Texto */}
      <section
        id="about"
        className="relative overflow-hidden px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="relative flex flex-col items-center justify-center gap-6">
          {/* Título principal con palabra rotando */}
          <h2
            className="text-black text-center leading-tight max-w-3xl mx-auto px-4"
            style={{
              fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(28px, 5vw, 48px)',
              lineHeight: 1.2
            }}
          >
            I'm a Product Manager becoming a{' '}
            <span
              className="inline-block"
              style={{
                minWidth: '200px',
                textAlign: 'left',
                color: '#6366f1' // Color accent para la palabra rotando
              }}
            >
              <span
                key={rotatingWord}
                style={{
                  animation: 'fadeInOut 2s ease-in-out',
                  display: 'inline-block'
                }}
              >
                {rotatingWords[rotatingWord]}
              </span>
            </span>
          </h2>

          {/* Párrafos descriptivos */}
          <div
            className="text-black text-left leading-relaxed max-w-2xl mx-auto px-4 space-y-4"
            style={{
              fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              lineHeight: 1.6
            }}
          >
            <p>
              I started in product strategy and UX, now I'm learning to code (42 Madrid) and automate with AI (n8n, Python, LLMs). I don't want to just spec products—I want to prototype them, validate them, and ship them myself.
            </p>
            <p>
              <strong>Currently:</strong> 42 Madrid (systems programming) + AI automation projects at Núcleo Studio
            </p>
          </div>
        </div>

        <style>
          {`
            @keyframes fadeInOut {
              0% { opacity: 0; transform: translateY(-10px); }
              10% { opacity: 1; transform: translateY(0); }
              90% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(10px); }
            }
          `}
        </style>
      </section>

      {/* Sección de Imágenes Parallax - Completamente independiente */}
      <section
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ height: '150vh', backgroundColor: 'transparent' }}
      >
        {/* Capas parallax 3D - Desktop */}
        <div className="relative w-full h-full hidden md:block">
          {parallaxLayers.map((layer) => {
            // Calcular el desplazamiento parallax basado en scrollY y depth
            const parallaxOffset = scrollY * layer.depth

            return (
              <div
                key={layer.id}
                className={`absolute pointer-events-none ${layer.size} h-auto`}
                style={{
                  left: layer.initialPosition.x,
                  top: layer.initialPosition.y,
                  zIndex: layer.zIndex,
                  transform: `translate(-50%, calc(-50% + ${parallaxOffset}px))`,
                  transition: 'transform 0.05s linear' // Transición suave del parallax
                }}
              >
                <img
                  src={layer.image}
                  alt={layer.alt}
                  className="w-full h-auto object-cover shadow-2xl"
                />
              </div>
            )
          })}
        </div>

        {/* Versión mobile sin parallax - 5 imágenes estáticas */}
        <div className="absolute inset-0 md:hidden">
          <div className="absolute left-[45%] top-[50%] w-36 sm:w-44 h-auto z-40 pointer-events-none -translate-x-1/2 -translate-y-1/2">
            <img
              src={profileImage}
              alt="Digital Product Manager"
              className="w-full h-auto object-cover shadow-md"
            />
          </div>
          <div className="absolute left-[65%] top-[42%] w-32 sm:w-40 h-auto z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2">
            <img
              src={mountainImage}
              alt="Mountain landscape"
              className="w-full h-auto object-cover shadow-md"
            />
          </div>
          <div className="absolute left-[50%] top-[50%] w-40 sm:w-48 h-auto z-25 pointer-events-none -translate-x-1/2 -translate-y-1/2">
            <img
              src={innomakersImage}
              alt="Innomakers project"
              className="w-full h-auto object-cover shadow-md"
            />
          </div>
          <div className="absolute left-[35%] top-[58%] w-36 sm:w-44 h-auto z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2">
            <img
              src={workingImage}
              alt="Working on laptop"
              className="w-full h-auto object-cover shadow-md"
            />
          </div>
          <div className="absolute left-[55%] top-[32%] w-28 sm:w-36 h-auto z-12 pointer-events-none -translate-x-1/2 -translate-y-1/2">
            <img
              src={madrid42PresImage}
              alt="42 Madrid presentation event"
              className="w-full h-auto object-cover shadow-lg"
            />
          </div>
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