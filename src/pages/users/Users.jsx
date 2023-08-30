import { Button, Pagination, Switch, Table, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
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
  const [searchValue] = useDebouncedValue(search, 1000);

  async function getPyramidByUser (userId) {

    const pyramid = (await pb.collection('pyramid').getFullList({expand: '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12'}))[0]
    const pyramidsUser = await pb.collection('users').getOne(userId)
    let foundUser = null
    let result = []

    for (const stage in pyramid) {
      if (!isNaN(stage)) {
        const stageArrays = pyramid?.expand?.[stage]
        const stageUser = stageArrays?.find(e => e?.id === userId)
        if (stageUser) {

          foundUser = userId
          const properties = Object.keys(pyramid?.expand)
          // const pows = properties.length - Number(stage)


          properties.map((key, i) => {
            if (Number(key) > Number(stage)) {
              // console.log(pyramid?.expand?.[key], key, stage, 'stage')
              result.push(pyramid?.expand?.[key])

              return 
            }

          })


          result = result?.map((arr, i) => {
            return arr.slice(0, Math.pow(2, i + 1));
          })
          result.unshift([pyramidsUser])

        } 
      }
    }

    if (foundUser) {
      return {
        pyramid: pyramid,
        result
      }
    } else {
      return {
        pyramid: pyramid,
        result: null
      }
    }

  }

  async function searchByValue() {
    if (!searchValue) {
      handleUsers(1);
      return;
    }
    const foundUsers = await pb.collection("users").getFullList({
      filter: `
        id = '${searchValue}' ||
        name ?~ '${searchValue}' ||
        email ?~ '${searchValue}' ||
        phone ?~ '${searchValue}' ||
        city ?~ '${searchValue}' ||
        iin ?~ '${searchValue}' 
      `,
    });

    if (foundUsers.length !== 0) {
      setUsers(foundUsers);
      setPage(null);
    }
  }

  React.useEffect(() => {
    searchByValue();
  }, [searchValue]);

  React.useEffect(() => {
    getUsers().then((res) => {
      setUsers(res.items);
      setPage({ ...res, items: null });
    });

    pb.collection('users').subscribe('*', function () {
      getUsers(page?.page).then((res) => {
        setUsers(res.items);
        setPage({ ...res, items: null });
      });
    })
  }, []);


  function handleUsers(val) {
    getUsers(val).then((res) => {
      setUsers(res.items);
      setPage({ ...res, items: null });
    });
  }

  async function verifyUser(userId) {
    return await pb.collection('users').update(userId, {
      verified: true
    })
    .then(async (res) => {
      
      const sponsor = await pb.collection("users").getOne(res?.sponsor)  

      const referals = await pb.collection("users").getFullList({
        filter: `sponsor = '${sponsor.id}' && verified = true`,
      });

      console.log(referals, 'referals');

      const pyramid = await pb
        .collection("pyramid")
        .getOne("ozelimbinary123", { expand: "sponsor" });


        if (referals.length === 3 && !sponsor?.bin) { 
          for (let i = 1; i <= 50; i++) {
            
            let multiple = Math.pow(2, i);
            
            if (pyramid?.[i]?.length < multiple) {
              await pb.collection('pyramid').update(pyramid.id, {
                [i]: [...pyramid?.[`${i}`], sponsor.id]
              })
              .then(async res => {
                console.log(sponsor);
                await pb.collection('users').update(sponsor.id, {
                  bin: true
                })
                console.log(res, 'write');
              })
              return
            }
          }
        }
      })
  }

  const confirmVerifing = (userId) => openConfirmModal({
    title: 'Подтвердить верификацию',
    centered: true,
    children: (
      <>Подтверить верификацию пользователя</>
    ),
    labels: {confirm: 'Подтвердить', cancel: 'Отмена'},
    onConfirm: () => verifyUser(userId)
  })

  return (
    <>
      <div className="w-full">
        <TextInput
          label="Поиск"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
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
                      <Button
                        compact
                        variant={'subtle'}
                        color={'green'}
                      >
                        <AiFillCheckCircle size={20}/>
                      </Button>
                    ) : (
                      <Button
                      compact
                      variant={'subtle'}
                      color='yellow'
                      onClick={() => confirmVerifing(user?.id)}
                      >
                        <AiFillLock size={20}/>
                      </Button>
                    )}
                    
                  </td>
                  <td>{user.name}</td>
                  <td>{user.bin ? "Да" : "Нет"}</td>
                  <td>{user.level}</td>
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
