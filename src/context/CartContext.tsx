import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Product } from "../types/product"

type CartItem = { product: Product; quantity: number }

type CartContextType = {
  items: CartItem[]
  totalCount: number
  totalPrice: number
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

const CART_KEY = "cart_items"
const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({children}: {children: ReactNode}) {
    const [items, setItems] = useState<CartItem[]>(() => {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  })
}
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Product } from "../types/product"

type CartItem = { product: Product; quantity: number }

type CartContextType = {
  items: CartItem[]
  totalCount: number
  totalPrice: number
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

const CART_KEY = "cart_items"
const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  })

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(items))
    }, [items])

  function addToCart(product: Product) {
    setItems((prev) => {
      const exists = prev.find((i) => i.product.id === product.id)
      if (exists) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  function removeFromCart(id: number) {
    setItems((prev) => prev.filter((i) => i.product.id !== id))
  }

  function clearCart() {
    setItems([])
  }

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, totalCount, totalPrice, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart باید داخل CartProvider استفاده بشه")
  return ctx
}