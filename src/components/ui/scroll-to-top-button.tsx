import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp } from 'lucide-react'

const SHOW_AFTER_PX = 480

/**
 * Botón flotante "volver arriba". Aparece solo después de bajar un poco
 * (para no estorbar en el primer viewport), con scroll suave al hacer click.
 * Se monta una sola vez en RootLayout — visible en todas las páginas.
 */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          onClick={handleClick}
          aria-label='Volver arriba'
          className='fixed bottom-6 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5 hover:shadow-xl sm:bottom-8 sm:right-8 sm:h-12 sm:w-12'
        >
          <ArrowUp className='h-5 w-5' />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
