import LibrosGrid from '../components/LibrosGrid'

export default function ResultadosBusqueda({ resultados }) {
  if (!resultados) {
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
      <LibrosGrid libros={resultados} />
    </div>
  )
}
