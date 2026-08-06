import { motion } from 'framer-motion'
import { AtSign, Heart, MessageCircle } from 'lucide-react'
import { sileo } from 'sileo'

import { Badge } from '@/components/ui/badge'
import { LiveStatusBadge } from '@/components/ui/live-status'

import { trackEvent } from '@/lib/analytics'
import { SITE } from '@/lib/site-config'

const IG_POSTS = [1, 2, 3, 4, 5, 6]

/**
 * ID del widget de SnapWidget (https://snapwidget.com) — embebe tu feed real
 * de Instagram sin necesitar la API oficial (que exige backend + refresh de
 * tokens). Gratis en su tier básico.
 *
 * Cómo activarlo:
 * 1. Entrar a snapwidget.com → "Create a Widget" → conectar tu Instagram
 * 2. Elegir el layout tipo grilla, copiar el ID que te dan (después de /embed/)
 * 3. Ponerlo en .env como VITE_SNAPWIDGET_ID=1234567
 *
 * Sin configurar: se muestra un grid de placeholders con el diseño de marca
 * (lo que ya estaba) — el sitio nunca se rompe por falta de esta variable.
 */
const SNAPWIDGET_ID = import.meta.env.VITE_SNAPWIDGET_ID as string | undefined

export function InstagramWidget() {
  function handleOpen() {
    sileo.info({
      title: 'Abriendo Instagram…',
      description: '@toquedeamor.es',
      duration: 2000,
    })
    trackEvent('social_click', { network: 'instagram' })
    window.open(SITE.social.instagram, '_blank', 'noopener,noreferrer')
  }

  return (
    <Widget
      icon={AtSign}
      title='@toquedeamor.es'
      subtitle='Regalos reales, momentos que no se olvidan'
      action={{ label: 'Seguir', onClick: handleOpen }}
    >
      {SNAPWIDGET_ID ? (
        <iframe
          src={`https://snapwidget.com/embed/${SNAPWIDGET_ID}`}
          className='h-64 w-full rounded-lg border-0'
          title='Feed de Instagram'
          loading='lazy'
        />
      ) : (
        // Fallback — placeholder con la estética de marca mientras no haya
        // widget real configurado. Nunca se ve un iframe roto.
        <div className='grid grid-cols-3 gap-1.5'>
          {IG_POSTS.map(i => (
            <div
              key={i}
              className='group relative aspect-square overflow-hidden rounded-lg bg-linear-to-br from-secondary/70 to-accent/70'
            >
              <div className='absolute inset-0 flex items-center justify-center font-display text-2xl italic text-primary/30'>
                {i}
              </div>
              <div className='absolute inset-0 flex items-center justify-center gap-3 bg-ink/0 text-paper opacity-0 transition-all group-hover:bg-ink/40 group-hover:opacity-100'>
                <span className='flex items-center gap-1 text-xs font-semibold'>
                  <Heart className='h-3.5 w-3.5' /> {18 + i * 9}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Widget>
  )
}

export function WhatsAppWidget() {
  function handleOpen() {
    sileo.info({
      title: 'Abriendo WhatsApp…',
      description: 'Te conectamos con el chat de Toque de Amor',
      duration: 2000,
    })
    trackEvent('social_click', { network: 'whatsapp' })
    window.open(SITE.social.whatsapp, '_blank', 'noopener,noreferrer')
  }

  return (
    <Widget
      icon={MessageCircle}
      title='Escríbenos por WhatsApp'
      subtitle='Respondemos rápido — de lunes a sábado'
      action={{ label: 'Abrir chat', onClick: handleOpen }}
      badge={<LiveStatusBadge />}
    >
      <div className='space-y-2 rounded-xl bg-muted/60 p-4'>
        <ChatBubble from='them'>¡Hola! ¿Para qué ocasión es el regalo? 🎁</ChatBubble>
        <ChatBubble from='me'>Es para un cumpleaños, quiero una ancheta sorpresa</ChatBubble>
        <ChatBubble from='them'>¡Perfecto! Te mando opciones en un momento ✨</ChatBubble>
      </div>
    </Widget>
  )
}

/* ── componentes internos ── */

function Widget({
  icon: Icon,
  title,
  subtitle,
  action,
  badge,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
  action?: { label: string; onClick: () => void }
  badge?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='rounded-2xl border border-border bg-card p-6 shadow-sm'
    >
      <div className='mb-4 flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <span className='grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary'>
            <Icon className='h-4.5 w-4.5' />
          </span>
          <div>
            <div className='flex items-center gap-2'>
              <p className='text-sm font-semibold text-ink'>{title}</p>
              {badge}
            </div>
            <p className='text-xs text-muted-foreground'>{subtitle}</p>
          </div>
        </div>
        {action && (
          <button onClick={action.onClick} className='shrink-0'>
            <Badge variant='primary' className='cursor-pointer hover:opacity-90 transition-opacity'>
              {action.label}
            </Badge>
          </button>
        )}
      </div>
      {children}
    </motion.div>
  )
}

function ChatBubble({ from, children }: { from: 'me' | 'them'; children: React.ReactNode }) {
  return (
    <div className={`flex ${from === 'me' ? 'justify-end' : 'justify-start'}`}>
      <span
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs ${
          from === 'me'
            ? 'bg-primary text-primary-foreground rounded-br-sm'
            : 'bg-card text-foreground rounded-bl-sm shadow-sm'
        }`}
      >
        {children}
      </span>
    </div>
  )
}
