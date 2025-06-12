import React from "react";
import { Button, LoadingOverlay, Menu, Modal, Pagination, Table, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import dayjs from "dayjs";
import { pb } from "shared/api";
import { modals } from '@mantine/modals';

import { AiFillCheckCircle, AiFillLock } from "react-icons/ai";
import { showNotification } from "@mantine/notifications";
import { formatNumber } from "shared/lib";

async function getUsers() {
  return await pb.collection("agents").getFullList({
    sort: '-created',
    filter: `agent = false`
  });
}

export const Users = () => {

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
      sort: '-created',
    });

    if (foundUsers.length !== 0) {
      setUsers(foundUsers);
      showNotification({
        title: 'Поиск',
        message: 'Не найдено',
        color: 'teal'
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

  // async function verifyUser(userId) {
  //   setLoading(true)
  //   return await pb
  //     .collection("users")
  //     .update(userId, {
  //       verified: true
  //     })
  //     .then(async res => {
  //       const sponsor = await pb.collection('users').getOne(res?.sponsor)
  //       await pb.collection('users').update(sponsor?.id, {
  //         referals: [...sponsor?.referals, res?.id]
  //       })
        
  //       const referals = await pb.collection('users').getFullList({filter: `sponsor = '${sponsor?.id}' && verified = true`})

  //       if (referals?.length === 1) {
  //         await pb.collection('users').update(sponsor?.id, {
  //           balance: sponsor?.balance + 30000            
  //         })
  //         setLoading(false)
  //         return
  //       }

  //       if (referals?.length >= 4) {
  //         await pb.collection('users').update(sponsor?.id, {
    //           balance: sponsor?.balance + 15000            
    //         })
    //         setLoading(false)
    //         return
  //       }
  //       setLoading(false)
  //     })
  //     .catch(err => {
  //       setLoading(false)
  //     })
  // }
  // Пример использования
  
  // const confirmVerifing = (userId) =>
  //   openConfirmModal({
  //     title: "Подтвердить верификацию",
  //     centered: true,
  //     children: <>Подтверить верификацию пользователя</>,
  //     labels: { confirm: "Подтвердить", cancel: "Отмена" },
  //     onConfirm: () => verifyUser(userId),
  // });
  
  // const confirmLevel = (user, val) => {
  //   openConfirmModal({
  //     title: "Подтвердить верификацию",
  //     centered: true,
  //     children: <>Выдать уровень {val} пользователю {user?.id} </>,
  //     labels: { confirm: "Подтвердить", cancel: "Отмена" },
  //     onConfirm: () => giveLevel(user, val),
  // })}
  
  // async function giveLevel (user, val) {
  //   await pb.collection('users').update(user?.id, {
  //     level: val
  //   })
  // }

  const [modal, setModal] = React.useState({
    show: false,
    bonuses: {}
  })


const confirmVerifying = (userId) =>
  modals.openConfirmModal({
    title: 'Подтвердить верификацию',
    centered: true,
    children: <>Вы действительно хотите верифицировать пользователя?</>,
    labels: { confirm: 'Подтверждаю', cancel: 'Отменяю' },
    confirmProps: { color: 'green', loading },
    onConfirm: async () => {
      try {
        setLoading(true);
        const res = await fetch("https://ozelim-payment.netlify.app/api/agents", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: userId,
            collectionName: 'agents',
            pay: { type: 'family' },
          }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          showNotification({
            title: 'Успешно',
            message: 'Агент верифицирован, бонусы начислены 🎉',
            color: 'green',
          });
        } else {
          showNotification({
            title: 'Ошибка',
            message: data.message || 'Что-то пошло не так',
            color: 'red',
          });
        }
      } catch (error) {
        console.error('Ошибка при отправке:', error);
        showNotification({
          title: 'Ошибка сети',
          message: 'Сетевая ошибка при верификации. Попробуйте позже.',
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    },
  });

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

          <div className="mx-4 flex items-center gap-2">
            <div className="space-x-2">
              Количество: {users?.length}
            </div>
            <div>
              Верифицировано: {users?.filter(q => q?.verified)?.length}
            </div>
            <div>
              Не верифицированы: {users?.filter(q => !q?.verified)?.length}
            </div>
          </div>
        </div>
        <Table className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Верифицирован</th>
              <th>ФИО</th>
              <th>Бонусы</th>
              <th>Баланс</th>
              <th>Почта</th>
              <th>Телефон</th>
              <th>Область</th>
              <th>Населенный пункт</th>
              <th>Агент-наставник</th>
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
                        <Button compact variant="subtle" color="green">
                          <AiFillCheckCircle size={20} />
                        </Button>
                      ) : (
                        <Button
                          compact
                          variant="subtle"
                          color="yellow"
                          onClick={() => confirmVerifying(user?.id)}
                        >
                          <AiFillLock size={20} />
                        </Button>
                      )}
                    </td>
                  <td>{user?.fio}</td>
                  <td>{user?.bonuses}</td>
                  <td>{user?.balance}</td>
                  <td>{user?.email}</td>
                  <td>{user?.phone}</td>
                  <td>{user?.region}</td>
                  <td>{user?.village}</td>
                  <td>{user?.sponsor}</td>
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