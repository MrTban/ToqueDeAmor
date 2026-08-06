import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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

  function goToSection(hash: string) {
    setOpen(false)
    if (window.location.pathname !== '/') {
      navigate(`/${hash}`)
      return
    }
    document.getElementById(hash.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
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
                  className='text-sm font-medium text-foreground/80 transition-colors hover:text-primary'
                >
                  {link.label}
                </button>
              </li>
            ),
          )}
        </ul>

        <div className='hidden items-center gap-3 md:flex'>
          <LiveStatusBadge />
          <Button size='sm' onClick={() => navigate('/contacto')}>
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            // Overlay sólido a pantalla completa — antes esto empujaba el
            // contenido de la página hacia abajo en vez de taparlo, y se
            // veían mezclados los botones del Hero con los del menú.
            className='fixed inset-0 z-40 overflow-y-auto bg-background pt-24 md:hidden'
          >
            <ul className='flex flex-col gap-1 px-6 py-4'>
              {LINKS.map(link =>
                link.type === 'route' ? (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
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
                  className='w-full'
                  onClick={() => {
                    setOpen(false)
                    navigate('/contacto')
                  }}
                >
                  Crear mi regalo
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
