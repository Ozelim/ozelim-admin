import React from 'react'
import { Tabs, Button, Text } from '@mantine/core'
import { pb } from 'shared/api'
import { formatNumber, getImageUrl } from 'shared/lib'

async function getAllProducts (page = 1) {
  return await pb.collection('products').getList(page, 20, {
    expand: 'market_id',
    filter: `status != 'moderation'`
  })
}

export const Products = () => {

  const [prods, setProds] = React.useState({})

  async function handleProds (page) {
    getAllProducts(page)
    .then(res => {
      setProds(res)
    })
  }

  React.useEffect(() => {
    handleProds()
  }, [])

  return (
    <div>
      <Tabs
        defaultValue='all'
      >
        <Tabs.List>
          <Tabs.Tab value='all'>Все товары</Tabs.Tab>
          <Tabs.Tab value='rare'>Эксклюзивные</Tabs.Tab>
          <Tabs.Tab value='discounts'>Скидки дня</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel pt={16} value='all'>
          <div className='flex flex-wrap gap-4'>
            {prods?.items?.map(item => (
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
                  onClick={() => activateProduct(item?.id)}
                >
                  Сделать эксклюзивным
                </Button>
                
              </div>
              </div>
            ))}
          </div>
        </Tabs.Panel>
        <Tabs.Panel pt={16} value='rare'>
          
        </Tabs.Panel>
        <Tabs.Panel pt={16} value='discounts'>
          
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}