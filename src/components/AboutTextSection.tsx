'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export function AboutTextSection() {
  const [rotatingWord, setRotatingWord] = useState(0)

  const rotatingWords = ['builder', 'coder', 'maker']

  // Hook para rotar las palabras cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingWord((prev) => (prev + 1) % rotatingWords.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="about"
      className="relative px-4 sm:px-6 lg:px-8 min-h-[80vh] md:min-h-[80vh] flex items-center justify-center pt-32 md:pt-40 pb-32 md:pb-80 z-10"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="relative flex flex-col items-start justify-center gap-6 max-w-6xl w-full"> 
        {/* Texto completo con palabra rotando */}
        <motion.div
          className="text-black text-left leading-relaxed space-y-6"
          style={{
            fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(24px, 8vw, 40px) !important',
            lineHeight: 1.6,
            textTransform: 'uppercase'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <p style={{ fontSize: "40px" , fontFamily: 'Monument Grotesk', fontWeight: 500 }}>
            I'm a Product Manager becoming a{' '}
            <span
              className="inline-block"
              style={{
                minWidth: '140px',
                textAlign: 'left',
                color: '#6366f1' // Color accent para la palabra rotando
              }}
            >
              <span
                key={rotatingWord}
                style={{
                  animation: 'fadeInOut 2s ease-in-out',
                  display: 'inline-block'
                }}
              >
                {rotatingWords[rotatingWord]}
              </span>
            </span>
          </p>
        </motion.div>

        {/* Párrafos descriptivos */}
        <motion.div
          className="text-black text-left leading-relaxed space-y-6"
          style={{
            fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(24px, 8vw, 40px) !important',
            lineHeight: 1.6,
            textTransform: 'uppercase'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <p style={{ fontSize: "40px", fontWeight: 500 }}>
            I started in product strategy and UX, now I'm learning to code (42 Madrid) and automate with AI (n8n, Python, LLMs). I don't want to just spec products—I want to prototype them, validate them, and ship them myself.
          </p>
        </motion.div>

        <motion.div
          className="text-black text-left leading-relaxed"
          style={{
            fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(24px, 8vw, 40px) !important',
            lineHeight: 1.6,
            textTransform: 'uppercase'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
        >
        </motion.div>
      </div>

      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-10px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(10px); }
          }
        `}
      </style>
    </section> 
  )
}
