import { useEffect } from 'react'
import { getBooks, getCategories } from '../services/api'

export default function TestAPI() {
  useEffect(() => {
    async function cargarDatos() {
      const libros = await getBooks()
      const categorias = await getCategories()
      console.log('📚 Libros:', libros)
      console.log('🏷️ Categorías:', categorias)
    }
    cargarDatos()
  }, [])

  return (
    <div className="container my-5 text-center">
      <h2>Prueba de conexión con la API</h2>
      <p>Abre la consola para ver los datos cargados.</p>
    </div>
  )
}
