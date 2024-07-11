import React from 'react'
import { Button, Modal, Pagination, Table, Tabs, TextInput } from '@mantine/core'
import { createBonusRecord, pb } from 'shared/api'
import { formatNumber, getImageUrl } from 'shared/lib'

import { BsCheckCircle } from 'react-icons/bs'
import { CiCircleRemove } from 'react-icons/ci'
import { openConfirmModal } from '@mantine/modals'

import { LuHeartHandshake } from "react-icons/lu";


import dayjs from 'dayjs'

import * as XLSX from 'xlsx';
import { showNotification } from '@mantine/notifications'

async function getWithdraws () {
  return await pb.collection('withdraws').getFullList({
    filter: `status = 'created'`,
    sort: '-created',
    expand: 'user',
  })
}

async function getWithdrawsEnded (page = 1) {
  return await pb.collection('withdraws').getList(page, 20, {
    filter: `status != 'created'`,
    sort: '-created',
    expand: 'user',
  })
}

export const Withdraws = () => {

  const [withdraws, setWithdraws] = React.useState([])
  const [endedWithdraws, setEndedWithdraws] = React.useState({})

  async function handleWithdraws (page) {
    getWithdrawsEnded(page)
    .then(res => {
      console.log(res, 'res');
      setEndedWithdraws(res)
    })
  }

  async function confirmWithdraw (withdraw) {
    await pb.collection('withdraws').update(withdraw?.id, {
      status: 'paid',
    })
    .then(async res => {
      await createBonusRecord('withdraws', {
        to: withdraw?.expand?.user?.id, 
        who: withdraw?.expand?.user?.id, 
        sum: withdraw?.sum
      })
    })
  }

  async function deleteWithdraw (withdraw) {
    await pb.collection('withdraws').update(withdraw?.id, {
      status: 'rejected'
    })
    .then(async () => {
      const withdrawsUser = await pb.collection('users').getOne(withdraw?.user)
      console.log(withdrawsUser);
      await pb.collection('users').update(withdraw?.user, {
        balance: withdrawsUser?.balance + Number(withdraw?.sum)
      })
    })
  }

  const confirmWithdrawConfirm = (withdraw) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    labels: { confirm: 'Подтвердить', cancel: 'Отмена'},
    children: (
      <>
        Вы действительно хотите отправить данную сумму?
      </>
    ),
    onConfirm: () => confirmWithdraw(withdraw)
  })
  
  const removeWithdrawConfirm = (withdraw) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    labels: { confirm: 'Подтвердить', cancel: 'Отмена'},
    children: (
      <>Вы действительно хотите отклонить данную отправку?</>
    ),
    onConfirm: () => deleteWithdraw(withdraw)
  })

  React.useEffect(() => {
    getWithdraws()
    .then(res => {
      setWithdraws(res)
    })

    getWithdrawsEnded()
    .then(res => {
      console.log(res, 'res');
      setEndedWithdraws(res)
    })

    pb.collection('withdraws').subscribe('*', function ({_, record}) {
      getWithdrawsEnded(endedWithdraws?.page)
      .then(res => {
        setEndedWithdraws(res)
      })
      getWithdraws()
      .then(res => {
        setWithdraws(res)
      })
    })

    return () => {
      pb.collection('withdraws').unsubscribe('*')
    }
  }, [])

  function exportToExcel () {
    const array = withdraws?.map((withdraw) => {
      return {
        создано: dayjs(withdraw?.created).format('YY/MM/DD, HH:mm'),
        пользователь: withdraw?.user,
        фио: `${withdraw?.expand?.user?.name} ${withdraw?.expand?.user?.surname}`,
        банк: withdraw?.bank, 
        сумма: withdraw?.sum,
        владелец_карты: withdraw?.owner,
        иин: withdraw?.iin,
        IBAN: withdraw?.iban,
        статус: (
          (withdraw?.status === 'created' && 'Создан') ||
          (withdraw?.status === 'paid' && 'Оплачен') ||
          (withdraw?.status === 'rejected' && 'Отклонен')
        ),
      }
    })
    const worksheet = XLSX.utils.json_to_sheet(array);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    saveAsExcelFile(excelBuffer, 'table_data.xlsx');
  };

  function saveAsExcelFile (buffer, fileName) {
    const data = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const banks = [
    "Народный банк Казахстана",
    "Kaspi Bank",
    "Банк ЦентрКредит",
    "Forte Bank",
    "Евразийский банк",
    "First Heartland Jusan Bank",
    "Bank RBK",
    "Bereke Bank",
    "Банк Фридом Финанс Казахстан",
    "Ситибанк Казахстан",
    "Home Credit Bank Kazakhstan",
    "Нурбанк"
  ]

  function customSort(a, b) {

    const indexA = banks.indexOf(a?.bank);
    const indexB = banks.indexOf(b?.bank);
  
    // If both elements are in the sortOrder array, compare their positions
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
  
    // If only one element is in the sortOrder array, prioritize it
    if (indexA !== -1) {
      return -1;
    }
    if (indexB !== -1) {
      return 1;
    }
  
    // If neither element is in the sortOrder array, maintain their original order
    return 0;
  }

  const sorted = withdraws?.sort(customSort)

  const [confirmModal, setConfirmModal] = React.useState(false)

  const [userData, setUserData] = React.useState({
    modal: false,
    data: null
  })

  const [search, setSearch] = React.useState("");

  async function searchByValue() {
    if (!search) {
      return;
    }
    const foundUsers = await pb.collection("withdraws").getFullList({
      filter: `
        user.id = '${search}' ||
        user.name ?~ '${search}'
      `,
    });

    if (foundUsers.length !== 0) {
      setEndedWithdraws({
        items: [...foundUsers]
      })
      // showNotification({
      //   title: 'Поиск',
      //   message: 'Не найдено',
      //   color: 'teal'
      // })
    }
  }

  return (
    <>
      <div className='w-full bg-white'>
        <Tabs defaultValue='created'>
          <Tabs.List>
            <Tabs.Tab value='created'>Созданные</Tabs.Tab>
            <Tabs.Tab value='ended'>Завершенные</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value='created' pt='lg'>
            <Button onClick={exportToExcel}>Скачать Excel</Button>
            <Table
              striped
              className='mt-4'
            >
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>ID Пользователя</th>
                  <th>ФИО</th>
                  <th>Ур.</th>
                  <th>Банк</th>
                  <th>Сумма</th>
                  <th>Владелец карты</th>
                  <th>ИИН</th>
                  <th>IBAN</th>
                  <th>Статус</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {sorted?.map((withdraw, i) => {
                  return (
                    <tr 
                      key={i}
                    >
                      <td className='!text-lg'>{dayjs(withdraw?.created).format('YY-MM-DD, HH:mm')}</td>
                      <td 
                        className='!text-lg'
                        onClick={() => setUserData({modal: true, data: withdraw?.expand?.user})}
                      >
                        <Button compact variant='outline'>
                          {withdraw?.user}
                        </Button>
                      </td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.expand?.user?.name} {withdraw?.expand?.user?.surname}</td>
                      <td className='!text-lg whitespace-nowrap'>
                        <span className='text-lg mr-2'>
                          {withdraw.expand.user?.level}
                        </span>
                      </td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.bank}</td>
                      <td className='!text-lg whitespace-nowrap'>{formatNumber(withdraw?.sum)}</td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.owner}</td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.iin}</td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.iban}</td>
                      <td className='!text-lg whitespace-nowrap'>
                      {withdraw?.status === 'created' && 'Создан'}
                      {withdraw?.status === 'paid' && <span className='text-green-500'>Оплачен</span>}
                      {withdraw?.status === 'rejected' && <span className='text-red-500'>Отклонен</span>}
                      </td>
                      <td className='flex gap-2 items-center'>
                        {withdraw?.status === 'created' && (
                          <>
                            <BsCheckCircle 
                              size={30} 
                              color='green'
                              onClick={() => confirmWithdrawConfirm(withdraw)}
                              className='cursor-pointer hover:fill-yellow-500'
                            />
                            <CiCircleRemove 
                              size={35}
                              color='red'
                              onClick={() => removeWithdrawConfirm(withdraw)}
                              className='cursor-pointer hover:fill-yellow-500'
                            />
                          </>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>

          </Tabs.Panel>
          <Tabs.Panel value='ended'>
            <div className="flex items-end">
              <TextInput
                label="Поиск"
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                className='w-96'
              />
              <Button
                onClick={() => searchByValue()}
              >
                Поиск
              </Button>
            </div>
            <Table
              striped
              className='mt-4'
            >
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>ID Пользователя</th>
                  <th>ФИО</th>
                  <th>Банк</th>
                  <th>Сумма</th>
                  <th>Владелец карты</th>
                  <th>ИИН</th>
                  <th>IBAN</th>
                  <th>Статус</th>
                  {/* <th>Действие</th> */}
                </tr>
              </thead>
              <tbody>
                {endedWithdraws?.items?.map((withdraw, i) => {
                  return (
                    <tr 
                      key={i}
                    >
                      <td className='!text-lg whitespace-nowrap'>{dayjs(withdraw?.created).format('YY-MM-DD, HH:mm')}</td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.user}</td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.expand?.user?.name} {withdraw?.expand?.user?.surname}</td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.bank}</td>
                      <td className='!text-lg whitespace-nowrap'>{formatNumber(withdraw?.sum)}</td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.owner}</td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.iin}</td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.iban}</td>
                      {/* <td className='!text-lg'>{withdraw?.card}</td> */}
                      <td className='!text-lg whitespace-nowrap'>
                      {withdraw?.status === 'created' && 'Создан'}
                      {withdraw?.status === 'paid' && <span className='text-green-500'>Оплачен</span>}
                      {withdraw?.status === 'rejected' && <span className='text-red-500'>Отклонен</span>}
                      </td>
                      <td className='flex gap-2 items-center'>
                        {/* {withdraw?.status === 'created' && (
                          <>
                            <BsCheckCircle 
                              size={30} 
                              color='green'
                              onClick={() => confirmWithdrawConfirm(withdraw?.id)}
                              className='cursor-pointer hover:fill-yellow-500'
                            />
                            <CiCircleRemove 
                              size={35}
                              color='red'
                              onClick={() => removeWithdrawConfirm(withdraw)}
                              className='cursor-pointer hover:fill-yellow-500'
                            />
                          </>
                        )} */}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          <div className='flex justify-center'>
            <Pagination
              value={endedWithdraws?.page}
              total={endedWithdraws?.totalPages}
              onChange={e => handleWithdraws(e)}
            />
          </div>
          </Tabs.Panel>
        </Tabs>
      </div>
      <Modal 
        opened={confirmModal}
        onClose={() => setConfirmModal(false)}
        centered
        title='Подтвердите действие'
      >
        Вы действительно хотите отправить данную сумму?
        <div className='flex justify-end gap-4'>
          <Button>
            Подтвердить
          </Button>
          <Button>
            Отмена
          </Button>
        </div>
      </Modal>
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
        <ul className='space-y-2'>
          <li className='grid grid-cols-2'>
            <p>ID:</p>
            <p>{userData?.data?.id}</p>
          </li>
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
      </Modal>
    </>
  )
}