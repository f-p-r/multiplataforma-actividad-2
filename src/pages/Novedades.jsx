// src/pages/Novedades.jsx
import useBooks from '../hooks/useBooks'
import LibrosGrid from '../components/LibrosGrid'

export default function Novedades() {
  const { books: libros, loading, error } = useBooks({ new: 1 })

  return (
    <div className="container-md my-5 pt-4">
      <h2 className="text-center mb-4">🆕 Novedades</h2>

      {loading && <p className="text-center">Cargando libros...</p>}
      {error && (
        <p className="text-center text-danger">
          Error al cargar los datos: {error.message || error}
        </p>
      )}

      {!loading && !error && <LibrosGrid libros={libros} />}
    </div>
  )
}
