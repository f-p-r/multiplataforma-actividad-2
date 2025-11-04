// src/components/LibroCard.jsx
import { getCoverImagePath } from '../services/api'

/**
 * Componente LibroCard
 * Versión sin botón de añadir a la cesta
 * (la acción se realiza desde el modal de detalles)
 */
export default function LibroCard({ libro }) {
  return (
    <div
      className="card mx-auto"
      style={{
        cursor: 'pointer',
        maxWidth: '215px',
        border: '1px solid #dee2e6',
        borderRadius: '0.25rem',
        overflow: 'hidden',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
        transition: 'box-shadow 0.2s ease-in-out',
      }}
    >
      <img
        src={getCoverImagePath(libro.id)}
        alt={libro.title}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          margin: 0,
          padding: 0,
          border: 0,
          verticalAlign: 'middle',
        }}
      />

      <div
        className="text-center"
        style={{
          padding: '0.4rem 0.5rem 0.6rem',
          fontFamily: 'Tahoma, sans-serif',
        }}
      >
        <h6 className="mb-3">{libro.title}</h6>

        <p
          className="mb-3 text-muted"
          style={{ fontSize: '0.8rem', lineHeight: '1rem' }}
        >
          {libro.author?.name || 'Autor desconocido'}
        </p>

        <p
          className="fw-semibold mb-2"
          style={{ fontSize: '0.85rem', color: '#212529' }}
        >
          {libro.price?.toFixed(2)} €
        </p>

        <div className="mb-2">
          {libro.new && <span className="badge bg-danger me-1">🆕 Novedad</span>}
          {libro.bestSeller && (
            <span className="badge bg-warning text-dark">🔥 Más vendido</span>
          )}
        </div>
      </div>
    </div>
  )
}
