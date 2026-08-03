import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className='border-t border-border bg-ink py-12'>
      <div className='mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 sm:flex-row sm:justify-between lg:px-10'>
        <Link to='/' className='flex items-center'>
          <img src='/images/logo.png' alt='Toque de Amor' className='h-10 w-auto object-contain brightness-0 invert' />
        </Link>

        <ul className='flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-paper/60'>
          <li>
            <Link to='/catalogo' className='hover:text-primary transition-colors'>
              Catálogo
            </Link>
          </li>
          <li>
            <Link to='/#personaliza' className='hover:text-primary transition-colors'>
              Cómo funciona
            </Link>
          </li>
          <li>
            <Link to='/#fechas' className='hover:text-primary transition-colors'>
              Fechas especiales
            </Link>
          </li>
          <li>
            <Link to='/contacto' className='hover:text-primary transition-colors'>
              Contacto
            </Link>
          </li>
        </ul>

        <p className='text-xs text-paper/40 text-center'>
          © {new Date().getFullYear()} Toque de Amor.
          <br className='sm:hidden' /> Regalos hechos con el corazón.
        </p>
      </div>
    </footer>
  )
}
