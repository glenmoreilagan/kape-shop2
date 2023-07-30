import newAxios from '@/lib/new-axios'
import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'

const usePurchaseStore = create((set, get) => ({
  items: [],
  setItems: async (item) => {
    // set((state) => ({ isLoading: false, items: [...state.items, item] }))

    set((state) => {
      let newItem = []
      const filterItem = state.items?.find((row) => row.id === item.id)

      if (filterItem) {
        newItem = state.items.map((row) => {
          if (row.id === filterItem.id) {
            return { ...row, quantity: row.quantity + 1 }
          }

          return row
        })
      } else {
        newItem = [...state.items, item]
      }

      return {
        isLoading: false,
        items: newItem,
      }
    })
  },
}))

export default usePurchaseStore
