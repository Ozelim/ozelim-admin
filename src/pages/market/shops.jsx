import React from 'react'
import { useDisclosure } from '@mantine/hooks'
import { pb } from 'shared/api'
import { Button, CloseButton, Table, Text } from '@mantine/core'
import { getImageUrl } from 'shared/lib'
import { openConfirmModal } from '@mantine/modals'

async function getShops () {
  return await pb.collection('markets').getFullList({
    expand: 'merchant',
    sort: 'created',
  })
}

export const Shops = () => {

  const [shops, setShops] = React.useState([])

  const createdShops = shops?.filter(shop => shop.status === 'created')

  const [loading, loading_h] = useDisclosure(false)

  async function handleShops () {
    loading_h.open()
    await getShops()
    .then(res => {
      setShops(res)
    })
    .finally(() => {
      loading_h.close()
    })
  }

  async function createShop (shop) {
    openConfirmModal({
      title: 'Подтвердите действие',
      children: 'Вы уверены что хотите создать новый магазин?',
      labels: {confirm: 'Подтвердить', cancel: 'Отмена'},
      centered: true,
      onConfirm: async () => {
        loading_h.open()
        await pb.collection('markets').update(shop?.id, {
          status: 'posted',
          dates: {...shop?.dates, created: new Date()},
        })
        .then(() => {
          handleShops()
        })
        .finally(() => {
          loading_h.close()
        })
      }
    })
  }

  async function disableShop (shop) {
    openConfirmModal({
      title: 'Подтвердите действие',
      children: 'Вы уверены что хотите отклонить заявку на создание магазина?',
      labels: {confirm: 'Подтвердить', cancel: 'Отмена'},
      centered: true,
      onConfirm: async () => {
        loading_h.open()
        await pb.collection('markets').update({
          status: 'disabled',
          dates: {...shop?.dates, created: new Date()},
        })
        .then(() => {
          handleShops()
        })
        .finally(() => {
          loading_h.close()
        })
      }
    })
  }

  React.useEffect(() => {
    handleShops()
  }, [])

  return (
    <div className='w-full'>
      <p className='text-xl'>Магазины ожидающие подтверждения</p>
      <Table
        className='mt-4'
      >
        <thead>
          <tr>
            <th>Название</th>
            <th>Адрес</th>
            <th>Телефон</th>
            <th>Email</th>
            <th>Документы</th>
            <th>Дейтсвие</th>
          </tr>
        </thead>
        <tbody>
          {createdShops?.map(shop => (
            <tr key={shop.id}>
              <td>{shop.name}</td>
              <td>{shop.address}</td>
              <td>{shop.phone}</td>
              <td>{shop.expand?.merchant?.email}</td>
              <td>
                <div className='flex flex-col gap-2'>
                  {shop.docs?.map((doc, i) => (
                    <a key={i} href={getImageUrl(shop, doc)} target='_blank' rel='noreferrer' className='text-blue-500 underline'>
                      <Text lineClamp={1}>{doc}</Text>
                    </a>
                  ))}
                </div>
              </td>
              <td>
                <div className='flex items-center gap-3'>
                  <Button
                    onClick={() => createShop(shop)}
                  >
                    Создать магазин
                  </Button>
                  <CloseButton
                    onClick={() => disableShop(shop)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
