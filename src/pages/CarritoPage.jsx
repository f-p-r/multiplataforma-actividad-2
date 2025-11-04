// src/pages/CarritoPage.jsx
import { useEffect, useState } from 'react'

export default function CarritoPage() {
  const [carrito, setCarrito] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('carrito')
    if (saved) setCarrito(JSON.parse(saved))
  }, [])

  const total = carrito.reduce((sum, item) => sum + item.price, 0).toFixed(2)

  const vaciarCarrito = () => {
    if (window.confirm('¿Seguro que deseas vaciar el carrito?')) {
      localStorage.removeItem('carrito')
      setCarrito([])
    }
  }

  return (
    <div className="container" style={{ marginTop: '130px', maxWidth: '700px' }}>
      <div className="card shadow p-4">
        <h4 className="text-center mb-4">🛒 Mi compra</h4>

        {carrito.length === 0 ? (
          <p className="text-center text-muted">No hay libros en tu carrito.</p>
        ) : (
          <>
            <div className="list-group mb-3">
              {carrito.map((item, i) => (
                <div
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.title}</strong>
                    <br />
                    <small className="text-muted">
                      {item.author?.name || 'Autor desconocido'}
                    </small>
                  </div>
                  <span>{item.price.toFixed(2)} €</span>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <h6>Total:</h6>
              <h6>{total} €</h6>
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-primary me-4">Tramitar pedido</button>
              <button className="btn btn-danger" onClick={vaciarCarrito}>
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
