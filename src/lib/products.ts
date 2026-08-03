export interface Product {
  id: string
  name: string
  tag: string
  price: string
  category: 'todos' | 'anchetas' | 'tarjetas' | 'kits' | 'globos'
  rotate: string
  gradient: string
  accentColor: string
  image?: string
  description: string
  deliveryTime: string
  features: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'ancheta-clasica',
    name: 'Ancheta Clásica',
    tag: 'La más pedida',
    price: 'Desde $35.000',
    category: 'anchetas',
    rotate: '-rotate-2',
    gradient: 'from-pink-100 via-fuchsia-50 to-rose-100',
    accentColor: 'text-primary/40',
    image: '/images/ancheta.png',
    description:
      'Nuestra ancheta estrella: snacks favoritos, globo de corazón, tarjeta personalizada y decoración que sorprende desde que se abre la puerta.',
    deliveryTime: 'Entrega en 24 – 48 h',
    features: ['Snacks y dulces surtidos', 'Globo corazón incluido', 'Tarjeta personalizada', 'Decoración con lazo'],
  },
  {
    id: 'ancheta-amor',
    name: 'Ancheta Te Amo',
    tag: 'San Valentín',
    price: 'Desde $45.000',
    category: 'anchetas',
    rotate: 'rotate-1',
    gradient: 'from-rose-100 via-pink-50 to-fuchsia-100',
    accentColor: 'text-rose-400/50',
    image: '/images/ancheta2.png',
    description:
      "La ancheta perfecta para decir 'te amo' con snacks, globo gigante de corazón personalizado, miniglobos decorativos y tarjeta escrita a mano.",
    deliveryTime: 'Entrega en 24 – 48 h',
    features: ['Globo corazón gigante', 'Miniglobos decorativos', 'Snacks y galletas', 'Mariposa decorativa'],
  },
  {
    id: 'tarjeta-cumple',
    name: 'Tarjeta de Cumpleaños',
    tag: 'Hecha a mano',
    price: 'Desde $8.000',
    category: 'tarjetas',
    rotate: 'rotate-2',
    gradient: 'from-amber-100 via-pink-50 to-rose-100',
    accentColor: 'text-amber-500/50',
    image: '/images/tarjeta.png',
    description:
      'Tarjetas dibujadas y escritas a mano con marcadores y colores. Cada una es única — le escribimos el mensaje que vos nos dictás, con la letra y estilo que prefieras.',
    deliveryTime: 'Lista en 12 h',
    features: ['Diseño original a mano', 'Mensaje personalizado', 'Decoración con stickers', 'Sobre incluido'],
  },
  {
    id: 'tarjeta-especial',
    name: 'Tarjeta Sorpresa',
    tag: 'Con dedicatoria',
    price: 'Desde $12.000',
    category: 'tarjetas',
    rotate: '-rotate-1',
    gradient: 'from-sky-100 via-pink-50 to-fuchsia-100',
    accentColor: 'text-sky-400/50',
    image: '/images/escribir.png',
    description:
      'Tarjeta elaborada con marcadores, washi tape y stickers temáticos. Incluye mensaje interior escrito con caligrafía. Ideal para acompañar cualquier regalo.',
    deliveryTime: 'Lista en 12 h',
    features: ['Caligrafía artística', 'Decoración temática', 'Washi tape y stickers', 'Sobre kraft premium'],
  },
  {
    id: 'kit-regalo',
    name: 'Kit Regalo Completo',
    tag: 'Todo incluido',
    price: 'Desde $55.000',
    category: 'kits',
    rotate: '-rotate-1',
    gradient: 'from-violet-100 via-fuchsia-50 to-pink-100',
    accentColor: 'text-violet-400/50',
    image: '/images/regalo-tarjeta.png',
    description:
      'Ancheta + tarjeta personalizada + empaque especial. Lo tiene todo: los snacks que más gustan, un globo temático y la tarjeta que hace llorar de la emoción.',
    deliveryTime: 'Entrega en 24 – 48 h',
    features: ['Ancheta completa', 'Tarjeta personalizada', 'Empaque premium', 'Globo incluido'],
  },
  {
    id: 'kit-taller',
    name: 'Caja Artesanal',
    tag: 'Hecho en taller',
    price: 'Desde $38.000',
    category: 'kits',
    rotate: 'rotate-2',
    gradient: 'from-teal-100 via-pink-50 to-rose-100',
    accentColor: 'text-teal-400/50',
    image: '/images/taller.png',
    description:
      'Caja decorada a mano en taller con materiales de primera: papel, telas, cintas y adornos seleccionados. Cada caja es única e irrepetible.',
    deliveryTime: 'Lista en 24 h',
    features: ['Decoración artesanal', 'Materiales premium', 'Diseño exclusivo', '100 % hecho a mano'],
  },
  {
    id: 'globo-corazon',
    name: 'Globo Personalizado',
    tag: 'Con mensaje',
    price: 'Desde $15.000',
    category: 'globos',
    rotate: '-rotate-2',
    gradient: 'from-red-100 via-pink-50 to-rose-100',
    accentColor: 'text-red-400/50',
    image: '/images/globos.png',
    description:
      'Globo de corazón rojo con el mensaje que quieras escrito a mano. El detalle que convierte cualquier entrega en un momento inolvidable.',
    deliveryTime: 'Listo en 6 h',
    features: ['Globo corazón XL', 'Mensaje personalizado', 'Escrito a mano', 'Inflado incluido'],
  },
  {
    id: 'empaque-especial',
    name: 'Empaque Especial',
    tag: 'Presentación premium',
    price: 'Desde $18.000',
    category: 'kits',
    rotate: 'rotate-1',
    gradient: 'from-rose-100 via-fuchsia-50 to-pink-100',
    accentColor: 'text-fuchsia-400/50',
    image: '/images/empaque.png',
    description:
      'Empaque de regalo premium con papel temático, moño y cinta. Perfecto para elevar cualquier regalo que ya tengas y convertirlo en algo digno de abrir despacio.',
    deliveryTime: 'Listo en 6 h',
    features: ['Papel temático a elección', 'Moño y cinta incluidos', 'Tarjetita de regalo', 'Sellado con washi tape'],
  },
  {
    id: 'ancheta-cumple',
    name: 'Ancheta Cumpleaños',
    tag: '¡Feliz día!',
    price: 'Desde $40.000',
    category: 'anchetas',
    rotate: 'rotate-1',
    gradient: 'from-yellow-100 via-pink-50 to-fuchsia-100',
    accentColor: 'text-yellow-500/50',
    description:
      'La ancheta del cumpleañero: lleva el nombre del festejado en el globo, snacks favoritos, tarjeta con diseño de cumpleaños y decoración de fiesta.',
    deliveryTime: 'Entrega en 24 – 48 h',
    features: ['Nombre en globo', 'Decoración de fiesta', 'Snacks y dulces', 'Tarjeta personalizada'],
  },
  {
    id: 'tarjeta-circular',
    name: 'Tarjeta Circular',
    tag: 'Edición única',
    price: 'Desde $14.000',
    category: 'tarjetas',
    rotate: '-rotate-2',
    gradient: 'from-lime-100 via-pink-50 to-fuchsia-100',
    accentColor: 'text-lime-500/50',
    image: '/images/tarjeta.png',
    description:
      'Tarjeta circular en cartulina premium, diseñada y decorada con marcadores y stickers. El formato circular la hace única y perfecta para colgar o exhibir.',
    deliveryTime: 'Lista en 12 h',
    features: ['Formato circular premium', 'Diseño artesanal', 'Decoración con marcadores', 'Cinta para colgar'],
  },
  {
    id: 'kit-domicilio',
    name: 'Entrega a Domicilio',
    tag: 'Sorpresa en puerta',
    price: 'Incluido en kits',
    category: 'kits',
    rotate: '-rotate-1',
    gradient: 'from-pink-100 via-rose-50 to-fuchsia-100',
    accentColor: 'text-pink-400/50',
    image: '/images/domicilio.png',
    description:
      "¿La sorpresa tiene que llegar sin que el destinatario sospeche nada? Nosotros lo hacemos: empacamos, montamos y entregamos. Vos solo esperás el 'gracias'.",
    deliveryTime: 'Coordinamos el horario',
    features: ['Entrega sorpresa', 'Horario coordinado', 'Discreción garantizada', 'Foto de confirmación'],
  },
  {
    id: 'kit-chat',
    name: 'Pedido por WhatsApp',
    tag: 'Fácil y rápido',
    price: 'Sin costo adicional',
    category: 'kits',
    rotate: 'rotate-2',
    gradient: 'from-green-100 via-pink-50 to-rose-100',
    accentColor: 'text-green-500/50',
    image: '/images/chat.png',
    description:
      'Pedí tu regalo por WhatsApp y te acompañamos en todo el proceso: elegís, personalizás y confirmás en minutos. Sin formularios largos, sin vueltas.',
    deliveryTime: 'Respuesta inmediata',
    features: ['Chat directo', 'Sin formularios', 'Asesoría personalizada', 'Confirmación al instante'],
  },
]

export const CATEGORIES = ['todos', 'anchetas', 'tarjetas', 'kits', 'globos'] as const
