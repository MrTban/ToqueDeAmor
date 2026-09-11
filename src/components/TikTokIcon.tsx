interface TikTokIconProps {
  className?: string
}

export function TikTokIcon({ className }: TikTokIconProps) {
  return (
    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className} aria-hidden='true'>
      <path
        d='M15.5 4.5C15.5 6.71 17.29 8.5 19.5 8.5V11.5C17.99 11.5 16.58 11.06 15.4 10.31V16.25C15.4 19.43 12.82 22 9.65 22C6.47 22 4 19.43 4 16.25C4 13.07 6.47 10.5 9.65 10.5C9.94 10.5 10.22 10.52 10.5 10.56V13.67C10.23 13.57 9.94 13.5 9.65 13.5C8.13 13.5 7 14.73 7 16.25C7 17.77 8.13 19 9.65 19C11.17 19 12.4 17.77 12.4 16.25V2H15.5V4.5Z'
        fill='currentColor'
      />
    </svg>
  )
}
