import { motion } from 'motion/react'

import { SectionHeading } from '@/components/SectionHeading'

const STEPS = [
  {
    num: '01',
    title: 'Elige tu regalo',
    text: 'Explora el catálogo y encuentra la ancheta, kit o tarjeta que más le guste a esa persona. Si no lo tienes claro, te asesoramos.',
    image: '/images/taller.png',
    alt: 'Eligiendo el regalo en Toque de Amor',
  },
  {
    num: '02',
    title: 'Cuéntanos la historia',
    text: 'Un nombre, una fecha, una frase. Le agregamos ese detalle que convierte cualquier regalo en algo único e irrepetible.',
    image: '/images/escribir.png',
    alt: 'Personalizando la tarjeta',
  },
  {
    num: '03',
    title: 'Lo empacamos con amor',
    text: 'Cada regalo sale de nuestro taller empacado a mano: moño, cinta, papel y un cuidado que se nota desde afuera.',
    image: '/images/empaque.png',
    alt: 'Empacando el regalo con amor',
  },
  {
    num: '04',
    title: 'Lo llevamos hasta ti',
    text: 'Coordinamos el domicilio para que llegue en el momento justo y la sorpresa sea perfecta. Foto de confirmación incluida.',
    image: '/images/domicilio.png',
    alt: 'Entrega a domicilio Toque de Amor',
  },
]

export function Personalization() {
  return (
    <section id='personaliza' className='relative overflow-hidden bg-secondary/60 py-28'>
      <div className='relative mx-auto max-w-7xl px-6 lg:px-10'>
        <SectionHeading
          eyebrow='¿Cómo funciona?'
          title='Tu regalo, en cuatro pasos'
          description='De la idea a la puerta de tu persona favorita. Nosotros nos encargamos de todo.'
        />

        <div className='mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className='relative rounded-2xl border border-primary/15 bg-card p-6 text-left flex flex-col shadow-sm'
            >
              <span className='font-display text-4xl text-primary'>{step.num}</span>

              {/* imagen mascota — encuadrada al fondo de la card */}
              <div className='my-4 flex justify-center'>
                <img src={step.image} alt={step.alt} className='h-32 w-auto object-contain drop-shadow-lg' />
              </div>

              <h3 className='text-lg text-ink'>{step.title}</h3>
              <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{step.text}</p>

              {i < STEPS.length - 1 && (
                <div className='absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-paper/15 lg:block' />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
