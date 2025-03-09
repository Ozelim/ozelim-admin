import React from 'react'
import { Tabs, Button, Text } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { pb } from 'shared/api'
import { formatNumber, getImageUrl } from 'shared/lib'

async function getAllProducts () {
  return await pb.collection('products').getFullList()
}

export const Rare = () => {

  const [prods, setProds] = React.useState([])

  async function handleProducts (page) {
    const res = await getAllProducts(page)
    setProds(res)
  } 

  const defaultProducts = prods?.filter(item => item?.rare === false)
  const exclusiveProducts = prods?.filter(item => item?.rare === true)

  async function makeRare (id) {
    openConfirmModal({
      title: 'Подтвердите действие',
      children: 'Вы уверены что хотите сделать товар эксклюзивным?',
      labels: {confirm: 'Подтвердить', cancel: 'Назад'},
      centered: true,
      onConfirm: async () => {
        await pb.collection('products').update(id, {
          rare: true
        })
        .then(async () => {
          await handleProducts()
          showNotification({
            title: 'Товар',
            message: 'Товар теперь эксклюзивный',
            color: 'teal',
          })
        })
      }
    })
  }

  async function makeDefault (id) {
    openConfirmModal({
      title: 'Подтвердите действие',
      children: 'Вы уверены что хотите убрать товар из эксклюзивных?',
      labels: {confirm: 'Подтвердить', cancel: 'Назад'},
      centered: true,
      onConfirm: async () => {
        await pb.collection('products').update(id, {
          rare: false
        })
        .then(async () => {
          await handleProducts()
          showNotification({
            title: 'Товар',
            message: 'Товар больше не эксклюзивный',
            color: 'teal',
          })
        })
      }
    })
  }

  React.useEffect(() => {
    handleProducts()
  }, [])

  return (
    <Tabs
      defaultValue='all'
    >
      <Tabs.List>
        <Tabs.Tab value='all'>Все товары</Tabs.Tab>
        <Tabs.Tab value='rare'>Эксклюзивные</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel pt={16} value='all'>
        {defaultProducts?.length === 0 && (
          <div className='flex flex-col items-center justify-center h-full'>
            <Text>Нет товаров</Text>
          </div>
        )}
        <div className='flex flex-wrap gap-4'>
          {defaultProducts?.map(item => (
            <div className='flex flex-col border h-full w-[277px]' key={item?.id}>
              {(item?.pics?.[0] instanceof File || item?.pics?.[0] instanceof Blob) 
              ?
                <img
                  src={getImageUrl(item, item?.pics?.[0])}
                  alt=""
                  className="aspect-square object-cover w-[277px] h-[308px]" key={Math.random()}
                />
              : 
                !item?.pics?.[0] ? (
                  <div className='aspect-square bg-slate-200 w-[277px] h-[308px]' key={Math.random()}/>
                ) : 
                <img 
                  src={getImageUrl(item, item?.pics?.[0])}
                  alt="" 
                  className='aspect-square object-cover w-[277px] h-[308px]'
                  key={Math.random()}
                />
            }
            <div className="p-3 flex flex-col h-full">
              <Text lineClamp={1} className='font-semibold'>
                {item?.name}
              </Text>
              <Text className='mt-2 !text-[15px] -mb-4' lineClamp={3}>
                {item?.description}
              </Text>
              <p className='mt-6 font-bold'>{formatNumber(item?.price)} ₸</p>
              <Button
                className='mt-4'
                component='a'
                href={`https://oz-elim.kz/duken/product/${item?.id}`}
                target='_blank'
                variant='outline'
              >
                Предпросмотр
              </Button>
              <Button
                className='mt-2'
                onClick={() => makeRare(item?.id)}
              >
                Сделать эксклюзивным
              </Button>
              
            </div>
            </div>
          ))}
        </div>
      </Tabs.Panel>
      <Tabs.Panel pt={16} value='rare'>
        {exclusiveProducts?.length === 0 && (
          <div className='flex flex-col items-center justify-center h-full'>
            <Text>Нет эксклюзивных товаров</Text>
          </div>
        )}
        <div className='flex flex-wrap gap-4'>
          {exclusiveProducts?.map(item => (
            <div className='flex flex-col border h-full w-[277px]'>
              {(item?.pics?.[0] instanceof File || item?.pics?.[0] instanceof Blob) 
              ?
                <img
                  src={getImageUrl(item, item?.pics?.[0])}
                  alt=""
                  className="aspect-square object-cover w-[277px] h-[308px]" key={Math.random()}
                />
              : 
                !item?.pics?.[0] ? (
                  <div className='aspect-square bg-slate-200 w-[277px] h-[308px]' key={Math.random()}/>
                ) : 
                <img 
                  src={getImageUrl(item, item?.pics?.[0])}
                  alt="" 
                  className='aspect-square object-cover w-[277px] h-[308px]'
                  key={Math.random()}
                />
            }
              <div className="p-3 flex flex-col h-full">
                <Text lineClamp={1} className='font-semibold'>
                  {item?.name}
                </Text>
                <Text className='mt-2 !text-[15px] -mb-4' lineClamp={3}>
                  {item?.description}
                </Text>
                <p className='mt-6 font-bold'>{formatNumber(item?.price)} ₸</p>
                <Button
                  className='mt-4'
                  component='a'
                  href={`https://oz-elim.kz/duken/product/${item?.id}`}
                  target='_blank'
                  variant='outline'
                >
                  Предпросмотр
                </Button>
                <Button
                  className='mt-2'
                  onClick={() => makeDefault(item?.id)}
                >
                  Убрать из эксклюзивных
                </Button>
                
              </div>
            </div>
          ))}
        </div>
      </Tabs.Panel>
    </Tabs>
  )
} 