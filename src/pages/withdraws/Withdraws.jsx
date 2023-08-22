import React from 'react'
import { Button, Pagination, Table } from '@mantine/core'
import { pb } from 'shared/api'
import { formatNumber } from 'shared/lib'

import { BsCheckCircle } from 'react-icons/bs'
import { CiCircleRemove } from 'react-icons/ci'
import { openConfirmModal } from '@mantine/modals'

import dayjs from 'dayjs'

import * as XLSX from 'xlsx';

async function getWithdraws (page = 1) {
  return await pb.collection('withdraws').getList(page, 20, {
    // filter: `status = 'created'`
    sort: '-created'
  })
}

export const Withdraws = () => {

  const [withdraws, setWithdraws] = React.useState({})

  async function handleWithdraws (page) {
    getWithdraws(page)
    .then(res => {
      setWithdraws(res)
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

    pb.collection('withdraws').subscribe('*', function ({_, record}) {
      getWithdraws(withdraws?.page)
      .then(res => {
        setWithdraws(res)
      })
    })

    return () => {
      pb.collection('withdraws').unsubscribe('*')
    }
  }, [])

  const data = [
    { name: 'John Doe', age: 25, email: 'john@example.com' },
    { name: 'Jane Smith', age: 30, email: 'jane@example.com' },
    // Добавьте остальные данные таблицы
  ]

  function exportToExcel () {
    const array = withdraws?.items?.map((withdraw) => {
      return {
        создано: dayjs(withdraw?.created).format('YY/MM/DD, HH:mm'),
        пользователь: withdraw?.user,
        сумма: withdraw?.sum,
        владелец_карты: withdraw?.owner,
        номер_карты: withdraw?.card,
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

  return (
    <div className='w-full bg-white'>
      <Button onClick={exportToExcel}>Скачать Excel</Button>
      <Table
        striped
        className='mt-4'
      >
        <thead>
          <tr>
            <th>Дата</th>
            <th>Пользователь</th>
            <th>Сумма</th>
            <th>Владелец карты</th>
            <th>Номер карты</th>
            <th>Статус</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {withdraws?.items?.map((withdraw, i) => {
            return (
              <tr 
                key={i}
              >
                <td className='!text-lg'>{dayjs(withdraw?.created).format('YY-MM-DD, HH:mm')}</td>
                <td className='!text-lg'>{withdraw?.user}</td>
                <td className='!text-lg'>{formatNumber(withdraw?.sum)}</td>
                <td className='!text-lg'>{withdraw?.owner}</td>
                <td className='!text-lg'>{withdraw?.card}</td>
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
      <div className='flex justify-center'>
        <Pagination
          value={withdraws?.page}
          total={withdraws?.totalPages}
          onChange={e => handleWithdraws(e)}
        />
      </div>
    </div>
  )
}
