import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { SITE } from '@/lib/site-config'
import { Hero } from '@/components/sections/Hero'
import { Catalog } from '@/components/sections/Catalog'
import { Personalization } from '@/components/sections/Personalization'
import { SpecialDates } from '@/components/sections/SpecialDates'
import { Contact } from '@/components/sections/Contact'

export function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.replace('#', ''))
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <>
      <Seo title={SITE.name} description={SITE.defaultDescription} path='/' />
      <Hero />
      <Catalog />
      <Personalization />
      <SpecialDates />
      <Contact />
    </>
  )
}
