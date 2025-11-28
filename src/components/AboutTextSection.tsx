'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export function AboutTextSection() {
  const [rotatingWord, setRotatingWord] = useState(0)

  const rotatingWords = ['design', 'code', 'ships products end-to-end']

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
      className="relative px-4 sm:px-6 lg:px-8 min-h-[80vh] md:min-h-[80vh] flex items-center justify-center pt-20 sm:pt-32 md:pt-40 pb-20 sm:pb-32 md:pb-80 z-10"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="relative flex flex-col items-start justify-center gap-4 sm:gap-6 max-w-6xl w-full"> 
        {/* Texto completo con palabra rotando */}
        <motion.div
          className="text-black text-left leading-relaxed space-y-6"
          style={{
            fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
            fontWeight: 500,
            lineHeight: 1.6,
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <p className="text-lg sm:text-2xl md:text-3xl lg:text-[36px] font-medium whitespace-normal" style={{ fontFamily: 'Monument Grotesk', whiteSpace: 'normal', wordSpacing: 'normal' }}>
            Hey! I'm Vradis - a Product Manager with the ability to{' '}
            <span
              className="inline-block min-w-[80px] sm:min-w-[100px] md:min-w-[140px] text-left"
              style={{
                color: '#6366f1' // Color accent para la palabra rotando
              }}
            >
              <span
                key={rotatingWord}
                className="inline-block"
                style={{
                  animation: 'fadeInOut 2s ease-in-out'
                }}
              >
                {rotatingWords[rotatingWord]}
              </span>
            </span>
          </p>
        </motion.div>

        {/* Párrafos descriptivos */}
        <motion.div
          className="text-black text-left leading-relaxed space-y-6 whitespace-normal"
          style={{
            fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
            fontWeight: 500,
            lineHeight: 1.6,
            whiteSpace: 'normal',
            wordSpacing: 'normal',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <p 
            className="text-base sm:text-lg md:text-2xl lg:text-[24px] font-medium leading-tight sm:leading-normal md:leading-relaxed whitespace-normal"
            style={{ whiteSpace: 'normal', wordSpacing: 'normal' }}
          >
            I'm expanding my craft into AI engineering — programming, automation, agents, and full-stack prototyping.
          </p>
          <p 
            className="text-base sm:text-lg md:text-2xl lg:text-[24px] font-medium leading-tight sm:leading-normal md:leading-relaxed whitespace-normal"
            style={{ whiteSpace: 'normal', wordSpacing: 'normal' }}
          >
            I don't just define products; I prototype them, test them, and automate them myself. <br />Today I work at the intersection of AI, product strategy, UX, and coding — designing solutions end-to-end, from problem definition to working prototypes.
          </p>
        </motion.div>

        <motion.div
          className="text-black text-left leading-relaxed"
          style={{
            fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
            fontWeight: 500,
            lineHeight: 1.6,
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
