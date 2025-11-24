'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { Navigation } from './Navigation'
import { Footer } from './Footer'
import { type Project } from '../data/projects'
import { getLenis } from '../hooks/useLenis'
import positioningFramework from '@/assets/projects/ngrowth/ngrowth-positioning-framework.png'
import wireframeImage from '@/assets/other-assets/wireframe-generic.png'
import competitiveResearchNgrowth from '@/assets/projects/ngrowth/ngrowth-competitive-research.png'
import positioningNgrowth from '@/assets/projects/ngrowth/ngrowth-positioning.png'
import competitiveAnalysisShift from '@/assets/projects/shift/competitive_analysis.png'

interface ProjectDetailPageProps {
  project: Project
  onBack: () => void
}

export function ProjectDetailPage({ project, onBack }: ProjectDetailPageProps) {
  const [viewMode, setViewMode] = useState<'side-by-side' | 'before' | 'after'>('side-by-side')
  
  // Scroll to top when component mounts (force immediate)
  useEffect(() => {
    const lenis = getLenis()

    const scrollToTop = () => {
      // Use Lenis scrollTo if available - this is the key!
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
        // One more time after a delay to override any Lenis animations
        setTimeout(scrollToTop, 100)
      })
    })
  }, [project.id])

  return (
    <div className="bg-white">
      {/* Navigation */}
      <Navigation isDark={true} onLogoClick={onBack} />

      {/* Hero Section - New Layout */}
      <section className="relative bg-[#1a1a1a] text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        {/* View More Projects Button */}
        <div className="max-w-7xl mx-auto mb-12">
          <motion.button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 rounded hover:bg-white/10 transition-all duration-300"
            whileHover={{ x: -5 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              letterSpacing: '1px'
            }}
          >
            <ArrowLeft size={20} />
            VIEW MORE PROJECTS
          </motion.button>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Project Title */}
          <motion.h1
            className="text-white mb-4"
            style={{
              fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(56px, 12vw, 140px)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {project.title}
          </motion.h1>

          {/* Subtitle - Year and Project Description */}
          <motion.p
            className="text-white/80 mb-6"
            style={{
              fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: 1.5
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {project.details?.year && `${project.details.year} / `}{project.industry}
          </motion.p>

          {/* Live Link Button */}
          {project.details && project.id !== 5 && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <a
                href={
                  project.id === 1
                    ? 'https://shift.pe'
                    : project.id === 2
                    ? 'https://worthit.vc'
                    : project.id === 3
                    ? 'https://invoinet.com'
                    : project.id === 4
                    ? 'https://ngrowth.io'
                    : project.id === 5
                    ? 'https://juntoz.com'
                    : '#'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 rounded hover:bg-white hover:text-black transition-all duration-300"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  letterSpacing: '1px'
                }}
              >
                LIVE LINK
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </motion.div>
          )}

          {/* Project Main Image - Full Width */}
          <motion.div
            layoutId={`project-image-${project.id}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full rounded-lg overflow-hidden shadow-2xl aspect-[16/10]">
              {typeof project.image === 'string' ? (
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain rounded-lg"
                />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE CHALLENGE Section - Generic for all projects */}
      {project.details?.problem && (
        <section className="relative bg-white pt-[120px] pb-[60px] px-4 sm:px-6 lg:px-[240px]">
          <div className="max-w-7xl mx-auto">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Title and Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2
                  className="text-black mb-8"
                  style={{
                    fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '48px',
                    lineHeight: 1.2
                  }}
                >
                  THE CHALLENGE
                </h2>

                <div className="space-y-6">
                  {project.details.problem.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p
                        key={index}
                        className="text-black"
                        style={{
                          fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                          fontWeight: 400,
                          fontSize: '20px',
                          lineHeight: 1.7
                        }}
                      >
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>
              </motion.div>

              {/* Right Column - Tech Stack & Disciplines - Aligned with bullets */}
              <motion.div
                className="flex flex-col lg:pt-[calc(48px+2rem)]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="space-y-8">
                  {/* Tech Stack */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div>
                      <h3
                        className="text-black/60 mb-3"
                        style={{
                          fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                          fontWeight: 500,
                          fontSize: '12px',
                          letterSpacing: '1px'
                        }}
                      >
                        TECH
                      </h3>
                      <p
                        className="text-black"
                        style={{
                          fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                          fontWeight: 400,
                          fontSize: '20px',
                          lineHeight: 1.7
                        }}
                      >
                        {project.technologies.join(', ')}
                      </p>
                    </div>
                  )}

                  {/* Disciplines */}
                  {project.details.skills && project.details.skills.length > 0 && (
                    <div>
                      <h3
                        className="text-black/60 mb-3"
                        style={{
                          fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                          fontWeight: 500,
                          fontSize: '12px',
                          letterSpacing: '1px'
                        }}
                      >
                        DISCIPLINES
                      </h3>
                      <p
                        className="text-black"
                        style={{
                          fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                          fontWeight: 400,
                          fontSize: '20px',
                          lineHeight: 1.7
                        }}
                      >
                        {project.details.skills.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* PRODUCT RESEARCH & DISCOVERY Section - For SHIFT */}
      {project.id === 1 && (
        <section className="relative bg-white pt-[60px] pb-[120px] px-4 sm:px-6 lg:px-[240px]">
          <div className="max-w-7xl mx-auto">
            {/* Main Title */}
            <motion.h2
              className="text-black mb-4"
              style={{
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '48px',
                lineHeight: 1.2
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              PRODUCT RESEARCH & DISCOVERY
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-black/60 mb-12 max-w-3xl"
              style={{
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: 1.7
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Conducted competitive analysis to identify SHIFT's unique positioning opportunity in the innovation community market.
            </motion.p>

            {/* A) Competitive Analysis */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3
                className="text-black mb-6"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: 1.3
                }}
              >
                A) Competitive Analysis
              </h3>

              <p
                className="text-black mb-8"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: 1.7
                }}
              >
                Positioning opportunity: SHIFT could own the space of "corporate-startup bridge"—connecting established leaders with entrepreneurial ecosystem for mutual benefit, not limited by gender or industry vertical.
              </p>

              {/* Competitive Analysis Image */}
              <motion.div
                className="w-full rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <img
                  src={competitiveAnalysisShift}
                  alt="SHIFT Competitive Analysis"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* PRODUCT RESEARCH & DISCOVERY Section - For WORTHIT */}
      {project.id === 2 && project.details?.competitiveAnalysisImage && (
        <section className="relative bg-white pt-[60px] pb-[120px] px-4 sm:px-6 lg:px-[240px]">
          <div className="max-w-7xl mx-auto">
            {/* Main Title */}
            <motion.h2
              className="text-black mb-4"
              style={{
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '48px',
                lineHeight: 1.2
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              PRODUCT RESEARCH & DISCOVERY
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="text-black mb-20 max-w-4xl"
              style={{
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: 1.7
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Analyzed VC market landscape to define positioning strategy and design approach.
            </motion.p>

            {/* A) COMPETITIVE ANALYSIS */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {/* Subheading with A) */}
              <h3
                className="text-black mb-4"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: '20px',
                  lineHeight: 1.4,
                  letterSpacing: '1px'
                }}
              >
                A) COMPETITIVE ANALYSIS
              </h3>

              {/* Description */}
              <p
                className="text-black mb-10 max-w-4xl"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: 1.7
                }}
              >
                Analyzed 7 VC funds (Ganas Ventures, Village Global, Graph Ventures, AdaptVC, 2048 Ventures, Alaya Capital, The Venture City) to identify positioning gaps and design patterns.
              </p>

              {/* Competitive Analysis Image */}
              <div className="relative rounded-lg overflow-hidden shadow-xl bg-gray-50">
                {typeof project.details.competitiveAnalysisImage === 'string' ? (
                  <ImageWithFallback
                    src={project.details.competitiveAnalysisImage}
                    alt="Competitive Analysis"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                ) : (
                  <img
                    src={project.details.competitiveAnalysisImage}
                    alt="Competitive Analysis"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* PRODUCT RESEARCH & DISCOVERY Section - For INVOINET */}
      {project.id === 3 && (
        <section className="relative bg-white pt-[60px] pb-[120px] px-4 sm:px-6 lg:px-[240px]">
          <div className="max-w-7xl mx-auto">
            {/* Main Title - Left Aligned - Black like THE CHALLENGE */}
            <motion.h2
              className="text-black mb-4"
              style={{
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '48px',
                lineHeight: 1.2
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              PRODUCT RESEARCH & DISCOVERY
            </motion.h2>

            {/* Subtitle - Left Aligned */}
            <motion.p
              className="text-black mb-20 max-w-4xl"
              style={{
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: 1.7
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Conducted competitive analysis and user research to understand market landscape and define product positioning.
            </motion.p>

            {/* A) COMPETITIVE DIFFERENTIATION */}
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {/* Subheading with A) */}
              <h3
                className="text-black mb-4"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: '20px',
                  lineHeight: 1.4,
                  letterSpacing: '1px'
                }}
              >
                A) COMPETITIVE DIFFERENTIATION
              </h3>

              {/* Description */}
              <p
                className="text-black mb-10 max-w-4xl"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: 1.7
                }}
              >
                Analyzed competitors across product and go-to-market dimensions. This revealed Invoinet's unique opportunity: combining automation platform with personalized support for enterprise accounts.
              </p>

              {/* Framework Image - Now with contain */}
              <div className="relative rounded-lg overflow-hidden shadow-xl bg-gray-50">
                <img
                  src={positioningFramework}
                  alt="Competitive Differentiation Framework"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </motion.div>

            {/* B) INFORMATION ARCHITECTURE */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Subheading with B) */}
              <h3
                className="text-black mb-4"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: '20px',
                  lineHeight: 1.4,
                  letterSpacing: '1px'
                }}
              >
                B) INFORMATION ARCHITECTURE
              </h3>

              {/* Description */}
              <p
                className="text-black mb-10 max-w-4xl"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: 1.7
                }}
              >
                Designed website structure with 8 strategic sections to communicate positioning. Each section used specific persuasion techniques informed by competitive research.
              </p>

              {/* Wireframe Image */}
              <div className="relative rounded-lg overflow-hidden shadow-xl bg-gray-50">
                <img
                  src={wireframeImage}
                  alt="Information Architecture Wireframe"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* PRODUCT RESEARCH & DISCOVERY Section - For NGROWTH */}
      {project.id === 4 && (
        <section className="relative bg-white pt-[60px] pb-[120px] px-4 sm:px-6 lg:px-[240px]">
          <div className="max-w-7xl mx-auto">
            {/* Main Title - Left Aligned - Black like THE CHALLENGE */}
            <motion.h2
              className="text-black mb-4"
              style={{
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '48px',
                lineHeight: 1.2
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              PRODUCT RESEARCH & DISCOVERY
            </motion.h2>

            {/* Subtitle - Left Aligned */}
            <motion.p
              className="text-black mb-20 max-w-4xl"
              style={{
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: 1.7
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Defined market positioning and product strategy for new sales consultancy launching in competitive market.
            </motion.p>

            {/* A) COMPETITIVE RESEARCH */}
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {/* Subheading with A) */}
              <h3
                className="text-black mb-4"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: '20px',
                  lineHeight: 1.4,
                  letterSpacing: '1px'
                }}
              >
                A) COMPETITIVE RESEARCH
              </h3>

              {/* Description */}
              <p
                className="text-black mb-10 max-w-4xl"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: 1.7
                }}
              >
                Analyzed 4 competitors to identify market gaps. Finding: competitors offered generic methodologies or platforms alone. nGrowth's opportunity was combining proven frameworks with personalized support for tech founders.
              </p>

              {/* Competitive Research Image */}
              <div className="relative rounded-lg overflow-hidden shadow-xl bg-gray-50">
                <img
                  src={competitiveResearchNgrowth}
                  alt="Competitive Research nGrowth"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </motion.div>

            {/* B) PRODUCT POSITIONING */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Subheading with B) */}
              <h3
                className="text-black mb-4"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: '20px',
                  lineHeight: 1.4,
                  letterSpacing: '1px'
                }}
              >
                B) PRODUCT POSITIONING
              </h3>

              {/* Description */}
              <p
                className="text-black mb-10 max-w-4xl"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: 1.7
                }}
              >
                Developed positioning framework mapping pain points to nGrowth's capabilities and benefits. This informed all website messaging.
              </p>

              {/* Positioning Framework Image */}
              <div className="relative rounded-lg overflow-hidden shadow-xl bg-gray-50">
                <img
                  src={positioningNgrowth}
                  alt="Product Positioning Framework nGrowth"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* USER RESEARCH & DISCOVERY Section - For JUNTOZ */}
      {project.id === 5 && (project.details?.userResearchImage || project.details?.competitiveAnalysisImage) && (
        <section className="relative bg-white pt-[60px] pb-[120px] px-4 sm:px-6 lg:px-[240px]">
          <div className="max-w-7xl mx-auto">
            {/* Main Title */}
            <motion.h2
              className="text-black mb-4"
              style={{
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '48px',
                lineHeight: 1.2
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              USER RESEARCH & DISCOVERY
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="text-black mb-20 max-w-4xl"
              style={{
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: 1.7
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Led comprehensive discovery process combining user research and competitive analysis to define product requirements.
            </motion.p>

            {/* A) USER RESEARCH */}
            {project.details.userResearchImage && (
              <motion.div
                className="mb-20"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {/* Subheading with A) */}
                <h3
                  className="text-black mb-4"
                  style={{
                    fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                    fontWeight: 600,
                    fontSize: '20px',
                    lineHeight: 1.4,
                    letterSpacing: '1px'
                  }}
                >
                  A) USER RESEARCH
                </h3>

                {/* Description */}
                <p
                  className="text-black mb-10 max-w-4xl"
                  style={{
                    fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: 1.7
                  }}
                >
                  Conducted in-depth interviews and surveys across seller segments and internal stakeholders to understand needs and pain points.
                </p>

                {/* User Research Image */}
                <div className="relative rounded-lg overflow-hidden shadow-xl bg-gray-50">
                  {typeof project.details.userResearchImage === 'string' ? (
                    <ImageWithFallback
                      src={project.details.userResearchImage}
                      alt="User Research"
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  ) : (
                    <img
                      src={project.details.userResearchImage}
                      alt="User Research"
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  )}
                </div>
              </motion.div>
            )}

            {/* B) COMPETITIVE BENCHMARKING */}
            {project.details.competitiveAnalysisImage && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Subheading with B) */}
                <h3
                  className="text-black mb-4"
                  style={{
                    fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                    fontWeight: 600,
                    fontSize: '20px',
                    lineHeight: 1.4,
                    letterSpacing: '1px'
                  }}
                >
                  B) COMPETITIVE BENCHMARKING
                </h3>

                {/* Description */}
                <p
                  className="text-black mb-10 max-w-4xl"
                  style={{
                    fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: 1.7
                  }}
                >
                  Evaluated national and international marketplace seller platforms to identify usability best practices and feature gaps.
                </p>

                {/* All Benchmarking Images in 2x3 grid */}
                {project.details.competitiveBenchmarkingImages && project.details.competitiveBenchmarkingImages.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* First image - Main competitive benchmarking */}
                    <motion.div
                      className="relative rounded-lg overflow-hidden shadow-xl bg-white border border-gray-200"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0 }}
                      viewport={{ once: true }}
                    >
                      {typeof project.details.competitiveAnalysisImage === 'string' ? (
                        <ImageWithFallback
                          src={project.details.competitiveAnalysisImage}
                          alt="Competitive Benchmarking Overview"
                          className="w-full h-auto object-contain rounded-lg"
                        />
                      ) : (
                        <img
                          src={project.details.competitiveAnalysisImage}
                          alt="Competitive Benchmarking Overview"
                          className="w-full h-auto object-contain rounded-lg"
                        />
                      )}
                    </motion.div>

                    {/* Additional 5 images */}
                    {project.details.competitiveBenchmarkingImages.map((image, index) => (
                      <motion.div
                        key={index}
                        className="relative rounded-lg overflow-hidden shadow-xl bg-white border border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                        viewport={{ once: true }}
                      >
                        {typeof image === 'string' ? (
                          <ImageWithFallback
                            src={image}
                            alt={`Competitive Benchmarking ${index + 1}`}
                            className="w-full h-auto object-contain rounded-lg"
                          />
                        ) : (
                          <img
                            src={image}
                            alt={`Competitive Benchmarking ${index + 1}`}
                            className="w-full h-auto object-contain rounded-lg"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* INFORMATION ARCHITECTURE Section - For JUNTOZ */}
      {project.id === 5 && project.details?.informationArchitectureImage && (
        <section className="relative bg-white pt-[60px] pb-[120px] px-4 sm:px-6 lg:px-[240px]">
          <div className="max-w-7xl mx-auto">
            {/* Main Title */}
            <motion.h2
              className="text-black mb-4"
              style={{
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '48px',
                lineHeight: 1.2
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              INFORMATION ARCHITECTURE
            </motion.h2>

            {/* Intro Text */}
            <motion.p
              className="text-black mb-12 max-w-4xl"
              style={{
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: 1.7
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Restructured platform with 12 core modules designed for seller self-service and operational clarity.
            </motion.p>

            {/* IA Diagram Image - Auto height container */}
            <motion.div
              className="my-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full rounded-lg overflow-hidden shadow-xl bg-gray-50 flex items-center justify-center">
                {typeof project.details.informationArchitectureImage === 'string' ? (
                  <ImageWithFallback
                    src={project.details.informationArchitectureImage}
                    alt="Information Architecture - 12 Core Modules"
                    className="w-full h-auto object-contain p-8"
                  />
                ) : (
                  <img
                    src={project.details.informationArchitectureImage}
                    alt="Information Architecture - 12 Core Modules"
                    className="w-full h-auto object-contain p-8"
                  />
                )}
              </div>
            </motion.div>

            {/* Key Product Decisions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3
                className="text-black mb-6"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: '20px',
                  lineHeight: 1.4,
                  letterSpacing: '1px'
                }}
              >
                Key product decisions:
              </h3>

              <ul className="space-y-4 max-w-4xl">
                <li
                  className="text-black flex items-start gap-3"
                  style={{
                    fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: 1.7
                  }}
                >
                  <span className="text-black mt-1">•</span>
                  <span>Desktop-first for complex operations (catalog upload, store design)</span>
                </li>
                <li
                  className="text-black flex items-start gap-3"
                  style={{
                    fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: 1.7
                  }}
                >
                  <span className="text-black mt-1">•</span>
                  <span>Mobile as read-only dashboard for on-the-go monitoring</span>
                </li>
                <li
                  className="text-black flex items-start gap-3"
                  style={{
                    fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: 1.7
                  }}
                >
                  <span className="text-black mt-1">•</span>
                  <span>Progressive disclosure based on seller maturity</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>
      )}

      {/* DESIGN & ITERATION Section - For JUNTOZ */}
      {project.id === 5 && (
        <section className="relative bg-black pt-[60px] pb-[40px] px-4 sm:px-6 lg:px-[240px]">
          <div className="max-w-7xl mx-auto">
            {/* Main Title */}
            <motion.h2
              className="text-white mb-4"
              style={{
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '48px',
                lineHeight: 1.2
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              DESIGN & ITERATION
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-white mb-8 max-w-4xl"
              style={{
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: 1.7
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Created and tested prototypes at multiple fidelity levels with internal teams and sellers before development.
            </motion.p>
          </div>
        </section>
      )}

      {/* THE TRANSFORMATION - Wireframe & Final Design (side by side) */}
      {!project.details?.beforeImage && project.details?.wireframeImage && project.details?.afterImage && (
        <section className="relative bg-black py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-white text-center mb-16"
              style={{
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(36px, 6vw, 60px)',
                lineHeight: 1.2
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              PRODUCT DEVELOPMENT
            </motion.h2>

            {/* Two Images Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Wireframe Lo-fi */}
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3
                  className="text-white mb-6 text-center"
                  style={{
                    fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                    fontWeight: 500,
                    fontSize: '20px',
                    letterSpacing: '1px'
                  }}
                >
                  Wireframe Lo-fi
                </h3>
                <div className="relative w-full rounded-lg overflow-hidden shadow-xl bg-white/5 border-2 border-gray-400">
                  {typeof project.details.wireframeImage === 'string' ? (
                    <ImageWithFallback
                      src={project.details.wireframeImage}
                      alt="Wireframe Lo-fi"
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  ) : (
                    <img
                      src={project.details.wireframeImage}
                      alt="Wireframe Lo-fi"
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  )}
                </div>
              </motion.div>

              {/* Web Design Final */}
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3
                  className="text-white mb-6 text-center"
                  style={{
                    fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                    fontWeight: 500,
                    fontSize: '20px',
                    letterSpacing: '1px'
                  }}
                >
                  Web Design Final
                </h3>
                <div className="relative w-full rounded-lg overflow-hidden shadow-xl bg-white/5">
                  {typeof project.details.afterImage === 'string' ? (
                    <ImageWithFallback
                      src={project.details.afterImage}
                      alt="Web Design Final"
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  ) : (
                    <img
                      src={project.details.afterImage}
                      alt="Web Design Final"
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  )}
                </div>
              </motion.div>
            </div>

            {/* View More Projects Button - Inside wireframe section */}
            <motion.div
              className="flex justify-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={onBack}
                className="bg-white text-black hover:bg-white/90 hover:shadow-lg hover:scale-105 transition-all duration-300 px-12 py-4 rounded-full transform relative"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 500,
                  fontSize: '18px'
                }}
                whileHover={{ scale: 1.05 }}
              >
                VIEW MORE PROJECTS
              </motion.button>
            </motion.div>
          </div>
        </section>
      )}

      {/* THE TRANSFORMATION Section - Only final result (no before/after, no wireframe) */}
      {!project.details?.beforeImage && !project.details?.wireframeImage && project.details?.afterImage && (
        <section className="relative bg-black py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-white text-center mb-16"
              style={{
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(36px, 6vw, 60px)',
                lineHeight: 1.2
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              THE TRANSFORMATION
            </motion.h2>

            {/* Single Image - Centered with max width */}
            <motion.div
              className="w-full flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative max-w-5xl w-full rounded-lg overflow-hidden shadow-xl">
                {typeof project.details.afterImage === 'string' ? (
                  <ImageWithFallback
                    src={project.details.afterImage}
                    alt={`${project.title} final result`}
                    className="w-full h-auto object-contain rounded-lg"
                  />
                ) : (
                  <img
                    src={project.details.afterImage}
                    alt={`${project.title} final result`}
                    className="w-full h-auto object-contain rounded-lg"
                  />
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Before & After Section - With toggle (for other projects, not JUNTOZ) */}
      {project.id !== 5 && !Array.isArray(project.details?.beforeImage) && project.details?.beforeImage && project.details?.afterImage && (
        <section className="relative bg-black py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-white text-center mb-8"
              style={{
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(36px, 6vw, 60px)',
                lineHeight: 1.2
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              THE TRANSFORMATION
            </motion.h2>

            {/* Toggle Buttons */}
            <motion.div 
              className="flex items-center justify-center gap-2 mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Side by Side - Hidden on mobile */}
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`hidden md:inline-block px-6 py-3 rounded-full transition-all duration-300 ${
                  viewMode === 'side-by-side' 
                    ? 'bg-white text-black' 
                    : 'bg-transparent text-white border border-white/30 hover:border-white/60'
                }`}
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 500,
                  fontSize: '12px'
                }}
              >
                SIDE-BY-SIDE
              </button>

              {/* Before */}
              <button
                onClick={() => setViewMode('before')}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  viewMode === 'before' 
                    ? 'bg-white text-black' 
                    : 'bg-transparent text-white border border-white/30 hover:border-white/60'
                }`}
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 500,
                  fontSize: '12px'
                }}
              >
                BEFORE
              </button>

              {/* After */}
              <button
                onClick={() => setViewMode('after')}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  viewMode === 'after' 
                    ? 'bg-white text-black' 
                    : 'bg-transparent text-white border border-white/30 hover:border-white/60'
                }`}
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 500,
                  fontSize: '12px'
                }}
              >
                AFTER
              </button>
            </motion.div>

            {/* Content based on view mode */}
            {viewMode === 'side-by-side' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Before */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="mb-6">
                    <h3
                      className="text-white"
                      style={{
                        fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                        fontWeight: 500,
                        fontSize: '20px'
                      }}
                    >
                      BEFORE
                    </h3>
                  </div>
                  <div className="relative w-full rounded-lg overflow-hidden shadow-xl">
                    {typeof project.details.beforeImage === 'string' ? (
                      <ImageWithFallback
                        src={project.details.beforeImage}
                        alt={`${project.title} before`}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    ) : (
                      <img
                        src={project.details.beforeImage}
                        alt={`${project.title} before`}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    )}
                  </div>
                </motion.div>

                {/* After */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="mb-6">
                    <h3
                      className="text-white"
                      style={{
                        fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                        fontWeight: 500,
                        fontSize: '20px'
                      }}
                    >
                      AFTER
                    </h3>
                  </div>
                  <div className="relative w-full rounded-lg overflow-hidden shadow-xl">
                    {typeof project.details.afterImage === 'string' ? (
                      <ImageWithFallback
                        src={project.details.afterImage}
                        alt={`${project.title} after`}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    ) : (
                      <img
                        src={project.details.afterImage}
                        alt={`${project.title} after`}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    )}
                  </div>
                </motion.div>
              </div>
            )}

            {viewMode === 'before' && (
              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative w-full rounded-lg overflow-hidden shadow-xl">
                  {typeof project.details.beforeImage === 'string' ? (
                    <ImageWithFallback
                      src={project.details.beforeImage}
                      alt={`${project.title} before`}
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  ) : (
                    <img
                      src={project.details.beforeImage}
                      alt={`${project.title} before`}
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  )}
                </div>
              </motion.div>
            )}

            {viewMode === 'after' && (
              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative w-full rounded-lg overflow-hidden shadow-xl">
                  {typeof project.details.afterImage === 'string' ? (
                    <ImageWithFallback
                      src={project.details.afterImage}
                      alt={`${project.title} after`}
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  ) : (
                    <img
                      src={project.details.afterImage}
                      alt={`${project.title} after`}
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  )}
                </div>
              </motion.div>
            )}

            {/* View More Projects Button - Inside THE TRANSFORMATION section */}
            <motion.div
              className="flex justify-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={onBack}
                className="bg-white text-black hover:bg-white/90 hover:shadow-lg hover:scale-105 transition-all duration-300 px-12 py-4 rounded-full transform relative"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 500,
                  fontSize: '18px'
                }}
                whileHover={{ scale: 1.05 }}
              >
                VIEW MORE PROJECTS
              </motion.button>
            </motion.div>
          </div>
        </section>
      )}

      {/* JUNTOZ TRANSFORMATION - BEFORE & AFTER */}
      {project.id === 5 && Array.isArray(project.details?.beforeImage) && project.details?.afterImage && (
        <section className="relative bg-black pt-[60px] pb-[120px] px-4 sm:px-6 lg:px-[240px]">
          <div className="max-w-7xl mx-auto">
            {/* BEFORE Section - 2 images in grid */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3
                className="text-white mb-8"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: '32px',
                  lineHeight: 1.2
                }}
              >
                BEFORE
              </h3>

              <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                {project.details.beforeImage.map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative rounded-lg overflow-hidden shadow-xl bg-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    {typeof image === 'string' ? (
                      <ImageWithFallback
                        src={image}
                        alt={`Before ${index + 1}`}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    ) : (
                      <img
                        src={image}
                        alt={`Before ${index + 1}`}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* AFTER Section - Support for array or single image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3
                className="text-white mb-8"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: '32px',
                  lineHeight: 1.2
                }}
              >
                AFTER
              </h3>

              {Array.isArray(project.details.afterImage) ? (
                <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                  {project.details.afterImage.map((image, index) => (
                    <motion.div
                      key={index}
                      className="relative rounded-lg overflow-hidden shadow-xl bg-white/5"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      {typeof image === 'string' ? (
                        <ImageWithFallback
                          src={image}
                          alt={`After ${index + 1}`}
                          className="w-full h-auto object-contain rounded-lg"
                        />
                      ) : (
                        <img
                          src={image}
                          alt={`After ${index + 1}`}
                          className="w-full h-auto object-contain rounded-lg"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden shadow-xl bg-white/5">
                  {typeof project.details.afterImage === 'string' ? (
                    <ImageWithFallback
                      src={project.details.afterImage}
                      alt="After"
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  ) : (
                    <img
                      src={project.details.afterImage}
                      alt="After"
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* IMPACT Section - For JUNTOZ */}
      {project.id === 5 && (
        <section className="relative bg-white pt-[60px] pb-[120px] px-4 sm:px-6 lg:px-[240px]">
          <div className="max-w-7xl mx-auto">
            {/* Main Title */}
            <motion.h2
              className="text-black mb-16"
              style={{
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '48px',
                lineHeight: 1.2
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              IMPACT
            </motion.h2>

            {/* Impact Items */}
            <motion.div
              className="space-y-6 max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div
                className="text-black flex items-start gap-4"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: 1.7
                }}
              >
                <span className="text-2xl">📈</span>
                <span>20% increase in digital sales</span>
              </div>

              <div
                className="text-black flex items-start gap-4"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: 1.7
                }}
              >
                <span className="text-2xl">⚡</span>
                <span>Improved seller and operations team efficiency</span>
              </div>

              <div
                className="text-black flex items-start gap-4"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: 1.7
                }}
              >
                <span className="text-2xl">🚀</span>
                <span>Reduced onboarding friction and support tickets</span>
              </div>

              <div
                className="text-black flex items-start gap-4"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: 1.7
                }}
              >
                <span className="text-2xl">🏢</span>
                <span>Enabled self-service management at scale for EFE Group expansion</span>
              </div>

              <div
                className="text-black flex items-start gap-4"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: 1.7
                }}
              >
                <span className="text-2xl">⭐</span>
                <span>Platform adopted by hundreds of sellers across Peru with significantly improved satisfaction</span>
              </div>
            </motion.div>

            {/* View More Projects Button - Inside IMPACT section for Juntoz */}
            <motion.div
              className="flex justify-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={onBack}
                className="bg-black text-white hover:bg-black/90 hover:shadow-lg hover:scale-105 transition-all duration-300 px-12 py-4 rounded-full transform relative"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 500,
                  fontSize: '18px'
                }}
                whileHover={{ scale: 1.05 }}
              >
                VIEW MORE PROJECTS
              </motion.button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer fixedColor="#b9b2fd" onNavigateHome={onBack} />
    </div>
  )
}