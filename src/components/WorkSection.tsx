'use client'

import { motion } from 'motion/react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { Button } from './ui/button'
import { projects, type Project } from '../data/projects'

interface WorkSectionProps {
  onViewProject?: (projectId: number) => void
}

export function WorkSection({ onViewProject }: WorkSectionProps) {
  return (
    <section id="work" className="relative bg-black text-white overflow-hidden">
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

function ProjectItem({ project, index, totalProjects, isFirst, onViewProject }: ProjectItemProps) {
  
  return (
    <div className="relative h-screen">
      <motion.div
        className="sticky top-0 h-screen bg-black flex items-center"
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title for first project only */}
          {isFirst && (
            <motion.div
              className="mb-16 lg:mb-20"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h1
                className="text-white pt-16 lg:pt-24"
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
          
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${isFirst ? '' : ''}`}>
            
            {/* Image - Left Side - 70% width */}
            <motion.div
              className="relative order-1 lg:col-span-8"
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
                <div className="w-full aspect-[16/9] min-h-[400px] lg:min-h-[500px]">
                  {typeof project.image === 'string' ? (
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Content - Right Side - 30% width */}
            <motion.div
              className="space-y-6 order-2 lg:col-span-4"
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
                  className="text-white/60 text-xl lg:text-2xl"
                  style={{
                    fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                    fontWeight: 300
                  }}
                >
                  /{project.year}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                className="text-white"
                style={{
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontWeight: 500,
                  fontSize: 'clamp(32px, 6vw, 64px)',
                  lineHeight: 1.1
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {project.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-white/80 text-lg lg:text-xl leading-relaxed max-w-lg"
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
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 17,
                      duration: 0.2
                    }}
                  >
                    <Button
                      onClick={() => onViewProject(project.id)}
                      className="bg-white text-black hover:bg-white/90 hover:shadow-lg transition-all duration-300 px-8 py-3 rounded-full transform"
                      style={{
                        fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                        fontWeight: 500,
                        fontSize: '16px'
                      }}
                    >
                      View Project
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}