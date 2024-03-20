import React from 'react'
import Link from 'next/link'

import { MdOutlineHome } from 'react-icons/md'
import Breadcrumbs from '@mui/material/Breadcrumbs'

export default function BreadcrumbsComponent({ children }) {
  return (
    <>
      <div role='presentation'>
        <Breadcrumbs separator='›' aria-label='breadcrumb'>
          <Link href='/dashboard'>
            <MdOutlineHome className='text-xl' />
          </Link>
          {children}
        </Breadcrumbs>
      </div>
    </>
  )
}
