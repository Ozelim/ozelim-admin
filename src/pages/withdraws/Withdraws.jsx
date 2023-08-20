import React from 'react'
import { Pagination, Table } from '@mantine/core'
import { pb } from 'shared/api'
import { formatNumber } from 'shared/lib'

import { BsCheckCircle } from 'react-icons/bs'
import { CiCircleRemove } from 'react-icons/ci'
import { openConfirmModal } from '@mantine/modals'

import dayjs from 'dayjs'

async function getWithdraws (page = 1) {
  return await pb.collection('withdraws').getList(page, 20, {
    filter: `status = 'created'`
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
      status: 'paid'
    })
  }

  async function deleteWithdraw (withdrawId) {
    await pb.collection('withdraws').delete(withdrawId)
  }

  const confirmWithdrawConfirm = (withdrawId) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    labels: { confirm: 'Подтвердить', cancel: 'Отмена'},
    onConfirm: () => confirmWithdraw(withdrawId)
  })
  
  const removeWithdrawConfirm = (withdrawId) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    labels: { confirm: 'Подтвердить', cancel: 'Отмена'},
    onConfirm: () => deleteWithdraw(withdrawId)
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

  return (
    <div className='w-full'>
      <Table>
        <thead>
          <tr>
            <th>Дата</th>
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
                <td>{dayjs(withdraw?.created).format('YY-MM-DD, HH:mm')}</td>
                <td>{formatNumber(withdraw?.sum)}</td>
                <td>{withdraw?.owner}</td>
                <td>{withdraw?.card}</td>
                <td>{withdraw?.status}</td>
                <td className='flex gap-2 items-center'>
                  <BsCheckCircle 
                    size={30} 
                    color='green'
                    onClick={() => confirmWithdrawConfirm(withdraw?.id)}
                  />
                  <CiCircleRemove 
                    size={35}
                    color='red'
                    onClick={() => removeWithdrawConfirm(withdraw?.id)}
                  />
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
