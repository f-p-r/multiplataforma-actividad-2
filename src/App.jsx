import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TestAPI from './pages/TestAPI'  // 🔹 Componente de prueba que creaste

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de prueba para verificar la API */}
        <Route path="/testapi" element={<TestAPI />} />
      </Routes>
    </BrowserRouter>
  )
}
