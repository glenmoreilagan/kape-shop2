import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const initialState = {
  cart: [],
  // cartCount: 0,
  isLoading: false,
}
const useCartStore = create(
  // persist(
  (set, get) => ({
    ...initialState,
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
    updateCartQuantity: (product, action) => {
      set((state) => {
        const updatedCartItem = state.cart?.map((row) => {
          if (row.id === product.id) {
            switch (action) {
              case 'increment':
                return { ...row, qty: row.qty + 1 }
                break
              case 'decrement':
                return { ...row, qty: row.qty - 1 }
                break

              default:
                return row
                break
            }
          } else {
            return row
          }
        })

        return { cart: updatedCartItem }
      })
    },
    resetCart: () => set({ ...initialState }),
  })
  // {
  //   name: 'cart', // unique name
  //   storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  // }
  // )
)

export default useCartStore
