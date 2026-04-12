// hooks/responsive.js
import { useRef, useEffect } from 'react'

export function useScrollReveal(animationClass) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        ref.current.classList.add(animationClass)
      }
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return ref
}