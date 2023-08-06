import { Pagination, Table, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import dayjs from 'dayjs'
import React from 'react'
import { pb } from 'shared/api'

async function getUsers (page) {
  return await pb.collection('users').getList(page, 50)
}

export const Users = () => {

  const [users, setUsers] = React.useState([])
  const [page, setPage] = React.useState({})

  const [search, setSearch] = React.useState('')
  const [searchValue] = useDebouncedValue(search, 1000)

  async function searchByValue () {
    if (!searchValue) {
      handleUsers(1)
      return
    }
    const foundUsers = await pb.collection('users').getFullList({
      filter: `
        id = '${searchValue}' ||
        name ?~ '${searchValue}' ||
        email ?~ '${searchValue}' ||
        phone ?~ '${searchValue}' ||
        city ?~ '${searchValue}' ||
        iin ?~ '${searchValue}' 
      `
    })
    if (foundUsers.length !== 0) {
      setUsers(foundUsers)
      setPage(null)
    } 
  }

  React.useEffect(() => {
    searchByValue()
  }, [searchValue])

  React.useEffect(() => {
    getUsers(1)
    .then(res => {
      setUsers(res.items)
      setPage({...res, items: null})
    })
  }, [])

  function handleUsers (val) {
    getUsers(val)
    .then(res => {
      setUsers(res.items)
      setPage({...res, items: null})
    })
  }

  return (
    <>
      <div className='w-full'>
        <TextInput
          label='Поиск'
          value={search}
          onChange={e => setSearch(e.currentTarget.value)}
        />
        <Table className='mt-4'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Бинар</th>
              <th>Баланс</th>
              <th>Почта</th>
              <th>Телефон</th>
              <th>Город</th>
              <th>Дата рождения</th>
              <th>ИИН</th>
              <th>Спонсор</th>
              <th>Дата регистрации</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              return (
                <tr 
                  key={i}
                  // onClick={() => openChangeModal(user)}  
                >
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.bin ? 'Да' : 'Нет'}</td>
                  <td>{user.balance}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.city}</td>
                  <td>{dayjs(user.birthday).format(`DD.MM.YY`)}</td>
                  <td>{user.iin}</td>
                  <td>{user.sponsor}</td>
                  <td>{dayjs(user.created).format(`DD.MM.YY, HH:mm`)}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        {page && (
          <Pagination
            value={page?.page}
            total={page?.totalPages}
            onChange={handleUsers}
          />
        )}
      </div>
    </>
  )
}
