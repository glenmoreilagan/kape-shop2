import React from 'react'

interface PageProps {
  header: string
  body: string
}

export default function MessageAlert({ header, body }: PageProps) {
  return (
    <div>
      <h1 className='font-bold'>{header}</h1>
      <h4 className='font-thin'>{body}</h4>
    </div>
  )
}
