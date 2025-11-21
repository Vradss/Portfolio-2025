'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

export function MadridTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const madridTime = new Intl.DateTimeFormat('es-ES', {
        timeZone: 'Europe/Madrid',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(now)
      setTime(madridTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      className="absolute bottom-6 right-6 z-30 select-none pointer-events-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
      style={{ 
        fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif'
      }}
    >
      <div 
        className="text-black text-right tracking-wider"
        style={{ 
          fontWeight: 400,
          fontSize: '12px',
          letterSpacing: '0.1em'
        }}
      >
        <div>MADRID</div>
        <div>{time}</div>
      </div>
    </motion.div>
  )
}