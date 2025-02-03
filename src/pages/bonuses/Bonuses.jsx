import { Button, Table, TextInput } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import React from 'react'
import { pb } from 'shared/api'

async function getUsers () {
  return await pb.collection('users').getFullList({
    filter: `level >= '3'`
  })
}

export const Bonuses = () => {

  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    getUsers()
    .then(res => {
      setUsers(res)
    })

    pb.collection('users').subscribe('*' , () => {
      getUsers()
      .then(res => {
        setUsers(res)
      })
    }) 
  }, [])

  const [bonuses, setBonuses] = React.useState({})
  const [takenBonuses, setTakenBonuses] = React.useState({})

  return (
    <div>
      <TextInput/>
    </div>
  )
}
