'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import HTML5Logo from '../imports/TechStackLogos'
import FigmaLogo from '../imports/TechStackLogos-192-216'
import JavaScriptLogo from '../imports/TechStackLogos-192-260'
import GitHubLogo from '../imports/TechStackLogos-192-294'
import GitLogo from '../imports/TechStackLogos-192-306'
import JiraLogo from '../imports/TechStackLogosJiraLight'
import ClaudeLogo from '../imports/ClaudeColor1'
import NodeLogo from '../imports/Icons8Nodejs1'
import NotionLogo from '../imports/Notion1-207-37'
import MakeLogo from '../imports/MakeLogo1-272-22'
import N8NLogo from '../imports/N8NColor1-272-37'
import CLogo from '../imports/C1-276-22'
import LinuxLogo from '../imports/Linux1'
import NextJsLogo from '../imports/NextJs1'
import ReactImage from '@/assets/skills/react-logo.png'
import BrainLight from '../imports/BrainLight'
import CodeLight from '../imports/CodeLight'
import CircuitryLight from '../imports/CircuitryLight'
import PuzzlePieceLight from '../imports/PuzzlePieceLight'

// Imported Tech Logo Components with rounded rectangle container for marquee (sin sombras)
const TechLogos = {
  JavaScript: () => (
    <div className="w-20 h-20 p-3 bg-white rounded-2xl transition-all duration-300 hover:scale-105">
      <JavaScriptLogo />
    </div>
  ),
  HTML5: () => (
    <div className="w-20 h-20 p-3 bg-white rounded-2xl transition-all duration-300 hover:scale-105">
      <HTML5Logo />
    </div>
  ),
  React: () => (
    <div className="w-20 h-20 p-3 bg-white rounded-2xl transition-all duration-300 hover:scale-105">
      <img 
        src={ReactImage} 
        alt="React" 
        className="w-full h-full object-contain"
      />
    </div>
  ),
  Figma: () => (
    <div className="w-20 h-20 p-3 bg-white rounded-2xl transition-all duration-300 hover:scale-105">
      <FigmaLogo />
    </div>
  ),
  GitHub: () => (
    <div className="w-20 h-20 p-3 bg-white rounded-2xl transition-all duration-300 hover:scale-105">
      <GitHubLogo />
    </div>
  ),
  Git: () => (
    <div className="w-20 h-20 p-3 bg-white rounded-2xl transition-all duration-300 hover:scale-105">
      <GitLogo />
    </div>
  ),
  Jira: () => (
    <div className="w-20 h-20 p-3 bg-white rounded-2xl transition-all duration-300 hover:scale-105">
      <JiraLogo />
    </div>
  ),
  Claude: () => (
    <div className="w-20 h-20 p-3 bg-white rounded-2xl transition-all duration-300 hover:scale-105">
      <ClaudeLogo />
    </div>
  ),
  NodeJS: () => (
    <div className="w-20 h-20 p-3 bg-white rounded-2xl transition-all duration-300 hover:scale-105">
      <NodeLogo />
    </div>
  ),
  Notion: () => (
    <div className="w-20 h-20 p-3 bg-white rounded-2xl transition-all duration-300 hover:scale-105">
      <NotionLogo />
    </div>
  ),
  Make: () => (
    <div className="w-20 h-20 p-3 bg-white rounded-2xl transition-all duration-300 hover:scale-105">
      <MakeLogo />
    </div>
  ),
  N8N: () => (
    <div className="w-20 h-20 p-3 bg-white rounded-2xl transition-all duration-300 hover:scale-105">
      <N8NLogo />
    </div>
  ),
  C: () => (
    <div className="w-20 h-20 p-3 bg-white rounded-2xl transition-all duration-300 hover:scale-105">
      <CLogo />
    </div>
  ),
  Linux: () => (
    <div className="w-20 h-20 p-3 bg-white rounded-2xl transition-all duration-300 hover:scale-105">
      <LinuxLogo />
    </div>
  ),
  NextJS: () => (
    <div className="w-20 h-20 p-3 bg-white rounded-2xl transition-all duration-300 hover:scale-105">
      <NextJsLogo />
    </div>
  ),
}

// Marquee Row Component
function MarqueeRow({ logos, direction = 'left', speed = 20 }: {
  logos: string[],
  direction?: 'left' | 'right',
  speed?: number
}) {
  // Duplicate logos array for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos]
  
  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex gap-6 w-max"
        initial={{ x: direction === 'left' ? '0%' : '-66.666%' }}
        animate={{ 
          x: direction === 'left' ? '-66.666%' : '0%'
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedLogos.map((tech, index) => {
          const TechComponent = TechLogos[tech as keyof typeof TechLogos]
          return (
            <div key={`${tech}-${index}`} className="flex-shrink-0">
              <TechComponent />
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const skills = [
    {
      emoji: "🧠",
      title: "Product Thinking",
      description: "Discovery, research, positioning, go-to-market strategy"
    },
    {
      emoji: "⚡",
      title: "Technical Execution",
      description: "Prototyping (React, Python), AI integrations, hands-on validation"
    },
    {
      emoji: "🤖",
      title: "AI Product Development",
      description: "LLM workflows (Claude, GPT), n8n, automation for product efficiency"
    },
    {
      emoji: "📊",
      title: "Data-Driven Decisions",
      description: "User research, A/B testing, product analytics"
    }
  ]

  // Tech logos organized in 1 row for marquee
  const allLogos = ['JavaScript', 'HTML5', 'React', 'Notion', 'Figma', 'GitHub', 'Claude', 'Git', 'Jira', 'Make', 'N8N', 'C', 'Linux', 'NextJS', 'NodeJS']

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-20 md:pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        backgroundColor: 'white'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-20"
        >
          <h2
            className="mb-6"
            style={{
              fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(48px, 8vw, 100px)',
              lineHeight: 0.9,
              color: '#212121'
            }}
          >
            SKILLS
          </h2>
        </motion.div>

        {/* Skills Grid - Horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {skills.map((skill, index) => {
            // Seleccionar el icono apropiado según el título
            let IconComponent = null
            if (skill.title === "Product Thinking") {
              IconComponent = BrainLight
            } else if (skill.title === "Technical Execution") {
              IconComponent = CodeLight
            } else if (skill.title === "AI Product Development") {
              IconComponent = CircuitryLight
            } else if (skill.title === "Data-Driven Decisions") {
              IconComponent = PuzzlePieceLight
            }

            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mb-4 flex justify-center">
                  {IconComponent ? (
                    <motion.div 
                      className="w-12 h-12"
                      whileHover={{ 
                        y: -4,
                        transition: { duration: 0.2 }
                      }}
                      style={{
                        color: '#212121'
                      }}
                    >
                      <motion.div
                        whileHover={{
                          color: '#ddd9fe'
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <IconComponent />
                      </motion.div>
                    </motion.div>
                  ) : (
                    <div style={{ fontSize: '48px' }}>
                      {skill.emoji}
                    </div>
                  )}
                </div>
                <h3 
                  className="text-black mb-3"
                  style={{ 
                    fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                    fontWeight: 600,
                    fontSize: 'clamp(16px, 2vw, 20px)',
                    lineHeight: 1.2
                  }}
                >
                  {skill.title}
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontSize: '14px' }}>
                  {skill.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Tech Logos Marquee - Full Width - Single Row */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <MarqueeRow 
              logos={allLogos} 
              direction="left" 
              speed={40}
            />
          </motion.div>
          
          {/* Background gradient overlay for smooth fade effect */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  )
}