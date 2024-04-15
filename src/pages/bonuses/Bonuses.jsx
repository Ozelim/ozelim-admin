import { Button, Table, TextInput } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import React from 'react'
import { pb } from 'shared/api'

async function getUsers () {
  return await pb.collection('users').getFullList({
    filter: `level > '3'`
  })
}

export const Bonuses = () => {

  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    getUsers()
    .then(res => {
      setUsers(res)
    })

    pb.collection('users').subscribe('*' , () => {
      getUsers()
      .then(res => {
        setUsers(res)
      })
    }) 
  }, [])

  const [bonuses, setBonuses] = React.useState({})
  const [takenBonuses, setTakenBonuses] = React.useState({})

  const addBonuses = (id) => openConfirmModal({
    title: 'Подтвердите действие',
    children: `Пополнить бонусы пользователю ${id} на сумму ${bonuses?.[id]}`,
    centered: true,
    labels: {confirm: 'Подтвердить', cancel: 'Отмена'},
    onConfirm: async () => pb.collection('users').update(id, {
      'bonuses+': bonuses?.[id]
    })
    .then(() => {
      setBonuses({...bonuses, [id]: ''})
    })
  }) 

  const takeBonuses = (id) => openConfirmModal({
    title: 'Подтвердите действие',
    children: `Забрать бонусы пользователю ${id} на сумму ${takenBonuses?.[id]}`,
    centered: true,
    labels: {confirm: 'Подтвердить', cancel: 'Отмена'},
    onConfirm: async () => pb.collection('users').update(id, {
      'bonuses-': takenBonuses?.[id]
    })
    .then(() => {
      setTakenBonuses({...takenBonuses, [id]: ''})
    })
  }) 

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Уровнь</th>
            <th>Бонусы</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => {
            return (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.surname}</td>
                <td>{u.level}</td>
                <td>{u.bonuses}</td>
                <td>
                    <div className='inline-flex items-end'>
                      <TextInput
                        value={bonuses?.[u?.id] ?? ''}
                        onChange={e => setBonuses({...bonuses, [u.id]: e.currentTarget.value})}
                        label='Бонусы'
                        size='xs'
                      />
                      <Button
                        onClick={() => addBonuses(u.id)}
                        compact
                        variant='subtle'
                      >
                        Добавить
                      </Button>
                    </div>
                    <div className="inline-flex items-end ml-4">
                      <TextInput
                        value={takenBonuses?.[u?.id] ?? ''}
                        onChange={e => setTakenBonuses({...takenBonuses, [u.id]: e.currentTarget.value})}
                        label='Бонусы'
                        size='xs'
                        
                      />
                      <Button
                        onClick={() => takeBonuses(u.id)}
                        color='red'
                        compact
                        variant='subtle'
                      >
                        Забрать
                      </Button>
                    </div>
                </td>
  
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}
