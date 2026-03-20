import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

import Home from './pages/Home/Home'
import Services from './pages/ServicesPage/ServicesPage'
import Providers from './pages/ProvidersPage/ProvidersBrows'

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
      element: <Providers />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
