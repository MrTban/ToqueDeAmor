import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Clock, PhoneMissed, Truck, AlertTriangle, MessageCircle } from 'lucide-react'
import { Seo } from '@/components/Seo'
import { Button } from '@/components/ui/button'

const POLICIES = [
  {
    icon: Clock,
    title: 'Hora de entrega',
    text: 'Coordinamos una hora exacta, pero es importante tener en cuenta el tráfico y los imprevistos que pueden surgir en el camino — la hora puede tener un pequeño margen por esa razón.',
  },
  {
    icon: PhoneMissed,
    title: 'Tiempo de espera en el lugar de entrega',
    text: 'Esperamos un máximo de 15 minutos al momento de entregar. Si no logramos comunicarnos con el destinatario en ese tiempo, el regalo será devuelto y el cliente deberá asumir nuevamente el costo del envío.',
  },
  {
    icon: Truck,
    title: 'Costo de domicilio',
    text: 'El valor del domicilio es adicional al valor del producto — no está incluido en el precio del regalo.',
  },
]

export function PoliticasPage() {
  const navigate = useNavigate()

  return (
    <section className='bg-background pb-28 pt-36'>
      <Seo
        title='Política de entregas y devoluciones'
        description='Conocé cómo manejamos las entregas, los reagendamientos y las devoluciones en Detallar antes de hacer tu pedido.'
        path='/politicas'
      />

      {/* Intro */}
      <div className='mx-auto max-w-3xl px-6 text-center lg:px-10'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className='flex items-center justify-center gap-3'>
            <span className='h-px w-8 bg-primary/50' />
            <span className='text-sm font-bold uppercase tracking-[0.18em] text-primary sm:text-base'>Políticas</span>
            <span className='h-px w-8 bg-primary/50' />
          </div>

          <h1 className='font-display mt-5 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl'>
            Entregas y devoluciones
          </h1>

          <p className='mt-6 text-lg leading-relaxed text-muted-foreground'>
            Como cada pedido se hace a mano y a medida, estas condiciones nos ayudan a cuidar el trabajo de ambos lados.
            Te pedimos leerlas antes de confirmar tu pedido — cualquier duda, escríbenos y te la resolvemos antes de que
            compres.
          </p>
        </motion.div>
      </div>

      {/* Aviso destacado — el punto más importante primero */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className='mx-auto mt-12 max-w-3xl px-6 lg:px-10'
      >
        <div className='flex items-start gap-4 rounded-2xl border border-primary/25 bg-primary/5 p-6'>
          <span className='grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground'>
            <AlertTriangle className='h-5 w-5' />
          </span>
          <div>
            <p className='font-display text-lg font-semibold text-ink'>No hacemos devoluciones de dinero</p>
            <p className='mt-1 text-sm leading-relaxed text-muted-foreground'>
              Sí puedes reservar el valor pagado para otra ocasión, o mover la fecha de entrega — avisando con al menos
              48 horas de anticipación.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Las 4 políticas en detalle */}
      <div className='mx-auto mt-12 max-w-3xl px-6 lg:px-10'>
        <div className='flex flex-col gap-5'>
          {POLICIES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className='flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm'
            >
              <span className='grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary'>
                <p.icon className='h-5 w-5' />
              </span>
              <div>
                <h2 className='font-display text-base font-semibold text-ink sm:text-lg'>{p.title}</h2>
                <p className='mt-1.5 text-sm leading-relaxed text-muted-foreground'>{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA final */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className='mx-auto mt-16 flex max-w-3xl flex-col items-center gap-4 rounded-3xl border border-border bg-secondary/30 px-8 py-12 text-center'
      >
        <span className='grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary'>
          <MessageCircle className='h-5 w-5' />
        </span>
        <h2 className='font-display text-2xl font-semibold text-ink sm:text-3xl'>¿Te quedó alguna duda?</h2>
        <p className='max-w-md text-muted-foreground'>
          Escríbenos antes de pedir — preferimos aclarar todo de una vez a que haya una sorpresa el día de la entrega.
        </p>
        <Button size='lg' onClick={() => navigate('/contacto')}>
          Escríbenos
        </Button>
      </motion.div>
    </section>
  )
}
