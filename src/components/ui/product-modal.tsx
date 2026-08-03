import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { sileo } from 'sileo'
import { trackEvent } from '@/lib/analytics'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Product } from '@/lib/products'

export interface ModalSelection {
  product: Product
  rect: DOMRect
}

interface ProductModalProps {
  selection: ModalSelection | null
  onClose: () => void
}

// Ancho máximo del modal en px (tailwind sm:max-w-lg = 512)
const MODAL_MAX_W = 512

export function ProductModal({ selection, onClose }: ProductModalProps) {
  const navigate = useNavigate()
  const isFirstRender = useRef(true)

  useEffect(() => {
    document.body.style.overflow = selection ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selection])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  // Calculamos el initial transform basado en el rect de la card.
  // TODA la animación son transforms CSS puros → GPU, 0 layout thrashing.
  function getInitial(rect: DOMRect) {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const isMobile = vw < 640

    if (isMobile) {
      // En mobile: bottom sheet, sube desde abajo
      return { y: vh, opacity: 1, scale: 1, borderRadius: '24px 24px 0 0' }
    }

    // Desktop: la card "crece" hasta el centro de la pantalla
    const modalW = Math.min(MODAL_MAX_W, vw - 48)

    // Centro de la card en coordenadas de viewport
    const cardCX = rect.left + rect.width / 2
    const cardCY = rect.top + rect.height / 2

    // Offset desde el centro de la pantalla (donde va a quedar el modal)
    const dx = cardCX - vw / 2
    const dy = cardCY - vh / 2

    // Escala uniforme: la card tiene rect.width, el modal tiene modalW
    const scale = rect.width / modalW

    return { x: dx, y: dy, scale, opacity: 1, borderRadius: '16px' }
  }

  const animateTo = {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
    borderRadius: '24px',
  }

  // Exit: colapso rápido hacia el centro (no hacia la card — evita recalcular posición)
  const exitAnim = {
    scale: 0.88,
    opacity: 0,
    y: 16,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
  }

  isFirstRender.current = false

  return createPortal(
    <AnimatePresence mode='popLayout'>
      {selection && (
        <>
          {/* Backdrop: fade independiente, sin afectar el modal */}
          <motion.div
            key='backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 z-100 bg-ink/55 backdrop-blur-[3px]'
            onClick={onClose}
          />

          {/* Contenedor centrador — no anima, solo posiciona */}
          <div className='fixed inset-0 z-101 flex items-end justify-center sm:items-center sm:p-6 pointer-events-none'>
            {/* El modal anima solo con transforms — nunca hay layout recalculation */}
            <motion.div
              key={selection.product.id}
              initial={getInitial(selection.rect)}
              animate={animateTo}
              exit={exitAnim}
              transition={{
                // spring ajustado para distancias medianas: snappy sin overshoot
                type: 'spring',
                stiffness: 420,
                damping: 36,
                mass: 0.75,
                // opacity y borderRadius en tween rápido porque spring en esos
                // valores no se ve bien
                opacity: { duration: 0 },
                borderRadius: { type: 'tween', duration: 0.22, ease: 'easeOut' },
              }}
              className='relative w-full overflow-hidden bg-card shadow-2xl pointer-events-auto sm:max-w-lg'
              style={{ originX: 0.5, originY: 0.5 }}
            >
              {/* Imagen */}
              <div
                className={`relative flex h-56 items-center justify-center overflow-hidden bg-linear-to-br ${selection.product.gradient} sm:h-64`}
              >
                {selection.product.image ? (
                  <img
                    src={selection.product.image}
                    alt={selection.product.name}
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <span className={`font-display select-none text-[8rem] italic ${selection.product.accentColor}`}>
                    {selection.product.name.charAt(0)}
                  </span>
                )}

                <div className='absolute bottom-4 right-4 rounded-full bg-card/95 px-4 py-1.5 shadow'>
                  <span className='text-sm font-bold text-primary'>{selection.product.price}</span>
                </div>

                <button
                  onClick={onClose}
                  aria-label='Cerrar'
                  className='absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-ink/25 text-white backdrop-blur-sm hover:bg-ink/45 transition-colors'
                >
                  <X className='h-4 w-4' />
                </button>
              </div>

              {/* Contenido — fade in ligero después del expand */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.14, duration: 0.18 }}
                className='p-6 sm:p-8'
              >
                <Badge variant='primary' className='mb-3'>
                  {selection.product.tag}
                </Badge>
                <h2 className='text-2xl text-ink sm:text-3xl'>{selection.product.name}</h2>
                <div className='mt-1 flex items-center gap-1.5 text-xs text-muted-foreground'>
                  <Clock className='h-3.5 w-3.5' />
                  {selection.product.deliveryTime}
                </div>

                <p className='mt-4 text-sm leading-relaxed text-muted-foreground'>{selection.product.description}</p>

                <ul className='mt-4 grid grid-cols-2 gap-2'>
                  {selection.product.features.map(f => (
                    <li key={f} className='flex items-start gap-2 text-xs text-foreground/80'>
                      <CheckCircle2 className='mt-0.5 h-3.5 w-3.5 shrink-0 text-primary' />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
                  <Button
                    size='lg'
                    className='flex-1'
                    onClick={() => {
                      onClose()
                      // Confirmamos la elección antes de saltar al formulario —
                      // sirve como recordatorio de qué producto estaba viendo.
                      sileo.success({
                        title: `🎁 ${selection.product.name}`,
                        description: 'Te llevamos al formulario para coordinar los detalles.',
                        duration: 3500,
                      })
                      trackEvent('select_item', {
                        item_name: selection.product.name,
                        item_category: selection.product.category,
                        price: selection.product.price,
                      })
                      navigate('/contacto')
                    }}
                  >
                    ¡Lo quiero!
                  </Button>
                  <Button size='lg' variant='outline' onClick={onClose} className='flex-1'>
                    Seguir viendo
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}
