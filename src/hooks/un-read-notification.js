import React, { useEffect, useState } from 'react'
import useEcho from './echo'

export default function UnReadNotification() {
  const echo = useEcho()

  const [recentOrders, setRecentOrders] = useState(null)
  const [unreadOrders, setUnreadOrdersCount] = useState(0)

  const handleEchoCallback = () => {
    // setRecentOrders(event.order)
    setUnreadOrdersCount((prev) => prev + 1)
  }

  useEffect(() => {
    if (echo && process.env.NODE_ENV === 'development') {
      echo.channel(`checkout.success`).listen('.checkout.success.event', (event) => {
        console.log('Real-time event received: ', event)
        handleEchoCallback()
      })
    }
  }, [echo])
  return unreadOrders
}
