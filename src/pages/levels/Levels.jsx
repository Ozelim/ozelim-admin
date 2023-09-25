import React from "react";
import { Button, LoadingOverlay, Menu, Modal, Pagination, Table, Tabs, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import dayjs from "dayjs";
import { CustomNode, findAndReplaceObjectById, getBinaryById, getBinaryById2, getBinaryById3 } from "pages/binary/Binary";
import Tree from "react-d3-tree";
import { pb } from "shared/api";
import { CiCircleRemove } from "react-icons/ci";

async function getUsers() {
  return await pb.collection("level").getFullList({
    expand: `user`,
  })
}

export const Levels = () => {

  const [users, setUsers] = React.useState([]);

  const created = users?.filter((bid => bid?.status === 'created'))
  const ended = users?.filter(q => q?.status === 'succ')

  const travel = ended?.filter(q => q?.new_level === '4.1')
  const courses = ended?.filter(q => q?.new_level === '4.2')
  const five = ended?.filter(q => q?.new_level === '5')
  const six = ended?.filter(q => q?.new_level === '6')

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

  const [loading, setLoading] = React.useState(false)

  const [node, setNode] = React.useState(null)

  const [addModal, setAddModal] = React.useState(false)

  const [addBinary, setAddBinary] = React.useState({})

  const [b, setB] = React.useState(1)

  React.useEffect(() => {
    if (addModal) {
      setLoading(true)
      if (b === 2) {
        getBinaryById(mal?.sponsor)
        .then(async res => {
          const slot = await pb.collection('binary2').getOne(res?.id, {expand: 'sponsor, children'}) 
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
          setLoading(false)
        })
        .catch(err => {
          console.log(err, 'err');
        }) 
        return
      }
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
        setLoading(false)
      })
      .catch(err => {
        console.log(err, 'err');
      }) 
    }
  }, [addModal])

  async function handleNodeClick (data) {
    setLoading(true)
    if (b === 2) {
      getBinaryById2(data?.value?.id)
      .then(async res => {
        const slot = await pb.collection('binary2').getOne(data?.value?.id, {expand: 'sponsor, children'}) 
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
        setLoading(false)
        setShow(true)
      })
      .catch(err => {
        console.log(err, 'err');
      }) 
      return
    }
    if (b === 3) {
      getBinaryById3(data?.value?.id)
      .then(async res => {
        const slot = await pb.collection('binary3').getOne(data?.value?.id, {expand: 'sponsor, children'}) 
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
        setLoading(false)
        setShow(true)
      })
      .catch(err => {
        console.log(err, 'err');
      }) 
      return
    }

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
      setLoading(false)
      setShow(true)
    })
    .catch(err => {
      console.log(err, 'err');
    }) 
  } 

  const [searchModal, setSearchModal] = React.useState(false)
  
  const [mal, setMal] = React.useState(null)
  const [bid, setBid] = React.useState(null)

  const handleNodeAdd = () => {
    openConfirmModal({
      title: 'Подтверждение действия',
      centered: true,
      labels: {confirm: 'Подтвердить', cancel: 'Отмена'},
      children: (
        <>Вы действительно хотите добавить пользователя с ID: {mal?.id} под пользователя {node?.id}?</>
      ),
      onConfirm: () => addNode()
    })
  } 

  async function addNode () {
    setLoading(true)
    await pb.collection(`binary${b}`).update(node?.id, {
      children: [...node?.children, mal]
    })
    .then(async () => {
      await pb.collection(`binary${b}`).create({
        id: mal,
        sponsor: mal, 
      })
      const u = await pb.collection('users').getOne(mal)

      await pb.collection('users').update(mal, {
        bin: true,
        balance: u?.balance + 1000000,
        level: '',
        cock: false,
        binary: b,
      })
      await pb.collection('level').update(bid, {
        status: 'succ'
      })
      if (b === 2) {
        await getBinaryById2(node?.id)
        .then(res => {
          const obj = findAndReplaceObjectById(addBinary, node?.id, {
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
          setAddBinary({...addBinary, obj})
          setShow(true)
          setLoading(false)
        })
      }
      if (b === 3) {
        await getBinaryById3(node?.id)
        .then(res => {
          const obj = findAndReplaceObjectById(addBinary, node?.id, {
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
          setAddBinary({...addBinary, obj})
          setShow(false)
          setLoading(false)
        })
      }
    })
  }

  async function searchByValue(user, newLevel, bidId) {
    if (!user?.id) return
    setShow(false)
    setLoading(true)
    if (newLevel == 6 && user?.binary == 0) {
      setB(2)
      getBinaryById2(user?.id)
      .then(async res => {
        const slot = await pb.collection('binary2').getOne(res?.id, {expand: 'sponsor, children'}) 
        setNode(slot)
        setMal(user?.id)
        setBid(bidId)
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
        setShow(true)
        setLoading(false)
      })
      .catch(err => {
        console.log(err, 'err');
      }) 
      return
    } 

    if (newLevel == 6 && user?.binary == 2) {
      setB(3)
      getBinaryById3(user?.id)
      .then(async res => {
        const slot = await pb.collection('binary3').getOne(res?.id, {expand: 'sponsor, children'}) 
        setNode(slot)
        setMal(user?.id)
        setBid(bidId)
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
        setShow(true)
        setLoading(false)
      })
      .catch(err => {
        console.log(err, 'err');
      }) 
      return
    } 
      setB(1)
      getBinaryById(user?.id)
      .then(async res => {
        const slot = await pb.collection('binary').getOne(user?.id, {expand: 'sponsor, children'}) 
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
        // setShow(true)
        setLoading(false)
      })
      .catch(err => {
        console.log(err, 'err');
      }) 
      setLoading(false)
  }

  async function giveNewLevel (user, newLevel, id) {
    setLoading(true)
    if (newLevel == 5) {
      const u = await pb.collection('users').getOne(user?.id)
      return await pb.collection('users').update(user?.id, {
        balance: u?.balance + 500000,
        level: newLevel,
        cock: false
      })
      .then(async () => {
        await pb.collection('level').update(id, {
          status: 'succ'
        })
        setLoading(false)
      })
    }

    if (newLevel == 6) {
      const u = await pb.collection('users').getOne(user?.id)
      return await pb.collection('users').update(user?.id, {
        balance: u?.balance + 1000000,
        level: newLevel,
        cock: false
      })
      .then(async () => {
        await pb.collection('level').update(id, {
          status: 'succ'
        })
        setLoading(false)
      })
    }

    return await pb.collection('users').update(user?.id, {
      level: newLevel,
      cock: false
    })
    .then(async () => {
      await pb.collection('level').update(id, {
        status: 'succ'
      })
      setLoading(false)
    })
  }

  const confirmNewLevel = (user, newLevel, id) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true, 
    labels: {confirm: 'Подтвердить', cancel: 'Отмена'},
    children: (
      <>Действительно выдать вознаграждение и повысить уровень до {
        newLevel === '4.1' && '4' || 
        newLevel === '4.2' && '4' || 
        newLevel
      }?</>
    ),
    onConfirm: () => giveNewLevel(user, newLevel, id)
  })

  async function deleteWithdraw (id, userId) {
    setLoading(true)
    await pb.collection('level').delete(id)
    .then(async () => {
      await pb.collection('users').update(userId, {
        cock: false
      })
      setLoading(true)
    })
  }

  const removeWithdrawConfirm = (id, userId) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    labels: { confirm: 'Подтвердить', cancel: 'Отмена'},
    children: (
      <>Вы действительно хотите удалить данную заявку?</>
    ),
    onConfirm: () => deleteWithdraw(id, userId)
  })

  const [show, setShow] = React.useState(true)

  const disabled = (!node) || node?.children?.length >= 2 

  return (
    <>
      <div className="w-full">
        <LoadingOverlay
          visible={loading}
        />
        <Tabs>
          <Tabs.List>
            <Tabs.Tab value="5">Активные</Tabs.Tab>
            <Tabs.Tab value="1">Путевки</Tabs.Tab>
            <Tabs.Tab value="2">Курсы</Tabs.Tab>
            <Tabs.Tab value="3">5 уровень</Tabs.Tab>
            <Tabs.Tab value="4">6 уровень</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="1">
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
              {travel.map((user, i) => {
                return (
                  <tr
                    key={i}
                    // onClick={() => openChangeModal(user)}
                  >
                    <td>
                      {dayjs(user?.created).format(`DD.MM.YY, HH:mm`)}
                    </td>
                    <td>
                        {user?.user}
                    </td>
                    <td>
                      {user?.level === '4.1' && '4.Путевка'}
                      {user?.level === '4.2' && '4.Курса'}
                      {(user?.level != '4.1' && user?.level != '4.2') && user?.level}
                    </td>
                    <td>
                          {user?.new_level === '4.1' && '4'}
                          {user?.new_level === '4.2' && '4'}
                          {(user?.new_level != '4.1' && user?.new_level != '4.2') && user?.new_level}
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
          </Tabs.Panel>
          <Tabs.Panel value="2">
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
              {courses.map((user, i) => {
                return (
                  <tr
                    key={i}
                    // onClick={() => openChangeModal(user)}
                  >
                    <td>
                      {dayjs(user?.created).format(`DD.MM.YY, HH:mm`)}
                    </td>
                    <td>
                        {user?.user}
                    </td>
                    <td>
                    {user?.level === '4.1' && '4.Путевка'}
                      {user?.level === '4.2' && '4.Курса'}
                      {(user?.level != '4.1' && user?.level != '4.2') && user?.level}
                    </td>
                    <td>
                          {user?.new_level === '4.1' && '4'}
                          {user?.new_level === '4.2' && '4'}
                          {(user?.new_level != '4.1' && user?.new_level != '4.2') && user?.new_level}
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
          </Tabs.Panel>
          <Tabs.Panel value="3">
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
              {five.map((user, i) => {
                return (
                  <tr
                    key={i}
                    // onClick={() => openChangeModal(user)}
                  >
                    <td>
                      {dayjs(user?.created).format(`DD.MM.YY, HH:mm`)}
                    </td>
                    <td>
   
                        {user?.user}
                    </td>
                    <td>
                      {user?.level === '4.1' && '4.Путевка'}
                      {user?.level === '4.2' && '4.Курса'}
                      {(user?.level != '4.1' && user?.level != '4.2') && user?.level}
                    </td>
                    <td>
                      {user?.new_level === '4.1' && '4'}
                      {user?.new_level === '4.2' && '4'}
                      {(user?.new_level != '4.1' && user?.new_level != '4.2') && user?.new_level}
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
          </Tabs.Panel>
          <Tabs.Panel value="4">
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
              {six.map((user, i) => {
                return (
                  <tr
                    key={i}
                    // onClick={() => openChangeModal(user)}
                  >
                    <td>
                      {dayjs(user?.created).format(`DD.MM.YY, HH:mm`)}
                    </td>
                    <td>
                      {user?.user}
                    </td>
                    <td>
                    {user?.level === '4.1' && '4.Путевка'}
                      {user?.level === '4.2' && '4.Курса'}
                      {(user?.level != '4.1' && user?.level != '4.2') && user?.level}
                    </td>
                    <td>
                          {user?.new_level === '4.1' && '4'}
                          {user?.new_level === '4.2' && '4'}
                          {(user?.new_level != '4.1' && user?.new_level != '4.2') && user?.new_level}
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
          </Tabs.Panel>
          <Tabs.Panel value="5">
            <Table className="mt-4">
              <thead>
                <tr>
                  <th>Дата подачи</th>
                  <th>Бинар ID</th>
                  <th>Завер. ур.</th>
                  <th>Новый ур.</th>
                  <th>Имя</th>
                  <th>Фамилия</th>
                  <th>Телефон</th>
                  <th>Область</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {created.map((user, i) => {
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
                          onClick={() => searchByValue(user?.expand?.user)}
                        >
                          {user?.user}
                        </Button>
                      </td>
                      <td>
                      {user?.level === '4.1' && '4.Путевка'}
                      {user?.level === '4.2' && '4.Курс'}
                      {(user?.level != '4.1' && user?.level != '4.2') && user?.level}
                      </td>
                      <td>
                        <Button
                          compact
                          variant="outline"
                          onClick={user?.new_level == 6 
                            ? () => searchByValue(user?.expand?.user, user?.new_level, user?.id) 
                            : () => confirmNewLevel(user?.expand?.user, user?.new_level, user?.id)}
                        >
                          {user?.new_level === '4.1' && '4.Путевка'}
                          {user?.new_level === '4.2' && '4.Курс'}
                          {(user?.new_level != '4.1' && user?.new_level != '4.2') && user?.new_level}
                        </Button>
                      </td>
                      <td>{user?.expand?.user?.name}</td>
                      <td>{user?.expand?.user?.surname}</td>
                      <td>{user?.expand?.user?.phone}</td>
                      <td>{user?.expand?.user?.region}</td>
                      <td>
                        <CiCircleRemove 
                          size={35}
                          color='red'
                          onClick={() => removeWithdrawConfirm(user?.id, user?.user)}
                          className='cursor-pointer hover:fill-yellow-500'
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Tabs.Panel>
        </Tabs>
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
                handleNodeAdd={handleNodeAdd}
                sponsor={mal}
                node={node}
              />
            )}
          />
        </div>
        <div className='mt-4 flex justify-center'>
          <Button
            disabled={disabled || !show}
            onClick={handleNodeAdd}
          >
            Добавить
          </Button>
        </div>
      </Modal>
    </>
  );
};