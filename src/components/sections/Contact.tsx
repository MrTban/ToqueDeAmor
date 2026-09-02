import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Mail, AtSign, MessageCircle, ArrowUpRight, Copy } from 'lucide-react'
import { sileo } from 'sileo'
import { SectionHeading } from './Catalog'
import { ContactForm } from './ContactForm'

export function Contact() {
  const navigate = useNavigate()

  return (
    <section id='contacto' className='relative bg-background py-28'>
      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10'>
        <div>
          <SectionHeading
            eyebrow='Contacto'
            title='¿Ya sabes para quién es?'
            description='Cuéntanos la ocasión y te preparamos una propuesta personalizada en menos de 2 horas.'
          />

          <div className='mt-10 space-y-4'>
            <ContactRow icon={Mail} label='toquedeamor.regalos@gmail.com' copyValue='toquedeamor.regalos@gmail.com' />
            <ContactRow icon={MessageCircle} label='WhatsApp disponible' />
            <ContactRow icon={AtSign} label='@toquedeamor.es' copyValue='@toquedeamor.es' />
          </div>

          {/* mascota chat — refuerza el canal WhatsApp */}
          <div className='mt-8 flex items-end gap-4'>
            <img
              src='/images/chat.png'
              alt='Escríbenos por WhatsApp'
              className='h-28 w-auto object-contain drop-shadow-md'
            />
            <button
              onClick={() => navigate('/contacto')}
              className='group mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary cursor-pointer'
            >
              Ver página de contacto completa
              <ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  )
}

function ContactRow({
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
      className={`group flex items-center gap-3 text-foreground/80 ${copyValue ? 'cursor-pointer' : ''}`}
    >
      <span className='grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary'>
        <Icon className='h-4 w-4' />
      </span>
      <span className='text-sm font-medium'>{label}</span>
      {copyValue && (
        <Copy className='h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100' />
      )}
    </div>
  )
}
