'use client'

import { useContext, createContext, ReactNode, useState } from "react";

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: number) => void;
}

const CartContext = createContext({} as CartContextType)


export function CartProvider({ children }: { children: ReactNode }) {
  const [carItems, setCarItems] = useState<CartItem[]>([]) 

  function addToCart(productId: number) {
    setCarItems(state => {
      const productInCart = state.some(item => item.productId === productId)

      if (productInCart) { 
        return state.map(item => {
          if (item.productId === productId) { 
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item
        })
      } else {
        return [...state, {
          productId, 
          quantity: 1
        }]
      }
    })
  }

  return (
    <CartContext.Provider value={{
      items:carItems, 
      addToCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)