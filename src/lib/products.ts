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
    id: 'tarjeta-agradecimiento-flores',
    name: 'Tarjeta Redonda de Agradecimiento',
    tag: 'Popular',
    price: '7€',
    category: 'tarjetas',
    rotate: 'rotate-1',
    gradient: 'from-orange-100 via-rose-50 to-red-100',
    accentColor: 'text-orange-500/50',
    image: '/images/productos/tarjeta-flores.webp',
    description:
      'Tarjeta circular personalizada (19x19 cm) ideal para expresar gratitud. Incluye mensaje dedicado a mano y hermosos doodles de rosas y corazones en tonos cálidos.',
    deliveryTime: 'Entrega en 24-48h',
    features: [
      'Tamaño 19cm x 19cm',
      'Mensaje y colores a elección',
      'Doodles sencillos incluidos',
      'Ideal para acompañar regalos',
    ],
  },
  {
    id: 'tarjeta-cumpleanos',
    name: 'Tarjeta Redonda Cumpleaños Especial',
    tag: 'Recomendado',
    price: '7€',
    category: 'tarjetas',
    rotate: '-rotate-2',
    gradient: 'from-pink-100 via-purple-50 to-yellow-100',
    accentColor: 'text-pink-500/50',
    description:
      'Tarjeta de cumpleaños de 19x19 cm con diseño colorido, letra lettering, globos, regalo y dibujo estilo Flork. Perfecta para sorprender al amor de tu vida.',
    deliveryTime: 'Entrega en 24-48h',
    image: '/images/productos/tarjeta-cumple.webp',
    features: [
      'Tamaño 19cm x 19cm',
      'Mensaje personalizado',
      'Dibujo sencillo Flork/Doodle',
      'Paleta de colores a elección',
    ],
  },
  {
    id: 'tarjeta-hermano-personaje',
    name: 'Tarjeta Cumpleaños con Personaje',
    tag: 'Edición Especial',
    price: '7€',
    category: 'tarjetas',
    rotate: 'rotate-2',
    gradient: 'from-amber-100 via-yellow-50 to-red-100',
    accentColor: 'text-amber-500/50',
    description:
      'Tarjeta personalizada de 19x19 cm con la ilustración de tus personajes favoritos (Bart y Lisa Simpson). Incluye lazo decorativo y dedicatoria especial.',
    deliveryTime: 'Entrega en 24-48h',
    image: '/images/productos/tarjeta-hermano.webp',
    features: [
      'Tamaño 19cm x 19cm',
      'Ilustración de personaje (+1€)',
      'Lazo rojo decorativo',
      'Texto y colores personalizables',
    ],
  },
  {
    id: 'globo-burbuja-hello-kitty',
    name: 'Globo Burbuja Con Luz LED',
    tag: 'Burbuja con luz LED',
    price: '19€',
    category: 'globos',
    rotate: 'rotate-1',
    gradient: 'from-pink-100 via-rose-50 to-fuchsia-100',
    accentColor: 'text-pink-500/50',
    description:
      'Globo burbuja transparente personalizado con la carita ilustrada de Hello Kitty, luces LED integradas, moño en cinta y globitos de relleno en tonos fucsia y naranja.',
    deliveryTime: 'Entrega en 24-48h',
    image: '/images/productos/globo-burbuja-hello-kitty.webp',
    features: [
      'Globo burbuja transparente',
      'Incluye luces LED (+2€)',
      'Ilustración de personaje',
      'Incluye palo, moño y globitos de relleno',
      'Tarjeta con recomendaciones de cuidado',
    ],
  },
  {
    id: 'globo-burbuja-cumpleanos-margarita',
    name: 'Globo Burbuja Feliz Cumpleaños Rosas',
    tag: 'Burbuja',
    price: '17€',
    category: 'globos',
    rotate: '-rotate-2',
    gradient: 'from-amber-100 via-red-50 to-pink-100',
    accentColor: 'text-amber-500/50',
    description:
      'Globo burbuja transparente decorado a mano con lettering "Feliz Cumpleaños", doodles de rosas, un gran moño dorado y globitos de relleno en tonos cálidos.',
    deliveryTime: 'Entrega en 24-48h',
    image: '/images/productos/globo-burbuja-cumpleanos.webp',
    features: [
      'Globo burbuja transparente',
      'Se puede agregar luces LED (+2€)',
      'Mensaje corto y color a elección',
      'Doodles y detalles hechos a mano',
      'Moño de cinta elegante y globitos',
      'Tarjeta con recomendaciones de cuidado',
    ],
  },
  {
    id: 'globo-burbuja-fortnite-peely',
    name: 'Globo Burbuja Peely',
    tag: 'Burbuja',
    price: '17€',
    category: 'globos',
    rotate: 'rotate-2',
    gradient: 'from-yellow-100 via-amber-50 to-orange-100',
    accentColor: 'text-yellow-500/50',
    description: 'Globo burbuja transparente, personalizado con personaje, lettering y moño blanco esponjoso.',
    deliveryTime: 'Entrega en 24-48h',
    image: '/images/productos/globo-burbuja-fortnite.webp',
    features: [
      'Globo burbuja transparente',
      'Se puede agregar luces LED (+2€)',
      'Dibujo/Personaje temático',
      'Incluye palo de altura y moño blanco',
      'Tarjeta con recomendaciones de cuidado',
    ],
  },
  {
    id: 'globo-metalizado-corazon-princesa',
    name: 'Globo Metalizado Corazón Fondo Pintado',
    tag: 'Metalizado Pintura',
    price: '11€',
    category: 'globos',
    rotate: 'rotate-1',
    gradient: 'from-pink-100 via-rose-50 to-orange-100',
    accentColor: 'text-pink-500/50',
    description:
      'Globo metalizado en forma de corazón con base de pintura a mano, lettering "Para una Princesa muy Hermosa", flores decorativas y moño multicapa en cinta.',
    deliveryTime: 'Entrega en 24-48h',
    image: '/images/productos/globo-metalizado-corazon.webp',
    features: [
      'Forma de Corazón o Estrella',
      'Acabado con base de pintura a mano',
      'Mensaje y lettering personalizado',
      'Incluye palo de altura y moño',
    ],
  },
  {
    id: 'globo-metalizado-corazon-feliz-cumple',
    name: 'Globo Metalizado Corazón Sencillo',
    tag: 'Metalizado Sencillo',
    price: '9€',
    category: 'globos',
    rotate: '-rotate-2',
    gradient: 'from-slate-100 via-gray-50 to-zinc-100',
    accentColor: 'text-slate-500/50',
    description:
      'Globo metalizado plateado en forma de corazón con lettering manual "Feliz Cumple", flores sencillas en los bordes y moño de cinta satinada plateada.',
    deliveryTime: 'Entrega en 24-48h',
    image: '/images/productos/globo-metalizado-feliz-cumple.webp',
    features: [
      'Forma de Corazón o Estrella',
      'Con vinial adhesivo valor final de 12€',
      'Diseño directo sobre metalizado',
      'Mensaje corto personalizado',
      'Incluye palo de altura y moño',
    ],
  },
  {
    id: 'globo-metalizado-personaje-up-carl',
    name: 'Globo Metalizado con Dibujo',
    tag: 'Metalizado Dibujo',
    price: '30€',
    category: 'globos',
    rotate: 'rotate-2',
    gradient: 'from-emerald-100 via-teal-50 to-green-100',
    accentColor: 'text-emerald-500/50',
    description:
      'Globo metalizado verde con la ilustración detallada del Sr. Carl Fredricksen (UP) pintado a mano. Un regalo único para fanáticos de Disney/Pixar.',
    deliveryTime: 'Entrega en 7-8 días',
    image: '/images/productos/globo-metalizado-personaje.webp',
    features: [
      'Ilustración de personaje a mano',
      'Pedido mínimo con 1 semana de anticipación',
      'Forma de Estrella, Corazón o Redondo',
      'Incluye palo de altura y moño',
    ],
  },
]

export const CATEGORIES = [
  'todos',
  'tarjetas',
  'globos',
  'carteles',
  'velas',
  'esferas',
  'cestas',
  'lapiceros',
  'bolsas',
  'empaques',
  'anchetas',
  'kits',
] as const
