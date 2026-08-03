/**
 * Analytics — envoltorio liviano sobre Google Analytics 4 (gtag.js).
 *
 * Diseñado para que el sitio funcione EXACTAMENTE igual con o sin la
 * variable de entorno configurada. Si no hay VITE_GA_MEASUREMENT_ID, todas
 * las funciones son no-ops silenciosos — no rompe nada, no ensucia la
 * consola, simplemente no manda datos.
 *
 * Cómo activarlo:
 * 1. Crear una cuenta en https://analytics.google.com (gratis)
 * 2. Crear una "propiedad" → te da un Measurement ID tipo "G-XXXXXXXXXX"
 * 3. Crear un archivo `.env` en la raíz del proyecto (junto a package.json)
 *    con la línea: VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 * 4. Reiniciar `npm run dev` (las env vars de Vite solo se leen al arrancar)
 *
 * En local/desarrollo normalmente NO vas a tener la variable seteada —
 * así evitás ensuciar tus propias métricas con tu tráfico de pruebas.
 */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

let initialized = false

/** Inyecta el script de gtag.js en el <head>. Se llama una sola vez. */
export function initAnalytics() {
  if (!GA_ID || initialized || typeof window === 'undefined') return
  initialized = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  // send_page_view: false — nosotros mandamos los pageviews manualmente
  // por ruta (ver trackPageview), porque en un SPA la carga inicial de
  // gtag.js no sabe de las navegaciones internas de React Router.
  window.gtag('config', GA_ID, { send_page_view: false })
}

/** Registra un cambio de página — se llama en cada navegación de React Router. */
export function trackPageview(path: string, title?: string) {
  if (!GA_ID || typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  })
}

/** Registra un evento custom — clicks en WhatsApp, envío de formulario, etc. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!GA_ID || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}
