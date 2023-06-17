import newAxios from '@/lib/new-axios'
import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'

const useBrandStore = create((set, get) => ({
  selectedBrand: null,
  openModal: false,
  addBrand: async (brand) => {
    set(() => ({ isLoading: true }))
    try {
      const reponse = await newAxios.post('/api/brands', brand)
      const { data } = reponse.data

      console.log(data)
      set(() => ({ isLoading: false }))
    } catch (error) {
      set(() => ({ isLoading: false }))
      throw error
    }
  },
  editBrand: (brand) => {
    set(() => ({ selectedBrand: brand }))
  },

  updateBrand: async (brand, brandId) => {
    set(() => ({ isLoading: true }))
    try {
      const reponse = await newAxios.put(`/api/brands/${brandId}`, brand)
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


  resetSelectedBrand: () => {
    set({ selectedBrand: null })
  },
}))

export default useBrandStore
