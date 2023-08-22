import { Button } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='w-full py-4'>
      <div className="container">
        <Link to={'/'}>
          Home
        </Link>
        <Button
          compact
          variant={'subtle'}
        >
          Выйти
        </Button>
      </div>
    </div>
  )
}
