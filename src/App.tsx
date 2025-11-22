'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, LayoutGroup } from 'motion/react'
import { HeroSection } from './components/HeroSection'
import { AboutTextSection } from './components/AboutTextSection'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { WorkSection } from './components/WorkSection'
import { CTASection } from './components/CTASection'
import { Footer } from './components/Footer'
import { ProjectDetailPage } from './components/ProjectDetailPage'
import { HeroStateProvider, useHeroState } from './contexts/HeroStateContext'
import { useLenis, getLenis } from './hooks/useLenis'
import { projects } from './data/projects'

// Función para interpolar linealmente entre dos colores RGB
function lerpColor(fromRGB: [number, number, number], toRGB: [number, number, number], t: number): string {
  const r = Math.round(fromRGB[0] + (toRGB[0] - fromRGB[0]) * t)
  const g = Math.round(fromRGB[1] + (toRGB[1] - fromRGB[1]) * t)
  const b = Math.round(fromRGB[2] + (toRGB[2] - fromRGB[2]) * t)
  return `rgb(${r}, ${g}, ${b})`
}

// Componente interno que tiene acceso al contexto del Hero
function AppContent() {
  const { getCurrentColor } = useHeroState()
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  // Color inicial debe ser el color actual del hero
  const [bgColor, setBgColor] = useState<string>(getCurrentColor())
  const [workBgColor, setWorkBgColor] = useState<string>('white')
  const heroRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  // useEffect para escuchar el scroll y cambiar el color de fondo
  useEffect(() => {
    // Función para convertir hex a RGB
    const hexToRgb = (hex: string): [number, number, number] => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
        : [255, 255, 255]
    }

    const handleScroll = () => {
      // Obtener la altura real del Hero
      const heroHeight = heroRef.current?.offsetHeight || window.innerHeight

      // Calcular scroll raw (0 a 1 a través del Hero)
      const scrollRaw = Math.min(window.scrollY / heroHeight, 1)

      // Ajustar el progreso: mantener color original hasta 50%, luego transicionar rápidamente
      // Esto hace que el color predominante sea blanco cuando la segunda sección aparece
      let progress = 0
      if (scrollRaw > 0.5) {
        // De 0.5 a 1.0 → mapear a 0 a 1 para la interpolación
        progress = (scrollRaw - 0.5) / 0.5
      }

      // Colores: desde el color actual del hero hasta blanco
      const currentHeroColor = getCurrentColor()
      const fromRGB = hexToRgb(currentHeroColor)
      const toRGB: [number, number, number] = [255, 255, 255] // Blanco

      // Interpolar el color
      const interpolatedColor = lerpColor(fromRGB, toRGB, progress)

      // Aplicar el color de fondo
      setBgColor(interpolatedColor)
    }

    // Ejecutar al montar y en cada scroll
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [getCurrentColor])

  // useEffect para interpolar color de Skills (blanco) a Work (negro)
  useEffect(() => {
    const handleScrollWork = () => {
      const skillsSection = skillsRef.current
      if (!skillsSection) return

      const skillsRect = skillsSection.getBoundingClientRect()
      const skillsHeight = skillsRect.height
      const skillsTop = skillsRect.top

      // Calcular el progreso del scroll a través de la sección Skills
      // Empezar la transición cuando Skills está al 50% visible
      const startTransition = window.innerHeight * 0.5
      const scrollProgress = Math.max(0, startTransition - skillsTop) / (skillsHeight * 0.5)
      const progress = Math.min(Math.max(scrollProgress, 0), 1)

      // Interpolar de blanco (255,255,255) a negro (0,0,0)
      const fromRGB: [number, number, number] = [255, 255, 255] // Blanco
      const toRGB: [number, number, number] = [0, 0, 0] // Negro

      const interpolatedColor = lerpColor(fromRGB, toRGB, progress)
      setWorkBgColor(interpolatedColor)
    }

    handleScrollWork()
    window.addEventListener('scroll', handleScrollWork, { passive: true })

    return () => window.removeEventListener('scroll', handleScrollWork)
  }, [])

  // Handler to view project details
  const handleViewProject = (projectId: number) => {
    setSelectedProjectId(projectId)
  }

  // Handler to go back to main portfolio
  const handleBackToPortfolio = () => {
    setSelectedProjectId(null)
    // Scroll to work section when going back
    setTimeout(() => {
      const workSection = document.getElementById('work-section')
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  // Scroll to top when project is selected
  useEffect(() => {
    if (selectedProjectId !== null) {
      // Force immediate scroll to top using Lenis API
      const lenis = getLenis()

      const scrollToTop = () => {
        // Use Lenis scrollTo if available
        if (lenis) {
          lenis.scrollTo(0, { immediate: true })
        }

        // Also force native scroll as backup
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }

      // Execute immediately
      scrollToTop()

      // Also execute in next frames to ensure it sticks
      requestAnimationFrame(() => {
        scrollToTop()
        requestAnimationFrame(() => {
          scrollToTop()
          setTimeout(scrollToTop, 100)
        })
      })
    }
  }, [selectedProjectId])

  // If a project is selected, show the project detail page
  if (selectedProjectId !== null) {
    const selectedProject = projects.find(p => p.id === selectedProjectId)
    if (selectedProject) {
      return (
        <LayoutGroup>
          <div className="antialiased">
            <ProjectDetailPage
              project={selectedProject}
              onBack={handleBackToPortfolio}
            />
          </div>
        </LayoutGroup>
      )
    }
  }

  return (
    <LayoutGroup>
      {/* Contenedor principal con el color de fondo interpolado - transición smooth entre colores */}
      <div
        className="antialiased"
        style={{
          backgroundColor: bgColor,
          transition: 'background-color 0.05s linear' // Transición muy rápida para que el scroll se sienta smooth
        }}
      >
        <div className="relative">
          {/* Hero con ref para obtener su altura */}
          <div ref={heroRef}>
            <HeroSection />
          </div>
          <div id="about-section">
            <AboutTextSection />
            <AboutSection />
          </div>
          <div ref={skillsRef}>
            <SkillsSection />
          </div>
          <div
            id="work-section"
            style={{
              backgroundColor: workBgColor,
              transition: 'background-color 0.1s linear'
            }}
          >
            <WorkSection onViewProject={handleViewProject} />
          </div>
          <Footer />
        </div>
      </div>
    </LayoutGroup>
  )
}

// Export por defecto que envuelve en el Provider
export default function App() {
  useLenis()

  return (
    <HeroStateProvider>
      <AppContent />
    </HeroStateProvider>
  )
}