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

    // requestAnimationFrame: si la navegación ocurrió justo cuando se
    // estaba liberando un scroll-lock (ej: al cerrar el menú mobile),
    // esperamos un frame para que el unlock ya esté aplicado.
    const raf = requestAnimationFrame(() => {
      // behavior:"instant" es intencional y necesario acá — el proyecto
      // tiene `scroll-behavior: smooth` global en <html> (para los anchors
      // internos tipo /#fechas), y esa propiedad CSS también afecta las
      // llamadas a scrollTo() que no especifican behavior explícito. Sin
      // este override, cada cambio de página quedaba ~800ms deslizando
      // suavemente hacia arriba en vez de aparecer ya arriba — lento y
      // parecía "no funcionar" si se revisaba antes de que terminara.
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])

  return null
}
