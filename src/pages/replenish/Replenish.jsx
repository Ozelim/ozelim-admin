import React from 'react'
import { Button, Modal, Table } from '@mantine/core'
import dayjs from 'dayjs'
import { pb } from 'shared/api'
import { getImageUrl } from 'shared/lib'

async function getReplenish () {
  return await pb.collection('replenish').getFullList({filter: `status = 'paid'`, expand: `user, agent`, sort: '-created'})
}

export const Replenish = () => {

  const [replenish, setReplenish] = React.useState([])

  const [userData, setUserData] = React.useState({
    modal: false,
    data: null
  })

  React.useEffect(() => {
    getReplenish()
    .then(res => {
      setReplenish(res)
    })
  }, [])

  console.log(userData?.data, 'data');

  return (
    <>
      <div>
        <Table
          striped
          className='mt-4'
        >
          <thead>
            <tr>
              <th>Дата</th>
              <th>Пользователь</th>
              <th>Тип</th>
              <th>Сумма</th>
            </tr>
          </thead>
          <tbody>
            {replenish?.map((rep, i) => {
              return (
                <tr 
                  key={i}
                >
                  <td>{dayjs(rep?.created).format('YY-MM-DD, HH:mm')}</td>
                  <td 
                    className='cursor-pointer' 
                    onClick={() => setUserData({modal: true, data: rep?.expand?.user === '' ? rep?.expand?.agent : rep?.expand?.user})}
                  >
                    <Button compact variant='outline'>
                      {rep?.user === '' ? rep?.agent : rep?.user}
                    </Button>
                  </td>
                  <td>
                    {rep?.user === '' ? 'Агент' : 'Партнер'}
                  </td>
                  <td>{rep?.sum}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
      <Modal
        opened={userData.modal}
        onClose={() => setUserData({data: null, modal: false})}
        centered
      >
        <img 
          src={getImageUrl(userData?.data, userData.data?.avatar)} 
          alt="" 
          className='w-[150px] h-[150px] object-cover rounded-full mx-auto mb-5'
        />
        <li className='grid grid-cols-2'>
          <p>ID:</p>
          <p>{userData?.data?.id}</p>
        </li>
        {userData?.data?.user === '' ? (
          <ul className='space-y-2'>
            <li className='grid grid-cols-2'>
              <p>ФИО:</p>
              <p>{userData?.data?.fio}</p>
            </li>
            <li className='grid grid-cols-2'>
              <p>Телефон:</p>
              <p>{userData?.data?.phone}</p>
            </li>
            <li className='grid grid-cols-2'>
              <p>Адрес:</p>
              <p>{userData?.data?.region}</p>
            </li>
            <li className='grid grid-cols-2'>
              <p>Дата рег:</p>
              <p>{dayjs(userData?.data?.created).format('DD.MM.YY')}</p>
            </li>
          </ul>
        ) : (
          <ul className='space-y-2'>
            <li className='grid grid-cols-2'>
              <p>Имя:</p>
              <p>{userData?.data?.name}</p>
            </li>
            <li className='grid grid-cols-2'>
              <p>Фамилия:</p>
              <p>{userData?.data?.surname}</p>
            </li>
            <li className='grid grid-cols-2'>
              <p>Телефон:</p>
              <p>{userData?.data?.phone}</p>
            </li>
            <li className='grid grid-cols-2'>
              <p>Область:</p>
              <p>{userData?.data?.region}</p>
            </li>
            <li className='grid grid-cols-2'>
              <p>Партнеры:</p>
              <p>{userData?.data?.referals?.length}</p>
            </li>
            <li className='grid grid-cols-2'>
            <p>Бинар:</p>
              <p>{userData?.data?.bin ? 'Да' : 'Нет'}</p>
            </li>
            <li className='grid grid-cols-2'>
              <p>Уровень:</p>
              <p>{userData?.data?.level}</p>
            </li>
            <li className='grid grid-cols-2'>
              <p>Дата рег:</p>
              <p>{dayjs(userData?.data?.created).format('DD.MM.YY')}</p>
            </li>
          </ul>
        )}
      </Modal>
    </>
  )
}