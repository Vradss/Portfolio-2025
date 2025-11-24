'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { MadridTime } from './MadridTime'
import { MadeInPeru } from './MadeInPeru'
import { Navigation } from './Navigation'
import { useHeroState } from '../contexts/HeroStateContext'
import prideFlag from '@/assets/hero-images/pride-flag.png'
import avocadoImage from '@/assets/hero-images/avocado.png'
import llamaImage from '@/assets/hero-images/llama.png'
import rainbowImage from '@/assets/hero-images/rainbow.png'
import tarotImage from '@/assets/hero-images/tarot-cards.png'
import tamagotchiImage from '@/assets/hero-images/tamagotchi.png'
import retroComputerImage from '@/assets/hero-images/retro-computer.png'
import pointingHandImage from '@/assets/hero-images/pointing-hand.png'
import pepeMemeFaceImage from '@/assets/hero-images/pepe-meme.png'
import fluffyDogImage from '@/assets/hero-images/fluffy-dog.png'
import dogWithToyImage from '@/assets/hero-images/dog-with-toy.png'
import michaelScottImage from '@/assets/hero-images/michael-scott.png'
import consolaDJImage from '@/assets/hero-images/consolaDJ.png'
import potusImage from '@/assets/hero-images/potus.png'

const hoverImages = [
  {
    src: dogWithToyImage,
    alt: "Adorable Schnauzer dog with yellow toy - Entry 1",
    large: true
  },
  {
    src: fluffyDogImage,
    alt: "Fluffy dog jumping",
    large: true,
    extraLarge: true // 50% más grande que las otras imágenes
  },
  {
    src: retroComputerImage,
    alt: "Retro computer with hello world",
    large: true
  },
  {
    src: pointingHandImage,
    alt: "Pointing hand digital art",
    extraLarge: true
  },
  {
    src: pepeMemeFaceImage,
    alt: "Pepe the Frog meme face"
  },
  {
    src: fluffyDogImage,
    alt: "Fluffy dog jumping",
    large: true,
    extraLarge: true // 50% más grande que las otras imágenes
  },
  {
    src: prideFlag,
    alt: "Pride flag emoji"
  },
  {
    src: avocadoImage,
    alt: "Avocado",
    extraLarge: true
  },
  {
    src: llamaImage,
    alt: "Llama with sunglasses",
    large: true
  },
  {
    src: rainbowImage,
    alt: "Rainbow",
    large: true
  },
  {
    src: tarotImage,
    alt: "Tarot cards",
    large: true
  },
  {
    src: dogWithToyImage, 
    alt: "Adorable Schnauzer dog with yellow toy - Entry 2",
    large: true
  },
  {
    src: tamagotchiImage,
    alt: "Pink Tamagotchi with low battery"
  },
  {
    src: michaelScottImage,
    alt: "Michael Scott from The Office smiling",
    large: true
  },
  {
    src: consolaDJImage,
    alt: "DJ console mixer",
    extraLarge: true
  },
  {
    src: potusImage,
    alt: "Potus presidential seal",
    extraLarge: true
  }
]

interface FloatingImage {
  id: number
  image: typeof hoverImages[0]
  x: number
  y: number
  scale: number
  rotation: number
  timestamp: number
}

