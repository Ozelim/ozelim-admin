import { Button, Menu, Modal, NumberInput, Pagination, Table, Tabs } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import dayjs from 'dayjs'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { pb } from 'shared/api'
import { formatNumber, getImageUrl } from 'shared/lib'

async function getOrders (page = 1) {
  return await pb.collection('orders').getList(page, 20, {
    sort: '-created',
    expand: 'user, product_id, market_id',
    filter: `status != 'delivered' && status != 'received' && status != 'canceled'`
  })
}

async function getCanceledOrders (page = 1) {
  return await pb.collection('orders').getList(page, 20, {
    sort: '-created',
    expand: 'user, product_id, market_id',
    filter: `status = 'canceled'`
  })
}

async function getEndedOrders (page = 1) {
  return await pb.collection('orders').getList(page, 20, {
    sort: '-created',
    expand: 'user, product_id, market_id',
    filter: `status = 'delivered || status = 'received'` 
  })
}

const statuses = {
  waiting: 'Ожидает оплаты',
  processing: 'В обработке',
  paid: 'Оплачено',
  moving: 'В пути',
  delivered: 'Доставлено', 
  received: 'Получено',
  returned: 'Возвращен',
  canceled: 'Отменен'
}

export const Orders = () => {

  const [orders, setOrders] = React.useState({})

  const [canceledOrders, setCanceledOrders] = React.useState({})
  const [endedOrders, setEndedOrders] = React.useState({})

  const [refundData, setRefundData] = React.useState({})
  const [refundModal, refundModal_h] = useDisclosure(false)
  const [refundSum, setRefundSum] = React.useState(0)

  function handleRefundModal (q) {
    setRefundData(q)
    refundModal_h.open()
  }

  async function refundMoney () {
    await pb.collection('orders').update(refundData?.id, {
      refunded: true,
      refund_sum: refundSum
    })
  }

  React.useEffect(() => {
    getOrders()
    .then(res => {
      setOrders(res)
    })
    getCanceledOrders()
    .then(res => {
      setCanceledOrders(res)
    })
    getEndedOrders()
    .then(res => {
      setEndedOrders(res)
    })
  }, [])

  return (
    <>
      <div className='w-full h-full'>
        <Tabs
          defaultValue='orders'
        >
          <Tabs.List>
            <Tabs.Tab value='orders'>Актуальные</Tabs.Tab>
            <Tabs.Tab value='canceled'>Отмененные</Tabs.Tab>
            <Tabs.Tab value='ended'>Завершенные</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='orders' pt={20}>
            <Table
              className='bg-white p-3 border shadow-sm rounded-primary'
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Дата</th>
                  <th>Товар</th>
                  <th>Кол-во (шт)</th>
                  <th>Сумма</th>
                  <th>Имя покупателя</th>
                  <th>Адрес доставки</th>
                  <th>Статус</th>
                  <th>Действие</th>
                </tr>
              </thead>  
              <tbody>
                {orders?.items?.map((q, i) => {
                  const p = q?.expand?.product_id
                  const u = q?.expand?.user
                  return (
                    <tr key={i}>
                      <td>{q?.id}</td>
                      <td>{dayjs(q?.created).format('DD.MM.YYYY, HH:mm')}</td>
                      <td>
                        <a href={`https://oz-elim.kz/duken/product/${p?.id}`} target='_blank'>
                          <div className='flex gap-2 items-center cursor-pointer'>
                            <img src={getImageUrl(p, p?.pics?.[0])} className='w-14 h-14 object-cover'/>   
                            {p?.name}                 
                          </div>
                        </a>
                      </td>
                      <td>{q?.product?.count}</td>
                      <td>{formatNumber(q?.product?.price * q?.product?.count)}</td>
                      <td>{u?.fio}</td>
                      <td>{u?.address ?? '-'}</td>
                      <td>
                        <Button
                          color='teal'
                          size='xs'
                          radius='xl'
                        >
                          {statuses?.[q?.status]}
                        </Button>
                      </td>
                      <td>
                        <Menu
                          shadow='sm'
                          width={200}
                        >
                          <Menu.Target>
                            <Button
                              compact
                              variant='white'
                            >
                              <BsThreeDotsVertical size={25} />
                            </Button>
                          </Menu.Target>
                          <Menu.Dropdown>
                            <Menu.Item
                              color='red'
                            >
                              Отменить заказ
                            </Menu.Item>
                            <Menu.Item color='green'>
                              Завершить заказ
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>   
            <div className="flex justify-center mt-4">
              <Pagination
                value={orders?.page}
                onChange={(page) => {
                  getOrders(page)
                  .then(res => {
                    setOrders(res)
                  })
                }}
                total={orders?.totalPages}
              />
            </div>
          </Tabs.Panel>
          <Tabs.Panel value='canceled' pt={20}>
            <Table
              className='bg-white p-3 border shadow-sm rounded-primary'
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Дата</th>
                  <th>Товар</th>
                  <th>Кол-во (шт)</th>
                  <th>Сумма</th>
                  <th>Имя покупателя</th>
                  <th>Адрес доставки</th>
                  <th>Статус</th>
                  <th>Действие</th>
                </tr>
              </thead>  
              <tbody>
                {canceledOrders?.items?.map((q, i) => {
                  const p = q?.expand?.product_id
                  const u = q?.expand?.user
                  return (
                    <tr key={i}>
                      <td>{q?.id}</td>
                      <td>{dayjs(q?.created).format('DD.MM.YYYY, HH:mm')}</td>
                      <td>
                        <a href={`https://oz-elim.kz/duken/product/${p?.id}`} target='_blank'>
                          <div className='flex gap-2 items-center cursor-pointer'>
                            <img src={getImageUrl(p, p?.pics?.[0])} className='w-14 h-14 object-cover'/>   
                            {p?.name}                 
                          </div>
                        </a>
                      </td>
                      <td>{q?.product?.count}</td>
                      <td>{formatNumber(q?.product?.price * q?.product?.count)}</td>
                      <td>{u?.fio}</td>
                      <td>{u?.address ?? '-'}</td>
                      <td>
                        <Button
                          color='teal'
                          size='xs'
                          radius='xl'
                        >
                          {statuses?.[q?.status]}
                        </Button>
                      </td>
                      <td>
                        <Menu
                          shadow='sm'
                          width={200}
                        >
                          <Menu.Target>
                            <Button
                              compact
                              variant='white'
                            >
                              <BsThreeDotsVertical size={25} />
                            </Button>
                          </Menu.Target>
                          <Menu.Dropdown>
                            <Menu.Item
                              color='red'
                              onClick={() => handleRefundModal(q)}
                            >
                              Вернуть средства
                            </Menu.Item>
                            <Menu.Item color='green'>
                              Завершить заказ
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>   
            <div className="flex justify-center mt-4">
              <Pagination/>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value='ended' pt={20}>
            <Table
              className='bg-white p-3 border shadow-sm rounded-primary'
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Дата</th>
                  <th>Товар</th>
                  <th>Кол-во (шт)</th>
                  <th>Сумма</th>
                  <th>Имя покупателя</th>
                  <th>Адрес доставки</th>
                  <th>Статус</th>
                  <th>Действие</th>
                </tr>
              </thead>  
              <tbody>
                {endedOrders?.items?.map((q, i) => {
                  const p = q?.expand?.product_id
                  const u = q?.expand?.user
                  return (
                    <tr key={i}>
                      <td>{q?.id}</td>
                      <td>{dayjs(q?.created).format('DD.MM.YYYY, HH:mm')}</td>
                      <td>
                        <a href={`https://oz-elim.kz/duken/product/${p?.id}`} target='_blank'>
                          <div className='flex gap-2 items-center cursor-pointer'>
                            <img src={getImageUrl(p, p?.pics?.[0])} className='w-14 h-14 object-cover'/>   
                            {p?.name}                 
                          </div>
                        </a>
                      </td>
                      <td>{q?.product?.count}</td>
                      <td>{formatNumber(q?.product?.price * q?.product?.count)}</td>
                      <td>{u?.fio}</td>
                      <td>{u?.address ?? '-'}</td>
                      <td>
                        <Button
                          color='teal'
                          size='xs'
                          radius='xl'
                        >
                          {statuses?.[q?.status]}
                        </Button>
                      </td>
                      <td>
                        <Menu
                          shadow='sm'
                          width={200}
                        >
                          <Menu.Target>
                            <Button
                              compact
                              variant='white'
                            >
                              <BsThreeDotsVertical size={25} />
                            </Button>
                          </Menu.Target>
                          <Menu.Dropdown>
                            <Menu.Item
                              color='red'
                            >
                              Вернуть средства
                            </Menu.Item>
                            <Menu.Item color='green'>
                              Завершить заказ
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table> 
            <div className="flex justify-center mt-4">
              <Pagination/>
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
      <Modal
        opened={refundModal}
        onClose={() => refundModal_h.close()}
        centered
        title='Отмененный заказ'
      >
        <p>Оплаченная сумма: {formatNumber(refundData?.total_cost - refundData?.bonuses_spent)} тг.</p>
        <p>IBAN: {refundData?.refund_data?.iban}</p>
        <p>ФИО: {refundData?.refund_data?.name}</p>
        <p>ИИН: {refundData?.refund_data?.iin}</p>
        <NumberInput
          label='Возвращаемая сумма'
          hideControls
          value={refundSum}
          onChange={e => setRefundSum(e)}
          className='mt-4'
        />
        <div className="flex justify-center mt-4">
          <Button
            onClick={refundMoney}
          >
            Вернуть средства
          </Button>
        </div>
      </Modal>
    </>
  )
}
