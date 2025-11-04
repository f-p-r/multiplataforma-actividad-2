import { createContext, useContext, useState } from 'react'

const CarritoContext = createContext()

export const useCarrito = () => useContext(CarritoContext)

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([])

  const addToCart = (book) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === book.id)
      if (existing) {
        // si ya existe, aumenta la cantidad
        return prev.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...book, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => setItems([])

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  return (
    <CarritoContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CarritoContext.Provider>
  )
}
