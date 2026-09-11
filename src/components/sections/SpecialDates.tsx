import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { HorizontalScroller } from '@/components/ui/horizontal-scroller'
import { SectionHeading } from '@/components/SectionHeading'

import { formatLongDate, getResolvedOccasions, groupByExactDate } from '@/lib/occasions'

// Solo mostramos las próximas 5 fechas (agrupadas por día exacto) — el
// calendario completo con las 16 ocasiones del año vive en /calendario.
const UPCOMING_COUNT = 5

export function SpecialDates() {
  const navigate = useNavigate()

  const upcoming = groupByExactDate(getResolvedOccasions()).slice(0, UPCOMING_COUNT)

  return (
    <section id='fechas' className='relative overflow-hidden bg-secondary/60 py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-10'>
        <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end'>
          <SectionHeading
            eyebrow='Fechas especiales'
            title='Cada ocasión merece su propio toque'
            description='Las próximas fechas para regalar — el calendario completo del año tiene todas.'
          />
          <Button variant='primary' className='group shrink-0 cursor-pointer' onClick={() => navigate('/calendario')}>
            Ver calendario completo
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
          </Button>
        </div>

        {/* globo decorativo — mascota que sostiene el globo */}
        <div className='relative mt-10'>
          <HorizontalScroller fadeFrom='from-secondary/40' contentClassName='flex gap-5 pb-4 snap-x'>
            {upcoming.map((group, i) => (
              <motion.button
                key={group.dateKey}
                onClick={() => navigate('/calendario')}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className='flex w-56 shrink-0 flex-col gap-4 rounded-2xl border border-primary/15 bg-card p-6 text-left shadow-sm snap-start transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer'
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
          </HorizontalScroller>
        </div>
      </div>
    </section>
  )
}
