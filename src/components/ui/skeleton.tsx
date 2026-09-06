import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden='true' className={cn('shimmer rounded-xl', className)} />
}

export function ProductCardSkeleton() {
  return (
    <div className='overflow-hidden rounded-2xl border border-border bg-card'>
      {/* imagen */}
      <Skeleton className='aspect-4/5 w-full rounded-none' />
      {/* info */}
      <div className='space-y-2.5 p-5'>
        <Skeleton className='h-5 w-20 rounded-full' />
        <Skeleton className='h-5 w-3/4' />
        <Skeleton className='h-4 w-16' />
      </div>
    </div>
  )
}

export function WidgetSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className='rounded-2xl border border-border bg-card p-6 shadow-sm'>
      <div className='flex items-center gap-3'>
        <Skeleton className='h-10 w-10 rounded-full' />
        <div className='flex-1 space-y-2'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-3 w-48' />
        </div>
      </div>
      <div className='mt-5 space-y-3'>
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className='h-10 w-full' />
        ))}
      </div>
    </div>
  )
}
