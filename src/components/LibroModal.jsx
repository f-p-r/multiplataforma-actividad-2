// src/components/LibroModal.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getBookById, getCoverImagePath } from '../services/api'

export default function LibroModal({ bookId, onClose }) {
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!bookId) return
    setLoading(true)
    getBookById(bookId)
      .then((data) => setBook(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [bookId])

  const handleAddToCart = () => {
    if (!user) {
      alert('Debes iniciar sesión para añadir libros al carrito.')
      onClose()
      navigate('/login')
      return
    }

    const stored = JSON.parse(localStorage.getItem('carrito')) || []
    const exists = stored.some((item) => item.id === book.id)

    if (exists) {
      alert('Este libro ya está en tu carrito.')
      return
    }

    const updated = [...stored, { ...book, cantidad: 1 }]
    localStorage.setItem('carrito', JSON.stringify(updated))
    alert(`"${book.title}" añadido al carrito.`)
  }

  if (!bookId) return null

  return (
    <>
      {/* Fondo oscuro */}
      <div
        className="modal-backdrop fade show"
        style={{ backgroundColor: '#0009', zIndex: 1040 }}
        onClick={onClose}
      ></div>

      {/* Ventana modal */}
      <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content p-4 position-relative">
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3"
              onClick={onClose}
            ></button>

            {loading && <p className="text-center">Cargando...</p>}
            {error && <p className="text-danger text-center">Error: {error}</p>}
            {book && (
              <div className="row g-4">
                {/* Imagen del libro */}
                <div className="col-md-5 text-center">
                  <img
                    src={getCoverImagePath(book.id)}
                    alt={book.title}
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: '350px', objectFit: 'cover' }}
                  />
                </div>

                {/* Información del libro */}
                <div className="col-md-7 text-start">
                  <h4 className="mb-2">{book.title}</h4>
                  <p className="mb-1">
                    <strong>Autor:</strong> {book.author.name}
                  </p>
                  <p className="mb-1">
                    <strong>Editorial:</strong> {book.publisher.name}
                  </p>
                  <p className="mb-1">
                    <strong>Categoría:</strong> {book.category.name}
                  </p>
                  <p className="mb-1">
                    <strong>Año:</strong> {book.year}
                  </p>
                  <p className="mb-1">
                    <strong>ISBN:</strong> {book.isbn}
                  </p>

                  <h5 className="mt-3 text-primary">
                    Precio: {book.price.toFixed(2)} €
                  </h5>

                  <div className="mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={handleAddToCart}
                    >
                      Añadir a la cesta
                    </button>
                  </div>

                  <hr className="my-3" />

                  <p className="mt-3">{book.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
