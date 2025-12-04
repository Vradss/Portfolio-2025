'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface NavigationProps {
  isDark?: boolean
  onLogoClick?: () => void
}

export function Navigation({ isDark = false, onLogoClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'work', href: '#work-section' },
    { name: 'about', href: '#about-section' },
    { name: 'contact', href: '#footer' },
    { name: 'resume', href: '#', isDownload: true }
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleDownloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement('a')
    link.href = '/Resume - PM - DIC2025.pdf'
    link.download = 'Resume - PM - DIC2025.pdf' // Only filename, not path
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    closeMenu()
  }

  const handleLogoClick = () => {
    if (onLogoClick) {
      // If we're in a project detail page, use the onLogoClick callback
      onLogoClick()
    } else {
      // Otherwise, scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isDownload?: boolean) => {
    e.preventDefault()

    if (isDownload) {
      handleDownloadResume()
      return
    }

    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }

    closeMenu()
  }

  const textColor = isDark ? 'text-white' : 'text-black'
  const hoverColor = isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'
  const fillColor = isDark ? 'white' : 'black'

  return (
    <>
      <motion.nav 
        className="absolute top-0 left-0 right-0 z-30 p-4 md:p-6 pointer-events-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="flex justify-between items-center">
          {/* 1. Logo/Brand */}
          <motion.button
            onClick={handleLogoClick}
            className={`${textColor} font-medium tracking-wide cursor-pointer`}
            style={{
              fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
              fontSize: '16px'
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            VRADIS
          </motion.button>

          {/* 2. Desktop Navigation Links - Horizontal */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href, item.isDownload)}
                className={`${textColor} ${hoverColor} transition-colors cursor-pointer`}
                style={{ 
                  fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  letterSpacing: '0.05em'
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.2 + (index * 0.1)
                }}
                whileHover={{ y: -2 }}
              >
                {item.name.toUpperCase()}
              </motion.a>
            ))}
          </div>

          {/* 3. Social Icons - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="https://www.linkedin.com/in/vradisflorez/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${hoverColor} transition-colors cursor-pointer`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              whileHover={{ scale: 1.1 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>
            <motion.a
              href="https://github.com/vradss"
              target="_blank"
              rel="noopener noreferrer"
              className={`${hoverColor} transition-colors cursor-pointer`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 }}
              whileHover={{ scale: 1.1 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={`md:hidden ${textColor} z-60 relative`}
            onClick={toggleMenu}
            style={{ 
              fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
              fontSize: '16px'
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {isMenuOpen ? 'CLOSE' : 'MENU'}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            style={{ height: '100dvh' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href, item.isDownload)}
                  className="block text-white hover:text-gray-300 transition-colors mb-8 cursor-pointer"
                  style={{ 
                    fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                    fontSize: '48px',
                    fontWeight: 700
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1 + (index * 0.1)
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.name.toUpperCase()}
                </motion.a>
              ))}

              {/* Social Icons in Mobile Menu */}
              <motion.div
                className="flex justify-center gap-6 mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.a
                  href="https://www.linkedin.com/in/vradisflorez/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.a>
              </motion.div>
            </div>

            {/* Close button inside menu */}
            <motion.button
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white z-60"
              onClick={closeMenu}
              style={{ 
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontSize: '16px'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              CLOSE
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}