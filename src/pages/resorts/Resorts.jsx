import React from 'react'
import { Autocomplete, Button, Modal, NumberInput, Select, TextInput } from '@mantine/core'
import { regions } from 'shared/lib'
// import { useSearchParams } from 'react-router-dom'

export const Resorts = () => {

  // const [searchParams] = useSearchParams()

  // console.log(searchParams.get('city'));
  

  const [shitModal, setShitModal] = React.useState(false)
  const [modal, setModal] = React.useState(false)

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
      l>
        <TextInput
          label='Название'
        />
        <Autocomplete
          data={[]}
          label='Область'
        />
        <TextInput
          label='Адрес'
        />
        <div className='mt-5'>
          <Button>
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