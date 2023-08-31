import React, { useState } from 'react';
import { Tree } from 'react-d3-tree';

const TreeNode = () => {

  return (
    <g stroke="grey" fill="grey" strokeWidth="0.7">
      <circle
        r={10}
        fill={"Aquamarine"}
        // onClick={() => data?.id ? click(data) : () => {}}
      />
      <text
        stroke="green"
        x={-48}
        y={25}
        style={{ fontSize: "13px" }}
        textAnchor="start"
      >
        {'asdasdasd'}
      </text>
    </g>
  );
};

export const Home = () => {
  const initialTreeData = [
    { 
      name: 'Пользователь 1',
      children: [
        {
          name: 'Пользователь 1',
        },
        {
          name: 'Пользователь 1',
        },
      ],
    },
  ];

  const [treeData, setTreeData] = useState(initialTreeData);

  const addNewChild = (node) => {
    if (node.children.length < 2) {
      // Добавление нового потомка
      const newChild = {
        name: `Пользователь ${node.children.length + 1}`,
        children: [],
      };
      node.children.push(newChild);
    } else {
      // Рекурсивный вызов для добавления нового потомка к первому доступному потомку
      node.children.forEach((child) => {
        if (child.children.length < 2) {
          addNewChild(child);
        }
      });
    }
  };

  const handleNodeClick = (nodeData) => {
    addNewChild(nodeData);

    // Перерисовка дерева после добавления нового потомка
    setTreeData([...treeData]);
  };

  return (
    <div className='h-screen'>
      <Tree
        data={treeData}
        onClick={handleNodeClick}
        renderCustomNodeElement={(rd3tProps) => (
          <TreeNode {...rd3tProps}  />
        )}
        orientation="vertical" 
      />
    </div>
  );
};