export function HeroSection() {
  const { clickState, setClickState, getCurrentColor, getCurrentText } = useHeroState()
  const [floatingImages, setFloatingImages] = useState<FloatingImage[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [textAnimationComplete, setTextAnimationComplete] = useState(false)
  const [transitionKey, setTransitionKey] = useState(0) // Force unique keys
  const imageCounter = useRef(0)
  const lastMouseMove = useRef(0)
  const infinityT = useRef(0) // Parámetro t para la curva de infinito

  const currentColor = getCurrentColor()

  // Función para generar posiciones en forma de infinito (lemniscata)
  const getInfinityPosition = (t: number) => {
    // Ecuación paramétrica de lemniscata (∞):
    // x = a * cos(t) / (1 + sin²(t))
    // y = a * sin(t) * cos(t) / (1 + sin²(t))
    const a = 35 // Amplitud del infinito (% del viewport)
    const denominator = 1 + Math.pow(Math.sin(t), 2)

    // Calcular x e y centrados en 50%
    const x = 50 + (a * Math.cos(t)) / denominator
    const y = 50 + (a * Math.sin(t) * Math.cos(t)) / denominator

    return { x, y }
  }

  // Trigger text animation completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setTextAnimationComplete(true)
    }, 1500) // 1.5 segundos para dar tiempo a la animación del texto

    return () => clearTimeout(timer)
  }, [])

  // Auto-generate floating images on mobile siguiendo patrón de infinito
  useEffect(() => {
    if (!textAnimationComplete || window.innerWidth >= 768) return

    const interval = setInterval(() => {
      const randomImage = hoverImages[Math.floor(Math.random() * hoverImages.length)]
      const now = Date.now()

      // Incrementar t para seguir la curva de infinito
      infinityT.current += 0.3 // Velocidad de recorrido del infinito
      const position = getInfinityPosition(infinityT.current)

      const newImage: FloatingImage = {
        id: imageCounter.current++,
        image: randomImage,
        x: position.x,
        y: position.y,
        scale: Math.random() * 0.5 + 0.5,
        rotation: Math.random() * 40 - 20,
        timestamp: now
      }

      setFloatingImages(prev => {
        const filtered = prev.filter(img => now - img.timestamp < 1500)
        // Mantener máximo 3 imágenes en mobile
        if (filtered.length >= 3) {
          return [...filtered.slice(1), newImage]
        }
        return [...filtered, newImage]
      })

      setTimeout(() => {
        setFloatingImages(prev => prev.filter(img => img.id !== newImage.id))
      }, 1500)
    }, 800) // Nueva imagen cada 800ms

    return () => clearInterval(interval)
  }, [textAnimationComplete])

  // Generate a single image on mouse move - posición del mouse (only on desktop)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!textAnimationComplete || window.innerWidth < 768) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePosition({ x, y })

    const now = Date.now()
    if (now - lastMouseMove.current > 80) { // 80ms para mayor separación entre imágenes
      lastMouseMove.current = now

      const randomImage = hoverImages[Math.floor(Math.random() * hoverImages.length)]
      const newImage: FloatingImage = {
        id: imageCounter.current++,
        image: randomImage,
        x: (e.clientX - rect.left) / rect.width * 100,
        y: (e.clientY - rect.top) / rect.height * 100,
        scale: Math.random() * 0.6 + 0.4,
        rotation: Math.random() * 40 - 20,
        timestamp: now
      }

      setFloatingImages(prev => {
        const filtered = prev.filter(img => now - img.timestamp < 1000)
        return [...filtered, newImage]
      })

      setTimeout(() => {
        setFloatingImages(prev => prev.filter(img => img.id !== newImage.id))
      }, 1000)
    }
  }

  const handleMouseLeave = () => {
    setFloatingImages([])
  }

  // Watch for clickState changes to update transition key
  useEffect(() => {
    setTransitionKey(prev => prev + 1) // Force new keys for all letters when state changes
  }, [clickState])

  const handleClick = () => {
    setClickState((prev) => (prev + 1) % 3) // Cycle through 3 states
    setTransitionKey(prev => prev + 1) // Force new keys for all letters
  }

  const { firstLine, secondLine } = getCurrentText()

  // Function to create letter animations with immediate timing for transitions
  const renderAnimatedWord = (word: string, lineIndex: number, isInitialLoad: boolean = false) => {
    return word.split('').map((letter, letterIndex) => {
      let delay = 0
      
      if (isInitialLoad) {
        const baseDelay = lineIndex === 0 ? 0.1 : 0.8
        delay = baseDelay + (letterIndex * 0.1)
      } else {
        delay = letterIndex * 0.05
      }
      
      return (
        <motion.span
          key={`${word}-${lineIndex}-${letterIndex}-${transitionKey}`}
          className="inline-block"
          style={{ color: '#212121' }}
          initial={{ opacity: 0, y: 50, rotateX: -90, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, rotateX: 90, scale: 0.5 }}
          transition={{ 
            delay: delay,
            duration: isInitialLoad ? 0.6 : 0.3,
            ease: [0.22, 1, 0.36, 1],
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      )
    })
  }



  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
      style={{
        minHeight: '100dvh',
        backgroundColor: 'transparent'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Main title - two lines with individual letter animations */}
      <motion.div 
        className="relative z-10 text-center"
        animate={{
          x: (mousePosition.x - 0.5) * -15,
          y: (mousePosition.y - 0.5) * -15
        }}
        transition={{ type: "spring", stiffness: 150, damping: 30 }}
      >
        <div className="flex flex-col items-center">
          {/* First line */}
          <div
            className="leading-none tracking-tighter text-[60px] sm:text-[80px] md:text-[120px] lg:text-[160px] xl:text-[180px]"
            style={{ 
              fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
              fontWeight: 700,
              color: '#212121'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div key={`first-line-${transitionKey}`} className="flex">
                {renderAnimatedWord(firstLine, 0, transitionKey === 0)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Second line */}
          <div
            className="leading-none tracking-tighter text-[60px] sm:text-[80px] md:text-[120px] lg:text-[160px] xl:text-[180px]"
            style={{ 
              fontFamily: 'Monument Grotesk, Space Grotesk, sans-serif',
              fontWeight: 700,
              color: '#212121'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div key={`second-line-${transitionKey}`} className="flex">
                {renderAnimatedWord(secondLine, 1, transitionKey === 0)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Floating images - ABOVE TEXT (Desktop + Mobile) */}
      <AnimatePresence>
        {floatingImages.map((item) => (
          <motion.div
            key={item.id}
            className="absolute pointer-events-none z-20"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
            initial={{
              opacity: 0,
              scale: 0,
              rotate: item.rotation,
              x: '-50%',
              y: '-50%'
            }}
            animate={{
              opacity: 0.9,
              scale: item.scale,
              rotate: item.rotation,
              x: window.innerWidth >= 768
                ? `calc(-50% + ${(mousePosition.x - 0.5) * 30}px)`
                : '-50%',
              y: window.innerWidth >= 768
                ? `calc(-50% + ${(mousePosition.y - 0.5) * 30}px)`
                : '-50%'
            }}
            exit={{
              opacity: 0,
              scale: 0,
              rotate: item.rotation
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            {typeof item.image.src === 'string' ? (
              <ImageWithFallback
                src={item.image.src}
                alt={item.image.alt}
                className={
                  item.image.extraLarge 
                    ? "w-60 h-60 md:w-96 md:h-96 object-contain" // 50% más grande que large (240px → 384px)
                    : item.image.large 
                      ? "w-40 h-40 md:w-60 md:h-60 object-contain" 
                      : "w-32 h-32 md:w-48 md:h-48 object-contain"
                }
              />
            ) : (
              <img
                src={item.image.src}
                alt={item.image.alt}
                className={
                  item.image.extraLarge 
                    ? "w-60 h-60 md:w-96 md:h-96 object-contain" // 50% más grande que large (240px → 384px)
                    : item.image.large 
                      ? "w-40 h-40 md:w-60 md:h-60 object-contain" 
                      : "w-32 h-32 md:w-48 md:h-48 object-contain"
                }
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Made In Peru - Bottom Left */}
      <MadeInPeru />

      {/* Madrid Time - Bottom Right */}
      <MadridTime />
    </section>
  )
}