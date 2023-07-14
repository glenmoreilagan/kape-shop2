'use client'
import React, { useState, useEffect } from 'react'
import { useProSidebar } from 'react-pro-sidebar'
import { useRouter } from 'next/router'

import axios from 'axios'

import {
  MdOutlineMenu,
  MdOutlineSettings,
  MdOutlineLogout,
  MdOutlineArrowDropDown,
  MdPersonOutline,
} from 'react-icons/md'
import Avatar from '@mui/material/Avatar'

import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import useUserStore from '@/store/useUserStore'

export default function HeadNav() {
  const { collapseSidebar } = useProSidebar()
  const router = useRouter()
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(false)
  }

  const handleProfile = () => {
    alert('Profile')
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    setUser(null)
    localStorage.removeItem('token')
    router.replace('/')
    setAnchorEl(null)
  }

  return (
    <>
      <div className='bg-white shadow-sm'>
        <div
          style={{
            height: '4em',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '98%',
            margin: 'auto',
          }}
        >
          <div>
            <MdOutlineMenu className='text-[#333333] text-xl cursor-pointer' onClick={() => collapseSidebar()} />
          </div>
          <div>
            <Button
              className='text-[#333333]'
              size='small'
              id='demo-customized-button'
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              // variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<MdOutlineArrowDropDown />}
            >
              <Avatar className='bg-primary-darkbrown' sx={{ width: 32, height: 32 }}>
                <MdPersonOutline />
              </Avatar>
              {/* {user?.email} */}
            </Button>
            <Menu
              PaperProps={{ sx: { width: '12em' } }}
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem className='justify-between items-center' disabled={true}>
                <span className='text-sm'>{user?.email}</span>
              </MenuItem>
              <MenuItem className='justify-between items-center' onClick={(e) => handleProfile(e)}>
                Profile <MdOutlineSettings fontSize={'1.2em'} className='text-gray-600' />
              </MenuItem>
              <MenuItem className='justify-between items-center' onClick={(e) => handleLogout(e)}>
                Logout <MdOutlineLogout fontSize={'1.2em'} className='text-gray-600' />
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </>
  )
}
