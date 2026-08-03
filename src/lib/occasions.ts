/**
 * occasions.ts — Calendario de fechas para regalar.
 *
 * Todas las fechas fueron verificadas contra fuentes reales (no inventadas).
 * Colombia tiene varias fechas "propias" que difieren del resto de
 * Latinoamérica — quedaron anotadas donde aplica.
 *
 * Dos tipos de fecha:
 * 1. FIJA — mismo día/mes todos los años (ej: Navidad, 25 de diciembre)
 * 2. FLOTANTE — "el N-ésimo [día de la semana] de [mes]" (ej: Día de la
 *    Madre en Colombia = segundo domingo de mayo, que cae en un día
 *    distinto cada año)
 *
 * Por eso NO hardcodeamos "10 de mayo de 2026" — calculamos la fecha real
 * en tiempo de ejecución para el año que corresponda. Así el calendario
 * sigue siendo correcto en 2027, 2028, etc. sin tocar código.
 */

export type DateRule =
  | { type: 'fixed'; month: number; day: number }
  | { type: 'nth-weekday'; month: number; weekday: number; nth: 1 | 2 | 3 | 4 }
  | { type: 'last-weekday'; month: number; weekday: number }

export type OccasionCategory =
  | 'amor'
  | 'familia'
  | 'amistad'
  | 'infantil'
  | 'fin-de-año'
  | 'curiosidades'
  | 'gastronomia'
  | 'profesional'
  | 'mascotas'

export interface Occasion {
  id: string
  name: string
  emoji: string
  rule: DateRule
  category: OccasionCategory
  /** Contexto corto — por qué esta fecha, o si es una tradición no oficial */
  note: string
}

// weekday: 0=domingo … 6=sábado (convención de Date.getDay())

