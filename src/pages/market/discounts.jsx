import React from 'react'
import { Button, Text } from '@mantine/core'
import { pb } from 'shared/api'
import { getImageUrl, formatNumber } from 'shared/lib'
import { openConfirmModal } from '@mantine/modals'

import dayjs from 'dayjs'

async function getDiscounts() {
  return await pb.collection('products').getFullList({
    filter: 'discount.status = "waiting"',
    expand: 'merchant_id, market_id',
  })
}

export const Discounts = () => {

  const [discounts, setDiscounts] = React.useState([])

  async function handleDiscounts() {
    const res = await getDiscounts()
    setDiscounts(res)
  }

  function calculateTime(product) {
    const start = dayjs(new Date()).unix()
    const end = start + (product?.discount?.value * 60 * 60)
    return { start, end }
  }

  React.useEffect(() => {
    handleDiscounts()
  }, [])

  const handleActivate = (product) => {
    openConfirmModal({
      centered: true,
      labels: {
        confirm: 'Активировать',
        cancel: 'Назад',
      },
      title: 'Активировать скидку',
      children: 'Вы уверены, что хотите активировать скидку?',
      onConfirm: async () => {
        await pb.collection('products').update(product?.id, {
          discount: {
            ...product?.discount,
            start: dayjs(new Date()).unix(),
            end: (dayjs(new Date()).unix() + (product?.discount?.value * 60 * 60)),
            percent: product?.discount?.percent,
            status: 'active',
          },
        })
        .then(async () => {
          showNotification({
            title: 'Скидка Дня',
            message: 'Скидка активирована успешно',
            color: 'green',
          })
          await handleDiscounts()
        })
      },
    })
  }

  const handleReject = (product) => {
    openConfirmModal({
      centered: true,
      labels: {
        confirm: 'Отклонить',
        cancel: 'Назад',
      },
      title: 'Отклонить скидку',
      children: 'Вы уверены, что хотите отклонить скидку?',
      onConfirm: async () => {
        await pb.collection('products').update(product?.id, {
          discount: null,
        })
        .then(async () => {
            showNotification({
            title: 'Скидка дня',
            message: 'Скидка отклонена',
            color: 'red',
          })
          await handleDiscounts()
        })
      },
    })
  }

  return (
    <div className="w-full h-full">
      {discounts?.length === 0 && (
        <div className='flex flex-col items-center justify-center h-full'>
          <Text>Нет заявок на скидку</Text>
        </div>
      )}
      <div className="flex flex-wrap gap-4">
        {discounts?.map((item) => (
          <div className="flex flex-col border h-full w-[277px]" key={item?.id}>
            {item?.pics?.[0] instanceof File ||
            item?.pics?.[0] instanceof Blob ? (
              <img
                src={getImageUrl(item, item?.pics?.[0])}
                alt=""
                className="aspect-square object-cover w-[277px] h-[308px]"
                key={Math.random()}
              />
            ) : !item?.pics?.[0] ? (
              <div
                className="aspect-square bg-slate-200 w-[277px] h-[308px]"
                key={Math.random()}
              />
            ) : (
              <img
                src={getImageUrl(item, item?.pics?.[0])}
                alt=""
                className="aspect-square object-cover w-[277px] h-[308px]"
                key={Math.random()}
              />
            )}
            <div className="p-3 flex flex-col h-full">
              <Text lineClamp={1} className="font-semibold">
                {item?.name}
              </Text>
              <Text className="mt-2 !text-[15px] -mb-4" lineClamp={3}>
                {item?.description}
              </Text>
              <p className="mt-6 font-bold">{formatNumber(item?.price)} ₸</p>
              <Button
                className="mt-4"
                component="a"
                href={`https://oz-elim.kz/duken/product/${item?.id}`}
                target="_blank"
                variant="outline"
              >
                Предпросмотр
              </Button>
              <div className='mt-4'>
                <ul className='flex gap-4 justify-between items-center'>
                  <li>
                    <p>Скидка</p>
                    <p className='font-bold'>{item?.discount?.percent}%</p>
                  </li>
                  <li>
                    <p>Длительность</p>
                    <p className='font-bold'>{item?.discount?.value} часов</p>
                  </li>
                </ul>
                <Button
                  className="mt-4"
                  fullWidth
                  variant='light'
                  onClick={() => handleActivate(item)}
                >
                  Активировать
                </Button>
                <Button
                  className="mt-4"
                  fullWidth
                  variant='light'
                  color='red'
                  onClick={() => handleReject(item)}
                >
                  Отклонить
                </Button>
              </div>
          
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}