import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      // cartCount: 0,
      isLoading: false,
      addToCart: (product) => {
        const newProduct = {
          id: product.id,
          productName: product.title,
          price: product.price,
        }
        set((state) => ({
          cart: [...state.cart, newProduct],
          // cartCount: state.cartCount + 1,
        }))
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
    }),
    {
      name: 'cart', // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)

export default useCartStore
