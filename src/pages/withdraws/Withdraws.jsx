import React from 'react'
import { Button, Modal, Pagination, Table, Tabs } from '@mantine/core'
import { pb } from 'shared/api'
import { formatNumber } from 'shared/lib'

import { BsCheckCircle } from 'react-icons/bs'
import { CiCircleRemove } from 'react-icons/ci'
import { openConfirmModal } from '@mantine/modals'

import dayjs from 'dayjs'

import * as XLSX from 'xlsx';

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

  async function confirmWithdraw (withdrawId) {
    await pb.collection('withdraws').update(withdrawId, {
      status: 'paid',
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

  const confirmWithdrawConfirm = (withdrawId) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    labels: { confirm: 'Подтвердить', cancel: 'Отмена'},
    children: (
      <>Вы действительно хотите отправить данную сумму?</>
    ),
    onConfirm: () => confirmWithdraw(withdrawId)
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

  return (
    <div className='w-full bg-white'>
      <Tabs>
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
                    <td className='!text-lg'>{withdraw?.user}</td>
                    <td className='!text-lg'>{withdraw?.expand?.user?.name} {withdraw?.expand?.user?.surname}</td>
                    <td className='!text-lg'>{withdraw?.bank}</td>
                    <td className='!text-lg'>{formatNumber(withdraw?.sum)}</td>
                    <td className='!text-lg'>{withdraw?.owner}</td>
                    <td className='!text-lg'>{withdraw?.iin}</td>
                    <td className='!text-lg'>{withdraw?.iban}</td>
                    <td className='!text-lg'>
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
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>

        </Tabs.Panel>
        <Tabs.Panel value='ended'>
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
                    <td className='!text-lg'>{dayjs(withdraw?.created).format('YY-MM-DD, HH:mm')}</td>
                    <td className='!text-lg'>{withdraw?.user}</td>
                    <td className='!text-lg'>{withdraw?.expand?.user?.name} {withdraw?.expand?.user?.surname}</td>
                    <td className='!text-lg'>{withdraw?.bank}</td>
                    <td className='!text-lg'>{formatNumber(withdraw?.sum)}</td>
                    <td className='!text-lg'>{withdraw?.owner}</td>
                    <td className='!text-lg'>{withdraw?.iin}</td>
                    <td className='!text-lg'>{withdraw?.iban}</td>
                    {/* <td className='!text-lg'>{withdraw?.card}</td> */}
                    <td className='!text-lg'>
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
  )
}