export const OCCASIONS: Occasion[] = [
  {
    id: 'ano-nuevo',
    name: 'Año Nuevo',
    emoji: '🎆',
    rule: { type: 'fixed', month: 1, day: 1 },
    category: 'fin-de-año',
    note: 'Detalles para empezar el año',
  },
  {
    id: 'dia-reyes',
    name: 'Día de los Reyes Magos',
    emoji: '👑',
    rule: { type: 'fixed', month: 1, day: 6 },
    category: 'infantil',
    note: 'Tradición de regalos para niños',
  },
  {
    id: 'dia-abrazo',
    name: 'Día Internacional del Abrazo',
    emoji: '🤗',
    rule: { type: 'fixed', month: 1, day: 21 },
    category: 'amistad',
    note: 'National Hugging Day — reconocimiento internacional',
  },
  {
    id: 'san-valentin',
    name: 'San Valentín',
    emoji: '💘',
    rule: { type: 'fixed', month: 2, day: 14 },
    category: 'amor',
    note: 'Versión internacional — en Colombia el Amor y Amistad se celebra en septiembre',
  },
  {
    id: 'dia-soltero-galentine',
    name: "Día del Soltero / Galentine's Day",
    emoji: '💅',
    rule: { type: 'fixed', month: 2, day: 13 },
    category: 'amistad',
    note: 'La víspera de San Valentín, para celebrar la amistad entre mujeres',
  },
  {
    id: 'dia-mujer',
    name: 'Día de la Mujer',
    emoji: '🌷',
    rule: { type: 'fixed', month: 3, day: 8 },
    category: 'familia',
    note: 'Día Internacional de la Mujer',
  },
  {
    id: 'white-day',
    name: 'White Day',
    emoji: '🤍',
    rule: { type: 'fixed', month: 3, day: 14 },
    category: 'amor',
    note: 'Tradición asiática — se devuelve el regalo recibido en San Valentín',
  },
  {
    id: 'dia-padre-espana',
    name: 'Día del Padre (España y países católicos)',
    emoji: '👨',
    rule: { type: 'fixed', month: 3, day: 19 },
    category: 'familia',
    note: 'San José — distinto a la fecha de Latinoamérica (tercer domingo de junio)',
  },
  {
    id: 'flores-amarillas-norte',
    name: 'Flores Amarillas (Hemisferio Norte)',
    emoji: '🌼',
    rule: { type: 'fixed', month: 3, day: 21 },
    category: 'amor',
    note: 'Equinoccio de primavera — versión norte de la tradición de septiembre',
  },
  {
    id: 'dia-tierra',
    name: 'Día de la Tierra',
    emoji: '🌎',
    rule: { type: 'fixed', month: 4, day: 22 },
    category: 'curiosidades',
    note: 'Earth Day — celebración ambiental reconocida por la ONU',
  },
  {
    id: 'sant-jordi',
    name: 'Sant Jordi — Día del Libro y la Rosa',
    emoji: '📖',
    rule: { type: 'fixed', month: 4, day: 23 },
    category: 'amor',
    note: 'Tradición catalana — se regala un libro y una rosa',
  },
  {
    id: 'dia-secretaria',
    name: 'Día de la Secretaria / Asistente Administrativo',
    emoji: '💼',
    rule: { type: 'last-weekday', month: 4, weekday: 3 },
    category: 'profesional',
    note: 'Último miércoles de abril (fecha aproximada — varía por país)',
  },
  {
    id: 'dia-nino',
    name: 'Día del Niño',
    emoji: '🎈',
    rule: { type: 'last-weekday', month: 4, weekday: 6 },
    category: 'infantil',
    note: 'Colombia — último sábado de abril (Ley 724 de 2001)',
  },
  {
    id: 'dia-madre',
    name: 'Día de la Madre',
    emoji: '🌸',
    rule: { type: 'nth-weekday', month: 5, weekday: 0, nth: 2 },
    category: 'familia',
    note: 'Colombia — segundo domingo de mayo',
  },
  {
    id: 'dia-maestro',
    name: 'Día del Maestro',
    emoji: '🍎',
    rule: { type: 'fixed', month: 5, day: 15 },
    category: 'profesional',
    note: 'Colombia — San Juan Bautista de La Salle, patrono de los educadores',
  },
  {
    id: 'dia-friki-gamer',
    name: 'Día del Orgullo Friki / Gamer',
    emoji: '🎮',
    rule: { type: 'fixed', month: 5, day: 25 },
    category: 'curiosidades',
    note: 'Geek Pride Day — coincide con el Towel Day de Douglas Adams',
  },
  {
    id: 'dia-padre',
    name: 'Día del Padre',
    emoji: '🎩',
    rule: { type: 'nth-weekday', month: 6, weekday: 0, nth: 3 },
    category: 'familia',
    note: 'Colombia — tercer domingo de junio',
  },
  {
    id: 'dia-sushi',
    name: 'Día Internacional del Sushi',
    emoji: '🍣',
    rule: { type: 'fixed', month: 6, day: 18 },
    category: 'gastronomia',
    note: 'Celebración gastronómica reconocida internacionalmente',
  },
  {
    id: 'dia-beso',
    name: 'Día Internacional del Beso',
    emoji: '💋',
    rule: { type: 'fixed', month: 7, day: 6 },
    category: 'amor',
    note: 'International Kissing Day',
  },
  {
    id: 'dia-emoji',
    name: 'Día del Emoji',
    emoji: '😊',
    rule: { type: 'fixed', month: 7, day: 17 },
    category: 'curiosidades',
    note: 'World Emoji Day — la fecha del ícono de calendario 📅',
  },
  {
    id: 'dia-amigo',
    name: 'Día del Amigo',
    emoji: '🫂',
    rule: { type: 'fixed', month: 7, day: 20 },
    category: 'amistad',
    note: 'Origen argentino — muy difundido en Latinoamérica',
  },
  {
    id: 'amistad-internacional',
    name: 'Día Internacional de la Amistad',
    emoji: '🤝',
    rule: { type: 'fixed', month: 7, day: 30 },
    category: 'amistad',
    note: 'Declarado por la ONU',
  },
  {
    id: 'dia-novia',
    name: 'Día de la Novia',
    emoji: '👰',
    rule: { type: 'fixed', month: 8, day: 1 },
    category: 'amor',
    note: 'Tradición viral — Colombia, México, Chile, Perú',
  },
  {
    id: 'dia-gato',
    name: 'Día Internacional del Gato',
    emoji: '🐱',
    rule: { type: 'fixed', month: 8, day: 8 },
    category: 'mascotas',
    note: 'International Cat Day — reconocido por IFAW',
  },
  {
    id: 'dia-chocolate',
    name: 'Día Internacional del Chocolate',
    emoji: '🍫',
    rule: { type: 'fixed', month: 9, day: 13 },
    category: 'gastronomia',
    note: 'Coincide con el nacimiento de Milton Hershey',
  },
  {
    id: 'amor-y-amistad',
    name: 'Día del Amor y la Amistad',
    emoji: '💝',
    rule: { type: 'nth-weekday', month: 9, weekday: 6, nth: 3 },
    category: 'amor',
    note: "Colombia — tercer sábado de septiembre (el 'San Valentín' local)",
  },
  {
    id: 'flores-amarillas',
    name: 'Día de las Flores Amarillas',
    emoji: '🌼',
    rule: { type: 'fixed', month: 9, day: 21 },
    category: 'amor',
    note: 'Tradición viral de redes sociales — símbolo de amor y nuevos comienzos',
  },
  {
    id: 'dia-turista',
    name: 'Día del Turista / Viajero',
    emoji: '✈️',
    rule: { type: 'fixed', month: 9, day: 27 },
    category: 'curiosidades',
    note: 'Día Mundial del Turismo — declarado por la OMT',
  },
  {
    id: 'dia-novio-internacional',
    name: 'Día del Novio (versión internacional)',
    emoji: '🤵',
    rule: { type: 'fixed', month: 9, day: 30 },
    category: 'amor',
    note: 'Se regalan flores azules — distinta a la versión de Latinoamérica (3 de octubre)',
  },
  {
    id: 'dia-cafe',
    name: 'Día Internacional del Café',
    emoji: '☕',
    rule: { type: 'fixed', month: 10, day: 1 },
    category: 'gastronomia',
    note: 'Declarado por la Organización Internacional del Café',
  },
  {
    id: 'dia-novio',
    name: 'Día del Novio',
    emoji: '🤵',
    rule: { type: 'fixed', month: 10, day: 3 },
    category: 'amor',
    note: 'Con raíces en Colombia — día 276 del año',
  },
  {
    id: 'dia-docentes',
    name: 'Día Mundial de los Docentes',
    emoji: '🍎',
    rule: { type: 'fixed', month: 10, day: 5 },
    category: 'profesional',
    note: 'Declarado por la UNESCO — distinto al Día del Maestro de Colombia (15 de mayo)',
  },
  {
    id: 'flores-azules',
    name: 'Día de Regalar Flores Azules',
    emoji: '💙',
    rule: { type: 'fixed', month: 10, day: 9 },
    category: 'amor',
    note: 'Tendencia informal de redes sociales — la fecha puede variar según la fuente',
  },
  {
    id: 'flores-rojas',
    name: 'Día de Regalar Flores Rojas / Rosas',
    emoji: '❤️',
    rule: { type: 'fixed', month: 10, day: 12 },
    category: 'amor',
    note: 'Tendencia informal de redes sociales — la fecha puede variar según la fuente',
  },
  {
    id: 'halloween',
    name: 'Halloween',
    emoji: '🎃',
    rule: { type: 'fixed', month: 10, day: 31 },
    category: 'infantil',
    note: 'Detalles y dulces temáticos',
  },
  {
    id: 'flores-moradas',
    name: 'Día de Regalar Flores Moradas / Violetas',
    emoji: '💜',
    rule: { type: 'fixed', month: 11, day: 9 },
    category: 'amor',
    note: 'Tendencia informal de redes sociales — la fecha puede variar según la fuente',
  },
  {
    id: 'dia-soltero-11-11',
    name: 'Día del Soltero (11/11)',
    emoji: '🛍️',
    rule: { type: 'fixed', month: 11, day: 11 },
    category: 'curiosidades',
    note: "Singles' Day — la fecha de autorregalos más grande del mundo",
  },
  {
    id: 'dia-hombre',
    name: 'Día Internacional del Hombre',
    emoji: '🎯',
    rule: { type: 'fixed', month: 11, day: 19 },
    category: 'familia',
    note: 'Reconocimiento internacional',
  },
  {
    id: 'black-friday',
    name: 'Black Friday / Inicio del Amigo Invisible',
    emoji: '🛒',
    rule: { type: 'last-weekday', month: 11, weekday: 5 },
    category: 'fin-de-año',
    note: 'Último viernes de noviembre — arranca la temporada de amigo secreto',
  },
  {
    id: 'dia-velitas',
    name: 'Día de las Velitas',
    emoji: '🕯️',
    rule: { type: 'fixed', month: 12, day: 7 },
    category: 'fin-de-año',
    note: 'Colombia — noche de la Inmaculada Concepción, abre la temporada navideña',
  },
  {
    id: 'nochebuena',
    name: 'Nochebuena',
    emoji: '🎅',
    rule: { type: 'fixed', month: 12, day: 24 },
    category: 'fin-de-año',
    note: 'La víspera de Navidad',
  },
  {
    id: 'navidad',
    name: 'Navidad',
    emoji: '🎄',
    rule: { type: 'fixed', month: 12, day: 25 },
    category: 'fin-de-año',
    note: 'La fecha más grande del año para regalar',
  },
  {
    id: 'fin-de-ano',
    name: 'Fin de Año / Nochevieja',
    emoji: '🎆',
    rule: { type: 'fixed', month: 12, day: 31 },
    category: 'fin-de-año',
    note: 'Detalles para cerrar el año y celebrar lo que viene',
  },
]

