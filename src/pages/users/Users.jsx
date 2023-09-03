import { Button, Pagination, Table, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import dayjs from "dayjs";
import React from "react";
import { pb } from "shared/api";

import { AiFillCheckCircle, AiFillLock } from "react-icons/ai";

async function getUsers(page = 1) {
  return await pb.collection("users").getList(page, 50);
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
      setPage(null);
    }
  }

  React.useEffect(() => {
    getUsers().then((res) => {
      setUsers(res.items);
      setPage({ ...res, items: null });
    });

    pb.collection("users").subscribe("*", function () {
      getUsers(page?.page).then((res) => {
        setUsers(res.items);
        setPage({ ...res, items: null });
      });
    });
  }, []);

  function handleUsers(val) {
    getUsers(val).then((res) => {
      setUsers(res.items);
      setPage({ ...res, items: null });
    });
  }

  async function verifyUser(userId) {
    return await pb
      .collection("users")
      .update(userId, {
        verified: true
      });
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
              <th>Бинар</th>
              <th>Маркетинг</th>
              <th>Баланс</th>
              <th>Почта</th>
              <th>Телефон</th>
              <th>Город</th>
              <th>Дата рождения</th>
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
                      >
                        <AiFillLock size={20} />
                      </Button>
                    )}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.bin ? "Да" : "Нет"}</td>
                  <td>
                    {user?.level < 4 ? (
                      <Button
                        compact
                        color="gray"
                      >
                        {user.level}
                      </Button>
                    ) : (
                      <Button
                        compact
                        color="gray"
                      >
                        {user.level}
                      </Button>
                    )}
                  </td>
                  <td>{user.balance}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.city}</td>
                  <td>{dayjs(user.birthday).format(`DD.MM.YY`)}</td>
                  <td>{user.region}</td>
                  <td>{user.adress}</td>
                  <td>{user.sponsor}</td>
                  <td>{dayjs(user.created).format(`DD.MM.YY, HH:mm`)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {page && (
          <Pagination
            value={page?.page}
            total={page?.totalPages}
            onChange={handleUsers}
          />
        )}
      </div>
    </>
  );
};
