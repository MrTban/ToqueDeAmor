import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Al cambiar de ruta (ej: /catalogo → /contacto), React Router no resetea
 * el scroll — a diferencia de una navegación de página completa tradicional,
 * el navegador conserva la posición donde estabas. Este componente corrige
 * eso: sube al tope en cada cambio de path.
 *
 * Si la navegación incluye un hash (ej: "/#fechas"), NO forzamos el scroll
 * a 0 — dejamos que la página de destino (HomePage) maneje el scroll hacia
 * esa sección específica, para no pisarle la lógica.
 *
 * Se monta una sola vez en RootLayout, dentro del contexto del Router.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
