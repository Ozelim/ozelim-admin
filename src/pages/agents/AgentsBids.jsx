import { Button, Modal, Table, Textarea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import dayjs from 'dayjs'
import React from 'react'
import { pb } from 'shared/api'

async function getAgentsBids () {
  return await pb.collection('agents_bids').getFullList({expand: 'agent'})
}

export const AgentsBids = () => {

  const [bids, setBids] = React.useState([])
  const [bid, setBid] = React.useState({})

  const [modal, modalHandler] = useDisclosure()

  const [comment, setComment] = React.useState('')

  React.useEffect(() => {
    getAgentsBids()
    .then(res => {
      setBids(res)
    })
  }, [])

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>ФИО</th>
            <th>ИИН</th>
            <th>Номер телефона</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {bids?.map(q => {
            return (
              <tr key={q?.id}>
                <td>{dayjs(q.created).format(`DD.MM.YY, HH:mm`)}</td>

                <td>{q?.fio}</td>
                <td>{q?.iin}</td>
                <td>{q?.phone}</td>
                <td>
                  <Button
                    onClick={() => {
                      setBid(q)
                      modalHandler.open()
                    }}
                  >
                    Договор
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <Modal
        opened={modal}
        centered
        onClose={() => {
          modalHandler.close()
          setBid({})
        }}
        title={`Договор №${bid?.inc} от ${dayjs(bid?.created).format('DD.MM.YYYY')}`}
      >
        <ul className='space-y-2'>
          <li className='grid grid-cols-[20%_auto]'><span className='text-slate-500'>ФИО:</span> {bid?.expand?.agent?.fio}</li>
          <li className='grid grid-cols-[20%_auto]'><span className='text-slate-500'>ID:</span> {bid?.expand?.agent?.id}</li>
          <li className='grid grid-cols-[20%_auto]'><span className='text-slate-500'>Email:</span> {bid?.expand?.agent?.email}</li>
        </ul>
        <p className='mt-4 text-sm'>Подтвердите чтобы сделать данного пользователя агентом</p>
        <Textarea
          label='Или напишите причину отказа'
          classNames={{
            label: '!text-gray-500'
          }}
          className='mt-4'
          description='Если вы отказываете пользователю то обязательно напишите комментарий'
          value={comment}
          onChange={e => setComment(e?.currentTarget?.value)}
          variant='filled'
        />
        <div className='flex justify-center gap-4 mt-6'>
          <Button 
            disabled={!comment}
            onClick={async () => {
              await pb.collection('agents_bids').update(bid?.id, {
                status: 'rejected',
                comment
              })
              .then(res => {
                modalHandler.close()
                showNotification({
                  title: 'Заявка',
                  message: 'Отказано',
                  color: 'red'
                })
              })
            }}
          >
            Отказать
          </Button>
          <Button 
            onClick={async () => {
              await pb.collection('agents_bids').update(bid?.id, {
                status: 'confirmed'
              })
              .then(async res => {
                await pb.collection('agents').update(bid?.agent, {
                  agent: true,
                  agent_date: new Date()
                })
                modalHandler.close()
                showNotification({
                  title: 'Заявка',
                  message: 'Пользователь теперь агент!',
                  color: 'green'
                })
              })
            }}
            disabled={comment}
          >
            Сделать агентом
          </Button>
        </div>
      </Modal>
    </>
  )
}
