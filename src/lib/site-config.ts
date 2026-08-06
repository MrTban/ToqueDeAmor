/**
 * Configuración central del sitio.
 *
 * Todo lo que toca SEO (meta tags, Open Graph, sitemap, JSON-LD) lee de acá.
 * Si cambia el dominio, el nombre de marca, o las redes sociales, se edita
 * UNA sola vez en este archivo y se propaga a todo el sitio.
 *
 * ⚠️ Reemplazar SITE_URL por el dominio real antes de publicar — el sitemap.xml,
 * los tags canonical y los og:url dependen de este valor.
 */
export const SITE = {
  name: 'Toque De Amor',
  tagline: 'Somos La Excusa Perfecta Para Sorprender',
  url: 'https://www.toquedeamor.store',
  defaultDescription:
    'Somos La Excusa Perfecta Para Sorprender. Diseñamos piezas únicas para cada historia — anchetas, tarjetas y kits hechos a mano.',
  locale: 'es_ES',
  themeColor: '#fe0175',

  social: {
    instagram: 'https://www.instagram.com/toquedeamor.es',
    whatsapp: 'https://wa.me/34634130642',
  },

  // Usados en el schema.org LocalBusiness (JSON-LD) — ayuda a aparecer
  // en Google Maps / búsquedas locales si aplica.
  business: {
    telephone: '+34-634-13-06-42',
    addressLocality: 'Tenerife, España',
    addressCountry: 'ES',
    priceRange: '€€',
  },

  // Imagen por defecto para compartir en redes (Open Graph / Twitter Card).
  // Debe ser absoluta (no relativa) y idealmente 1200×630px.
  defaultOgImage: '/og-cover.png',
} as const
