import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, CalendarHeart } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Seo } from '@/components/Seo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  getResolvedOccasions,
  groupByExactDate,
  formatLongDate,
  formatMonthAbbr,
  type ResolvedOccasion,
} from '@/lib/occasions'

const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

const CATEGORY_STYLES: Record<ResolvedOccasion['category'], string> = {
  amor: 'bg-primary/10 text-primary',
  familia: 'bg-amber-100 text-amber-700',
  amistad: 'bg-sky-100 text-sky-700',
  infantil: 'bg-violet-100 text-violet-700',
  'fin-de-año': 'bg-emerald-100 text-emerald-700',
  curiosidades: 'bg-indigo-100 text-indigo-700',
  gastronomia: 'bg-orange-100 text-orange-700',
  profesional: 'bg-teal-100 text-teal-700',
  mascotas: 'bg-lime-100 text-lime-700',
}

export function CalendarPage() {
  const navigate = useNavigate()

  // Todo se calcula en el momento — nunca queda una fecha vieja hardcodeada.
  const resolved = getResolvedOccasions()
  const grouped = groupByExactDate(resolved)

  // Destacadas: las 3 fechas más próximas (agrupando same-day como una sola tarjeta)
  const featured = grouped.slice(0, 3)

  // El resto, organizado por mes — recorriendo la lista ya ordenada
  // cronológicamente y abriendo una sección nueva cada vez que cambia el
  // par (mes, año). Esto evita mezclar "agosto de este año" con "agosto
  // del año que viene" en la misma sección — un caso real cuando una
  // fecha ya pasó este año y su próxima ocurrencia cae 12 meses después.
  const byMonth: {
    monthIndex: number
    year: number
    label: string
    groups: typeof grouped
  }[] = []

  for (const g of grouped) {
    const monthIndex = g.date.getMonth()
    const year = g.date.getFullYear()
    const last = byMonth[byMonth.length - 1]

    if (last && last.monthIndex === monthIndex && last.year === year) {
      last.groups.push(g)
      continue
    }

    // Si este mes ya apareció antes (en un año distinto), mostramos el
    // año en la etiqueta para dejar claro que es la vuelta siguiente.
    const monthName = MONTH_NAMES[monthIndex]
    const seenBefore = byMonth.some(s => s.monthIndex === monthIndex)
    const label = seenBefore ? `${monthName} ${year}` : monthName

    byMonth.push({ monthIndex, year, label, groups: [g] })
  }

  return (
    <section className='bg-background pb-28 pt-36'>
      <Seo
        title='Calendario de fechas especiales'
        description='Todas las fechas para regalar durante el año: San Valentín, Día de la Madre, Amor y Amistad, Navidad y más — con las más próximas siempre a la vista.'
        path='/calendario'
      />

      <div className='mx-auto max-w-6xl px-6 lg:px-10'>
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='max-w-2xl'
        >
          <Badge variant='primary'>
            <CalendarHeart className='h-3.5 w-3.5' />
            Calendario de regalos
          </Badge>
          <h1 className='font-display mt-4 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl'>
            Ninguna fecha se te va a pasar
          </h1>
          <p className='mt-4 text-lg text-muted-foreground'>
            Todas las fechas establecidas para regalar durante el año — con las más próximas siempre primero.
          </p>
        </motion.div>

        {/* Destacadas — las más próximas */}
        <div className='mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3'>
          {featured.map((group, i) => (
            <motion.button
              key={group.dateKey}
              onClick={() => navigate('/contacto')}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                'group relative overflow-hidden rounded-2xl border p-6 text-left transition-all hover:-translate-y-1 hover:shadow-lg',
                i === 0 ? 'border-primary/30 bg-primary/5' : 'border-border bg-card',
              )}
            >
              {i === 0 && (
                <span className='absolute right-4 top-4 text-[10px] font-bold uppercase tracking-wide text-primary'>
                  La más próxima
                </span>
              )}

              <div className='flex items-center gap-1 text-4xl'>
                {group.occasions.map(o => (
                  <span key={o.id}>{o.emoji}</span>
                ))}
              </div>

              <h3 className='font-display mt-3 text-lg font-semibold text-ink'>
                {group.occasions.map(o => o.name).join(' + ')}
              </h3>
              <p className='mt-1 text-sm capitalize text-muted-foreground'>{formatLongDate(group.date)}</p>

              <p className='mt-3 text-sm font-semibold text-primary'>
                {group.daysUntil === 0
                  ? '¡Es hoy!'
                  : group.daysUntil === 1
                    ? 'Falta 1 día'
                    : `Faltan ${group.daysUntil} días`}
              </p>

              <span className='mt-4 inline-flex items-center gap-1 text-xs font-semibold text-foreground/70 group-hover:text-primary transition-colors'>
                Pedir para esta fecha
                <ArrowRight className='h-3 w-3 transition-transform group-hover:translate-x-0.5' />
              </span>
            </motion.button>
          ))}
        </div>

        {/* Calendario completo, mes por mes */}
        <div className='mt-20'>
          <h2 className='font-display text-2xl font-semibold text-ink'>Todo el año</h2>
          <p className='mt-1 text-sm text-muted-foreground'>
            Empezando por {MONTH_NAMES[new Date().getMonth()]}, que es donde estamos ahora.
          </p>

          <div className='mt-8 space-y-10'>
            {byMonth.map(({ label, groups }, mi) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: Math.min(mi * 0.05, 0.3) }}
              >
                <div className='flex items-center gap-3'>
                  <span className='font-display text-sm font-bold uppercase tracking-wide text-primary'>{label}</span>
                  <div className='h-px flex-1 bg-border' />
                </div>

                <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                  {groups.map(group => (
                    <div
                      key={group.dateKey}
                      className='flex items-start gap-3 rounded-xl border border-border bg-card p-4'
                    >
                      <div className='shrink-0 rounded-lg bg-muted px-2.5 py-1.5 text-center'>
                        <p className='text-[10px] font-semibold uppercase text-muted-foreground'>
                          {formatMonthAbbr(group.date)}
                        </p>
                        <p className='font-display text-lg font-bold leading-none text-ink'>{group.date.getDate()}</p>
                      </div>

                      <div className='min-w-0'>
                        {group.occasions.map(o => (
                          <div key={o.id} className='mb-1.5 last:mb-0'>
                            <div className='flex items-center gap-1.5'>
                              <span>{o.emoji}</span>
                              <p className='text-sm font-semibold leading-tight text-ink'>{o.name}</p>
                            </div>
                            <span
                              className={cn(
                                'mt-0.5 inline-block rounded-full px-1.5 py-0.5 text-[10px] font-medium',
                                CATEGORY_STYLES[o.category],
                              )}
                            >
                              {o.note}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className='mt-20 flex flex-col items-center gap-4 rounded-3xl border border-primary/15 bg-secondary/30 px-8 py-12 text-center'
        >
          <Sparkles className='h-6 w-6 text-primary' />
          <h2 className='font-display text-2xl font-semibold text-ink sm:text-3xl'>¿Ya sabes qué fecha se acerca?</h2>
          <p className='max-w-md text-muted-foreground'>
            Cuéntanos para quién es y preparamos algo pensado exactamente para esa ocasión.
          </p>
          <Button size='lg' onClick={() => navigate('/contacto')}>
            Pedir mi regalo personalizado
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
