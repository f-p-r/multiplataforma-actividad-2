// src/hooks/useBooks.js
import { useState, useEffect } from 'react'
import { getBooks } from '../services/api'

/**
 * Hook para cargar libros según filtros.
 * @param {object} filters – objeto de filtros para la carga de libros
 * @returns {object} { books, loading, error, refetch }
 */
export default function useBooks(filters = {}) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchBooks = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getBooks(filters)
      setBooks(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)])

  return { books, loading, error, refetch: fetchBooks }
}
