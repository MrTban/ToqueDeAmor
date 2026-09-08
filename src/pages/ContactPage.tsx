import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Copy, Mail, Sparkles } from 'lucide-react'
import { sileo } from 'sileo'

import { Seo } from '@/components/Seo'
import { InstagramWidget, WhatsAppWidget } from '@/components/sections/SocialWidgets'

import { Badge } from '@/components/ui/badge'
import { BusinessHoursCard } from '@/components/ui/live-status'
import { WidgetSkeleton } from '@/components/ui/skeleton'
import { MapaDomicilios } from '@/components/MapaDomicilios'

export function ContactPage() {
  const [widgetsReady, setWidgetsReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setWidgetsReady(true), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className='bg-background pt-36 pb-28'>
      <Seo
        title='Contacto'
        description='Cuéntanos para quién es y lo preparamos con amor. Escríbenos por WhatsApp, Instagram o el formulario.'
        path='/contacto'
      />
      <div className='mx-auto max-w-7xl px-6 lg:px-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='max-w-2xl'
        >
          <Badge variant='primary'>
            <Sparkles className='h-3.5 w-3.5' />
            Domicilios en Tenerife
          </Badge>
          <h1 className='mt-4 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl'>
            Consulta el precio de tu domicilio
          </h1>
          <p className='mt-4 text-lg text-muted-foreground'>
            Busca la zona en la que deseas recibir tu domicilio y consulta su precio
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='my-14'
        >
          <MapaDomicilios />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='max-w-2xl'
        >
          <Badge variant='primary'>
            <Sparkles className='h-3.5 w-3.5' />
            Hablemos de tu regalo
          </Badge>
          <h1 className='mt-4 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl'>
            Cuéntanos para quién es y lo preparamos con amor
          </h1>
          <p className='mt-4 text-lg text-muted-foreground'>Escríbenos por WhatsApp o Instagram.</p>
        </motion.div>
        <div className='mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.85fr]'>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <WhatsAppWidget />

            <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <InfoCard icon={Mail} label='toquedeamor.regalos@gmail.com' copyValue='toquedeamor.regalos@gmail.com' />
              <BusinessHoursCard />
            </div>
          </motion.div>

          {/* widgets — skeleton mientras cargan */}
          <div className='flex flex-col gap-6'>
            {!widgetsReady ? (
              <>
                <WidgetSkeleton rows={6} />
                <WidgetSkeleton rows={3} />
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='flex flex-col gap-6'
              >
                <InstagramWidget />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoCard({
  icon: Icon,
  label,
  copyValue,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  copyValue?: string
}) {
  function handleCopy() {
    if (!copyValue) return
    navigator.clipboard.writeText(copyValue).then(() => {
      sileo.success({
        title: '¡Copiado!',
        description: copyValue,
        duration: 2200,
      })
    })
  }

  return (
    <div
      onClick={copyValue ? handleCopy : undefined}
      className={`group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 ${
        copyValue ? 'cursor-pointer hover:border-primary/30' : ''
      } transition-colors`}
    >
      <span className='grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary'>
        <Icon className='h-4 w-4' />
      </span>
      <span className='text-sm font-medium text-foreground/80 flex-1'>{label}</span>
      {copyValue && (
        <Copy className='h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100' />
      )}
    </div>
  )
}
