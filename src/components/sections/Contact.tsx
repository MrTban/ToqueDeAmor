import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

import { SectionHeading } from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'

export function Contact() {
  const navigate = useNavigate()

  return (
    <section id='contacto' className='relative bg-background py-28'>
      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-[1fr_1fr] lg:px-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className='mt-10 space-y-4'
        >
          <SectionHeading
            eyebrow='Contacto'
            title='¿Ya sabes para quién es?'
            description='Cuéntanos la ocasión y te preparamos una propuesta personalizada en menos de 2 horas.'
          />

          {/* mascota chat — refuerza el canal WhatsApp */}
          <div className='mt-8 flex flex-col lg:flex-row lg:items-end gap-4'>
            <img
              src='/images/chat.png'
              alt='Escríbenos por WhatsApp'
              className='h-44 w-auto object-contain drop-shadow-md'
            />
            <Button variant='primary' onClick={() => navigate('/contacto')} className='group shrink-0 cursor-pointer'>
              Ver página de contacto completa
              <ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
