import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

import Home from './pages/Home/Home'
import Services from './pages/ServicesPage/ServicesPage'
import ProvidersBrows from './pages/ProvidersPage/ProvidersBrows'
import ProviderProfilePage from './pages/ProviderProfile/ProviderProfilePage'
import LogInPage from './pages/AuthPage/LogInPage'
import RegisterPage from './pages/AuthPage/RegisterPage'
import BecomeProvider from './pages/BecomeProvider/BecomeProvider'
import Dashboard from './pages/Dashboard/Dashboard'

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
    },
    {
      path: '/login',
      element: <LogInPage />
    },
    {
      path: '/register',
      element: <RegisterPage />
    },
    {
      path: '/become-provider',
      element: <BecomeProvider />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App