import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HorizontalScrollerProps {
  children: ReactNode
  /** Clases del contenedor scrolleable interno (gap, padding, snap...) */
  contentClassName?: string
  /**
   * Color desde el que arranca el degradado en los bordes — debe matchear
   * el fondo de la sección para que el fade se vea continuo (ej: "from-background",
   * "from-secondary/40"). Por defecto usa el fondo de página.
   */
  fadeFrom?: string
  /** Oculta las flechas de desktop — usar en carruseles muy angostos (ej: pills de filtro) */
  showArrows?: boolean
  className?: string
}

/**
 * Envoltorio para listas con scroll horizontal (carruseles de cards, pills
 * de filtro, etc). Resuelve el problema de "el usuario no sabe que puede
 * desplazarse" con tres señales combinadas:
 *
 * 1. Degradados en los bordes que aparecen/desaparecen según la posición
 *    real del scroll (izquierda solo si ya te corriste del inicio, derecha
 *    solo si falta contenido por ver) — a diferencia de un fade fijo, esto
 *    también le avisa a alguien que llegó al final que no hay más.
 * 2. Un "empujoncito" animado una sola vez al cargar — el borde derecho
 *    tiembla levemente para sugerir que ahí hay más contenido, sin ser
 *    invasivo. Solo se dispara si el contenido realmente desborda.
 * 3. Flechas de click en desktop (ocultas en mobile, donde el swipe nativo
 *    ya es la interacción esperada).
 */
export function HorizontalScroller({
  children,
  contentClassName,
  fadeFrom = 'from-background',
  showArrows = true,
  className,
}: HorizontalScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [showHint, setShowHint] = useState(false)

  function updateEdges() {
    const el = scrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < maxScroll - 8)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    // Defensivo: algunos navegadores "corrigen" el scroll inicial hacia el
    // primer snap-point cuando el contenido usa scroll-snap combinado con
    // animaciones de entrada que transforman en el eje X — eso puede dejar
    // el carrusel arrancando desplazado en vez de en scrollLeft:0.
    if (el.scrollLeft !== 0) el.scrollLeft = 0

    updateEdges()

    // Si el contenido desborda, mostramos el empujoncito una vez y lo
    // apagamos solo (no vuelve a aparecer aunque cambie el filtro).
    const overflows = el.scrollWidth > el.clientWidth + 8
    if (overflows) {
      const t = setTimeout(() => setShowHint(true), 500)
      const hide = setTimeout(() => setShowHint(false), 2600)
      return () => {
        clearTimeout(t)
        clearTimeout(hide)
      }
    }
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      updateEdges()
      setShowHint(false)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  function scrollByAmount(dir: 1 | -1) {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div className={cn('group/scroller relative', className)}>
      <div ref={scrollRef} className={cn('no-scrollbar overflow-x-auto', contentClassName)}>
        {children}
      </div>

      {/* Fades dinámicos — solo visibles cuando hay algo más para ver de ese lado */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r to-transparent transition-opacity duration-300 sm:w-14',
          fadeFrom,
          canScrollLeft ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l to-transparent transition-opacity duration-300 sm:w-14',
          fadeFrom,
          canScrollRight ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Empujoncito animado — una sola vez, solo si hay overflow real */}
      <AnimatePresence>
        {showHint && canScrollRight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [0, 8, 0, 8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.3 }, x: { duration: 1.4, repeat: 1 } }}
            className='pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-primary sm:right-2'
          >
            <ChevronRight className='h-6 w-6 drop-shadow-sm' strokeWidth={2.5} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flechas de click — solo desktop, aparecen al hover del carrusel */}
      {showArrows && (
        <>
          <button
            type='button'
            aria-label='Desplazar hacia la izquierda'
            onClick={() => scrollByAmount(-1)}
            className={cn(
              'absolute left-1 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-card/95 p-1.5 shadow-md backdrop-blur-sm transition-opacity duration-200 hover:bg-card md:flex cursor-pointer',
              canScrollLeft ? 'opacity-0 group-hover/scroller:opacity-100' : 'pointer-events-none opacity-0',
            )}
          >
            <ChevronLeft className='h-4 w-4 text-ink' />
          </button>
          <button
            type='button'
            aria-label='Desplazar hacia la derecha'
            onClick={() => scrollByAmount(1)}
            className={cn(
              'absolute right-1 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-card/95 p-1.5 shadow-md backdrop-blur-sm transition-opacity duration-200 hover:bg-card md:flex cursor-pointer',
              canScrollRight ? 'opacity-0 group-hover/scroller:opacity-100' : 'pointer-events-none opacity-0',
            )}
          >
            <ChevronRight className='h-4 w-4 text-ink' />
          </button>
        </>
      )}
    </div>
  )
}
