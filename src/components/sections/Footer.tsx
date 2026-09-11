import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

import { FacebookIcon } from '../FacebookIcon'
import { InstagramIcon } from '../InstagramIcon'
import { TikTokIcon } from '../TikTokIcon'

const navigation = [
  { label: 'Catálogo', href: '/catalogo' },
  { label: 'Calendario', href: '/calendario' },
  { label: 'Contacto', href: '/contacto' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Políticas', href: '/politicas' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/toquedeamor.es',
    icon: <InstagramIcon className='size-6' />,
  },
  {
    label: 'Tiktok',
    href: 'https://www.tiktok.com/@toquedeamor.es',
    icon: <TikTokIcon className='size-6' />,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/Toquedeamorregalos',
    icon: <FacebookIcon className='size-6' />,
  },
]

export function Footer() {
  return (
    <footer className='relative overflow-hidden border-t border-border/60 bg-secondary/60'>
      {/* Ambient glow */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl'
      />

      <div className='relative mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-16'>
        {/* Main content */}
        <div className='flex flex-col items-center text-center'>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className='group inline-flex flex-col items-center gap-3'>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  rotate: -3,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                }}
                className='flex items-center justify-center rounded-xl'
              >
                <img src='/images/toque-de-amor.png' alt='Toque de Amor' className='h-20 w-auto object-contain' />
              </motion.div>
            </span>
          </motion.div>

          {/* Navigation */}
          <nav
            aria-label='Navegación del footer'
            className='mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3'
          >
            {navigation.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.08 + index * 0.04,
                  duration: 0.3,
                }}
              >
                <Link
                  to={item.href}
                  className='group relative text-sm font-bold text-muted-foreground transition-colors hover:text-foreground'
                >
                  {item.label}

                  <span className='absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full' />
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className='my-10 h-px w-full border-t border-dashed border-border/70' />

        {/* Bottom */}
        <div className='flex flex-col items-center justify-between gap-5 text-sm md:flex-row'>
          {/* Copyright */}
          <p className='text-center md:text-start text-muted-foreground italic font-bold'>
            © {new Date().getFullYear()} Toque de Amor.
            <br className='sm:hidden' /> All rights reserved.
          </p>

          {/* Socials */}
          <div className='flex items-center gap-2'>
            {socialLinks.map(social => {
              const Icon = social.icon

              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target='_blank'
                  rel='noreferrer'
                  aria-label={social.label}
                  whileHover={{
                    y: -2,
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className='flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground'
                >
                  {Icon}
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
