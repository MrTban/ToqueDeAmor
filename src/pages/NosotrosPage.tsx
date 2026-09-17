import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Clock, Heart, PackageCheck, CalendarClock } from 'lucide-react'
import { Seo } from '@/components/Seo'
import { Button } from '@/components/ui/button'

import { SITE } from '@/lib/site-config'
import { SparklesText } from '@/components/ui/sparkles-text'

const GALLERY = [
  {
    src: '/images/saludo.png',
    alt: 'Dándote la bienvenida a Detallar',
    caption: 'Siempre lista para ayudarte a encontrar el regalo perfecto',
  },
  {
    src: '/images/taller.png',
    alt: 'Armando piezas en el taller',
    caption: 'Cada pieza sale de nuestro propio taller, a mano',
  },
  {
    src: '/images/escribir.png',
    alt: 'Escribiendo una tarjeta personalizada',
    caption: 'Escribimos cada tarjeta como si fuera para alguien que conocemos',
  },
  {
    src: '/images/empaque.png',
    alt: 'Empacando un regalo con cuidado',
    caption: 'El empaque se cuida tanto como lo que hay adentro',
  },
  {
    src: '/images/domicilio.png',
    alt: 'Llevando el regalo a domicilio',
    caption: 'Y lo llevamos hasta la puerta, en el horario acordado',
  },
  {
    src: '/images/chat.png',
    alt: 'Respondiendo por WhatsApp',
    caption: 'Siempre a un mensaje de distancia si tienes dudas',
  },
]

const VALUES = [
  {
    icon: Sparkles,
    title: '100% personalizado',
    text: 'No vendemos catálogo genérico. Cada pedido se piensa para una persona puntual, con su nombre, su fecha, su historia.',
  },
  {
    icon: Clock,
    title: 'Tiempo, no apuro',
    text: 'Lo hecho a mano no se puede apurar sin perder calidad. Por eso pedimos agendar con anticipación — vale la pena la espera.',
  },
  {
    icon: Heart,
    title: 'Con cariño de verdad',
    text: 'No es una frase de marketing: quien arma tu pedido le pone la misma dedicación que le pondría a un regalo propio.',
  },
  {
    icon: PackageCheck,
    title: 'Del taller a tu puerta',
    text: 'Diseñamos, armamos y entregamos nosotros mismos — sin intermediarios que le bajen el cuidado al proceso.',
  },
]

export function NosotrosPage() {
  const navigate = useNavigate()

  return (
    <section className='bg-background pb-28 pt-36'>
      <Seo
        title='Nosotros'
        description='Conocé la historia detrás de Detallar — una tienda creativa que arma cada regalo a mano, pensado para una persona puntual.'
        path='/nosotros'
      />

      {/* Intro — descripción de marca al comienzo, como pediste */}
      <div className='mx-auto max-w-4xl px-6 text-center lg:px-10'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className='flex items-center justify-center gap-3'>
            <span className='h-px w-8 bg-primary/50' />
            <span className='text-sm font-bold uppercase tracking-[0.18em] text-primary sm:text-base'>Nosotros</span>
            <span className='h-px w-8 bg-primary/50' />
          </div>

          <h1 className='font-display mt-5 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl'>
            Somos {SITE.name}, y hacemos regalos como
            <span className='italic text-primary'> quien los va a recibir </span>
            nos importa de verdad.
          </h1>

          <p className='mt-6 text-lg leading-relaxed text-muted-foreground'>
            Nacimos de la idea de que un regalo genérico dice poco. En {SITE.name} diseñamos, armamos y entregamos
            anchetas, tarjetas y detalles personalizados a mano — pensando siempre en una persona puntual, no en un
            catálogo. Cada nombre grabado, cada mensaje escrito y cada lazo atado los hacemos nosotros, con tiempo, con
            cariño y con un <span className='text-primary font-bold'>{SITE.name}</span>
          </p>
        </motion.div>
      </div>

      {/* Callout — "Recuerda" — el bloque más importante de la página */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className='mx-auto mt-16 max-w-4xl px-6 lg:px-10'
      >
        <div className='relative overflow-hidden rounded-3xl bg-ink px-8 py-12 text-center sm:px-14 sm:py-16'>
          <div className='pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl' />
          <div className='pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl' />

          <span className='relative inline-flex items-center gap-1.5 rounded-full bg-paper/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-paper/80'>
            Recuerda
          </span>

          <p className='font-display relative mt-5 text-2xl font-semibold italic text-paper sm:text-3xl'>
            Somos una tienda creativa.
          </p>

          <p className='relative mx-auto mt-4 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg'>
            Por lo tanto, todo es personalizado y necesitamos tiempo para su elaboración — y que quede perfecto.
          </p>

          <div className='relative mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground'>
            <CalendarClock className='h-4 w-4' />
            Agenda con tiempo
          </div>
        </div>
      </motion.div>

      {/* Valores — le da estructura y "vida" a la página con íconos */}
      <div className='mx-auto mt-24 max-w-6xl px-6 lg:px-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className='mx-auto max-w-2xl text-center'
        >
          <div className='flex items-center justify-center gap-3'>
            <span className='h-px w-8 bg-primary/50' />
            <span className='text-sm font-bold uppercase tracking-[0.18em] text-primary'>Cómo trabajamos</span>
          </div>
          <h2 className='font-display mt-4 text-3xl font-semibold text-ink sm:text-4xl'>
            Lo que no se nota a simple vista
          </h2>
        </motion.div>

        <div className='mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className='rounded-2xl border border-border bg-card p-6 shadow-sm'
            >
              <span className='grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary'>
                <v.icon className='h-5 w-5' />
              </span>
              <h3 className='font-display mt-4 text-lg font-semibold text-ink'>{v.title}</h3>
              <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{v.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Galería de mascotas — varias acciones distintas, como pediste */}
      <div className='mx-auto mt-24 max-w-6xl px-6 lg:px-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className='mx-auto max-w-2xl text-center'
        >
          <div className='flex items-center justify-center gap-3'>
            <span className='h-px w-8 bg-primary/50' />
            <span className='text-sm font-bold uppercase tracking-[0.18em] text-primary'>Detrás de cada pedido</span>
          </div>
          <h2 className='font-display mt-4 text-3xl font-semibold text-ink sm:text-4xl'>
            Así armamos tu regalo, paso a paso
          </h2>
        </motion.div>

        <div className='mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5'>
          {GALLERY.map((g, i) => (
            <motion.figure
              key={g.src}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className='group overflow-hidden rounded-2xl border border-border bg-secondary/30'
            >
              <div className='flex aspect-square items-center justify-center overflow-hidden'>
                <img
                  src={g.src}
                  alt={g.alt}
                  className='h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105'
                />
              </div>
              <figcaption className='border-t border-border/70 bg-card px-3 py-2.5 text-center text-xs text-muted-foreground sm:text-sm'>
                {g.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* CTA final */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className='mx-auto mt-24 flex max-w-3xl flex-col items-center gap-4 px-6 text-center lg:px-10'
      >
        <h2 className='font-display text-2xl font-semibold text-ink sm:text-3xl'>¿Le ponemos fecha a tu regalo?</h2>
        <p className='max-w-md text-muted-foreground'>
          Cuéntanos qué tienes en mente y armamos algo pensado para esa persona — con el tiempo justo para que quede
          perfecto.
        </p>
        <div className='mt-2 flex flex-wrap justify-center gap-3'>
          <Button size='lg' onClick={() => navigate('/contacto')}>
            Escríbenos
          </Button>
          <Button size='lg' variant='outline' onClick={() => navigate('/catalogo')}>
            Ver catálogo
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
