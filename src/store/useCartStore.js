import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useCartStore = create(
  // persist(
  (set, get) => ({
    cart: [],
    // cartCount: 0,
    isLoading: false,
    addToCart: (product) => {
      set((state) => {
        const existInCart = state.cart?.find((item) => item.id === product.id)
        if (existInCart) {
          // increment
          const newUpdatedProduct = state.cart.map((row, i) => {
            if (row.id === product.id) {
              return { ...row, qty: row.qty + 1 }
            } else {
              return row
            }
          })
          return { cart: newUpdatedProduct }
        } else {
          // add to cart
          const newProduct = {
            id: product.id,
            productName: product.name,
            price: product.price,
            qty: 1,
          }
          return {
            cart: [...state.cart, newProduct],
          }
        }
      })
    },
    removeToCart: (product) => {
      set((state) => ({
        cart: [...state.cart.filter((item) => item.id !== product.id)],
        // cartCount: state.cartCount - 1,
      }))
    },
    cartCount: () => {
      return get().cart.length
    },
  })
  // {
  //   name: 'cart', // unique name
  //   storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  // }
  // )
)

export default useCartStore
