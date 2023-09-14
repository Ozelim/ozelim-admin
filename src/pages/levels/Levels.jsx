import { Button, Menu, Pagination, Table, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import dayjs from "dayjs";
import React from "react";
import { pb } from "shared/api";

async function getUsers() {
  return await pb.collection("level").getFullList({
    expand: `user`
  })
}

export const Levels = () => {
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
      setUsers(res);
    });

    // pb.collection("users").subscribe("*", function () {
    //   getUsers(page?.page).then((res) => {
    //     setUsers(res.items);
    //     setPage({ ...res, items: null });
    //   });
    // });
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
      })
      .then(async res => {
        const sponsor = await pb.collection('users').getOne(res?.sponsor)
        await pb.collection('users').update(sponsor?.id, {
          referals: [...sponsor?.referals, res?.id]
        })
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

  
  const [addModal, setAddModal] = React.useState(false)

  const [addBinary, setAddBinary] = React.useState({})

  React.useEffect(() => {
    if (addModal) {
      getBinaryById(mal?.sponsor)
      .then(async res => {
        const slot = await pb.collection('binary').getOne(res?.id, {expand: 'sponsor, children'}) 
        setNode(slot)
        setAddBinary({
          value: res?.expand?.sponsor,
          children: [
            {
              value: res?.expand?.children?.[0],
              children: []
            },
            {
              value: res?.expand?.children?.[1],
              children: []
            },
          ]
        })
        // const slot = await pb.collection('binary').getOne(mal?.sponsor, {expand: 'sponsor, children'}) 
        // setNode(slot)
        // const obj = findAndReplaceObjectById(addBinary, mal?.sponsor, {
        //   value: res?.expand?.sponsor,
        //   children: [
        //     {
        //       value: res?.expand?.children?.[0],
        //       children: []
        //     },
        //     {
        //       value: res?.expand?.children?.[1],
        //       children: []
        //     },
        //   ]
        // })
        // setAddBinary({...addBinary, obj})
      })
      .catch(err => {
        console.log(err, 'err');
      }) 
    }
  }, [addModal])

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
              <th>Дата подачи</th>
              <th>Бинар ID</th>
              <th>Уровень</th>
              <th>Новый уровень</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Телефон</th>
              <th>Область</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              return (
                <tr
                  key={i}
                  // onClick={() => openChangeModal(user)}
                >
                  <td>
                    {dayjs(user?.created).format(`DD.MM.YY, HH:mm`)}
                  </td>
                  <td>{user?.id}</td>
                  <td>
                    {user?.level}
                  </td>
                  <td>
                    {user?.new_level === '4.1' && '4.  Путевка'}
                    {user?.new_level === '4.2' && '4.  Курс'}
                  </td>
                  <td>{user?.expand?.user?.name}</td>
                  <td>{user?.expand?.user?.surname}</td>
                  <td>{user?.expand?.user?.phone}</td>
                  <td>{user?.expand?.user?.region}</td>
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
      {/* <Modal
        opened={addModal}
        onClose={() => {
          setAddModal(false)
          setMal(null)
        }}
        fullScreen
        centered
      >
        <div className="h-[70vh] mt-4 border-2 border-primary-400 p-4 w-full">
          <Tree 
            data={addBinary ?? {}}
            orientation="vertical" 
            pathFunc="elbow"
            nodeSvgShape={{
              shape: "circle",
              shapeProps: { r: 20, fill: "green " },
            }}
            // collapsible={false}
            // onLinkClick={e => console.log(e.id, 'zxczxc')}
            renderCustomNodeElement={(props) => (
              <CustomNode 
                {...props}
                onNodeClick={handleNodeClick}
                handleNodeAdd={handleNodeAdd}
                sponsor={mal}
                node={node}
              />
            )}
          />
        </div>
        <div className='mt-4 flex justify-center'>
          <Button
            disabled={disabled}
            onClick={handleNodeAdd}
          >
            Добавить
          </Button>
        </div>
      </Modal> */}
    </>
  );
};
