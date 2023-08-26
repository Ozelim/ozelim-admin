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

async function getQuestions () {
  return (await pb.collection('questions').getFullList({filter: `question = true`}))[0]
}

async function getResorts (diseas, region) {
  const resorts = await pb.collection('resorts').getFullList({
    filter: `(region = '${region}' || diseas = '${diseas}') && status = 'bomj'`
  })

  const regions = resorts.filter(resort => resort?.region === region)
  const diseases = resorts.filter(resort => resort?.disesas === diseas)

  return {
    regions, 
    diseases,
  }
}

export const BidsForm = ({ bid }) => {

  const [opened, { open, close }] = useDisclosure(false);

  const [questions, setQuestions] = React.useState({})

  const [resorts, setResorts] = React.useState({})

  React.useEffect(() => {
    getQuestions()
    .then(res => {
      let qs = {}
      for (const key in res) {
        if (!isNaN(key) && Number(key) <= res?.count) {
          qs = {
            ...qs, 
            [key]: res?.[key]
          }
        }
      }
      setQuestions(qs)
    })
    getResorts(bid?.[1], bid?.[2])
    .then(res => {
      setResorts(res)
    })
  }, [])

  const removeWithdrawConfirm = (e) => {
    e?.stopPropagation()
    openConfirmModal({
      title: 'Подтвердите действие',
      centered: true,
      labels: { confirm: 'Подтвердить', cancel: 'Отмена'},
      children: (
        <>Вы действительно хотите отклонить данную отправку?</>
      ),
      onConfirm: () => deleteWithdraw()
    })
  }

  async function deleteWithdraw () {
    await pb.collection('questions').delete(bid?.id)
  }

  return (
    <div className="w-full">
      <div
        onClick={open}
        className="border-2 p-5  rounded-primary border-solid border-primary-500 text-[#1e1e1e] mt-5 "
      >
        <form className="flex justify-between">
          <div>{bid?.[1]}</div>
          <div>{bid?.[2]}</div>
          <div>{bid?.[3]}</div>
          <div>{bid?.[4]}</div>
          <div>{dayjs(bid?.created).format('YY-MM-DD, HH-mm')}</div>
          <div>
            <CiCircleRemove
              size={35}
              color='red'
              onClick={removeWithdrawConfirm}
              className='cursor-pointer hover:fill-yellow-500'
            />
          </div>
        </form>
      </div>
      <Modal 
        opened={opened} 
        onClose={close}
        size={'xl'}
      >
        <div>
          {Object.keys(questions)?.map((key, i) => {

            return (
              <TextInput 
                readOnly 
                label={questions?.[key]} 
                value={bid?.[key]} 
              />
            )
          })}
          <TextInput
            readOnly
            label="Какая у вас Область?"
            value={bid?.[2]}
          />
          <TextInput
            readOnly
            label="Какая у вас болезнь?"
            value={bid?.[3]}
          />
          <TextInput readOnly label="Ваш телефон?" value={bid?.[4]} />
        </div>
        <div className="mt-10">
          <h2>Курорты</h2>
          {resorts?.regions?.length !== 0 && (
            <div className="mt-5">
              <h2>По областям:</h2>
              {resorts?.regions?.map((resort) => {
                return <BomjPlaza resort={resort} key={resort?.id} />
              })}
            </div>
          )}
          {resorts?.diseases?.length !== 0 && (
            <div className="mt-5">
              <h2>По болезням:</h2>
              {resorts?.diseases?.map((resort) => {
                return <BomjPlaza resort={resort} key={resort?.id} />
              })}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
