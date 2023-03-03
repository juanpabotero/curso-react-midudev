import { lazy, Suspense } from 'react'

import './App.css'
import Page404 from './pages/404.jsx'
import SearchPage from './pages/Search.jsx'

import { Router } from './Router.jsx'
import { Route } from './Route.jsx'

/* import dinámico, para hacer lazy loading, se importa el componente
cuando se ejecute la función */
const LazyHomePage = lazy(() => import('./pages/Home.jsx'))
const LazyAboutPage = lazy(() => import('./pages/About.jsx'))

const appRoutes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

function App() {
  return (
    <main>
      {/* se debe envolver el componente en suspense cuando se usa el
      lazy de react porque hay partes que no van a estar disponibles 
      desde el principio. El fallback se usa para indicar que es lo que
      se quiere mostrar mientras esta disponible el elemento cargado por lazy */}
      <Suspense fallback={null}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
