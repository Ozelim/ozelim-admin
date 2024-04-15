import React from 'react'
import { clsx } from '@mantine/core'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from 'shared/hooks'
import { useLangContext } from 'app/langContext'


export const Sidebar = () => {

  const {lang} = useLangContext()

  const array = [
    {path: '/construct', labelru: 'Конструктор туров', tur: true},
    {path: '/about', labelru: 'О компании', labelkz: 'Компания туралы'},
    {path: '/health', labelru: 'Твое здоровье', labelkz: 'Сенің денсаулығың'},
    {path: '/courses', labelru: 'Курсы по туризму', labelkz: 'Туристік курстар'},
    {path: '/resorts', labelru: 'Санатории', tur: true, labelkz: 'Санаториялар'},
    {path: '/partners', labelru: 'Бизнес-Партнеры', labelkz: `Бизнес серіктестер`},
    {path: '/price', labelru: 'Услуги (страница)'},
    {path: '/program', labelru: 'Партнерская программа', labelkz: 'Агенттік бағдарлама'},
    {path: '/our-team', labelru: 'Наша команда'},
    {path: '/charity-fund', labelru: 'Доброе дело', labelkz: `Мейірімділік`},
    {path: '/news', labelru: 'Новости компании', labelkz: `Жаңалықтар`},
    {path: '/users', labelru: 'Пользователи'},
    {path: '/levels', labelru: 'Уровни'},
    {path: '/binary', labelru: 'Бинар'},
    {path: '/bids', labelru: 'Заявки'},
    {path: '/money-flow', labelru: 'Движение средтв'},
    {path: '/withdraws', labelru: 'Выводы', buhgalter: true},
    {path: '/services', labelru: 'Услуги', labelkz: 'Қызметтер'},
    {path: '/replenish', labelru: 'Пополнения', labelkz: 'Пополнения'},
    {path: '/bonuses', labelru: 'Бонусы', labelkz: 'Бонусы'},
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
                    {lang === 'kz' 
                      ? page.labelkz ?? page.labelru
                      : page.labelru
                    }
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
                    {lang === 'kz' 
                      ? page.labelkz ?? page.labelru
                      : page.labelru
                    }
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
                    {lang === 'kz' 
                      ? page.labelkz ?? page.labelru
                      : page.labelru
                    }
                  </span>
              </div>
            </Link>
          )
        }
      })}
    </div>
  )
}