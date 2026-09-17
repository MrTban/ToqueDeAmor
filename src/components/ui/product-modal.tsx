import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { X, Clock, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { sileo } from 'sileo'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { trackEvent } from '@/lib/analytics'
import type { Product } from '@/lib/products'
import { SITE } from '@/lib/site-config'

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
              className='relative w-full overflow-hidden bg-card shadow-2xl pointer-events-auto sm:max-w-4xl'
              style={{ originX: 0.5, originY: 0.5 }}
            >
              {/* Imagen */}
              <div
                className={`relative flex h-80 items-center justify-center overflow-hidden bg-linear-to-br ${selection.product.gradient} sm:h-200`}
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
                  <span className='text-3xl font-bold text-primary'>{selection.product.price}</span>
                </div>

                <button
                  onClick={onClose}
                  aria-label='Cerrar'
                  className='absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-ink/25 text-white backdrop-blur-sm hover:bg-ink/45 transition-colors cursor-pointer'
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
                <h2 className='text-2xl text-ink sm:text-4xl'>{selection.product.name}</h2>
                <div className='mt-1 flex items-center gap-1.5 text-sm text-muted-foreground'>
                  <Clock className='h-4 w-4' />
                  {selection.product.deliveryTime}
                </div>

                <p className='mt-4 text-md leading-relaxed text-muted-foreground'>{selection.product.description}</p>

                <ul className='mt-4 grid grid-cols-2 gap-2'>
                  {selection.product.features.map(f => (
                    <li key={f} className='flex items-center gap-2 text-sm text-foreground/80'>
                      <CheckCircle2 className='h-4 w-4 shrink-0 text-primary' />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
                  <Button
                    size='lg'
                    className='flex-1 cursor-pointer p-2'
                    onClick={() => {
                      onClose()

                      // 1. Definimos el mensaje personalizado con el nombre del producto
                      const productName = selection.product.name
                      // const message = `¡Hola! Me interesa este producto y quiero coordinar los detalles: *${productName}*`
                      const message = [
                        `¡Hola, Toque de Amor! ➔`,
                        ``,
                        `Me interesa coordinar los detalles de este producto:`,
                        `  ✦ Producto: *${selection.product.name}*`,
                        `  ✦ Categoría: ${selection.product.category}`,
                        `  ✦ Precio: $${selection.product.price}`,
                        ``,
                        `¿Me darían más información por favor? Quedo atento/a.`,
                      ].join('\n')

                      // 2. Construimos la URL de WhatsApp con el teléfono de SITE y el mensaje codificado
                      // Asegúrate de que SITE.social.whatsapp contenga el número o la URL base correcta.
                      // Si SITE.social.whatsapp es algo como 'https://wa.me/5491122334455', podemos añadirle el ?text=...
                      const whatsappUrl = `${SITE.social.whatsapp}?text=${encodeURIComponent(message)}`

                      // 3. Mostramos la notificación visual
                      sileo.info({
                        title: 'Abriendo WhatsApp…',
                        description: `Te conectamos con el chat para "${productName}"`,
                        duration: 2000,
                      })

                      // 4. Registramos el evento en tus analíticas
                      trackEvent('social_click', {
                        network: 'whatsapp',
                        item_name: productName,
                        item_category: selection.product.category,
                        price: selection.product.price,
                      })

                      // 5. Abrimos WhatsApp en una nueva pestaña
                      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
                    }}
                  >
                    ¡Lo quiero!
                  </Button>

                  <Button size='lg' variant='outline' onClick={onClose} className='flex-1 cursor-pointer p-2'>
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
