import { Heart } from 'lucide-react'
import { ScrollVelocityContainer, ScrollVelocityRow } from '../ui/scroll-based-velocity'

const WORDS = [
  'Anchetas',
  'Tarjetas escritas a mano',
  'Empaques personalizados',
  'Envíos a domicilio',
  'Detalles para cada fecha',
]

/**
 * Banda angosta entre el Hero y el Catálogo — reacciona a la velocidad del
 * scroll (cuanto más rápido scrolleás, más rápido se mueve). La probé
 * dentro del Hero mismo y quedaba forzada (ahí no hay scroll todavía para
 * reaccionar); acá, como transición hacia el catálogo, tiene más sentido.
 */
export function ScrollMarquee() {
  return (
    <div id='scroll-marquee' className='relative overflow-hidden border-y border-border bg-secondary/40 py-6'>
      <ScrollVelocityContainer>
        <ScrollVelocityRow baseVelocity={5} direction={-1}>
          {WORDS.map(word => (
            <span
              key={word}
              className='font-display mx-6 inline-flex items-center gap-3 text-2xl italic text-ink/70 sm:text-3xl'
            >
              {word}
              <Heart className='h-4 w-4 shrink-0 fill-primary text-primary' />
            </span>
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>

      <div className='pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-secondary/30 to-transparent sm:w-32' />
      <div className='pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-secondary/30 to-transparent sm:w-32' />
    </div>
  )
}
