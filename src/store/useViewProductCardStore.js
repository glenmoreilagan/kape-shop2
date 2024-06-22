import newAxios from '@/lib/new-axios'
import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'

export const ModalStateViewProductCard = create((set, get) => ({
  showViewProduct: false,
  SetShowViewProduct: async (isOpen) => {
    set(() => ({ showViewProduct: isOpen }))
  },
}))

export const SelectProductToView = create((set, get) => ({
  selectedProduct: false,
  SetSelectedProduct: async (product) => {
    set(() => ({ selectedProduct: product }))
  },
}))
