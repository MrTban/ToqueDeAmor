import { useEffect, useState, useTransition } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'
import { sileo } from 'sileo'

import { Seo } from '@/components/Seo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { HorizontalScroller } from '@/components/ui/horizontal-scroller'
import { ProductCard } from '@/components/ui/product-card'
import { ProductModal, type ModalSelection } from '@/components/ui/product-modal'
import { ProductCardSkeleton } from '@/components/ui/skeleton'

import { CATEGORIES, PRODUCTS, type Product } from '@/lib/products'
import { cn } from '@/lib/utils'

type Category = (typeof CATEGORIES)[number]

function isValidCategory(value: string | null): value is Category {
  return !!value && (CATEGORIES as readonly string[]).includes(value)
}

export function CatalogPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selection, setSelection] = useState<ModalSelection | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [, startTransition] = useTransition()

  // La categoría activa vive en la URL (?categoria=tarjetas), no en un
  // useState local — así el filtro es compartible, sobrevive un refresh,
  // y otras páginas (como la home) pueden linkear directo a un filtro ya
  // aplicado. Si el query param no existe o trae un valor inválido, cae
  // a "todos" sin romper nada.
  const rawParam = searchParams.get('categoria')
  const active: Category = isValidCategory(rawParam) ? rawParam : 'todos'

  // Si alguien entra con un valor inválido en la URL (?categoria=asdf),
  // lo limpiamos para que la URL quede consistente con lo que se ve.
  useEffect(() => {
    if (rawParam && !isValidCategory(rawParam)) {
      setSearchParams({}, { replace: true })
    }
  }, [rawParam]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 750)
    return () => clearTimeout(t)
  }, [])

  const filtered = active === 'todos' ? PRODUCTS : PRODUCTS.filter(p => p.category === active)

  function changeCategory(cat: Category) {
    setIsLoading(true)
    startTransition(() => {
      if (cat === 'todos') {
        setSearchParams({}, { replace: false })
      } else {
        setSearchParams({ categoria: cat }, { replace: false })
      }
    })
    setTimeout(() => {
      setIsLoading(false)
      const count = cat === 'todos' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat).length
      if (count === 0) {
        sileo.info({
          title: 'Sin productos por ahora',
          description: `Todavía no tenemos regalos en "${cat}" — prueba otra categoría.`,
          duration: 3000,
        })
      }
    }, 500)
  }

  function handleSelect(product: Product, rect: DOMRect) {
    setSelection({ product, rect })
  }

  return (
    <section className='bg-background pb-28 pt-36'>
      <Seo
        title='Catálogo'
        description='Explora anchetas, tarjetas y kits personalizados para cada ocasión. Regalos hechos a mano, listos para sorprender.'
        path='/catalogo'
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
            {PRODUCTS.length} diseños disponibles ahora
          </Badge>
          <h1 className='mt-4 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl'>
            Anchetas y regalos listos para sorprender
          </h1>
          <p className='mt-4 text-lg text-muted-foreground'>
            Toca cada regalo para ver todos los detalles. Lo personalizamos todo para ti.
          </p>
        </motion.div>

        {/* filtros — degradados dinámicos + empujoncito insinúan que hay más para scrollear */}
        <HorizontalScroller className='mt-10' contentClassName='flex gap-2 pb-2' showArrows={false}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => changeCategory(cat)}
              className={cn(
                'shrink-0 rounded-full px-5 py-2 text-sm font-semibold capitalize transition-colors cursor-pointer',
                active === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-secondary',
              )}
            >
              {cat}
            </button>
          ))}
        </HorizontalScroller>

        {/* grid — SIN LayoutGroup, sin layoutId */}
        <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={`sk-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <ProductCardSkeleton />
                </motion.div>
              ))
            : filtered.map(p => <ProductCard key={p.id} product={p} onSelect={handleSelect} />)}
        </div>

        {/* CTA */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className='mt-20 flex flex-col items-center gap-4 rounded-3xl border border-primary/15 bg-secondary/30 px-8 py-12 text-center'
          >
            <h2 className='text-2xl text-ink sm:text-3xl'>¿No encuentras lo que buscas?</h2>
            <p className='max-w-md text-muted-foreground'>
              Cuéntanos la ocasión y lo preparamos desde cero con ese toque especial.
            </p>
            <Button size='lg' onClick={() => navigate('/contacto')}>
              Pedir mi regalo personalizado
            </Button>
          </motion.div>
        )}
      </div>

      {/* Modal fuera del grid — sin LayoutGroup */}
      <ProductModal selection={selection} onClose={() => setSelection(null)} />
    </section>
  )
}
