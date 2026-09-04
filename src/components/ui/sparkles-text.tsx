import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

interface Sparkle {
  id: string
  x: string
  y: string
  color: string
  delay: number
  scale: number
  lifespan: number
}

interface SparklesTextProps {
  /** El texto sobre el que se generan los destellos. */
  text: string
  className?: string
  /** Colores de los destellos — alterna entre los dos. */
  colors?: { first: string; second: string }
  /** Cantidad de destellos activos en simultáneo. */
  sparklesCount?: number
}

function randomStar(colors: { first: string; second: string }): Sparkle {
  return {
    id: crypto.randomUUID(),
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    color: Math.random() > 0.5 ? colors.first : colors.second,
    delay: Math.random() * 2,
    scale: Math.random() * 1 + 0.3,
    lifespan: Math.random() * 10 + 5,
  }
}

/**
 * Texto con destellos animados generándose continuamente encima — pensado
 * para titulares o CTAs que necesiten un extra de atención. Basado en el
 * componente "Sparkles Text" de Magic UI (magicui.design), reconstruido acá
 * para no depender del CLI de shadcn.
 */
export function SparklesText({
  text,
  className,
  colors = { first: '#fe0175', second: '#ffb3d1' },
  sparklesCount = 10,
}: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const frame = useRef<number>(0)

  useEffect(() => {
    setSparkles(Array.from({ length: sparklesCount }, () => randomStar(colors)))

    const interval = setInterval(() => {
      setSparkles(current => {
        const next = [...current]
        const i = frame.current % sparklesCount
        next[i] = randomStar(colors)
        frame.current++
        return next
      })
    }, 350)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sparklesCount, colors.first, colors.second])

  return (
    <span className={cn('relative inline-block', className)}>
      <AnimatePresence>
        {sparkles.map(sp => (
          <motion.svg
            key={sp.id}
            className='pointer-events-none absolute z-10'
            style={{ left: sp.x, top: sp.y, transform: 'translate(-50%, -50%)' } as CSSProperties}
            width='21'
            height='21'
            viewBox='0 0 21 21'
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ scale: [0, sp.scale, 0], opacity: [0, 1, 0], rotate: 180 }}
            transition={{ duration: sp.lifespan, delay: sp.delay, repeat: Infinity, repeatDelay: 1 }}
          >
            <path
              d='M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z'
              fill={sp.color}
            />
          </motion.svg>
        ))}
      </AnimatePresence>
      <strong className='relative z-0'>{text}</strong>
    </span>
  )
}
