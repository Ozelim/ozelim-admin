import { Button, NumberInput, Tabs, TextInput, Textarea } from '@mantine/core'
import React from 'react'
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


  React.useEffect(() => {
    const handleServices = async () => {
      await getServices()
      .then(res => {
        console.log(res, 'res');
        setServices(res)
      })
    } 
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

  }

  return (
    <div>
      <Tabs>
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
                  <TextInput
                    
                  />
                  <TextInput
                    
                  />
                  <TextInput
                    
                  />
                  <p>{service.title}</p>
                  <p>{service.description}</p>
                  <p>{service.cost}</p>
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
  )
}
