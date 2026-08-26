import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renderiza el texto correctamente', () => {
    render(<Button>Guardar</Button>)
    expect(screen.getByText('Guardar')).toBeInTheDocument()
  })

  it('aplica la variante primary por defecto', () => {
    render(<Button>Click</Button>)
    const boton = screen.getByRole('button')
    expect(boton.className).toContain('bg-primary')
  })

  it('ejecuta onClick al hacer clic', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={handleClick}>Click</Button>)

    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('está deshabilitado cuando disabled es true', () => {
    render(<Button disabled>Click</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
