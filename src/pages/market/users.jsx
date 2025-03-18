import React from 'react'
import { Avatar, Table } from '@mantine/core'
import { pb } from 'shared/api'
import dayjs from 'dayjs'
import { getImageUrl } from 'shared/lib'

async function getCustomers () {
  return await pb.collection('customers').getFullList()
}

export const Users = () => {

  const [customers, setCustomers] = React.useState([])

  React.useEffect(() => {
    getCustomers()
    .then(res => setCustomers(res))
  }, [])

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Аватар</th>
            <th>Имя</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Адрес</th>
            <th>Дата регистрации</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map(customer => (
            <tr key={customer?.id}>
              <td>{customer?.id}</td>
              <td>
                <Avatar 
                  src={getImageUrl(customer, customer?.avatar)}
                  alt={customer?.name}
                  size="md"
                />
              </td>
              <td>{customer?.name}</td>
              <td>{customer?.email}</td>
              <td>{customer?.phone}</td>
              <td>
                {customer?.delivery_address?.city}, {customer?.delivery_address?.address} 
              </td>
              <td>{dayjs(customer?.created).format('DD.MM.YYYY')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </div>
  )
}
