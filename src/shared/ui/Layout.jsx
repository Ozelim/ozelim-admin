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
    setErr('')
  }

  async function login () {
    if (!val?.email || !val?.password) return setErr('Заполните поля')
    await pb.collection('_superusers').authWithPassword(val?.email, val?.password)
    .then(() => {
      window.location.reload()
    })
    .catch(err => {
      setErr('Неверные данные')
    })
  }

  const [err, setErr] = React.useState('')

  React.useEffect(() => {
    const beforeUnloadHandler = (event) => {
      // You can customize the warning message here
    };

    // Add the event listener when the component mounts
    window.addEventListener('beforeunload', beforeUnloadHandler);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, []);

  console.log(user?.email, 'user');

  return (user?.email === "ozelim.pv@gmail.com" ||
      user?.email === "ozelim-buhgalter@mail.ru" ||
      user?.email === "ozelim-mng@mail.ru" ||
      user?.email === "kurama.zxc@mail.ru" ||
      user?.email === "ozelim-tur@mail.ru") ? (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen pb-10">
      <div className="w-full h-full border-b">{headerSlot}</div>
      <div className="grid md:grid-cols-[200px_auto] grid-cols-1">
        <div className="border-r">{sidebarSlot}</div>
        <div className="w-full h-full bg-zinc-50 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <div className="border p-4 space-y-4 max-w-xs w-full mx-auto">
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
        {err && (
          <p className='text-sm text-red-500'>{err}</p>
        )}
        <Button fullWidth onClick={login}>
          Войти
        </Button>
      </div>
    </div>
  );
}
