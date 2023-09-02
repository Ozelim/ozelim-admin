import { Button, Modal, TextInput, clsx } from '@mantine/core';
import { useDebouncedValue, useForceUpdate } from '@mantine/hooks';
import { openConfirmModal } from '@mantine/modals';
import dayjs from 'dayjs';
import { BinaryTree } from 'entities/binary/BinaryTree';
import React from 'react'
import Tree from "react-d3-tree";
import { pb } from 'shared/api';
import { getImageUrl } from 'shared/lib';
import { Image } from 'shared/ui';

function CustomNode({ nodeDatum, onNodeClick, sponsor, node, handleSelected }) {

  const data = nodeDatum?.value;

  function click (data) {
    onNodeClick(data)
  }

  const isSponsor = data?.id && (data?.id === sponsor?.sponsor)

  const selected = node?.id === data?.id 

  return (
    <g stroke="grey" fill="grey" strokeWidth="0.7" >
      <circle
        r={isSponsor ? 40 : 20}
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

function findAndReplaceObjectById(obj, idToFind, replacementObject) {
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

async function getBinaryById (id) {
  return await pb.collection('binary').getFirstListItem(`sponsor = '${id}'`, {
    expand: 'sponsor, children'
  })
}

async function getWorthyUsers () {
  const users = await pb.collection('users').getFullList({filter: `verified = true && bin = false`, expand: 'referals'})

  function hasThreeOrMoreVerifiedReferrals(user) {
    const verifiedReferrals = user?.expand?.referals?.filter(referal => referal.verified == true);
    return verifiedReferrals?.length >= 3;
  }
  
  const usersWithThreeOrMoreVerifiedReferrals = users?.filter(user => hasThreeOrMoreVerifiedReferrals(user));
  
  return usersWithThreeOrMoreVerifiedReferrals ?? []
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

    getBinaryById('111111111111111')
    .then(res => {
      setBinary({
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

    pb.collection('users').subscribe('*', function ({_, record}) {
      if (record?.bin) {
        getWorthyUsers()
        .then(res => {
          setMals(res)
        })
      }
    })
  }, [])

  const [search, setSearch] = React.useState('')
  const [searchValue] = useDebouncedValue(search, 1000);

  async function searchByValue() {
    if (!searchValue) {
      // handleUsers(1);
      return;
    }
  }
  
  React.useEffect(() => {
    searchByValue();
  }, [searchValue]);

  const [node, setNode] = React.useState(null)

  async function handleNodeClick (data) {
    if (mal) {
      getBinaryById(mal?.sponsor)
      .then(async res => {
        console.log(res, 'res');
        const slot = await pb.collection('binary').getOne(data?.value?.id, {expand: 'sponsor, children'}) 
        // setNode(slot)
        const obj = findAndReplaceObjectById(binary, mal?.sponsor, {
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
        setBinary(obj)
      })
      .catch(err => {
        console.log(err, 'err');
      }) 
    }
    getBinaryById(data?.value?.id)
    .then(async res => {
      const slot = await pb.collection('binary').getOne(data?.value?.id, {expand: 'sponsor, children'}) 
      setNode(slot)
      const obj = findAndReplaceObjectById(binary, data?.value?.id, {
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
      setBinary({...binary, obj})
    })
    .catch(err => {
      console.log(err, 'err');
    }) 
  } 

  async function addNode () {
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
        const obj = findAndReplaceObjectById(binary, node?.id, {
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
        setBinary({...binary, obj})
      })
    })
  }

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

  function handleMambetClick (val) {
    if (val === mal) {
      setMal(null)
    } else {
      setMal(val)
    }
  }

  const disabled = (!node || !mal) || node?.children?.length >= 2 

  async function zxc () {
    getBinaryById('295574719031357')
    .then(async res => {
      // const slot = await pb.collection('binary').getOne('295574719031357', {expand: 'sponsor, children'}) 
      // setNode(slot)
      const obj = findAndReplaceObjectById(binary, '295574719031357', {
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

      console.log(obj, 'obj');
      setBinary(obj)
    })
    .catch(err => {
      console.log(err, 'err');
    }) 
  }

  return ( 
    <>
      <div> 
        <TextInput
          label='ID пользолвателя'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className='flex mt-5 gap-4'>
          {mals.map((mambet, i) => {
            return (
              <div 
                key={i} 
                className={'flex flex-col items-center gap-2 cursor-pointer'}
                onClick={() => handleMambetClick(mambet)}
              >
                {mambet?.avatar 
                  ? <img src={getImageUrl(mambet, mambet?.avatar)} className={clsx('w-10 h-10 bg-slate-300 rounded-full', {
                    'border-4 border-teal-500': mambet === mal
                  })} />
                  : <div className={clsx('w-10 h-10 bg-slate-300 rounded-full', {
                      'border-4 border-teal-500': mambet === mal
                    })}/>
                }
                <p>{mambet?.id}</p>
              </div>
            )
          })}
        </div>
        <div>
          <Button
            onClick={zxc}
          >
          </Button>
          <Button
            onClick={handleNodeAdd}
            disabled={disabled}
          >
            Добавить
          </Button>
        </div>
        <div className="h-[70vh] mt-4 border-2 border-primary-400 p-4 ">
          <Tree 
            data={binary ?? {}}
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
      </div>
    </>
  );
}
