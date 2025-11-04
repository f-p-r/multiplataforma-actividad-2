import { useEffect, useState } from 'react'
import { getBooks } from '../services/api'
import LibrosGrid from '../components/LibrosGrid'

export default function Novedades() {
  const [libros, setLibros] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getBooks({ new: 1 })
      .then((data) => setLibros(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container-md my-5 pt-4">
      <h2 className="text-center mb-4">🆕 Novedades</h2>

      {loading && <p className="text-center">Cargando libros...</p>}
      {error && (
        <p className="text-center text-danger">
          Error al cargar los datos: {error}
        </p>
      )}

      {!loading && !error && <LibrosGrid libros={libros} />}
    </div>
  )
}
