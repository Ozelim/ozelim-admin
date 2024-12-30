import React from 'react'
import { pb } from '../api/pocketbase'

async function getUser (userId) {
  return await pb.admins.getOne(userId)
}

export const useAuth = () => {

  const [user, setUser] = React.useState(pb.authStore.record)

  // const user = pb.authStore.model 
  // const token = pb.authStore.token

  React.useEffect(() => {
    getUser(pb.authStore?.record?.id)
    .then(res => {
      setUser(res)
    })

    pb.collection('users').subscribe(user?.id, function({action, record}) {
      setUser(record)
    })
  }, [pb])

  return {
    ...pb.authStore,
    user,
  }
}