/* ───────────────────────── cálculo de fechas ───────────────────────── */

/** N-ésimo [weekday] de un mes — ej: 2do domingo de mayo */
function nthWeekdayOfMonth(year: number, month: number, weekday: number, nth: number): Date {
  const first = new Date(year, month - 1, 1)
  const firstWeekday = first.getDay()
  const day = 1 + ((7 + weekday - firstWeekday) % 7) + (nth - 1) * 7
  return new Date(year, month - 1, day)
}

/** Último [weekday] de un mes — ej: último sábado de abril */
function lastWeekdayOfMonth(year: number, month: number, weekday: number): Date {
  const lastDayNum = new Date(year, month, 0).getDate() // día 0 del mes siguiente = último día de este mes
  const last = new Date(year, month - 1, lastDayNum)
  const diff = (7 + last.getDay() - weekday) % 7
  return new Date(year, month - 1, lastDayNum - diff)
}

/** Resuelve una regla de fecha para un año calendario específico. */
export function resolveDate(rule: DateRule, year: number): Date {
  switch (rule.type) {
    case 'fixed':
      return new Date(year, rule.month - 1, rule.day)
    case 'nth-weekday':
      return nthWeekdayOfMonth(year, rule.month, rule.weekday, rule.nth)
    case 'last-weekday':
      return lastWeekdayOfMonth(year, rule.month, rule.weekday)
  }
}

