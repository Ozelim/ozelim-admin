import React from 'react'
import { Button, NumberInput, Table, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { openConfirmModal } from '@mantine/modals'
import { pb } from 'shared/api'
import { formatNumber, getImageUrl } from 'shared/lib'
import { showNotification } from '@mantine/notifications'
import { get } from 'react-hook-form'
import dayjs from 'dayjs'

async function getUserBonusesRecords (id) {
  return await pb.collection('user_bonuses').getOne(id)
}

async function getBonusesRecords () {
  return await pb.collection('bonuses_table').getFullList({
    sort: '-created'
  })
}

export const Bonuses = () => {

  const [search, setSearch] = React.useState('')
  const [bonuses, setBonuses] = React.useState(0)

  const [bonusesRecords, setBonusesRecords] = React.useState([])
  const [userRecords, setUserRecords] = React.useState({})

  const [foundUser, setFoundUser] = React.useState({})

  const [loading, loading_h] = useDisclosure(false)

  async function findUser () {
    if (!search) return
    loading_h.open()
    return await pb.collection('agents').getOne(search)
    .then((res) => {
      setFoundUser(res)
      getUserBonusesRecords(res?.id)
      .then(response => {
        setUserRecords(response)
      })
    })
    .finally(() => {
      loading_h.close()
    })
  }

  React.useEffect(() => { 
    getBonusesRecords()
    .then(res => {
      setBonusesRecords(res)
    })
  }, [])

  return (
    <div>
      <div className='flex items-end'>
        <TextInput
          label='ID пользователя'
          disabled={loading}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={findUser}
          loading={loading}
        >
          Поиск
        </Button>
      </div>
      <div>
        {foundUser?.id && (
          <div className='grid grid-cols-[35%_auto] gap-4'>
            <div className='max-w-[150px]'>
              <img src={getImageUrl(foundUser, foundUser?.avatar)} className='w-36 h-36 object-cover rounded-full mt-4' alt='' />
              <ul className='space-y-1.5 mt-4'>
                <li className='grid grid-cols-2 gap-4'>
                  <p>ID: </p>
                  <p className='whitespace-nowrap'>{foundUser?.id}</p>
                </li>
                <li className='grid grid-cols-2 gap-4'>
                  <p>ФИО: </p>
                  <p className='whitespace-nowrap'>{foundUser?.fio}</p>
                </li>
                <li className='grid grid-cols-2 gap-4'>
                  <p>Email: </p>
                  <p className='whitespace-nowrap'>{foundUser?.email}</p>
                </li>

                <li className='grid grid-cols-2 gap-4'>
                  <p>ИИН: </p>
                  <p className='whitespace-nowrap'>{foundUser?.iin}</p>
                </li>
                <li className='grid grid-cols-2 gap-4'>
                  <p>Адрес: </p>
                  <p className='whitespace-nowrap'>{foundUser?.region}</p>
                </li>
                <li className='grid grid-cols-2 gap-4'>
                  <p>Телефон: </p>
                  <p className='whitespace-nowrap'>{foundUser?.phone}</p>
                </li>
                <li className='grid grid-cols-2 gap-4'>
                  <p>Баланс: </p>
                  <p className='whitespace-nowrap'>{foundUser?.balance}</p>
                </li>
                <li className='grid grid-cols-2 gap-4'>
                  <p>Бонусы: </p>
                  <p className='whitespace-nowrap'>{foundUser?.bonuses}</p>
                </li>
              </ul>
            </div>
            <div>
              <p>История пользователя</p>
              <Table className="border mt-4 !w-fit min-w-[450px]">
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>ID</th>
                    <th>Тип</th>
                    <th>Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  {userRecords?.referals?.sort((a, b) => dayjs(b?.created).diff(dayjs(a?.created))).map((q, i) => {
                    return (
                      <tr key={i} className="text">
                        <td className='whitespace-nowrap'>
                          {dayjs(q?.created).format(
                            'DD.MM.YYYY, HH:mm'
                          )}
                        </td>
                        <td>{q?.referal}</td>
                        <td className="text-black">Реферал</td>
                        <td className='text-green-500'>+ {formatNumber(q?.sum)}</td>
                      </tr>
                    )
                  })}
                  {userRecords?.bonuses?.sort((a, b) => dayjs(b?.created).diff(dayjs(a?.created))).map((q, i) => {
                    return (
                      <tr key={i} className="text">
                        <td className='whitespace-nowrap'>
                          {dayjs(q?.created).format(
                            'DD.MM.YYYY, HH:mm'
                          )}
                        </td>
                        <td>-</td>
                        <td className="text-black">Бонус</td>
                        <td className='text-green-500'>+ {formatNumber(q?.sum)}</td>
                      </tr>
                    )
                  })}
                  {userRecords?.replenish?.sort((a, b) => dayjs(b?.created).diff(dayjs(a?.created))).map((q, i) => {
                    return (
                      <tr key={i} className="text">
                        <td className='whitespace-nowrap'>
                          {dayjs(q?.created).format(
                            'DD.MM.YYYY, HH:mm'
                          )}
                        </td>
                        <td>-</td>
                        <td className="text-black">Пополнение</td>
                        <td className='text-green-500'>+ {formatNumber(q?.sum)}</td>
                      </tr>
                    )
                  })}
                  {userRecords?.withdraws?.sort((a, b) => dayjs(b?.created).diff(dayjs(a?.created))).map((q, i) => {
                    return (
                      <tr key={i} className="text">
                        <td className='whitespace-nowrap'>
                          {dayjs(q?.created).format(
                            'DD.MM.YYYY, HH:mm'
                          )}
                        </td>
                        <td>-</td>
                        <td className="text-black">Вывод</td>
                        <td className='text-red-500'>- {formatNumber(q?.sum)}</td>
                      </tr>
                    )
                  })}
                  {userRecords?.services?.sort((a, b) => dayjs(b?.created).diff(dayjs(a?.created))).map((q, i) => {
                    return (
                      <tr key={i} className="text">
                        <td className='whitespace-nowrap'>
                          {dayjs(q?.created).format(
                            'DD.MM.YYYY, HH:mm'
                          )}
                        </td>
                        <td className="text-black">Услуга</td>
                        <td>-</td>
                        <td className='text-red-500'>- {formatNumber(q?.sum)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
      <div className='mt-4 flex items-end'>
        <NumberInput
          label='Сумма бонусов'
          hideControls
          loading={loading}
          value={bonuses}
          onChange={(e) => setBonuses(e)}
        />
        <Button
          onClick={async () => {
            if (!foundUser?.id) return
            await pb.collection('agents').update(foundUser?.id, {
              'bonuses+': bonuses
            })
            .then(async () => {

              await pb.collection('user_bonuses').update(userRecords?.id, {
                bonuses: [...userRecords?.bonuses ?? [], {
                  sum: bonuses,
                  created: new Date(),
                  id: crypto.randomUUID(),
                  referal: foundUser?.id
                }]
              })
              .then((res) => {
                setUserRecords(res)
              })

              await pb.collection('bonuses_table').create({
                sum: bonuses,
                agent: foundUser?.id
              })
              .then(() => {
                getBonusesRecords()
                .then(res => {
                  setBonusesRecords(res)
                }) 
              })
              showNotification({
                title: 'Бонусы',
                message: `${bonuses} Бонусов было успешно начислено пользователю ${foundUser?.id}`,
                color: 'teal',
              })
              setBonuses(0)
              findUser()
            })
          }}
          loading={loading}
        >
          Начислить
        </Button>
      </div>

      <p className='border-t py-4 mt-8'>История начислений</p>
      <Table
        className='max-w-fit min-w-[450px]'
      >
        <thead>
          <tr>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Пользователь</th>
          </tr>
        </thead>
        <tbody>
          {bonusesRecords?.map((record, i) => (
            <tr key={i}>
              <td>{dayjs(record?.created).format('DD.MM.YYYY, HH:mm')}</td>
              <td>{formatNumber(record?.sum)}</td>
              <td>{record?.agent}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
