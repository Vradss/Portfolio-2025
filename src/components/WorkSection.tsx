'use client'

import React, { memo, useCallback, useMemo } from 'react'
import { motion } from 'motion/react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { Button } from './ui/button'
import { projects, type Project } from '../data/projects'

interface WorkSectionProps {
  onViewProject?: (projectId: number) => void
}

export function WorkSection({ onViewProject }: WorkSectionProps) {
  return (
    <section id="work" className="relative bg-black text-white overflow-hidden pt-20 md:pt-32 lg:pt-40">
      {/* Projects Stack Container */}
      <div className="relative">
        {projects.map((project, index) => (
          <ProjectItem 
            key={project.id} 
            project={project} 
            index={index}
            totalProjects={projects.length}
            isFirst={index === 0}
            onViewProject={onViewProject}
          />
        ))}
      </div>
    </section>
  )
}

interface ProjectItemProps {
  project: Project
  index: number
  totalProjects: number
  isFirst?: boolean
  onViewProject?: (projectId: number) => void
}

const ProjectItem = memo(function ProjectItem({ project, index, totalProjects, isFirst, onViewProject }: ProjectItemProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  const handleViewProject = useCallback(() => {
    onViewProject?.(project.id)
  }, [onViewProject, project.id])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  // Memoizar estilos comunes
  const titleStyle = useMemo(() => ({
    fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
    fontWeight: 500,
    fontSize: 'clamp(32px, 6vw, 64px)',
    lineHeight: 1.1
  }), [])

  return (
    <div className="relative h-screen">
      <motion.div
        className="sticky top-0 h-screen flex items-center"
        style={{
          zIndex: totalProjects - index
        }}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 1, 
          ease: [0.22, 1, 0.36, 1]
        }}
        viewport={{ once: true, margin: "-20%" }}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          {/* Title for first project only */}
          {isFirst && (
            <motion.div
              className="mb-12 md:mb-16 lg:mb-20"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h1
                className="text-white"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(40px, 8vw, 80px)',
                  lineHeight: 0.9,
                  textAlign: 'left'
                }}
              >
                FEATURED PROJECTS
              </h1>
            </motion.div>
          )}

          <div className={`grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 md:gap-8 lg:gap-12 items-center ${isFirst ? '' : 'pt-12 md:pt-16 lg:pt-20'}`}>

            {/* Image - Left Side - 70% width */}
            <motion.div
              className="relative order-1"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 1, 
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                className="relative w-full"
                layoutId={`project-image-${project.id}`}
              >
                <div className="w-full bg-black/5 rounded-lg overflow-hidden">
                  {typeof project.image === 'string' ? (
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto object-contain rounded-lg"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Content - Right Side - 30% width */}
            <motion.div
              className="space-y-6 order-2"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 1, 
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Year - Top Right */}
              <motion.div
                className="text-right"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <span
                  className="text-white/60"
                  style={{
                    fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                    fontWeight: 300,
                    fontSize: '18px'
                  }}
                >
                  /{project.industry}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                className="text-white"
                style={titleStyle}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {project.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-white/80 leading-relaxed max-w-lg"
                style={{
                  fontSize: '18px'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
              >
                {project.description}
              </motion.p>

              {/* Details CTA */}
              {project.details && onViewProject && (
                <motion.div
                  className="pt-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.75 }}
                  viewport={{ once: true }}
                >
                  <Button
                    onClick={handleViewProject}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="bg-white text-black hover:bg-white/90 hover:shadow-lg hover:scale-105 transition-all duration-300 px-8 py-3 rounded-full transform relative"
                    style={{
                      fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                      fontWeight: 500,
                      fontSize: '16px'
                    }}
                  >
                    <span className="inline-flex items-center gap-2">
                      View Project
                      <motion.span
                        initial={{ x: -10, opacity: 0 }}
                        animate={{
                          x: isHovered ? 0 : -10,
                          opacity: isHovered ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="inline-block"
                      >
                        →
                      </motion.span>
                    </span>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}, (prevProps, nextProps) => {
  // Comparación personalizada para evitar re-renders innecesarios
  return (
    prevProps.project.id === nextProps.project.id &&
    prevProps.index === nextProps.index &&
    prevProps.isFirst === nextProps.isFirst
  )
})