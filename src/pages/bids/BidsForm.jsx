import React from "react";
import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Controller } from "react-hook-form";
import { pb } from "shared/api";
import { BomjCard } from "widgets";
import { BomjPlaza } from "widgets/BomjPlaza";
import dayjs from "dayjs";
import { CiCircleRemove } from "react-icons/ci";
import { openConfirmModal } from "@mantine/modals";
import { useAuth } from "shared/hooks";
import { BiBadgeCheck } from "react-icons/bi";

async function getResorts (diseas, region) {
  const resorts = await pb.collection('resorts').getFullList({
    filter: `(region = '${region}' || diseas ~ '${diseas}') && status = 'bomj'`
  })

  const regions = resorts.filter(resort => resort?.region === region)
  const diseases = resorts.filter(resort => resort?.diseas?.includes(diseas))

  return {
    regions, 
    diseases,
  }
}

export const BidsForm = ({ bid, ended, q }) => {

  const {user} = useAuth()

  const [opened, { open, close }] = useDisclosure(false);

  const [resorts, setResorts] = React.useState({})

  const [questions, setQuestions] = React.useState({})

  React.useEffect(() => {
    let qs = {}
    for (const key in q) {
      if (!isNaN(key) && Number(key) <= q?.count) {
        qs = {
          ...qs, 
          [key]: q?.[key]
        }
      }
    }
    setQuestions(qs)
  }, [])

  React.useEffect(() => {
    if (opened) {
      getResorts(bid?.[1], bid?.[2])
      .then(res => {
        setResorts(res)
      })
    }
  }, [opened])

  async function deleteWithdraw () {
    await pb.collection('questions').update(bid?.id, {
      status: 'succ',
      admin: user?.email
    })
  }

  async function deleteWithdraw1 () {
    await pb.collection('questions').update(bid?.id, {
      status: 'fall',
      admin: user?.email
    })
  }


  const removeWithdrawConfirm = (e) => {
    e?.stopPropagation()
    openConfirmModal({
      title: 'Подтвердите действие',
      centered: true,
      labels: { confirm: 'Успешно', cancel: 'Отклонено'},
      children: (
        <></>
      ),
      onConfirm: () => deleteWithdraw(),
      onCancel: () => deleteWithdraw1()
    })
  }

  return (
    <>
      <tr 
        onClick={open}
      >
        <td>{bid?.[1]}</td>
        <td>{bid?.[2]}</td>
        <td>{bid?.[3]}</td>
        <td>{bid?.[4]}</td>
        {ended 
          ? 
            <>
              <td>{dayjs(bid?.created).format('YY-MM-DD, HH-mm')}</td>
              <td>{(bid?.status === 'succ' ? 'Успешно' : 'Отклонено')}</td>
              <td>{bid?.admin}</td>
            </> 
          : 
            <>
              <td>{dayjs(bid?.created).format('YY-MM-DD, HH-mm')}</td>
              <td>   
                <BiBadgeCheck
                  size={35}
                  color='red'
                  onClick={removeWithdrawConfirm}
                  className='cursor-pointer hover:fill-yellow-500'
                />
              </td>
            </>
        }
      </tr>
      <Modal 
        opened={opened} 
        onClose={close}
        size={'xl'}
      >
        <div>
          {Object.keys(questions)?.map((key, i) => {
            return (
              <TextInput 
                key={i}
                readOnly 
                label={questions?.[key]} 
                value={bid?.[key]} 
              />
            )
          })}
          {/* <TextInput
            readOnly
            label="Какая у вас Область?"
            value={bid?.[2]}
          />
          <TextInput
            readOnly
            label="Какая у вас болезнь?"
            value={bid?.[3]}
          />
          <TextInput readOnly label="Ваш телефон?" value={bid?.[4]} /> */}
        </div>
        <div className="mt-10">
          <h2>Курорты</h2>
          {resorts?.regions?.length !== 0 && (
            <div className="mt-5 space-y-4">
              <h2>По областям:</h2>
              {resorts?.regions?.map((resort) => {
                return (
                  <BomjPlaza resort={resort} key={resort?.id} />
                ) 
              })}
            </div>
          )}
          {resorts?.diseases?.length !== 0 && (
            <div className="mt-5 space-y-4">
              <h2>По болезням:</h2>
              {resorts?.diseases?.map((resort) => {
                return (
                  <BomjPlaza resort={resort} key={resort?.id} />
                ) 
              })}
            </div>
          )}
        </div>
      </Modal>
    </>
    // <div className="w-full">
    //   <div
    //     onClick={open}
    //     className="border-2 p-3  rounded-primary border-solid border-primary-500 text-[#1e1e1e] mt-5 "
    //   >
        
  
    //   </div>

    // </div>
  );
};
