'use client'

import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

export function AboutTextSection() {
  const { t } = useTranslation()

  return (
    <section
      id="about"
      className="relative px-4 sm:px-6 lg:px-8 min-h-[80vh] md:min-h-[80vh] flex items-center justify-center pt-20 sm:pt-32 md:pt-40 pb-20 sm:pb-32 md:pb-80 z-10"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="relative flex flex-col items-start justify-center gap-4 sm:gap-6 max-w-5xl w-full"> 
        {/* Greeting */}
        <motion.div
          className="text-black text-left leading-relaxed"
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
          <p className="text-lg sm:text-2xl md:text-3xl lg:text-[40px] font-medium whitespace-normal" style={{ fontFamily: 'Monument Grotesk', whiteSpace: 'normal', wordSpacing: 'normal' }}>
            {t('about.greeting')}
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
            {t('about.paragraph1')}
          </p>
          <p 
            className="text-base sm:text-lg md:text-2xl lg:text-[24px] font-medium leading-tight sm:leading-normal md:leading-relaxed whitespace-normal"
            style={{ whiteSpace: 'normal', wordSpacing: 'normal' }}
          >
            {t('about.paragraph2')}
          </p>
          <p 
            className="text-base sm:text-lg md:text-2xl lg:text-[24px] font-medium leading-tight sm:leading-normal md:leading-relaxed whitespace-normal"
            style={{ whiteSpace: 'normal', wordSpacing: 'normal' }}
          >
            {t('about.paragraph3')}
          </p>
        </motion.div>
      </div>
    </section> 
  )
}
