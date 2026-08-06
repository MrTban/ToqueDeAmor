import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { sileo } from 'sileo'
import { Seo } from '@/components/Seo'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  const navigate = useNavigate()

  useEffect(() => {
    sileo.warning({
      title: 'Página no encontrada',
      description: 'El enlace puede estar roto o la página ya no existe.',
      duration: 4000,
    })
  }, [])

  return (
    <section className='grid min-h-screen place-items-center px-6 text-center pt-24'>
      {/* noindex: esta página nunca debería aparecer en resultados de Google */}
      <Seo title='Página no encontrada' noindex />
      <div>
        <img src='/images/saludo2.png' alt='Toque de Amor' className='mx-auto h-40 w-auto object-contain' />
        <h1 className='mt-6 text-4xl font-semibold text-ink'>Esta página no existe… todavía</h1>
        <p className='mt-3 text-muted-foreground max-w-sm mx-auto'>
          Pero tenemos regalos para todas las ocasiones. Vuelve al inicio y encuentra el toque perfecto.
        </p>
        <Button className='mt-8' onClick={() => navigate('/')}>
          Volver al inicio
        </Button>
      </div>
    </section>
  )
}
