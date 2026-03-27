import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

import Home from './pages/Home/Home'
import Services from './pages/ServicesPage/ServicesPage'
import ProvidersBrows from './pages/ProvidersPage/ProvidersBrows'
import ProviderProfilePage from './pages/ProviderProfile/ProviderProfilePage'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/services/:categoryId',
      element: <Services />
    },
    {
      path: '/providers/:ptype',
      element: <ProvidersBrows />
    },
    {
      path: '/providerPage/:pid',
      element: <ProviderProfilePage />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App