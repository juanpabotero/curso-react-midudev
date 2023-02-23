import { useContext } from 'react'
import { CartContext } from '../context/cart.jsx'

export const useCart = () => {
  const context = useContext(CartContext)

  /* Que devuelva undefined quiere decir que estoy usando el customHook
  en un sitio que no puedo porq esa parte de la aplicación no esta
  envuelta en un provider */
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
