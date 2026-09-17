import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { RootLayout } from '@/layouts/RootLayout'

import { HomePage } from '@/pages/HomePage'
import { CatalogPage } from '@/pages/CatalogPage'
import { ContactPage } from '@/pages/ContactPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { CalendarPage } from '@/pages/CalendarPage'
import { PoliticasPage } from '@/pages/PoliticasPage'
import { NosotrosPage } from '@/pages/NosotrosPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/catalogo' element={<CatalogPage />} />
          <Route path='/contacto' element={<ContactPage />} />
          <Route path='/calendario' element={<CalendarPage />} />
          <Route path='/nosotros' element={<NosotrosPage />} />
          <Route path='/politicas' element={<PoliticasPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
