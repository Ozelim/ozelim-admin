import React from 'react'
import { Button, Modal, NumberInput, Popover, Table, Tabs, TextInput, Textarea } from '@mantine/core'
import { pb } from 'shared/api'
import { BsCheckCircle } from 'react-icons/bs'
import { CiCircleRemove } from 'react-icons/ci'
import { openConfirmModal } from '@mantine/modals'

async function getServices () {
  return await pb.collection('services').getFullList() 
}

async function getServiceBids () {
  return await pb.collection('service_bids').getFullList() 
}

export const Services = () => {

  const [service, setService] = React.useState({
    title: '',
    description: '',
    cost: 0
  })

  const [services, setServices] = React.useState([])
  const [bids, setBids] = React.useState([])

  const createdServices = bids.filter(q => q.status === 'created')
  const succServices = bids.filter(q => q.status === 'succ')
  const rejectedServeces = bids.filter(q => q.status === 'rejected')

  const [viewModal, setViewModal] = React.useState({
    modal: false,
    services: []
  })

  function viewServices (services) {
    setViewModal({modal: true, services: services})
  }

  const handleConfirmBid = (id) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    labels: { confirm: 'Подтвердить', cancel: 'Отмена'},
    children: (
      <>
        Вы действительно хотите одобрить данную заявку?
      </>
    ),
    onConfirm: () => confirmBid(id)
  })

  async function confirmBid (id) {
    await pb.collection('service_bids').update(id, {
      status: 'succ'
    })
  }
  
  async function deleteBid (bid) {
    await pb.collection('withdraws').update(bid?.id, {
      status: 'rejected'
    })
    .then(async () => {
      await pb.collection('users').update(bid?.user, {
        'balance+': bid?.total_cost
      })
    })
  }


  const removeBid = (bid) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    labels: { confirm: 'Подтвердить', cancel: 'Отмена'},
    children: (
      <>Вы действительно хотите отклонить данную заявку?</>
    ),
    onConfirm: () => deleteBid(bid)
  })

  const handleServices = async () => {
    await getServices()
    .then(res => {
      console.log(res, 'res');
      setServices(res)
    })
  } 

  const handleBids = async () => {
    await getServiceBids()
    .then(res => {
      console.log(res, 'res');
      setBids(res)
    })
  }

  React.useEffect(() => {
    handleServices()
    handleBids()

    pb.collection('services').subscribe('*', handleServices)
    pb.collection('service_bids').subscribe('*', handleBids)
    
    return () => {
      pb.collection('services').unsubscribe('*')
      pb.collection('service_bids').unsubscribe('*')
    }
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
            <div className='mt-5 grid grid-cols-3 gap-4'>
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
                      <Popover position="bottom" withArrow shadow="md">
                        <Popover.Target>
                          <Button variant='subtle' color='red'>Удалить</Button>
                        </Popover.Target>
                        <Popover.Dropdown>
                          <Button variant='subtle' color='red' compact onClick={() => deleteService(service.id)}>
                            Да
                          </Button>
                        </Popover.Dropdown>
                      </Popover>
                 
                    </div>
                  </div>
                )
              })}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value='created'>
            <Table>
              <thead>
                <tr>
                  <th>Пользователь</th>
                  <th>Стоимость</th>
                  <th>ФИО</th>
                  <th>Услуга</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {createdServices.map((q, i) => {
                return (
                  <tr key={i}>
                    <td>{q.user}</td>
                    <td>{q.name}</td>
                    <td>{q.total_cost}</td>
                    <td>
                      <Button
                        variant='outline'
                        compact
                        onClick={() => viewServices(q.serv1ce)}
                      >
                        Услуги
                      </Button>
                    </td>
                    <td>
                      <div className='flex gap-4'>
                        <BsCheckCircle
                          size={30} 
                          color='green'
                          onClick={() => handleConfirmBid(q.id)}
                          className='cursor-pointer hover:fill-yellow-500'
                        />
                        <CiCircleRemove 
                          size={35}
                          color='red'
                          onClick={() => removeBid(q)}
                          className='cursor-pointer hover:fill-yellow-500'
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </Table>
          </Tabs.Panel>
          <Tabs.Panel value='succ'>
            <Table>
              <thead>
                <tr>
                  <th>Пользователь</th>
                  <th>Стоимость</th>
                  <th>ФИО</th>
                  <th>Услуга</th>
                </tr>
              </thead>
              <tbody>
              {succServices.map((q, i) => {
                return (
                  <tr key={i}>
                    <td>{q.user}</td>
                    <td>{q.name}</td>
                    <td>{q.total_cost}</td>
                    <td>
                      <Button
                        variant='outline'
                        compact
                        onClick={() => viewServices(q.serv1ce)}
                      >
                        Услуги
                      </Button>
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </Table>
          </Tabs.Panel>
          <Tabs.Panel value='rejected'>
            <Table>
              <thead>
                <tr>
                  <th>Пользователь</th>
                  <th>Стоимость</th>
                  <th>ФИО</th>
                  <th>Услуга</th>
                </tr>
              </thead>
              <tbody>
              {rejectedServeces.map((q, i) => {
                return (
                  <tr key={i}>
                    <td>{q.user}</td>
                    <td>{q.name}</td>
                    <td>{q.total_cost}</td>
                    <td>
                      <Button
                        variant='outline'
                        compact
                        onClick={() => viewServices(q.serv1ce)}
                      >
                        Услуги
                      </Button>
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </Table>
          </Tabs.Panel>
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
      <Modal
        opened={viewModal.modal}
        onClose={() => setViewModal({services: [], modal: false})}
        centered
      >
        {viewModal.services.map((service, i) => {
          return (
            <div 
              key={i}
              className='justify-between gap-6 border p-4 rounded-lg'
            >
              <div>
                <p className='font-bold text-lg'>{service.title}</p>
                <p className='text-sm'>{service.description}</p>
              </div>
              <div className='space-y-2'> 
                <p className='font-bold text-2xl'>{service.cost} тг</p>
              </div>
            </div>
          )
        })}
      </Modal>
    </>
  )
}