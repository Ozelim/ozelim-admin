import React from 'react'
import { clsx } from '@mantine/core'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from 'shared/hooks'


export const Sidebar = () => {

  const array = [
    {path: '/construct', label: 'Конструктор туров', tur: true},
    {path: '/about', label: 'О компании'},
    {path: '/health', label: 'Твое здоровье'},
    {path: '/courses', label: 'Курсы по туризму'},
    {path: '/resorts', label: 'Наши курорты', tur: true},
    {path: '/partners', label: 'Бизнес-Партнеры'},
    {path: '/price', label: 'Прайс лист'},
    {path: '/program', label: 'Партнерская программа'},
    {path: '/our-team', label: 'Наша команда'},
    {path: '/charity-fund', label: 'Благотворительность'},
    {path: '/news', label: 'Новости компании'},
    {path: '/users', label: 'Пользователи'},
    {path: '/binary', label: 'Бинар'},
    {path: '/bids', label: 'Заявки'},
    {path: '/money-flow', label: 'Движение средтв'},
    {path: '/withdraws', label: 'Выводы', buhgalter: true},
  ]

  const { pathname } = useLocation()

  const {user} = useAuth()

  return (
    <div className='grid grid-cols-1'>
      {array.map((page, i) => {
        if ((page?.tur) && user?.email === 'ozelim-tur@mail.ru') {
          return (
            <Link key={i} to={page.path}>
              <div 
                key={i} 
                className={clsx('p-4 text-sm', {
                  'bg-teal-600 text-white': pathname === page.path,
                })}
              >
                  <span>
                    {page.label}
                  </span>
              </div>
            </Link>
          )
        }
        if ((page?.buhgalter) && user?.email === 'ozelim-buhgalter@mail.ru') {
          return (
            <Link key={i} to={page.path}>
              <div 
                key={i} 
                className={clsx('p-4 text-sm', {
                  'bg-teal-600 text-white': pathname === page.path,
                })}
              >
                  <span>
                    {page.label}
                  </span>
              </div>
            </Link>
          )
        }
        if (!(user?.email === 'ozelim-buhgalter@mail.ru') && !(user?.email === 'ozelim-tur@mail.ru')) {
          return (
            <Link key={i} to={page.path}>
              <div 
                key={i} 
                className={clsx('p-4 text-sm', {
                  'bg-teal-600 text-white': pathname === page.path,
                })}
              >
                  <span>
                    {page.label}
                  </span>
              </div>
            </Link>
          )
        }
      })}
    </div>
  )
}
