// src/components/CarritoModal.jsx
import { useEffect, useState } from 'react'
import './CarritoModal.css'

export default function CarritoModal({ onClose }) {
  const [carrito, setCarrito] = useState([])

  // 🔹 Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem('carrito')
    if (saved) setCarrito(JSON.parse(saved))
  }, [])

  // 🔹 Calcular total
  const total = carrito
    .reduce((sum, item) => sum + item.price * (item.cantidad || 1), 0)
    .toFixed(2)

  const actualizarStorage = (nuevoCarrito) => {
    setCarrito(nuevoCarrito)
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito))
  }

  const cambiarCantidad = (id, delta) => {
    const actualizado = carrito.map((item) =>
      item.id === id
        ? { ...item, cantidad: Math.max(1, (item.cantidad || 1) + delta) }
        : item
    )
    actualizarStorage(actualizado)
  }

  const eliminarLibro = (id) => {
    const actualizado = carrito.filter((item) => item.id !== id)
    actualizarStorage(actualizado)
  }

  const vaciarCarrito = () => {
    if (window.confirm('¿Seguro que deseas vaciar el carrito?')) {
      localStorage.removeItem('carrito')
      setCarrito([])
    }
  }

  const tramitarPedido = () => {
    alert('🛍️ Gracias por tu compra. Tu pedido ha sido tramitado correctamente.')
    localStorage.removeItem('carrito')
    setCarrito([])
    onClose()
  }

  return (
    <>
      <div
        className="modal-backdrop fade show"
        style={{ backgroundColor: '#0009', zIndex: 1040 }}
        onClick={onClose}
      ></div>

      <div className="modal d-block" tabIndex="-1" role="dialog" style={{ zIndex: 1050 }}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content p-4 position-relative">
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3"
              onClick={onClose}
            ></button>

            <h5 className="mb-3 text-center">🛒 Mi compra</h5>

            {carrito.length === 0 ? (
              <p className="text-center text-muted mb-0">
                No hay libros en tu carrito.
              </p>
            ) : (
              <>
                <div className="list-group mb-3">
                  {carrito.map((item, i) => (
                    <div
                      key={i}
                      className="list-group-item d-flex justify-content-between align-items-center"
                      style={{ gap: '1rem' }}
                    >
                      {/* Info del libro */}
                      <div style={{ flex: 1 }}>
                        <strong>{item.title}</strong>
                        <br />
                        <small className="text-muted">
                          {item.author?.name || 'Autor desconocido'}
                        </small>
                      </div>

                      {/* Controles de cantidad */}
                      <div
                        className="d-flex flex-column align-items-center"
                        style={{ minWidth: '60px' }}
                      >
                        <button
                          className="btn btn-sm btn-outline-secondary py-0 mb-1"
                          onClick={() => cambiarCantidad(item.id, +1)}
                        >
                          +
                        </button>
                        <span style={{ fontSize: '0.9rem' }}>
                          {item.cantidad || 1}
                        </span>
                        <button
                          className="btn btn-sm btn-outline-secondary py-0 mt-1"
                          onClick={() => cambiarCantidad(item.id, -1)}
                        >
                          −
                        </button>
                      </div>

                      {/* Importe y eliminar */}
                      <div className="text-end" style={{ minWidth: '90px' }}>
                        <span style={{ display: 'block' }}>
                          {(item.price * (item.cantidad || 1)).toFixed(2)} €
                        </span>
                        <button
                          className="btn btn-sm btn-link text-danger p-0 mt-1"
                          onClick={() => eliminarLibro(item.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <h6>Total:</h6>
                  <h6>{total} €</h6>
                </div>

                <div
                  className="text-center mt-4 d-flex justify-content-center"
                  style={{ gap: '2.5rem' }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={tramitarPedido}
                    disabled={carrito.length === 0}
                  >
                    Tramitar pedido
                  </button>

                  <button className="btn btn-danger" onClick={vaciarCarrito}>
                    Vaciar carrito
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
