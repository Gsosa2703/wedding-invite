'use client'

import { useEffect } from 'react'

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    let lenis: any

    const initLenis = async () => {
      const Lenis = (await import('lenis')).default
      
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        normalizeWheel: true,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    }

    initLenis()

    return () => {
      if (lenis) {
        lenis.destroy()
      }
    }
  }, [])

  return <>{children}</>
} 