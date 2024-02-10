import React from 'react'
import { Button, Modal, NumberInput, Popover, Switch, Table, Tabs, TextInput, Textarea } from '@mantine/core'
import { pb } from 'shared/api'
import { BsCheckCircle } from 'react-icons/bs'
import { CiCircleRemove } from 'react-icons/ci'
import { openConfirmModal } from '@mantine/modals'
import { FaCircleXmark } from 'react-icons/fa6'
import { FaCheck } from 'react-icons/fa'
import { getImageUrl } from 'shared/lib'
import dayjs from 'dayjs'

async function getServices () {
  return await pb.collection('services').getFullList() 
}

async function getServiceBids () {
  return await pb.collection('service_bids').getFullList({expand: 'user', sort: `-created`}) 
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
  const cancelledServices = bids.filter(q => q.status === 'cancelled' && q?.pay)

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
    await pb.collection('service_bids').update(bid?.id, {
      status: 'rejected'
    })
    .then(async () => {
      if (!bid?.pay) {
        await pb.collection('users').update(bid?.user, {
          'balance+': bid?.total_cost
        })
        .then(res => {
          setRejectModal({...rejectModal, modal: false})
        })
      } else if (rejectModal.payback) {
          await pb.collection('users').update(bid?.user, {
            'balance+': bid?.total_cost
          })
          .then(res => {
            window.location.reload()
          })
        }
    })
  }

  const [rejectModal, setRejectModal] = React.useState({
    modal: false,
    payback: false,
    bid: null,
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
    .then(() => {
      setService({
        title: '',
        description: '',
        cost: ''
      })
    })
  }

  async function updateService () {
    await pb.collection('services').update(editService.id, editService)
    .then(() => {
      handleEditModalClose()
    })
  }

  async function deleteService (id) {
    return await pb.collection('services').delete(id)
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

  const confirm = (id, val) => openConfirmModal({
    title: 'Изменить статус', 
    centered: true,
    labels: { confirm: 'Изменить', cancel: 'Отмена' },
    onConfirm: async () => pb.collection('service_bids').update(id, {given: val}) 
  })

  const [userData, setUserData] = React.useState({
    modal: false,
    data: null
  })

  const [refund, setRefund] = React.useState({
    modal: false,
    bid: {}
  })

  const [refundSum, setRefundSum] = React.useState('')

  return (
    <>
      <div>
        <Tabs defaultValue='services'>
          <Tabs.List>
            <Tabs.Tab value='services'>Услуги</Tabs.Tab>
            <Tabs.Tab value='created'>Созданые</Tabs.Tab>
            <Tabs.Tab value='cancelled'>Отмененные</Tabs.Tab>
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
                label='Стоимость (тг)'
                value={service.cost}
                onChange={val => handleServiceChange(val, 'cost')}
                hideControls
              />
              <div className='mt-5 flex justify-center'>
                <Button 
                  onClick={createService}
                >
                  Создать
                </Button>
              </div>
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
                      <p className='text-primary-500 text-lg font-bold'>{service.cost} тг</p>
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
                  <th>Дата</th>
                  <th>Пользователь</th>
                  <th>ФИО</th>
                  <th>Стоимость (тг)</th>
                  <th>Услуга</th>
                  <th>Тип</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {createdServices.map((q, i) => {
                return (
                  <tr key={i}>
                    <th>{dayjs(q?.created).format(`DD.MM.YY`)}</th>
                    <td 
                      className='cursor-pointer' 
                      onClick={() => setUserData({modal: true, data: q?.expand?.user})}
                    >
                      <Button compact variant='outline'>
                        {q?.user}
                      </Button>
                    </td>
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
                    <td>{q?.pay ? 'Карта' : 'Баланс'}</td>
                    <td>
                      <div className='flex gap-4'>
                        <BsCheckCircle
                          size={30} 
                          color='green'
                          onClick={() => handleConfirmBid(q.id)}
                          className='cursor-pointer hover:fill-yellow-500'
                        />
                        {!q?.pay && (
                          <CiCircleRemove 
                            size={35}
                            color='red'
                            onClick={() => setRejectModal({...rejectModal, modal: true, bid: q})}
                            className='cursor-pointer hover:fill-yellow-500'
                          />
                        )}
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
                  <th>Дата</th>
                  <th>Пользователь</th>
                  <th>Стоимость</th>
                  <th>ФИО</th>
                  <th>Услуга</th>
                  <th>Тип</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {succServices.map((q, i) => {
                return (
                  <tr key={i}>
                    <td>{dayjs(q?.created).format(`DD.MM.YY, HH:mm`)}</td>
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
                    <td>{q?.pay ? 'Карта' : 'Баланс'}</td>
                    <td>
                      <div className="cursor-pointer relative">
                        {q?.given 
                          ? <FaCheck color="green"  size={20} onClick={() => confirm(q.id, false)} />
                          : <FaCircleXmark color="red" size={20} onClick={() => confirm(q.id, true)} />
                        }
                      </div>
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
                  <th>Дата</th>
                  <th>Пользователь</th>
                  <th>ФИО</th>
                  <th>Стоимость</th>
                  <th>Услуга</th>
                  <th>Тип</th>
                  <th>Возвращенная сумма</th>
                </tr>
              </thead>
              <tbody>
              {rejectedServeces.map((q, i) => {
                return (
                  <tr key={i}>
                    <td>{dayjs(q?.created).format(`DD.MM.YY, HH:mm`)}</td>
                    <td>{q.user}</td>
                    <td>{q.name}</td>
                    <td>{q.total_cost} тг</td>
                    <td>
                      <Button
                        variant='outline'
                        compact
                        onClick={() => viewServices(q.serv1ce)}
                      >
                        Услуги
                      </Button>
                    </td>
                    <td>{q?.pay ? 'Карта' : 'Баланс'}</td>
                    <td>{q?.refunded_sum}</td>
                  </tr>
                )
              })}
              </tbody>
            </Table>
          </Tabs.Panel>
          <Tabs.Panel value='cancelled'>
            <Table>
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Пользователь</th>
                  <th>ФИО</th>
                  <th>Услуга</th>
                  <th>Стоимость</th>
                  <th>Тип</th>
                  <th>Действие</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {cancelledServices.map((q, i) => {
                return (
                  <tr key={i}>
                    <td>{dayjs(q?.created).format(`DD.MM.YY, HH:mm`)}</td>
                    <td>{q.user}</td>
                    <td>{q.name}</td>
                    <td>
                      <Button
                        variant='outline'
                        compact
                        onClick={() => viewServices(q.serv1ce)}
                      >
                        Услуги
                      </Button>
                    </td>
                    <td>{q.total_cost}</td>
                    <td>{q?.pay ? 'Карта' : 'Баланс'}</td>
                    <td>
                      <Button onClick={() => setRefund({modal: true, bid: q})} disabled={q?.refunded}>
                        Вернуть средства
                      </Button>
                    </td>
                    <td>
                      <div className="cursor-pointer relative">
                        {q?.given 
                          ? <FaCheck color="green"  size={20} onClick={() => confirm(q.id, false)} />
                          : <FaCircleXmark color="red" size={20} onClick={() => confirm(q.id, true)} />
                        }
                      </div>
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
      <Modal
        opened={rejectModal.modal}
        onClose={() => setRejectModal({modal: false, payback: false})}
        centered
      >
        <>
          Вы действительно хотите отклонить данную заявку?
          {rejectModal.bid?.pay && (
            <Switch 
              label='Вернуть сумму на баланс?'
              checked={rejectModal.payback}
              onChange={(e) => {
                setRejectModal(q => ({...rejectModal, payback: !q.payback}))
              }}
              className='mt-4'
            />
          )}
        </>
        <div className='flex justify-center mt-4 gap-4'>
          <Button 
            onClick={() => deleteBid(rejectModal.bid)} 
            color='red' 
            variant='outline'
          >
            Подтвердить
          </Button>
        </div>
      </Modal>
      <Modal
        opened={refund.modal}
        onClose={() => setRefund({modal: false, bid: {}})}
        centered
        title='Подтвердите действие'
      >
        <p>Сумма: {refund?.bid?.total_cost}</p>
        <p>Сумма 5%: {refund?.bid?.total_cost2}</p>
        <p>IBAN: {refund?.bid?.iban}</p>
        <p>ФИО: {refund?.bid?.fio}</p>
        <p>ИИН: {refund?.bid?.iin}</p>
        <NumberInput
          label='Возвращаемая сумма'
          hideControls
          value={refundSum}
          onChange={e => setRefundSum(e)}
          className='mt-4'
        />
        <div className='flex justify-center gap-4 mt-5'>
          <Popover position="top" shadow="md" classNames={{
            dropdown: `!p-0`
          }}>
            <Popover.Target>
              <Button
                disabled={refundSum < 100}
              >
                Вернуть
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Button onClick={async () => {
                await pb.collection('service_bids').update(refund?.bid?.id, {
                  refunded: true,
                  status: 'rejected',
                  refunded_sum: refundSum
                })
                .then(() => {
                  window.location.reload()
                })
              }}>
                Да
              </Button>
            </Popover.Dropdown>
          </Popover>
        </div>
      </Modal>
      <Modal
        opened={userData.modal}
        onClose={() => setUserData({data: null, modal: false})}
        centered
      >
        <img 
          src={getImageUrl(userData?.data, userData.data?.avatar)} 
          alt="" 
          className='w-[150px] h-[150px] object-cover rounded-full mx-auto mb-5'
        />
        <ul className='space-y-2'>
          <li className='grid grid-cols-2'>
            <p>ID:</p>
            <p>{userData?.data?.id}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Имя:</p>
            <p>{userData?.data?.name}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Фамилия:</p>
            <p>{userData?.data?.surname}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Телефон:</p>
            <p>{userData?.data?.phone}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Область:</p>
            <p>{userData?.data?.region}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Партнеры:</p>
            <p>{userData?.data?.referals?.length}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Бинар:</p>
            <p>{userData?.data?.bin ? 'Да' : 'Нет'}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Уровень:</p>
            <p>{userData?.data?.level}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Дата рег:</p>
            <p>{dayjs (userData?.data?.created).format('DD.MM.YY')}</p>
          </li>
        </ul>
      </Modal>
    </>
  )
}