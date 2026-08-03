import { useEffect, useState } from 'react'

/**
 * Indicador "en vivo" — pero HONESTO.
 *
 * Decidí no fabricar cosas como "3 personas viendo esto ahora" porque es un
 * patrón de dark pattern muy usado y, para un negocio chico, se nota rápido
 * que es falso (alguien entra dos veces y ve el mismo "3 personas").
 *
 * En cambio, esto calcula el horario de atención REAL en tiempo real, en la
 * zona horaria del negocio (no la del visitante) — si alguien de España entra
 * a las 3am hora de Bogotá, tiene que ver "cerrado", no "abierto" por error
 * de zona horaria.
 *
 * Horario: Lunes a Sábado, 9am–4pm hora de Madrid (ajustar acá si cambia).
 */

const OPEN_HOUR = 9
const CLOSE_HOUR = 16 // 4pm
const OPEN_DAYS = [1, 2, 3, 4, 5] // lunes(1) a viernes(5) — domingo(0) cerrado
const BUSINESS_TZ = 'Europe/London' // hora de Madrid (España peninsular) — ajustar si cambia

function getBogotaNow(): Date {
  // Convierte "ahora" a la hora local de Bogotá sin importar dónde esté el visitante
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BUSINESS_TZ,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(new Date())

  const get = (type: string) => Number(parts.find(p => p.type === type)?.value ?? 0)
  return new Date(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'))
}

export function isBusinessOpen(): boolean {
  const now = getBogotaNow()
  const day = now.getDay()
  const hour = now.getHours() + now.getMinutes() / 60
  return OPEN_DAYS.includes(day) && hour >= OPEN_HOUR && hour < CLOSE_HOUR
}

/** Hook que se re-evalúa solo — actualiza cada minuto sin recargar la página. */
export function useBusinessStatus() {
  const [isOpen, setIsOpen] = useState(isBusinessOpen)

  useEffect(() => {
    const id = setInterval(() => setIsOpen(isBusinessOpen()), 60_000)
    return () => clearInterval(id)
  }, [])

  return isOpen
}

/** Badge chiquito — punto pulsante + texto. Para usar junto a título de widget. */
export function LiveStatusBadge() {
  const isOpen = useBusinessStatus()

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
        isOpen ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
      }`}
    >
      <span className='relative flex h-1.5 w-1.5'>
        {isOpen && (
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75' />
        )}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-green-500' : 'bg-muted-foreground/50'}`}
        />
      </span>
      {isOpen ? 'En línea ahora' : 'Fuera de horario'}
    </span>
  )
}

/** Versión más grande con descripción — para la página de contacto. */
export function BusinessHoursCard() {
  const isOpen = useBusinessStatus()

  return (
    <div className='flex items-center gap-3 rounded-2xl border border-border bg-card p-4'>
      <span className='relative flex h-2.5 w-2.5 shrink-0'>
        {isOpen && (
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75' />
        )}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${isOpen ? 'bg-green-500' : 'bg-muted-foreground/40'}`}
        />
      </span>
      <div>
        <p className='text-sm font-semibold text-ink'>{isOpen ? 'Te respondemos ahora mismo' : 'Fuera de horario'}</p>
        <p className='text-xs text-muted-foreground'>
          {isOpen
            ? 'Estamos en línea — Lun a Vie, 09:00 – 16:00'
            : 'Te respondemos apenas abramos — Lun a Vie, 09:00 – 16:00'}
        </p>
      </div>
    </div>
  )
}
