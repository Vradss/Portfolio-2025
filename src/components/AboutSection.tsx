'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import profileImage from '@/assets/about-section/profile-photo.png'
import workingImage from '@/assets/about-section/working-at-desk.png'
import mountainImage from '@/assets/about-section/mountain-landscape.png'
import newSunsetImage from '@/assets/about-section/sunset-view.png'

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Animation progress for images expansion
  const imageProgress = useTransform(scrollYProgress, [0, 1], [0, 1])
  
  // Top Left (Profile Image) - starts at center, expands to top-left
  const profileX = useTransform(imageProgress, [0, 1], ['0vw', '-35vw'])
  const profileY = useTransform(imageProgress, [0, 1], ['0vh', '-30vh'])
  const profileRotate = useTransform(imageProgress, [0, 1], [0, -15])
  
  // Top Right (Mountain Image) - starts at center, expands to top-right  
  const mountainX = useTransform(imageProgress, [0, 1], ['0vw', '35vw'])
  const mountainY = useTransform(imageProgress, [0, 1], ['0vh', '-30vh'])
  const mountainRotate = useTransform(imageProgress, [0, 1], [0, 12])
  
  // Bottom Left (Working Image) - starts at center, expands to bottom-left
  const workingX = useTransform(imageProgress, [0, 1], ['0vw', '-35vw'])
  const workingY = useTransform(imageProgress, [0, 1], ['0vh', '30vh'])
  const workingRotate = useTransform(imageProgress, [0, 1], [0, 18])
  
  // Bottom Right (Sunset Image) - starts at center, expands to bottom-right
  const sunsetX = useTransform(imageProgress, [0, 1], ['0vw', '35vw'])
  const sunsetY = useTransform(imageProgress, [0, 1], ['0vh', '30vh'])
  const sunsetRotate = useTransform(imageProgress, [0, 1], [0, -10])

  // Scale and opacity for images - start visible and stacked
  const imageScale = useTransform(imageProgress, [0, 1], [0.7, 1])
  const imageOpacity = useTransform(imageProgress, [0, 0.1], [1, 1])
  
  // Initial stacking positions - slight offsets to create visible stack effect
  const profileInitialX = useTransform(imageProgress, [0, 1], ['-15px', '-35vw'])
  const profileInitialY = useTransform(imageProgress, [0, 1], ['-20px', '-30vh'])
  const profileInitialRotate = useTransform(imageProgress, [0, 1], [-8, -15])
  
  const mountainInitialX = useTransform(imageProgress, [0, 1], ['20px', '35vw'])
  const mountainInitialY = useTransform(imageProgress, [0, 1], ['-15px', '-30vh'])
  const mountainInitialRotate = useTransform(imageProgress, [0, 1], [6, 12])
  
  const workingInitialX = useTransform(imageProgress, [0, 1], ['-10px', '-35vw'])
  const workingInitialY = useTransform(imageProgress, [0, 1], ['25px', '30vh'])
  const workingInitialRotate = useTransform(imageProgress, [0, 1], [12, 18])
  
  const sunsetInitialX = useTransform(imageProgress, [0, 1], ['15px', '35vw'])
  const sunsetInitialY = useTransform(imageProgress, [0, 1], ['10px', '30vh'])
  const sunsetInitialRotate = useTransform(imageProgress, [0, 1], [-5, -10])

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ height: '200vh' }} // Double height for scroll space
    >
      <div className="sticky top-0 h-screen">
        <section 
          id="about"
          className="relative flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 bg-white h-full"
        >
          {/* Centered Text */}
          <motion.div
            className="relative z-30 flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p 
              className="text-black text-center leading-relaxed max-w-2xl sm:max-w-3xl lg:max-w-6xl mx-auto px-4 sm:px-8 lg:px-16"
              style={{ 
                fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(24px, 4vw, 42px)',
                lineHeight: 1.1
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              I am a Peruvian Digital Product Manager based in Madrid who transforms complex ideas into scalable solutions that create lasting value for users & businesses.
            </motion.p>
          </motion.div>

          {/* Four Images - Starting from center, expanding to corners with rotation */}
          
          {/* Profile Image - Top Left (AGRANDADA) - starts visible in stack */}
          <motion.div
            className="absolute left-1/2 top-1/2 w-64 lg:w-[350px] h-auto z-20 pointer-events-none hidden md:block"
            style={{
              x: profileInitialX,
              y: profileInitialY,
              rotate: profileInitialRotate,
              scale: imageScale,
              opacity: imageOpacity,
              transformOrigin: 'center center'
            }}
          >
            <img
              src={profileImage}
              alt="Digital Product Manager working on laptop with code"
              className="w-full h-auto object-cover rounded-2xl shadow-2xl -translate-x-1/2 -translate-y-1/2"
            />
          </motion.div>

          {/* Mountain Image - Top Right - starts visible in stack */}
          <motion.div
            className="absolute left-1/2 top-1/2 w-56 lg:w-72 h-auto z-19 pointer-events-none hidden md:block"
            style={{
              x: mountainInitialX,
              y: mountainInitialY,
              rotate: mountainInitialRotate,
              scale: imageScale,
              opacity: imageOpacity,
              transformOrigin: 'center center'
            }}
          >
            <img
              src={mountainImage}
              alt="Woman with sunglasses by the lake and mountains"
              className="w-full h-auto object-cover rounded-2xl shadow-2xl -translate-x-1/2 -translate-y-1/2"
            />
          </motion.div>

          {/* Working Image - Bottom Left (AGRANDADA) - starts visible in stack */}
          <motion.div
            className="absolute left-1/2 top-1/2 w-64 lg:w-[350px] h-auto z-18 pointer-events-none hidden md:block"
            style={{
              x: workingInitialX,
              y: workingInitialY,
              rotate: workingInitialRotate,
              scale: imageScale,
              opacity: imageOpacity,
              transformOrigin: 'center center'
            }}
          >
            <img
              src={workingImage}
              alt="Working on laptop in office"
              className="w-full h-auto object-cover rounded-2xl shadow-2xl -translate-x-1/2 -translate-y-1/2"
            />
          </motion.div>

          {/* Sunset Image - Bottom Right (REDUCIDA) - starts visible in stack */}
          <motion.div
            className="absolute left-1/2 top-1/2 w-44 lg:w-[250px] 6 h-auto z-17 pointer-events-none hidden md:block"
            style={{
              x: sunsetInitialX,
              y: sunsetInitialY,
              rotate: sunsetInitialRotate,
              scale: imageScale,
              opacity: imageOpacity,
              transformOrigin: 'center center'
            }}
          >
            <img
              src={newSunsetImage}
              alt="Woman enjoying sunset view from balcony overlooking city"
              className="w-full h-auto object-cover rounded-2xl shadow-2xl -translate-x-1/2 -translate-y-1/2"
            />
          </motion.div>

          {/* Mobile & Tablet Images - Start visible in stack, expand to corners */}
          <motion.div
            className="absolute left-1/2 top-1/2 w-36 sm:w-44 h-auto z-20 pointer-events-none md:hidden"
            style={{ 
              x: useTransform(imageProgress, [0, 1], ['-10px', '-40vw']),
              y: useTransform(imageProgress, [0, 1], ['-15px', '-35vh']),
              rotate: useTransform(imageProgress, [0, 1], [-6, -10]),
              scale: useTransform(imageProgress, [0, 1], [0.6, 1]),
              opacity: imageOpacity,
              transformOrigin: 'center center'
            }}
          >
            <img
              src={profileImage}
              alt="Digital Product Manager"
              className="w-full h-auto object-cover rounded-lg shadow-md -translate-x-1/2 -translate-y-1/2"
            />
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-1/2 w-32 sm:w-40 h-auto z-19 pointer-events-none md:hidden"
            style={{ 
              x: useTransform(imageProgress, [0, 1], ['15px', '40vw']),
              y: useTransform(imageProgress, [0, 1], ['-10px', '-35vh']),
              rotate: useTransform(imageProgress, [0, 1], [4, 8]),
              scale: useTransform(imageProgress, [0, 1], [0.6, 1]),
              opacity: imageOpacity,
              transformOrigin: 'center center'
            }}
          >
            <img
              src={mountainImage}
              alt="Mountain landscape"
              className="w-full h-auto object-cover rounded-lg shadow-md -translate-x-1/2 -translate-y-1/2"
            />
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-1/2 w-36 sm:w-44 h-auto z-18 pointer-events-none md:hidden"
            style={{ 
              x: useTransform(imageProgress, [0, 1], ['-5px', '-40vw']),
              y: useTransform(imageProgress, [0, 1], ['20px', '35vh']),
              rotate: useTransform(imageProgress, [0, 1], [8, 12]),
              scale: useTransform(imageProgress, [0, 1], [0.6, 1]),
              opacity: imageOpacity,
              transformOrigin: 'center center'
            }}
          >
            <img
              src={workingImage}
              alt="Working on laptop"
              className="w-full h-auto object-cover rounded-lg shadow-md -translate-x-1/2 -translate-y-1/2"
            />
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-1/2 w-28 sm:w-34 h-auto z-17 pointer-events-none md:hidden"
            style={{ 
              x: useTransform(imageProgress, [0, 1], ['10px', '40vw']),
              y: useTransform(imageProgress, [0, 1], ['8px', '35vh']),
              rotate: useTransform(imageProgress, [0, 1], [-3, -6]),
              scale: useTransform(imageProgress, [0, 1], [0.6, 1]),
              opacity: imageOpacity,
              transformOrigin: 'center center'
            }}
          >
            <img
              src={newSunsetImage}
              alt="Woman enjoying sunset from balcony"
              className="w-full h-auto object-cover rounded-lg shadow-lg -translate-x-1/2 -translate-y-1/2"
            />
          </motion.div>

          {/* Subtle grain texture overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none z-5">
            <div className="w-full h-full" style={{ 
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }} />
          </div>
        </section>
      </div>
    </div>
  )
}