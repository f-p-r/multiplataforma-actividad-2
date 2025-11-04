// src/components/LibrosGrid.jsx
import { useState } from 'react'
import LibroCard from './LibroCard'
import LibroModal from './LibroModal'


/**
 * Muestra una cuadrícula de libros utilizando LibroCard.
 */
export default function LibrosGrid({ libros }) {
  const [selectedBookId, setSelectedBookId] = useState(null)

  if (!libros || libros.length === 0) {
    return (
      <p className="text-center text-muted my-4">
        No se han encontrado libros.
      </p>
    )
  }

  return (
    <div className="row gy-4">
      {libros.map((libro) => (
        <div
          key={libro.id}
          className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
          onClick={() => setSelectedBookId(libro.id)}
        >
          <LibroCard libro={libro} />
        </div>
      ))}
      {/* Modal del libro seleccionado */}
      {selectedBookId && (
        <LibroModal
          bookId={selectedBookId}
          onClose={() => setSelectedBookId(null)}
        />
      )}
    </div>
  )
}
