import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ui/product-card'
import { ProductModal, type ModalSelection } from '@/components/ui/product-modal'
import { ProductCardSkeleton } from '@/components/ui/skeleton'
import { PRODUCTS, type Product } from '@/lib/products'
import { ArrowRight, Balloon, Gift, Package, SquareDashedText } from 'lucide-react'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}
const item = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}
const QUICK_CATEGORIES = [
  { key: 'tarjetas', label: 'Tarjetas', icon: SquareDashedText },
  { key: 'globos', label: 'Globos', icon: Balloon },
  { key: 'anchetas', label: 'Anchetas', icon: Gift },
  { key: 'kits', label: 'Kits', icon: Package },
] as const

export function Catalog() {
  const navigate = useNavigate()
  const [selection, setSelection] = useState<ModalSelection | null>(null)
  const [ready, setReady] = useState(false)
  const featured = PRODUCTS.slice(0, 4)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 700)
    return () => clearTimeout(t)
  }, [])

  function handleSelect(product: Product, rect: DOMRect) {
    setSelection({ product, rect })
  }

  return (
    <section id='catalogo' className='relative bg-background py-28'>
      <div className='mx-auto max-w-7xl px-6 lg:px-10'>
        <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end'>
          <SectionHeading
            eyebrow='Catálogo'
            title='Los favoritos de quienes regalan con intención'
            description='Toca cualquier pieza para ver todos los detalles y empezar a personalizarla.'
          />
          <Button variant='outline' className='shrink-0 cursor-pointer' onClick={() => navigate('/catalogo')}>
            Ver catálogo completo
          </Button>
        </div>

        {/* Acceso rápido por categoría — cada pill linkea al catálogo
            completo ya filtrado (/catalogo?categoria=X), sin pisar el
            botón de arriba que lleva al catálogo sin filtrar. */}
        <div className='mt-6 flex flex-wrap gap-2.5'>
          {QUICK_CATEGORIES.map(({ key, label, icon: Icon }) => (
            <Link
              key={key}
              to={`/catalogo?categoria=${key}`}
              className='group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary'
            >
              <Icon className='h-3.5 w-3.5' />
              {label}
              <ArrowRight className='h-3 w-3 -translate-x-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100' />
            </Link>
          ))}
        </div>

        {/* SIN LayoutGroup — los cards no participan en layout tracking global */}
        {!ready ? (
          <div className='mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={`sk-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.07 }}
              >
                <ProductCardSkeleton />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial='hidden'
            animate='show'
            className='mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'
          >
            {featured.map(p => (
              <motion.div key={p.id} variants={item}>
                <ProductCard product={p} onSelect={handleSelect} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Modal completamente fuera del grid, sin LayoutGroup */}
      <ProductModal selection={selection} onClose={() => setSelection(null)} />
    </section>
  )
}

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
      <Badge variant={light ? 'solid' : 'primary'}>{eyebrow}</Badge>
      <h2 className={`mt-4 text-4xl leading-tight tracking-tight sm:text-5xl ${light ? 'text-paper' : 'text-ink'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg ${light ? 'text-paper/70' : 'text-muted-foreground'}`}>{description}</p>
      )}
    </motion.div>
  )
}
