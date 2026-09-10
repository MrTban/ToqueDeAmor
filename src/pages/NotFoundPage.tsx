import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

import { ArrowLeft } from 'lucide-react'

import { Seo } from '@/components/Seo'
import { Button } from '@/components/ui/button'
import { NoiseTexture } from '@/components/ui/noise-texture'
import { MorphingText } from '@/components/ui/morphing-text'

export function NotFoundPage() {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      <Seo title='Página no encontrada' noindex />
      <NoiseTexture />

      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity }}
        className='absolute inset-0 bg-linear-to-br from-primary/20 via-background to-accent/20'
      />

      <div className='relative z-10 text-center max-w-xl px-6'>
        <img src='/images/saludo2.png' alt='Toque de Amor' className='mx-auto h-40 w-auto object-contain' />

        <MorphingText className='font-display text-primary mb-6' texts={['404', 'error']} />

        <h2 className='text-3xl font-semibold mb-4'>Página no encontrada</h2>
        <p className='text-muted-foreground mb-8'>Vuelve al inicio y encuentra el toque perfecto.</p>
        <Link to='/'>
          <Button size='lg' className='cursor-pointer'>
            Volver al inicio
            <ArrowLeft className='ml-2 h-4 w-4' />
          </Button>
        </Link>
      </div>
    </section>
  )
}
