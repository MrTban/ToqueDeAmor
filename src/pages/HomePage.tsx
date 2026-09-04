import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { SITE } from '@/lib/site-config'

import { Catalog } from '@/components/sections/Catalog'
import { Contact } from '@/components/sections/Contact'
import { Hero } from '@/components/sections/Hero'
import { Personalization } from '@/components/sections/Personalization'
import { ScrollMarquee } from '@/components/sections/ScrollMarquee'
import { SpecialDates } from '@/components/sections/SpecialDates'
import { Seo } from '@/components/Seo'

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
      <ScrollMarquee />
      <Catalog />
      <Personalization />
      <SpecialDates />
      <Contact />
    </>
  )
}
