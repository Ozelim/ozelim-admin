import React from 'react'
import { Button, TextInput } from '@mantine/core'
import { pb } from 'shared/api'
import { randomId, useDisclosure } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'

async function getCategories () {
  return (await pb.collection('categories').getFullList())?.[0]
}

export const Categories = () => {

  const [category, setCategory] = React.useState({
    label: '',
    sub: '',
    list: []
  })
  
  const [catLoading, catLoading_] = useDisclosure(false)
  
  const [categories, setCategories] = React.useState({})

  async function handleCategories () {
    await getCategories()
    .then(res => {
      setCategories(res)
    })
  }

  React.useEffect(() => {
    handleCategories()
  }, [])

  function addSubCategory () {
    setCategory({
      ...category,
      list: [...category?.list, category?.sub], 
      sub: ''
    })
  }

  async function submit () {
    catLoading_.open()
    await pb.collection('categories').update(categories?.id, {
      categories: [...categories?.categories ?? [], {
        label: category?.label,
        id: randomId()?.replace('mantine-', ''),
        subs: [...category?.list?.map((q, i) => {
          return {
            label: q,
            id: i + 1
          }
        })]
      }]
    })
    .then(res => {
      setCategory({
        label: '',
        list: [],
        sub: ''
      })
      handleCategories()
      console.log(res, 'res');
    })
    .finally(() => {
      catLoading_.close()
    })
    .catch(err => {
      catLoading_.close()
    })
  }

  return (
    <>
      <div>
        <TextInput
          label='Категория'
          onChange={e => setCategory({...category, label: e?.currentTarget?.value})}
          value={category?.label ?? ''}
          className='max-w-xs'
        />
        <div className='flex items-end gap-4'>
          <TextInput
            label='Под категория'
            onChange={e => setCategory({...category, sub: e?.currentTarget?.value})}
            value={category?.sub ?? ''}
          />
          <Button
            onClick={addSubCategory}
          >
            Добавить под категорию
          </Button>
          <div className='flex gap-4'>
            {category?.list?.map((q, i) => {
              return (
                <p key={i}>{q}</p>
              )
            })}
          </div>
        </div>
        
        <div className="flex mt-4 max-w-xs">
          <Button
            onClick={submit}
            loading={catLoading}
          >
            Добавить категорию
          </Button>
        </div>
      </div>

      <div className='flex flex-col border shadow-md max-w-[200px] mt-4 bg-white'>
        {categories?.categories?.map((q, i) => {
          return (
            <div className='p-3 border-t-2' key={i}>
              <button>
                {q?.label}
              </button>
              <ul className='ml-2 space-y-2 mt-2'>
                {q?.subs?.map((q, i) => {
                  return (
                    <li key={i}>
                      <button className='text-sm'>
                        {q?.label}
                      </button>
                    </li>
                  ) 
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </>
  )
}
