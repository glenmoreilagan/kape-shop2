import React, { ReactNode } from 'react'

type PageProps = {
  children: ReactNode
}

export default function ListingLayout({ children }: PageProps) {
  return <div className='p-3 bg-white rounded-md'>{children}</div>
}
