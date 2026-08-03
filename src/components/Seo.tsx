import { Helmet } from 'react-helmet-async'
import { SITE } from '@/lib/site-config'

/**
 * ¿Qué es Open Graph?
 * ────────────────────
 * Es un estándar (creado por Facebook, hoy usado por todos: WhatsApp,
 * Instagram, LinkedIn, Twitter/X, Slack, Discord...) que define qué título,
 * descripción e imagen mostrar cuando alguien comparte un link tuyo.
 *
 * Sin esto: compartís el link del catálogo en un grupo de WhatsApp y se ve
 * como texto pelado, sin imagen ni contexto.
 *
 * Con esto: se ve como una tarjeta con foto, título y descripción — la
 * diferencia entre que alguien haga click o lo ignore por completo.
 *
 * Las etiquetas son <meta property="og:..." /> en el <head>. Cada red social
 * las lee cuando alguien pega el link. Twitter/X además tiene su propio
 * formato ("Twitter Card") que replicamos acá por compatibilidad.
 */

interface SeoProps {
  title: string
  description?: string
  path?: string // ej: "/catalogo" — se concatena con SITE.url para el canonical
  image?: string // ruta absoluta, ej: "/images/ancheta.png"
  type?: 'website' | 'article' | 'product'
  noindex?: boolean // usar en páginas que no queremos que Google indexe (ej. 404)
}

export function Seo({
  title,
  description = SITE.defaultDescription,
  path = '/',
  image = SITE.defaultOgImage,
  type = 'website',
  noindex = false,
}: SeoProps) {
  const fullTitle = title === SITE.name ? title : `${title} · ${SITE.name}`
  const url = `${SITE.url}${path}`
  const absoluteImage = image.startsWith('http') ? image : `${SITE.url}${image}`

  return (
    <Helmet>
      {/* Básico */}
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <link rel='canonical' href={url} />
      {noindex && <meta name='robots' content='noindex, nofollow' />}

      {/* Open Graph — Facebook, WhatsApp, Instagram, LinkedIn, Slack... */}
      <meta property='og:type' content={type} />
      <meta property='og:site_name' content={SITE.name} />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={absoluteImage} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:url' content={url} />
      <meta property='og:locale' content={SITE.locale} />

      {/* Twitter Card — mismo propósito, formato propio de X/Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={absoluteImage} />
    </Helmet>
  )
}
