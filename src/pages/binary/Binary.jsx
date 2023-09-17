import { Button, Modal, Table, TextInput, clsx } from '@mantine/core';
import { useDebouncedValue, useForceUpdate } from '@mantine/hooks';
import { openConfirmModal } from '@mantine/modals';
import dayjs from 'dayjs';
import { BinaryTree } from 'entities/binary/BinaryTree';
import React from 'react'
import Tree from "react-d3-tree";
import { pb } from 'shared/api';
import { getImageUrl } from 'shared/lib';
import { Image } from 'shared/ui';

export function CustomNode({ nodeDatum, onNodeClick, sponsor, node, handleSelected }) {

  const data = nodeDatum?.value;

  function click (data) {
    onNodeClick(data)
  }

  const isSponsor = data?.id && (data?.id === sponsor?.sponsor)

  const selected = node?.id === data?.id 

  return (
    <g stroke="grey" fill="grey" strokeWidth="0.7" >
      <circle
        r={isSponsor ? 30 : 20}
        fill={nodeDatum?.children ? "Aquamarine" : "#ccc"}
        onClick={() => data?.id && click(nodeDatum)}
        strokeWidth={selected ? 5 : 1}
        stroke={selected ? 'red' : 'black'}
      />
      <text
        stroke="green"
        x={-60}
        y={-25}
        style={{ fontSize: "12px" }}
        textAnchor="start"
      >
        {data?.name} {data?.surname}
      </text>
      <text
        stroke="green"
        x={-48}
        y={35}
        style={{ fontSize: "13px" }}
        textAnchor="start"
      >
        {data?.id && (
          `ID: ${data?.id}`
        )}
      </text>

      <text
        stroke="grey"
        x={-48}
        y={50}
        style={{ fontSize: "12px" }}
        textAnchor="start"
      >
        {data?.created && (
          dayjs(data?.created).format("YYYY-MM-DD hh:mm")
        )}
      </text>
    </g>
  );
}

export function findAndReplaceObjectById(obj, idToFind, replacementObject) {
  // Check if the current object has an 'id' property that matches the desired ID
  if (obj?.value?.id === idToFind) {
    // Replace the current object with the replacementObject
    return replacementObject;
  }

  // If the current object doesn't match, recursively search its nested properties
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      const result = findAndReplaceObjectById(obj[key], idToFind, replacementObject);
      if (result !== null) {
        // If the object was found and replaced in a nested property, update the current property
        obj[key] = result;
      }
    }
  }

  return obj;
}

export async function getBinaryById (id) {

  let foundSlot = {}

  await pb.collection('binary').getFirstListItem(`sponsor = '${id}'`, {
    expand: 'sponsor, children'
  })
  .then((res) => {
    foundSlot = res
  })
  .catch(async err => {
    const user = await pb.collection('users').getOne(id)
    await pb.collection('binary').getFirstListItem(`sponsor = ${user?.sponsor}`, {expand: 'sponsor, children'})
    .then(res => {
      foundSlot = res
    })
    .catch(async err => {      
      let userId = user?.sponsor
      for (let i = 1; i < 5; i++) {
        const user = await pb.collection('users').getOne(userId)
        await pb.collection('binary').getFirstListItem(`sponsor = "${userId}"`, {expand: `sponsor, children`})
        .then(res => {
          foundSlot = res
        })
        .catch(async err => {
          const spons = await pb.collection('users').getOne(user?.sponsor)
          userId = spons?.id
        })
      }
    })
  })

  if (!foundSlot?.id) return await pb.collection('binary').getFirstListItem(`sponsor = '111111111111111'`, {
    expand: 'sponsor, children'
  })

  return foundSlot
}

