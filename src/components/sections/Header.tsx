import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { LiveStatusBadge } from '@/components/ui/live-status'

const LINKS = [
  { to: '/catalogo', label: 'Catálogo', type: 'route' as const },
  { to: '#personaliza', label: 'Personaliza', type: 'section' as const },
  { to: '/calendario', label: 'Fechas especiales', type: 'route' as const },
  { to: '/contacto', label: 'Contacto', type: 'route' as const },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // El menú ahora es un overlay a pantalla completa — bloqueamos el scroll
  // de fondo mientras está abierto, igual que hacemos con el modal de producto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Cierra el menú Y libera el scroll-lock en el mismo tick del click —
  // a diferencia de depender del useEffect(open) de más abajo, esto
  // garantiza que el overflow ya esté liberado ANTES de que la navegación
  // dispare el scroll-to-top, evitando la carrera que dejaba el scroll
  // en una posición intermedia en vez de 0.
  function closeMenu() {
    document.body.style.overflow = ''
    setOpen(false)
  }

  function goToSection(hash: string) {
    closeMenu()
    if (window.location.pathname !== '/') {
      navigate(`/${hash}`)
      return
    }
    document.getElementById(hash.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border py-3' : 'bg-transparent py-6',
        )}
      >
        <nav className='relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10'>
          <Link to='/' className='flex items-center gap-2 group'>
            <img src='/images/logo.png' alt='Toque de Amor' className='h-10 w-auto object-contain' />
            <span className='font-display text-xl font-semibold tracking-tight text-ink'>Toque De Amor</span>
          </Link>

          <ul className='hidden items-center gap-9 md:flex'>
            {LINKS.map(link =>
              link.type === 'route' ? (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className='text-sm font-medium text-foreground/80 transition-colors hover:text-primary'
                  >
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.to}>
                  <button
                    onClick={() => goToSection(link.to)}
                    className='text-sm font-medium text-foreground/80 transition-colors hover:text-primary cursor-pointer'
                  >
                    {link.label}
                  </button>
                </li>
              ),
            )}
          </ul>

          <div className='hidden items-center gap-3 md:flex'>
            <LiveStatusBadge />
            <Button size='sm' className='cursor-pointer' onClick={() => navigate('/contacto')}>
              Crear mi regalo
            </Button>
          </div>

          <button
            className='grid h-10 w-10 place-items-center rounded-full text-ink md:hidden'
            onClick={() => setOpen(v => !v)}
            aria-label='Abrir menú'
          >
            {open ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </button>
        </nav>
      </motion.header>

      {/*
        El overlay del menú mobile se porta a document.body en vez de vivir
        dentro de <motion.header>. Motivo: Framer Motion anima el header con
        `y` usando un transform CSS, y CUALQUIER transform en un ancestro crea
        un nuevo "containing block" para descendientes con position:fixed —
        eso hacía que el overlay (fixed inset-0) se posicionara relativo al
        header chico en vez de a toda la pantalla, dejándolo pegado arriba y
        con el contenido mal ubicado. Al portarlo fuera, su posición fixed
        vuelve a calcularse contra el viewport real, como corresponde.
      */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='fixed inset-0 z-40 overflow-y-auto bg-background pt-24 md:hidden'
            >
              <ul className='flex flex-col gap-1 px-6 py-4'>
                {LINKS.map(link =>
                  link.type === 'route' ? (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        onClick={closeMenu}
                        className='block w-full rounded-lg px-3 py-3 text-left text-base font-medium text-foreground/80 hover:bg-muted hover:text-primary'
                      >
                        {link.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={link.to}>
                      <button
                        onClick={() => goToSection(link.to)}
                        className='block w-full rounded-lg px-3 py-3 text-left text-base font-medium text-foreground/80 hover:bg-muted hover:text-primary'
                      >
                        {link.label}
                      </button>
                    </li>
                  ),
                )}
                <li className='pt-2'>
                  <Button
                    className='w-full cursor-pointer'
                    onClick={() => {
                      closeMenu()
                      navigate('/contacto')
                    }}
                  >
                    Crear mi regalo
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
