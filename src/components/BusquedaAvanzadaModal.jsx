import { useEffect, useState } from 'react'
import { getBooks, getAuthors, getCategories, getPublishers } from '../services/api'

export default function BusquedaAvanzadaModal({ onClose, onResultados }) {
  const [filters, setFilters] = useState({
    title: '',
    authorId: '',
    categoryId: '',
    publisherId: '',
    yearFrom: '',
    yearTo: '',
    priceMin: '',
    priceMax: ''
  })

  const [autores, setAutores] = useState([])
  const [categorias, setCategorias] = useState([])
  const [editoriales, setEditoriales] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([getAuthors(), getCategories(), getPublishers()])
      .then(([a, c, p]) => {
        setAutores(a)
        setCategorias(c)
        setEditoriales(p)
      })
      .catch((err) => setError(err.message))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '')
      )
      const data = await getBooks(params)
      onResultados(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="modal-backdrop fade show" style={{ backgroundColor: '#0009' }}></div>
      <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content p-4">
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3"
              onClick={onClose}
            ></button>

            <h5 className="mb-3 text-center">🔎 Búsqueda avanzada</h5>

            <form onSubmit={handleSubmit} className="row g-3 mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  name="title"
                  placeholder="Título contiene..."
                  className="form-control"
                  value={filters.title}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <select
                  name="authorId"
                  className="form-select"
                  value={filters.authorId}
                  onChange={handleChange}
                >
                  <option value="">Autor</option>
                  {autores.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <select
                  name="categoryId"
                  className="form-select"
                  value={filters.categoryId}
                  onChange={handleChange}
                >
                  <option value="">Categoría</option>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <select
                  name="publisherId"
                  className="form-select"
                  value={filters.publisherId}
                  onChange={handleChange}
                >
                  <option value="">Editorial</option>
                  {editoriales.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  name="yearFrom"
                  placeholder="Año desde"
                  className="form-control"
                  value={filters.yearFrom}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  name="yearTo"
                  placeholder="Año hasta"
                  className="form-control"
                  value={filters.yearTo}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  step="0.01"
                  name="priceMin"
                  placeholder="Precio mín."
                  className="form-control"
                  value={filters.priceMin}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  step="0.01"
                  name="priceMax"
                  placeholder="Precio máx."
                  className="form-control"
                  value={filters.priceMax}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 text-center">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Buscando...' : 'Buscar'}
                </button>
              </div>
            </form>

            {error && <p className="text-danger text-center">Error: {error}</p>}
          </div>
        </div>
      </div>
    </>
  )
}
