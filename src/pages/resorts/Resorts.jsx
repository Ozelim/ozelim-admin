import React from 'react'
import { Autocomplete, Button, Modal, NumberInput, Select, TextInput } from '@mantine/core'
import { regions } from 'shared/lib'
import { pb } from 'shared/api'
// import { useSearchParams } from 'react-router-dom'

export const Resorts = () => {

  // const [searchParams] = useSearchParams()

  // console.log(searchParams.get('city'));
  

  const [shitModal, setShitModal] = React.useState(false)
  const [modal, setModal] = React.useState(false)

  const [shit, setShit] = React.useState({
    title: '',
    adress: '',
    region: '',
  })

  const [resort, setResort] = React.useState({
    title: '',
    adress: '',
    region: '',
  })

  async function createBomjResort () {
    await pb.collection('resorts').create({
      ...shit, 
      status: 'bomj'
    })
  }

  async function createGoodResort () {
    await pb.collection('resorts').create({
      ...resort, 
      status: 'good'
    })
  }

  return (
    <>
      <div className='w-full'>
        <div className='space-x-4'>
          <Button
            onClick={() => setShitModal(true)}
          >
            Добавить обычный курорт
          </Button>
          <Button
            onClick={() => setModal(true)}
          >
            Добавить курорт
          </Button>
        </div>
      </div>
      <Modal
        opened={shitModal}
        onClose={() => setShitModal(false)}
        centered
        title='Добавление курорта'
      >
        <div className='space-y-4'>
          <TextInput
            label='Название'
            value={shit.title ?? ''}
            onChange={e => setShit({...shit, title: e.target.value})}
          />
          <Select
            data={regions}
            label='Область'
            dropdownPosition='bottom'
            searchable
            value={shit.region ?? ''}
            onChange={e => setShit({...shit, region: e})}
          />
          <TextInput
            label='Адрес'
            value={shit.adress ?? ''}
            onChange={e => setShit({...shit, adress: e.target.value})}
          />
        </div>
        <div className='mt-5'>
          <Button
            onClick={createBomjResort}
          >
            Добавить курорт
          </Button>
        </div>
      </Modal>
      <Modal
        opened={modal}
        onClose={() => setModal(false)}
        centered
        title='Добавление курорта'
        fullScreen
      l>
        <TextInput
          label='Название'
        />
        <Select
          data={regions}
          label='Область'
        />
        <TextInput
          label='Адрес'
        />
        <NumberInput
          label='Стоимость'
        />
        
        <div className='mt-5'>
          <Button>
            Добавить курорт
          </Button>
        </div>
      </Modal>
    </>
  )
}