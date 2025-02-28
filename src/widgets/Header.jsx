import React from 'react'
import { Button, Switch } from '@mantine/core'
import { pb } from 'shared/api'
import { Link } from 'react-router-dom'
import { useLangContext } from 'app/langContext'

export const Header = () => {

  async function logOut () {
    pb.authStore.clear()
    window.location.reload()
  }

  const { lang, handleLang } = useLangContext()

  return (
    <div className='w-full py-4'>
      <div className='flex px-4'>
        <p className='justify-start font-head font-bold'>
          <Link to={'/'}>
            OZELIM ADMIN PANEL
          </Link>
        </p>
        {/* <p className='justify-start font-head font-bold ml-4'>
          <Link to={'/duken'}>
          OZELIM DUKEN
          </Link>
        </p> */}
        <div className='ml-auto flex gap-4'>
          <Switch
            label='Казахский'
            onChange={handleLang}
            checked={lang === 'kz'}
            // checked={lang === 'kz'}
          />
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
  )
}