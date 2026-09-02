import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'sileo'

import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button'

import { initAnalytics, trackPageview } from '@/lib/analytics'
import Pointer from '@/components/Pointer'

export function RootLayout() {
  const location = useLocation()

  // Se ejecuta una sola vez — inyecta gtag.js (o no hace nada si no
  // hay VITE_GA_MEASUREMENT_ID configurado).
  useEffect(() => {
    initAnalytics()
  }, [])

  // Cada cambio de ruta cuenta como un pageview — necesario porque en un
  // SPA la navegación no recarga la página, así que GA no se entera solo.
  useEffect(() => {
    trackPageview(location.pathname + location.search, document.title)
  }, [location])

  return (
    <div className='min-h-screen bg-background font-sans antialiased'>
      <Pointer />

      <Toaster
        position='top-right'
        offset={{ top: 100 }}
        options={{
          styles: {
            title: 'font-display',
          },
        }}
      />

      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />

      <ScrollToTopButton />
    </div>
  )
}
