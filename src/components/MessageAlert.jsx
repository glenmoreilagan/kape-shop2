import React from 'react'

export default function MessageAlert({ closeToast, toastProps, header, body }) {
  return (
    <div>
      <h1 className='font-bold'>{header}</h1>
      <h4 className='font-thin'>{body}</h4>
    </div>
  )
}
