import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

import { usersAPI } from '@/api/users'
import { logout } from '@/api/auth'

import useUserStore from '@/store/useUserStore'

export default function AuthLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isLoading, error, data: loggedUser } = usersAPI()
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    setUser(loggedUser)
  }, [loggedUser])

  return <>{children}</>
}
