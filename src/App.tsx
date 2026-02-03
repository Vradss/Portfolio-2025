'use client'

import { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from 'react'
import { LayoutGroup } from 'motion/react'
import { HeroStateProvider, useHeroState } from './contexts/HeroStateContext'
import { useLenis, getLenis } from './hooks/useLenis'
import { useThrottle } from './hooks/useThrottle'
import { getProjectsFromTranslations } from './data/projects'
import { useTranslation } from 'react-i18next'

// Code splitting: cargar componentes pesados de forma lazy
const HeroSection = lazy(() => import('./components/HeroSection').then(m => ({ default: m.HeroSection })))
const AboutTextSection = lazy(() => import('./components/AboutTextSection').then(m => ({ default: m.AboutTextSection })))
const AboutSection = lazy(() => import('./components/AboutSection').then(m => ({ default: m.AboutSection })))
const SkillsSection = lazy(() => import('./components/SkillsSection').then(m => ({ default: m.SkillsSection })))
const WorkSection = lazy(() => import('./components/WorkSection').then(m => ({ default: m.WorkSection })))
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })))
const ProjectDetailPage = lazy(() => import('./components/ProjectDetailPage').then(m => ({ default: m.ProjectDetailPage })))

// Skeleton para loading states
const SectionSkeleton = () => (
  <div className="w-full h-screen bg-gray-50 animate-pulse" />
)

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
  const { i18n: i18nInstance } = useTranslation()
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [projects, setProjects] = useState(getProjectsFromTranslations())
  // Color inicial debe ser el color actual del hero
  const [bgColor, setBgColor] = useState<string>(getCurrentColor())
  const [workBgColor, setWorkBgColor] = useState<string>('white')
  const heroRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  // Memoizar función de conversión hex a RGB
  const hexToRgb = useCallback((hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
      : [255, 255, 255]
  }, [])

  // Handler de scroll optimizado con throttle
  const handleScroll = useCallback(() => {
    // Obtener la altura real del Hero
    const heroHeight = heroRef.current?.offsetHeight || window.innerHeight

    // Calcular scroll raw (0 a 1 a través del Hero)
    const scrollRaw = Math.min(window.scrollY / heroHeight, 1)

    // Ajustar el progreso: mantener color original hasta 50%, luego transicionar rápidamente
    let progress = 0
    if (scrollRaw > 0.5) {
      progress = (scrollRaw - 0.5) / 0.5
    }

    // Colores: desde el color actual del hero hasta blanco
    const currentHeroColor = getCurrentColor()
    const fromRGB = hexToRgb(currentHeroColor)
    const toRGB: [number, number, number] = [255, 255, 255]

    // Interpolar el color
    const interpolatedColor = lerpColor(fromRGB, toRGB, progress)

    // Aplicar el color de fondo
    setBgColor(interpolatedColor)
  }, [getCurrentColor, hexToRgb])

  // Throttle del scroll handler (16ms = ~60fps)
  const throttledHandleScroll = useThrottle(handleScroll, 16)

  // useEffect para escuchar el scroll y cambiar el color de fondo
  useEffect(() => {
    // Ejecutar al montar
    handleScroll()
    window.addEventListener('scroll', throttledHandleScroll, { passive: true })

    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [throttledHandleScroll, handleScroll])

  // Handler de scroll para Skills → Work optimizado
  const handleScrollWork = useCallback(() => {
    const skillsSection = skillsRef.current
    if (!skillsSection) return

    const skillsHeight = skillsSection.offsetHeight
    const skillsTop = skillsSection.offsetTop

    const scrollRaw = Math.min(Math.max((window.scrollY - skillsTop) / skillsHeight, 0), 1)

    let progress = 0
    if (scrollRaw > 0.3) {
      progress = Math.min((scrollRaw - 0.3) / 0.5, 1)
    }

    const fromRGB: [number, number, number] = [255, 255, 255]
    const toRGB: [number, number, number] = [0, 0, 0]

    const interpolatedColor = lerpColor(fromRGB, toRGB, progress)
    setWorkBgColor(interpolatedColor)
  }, [])

  // Throttle del scroll handler para Skills
  const throttledHandleScrollWork = useThrottle(handleScrollWork, 16)

  // useEffect para interpolar color de Skills (blanco) a Work (negro)
  useEffect(() => {
    handleScrollWork()
    window.addEventListener('scroll', throttledHandleScrollWork, { passive: true })

    return () => window.removeEventListener('scroll', throttledHandleScrollWork)
  }, [throttledHandleScrollWork, handleScrollWork])

  // Memoizar handlers para evitar re-renders
  const handleViewProject = useCallback((projectId: number) => {
    setSelectedProjectId(projectId)
  }, [])

  const handleBackToPortfolio = useCallback(() => {
    setSelectedProjectId(null)
    // Scroll to work section when going back
    setTimeout(() => {
      const workSection = document.getElementById('work-section')
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }, [])

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

  // Update projects when language changes
  useEffect(() => {
    const currentLanguage = i18nInstance.language || 'en'
    
    const updateProjects = () => {
      setProjects(getProjectsFromTranslations())
    }
    
    // Update immediately when language changes
    updateProjects()
    
    i18nInstance.on('languageChanged', updateProjects)
    return () => {
      i18nInstance.off('languageChanged', updateProjects)
    }
  }, [i18nInstance, i18nInstance.language])

  // Memoizar proyecto seleccionado
  const selectedProject = useMemo(() => {
    return selectedProjectId !== null 
      ? projects.find(p => p.id === selectedProjectId) 
      : null
  }, [selectedProjectId, projects])

  // Memoizar estilos para evitar recreación
  const containerStyle = useMemo(() => ({
    backgroundColor: bgColor,
    transition: 'background-color 0.05s linear'
  }), [bgColor])

  const skillsStyle = useMemo(() => ({
    backgroundColor: workBgColor,
    transition: 'background-color 0.1s linear'
  }), [workBgColor])

  // If a project is selected, show the project detail page
  if (selectedProject) {
    return (
      <LayoutGroup>
        <div className="antialiased">
          <Suspense fallback={<SectionSkeleton />}>
            <ProjectDetailPage
              project={selectedProject}
              onBack={handleBackToPortfolio}
            />
          </Suspense>
        </div>
      </LayoutGroup>
    )
  }

  return (
    <LayoutGroup>
      {/* Contenedor principal con el color de fondo interpolado */}
      <div
        className="antialiased"
        style={containerStyle}
      >
        <div className="relative">
          {/* Hero con ref para obtener su altura */}
          <div ref={heroRef}>
            <Suspense fallback={<SectionSkeleton />}>
              <HeroSection />
            </Suspense>
          </div>
          <div id="about-section">
            <Suspense fallback={<SectionSkeleton />}>
              <AboutTextSection />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <AboutSection />
            </Suspense>
          </div>
          <div
            ref={skillsRef}
            style={skillsStyle}
          >
            <Suspense fallback={<SectionSkeleton />}>
              <SkillsSection />
            </Suspense>
          </div>
          <div id="work-section">
            <Suspense fallback={<SectionSkeleton />}>
              <WorkSection onViewProject={handleViewProject} />
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
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