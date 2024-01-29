import React from 'react'
import { Button, Modal, NumberInput, Tabs, TextInput, Textarea } from '@mantine/core'
import { pb } from 'shared/api'

async function getServices () {
  return await pb.collection('services').getFullList() 
}

export const Services = () => {

  const [service, setService] = React.useState({
    title: '',
    description: '',
    cost: 0
  })

  const [services, setServices] = React.useState([])

  const handleServices = async () => {
    await getServices()
    .then(res => {
      console.log(res, 'res');
      setServices(res)
    })
  } 

  React.useEffect(() => {
    handleServices()

    pb.collection('services').subscribe('*', handleServices)
    return () => pb.collection('services').unsubscribe('*')
  }, [])

  function handleServiceChange (val, name) {
    setService({...service, [name]: val})
  }

  async function createService () {
    await pb.collection('services').create(service)
  }

  async function updateService () {
    await pb.collection('services').update(editService.id, editService)
  }

  async function deleteService (id) {
    await pb.collection('services').delete(id)
  }

  const [editService, setEditService] = React.useState({})
  const [editModal, setEditModal] = React.useState(false)

  function handleEdit (service) {
    setEditService(service)
    setEditModal(true)
  }

  function handleEditModalClose () {
    setEditService({})
    setEditModal(false)
  }
  
  function handleEditServiceChange (val, name) {
    setEditService({...editService, [name]: val})
  }

  return (
    <>
      <div>
        <Tabs defaultValue='services'>
          <Tabs.List>
            <Tabs.Tab value='services'>Услуги</Tabs.Tab>
            <Tabs.Tab value='created'>Созданые</Tabs.Tab>
            <Tabs.Tab value='succ'>Подтвержденные</Tabs.Tab>
            <Tabs.Tab value='rejected'>Отклоненные</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value='services'>
            <form className='max-w-md'>
              <TextInput
                label='Название'
                value={service.title}
                onChange={val => handleServiceChange(val.currentTarget.value, 'title')}
              />
              <Textarea
                label='Описание'
                value={service.description}
                onChange={val => handleServiceChange(val.currentTarget.value, 'description')}
                autosize
              />
              <NumberInput
                label='Стоимость'
                value={service.cost}
                onChange={val => handleServiceChange(val, 'cost')}
              />
              <Button 
                onClick={createService}
              >
                Создать
              </Button>
            </form>
            <div className='mt-5 flex gap-4'>
              {services.map((service, i) => {
                return (
                  <div 
                    key={i}
                    className='p-4 border bg-white'
                  >
                    <div className='space-y-2'>
                      <p className='text-lg'>{service.title}</p>
                      <p>{service.description}</p>
                      <p className='text-primary-500'>{service.cost}</p>
                    </div>
                    <div className='space-x-4 mt-4'>
                      <Button compact variant='outline' onClick={() => handleEdit(service)}>
                        Редактировать
                      </Button>
                      <Button variant='subtle' color='red' compact onClick={() => deleteService(service.id)}>
                        Удалить
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value='created'></Tabs.Panel>
          <Tabs.Panel value='succ'></Tabs.Panel>
          <Tabs.Panel value='rejected'></Tabs.Panel>
        </Tabs>
      </div>
      <Modal
        opened={editModal}
        centered
        title='Редоктаривать услугу'
        onClose={handleEditModalClose}
      >
        <form className='max-w-md space-y-4'>
          <TextInput
            label='Название'
            value={editService.title ?? ''}
            onChange={val => handleEditServiceChange(val.currentTarget.value, 'title')}
          />
          <Textarea
            label='Описание'
            value={editService.description ?? ''}
            onChange={val => handleEditServiceChange(val.currentTarget.value, 'description')}
            autosize
          />
          <NumberInput
            label='Стоимость'
            value={editService.cost ?? ''}
            onChange={val => handleEditServiceChange(val, 'cost')}
            hideControls
          />
          <div className='flex justify-center'>
            <Button 
              onClick={updateService}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}