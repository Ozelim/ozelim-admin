import React from 'react'
import { Pagination, Table } from '@mantine/core'
import dayjs from 'dayjs'
import { pb } from 'shared/api'
import { formatNumber } from 'shared/lib'

async function getTransfers (page = 1) {
  return await pb.collection('transfers').getList(page, 20)
}

export const MoneyFlow = () => {

  const [transfers, setTransfers] = React.useState({})

  async function handleTransfers (page) {
    getTransfers(page)
    .then(res => {
      setTransfers(res)
    })
  }

  React.useEffect(() => {
    getTransfers()
    .then(res => {
      setTransfers(res)
    })

    pb.collection('transfers').subscribe('*', function ({_, record}) {
      getTransfers(transfers?.page)
      .then(res => {
        setTransfers(res)
      })
    })

    return () => {
      pb.collection('transfers').unsubscribe('*')
    }
  }, [])

  return (
    <div className='w-full'>
      <Table
        striped
      >
        <thead>
          <tr>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Отправитель</th>
            <th>Получатель</th>
          </tr>
        </thead>
        <tbody>
          {transfers?.items?.map((transfer, i) => {
            return (
              <tr 
                key={i}
              >
                <td className='!text-lg'>{dayjs(transfer?.created).format('DD-MM-YY, HH:mm')}</td>
                <td className='!text-lg'>{formatNumber(transfer?.sum)}</td>
                <td className='!text-lg'>{transfer?.user}</td>
                <td className='!text-lg'>{transfer?.taker}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <div className='flex justify-center mt-4'>
        <Pagination
          value={transfers?.page}
          total={transfers?.totalPages}
          onChange={e => handleTransfers(e)}
        />
      </div>
    </div>
  )
}
