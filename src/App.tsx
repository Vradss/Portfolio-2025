'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, LayoutGroup } from 'motion/react'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { WorkSection } from './components/WorkSection'
import { CTASection } from './components/CTASection'
import { Footer } from './components/Footer'
import { ProjectDetailPage } from './components/ProjectDetailPage'
import { HeroStateProvider } from './contexts/HeroStateContext'
import { useLenis } from './hooks/useLenis'
import { projects } from './data/projects'

export default function App() {
  useLenis()
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)

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
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [selectedProjectId])

  // If a project is selected, show the project detail page
  if (selectedProjectId !== null) {
    const selectedProject = projects.find(p => p.id === selectedProjectId)
    if (selectedProject) {
      return (
        <HeroStateProvider>
          <LayoutGroup>
            <div className="antialiased">
              <ProjectDetailPage 
                project={selectedProject} 
                onBack={handleBackToPortfolio} 
              />
            </div>
          </LayoutGroup>
        </HeroStateProvider>
      )
    }
  }

  return (
    <HeroStateProvider>
      <LayoutGroup>
        <div className="antialiased">
          <div className="relative">
            <HeroSection />
            <div id="about-section">
              <AboutSection />
            </div>
            <SkillsSection />
            <div id="work-section">
              <WorkSection onViewProject={handleViewProject} />
            </div>
            <Footer />
          </div>
        </div>
      </LayoutGroup>
    </HeroStateProvider>
  )
}