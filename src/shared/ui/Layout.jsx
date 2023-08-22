import { Button, PasswordInput, TextInput } from '@mantine/core'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'

export const Layout = ({sidebarSlot,  headerSlot, footerSlot}) => {

  const {user} = useAuth()

  const [val, setVal] = React.useState({
    email: '',
    password: '',
  })

  function handleValueChange (e) {
    const { value, name } = e?.currentTarget
    setVal({...val, [name]: value})
  }

  async function login () {
    await pb.admins.authWithPassword(val?.email, val?.password)
  }

  return user &&
    (user?.email === "ozelim@mail.ru" ||
      user?.email === "ozelim-buhgalter@mail.ru" ||
      user?.email === "ozelim-tur@mail.ru") ? (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen ">
      <div className="w-full h-full border-b">{headerSlot}</div>
      <div className="grid md:grid-cols-[200px_auto] grid-cols-1">
        <div className="border-r">{sidebarSlot}</div>
        <div className="w-full h-full bg-zinc-50 p-4">
          <Outlet />
        </div>
      </div>
      <div className="w-full h-full border-t pt-5">{footerSlot}</div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <div className="border p-4 space-y-4">
        <TextInput
          type={"email"}
          label="Почта"
          value={val.email ?? ""}
          onChange={handleValueChange}
          name="email"
        />
        <PasswordInput
          label="Пароль"
          value={val?.password}
          onChange={handleValueChange}
          name="password"
        />
        <Button fullWidth onClick={login}>
          Войти
        </Button>
      </div>
    </div>
  );
}
