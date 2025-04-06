import React from 'react'
import { useDisclosure } from '@mantine/hooks'
import { pb } from 'shared/api'
import { Button, CloseButton, LoadingOverlay, Table, Text } from '@mantine/core'
import { getImageUrl } from 'shared/lib'
import { openConfirmModal } from '@mantine/modals'

async function getShops() {
  return await pb.collection('markets').getFullList({
    expand: 'merchant, products',
    sort: 'created',
    filter: `status != 'created'`,
  })
}

async function getOrdersByMarket(id) {
  return await pb.collection('orders').getFullList({
    filter: `market_id = '${id}'`,
    fields: 'id, status, created, total_payed, total_amount',
  })
}

export const AllShops = () => {
  const [shops, setShops] = React.useState([])

  const [shop, setShop] = React.useState({})
  const [orders, setOrders] = React.useState([])

  async function handleShopSelect(shop) {
    setShop(shop)
    await getOrdersByMarket(shop.id).then((res) => {
      console.log(res)
      setOrders(res)
    })
  }

  const [loading, loading_h] = useDisclosure(false)

  async function handleShops() {
    loading_h.open()
    await getShops()
      .then((res) => {
        setShops(res)
      })
      .finally(() => {
        loading_h.close()
      })
  }

  async function disableShop(shop) {
    openConfirmModal({
      title: 'Подтвердите действие',
      children: 'Вы уверены что хотите отклонить заявку на создание магазина?',
      labels: { confirm: 'Подтвердить', cancel: 'Отмена' },
      centered: true,
      onConfirm: async () => {
        loading_h.open()
        await pb
          .collection('markets')
          .update({
            status: 'disabled',
            dates: { ...shop?.dates, created: new Date() },
          })
          .then(() => {
            handleShops()
          })
          .finally(() => {
            loading_h.close()
          })
      },
    })
  }

  React.useEffect(() => {
    handleShops()
  }, [])

  return (
    <>
      <LoadingOverlay visible={loading} />
      <div className="grid grid-cols-[75%_auto] gap-4">
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Название</th>
              <th>Адрес</th>
              <th>Телефон</th>
              <th>Email</th>
              <th>Документы</th>
            </tr>
          </thead>
          <tbody>
            {shops?.map((shop) => (
              <tr key={shop.id} onClick={() => handleShopSelect(shop)}>
                <td className="max-w-[200px]">{shop.name}</td>
                <td>{shop.address}</td>
                <td>{shop.phone}</td>
                <td>{shop.expand?.merchant?.email}</td>
                <td>
                  <div className="flex flex-col gap-2">
                    {shop.docs?.map((doc, i) => (
                      <a
                        key={i}
                        href={getImageUrl(shop, doc)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline"
                      >
                        <Text lineClamp={1}>{doc}</Text>
                      </a>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {shop?.id && (
          <div className="w-full h-full border shadow-md rounded-md p-3 space-y-4">
            <div className="space-y-4">
              <Text fw={500}>Товары</Text>
              <div className="flex flex-col gap-2">
                {shop?.expand?.products?.map((product, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <img
                      src={getImageUrl(product, product?.pics?.[0])}
                      alt={product?.name}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <Text lineClamp={1}>{product?.name}</Text>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Text fw={500}>Заказы ({orders?.length})</Text>
              <ul className='space-y-2'>
                <li className='flex items-center gap-3'>
                  <p>
                  Завершенные
                  </p>
                  <p>
                   {orders?.filter((order) =>  order?.status === 'received' && order?.status === 'returned' && order?.status === 'canceled')?.length}
                  </p>
                </li>
                <li className='flex items-center gap-3'>
                  <p>В процессе</p>
                  <p>
                    {orders?.filter((order) => order?.status !== 'received' && order?.status !== 'returned' && order?.status !== 'canceled')?.length}
                  </p>
                </li>
                <li className='flex items-center gap-3'>
                  <p>Отмененные</p>
                  <p>
                    {orders?.filter((order) => order?.status === 'canceled' || order?.status === 'returned')?.length}
                  </p>
                </li>
              </ul>
            </div>
            <div className='space-y-4'>
              <Text fw={500}>Оборот</Text>
              <p>
                {orders?.reduce((acc, order) => acc + order?.total_payed, 0)} ₸
              </p>
            </div>
            <div className='flex gap-2'>
              <Button>
                Подробнее
            </Button>
            <Button>
                Перейти в чат
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
