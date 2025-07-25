import React from "react";
import { Button, LoadingOverlay, Menu, Modal, Pagination, Table, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import dayjs from "dayjs";
import { pb } from "shared/api";

import { AiFillCheckCircle, AiFillLock } from "react-icons/ai";
import { showNotification } from "@mantine/notifications";
import { formatNumber } from "shared/lib";

async function getUsers() {
  return await pb.collection("users").getFullList({
    sort: '-created'
  });
}

export const Partners = () => {

  const [users, setUsers] = React.useState([]);

  const [loading, setLoading] = React.useState(false)

  const [search, setSearch] = React.useState("");

  async function searchByValue() {
    if (!search) {
      handleUsers(1);
      return;
    }
    const foundUsers = await pb.collection("users").getFullList({
      filter: `
        id = '${search}' ||
        name ?~ '${search}' ||
        email ?~ '${search}' ||
        phone ?~ '${search}' ||
        city ?~ '${search}'
      `,
    });

    if (foundUsers.length !== 0) {
      setUsers(foundUsers)
      showNotification({
        title: 'Поиск',
        message: `Найдено ${foundUsers.length} партнеров`,
        color: 'teal',
      })
    } else {
      showNotification({
        title: 'Не найдено',
        message: 'Партнер с такими данными не найден',
        color: 'red',
      })
    }
  }

  React.useEffect(()  => {
    getUsers().then((res) => {
      setUsers(res);
    });

    pb.collection("users").subscribe("*", function () {
      getUsers().then((res) => {
        setUsers(res);
      });
    });
  }, []); 

  function handleUsers(val) {
    getUsers(val).then((res) => {
      setUsers(res);
    });
  }

  async function verifyUser(userId) {
    setLoading(true)
    return await pb
      .collection("users")
      .update(userId, {
        verified: true
      })
      .then(async res => {
        const sponsor = await pb.collection('users').getOne(res?.sponsor)
        await pb.collection('users').update(sponsor?.id, {
          referals: [...sponsor?.referals, res?.id]
        })
        
        const referals = await pb.collection('users').getFullList({filter: `sponsor = '${sponsor?.id}' && verified = true`})

        if (referals?.length === 1) {
          await pb.collection('users').update(sponsor?.id, {
            balance: sponsor?.balance + 30000            
          })
          setLoading(false)
          return
        }

        if (referals?.length >= 4) {
          await pb.collection('users').update(sponsor?.id, {
            balance: sponsor?.balance + 15000            
          })
          setLoading(false)
          return
        }
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
      })
  }
  // Пример использования

  const confirmVerifing = (userId) =>
    openConfirmModal({
      title: "Подтвердить верификацию",
      centered: true,
      children: <>Подтверить верификацию пользователя</>,
      labels: { confirm: "Подтвердить", cancel: "Отмена" },
      onConfirm: () => verifyUser(userId),
  });

  const confirmLevel = (user, val) => {
    openConfirmModal({
      title: "Подтвердить верификацию",
      centered: true,
      children: <>Выдать уровень {val} пользователю {user?.id} </>,
      labels: { confirm: "Подтвердить", cancel: "Отмена" },
      onConfirm: () => giveLevel(user, val),
  })}

  async function giveLevel (user, val) {
    await pb.collection('users').update(user?.id, {
      level: val
    })
  }

  const [modal, setModal] = React.useState({
    show: false,
    bonuses: {}
  })

  return (
    <>
      <div className="w-full">
        <LoadingOverlay visible={loading} />
        <div className="flex items-end">
          <TextInput
            label="Поиск"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <Button
            onClick={() => searchByValue()}
          >
            Поиск
          </Button>
        </div>
        <Table className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th></th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Бинар</th>
              <th>Уровни</th>
              <th>Баланс</th>
              <th>Почта</th>
              <th>Телефон</th>
              <th>Область</th>
              <th>Адрес</th>
              <th>Спонсор</th>
              <th>Дата регистрации</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              return (
                <tr
                  key={i}
                  // onClick={() => openChangeModal(user)}
                >
                  <td>{user.id}</td>
                  <td>
                    {user?.verified ? (
                      <Button compact variant={"subtle"} color={"green"}>
                        <AiFillCheckCircle size={20} />
                      </Button>
                    ) : (
                      <Button
                        compact
                        variant={"subtle"}
                        color="yellow"
                        onClick={() => confirmVerifing(user?.id)}
                        // onClick={() => verifyUser(user?.id)}
                      >
                        <AiFillLock size={20} />
                      </Button>
                    )}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.bin ? "Да" : "Нет"}</td>
                  <td>
                    {user?.bin 
                        ? (user.level === '0' || !user.level) && '1' ||
                        (user.level === '1') && `2` ||
                        (user.level === '2') && `3` ||
                        (user.level === '3') && `4` ||
                        (user.level === '4.1' || user.level === '4.2') && 5 ||
                        (user.level === '5' && 6)
                      : '0'
                    }
 
                    {/* {user?.level 
                      ? (user?.level === '4.1' && '4.Путевка' || 
                        user?.level === '4.2' && '4.Курса' || user?.level)
                      : !user?.level && 0} */}
                  </td>
                  <td>
                    <Button 
                      size="xs"
                      onClick={async () => {
                        await pb.collection('user_bonuses').getOne(user?.id)
                        .then(res => {
                          setModal({...modal, show: true, bonuses: res})
                        })
                      }}
                    >
                      {user.balance}
                    </Button>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.region}</td>
                  <td>{user.adress}</td>
                  <td>{user.sponsor}</td>
                  <td>{dayjs(user.created).format(`DD.MM.YY, HH:mm`)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Modal
        opened={modal?.show}
        centered
        onClose={() => setModal({...modal, show: false})}
        size={'70%'}
      >
        <div className="mt-12 overflow-scroll">
          <h2 className="text-center text-xl font-head">История</h2>
          <Table className="border mt-4">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Тип</th>
                <th>ID</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody>
              {modal?.bonuses?.referals?.map((q, i) => {
                return (
                  <tr key={i} className="text">
                    <td className='whitespace-nowrap'>
                      {dayjs(q?.created).format(
                        'YY-MM-DD, hh:mm'
                      )}
                    </td>
                    <td className="text-black">Система</td>
                    <td>{q?.referal}</td>
                    <td className='text-green-500'>+ {formatNumber(q?.sum)}</td>
                  </tr>
                )
              })}
              {modal?.bonuses?.bonuses?.map((q, i) => {
                return (
                  <tr key={i} className="text">
                    <td className='whitespace-nowrap'>
                      {dayjs(q?.created).format(
                        'YY-MM-DD, hh:mm'
                      )}
                    </td>
                    <td className="text-black">Бонус</td>
                    <td>-</td>
                    <td className='text-green-500'>+ {formatNumber(q?.sum)}</td>
                  </tr>
                )
              })}
              {modal?.bonuses?.replenish?.map((q, i) => {
                return (
                  <tr key={i} className="text">
                    <td className='whitespace-nowrap'>
                      {dayjs(q?.created).format(
                        'YY-MM-DD, hh:mm'
                      )}
                    </td>
                    <td className="text-black">Пополнение</td>
                    <td>-</td>
                    <td className='text-green-500'>+ {formatNumber(q?.sum)}</td>
                  </tr>
                )
              })}
              {modal?.bonuses?.withdraws?.map((q, i) => {
                return (
                  <tr key={i} className="text">
                    <td className='whitespace-nowrap'>
                      {dayjs(q?.created).format(
                        'YY-MM-DD, hh:mm'
                      )}
                    </td>
                    <td className="text-black">Вывод</td>
                    <td>-</td>
                    <td className='text-red-500'>- {formatNumber(q?.sum)}</td>
                  </tr>
                )
              })}
              {modal?.bonuses?.services?.map((q, i) => {
                return (
                  <tr key={i} className="text">
                    <td className='whitespace-nowrap'>
                      {dayjs(q?.created).format(
                        'YY-MM-DD, hh:mm'
                      )}
                    </td>
                    <td className="text-black">Услуга</td>
                    <td>-</td>
                    <td className='text-red-500'>- {formatNumber(q?.sum)}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>

      </Modal>
    </>
  );
};
