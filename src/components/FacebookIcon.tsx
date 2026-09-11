interface FacebookIconProps {
  className?: string
}

export function FacebookIcon({ className }: FacebookIconProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      aria-hidden='true'
    >
      <path d='M13.5 21v-8h2.75l.5-3h-3.25V8.05c0-.87.24-1.55 1.6-1.55h1.75V3.8c-.3-.04-1.3-.1-2.45-.1-2.42 0-4.08 1.48-4.08 4.2V10H8v3h2.32v8h3.18Z' />
    </svg>
  )
}