/** Próxima ocurrencia de una fecha a partir de "hoy" — salta al año siguiente si ya pasó. */
export function getNextOccurrence(rule: DateRule, from: Date = new Date()): Date {
  const todayMidnight = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  let candidate = resolveDate(rule, todayMidnight.getFullYear())
  if (candidate < todayMidnight) {
    candidate = resolveDate(rule, todayMidnight.getFullYear() + 1)
  }
  return candidate
}

export function daysUntil(date: Date, from: Date = new Date()): number {
  const todayMidnight = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  const diffMs = date.getTime() - todayMidnight.getTime()
  return Math.round(diffMs / (1000 * 60 * 60 * 24))
}

export function formatLongDate(date: Date): string {
  return new Intl.DateTimeFormat('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date)
}

export function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'short',
  }).format(date)
}

/** Solo el mes abreviado (ej: "abr") — para el chip de fecha tipo hoja de calendario. */
export function formatMonthAbbr(date: Date): string {
  return new Intl.DateTimeFormat('es-CO', { month: 'short' }).format(date).replace('.', '')
}

export interface ResolvedOccasion extends Occasion {
  nextDate: Date
  daysUntil: number
}

/** Todas las ocasiones con su próxima fecha calculada, ordenadas por cercanía. */
export function getResolvedOccasions(from: Date = new Date()): ResolvedOccasion[] {
  return OCCASIONS.map(o => {
    const nextDate = getNextOccurrence(o.rule, from)
    return { ...o, nextDate, daysUntil: daysUntil(nextDate, from) }
  }).sort((a, b) => a.nextDate.getTime() - b.nextDate.getTime())
}

export interface OccasionGroup {
  dateKey: string // "YYYY-MM-DD" — para agrupar por día exacto
  date: Date
  daysUntil: number
  occasions: ResolvedOccasion[]
}

/**
 * Agrupa ocasiones que caen el MISMO día — algunas fechas flotantes pueden
 * coincidir con una fecha fija en ciertos años (ej: Amor y Amistad y Flores
 * Amarillas ambas rondan fines de septiembre).
 */
export function groupByExactDate(occasions: ResolvedOccasion[]): OccasionGroup[] {
  const map = new Map<string, OccasionGroup>()

  for (const o of occasions) {
    const dateKey = o.nextDate.toISOString().slice(0, 10)
    const existing = map.get(dateKey)
    if (existing) {
      existing.occasions.push(o)
    } else {
      map.set(dateKey, {
        dateKey,
        date: o.nextDate,
        daysUntil: o.daysUntil,
        occasions: [o],
      })
    }
  }

  return Array.from(map.values()).sort((a, b) => a.date.getTime() - b.date.getTime())
}
