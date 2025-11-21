'use client'

import { motion } from 'motion/react'

export function MadeInPeru() {
  return (
    <motion.div 
      className="absolute bottom-6 left-6 z-30 select-none pointer-events-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1, ease: "easeOut" }}
    >
      <div 
        className="text-black tracking-wider"
        style={{ 
          fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
          fontWeight: 400,
          fontSize: '12px',
          letterSpacing: '0.1em'
        }}
      >
        MADE IN PERU
      </div>
    </motion.div>
  )
}