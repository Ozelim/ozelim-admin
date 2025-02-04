import React from 'react'
import { Button, Text } from '@mantine/core'
import { pb } from 'shared/api'
import { formatNumber, getImageUrl } from 'shared/lib'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'

async function getAllProducts (page = 1) {
  return await pb.collection('products').getList(page, 20, {
    expand: `market_id, merchants`
  })
}

export const Products = () => {

  const [prods, setProds] = React.useState({})

  const onModeration = prods?.items?.filter(q => q?.status === 'moderation')

  async function handleProducts (page) {
    const res = await getAllProducts(page)
    setProds(res)
  }

  async function activateProduct (id) {
    openConfirmModal({
      title: 'Подтвердите действие',
      children: 'Вы уверены что хотите активировать товар?',
      labels: {confirm: 'Подтвердить', cancel: 'Отмена'},
      centered: true,
      onConfirm: async () => {
        await pb.collection('products').update(id,{
          status: 'posted'
        })
        .then(() => {
          handleProducts()
          showNotification({
            title: 'Товар',
            message: 'Товар успешно активирован',
            color: 'teal',
          })
        })
      }
    })
  }

  async function rejectProduct (id) {
    openConfirmModal({
      title: 'Подтвердите действие',
      children: 'Вы уверены что хотите отклонить товар?',
      labels: {confirm: 'Отклонить', cancel: 'Отмена'},
      centered: true,
      onConfirm: async () => {
        await pb.collection('products').update(id, {
          status: 'created'
        })
        .then(() => {
          handleProducts()
        })
      }
    })
  }

  React.useEffect(() => {
    handleProducts()
  }, [])

  return (
    <div className='w-full'>
      <div className="grid grid-cols-5 gap-4">
        {onModeration?.map(q => (
          <div className='flex flex-col border h-full w-[277px]'>
          {(q?.pics?.[0] instanceof File || q?.pics?.[0] instanceof Blob) 
            ?
              <img
                src={getImageUrl(q, q?.pics?.[0])}
                alt=""
                className="aspect-square object-cover w-[277px] h-[308px]"
              />
            : 
              !q?.pics?.[0] ? (
                <div className='aspect-square bg-slate-200 w-[277px] h-[308px]'/>
              ) : 
              <img 
                src={getImageUrl(q, q?.pics?.[0])}
                alt="" 
                className='aspect-square object-cover w-[277px] h-[308px]'
              />
          }
          <div className="p-3 flex flex-col h-full">
            <Text lineClamp={2}>
              {q?.name}
            </Text>
            <Text className='mt-2 !text-[15px] -mb-4' lineClamp={3}>
              {q?.description}
            </Text>
            <p className='mt-auto font-bold'>{formatNumber(q?.price)} ₸</p>
            <Button 
              className='mt-4'
              component='a'
              href={`https://oz-elim.kz/market/product/${q?.id}`}
              target='_blank'
              variant='outline'
            >
              Предпросмотр
            </Button>

            <Button
              className='mt-2'
              onClick={() => activateProduct(q?.id)}
            >
              Активировать
            </Button>
            <Button
              className='mt-2'
              onClick={() => rejectProduct(q?.id)}
              color='gray.5'
            >
              Отклонить
            </Button>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}