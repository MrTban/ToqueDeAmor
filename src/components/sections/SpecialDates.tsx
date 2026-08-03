import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { SectionHeading } from './Catalog'
import { Button } from '@/components/ui/button'
import { getResolvedOccasions, groupByExactDate, formatLongDate } from '@/lib/occasions'

// Solo mostramos las próximas 5 fechas (agrupadas por día exacto) — el
// calendario completo con las 16 ocasiones del año vive en /calendario.
const UPCOMING_COUNT = 5

export function SpecialDates() {
  const navigate = useNavigate()

  const upcoming = groupByExactDate(getResolvedOccasions()).slice(0, UPCOMING_COUNT)

  return (
    <section id='fechas' className='relative overflow-hidden bg-secondary/40 py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-10'>
        <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end'>
          <SectionHeading
            eyebrow='Fechas especiales'
            title='Cada ocasión merece su propio toque'
            description='Las próximas fechas para regalar — el calendario completo del año tiene todas.'
          />
          <Button variant='outline' className='shrink-0' onClick={() => navigate('/calendario')}>
            Ver calendario completo
          </Button>
        </div>

        {/* globo decorativo — mascota que sostiene el globo */}
        <div className='relative mt-10'>
          <div className='absolute -top-6 right-6 hidden lg:block pointer-events-none z-10'>
            <img
              src='/images/globos.png'
              alt='Globo personalizado Toque de Amor'
              className='h-36 w-auto object-contain drop-shadow-xl animate-float'
            />
          </div>

          <div className='no-scrollbar flex gap-5 overflow-x-auto pb-4 snap-x'>
            {upcoming.map((group, i) => (
              <motion.button
                key={group.dateKey}
                onClick={() => navigate('/calendario')}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className='flex w-56 shrink-0 flex-col gap-4 rounded-2xl border border-primary/15 bg-card p-6 text-left shadow-sm snap-start transition-transform hover:-translate-y-1 hover:shadow-md'
              >
                <div className='flex items-center gap-1.5 text-3xl'>
                  {group.occasions.map(o => (
                    <span key={o.id}>{o.emoji}</span>
                  ))}
                </div>
                <div>
                  <h3 className='font-display text-base font-semibold leading-tight text-ink'>
                    {group.occasions.map(o => o.name).join(' + ')}
                  </h3>
                  <p className='mt-1 text-xs capitalize text-muted-foreground'>{formatLongDate(group.date)}</p>
                </div>
                <p className='text-xs font-semibold text-primary'>
                  {group.daysUntil === 0
                    ? '¡Es hoy!'
                    : group.daysUntil === 1
                      ? 'Falta 1 día'
                      : `Faltan ${group.daysUntil} días`}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
