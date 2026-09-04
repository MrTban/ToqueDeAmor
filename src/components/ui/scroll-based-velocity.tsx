import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Scroll Based Velocity — banda de texto en loop infinito cuya velocidad
 * reacciona a qué tan rápido estás scrolleando la página. Basado en el
 * componente de Magic UI (magicui.design), reconstruido acá para no
 * depender del CLI de shadcn.
 *
 * Uso:
 *   <ScrollVelocityContainer>
 *     <ScrollVelocityRow baseVelocity={3} direction={1}>Texto</ScrollVelocityRow>
 *   </ScrollVelocityContainer>
 */

interface ScrollVelocityRowProps {
  children: React.ReactNode
  baseVelocity?: number
  direction?: 1 | -1
  scrollReactivity?: boolean
  className?: string
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

const ScrollVelocityContext = React.createContext<MotionValue<number> | null>(null)

export function ScrollVelocityContainer({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, v => {
    const sign = v < 0 ? -1 : 1
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5)
    return sign * magnitude
  })

  return (
    <ScrollVelocityContext.Provider value={velocityFactor}>
      <div className={cn('relative w-full', className)} {...props}>
        {children}
      </div>
    </ScrollVelocityContext.Provider>
  )
}

export function ScrollVelocityRow({
  children,
  baseVelocity = 5,
  direction = 1,
  scrollReactivity = true,
  className,
}: ScrollVelocityRowProps) {
  const sharedVelocityFactor = useContext(ScrollVelocityContext)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLSpanElement>(null)
  const [repetitions, setRepetitions] = useState(2)

  useEffect(() => {
    function calculate() {
      if (!containerRef.current || !itemRef.current) return
      const containerWidth = containerRef.current.offsetWidth
      const itemWidth = itemRef.current.offsetWidth
      if (itemWidth > 0) setRepetitions(Math.ceil(containerWidth / itemWidth) + 2)
    }
    calculate()
    window.addEventListener('resize', calculate)
    return () => window.removeEventListener('resize', calculate)
  }, [children])

  const baseX = useMotionValue(0)
  const x = useTransform(baseX, v => `${wrap(-100 / repetitions, 0, v)}%`)
  const directionFactor = useRef(1)

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (scrollReactivity && sharedVelocityFactor) {
      const factor = sharedVelocityFactor.get()
      if (factor < 0) directionFactor.current = -1
      else if (factor > 0) directionFactor.current = 1
      moveBy += directionFactor.current * moveBy * factor
    }

    baseX.set(baseX.get() + moveBy * direction)
  })

  return (
    <div ref={containerRef} className='w-full overflow-hidden whitespace-nowrap'>
      <motion.div className={cn('inline-block', className)} style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <span key={i} ref={i === 0 ? itemRef : undefined}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
