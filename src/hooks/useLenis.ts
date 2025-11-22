import { useEffect } from 'react'

let lenisInstance: any = null

export function useLenis() {
  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default

      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 2
      })

      function raf(time: number) {
        lenisInstance.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    }

    initLenis()

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy()
        lenisInstance = null
      }
    }
  }, [])
}

// Export function to get Lenis instance
export function getLenis() {
  return lenisInstance
}