// src/hooks/useFetch.js
import { useEffect, useState } from 'react'
import axios from 'axios'

/**
 * Hook reutilizable para realizar peticiones GET con Axios.
 * @param {string} endpoint - Ruta del recurso (por ejemplo, '/books')
 * @param {boolean} [autoLoad=true] - Si true, carga automáticamente al montar el componente.
 * @returns {object} { data, loading, error, refetch }
 */
export default function useFetch(endpoint, autoLoad = true) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const baseURL = '/apidog' // ⚙️ usa el proxy definido en vite.config.js

  async function fetchData() {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${baseURL}${endpoint}`)
      setData(response.data)
    } catch (err) {
      console.error(`❌ Error al cargar ${endpoint}:`, err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (autoLoad) fetchData()
  }, [endpoint])

  return { data, loading, error, refetch: fetchData }
}
