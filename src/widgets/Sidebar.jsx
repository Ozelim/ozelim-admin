import React from 'react'
import { clsx } from '@mantine/core'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useAuth } from 'shared/hooks'
import { useLangContext } from 'app/langContext'

export const Sidebar = () => {

  const {lang} = useLangContext()

  const array = [
    
    {path: '/partners', labelru: 'Партнеры'},

    {path: '/users', labelru: 'Пользователи', labelkz: 'Пользователи', mng: true},
    {path: '/agents', labelru: 'Агенты', labelkz: 'Пользователи', mng: true},

    {path: '/construct', labelru: 'Конструктор туров'},
    {path: '/resorts', labelru: 'Санатории', labelkz: 'Санаториялар'},
    {path: '/price', labelru: 'Услуги (страница)'},
    {path: '/program', labelru: 'Партнерская программа', labelkz: 'Агенттік бағдарлама'},
    {path: '/our-team', labelru: 'Наша команда'},
    {path: '/insurance', labelru: 'Страхование', labelkz: `Сақтандыру`},
    {path: '/news', labelru: 'Новости компании', labelkz: `Жаңалықтар`},

    {path: '/levels', labelru: 'Уровни'},
    {path: '/binary', labelru: 'Бинар'},
    {path: '/bids', labelru: 'Заявки'},
    {path: '/withdraws', labelru: 'Выводы', buhgalter: true},
    {path: '/services', labelru: 'Услуги', labelkz: 'Қызметтер', tur: true},
    {path: '/replenish', labelru: 'Пополнения', labelkz: 'Пополнения'},
    {path: '/bonuses', labelru: 'Бонусы', labelkz: 'Бонусы'},
    {path: '/tester', labelru: 'Тестирования', labelkz: 'Тестирования', mng: true},
    {path: '/profile-courses', labelru: 'Курсы', labelkz: 'Курсы', mng: true},
    {path: '/fund', labelru: 'Фонд', labelkz: 'Фонд', mng: true},
    {path: '/health-world', labelru: 'Мир здоровья', labelkz: 'Мир здоровья', mng: true},
    {path: '/tours', labelru: 'Туры с Ozelim', labelkz: 'Туры с Ozelim', mng: true},
    {path: '/rights', labelru: 'Правовая защита', labelkz: 'Правовая защита', mng: true},
    {path: '/tourist', labelru: 'Пользователь', labelkz: 'Пользователь', mng: true},
    {path: '/dual', labelru: 'Дуальное обучение', labelkz: 'Дуальное обучение', mng: true},
  ]
  const array2 = [
    {path: '/duken/shops', labelru: 'Заявки продавцов'},
    {path: '/duken/all-shops', labelru: 'Магазины'},
    {path: '/duken/categories', labelru: 'Категории'},
    {path: '/duken/users', labelru: 'Пользователи'},
    {path: '/duken/products', labelru: 'На модерации'},
    {path: '/duken/chat', labelru: 'Сообщения'},
    {path: '/duken/orders', labelru: 'Заказы'},
  ]

  const {pathname} = useLocation()

  const {user} = useAuth()

  if (pathname.includes('duken')) {
    return (
      <div className="h-screen bg-red-600">
        <div className='grid grid-cols-1 text-white'>
          {array2.map((page, i) => {
              return (
                <Link key={i} to={page.path}>
                  <div 
                    key={i} 
                    className={clsx('p-4 text-sm', {
                      'bg-white text-black': pathname === page.path,
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
          })}
        </div>
      </div>
    )
  }

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
        if ((page?.mng) && user?.email === 'ozelim-mng@mail.ru') {
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

        if (!(user?.email === 'ozelim-buhgalter@mail.ru') && !(user?.email === 'ozelim-tur@mail.ru') && !(user?.email === 'ozelim-mng@mail.ru')) {
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