export async function getBinaryById2 (id) {

  let foundSlot = {}

  await pb.collection('binary2').getFirstListItem(`sponsor = '${id}'`, {
    expand: 'sponsor, children'
  })
  .then((res) => {
    foundSlot = res
  })
  .catch(async err => {
    const user = await pb.collection('users').getOne(id)
    await pb.collection('binary2').getFirstListItem(`sponsor = ${user?.sponsor}`, {expand: 'sponsor, children'})
    .then(res => {
      foundSlot = res
    })
    .catch(async err => {      
      let userId = user?.sponsor
      for (let i = 1; i < 5; i++) {
        const user = await pb.collection('users').getOne(userId)
        await pb.collection('binary2').getFirstListItem(`sponsor = "${userId}"`, {expand: `sponsor, children`})
        .then(res => {
          foundSlot = res
        })
        .catch(async err => {
          const spons = await pb.collection('users').getOne(user?.sponsor)
          userId = spons?.id
        })
      }
    })
  })

  if (!foundSlot?.id) {
    return await pb.collection('binary2').getFirstListItem(`sponsor = '111111111111111'`, {
      expand: 'sponsor, children'
    })
  } 

  return foundSlot
}
export async function getBinaryById3 (id) {

  let foundSlot = {}

  await pb.collection('binary3').getFirstListItem(`sponsor = '${id}'`, {
    expand: 'sponsor, children'
  })
  .then((res) => {
    foundSlot = res
  })
  .catch(async err => {
    const user = await pb.collection('users').getOne(id)
    await pb.collection('binary3').getFirstListItem(`sponsor = ${user?.sponsor}`, {expand: 'sponsor, children'})
    .then(res => {
      foundSlot = res
    })
    .catch(async err => {      
      let userId = user?.sponsor
      for (let i = 1; i < 5; i++) {
        const user = await pb.collection('users').getOne(userId)
        await pb.collection('binary3').getFirstListItem(`sponsor = "${userId}"`, {expand: `sponsor, children`})
        .then(res => {
          foundSlot = res
        })
        .catch(async err => {
          const spons = await pb.collection('users').getOne(user?.sponsor)
          userId = spons?.id
        })
      }
    })
  })

  if (!foundSlot?.id) {
    return await pb.collection('binary3').getFirstListItem(`sponsor = '111111111111111'`, {
      expand: 'sponsor, children'
    })
  } 

  return foundSlot
}

async function getWorthyUsers () {
  const users = await pb.collection('users').getFullList({filter: `verified = true && bin = false`, expand: 'sponsor, referals'})

  // function hasThreeOrMoreVerifiedReferrals(user) {
  //   const verifiedReferrals = user?.expand?.referals?.filter(referal => referal.verified == true);
  //   return verifiedReferrals?.length >= 3;
  // }
  
  // const usersWithThreeOrMoreVerifiedReferrals = users?.filter(user => hasThreeOrMoreVerifiedReferrals(user));
  
  // return usersWithThreeOrMoreVerifiedReferrals ?? []
  return users
}

