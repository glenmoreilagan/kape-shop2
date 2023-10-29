import newAxios from '@/lib/new-axios'
import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'

const usePurchaseStore = create((set, get) => ({
  items: [],
  setItems: async (item) => {
    // set((state) => ({ isLoading: false, items: [...state.items, item] }))

    set((state) => {
      // if (!item) return { items: [] }
      let newItem = []
      const filterItem = state.items?.find((row) => row?.id === item?.id)
      // console.log(state.items)

      if (item?.id) {
        if (filterItem) {
          newItem = state.items.map((row) => {
            if (row.id === filterItem.id) {
              const newQty = Number(row.quantity) + 1
              return { ...row, quantity: newQty, price: row.price * newQty }
            }

            return row
          })
        } else {
          newItem = [...state.items, item]
        }
      }

      return {
        items: newItem,
      }
    })
  },
  setNewItemQty: async (newQty, item) => {
    set((state) => {
      return {
        items: state.items.map((row) => {
          if (row.id === item.id) {
            let newPrice = Number(newQty) * Number(item.original_price)
            return { ...row, quantity: newQty, price: newPrice }
          }

          return row
        }),
      }
    })
  },
  setIncrementOrDecrementItemQty: async (action, item) => {
    set((state) => {
      return {
        items: state.items.map((row) => {
          let newQty = action === 'increment' ? row.quantity + 1 : row.quantity - 1
          if (row.id === item.id) {
            let newPrice = Number(newQty) * Number(item.original_price)
            return { ...row, quantity: newQty, price: newPrice }
          }

          return row
        }),
      }
    })
  },
  removeItem: async (params) => {
    set((state) => ({ items: state.items.filter((row) => row.id !== params.id) }))
  },
}))

export default usePurchaseStore
