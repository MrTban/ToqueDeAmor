import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet'

import { useTheme } from '@/hooks/useTheme'

import tenerifeData from '@/lib/tenerife-zonas.json'

const cartoApiKey = import.meta.env.VITE_CARTO_API_KEY

interface MunicipioProperties {
  AREA_GIS?: number
  PERIM_GIS?: number
  COD_MUNI?: string
  NOMBRE: string
  PRICE: number
  COLOR: string
}

export function MapaDomicilios() {
  const { theme } = useTheme()

  // Estilo visual de los polígonos
  const styleZona = (feature: any) => {
    const props = feature?.properties as MunicipioProperties
    return {
      fillColor: props?.COLOR || '#3388ff',
      weight: 1.5,
      opacity: 1,
      color: '#ffffff',
      fillOpacity: 0.65,
    }
  }

  // Interacción y eventos por cada zona
  const onEachFeature = (feature: any, layer: any) => {
    const props = feature.properties as MunicipioProperties
    const { NOMBRE, PRICE } = props

    layer.bindTooltip(
      `<div style="text-align: center; font-family: sans-serif;">
        <strong>${NOMBRE}</strong><br/>
        <span style="color: #059669; font-weight: bold;">${PRICE}€</span>
      </div>`,
      {
        permanent: false,
        direction: 'top',
      },
    )

    layer.on({
      mouseover: (e: any) => {
        const l = e.target
        l.setStyle({
          fillOpacity: 0.85,
          weight: 2.5,
          color: '#333333',
        })
        l.bringToFront()
      },
      mouseout: (e: any) => {
        const l = e.target
        l.setStyle({
          fillOpacity: 0.65,
          weight: 1.5,
          color: '#ffffff',
        })
      },
    })
  }

  const centroTenerife: [number, number] = [28.2915, -16.6291]

  const boundsTenerife: [number, number][] = [
    [27.9, -17.0],
    [28.7, -16.0],
  ]

  return (
    <div className='w-full h-150 rounded-2xl border border-border bg-card p-6 shadow-sm'>
      <MapContainer
        center={centroTenerife}
        zoom={10}
        minZoom={9.5}
        maxZoom={12}
        scrollWheelZoom={true}
        style={{ borderRadius: 10 }}
        className='h-full w-full bg-slate-50 z-0'
        maxBounds={boundsTenerife}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url={`https://{s}.basemaps.cartocdn.com/${theme === 'light' ? 'light' : 'dark'}_all/{z}/{x}/{y}{r}.png/key=${cartoApiKey}`}
        />

        <GeoJSON data={tenerifeData as any} style={styleZona} onEachFeature={onEachFeature} />
      </MapContainer>
    </div>
  )
}
