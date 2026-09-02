import { useRef } from 'react'
import { motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import type { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
  onSelect: (product: Product, rect: DOMRect) => void
}

export function ProductCard({ product: p, onSelect }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  function handleClick() {
    // Capturamos el rect INSTANTÁNEAMENTE antes de cualquier animación.
    // Esto es un DOM read puro — sin overhead de Framer Motion.
    const rect = ref.current?.getBoundingClientRect()
    if (rect) onSelect(p, rect)
  }

  return (
    <motion.div
      ref={ref}
      onClick={handleClick}
      className={`${p.rotate} cursor-pointer`}
      whileHover={{ scale: 1.04, rotate: 0 }}
      // Este transition es SOLO para el hover — no hay layoutId que lo herede
      transition={{ type: 'spring', stiffness: 360, damping: 26 }}
      style={{ borderRadius: 16 }}
    >
      <div className='overflow-hidden border border-border bg-card shadow-sm' style={{ borderRadius: 'inherit' }}>
        <div
          className={`relative flex aspect-4/5 items-center justify-center overflow-hidden bg-linear-to-br ${p.gradient}`}
        >
          {p.image ? (
            <img src={p.image} alt={p.name} className='h-full w-full object-cover' />
          ) : (
            <span className={`font-display select-none text-7xl italic ${p.accentColor}`}>{p.name.charAt(0)}</span>
          )}
          <div className='absolute bottom-3 right-3 rounded-full bg-card/90 px-3 py-1'>
            <span className='text-xs font-semibold text-primary'>{p.price}</span>
          </div>
        </div>

        <div className='p-5'>
          <Badge variant='outline' className='mb-2 capitalize'>
            {p.tag}
          </Badge>
          <h3 className='text-lg font-semibold text-ink'>{p.name}</h3>
          <p className='mt-1 text-xs text-muted-foreground'>{p.deliveryTime}</p>
        </div>
      </div>
    </motion.div>
  )
}
