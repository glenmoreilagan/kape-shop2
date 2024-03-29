import newAxios from '@/lib/new-axios'
import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'

const initialState = {
  products: [],
}

const useSaleStore = create((set, get) => ({
  ...initialState,
  setProducts: (products) => {
    let filteredProducts = products?.data?.map((product, i) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
      }
    })

    set(() => ({ products: filteredProducts }))
  },
}))

export default useSaleStore
