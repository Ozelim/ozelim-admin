import React from "react";
import { Button, Menu, Modal, Pagination, Table, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import dayjs from "dayjs";
import { CustomNode, findAndReplaceObjectById, getBinaryById } from "pages/binary/Binary";
import Tree from "react-d3-tree";
import { pb } from "shared/api";

async function getUsers() {
  return await pb.collection("level").getFullList({
    expand: `user`
  })
}

export const Levels = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });

    pb.collection("level").subscribe("*", function () {
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
  // Пример использования

  const [node, setNode] = React.useState(null)

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
      })
      .catch(err => {
        console.log(err, 'err');
      }) 
    }
  }, [addModal])

  async function handleNodeClick (data) {
    getBinaryById(data?.value?.id)
    .then(async res => {
      const slot = await pb.collection('binary').getOne(data?.value?.id, {expand: 'sponsor, children'}) 
      setNode(slot)
      const obj = findAndReplaceObjectById(addBinary, data?.value?.id, {
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
      setAddBinary({...addBinary, ...obj})
    })
    .catch(err => {
      console.log(err, 'err');
    }) 
  } 

  const [searchModal, setSearchModal] = React.useState(false)
  
  const [mal, setMal] = React.useState(null)

  async function searchByValue(id) {
    if (id) {
      getBinaryById(id)
      .then(async res => {
        const slot = await pb.collection('binary').getOne(id, {expand: 'sponsor, children'}) 
        setNode(slot)
        setAddBinary({...addBinary, 
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
        setSearchModal(true)
      })
      .catch(err => {
        console.log(err, 'err');
      }) 
      // handleUsers(1);
      return;
    }
  }

  async function giveNewLevel (user, newLevel, id) {
    return await pb.collection('users').update(user?.id, {
      level: newLevel,
    })
    .then(async () => {
      await pb.collection('level').delete(id)
    })
  }

  const confirmNewLevel = (user, newLevel, id) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true, 
    labels: {confirm: 'Подтвердить', cancel: 'Отмена'},
    children: (
      <>Действительно выдать вознаграждение и повысить уровень до 4?</>
    ),
    onConfirm: () => giveNewLevel(user, newLevel, id)
  })

  return (
    <>
      <div className="w-full">
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
                  <td>
                    <Button
                      compact
                      variant="outline"
                      onClick={() => searchByValue(user?.user)}
                    >
                      {user?.user}
                    </Button>
                  </td>
                  <td>
                    {user?.level}
                  </td>
                  <td>
                    <Button
                      compact
                      variant="outline"
                      onClick={() => confirmNewLevel(user?.expand?.user, user?.new_level, user?.id)}
                    >
                      {user?.new_level === '4.1' && '4.  Путевка'}
                      {user?.new_level === '4.2' && '4.  Курс'}
                    </Button>
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
      </div>
      <Modal
        opened={searchModal}
        centered
        fullScreen
        onClose={() => {
          setSearchModal(false)
          // setBinary(null)
        }}
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
                // handleNodeAdd={handleNodeAdd}
                sponsor={mal}
                node={node}
              />
            )}
          />
        </div>
      </Modal>
    </>
  );
};
