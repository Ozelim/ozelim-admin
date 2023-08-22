import React from 'react'
import { Button } from '@mantine/core'
import { pb } from 'shared/api'

export const Header = () => {

  async function logOut () {
    pb.authStore.clear()
    window.location.reload()
  }

  return (
    <div className='w-full py-4'>
      <div className="container">
        <div className='flex'>
          <p className='justify-start font-head font-bold'>
            OZELIM ADMIN PANEL
          </p>
          <div className='ml-auto'>
            <Button
              compact
              variant={'subtle'}
              onClick={logOut}
            >
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
