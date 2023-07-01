import React, { useEffect } from 'react'

import { usersAPI } from '@/api/users'

import useUserStore from '@/store/useUserStore'

export default function AuthLayout({ children }) {
  const { isLoading, error, data: loggedUser } = usersAPI()
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    setUser(loggedUser)
  }, [loggedUser])

  return <>{children}</>
}
