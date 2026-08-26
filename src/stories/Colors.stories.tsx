import type { Meta, StoryObj } from '@storybook/react-vite'

const colors = ['background', 'foreground', 'card', 'primary', 'secondary', 'muted', 'accent', 'border', 'ink', 'paper']

const ColorPalette = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
    {colors.map(color => (
      <div key={color} style={{ textAlign: 'center' }}>
        <div
          style={{
            height: '80px',
            borderRadius: '8px',
            backgroundColor: `var(--${color})`,
            border: '1px solid var(--border)',
          }}
        />
        <p style={{ fontSize: '12px', marginTop: '4px' }}>{color}</p>
      </div>
    ))}
  </div>
)

const meta: Meta<typeof ColorPalette> = {
  title: 'Design Tokens/Colors',
  component: ColorPalette,
}

export default meta
type Story = StoryObj<typeof ColorPalette>

export const Palette: Story = {}
