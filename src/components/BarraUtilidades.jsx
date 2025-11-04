// src/components/BarraUtilidades.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBooks } from '../services/api'
import BusquedaAvanzadaModal from './BusquedaAvanzadaModal'

export default function BarraUtilidades({ onResultados }) {
  const [showModal, setShowModal] = useState(false)
  const [termino, setTermino] = useState('')
  const navigate = useNavigate()

  // 🔹 Búsqueda rápida
  const handleBuscar = async (e) => {
    e.preventDefault()
    const terminoLimpio = termino.trim()
    if (!terminoLimpio) return

    try {
      const libros = await getBooks({ title: terminoLimpio })
      onResultados(libros)
      setTermino('')
      navigate('/resultados')
    } catch (error) {
      console.error('❌ Error al buscar libros:', error)
    }
  }

  // 🔹 Ir al carrito (ruta protegida)
  const handleCarritoClick = () => {
    navigate('/carrito')
  }

  return (
    <>
      <div className="container-md" style={{ marginTop: '110px' }}>
        <form onSubmit={handleBuscar} className="row g-2 align-items-center">
          {/* Campo de búsqueda */}
          <div className="col-12 col-md-auto">
            <input
              type="search"
              placeholder="Buscar libros..."
              name="termino"
              className="form-control form-control-sm"
              value={termino}
              onChange={(e) => setTermino(e.target.value)}
            />
          </div>

          {/* Botón de búsqueda */}
          <div className="col-12 col-md-auto">
            <button type="submit" className="btn btn-primary btn-sm w-100">
              Buscar
            </button>
          </div>

          {/* Búsqueda avanzada */}
          <div className="col-12 col-md-auto">
            <button
              type="button"
              className="btn btn-link btn-sm text-muted"
              style={{ fontSize: '0.8rem' }}
              onClick={() => setShowModal(true)}
            >
              Búsqueda avanzada
            </button>
          </div>

          {/* Botón carrito */}
          <div className="col-12 col-md-auto ms-auto">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleCarritoClick}
            >
              Mi compra
            </button>
          </div>
        </form>
      </div>

      {/* Modal de búsqueda avanzada */}
      {showModal && (
        <BusquedaAvanzadaModal
          onClose={() => setShowModal(false)}
          onResultados={(libros) => {
            onResultados(libros)
            setShowModal(false)
            navigate('/resultados')
          }}
        />
      )}
    </>
  )
}
