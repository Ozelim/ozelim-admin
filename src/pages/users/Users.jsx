import React from "react";
import { Button, Menu, Pagination, Table, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import dayjs from "dayjs";
import { pb } from "shared/api";

import { AiFillCheckCircle, AiFillLock } from "react-icons/ai";

async function getUsers() {
  return await pb.collection("users").getFullList({
    sort: '-created'
  });
}

export const Users = () => {
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState({});

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
      setUsers(foundUsers);
    }
  }

  React.useEffect(() => {
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
          return
        }

        if (referals?.length >= 4) {
          await pb.collection('users').update(sponsor?.id, {
            balance: sponsor?.balance + 15000            
          })
          return
        }
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

  return (
    <>
      <div className="w-full">
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
              <th>Маркетинг</th>
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
                    {user?.level === '4.1' && '4.Путевка'}
                    {user?.level === '4.2' && '4.Курса'}
                    {(user?.level != '4.1' && user?.level != '4.2') && user?.level}

                    {/* {(user?.level && user?.level !== '2-3' && user?.level != '0' && user?.level != '' ) && (
                      <Menu
                        compact
                      >
                        <Menu.Target>
                          <Button color="teal">
                            {user?.level}
                          </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                        <Menu.Label>
                            4 уровень
                          </Menu.Label>
                        <Menu.Item 
                          value={4.1} 
                          onClick={(e) => confirmLevel(user, e.currentTarget.value)}
                        >
                            4. Курс по туризму
                        </Menu.Item>
                        <Menu.Item 
                          value={4.2} 
                          onClick={(e) => confirmLevel(user, e.currentTarget.value)}
                        >
                            4. Оздоровлеие
                        </Menu.Item>
                        <Menu.Divider/>
                        <Menu.Item 
                          value={5} 
                          onClick={(e) => confirmLevel(user, e.currentTarget.value)}
                        >
                            5. Вознаграждение 500 000 тг
                        </Menu.Item>
                        <Menu.Item 
                          value={6} 
                          onClick={(e) => confirmLevel(user, e.currentTarget.value)}
                        >
                            6. Вознаграждение 1 млн. тг
                        </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    )}
                    
                    {(!user?.level || user?.level == '0') && (
                      <Button
                        compact
                        color="gray"
                      >
                        0
                      </Button>
                    )} */}
                  </td>
                  <td>{user.balance}</td>
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
    </>
  );
};
