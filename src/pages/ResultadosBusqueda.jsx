// src/pages/ResultadosBusqueda.jsx
import useBooks from '../hooks/useBooks'
import LibrosGrid from '../components/LibrosGrid'

export default function ResultadosBusqueda({ resultados: initialResultados, filtros }) {
  // Si se pasa initialResultados y no se necesitan filtros dinámicos, podemos usarla directamente
  const { books: libros, loading, error } = filtros
    ? useBooks(filtros)
    : { books: initialResultados, loading: false, error: null }

  if (!libros || libros.length === 0) {
    return (
      <div className="container-md my-5 pt-4">
        <h2 className="text-center mb-4">Sin resultados</h2>
        <p className="text-center text-muted">
          Usa la búsqueda avanzada para encontrar tus libros.
        </p>
      </div>
    )
  }

  return (
    <div className="container-md my-5 pt-4">
      <h2 className="text-center mb-4">Resultados de la búsqueda</h2>
      {loading && <p className="text-center">Cargando resultados…</p>}
      {error && (
        <p className="text-center text-danger">
          Error al cargar los datos: {error.message || error}
        </p>
      )}
      {!loading && !error && <LibrosGrid libros={libros} />}
    </div>
  )
}
