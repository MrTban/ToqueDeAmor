import { motion } from 'motion/react'
export function SectionHeading({
  eyebrow,
  title,
  description,
  light,
}: {
  eyebrow: string
  title: string
  description?: string
  light?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className='max-w-2xl'
    >
      <div className='flex items-center gap-3'>
        <span className={`h-px w-8 shrink-0 ${light ? 'bg-paper/40' : 'bg-primary/50'}`} />
        <span
          className={`text-sm font-bold uppercase tracking-[0.18em] sm:text-base ${
            light ? 'text-paper/90' : 'text-primary'
          }`}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className={`font-display mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl ${
          light ? 'text-paper' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg ${light ? 'text-paper/70' : 'text-muted-foreground'}`}>{description}</p>
      )}
    </motion.div>
  )
}
