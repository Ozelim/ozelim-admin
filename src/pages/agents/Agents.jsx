import React from 'react'
import {
  Button,
  LoadingOverlay,
  Menu,
  Modal,
  Pagination,
  Table,
  Tabs,
  TextInput,
} from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import dayjs from 'dayjs'
import { pb } from 'shared/api'

import { AiFillCheckCircle, AiFillLock } from 'react-icons/ai'
import { showNotification } from '@mantine/notifications'
import { formatNumber, getImageUrl } from 'shared/lib'
import { useDisclosure } from '@mantine/hooks'

async function getUsers() {
  return await pb.collection('agents').getFullList({
    sort: '-created',
    filter: `agent = true`,
  })
}

async function getReports() {
  return await pb.collection('reports').getFullList({
    sort: '-created',
    expand: 'agent',
  })
}

export const Agents = () => {
  const [users, setUsers] = React.useState([])

  const [loading, setLoading] = React.useState(false)

  const [search, setSearch] = React.useState('')

  const [reports, setReports] = React.useState([])
  const [report, setReport] = React.useState({})

  const [reportsM, reportsM_h] = useDisclosure(false)

  async function searchByValue() {
    if (!search) {
      handleUsers(1)
      return
    }
    const foundUsers = await pb.collection('users').getFullList({
      filter: `
        id = '${search}' ||
        name ?~ '${search}' ||
        email ?~ '${search}' ||
        phone ?~ '${search}' ||
        city ?~ '${search}'
      `,
    })

    if (foundUsers.length !== 0) {
      setUsers(foundUsers)
      showNotification({
        title: 'Поиск',
        message: 'Не найдено',
        color: 'teal',
      })
    }
  }

  React.useEffect(() => {
    getReports().then((res) => {
      setReports(res)
    })

    getUsers().then((res) => {
      setUsers(res)
    })

    pb.collection('users').subscribe('*', function () {
      getUsers().then((res) => {
        setUsers(res)
      })
    })
  }, [])

  function handleUsers(val) {
    getUsers(val).then((res) => {
      setUsers(res)
    })
  }

  async function verifyUser(userId) {
    setLoading(true)
    return await pb
      .collection('users')
      .update(userId, {
        verified: true,
      })
      .then(async (res) => {
        const sponsor = await pb.collection('users').getOne(res?.sponsor)
        await pb.collection('users').update(sponsor?.id, {
          referals: [...sponsor?.referals, res?.id],
        })

        const referals = await pb.collection('users').getFullList({
          filter: `sponsor = '${sponsor?.id}' && verified = true`,
        })

        if (referals?.length === 1) {
          await pb.collection('users').update(sponsor?.id, {
            balance: sponsor?.balance + 30000,
          })
          setLoading(false)
          return
        }

        if (referals?.length >= 4) {
          await pb.collection('users').update(sponsor?.id, {
            balance: sponsor?.balance + 15000,
          })
          setLoading(false)
          return
        }
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
  }
  // Пример использования

  const confirmVerifing = (userId) =>
    openConfirmModal({
      title: 'Подтвердить верификацию',
      centered: true,
      children: <>Подтверить верификацию пользователя</>,
      labels: { confirm: 'Подтвердить', cancel: 'Отмена' },
      onConfirm: () => verifyUser(userId),
    })

  const confirmLevel = (user, val) => {
    openConfirmModal({
      title: 'Подтвердить верификацию',
      centered: true,
      children: (
        <>
          Выдать уровень {val} пользователю {user?.id}{' '}
        </>
      ),
      labels: { confirm: 'Подтвердить', cancel: 'Отмена' },
      onConfirm: () => giveLevel(user, val),
    })
  }

  async function giveLevel(user, val) {
    await pb.collection('users').update(user?.id, {
      level: val,
    })
  }

  const [modal, setModal] = React.useState({
    show: false,
    bonuses: {},
  })

  const allLinesPeriod = report?.data?.['1']?.concat(
    report?.data?.['2'],
    report?.data?.['3']
  )

  return (
    <>
      <div className="w-full">
        <Tabs defaultValue="agents">
          <Tabs.List>
            <Tabs.Tab value="agents">Агенты</Tabs.Tab>
            <Tabs.Tab value="reports">Отчеты</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="agents">
            <LoadingOverlay visible={loading} />
            <div className="flex items-end">
              <TextInput
                label="Поиск"
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
              <Button onClick={() => searchByValue()}>Поиск</Button>

              <div className="mx-4 flex items-center gap-2">
                <p>Количество: </p>
                <p>{users?.length}</p>
              </div>
            </div>
            <Table className="mt-4">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ФИО</th>
                  <th>Бонусы</th>
                  <th>Баланс</th>
                  <th>Почта</th>
                  <th>Телефон</th>
                  <th>Область</th>
                  <th>Населенный пункт</th>
                  <th>Агент-наставник</th>
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
                      <td>{user?.fio}</td>
                      <td>{user?.bonuses}</td>
                      <td>{user?.balance}</td>
                      <td>{user?.email}</td>
                      <td>{user?.phone}</td>
                      <td>{user?.region}</td>
                      <td>{user?.village}</td>
                      <td>{user?.sponsor}</td>
                      <td>{dayjs(user.created).format(`DD.MM.YY, HH:mm`)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Tabs.Panel>
          <Tabs.Panel value="reports">
            <Table className="mt-4">
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>ID агента</th>
                  <th>Фото</th>
                  <th>ФИО</th>
                  <th>Линии</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((q, i) => {
                  return (
                    <tr key={i}>
                      <td>{dayjs(q.created).format(`DD.MM.YY, HH:mm`)}</td>
                      <td>{q?.agent}</td>
                      <td>{getImageUrl(q?.expand?.agent, q?.expand?.agent?.avatar)}</td>
                      <td>{q?.expand?.agent?.fio}</td>
                      <td>
                        <Button
                          onClick={() => {
                            setReport(q)
                            reportsM_h.open()
                          }}
                        >
                          Линии
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Tabs.Panel>
        </Tabs>
      </div>
      <Modal
        opened={reportsM}
        centered
        onClose={() => reportsM_h.close()}
        size={'70%'}
        title='Отчет'
      >
        <ul className='space-y-2'>
          <li className='grid grid-cols-[20%_auto]'><span className='text-slate-500'>ФИО:</span> {report?.expand?.agent?.fio}</li>
          <li className='grid grid-cols-[20%_auto]'><span className='text-slate-500'>ID:</span> {report?.expand?.agent?.id}</li>
          <li className='grid grid-cols-[20%_auto]'><span className='text-slate-500'>Email:</span> {report?.expand?.agent?.email}</li>
          <li className='grid grid-cols-[20%_auto]'><span className='text-slate-500'>Телефон:</span> {report?.expand?.agent?.phone}</li>
        </ul>
        <div className="flex justify-end gap-1">
          Общее:
          <span className="font-bold text-primary-500">
            {allLinesPeriod?.length ?? 0}
          </span>
        </div>
        <p className="text-sm">
          Первая линия:{' '}
          <span className="text-primary-500 font-bold">
            {report?.data?.['1']?.length ?? 0}
          </span>
        </p>
        {report?.data?.['1']?.length !== 0 && (
          <>
            <Table>
              <thead>
                <tr>
                  <th>Фото</th>
                  <th>ФИО</th>
                  <th>ID</th>
                  <th>ID спонсора</th>
                  <th>Дата становления</th>
                </tr>
              </thead>
              <tbody>
                {report?.data?.['1']?.map((q, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-center font-bold">
                        {q?.avatar ? (
                          <img
                            src={getImageUrl(q, q?.avatar)}
                            className="w-12 h-12 rounded-full"
                            alt=""
                          />
                        ) : (
                          '-'
                        )}
                      </td>
                      <td>{q?.fio}</td>
                      <td>{q?.id}</td>
                      <td>{q?.sponsor}</td>
                      <td>{dayjs(q?.agent_date).format('DD/MM/YYYY')}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </>
        )}
        <p className="mt-6 text-sm">
          Вторая линия:{' '}
          <span className="text-primary-500 font-bold">
            {report?.data?.['2']?.length ?? 0}
          </span>
        </p>
        {report?.data?.['2']?.length !== 0 && (
          <>
            <Table>
              <thead>
                <tr>
                  <th>Фото</th>
                  <th>ФИО</th>
                  <th>ID</th>
                  <th>ID спонсора</th>
                  <th>Дата становления</th>
                </tr>
              </thead>
              <tbody>
                {report?.data?.['2']?.map((q, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-center font-bold">
                        {q?.avatar ? (
                          <img
                            src={getImageUrl(q, q?.avatar)}
                            className="w-12 h-12 rounded-full"
                            alt=""
                          />
                        ) : (
                          '-'
                        )}
                      </td>
                      <td>{q?.fio}</td>
                      <td>{q?.id}</td>
                      <td>{q?.sponsor}</td>
                      <td>{dayjs(q?.agent_date).format('DD/MM/YYYY')}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </>
        )}
        <p className="mt-6 text-sm">
          Третья линия:{' '}
          <span className="text-primary-500 font-bold">
            {report?.data?.['3']?.length ?? 0}
          </span>
        </p>
        {report?.data?.['3']?.length !== 0 && (
          <>
            <Table>
              <thead>
                <tr>
                  <th>Фото</th>
                  <th>ФИО</th>
                  <th>ID</th>
                  <th>ID спонсора</th>
                  <th>Дата становления</th>
                </tr>
              </thead>
              <tbody>
                {report?.data?.['3']?.map((q, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-center font-bold">
                        {q?.avatar ? (
                          <img
                            src={getImageUrl(q, q?.avatar)}
                            className="w-12 h-12 rounded-full"
                            alt=""
                          />
                        ) : (
                          '-'
                        )}
                      </td>
                      <td>{q?.fio}</td>
                      <td>{q?.id}</td>
                      <td>{q?.sponsor}</td>
                      <td>{dayjs(q?.agent_date).format('DD/MM/YYYY')}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </>
        )}
      </Modal>
      <Modal
        opened={modal?.show}
        centered
        onClose={() => setModal({ ...modal, show: false })}
        size={'70%'}
      >
        <div className="mt-12 overflow-scroll">
          <h2 className="text-center text-xl font-head">История</h2>
          <Table className="border mt-4">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Тип</th>
                <th>ID</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody>
              {modal?.bonuses?.referals?.map((q, i) => {
                return (
                  <tr key={i} className="text">
                    <td className="whitespace-nowrap">
                      {dayjs(q?.created).format('YY-MM-DD, hh:mm')}
                    </td>
                    <td className="text-black">Система</td>
                    <td>{q?.referal}</td>
                    <td className="text-green-500">+ {formatNumber(q?.sum)}</td>
                  </tr>
                )
              })}
              {modal?.bonuses?.bonuses?.map((q, i) => {
                return (
                  <tr key={i} className="text">
                    <td className="whitespace-nowrap">
                      {dayjs(q?.created).format('YY-MM-DD, hh:mm')}
                    </td>
                    <td className="text-black">Бонус</td>
                    <td>-</td>
                    <td className="text-green-500">+ {formatNumber(q?.sum)}</td>
                  </tr>
                )
              })}
              {modal?.bonuses?.replenish?.map((q, i) => {
                return (
                  <tr key={i} className="text">
                    <td className="whitespace-nowrap">
                      {dayjs(q?.created).format('YY-MM-DD, hh:mm')}
                    </td>
                    <td className="text-black">Пополнение</td>
                    <td>-</td>
                    <td className="text-green-500">+ {formatNumber(q?.sum)}</td>
                  </tr>
                )
              })}
              {modal?.bonuses?.withdraws?.map((q, i) => {
                return (
                  <tr key={i} className="text">
                    <td className="whitespace-nowrap">
                      {dayjs(q?.created).format('YY-MM-DD, hh:mm')}
                    </td>
                    <td className="text-black">Вывод</td>
                    <td>-</td>
                    <td className="text-red-500">- {formatNumber(q?.sum)}</td>
                  </tr>
                )
              })}
              {modal?.bonuses?.services?.map((q, i) => {
                return (
                  <tr key={i} className="text">
                    <td className="whitespace-nowrap">
                      {dayjs(q?.created).format('YY-MM-DD, hh:mm')}
                    </td>
                    <td className="text-black">Услуга</td>
                    <td>-</td>
                    <td className="text-red-500">- {formatNumber(q?.sum)}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </Modal>
    </>
  )
}
