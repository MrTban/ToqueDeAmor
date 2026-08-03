import { useCallback, useRef } from 'react'
import { flushSync } from 'react-dom'

import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export const AnimatedThemeToggler = ({ className }: Props) => {
  const { theme, toggleTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const isDark = theme === 'dark'

  const handleToggle = useCallback(async () => {
    if (!buttonRef.current) return

    await document.startViewTransition(() => {
      flushSync(() => {
        toggleTheme()
      })
    }).ready

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect()

    const x = left + width / 2
    const y = top + height / 2

    const maxRadius = Math.hypot(Math.max(left, window.innerWidth - left), Math.max(top, window.innerHeight - top))

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
      },
      {
        duration: 700,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  }, [toggleTheme])

  return (
    <button ref={buttonRef} onClick={handleToggle} className={cn(className, 'cursor-pointer')}>
      {isDark ? <Sun /> : <Moon />}
    </button>
  )
}
