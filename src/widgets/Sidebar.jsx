import React from 'react'
import { clsx } from '@mantine/core'
import { Link, useLocation } from 'react-router-dom'

const array = [
  {path: '/construct', label: 'Конструктор туров'},
  {path: '/about', label: 'О компании'},
  {path: '/health', label: 'Твое здоровье'},
  {path: '/courses', label: 'Курсы по туризму'},
  {path: '/resorts', label: 'Наши курорты'},
  {path: '/partners', label: 'Бизнес-Партнеры'},
  {path: '/price', label: 'Прайс лист'},
  {path: '/program', label: 'Партнерская программа'},
  {path: '/our-team', label: 'Наша команда'},
  {path: '/charity-fund', label: 'Благотворительный фонд'},
  {path: '/news', label: 'Новости компании'},
  {path: '/bids', label: 'Заявки'},
  {path: '/money-flow', label: 'Движение средтв'},
  {path: '/withdraws', label: 'Выводы'},
  {path: '/users', label: 'Пользователи'},
  {path: '/binary', label: 'Структура'},
]

export const Sidebar = () => {

  const { pathname } = useLocation()

  return (
    <div className='grid grid-cols-1'>
      {array.map((page, i) => {
        return (
          <Link key={i} to={page.path}>
            <div 
              key={i} 
              className={clsx('p-4 text-sm', {
                'bg-teal-600 text-white': pathname === page.path
              })}
            >
                <span>
                  {page.label}
                </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
