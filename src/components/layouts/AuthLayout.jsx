import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

import { usersAPI } from '@/hooks/users'
import { logout } from '@/hooks/auth'

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