export const Binary = () => {

  const [binary, setBinary] = React.useState({})
  
  const [level, setLevel] = React.useState(0);

  const [mals, setMals] = React.useState([])
  const [mal, setMal] = React.useState(null)

  const [selected, setSelected] = React.useState(null)

  React.useEffect(() => {
    getWorthyUsers()
    .then(res => {
      setMals(res)
    })

    // getBinaryById('111111111111111')
    // .then(res => {
    //   setBinary({
    //     value: res?.expand?.sponsor,
    //     children: [
    //       {
    //         value: res?.expand?.children?.[0],
    //         children: []
    //       },
    //       {
    //         value: res?.expand?.children?.[1],
    //         children: []
    //       },
    //     ]
    //   })
    // })

    pb.collection('users').subscribe('*', function ({_, record}) {
      // if (record?.bin) {
        getWorthyUsers()
        .then(res => {
          setMals(res)
        })
      // }
    })
  }, [])

  const [search, setSearch] = React.useState('')
  const [searchModal, setSearchModal] = React.useState(false)

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
    if (!search) return
      getBinaryById(search)
      .then(async res => {
        const slot = await pb.collection('binary').getOne(search, {expand: 'sponsor, children'}) 
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
  
  const [node, setNode] = React.useState(null)

  async function handleNodeClick (data) {
    if (mal?.expand?.sponsor?.binary === 2) {
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
        setShow(true)
      })
      .catch(err => {
        console.log(err, 'err');
      }) 
      return
    }

    if (mal?.expand?.sponsor?.binary === 3) {
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
      setShow(true)
    })
    .catch(err => {
      console.log(err, 'err');
    }) 
  } 

  async function addNode () {
    if (mal?.expand?.sponsor?.binary === 2) {
      await pb.collection('binary2').update(node?.id, {
        children: [...node?.children, mal?.id]
      })
      .then(async () => {
        await pb.collection('binary2').create({
          id: mal?.id,
          sponsor: mal?.id, 
        })
        await pb.collection('users').update(mal?.id, {
          bin: true
        })
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
        })
      })
      setShow(false)
      return
    }
    
    if (mal?.expand?.sponsor?.binary === 3) {
      await pb.collection('binary3').update(node?.id, {
        children: [...node?.children, mal?.id]
      })
      .then(async () => {
        await pb.collection('binary3').create({
          id: mal?.id,
          sponsor: mal?.id, 
        })
        await pb.collection('users').update(mal?.id, {
          bin: true
        })
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
        })
      })
      setShow(false)
      return
    }
    
    await pb.collection('binary').update(node?.id, {
      children: [...node?.children, mal?.id]
    })
    .then(async () => {
      await pb.collection('binary').create({
        id: mal?.id,
        sponsor: mal?.id, 
      })
      await pb.collection('users').update(mal?.id, {
        bin: true
      })
      await getBinaryById(node?.id)
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
      })
    })
    setShow(false)
  }

  const [show, setShow] = React.useState(true)

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

  const disabled = (!node || !mal) || node?.children?.length >= 2 

  const [addModal, setAddModal] = React.useState(false)

  const [addBinary, setAddBinary] = React.useState({})

  React.useEffect(() => {
    if (addModal) {
      if (mal?.expand?.sponsor?.binary === 2) {
        getBinaryById2(mal?.sponsor)
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
          setShow(true)
        })
        .catch(err => {
          console.log(err, 'err');
        }) 
        return
      }
      if (mal?.expand?.sponsor?.binary === 3) {
        getBinaryById3(mal?.sponsor)
        .then(async res => {
          const slot = await pb.collection('binary3').getOne(res?.id, {expand: 'sponsor, children'}) 
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
          setShow(true)
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
        setShow(true)
      })
      .catch(err => {
        console.log(err, 'err');
      }) 
    }
  }, [addModal])

  function handleAddMode (val) {
    setMal(val)
    setNode(val?.expand?.sponsor)
    setAddModal(true)
  }

  return ( 
    <>
      <div> 
        <div className='flex items-end'>
          <TextInput
            label='Поиск по ID'
            value={search}
            className='max-w-xs'
            onChange={e => setSearch(e.target.value)}
          />
          <Button
            onClick={() => searchByValue()}
          >
            Поиск
          </Button>          
          <Button
            onClick={() => searchByValue('111111111111111')}
            compact
            variant='subtle'
            className='ml-8'
          >
            Открыть бинарку
          </Button>
        </div>
        <div className='mt-5 gap-4'>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Телефон</th>
                <th>Партнеры</th>
                <th>Спонсор</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              {mals?.map((mambet, i) => {
                return (
                  <tr key={i}>
                    <td>{mambet?.id}</td>
                    <td>{mambet?.name}</td>
                    <td>{mambet?.surname}</td>
                    <td>{mambet?.phone}</td>
                    <td>{mambet?.expand?.referals?.length}</td>
                    <td>{mambet?.sponsor}</td>
                    <td>
                      <Button
                        onClick={() => handleAddMode(mambet)}
                      >
                        Добавить
                      </Button>  
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal
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
            disabled={disabled || !show}
            onClick={handleNodeAdd}
          >
            Добавить
          </Button>
        </div>
      </Modal>
      <Modal
        opened={searchModal}
        centered
        fullScreen
        onClose={() => {
          setSearchModal(false)
          setBinary(null)
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
      </Modal>
    </>
  );
}


// <div className="h-[70vh] mt-4 border-2 border-primary-400 p-4 w-full">
// <Tree 
//   data={binary ?? {}}
//   orientation="vertical" 
//   pathFunc="elbow"
//   nodeSvgShape={{
//     shape: "circle",
//     shapeProps: { r: 20, fill: "green " },
//   }}
//   // collapsible={false}
//   // onLinkClick={e => console.log(e.id, 'zxczxc')}
//   renderCustomNodeElement={(props) => (
//     <CustomNode 
//       {...props}
//       onNodeClick={handleNodeClick}
//       handleNodeAdd={handleNodeAdd}
//       sponsor={mal}
//       node={node}
//     />
//   )}
// />
// </div>