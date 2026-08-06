import { sileo } from 'sileo'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { trackEvent } from '@/lib/analytics'

/** Simula el envío a un servidor — reemplazar por la llamada real a la API. */
function fakeSubmit(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 1200))
}

export function ContactForm({ className }: { className?: string }) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value
    const occasion = (form.elements.namedItem('occasion') as HTMLInputElement)?.value

    // Evento de conversión — el más importante del sitio: alguien pidió cotización.
    trackEvent('generate_lead', {
      form: 'contact',
      occasion: occasion || 'sin especificar',
    })

    // sileo.promise encadena automáticamente loading → success/error
    sileo.promise(fakeSubmit(), {
      loading: {
        title: 'Enviando tu mensaje…',
        description: 'Un segundo, ya casi llega.',
      },
      success: {
        title: '¡Mensaje enviado! 💌',
        description: name
          ? `Gracias ${name}, te respondemos en menos de 2 horas.`
          : 'Te respondemos en menos de 2 horas.',
      },
      error: {
        title: 'No pudimos enviar tu mensaje',
        description: 'Inténtalo de nuevo o escríbenos directo por WhatsApp.',
      },
    })

    form.reset()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-3xl border border-border bg-card p-8 shadow-sm ${className ?? ''}`}
    >
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
        <Field label='Nombre'>
          <Input name='name' placeholder='Tu nombre' required />
        </Field>
        <Field label='WhatsApp o Email'>
          <Input name='contact' placeholder='Tu WhatsApp o email' required />
        </Field>
      </div>
      <div className='mt-5'>
        <Field label='¿Para qué ocasión es?'>
          <Input name='occasion' placeholder='Cumpleaños, San Valentín, Aniversario…' />
        </Field>
      </div>
      <div className='mt-5'>
        <Field label='Cuéntanos tu idea'>
          <Textarea
            name='message'
            placeholder='Nombre de la persona, fecha especial, algo que le guste… cualquier detalle nos ayuda a hacer algo único.'
          />
        </Field>
      </div>
      <Button type='submit' size='lg' className='mt-6 w-full sm:w-auto cursor-pointer'>
        Enviar mensaje 💝
      </Button>
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className='block'>
      <span className='mb-2 block text-sm font-medium text-foreground/80'>{label}</span>
      {children}
    </label>
  )
}
