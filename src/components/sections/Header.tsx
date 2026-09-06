import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarLogo,
  NavBody,
  NavItems,
} from '../ui/resizable-navbar'
import { AnimatedThemeToggler } from '../ui/animated-theme-toggler'
import { LiveStatusBadge } from '../ui/live-status'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Inicio', link: '/' },
    { name: 'Catálogo', link: '/catalogo' },
    { name: 'Fechas especiales', link: '/calendario' },
    { name: 'Contacto', link: '/contacto' },
  ]

  return (
    <Navbar className='-mt-14 top-2'>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />

        <div className='flex items-center gap-4 z-10'>
          <LiveStatusBadge />
          <AnimatedThemeToggler />
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
          {navItems.map((item, idx) => (
            <Link
              to={item.link}
              key={`mobile-link-${idx}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className='relative text-neutral-600 dark:text-neutral-300'
            >
              <span className='block'>{item.name}</span>
            </Link>
          ))}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}
