import { useRef } from 'react'
import { ArrowDown, Sparkles } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const yTagLeft = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yTagRight = useTransform(scrollYProgress, [0, 1], [0, -220])
  const yRibbon = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section
      id='inicio'
      ref={ref}
      className='relative flex min-h-screen items-center overflow-hidden bg-background pt-28'
    >
      {/* fondo: trazo de cinta que recorrerá toda la página */}
      <motion.svg
        style={{ y: yRibbon }}
        className='pointer-events-none absolute inset-0 h-[140%] w-full'
        viewBox='0 0 1440 1400'
        preserveAspectRatio='xMidYMin slice'
      >
        <path className='ribbon-path' d='M -100 180 C 300 80, 500 320, 820 220 S 1300 60, 1600 260' />
      </motion.svg>

      {/* etiquetas de regalo flotantes — elemento de firma */}
      <motion.div
        style={{ y: yTagLeft }}
        className='pointer-events-none absolute left-[6%] top-[22%] hidden rotate-[-8deg] animate-float md:block'
      >
        <GiftTag label='Para Sofía' sub='14 feb' />
      </motion.div>
      <motion.div
        style={{ y: yTagRight }}
        className='pointer-events-none absolute right-[8%] top-[58%] hidden rotate-6 animate-float md:block [animation-delay:1.2s]'
      >
        <GiftTag label='Aniversario' sub='grabado a mano' />
      </motion.div>

      <motion.div
        style={{ opacity, scale }}
        className='relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10'
      >
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant='primary'>
              <Sparkles className='h-3.5 w-3.5' />
              Hecho a mano, pensado para una persona
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className='font-display mt-6 text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl'
          >
            Regalos que
            <span className='block italic text-primary'>llevan su nombre.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className='mt-6 max-w-md text-lg text-muted-foreground'
          >
            Diseñamos y grabamos cada pieza a partir de tu historia: un nombre, una fecha, una frase. Nada de catálogo
            genérico — cada detalle se piensa para alguien en particular.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className='mt-9 flex flex-wrap items-center gap-4'
          >
            <Button
              size='lg'
              className='cursor-pointer'
              onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver catálogo
            </Button>
            <Button
              size='lg'
              className='cursor-pointer'
              variant='outline'
              onClick={() => document.getElementById('personaliza')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Cómo personalizo el mío
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='relative mx-auto aspect-4/5 w-full max-w-md'
        >
          <div className='absolute inset-0 rounded-[2.5rem] bg-secondary/60' />
          <div className='absolute inset-5 rounded-4xl border border-primary/20 bg-card shadow-xl' />
          <div className='absolute inset-0 grid place-items-center'>
            <div className='text-center'>
              <div className='mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg'>
                <Sparkles className='h-8 w-8' />
              </div>
              <p className='font-display mt-5 text-2xl italic text-ink'>
                "Para ti, <br /> siempre"
              </p>
              <p className='mt-2 text-sm text-muted-foreground'>grabado láser · acabado premium</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className='absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground'
      >
        <ArrowDown className='h-5 w-5' />
      </motion.div>
    </section>
  )
}

function GiftTag({ label, sub }: { label: string; sub: string }) {
  return (
    <div className='relative rounded-xl border border-primary/20 bg-card px-4 py-3 shadow-lg'>
      <div className='absolute -top-3 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-card' />
      <p className='font-display text-sm text-ink'>{label}</p>
      <p className='text-xs text-muted-foreground'>{sub}</p>
    </div>
  )
}
