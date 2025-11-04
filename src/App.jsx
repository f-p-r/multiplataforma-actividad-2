import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'

// Contextos
import { AuthProvider } from './context/AuthContext.jsx'

//  Componentes
import Navbar from './components/Navbar'
import BarraUtilidades from './components/BarraUtilidades.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

//  Páginas
import Landing from './pages/Landing.jsx'
import Novedades from './pages/Novedades.jsx'
import MasVendidos from './pages/MasVendidos.jsx'
import ResultadosBusqueda from './pages/ResultadosBusqueda.jsx'
import Login from './pages/Login.jsx'
import CarritoPage from './pages/CarritoPage.jsx'
import SobreNexus from './pages/SobreNexus.jsx'

function AppWrapper() {
  const [resultados, setResultados] = useState(null)
  const location = useLocation()
  const mostrarBarra = !['/login', '/sobre-nexus'].includes(location.pathname)

  return (
    <>
      <Navbar />
      {mostrarBarra && <BarraUtilidades onResultados={setResultados} />}

      <Routes>
        {/* landing page */}
        <Route path="/" element={<Landing />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/mas-vendidos" element={<MasVendidos />} />

        {/* Página de resultados */}
        <Route
          path="/resultados"
          element={<ResultadosBusqueda resultados={resultados} />}
        />

        {/* Login / registro */}
        <Route path="/login" element={<Login />} />

        {/* 🔒 Ruta protegida para el carrito */}
        <Route
          path="/carrito"
          element={
            <ProtectedRoute>
              <CarritoPage />
            </ProtectedRoute>
          }
        />
        {/* Sobre Nexus  */}
        <Route path="/sobre-nexus" element={<SobreNexus />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
        <BrowserRouter basename={import.meta.env.DEV ? '/' : '/multiplataforma_a2'}>
          <AppWrapper />
        </BrowserRouter>
    </AuthProvider>
  )
}
