// src/services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: '/apifpr',
  headers: { 'Content-Type': 'application/json' },
})

// 🔧 Función genérica extendida: acepta body y params
async function apiRequest(endpoint, method = 'GET', body = null, params = null) {
  try {
    const response = await api.request({
      url: endpoint,
      method,
      data: body,
      params, // 👈 permite enviar filtros tipo ?new=1 o ?authorId=2
    })
    return response.data
  } catch (error) {
    console.error(`❌ Error en ${endpoint}:`, error.response?.status, error.response?.data)
    throw error // mejor lanzar el error para que los componentes puedan manejarlo
  }
}

// ------------------------------------------------------
// 📚 Funciones específicas de acceso a la API
// ------------------------------------------------------

// Permite pasar filtros: getBooks({ new: 1 }), getBooks({ categoryId: 2 }), etc.
export const getBooks = (params = {}) => apiRequest('/books', 'GET', null, params)

export const getBookById = (id) => apiRequest(`/books/${id}`)
export const getAuthors = () => apiRequest('/authors')
export const getCategories = () => apiRequest('/categories')
export const getPublishers = () => apiRequest('/publishers')
export const getReviewsByBook = (bookId) => apiRequest(`/reviews/search`, 'GET', null, { bookId })

// 🖼️ Ruta de las portadas
export const getCoverImagePath = (bookId) => `img/portadas/${bookId}.jpg`
