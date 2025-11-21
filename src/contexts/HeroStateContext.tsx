'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface HeroStateContextType {
  clickState: number // 0: BORN VRADIS, 1: BORN CURIOUS, 2: BORN TO INNOVATE
  setClickState: (state: number | ((prev: number) => number)) => void
  getCurrentColor: () => string
  getCurrentText: () => { firstLine: string; secondLine: string }
}

const HeroStateContext = createContext<HeroStateContextType | undefined>(undefined)

export function HeroStateProvider({ children }: { children: ReactNode }) {
  const [clickState, setClickState] = useState(0)

  // Auto-change state every 8 seconds - centralized logic
  useEffect(() => {
    const interval = setInterval(() => {
      setClickState((prev) => (prev + 1) % 3) // Cycle through 3 states
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getCurrentColor = () => {
    switch (clickState) {
      case 0:
        return "#b9b2fd" // BORN VRADIS - Purple
      case 1:
        return "#efff82" // BORN CURIOUS - Yellow
      case 2:
        return "#ff8743" // BORN TO INNOVATE - Orange
      default:
        return "#b9b2fd"
    }
  }

  const getCurrentText = () => {
    switch (clickState) {
      case 0:
        return { firstLine: "BORN", secondLine: "VRADIS" }
      case 1:
        return { firstLine: "BORN", secondLine: "CURIOUS" }
      case 2:
        return { firstLine: "BORN TO", secondLine: "INNOVATE" }
      default:
        return { firstLine: "BORN", secondLine: "VRADIS" }
    }
  }

  return (
    <HeroStateContext.Provider value={{
      clickState,
      setClickState,
      getCurrentColor,
      getCurrentText
    }}>
      {children}
    </HeroStateContext.Provider>
  )
}

export function useHeroState() {
  const context = useContext(HeroStateContext)
  if (context === undefined) {
    throw new Error('useHeroState must be used within a HeroStateProvider')
  }
  return context
}