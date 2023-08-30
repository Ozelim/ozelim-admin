import { TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import dayjs from 'dayjs';
import { BinaryTree } from 'entities/binary/BinaryTree';
import React from 'react'
import Tree from "react-d3-tree";
import { pb } from 'shared/api';

function CustomNode({ nodeData, toggleNode }) {
  const data = nodeData?.value;

  return (
    <g stroke="grey" fill="grey" strokeWidth="0.7">
      <circle
        r={10}
        fill={nodeData.children ? "Aquamarine" : "#ccc"}
        onClick={toggleNode}
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

export const Binary = () => {

  const binaryTree = new BinaryTree(8);

  const [pyramid, setPyramid] = React.useState([]);

  const [tree, setTree] = React.useState({});
  const [level, setLevel] = React.useState(0);

  React.useEffect(() => {
    getPyramidByUser().then((res) => {
      setPyramid(res?.result);
    });
  }, [])

  React.useEffect(() => {
    pyramid.flat(1)?.map((stage, i) => {
      return binaryTree.insert(stage);
    });

    setTree(binaryTree.root);
  }, [pyramid]);

  React.useEffect(() => {
    if (binaryTree.findMaxLevel()) {
      setLevel(binaryTree.findMaxLevel());
    }
  }, [binaryTree]);

  const [search, setSearch] = React.useState('')
  const [searchValue] = useDebouncedValue(search, 1000);

  async function searchByValue() {
    if (!searchValue) {
      // handleUsers(1);
      return;
    }
    getPyramidByUser(searchValue)
    .then((res) => {
      if (res?.result) {
        setPyramid(res?.result);
      } else {
        getPyramidByUser()
        .then(res => {
          setPyramid(res?.result);
        })
      }
    });
  }
  
  React.useEffect(() => {
    searchByValue();
  }, [searchValue]);

  return (
    <div>
      <TextInput
        label='ID пользолвателя'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="h-[100vh] mt-4 border-2 border-primary-400 p-4 ">
        <Tree
          data={tree ?? {}}
          orientation="vertical"
          pathFunc="elbow"
          nodeSvgShape={{
            shape: "circle",
            shapeProps: { r: 10, fill: "green" },
          }}
          renderCustomNodeElement={({ nodeDatum, toggleNode }) => (
            <CustomNode nodeData={nodeDatum} toggleNode={toggleNode} />
          )}
        />
      </div>
    </div>
  );
}
