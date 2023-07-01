import newAxios from '@/lib/new-axios'
import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'

const useUserStore = create((set, get) => ({
  user: null,
  setUser: async (user) => {
    set(() => ({ isLoading: false, user: user }))
  },
}))

export default useUserStore
