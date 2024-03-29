import newAxios from '@/lib/new-axios'
import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'

const useCategoryStore = create((set, get) => ({
  selectedCategory: null,
  openModal: false,
  addCategory: async (category) => {
    set(() => ({ isLoading: true }))
    try {
      const reponse = await newAxios.post('/api/categories', category)
      const { data } = reponse.data

      console.log(data)
      set(() => ({ isLoading: false }))
    } catch (error) {
      set(() => ({ isLoading: false }))
      throw error
    }
  },
  editCategory: (category) => {
    set(() => ({ selectedCategory: category }))
  },

  updateCategory: async (category, categoryId) => {
    set(() => ({ isLoading: true }))
    try {
      const reponse = await newAxios.put(`/api/categories/${categoryId}`, category)
      const { data } = reponse.data

      console.log(data)
      set(() => ({ isLoading: false }))
    } catch (error) {
      set(() => ({ isLoading: false }))
      throw error
    }
  },

  setShowHideModal: () => {
    set((state) => ({ openModal: !state.openModal }))
  },


  resetSelectedCategory: () => {
    set({ selectedCategory: null })
  },
}))

export default useCategoryStore
