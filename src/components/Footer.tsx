'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useHeroState } from '../contexts/HeroStateContext'

interface FooterProps {
  fixedColor?: string // Optional prop for fixed background color
  onNavigateHome?: () => void // Optional callback to navigate home
}

export function Footer({ fixedColor, onNavigateHome }: FooterProps = {}) {
  const { getCurrentColor, clickState } = useHeroState()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start bottom", "end end"]
  })

  // Get current hero color or use fixed color if provided
  const currentHeroColor = fixedColor || getCurrentColor()

  // Create opacity transform for color transition
  const heroColorOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0, 1, 1] // Fade in hero color when footer is visible
  )

  const handleWorkClick = () => {
    const workSection = document.getElementById('work-section')
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' })
    } else if (onNavigateHome) {
      onNavigateHome()
      setTimeout(() => {
        document.getElementById('work-section')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const handleAboutClick = () => {
    const aboutSection = document.getElementById('about-section')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    } else if (onNavigateHome) {
      onNavigateHome()
      setTimeout(() => {
        document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const handleContactClick = () => {
    window.location.href = 'mailto:hello@vradis.dev?subject=Let\'s work together!'
  }

  const handleResumeClick = () => {
    // Download resume PDF
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'VRADIS_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleLinkedInClick = () => {
    window.open('https://linkedin.com/in/vradis', '_blank')
  }

  const handleLetsTalkClick = () => {
    window.location.href = 'mailto:hello@vradis.dev?subject=Let\'s work together!'
  }

  return (
    <motion.footer 
      id="footer"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 py-16 overflow-hidden"
      style={{ backgroundColor: fixedColor || "#ffffff" }} // Use fixed color or start with white
      animate={!fixedColor ? { 
        backgroundColor: currentHeroColor // Animate to current hero color only if no fixed color
      } : undefined}
      transition={!fixedColor ? { 
        backgroundColor: { 
          duration: 1.5, 
          ease: [0.22, 1, 0.36, 1] 
        } 
      } : undefined}
    >
      {/* Main LET'S TALK Section - Takes most of the space */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          className="text-center cursor-pointer"
          onClick={handleLetsTalkClick}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h1 
            className="text-[clamp(4rem,20vw,24rem)] leading-none tracking-tighter font-bold select-none"
            style={{ 
              fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
              fontWeight: 700,
              color: '#212121'
            }}
            whileHover={{ 
              textShadow: "0 0 20px rgba(0,0,0,0.1)",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
            }}
          >
            LET'S TALK
          </motion.h1>
        </motion.div>
      </div>

      {/* Bottom Section - Copyright Left, Navigation Right */}
      <motion.div 
        className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-400/30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* Copyright - Left Side */}
        <motion.div
          className="order-2 sm:order-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p 
            className="text-sm sm:text-base tracking-wider"
            style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              color: '#212121'
            }}
          >
            © 2025 ALL RIGHTS RESERVED
          </p>
        </motion.div>

        {/* Navigation Links - Right Side */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 order-1 sm:order-2"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={handleWorkClick}
            className="text-base sm:text-lg tracking-wide hover:scale-105 transition-all duration-200"
            style={{ 
              fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
              fontWeight: 600,
              color: '#212121'
            }}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            WORK
          </motion.button>

          <motion.button
            onClick={handleAboutClick}
            className="text-base sm:text-lg tracking-wide hover:scale-105 transition-all duration-200"
            style={{ 
              fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
              fontWeight: 600,
              color: '#212121'
            }}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ABOUT
          </motion.button>

          <motion.button
            onClick={handleContactClick}
            className="text-base sm:text-lg tracking-wide hover:scale-105 transition-all duration-200"
            style={{ 
              fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
              fontWeight: 600,
              color: '#212121'
            }}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            CONTACT
          </motion.button>

          <motion.button
            onClick={handleResumeClick}
            className="text-base sm:text-lg tracking-wide hover:scale-105 transition-all duration-200"
            style={{ 
              fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
              fontWeight: 600,
              color: '#212121'
            }}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            RESUME
          </motion.button>

          <motion.button
            onClick={handleLinkedInClick}
            className="text-base sm:text-lg tracking-wide hover:scale-105 transition-all duration-200"
            style={{ 
              fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
              fontWeight: 600,
              color: '#212121'
            }}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            LINKEDIN
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>
    </motion.footer>
  )
}