// src/services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: '/apidog',
  headers: { 'Content-Type': 'application/json' }
})

// Función genérica (por si quieres logs o manejo centralizado)
async function apiRequest(endpoint, method = 'GET', body = null) {
  try {
    const response = await api.request({
      url: endpoint,
      method,
      data: body
    })
    return response.data
  } catch (error) {
    console.error(`❌ Error en ${endpoint}:`, error.response?.status, error.response?.data)
    return null
  }
}

// Funciones específicas
export const getBooks = () => apiRequest('/books')
export const getBookById = (id) => apiRequest(`/books/${id}`)
export const getAuthors = () => apiRequest('/authors')
export const getCategories = () => apiRequest('/categories')
export const getPublishers = () => apiRequest('/publishers')
export const getReviewsByBook = (bookId) => apiRequest(`/reviews/search/?bookId=${bookId}`)

// Portadas (rutas relativas sin '/' inicial)
export const getCoverImagePath = (bookId) => `portadas/${bookId}.jpg`
