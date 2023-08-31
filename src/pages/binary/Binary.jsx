import { Button, Modal, TextInput } from '@mantine/core';
import { useDebouncedValue, useForceUpdate } from '@mantine/hooks';
import dayjs from 'dayjs';
import { BinaryTree } from 'entities/binary/BinaryTree';
import React from 'react'
import Tree from "react-d3-tree";
import { pb } from 'shared/api';

function CustomNode({ nodeData, onNodeClick, handleClick, toggleNode }) {

  const data = nodeData?.value;

  function click (data) {
    handleClick(data)
    toggleNode()
  }

  return (
    <g stroke="grey" fill="grey" strokeWidth="0.7" >
      <circle
        r={10}
        fill={nodeData.children ? "Aquamarine" : "#ccc"}
        onClick={() => data?.id ? click(data) : () => {}}
      />
      <text
        stroke="green"
        x={-60}
        y={-18}
        style={{ fontSize: "12px" }}
        textAnchor="start"
      >
        {data?.name} {data?.surname}
      </text>
      <text
        stroke="green"
        x={-48}
        y={25}
        style={{ fontSize: "13px" }}
        textAnchor="start"
      >
        ID: {data?.id}  
      </text>

      <text
        stroke="grey"
        x={-48}
        y={40}
        style={{ fontSize: "12px" }}
        textAnchor="start"
      >
        {dayjs(data?.created).format("YYYY-MM-DD hh:mm")}
      </text>
    </g>
  );
}

async function getPyramidByUser(userId) {
  if (userId) {
      const pyramid = (
        await pb
          .collection("pyramid")
          .getFullList({ expand: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12" })
      )[0];
      const pyramidsUser = await pb.collection("users").getOne(userId);
      let foundUser = null;
      let result = [];

      for (const stage in pyramid) {
        if (!isNaN(stage)) {
          const stageArrays = pyramid?.expand?.[stage];
          const stageUser = stageArrays?.find((e) => e?.id === userId);
          if (stageUser) {
            foundUser = userId;
            const properties = Object.keys(pyramid?.expand);
            // const pows = properties.length - Number(stage)

            properties.map((key, i) => {
              if (Number(key) > Number(stage)) {
                // console.log(pyramid?.expand?.[key], key, stage, 'stage')
                result.push(pyramid?.expand?.[key]);

                return;
              }
            });

            result = result?.map((arr, i) => {
              return arr.slice(0, Math.pow(2, i + 1));
            });
            result.unshift([pyramidsUser]);
          }
        }
      }

      if (foundUser) {
        return {
          pyramid: pyramid,
          result,
        };
      } else {
        return {
          pyramid: pyramid,
          result: null,
        };
      }
  }

  const pyramid = (
    await pb
      .collection("pyramid")
      .getFullList({ expand: "sponsor, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12" })
  )[0];

  const sponsor = pyramid?.expand?.sponsor

  // const pyramidsUser = await pb.collection("users").getOne(userId);
  let result = [];

  for (const stage in pyramid) {
    if (!isNaN(stage)) {


      result.push(pyramid?.expand?.[stage]);
      // const stageUser = stageArrays?.find((e) => e?.id === sponsor);
    }
    result = result?.map((arr, i) => {
      return arr?.slice(0, Math.pow(2, i + 1));
    });
    
  }
  
  result?.unshift([sponsor]);

  if (sponsor) {
    return {
      pyramid: pyramid,
      result,
    };
  } else {
    return {
      pyramid: pyramid,
      result: null,
    };
  }
}

async function getBinaryById (id) {
  return await pb.collection('binary').getFirstListItem(`sponsor = '${id}'`, {
    expand: 'sponsor, children'
  })
}


export const Binary = () => {

  const forceUpdate = useForceUpdate()
  
  const binaryTree = new BinaryTree(8);
  
  const [root, setRoot] = React.useState(new BinaryTree(8))

  const [toggle, setToggle] = React.useState(false)

  const [pyramid, setPyramid] = React.useState([]);

  const [tree, setTree] = React.useState({});
  const [level, setLevel] = React.useState(0);

  React.useEffect(() => {
    getBinaryById('111111111111111')
    .then(res => {
      root.insert(res?.expand?.sponsor)
      root.insert(res?.expand?.children?.[0]) 
      root.insert(res?.expand?.children?.[1])
    })
    forceUpdate()
  }, [])
 
  React.useEffect(() => {  
    // pyramid.flat(1)?.map((stage, i) => {
    //   return binaryTree.insert(stage);
    // });
  }, [root]);

  React.useEffect(() => {
    // if (binaryTree.findMaxLevel()) {
    //   setLevel(binaryTree.findMaxLevel());
    // }
  }, [binaryTree]);

  const [search, setSearch] = React.useState('')
  const [searchValue] = useDebouncedValue(search, 1000);

  async function searchByValue() {
    if (!searchValue) {
      // handleUsers(1);
      return;
    }
    // getPyramidByUser(searchValue)
    // .then((res) => {
    //   if (res?.result) {
    //     setPyramid(res?.result);
    //   } else {
    //     getPyramidByUser()
    //     .then(res => {
    //       setPyramid(res?.result);
    //     })
    //   }
    // });
  }
  
  React.useEffect(() => {
    searchByValue();
  }, [searchValue]);

  React.useEffect(() => {
    setTree(root.root); 
  }, [toggle]) 

  const [modal, setModal] = React.useState(false)
  const [node, setNode] = React.useState({})

  const [id, setId] = React.useState('')

  async function handleNodeClick (data) {
    // setModal(true)
    setNode(data)
    getBinaryById(data?.id)
    .then(res => {
      console.log(res, 'res ');
      root.insert(res?.expand?.sponsor)
      root.insert(res?.expand?.children?.[0]) 
      root.insert(res?.expand?.children?.[1])
      setToggle(q => !q)
    })
    .catch(err => {
      console.log(err, 'err');
    }) 
  } 

  function add () {
    root.insert({sponsor: 'asdasdasd'})
  }  

  console.log(tree, 'tree');

  return ( 
    <>
      <div> 
        <Button onClick={add}>   
          asdasd
        </Button>
        <TextInput
          label='ID пользолвателя'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="h-[100vh] mt-4 border-2 border-primary-400 p-4 ">
          {tree && (
            <Tree 
              data={tree}
              orientation="vertical" 
              pathFunc="elbow"
              nodeSvgShape={{
                shape: "circle",
                shapeProps: { r: 10, fill: "green " },
              }}
              // collapsible={false}
              // onLinkClick={e => console.log(e.id, 'zxczxc')}
              renderCustomNodeElement={({ nodeDatum, toggleNode, onNodeClick }) => (
                <CustomNode 
                  nodeData={nodeDatum} 
                  toggleNode={toggleNode} 
                  onNodeClick={onNodeClick}
                  handleClick={handleNodeClick}
                />
              )}
            />
          )}
        </div>
      </div>
      <Modal
        opened={modal}
        onClose={setModal}
      > 
        <TextInput
          value={id}
          label='ID пользователя'
          onChange={e => setId(e.currentTarget.value)}
        />  
        <Button>
          
        </Button>
      </Modal>
    </>
  );
}
