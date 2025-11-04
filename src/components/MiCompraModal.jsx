import { useCarrito } from '../context/CarritoContext'

export default function MiCompraModal({ onClose }) {
  const { items, removeFromCart, clearCart, total } = useCarrito()

  return (
    <>
      <div
        className="modal-backdrop fade show"
        style={{
          backgroundColor: '#0009',
          backdropFilter: 'blur(2px)',
          zIndex: 1040
        }}
        onClick={onClose}
      ></div>

      <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content p-4 position-relative rounded-3 shadow-lg">
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3"
              onClick={onClose}
            ></button>

            <h5 className="mb-3 text-center">🛒 Mi compra</h5>

            {items.length === 0 ? (
              <p className="text-center text-muted mb-0">
                No hay productos en la cesta.
              </p>
            ) : (
              <>
                <ul className="list-group mb-3">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{item.title}</strong>
                        <div className="text-muted small">
                          {item.author.name} — {item.price.toFixed(2)} €
                        </div>
                      </div>
                      <div>
                        <span className="me-3">x{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeFromCart(item.id)}
                        >
                          ✖
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">
                    <strong>Total:</strong> {total.toFixed(2)} €
                  </h6>
                  <div>
                    <button
                      className="btn btn-outline-secondary me-2"
                      onClick={clearCart}
                    >
                      Vaciar
                    </button>
                    <button className="btn btn-primary" onClick={onClose}>
                      Cerrar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
