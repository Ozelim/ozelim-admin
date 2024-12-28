import React from 'react'
import { Button, Modal, Pagination, Table, Tabs, TextInput, clsx } from '@mantine/core'
import { createBonusRecord, pb } from 'shared/api'
import { formatNumber, getImageUrl } from 'shared/lib'

import { BsCheckCircle } from 'react-icons/bs'
import { CiCircleRemove } from 'react-icons/ci'
import { openConfirmModal } from '@mantine/modals'



import dayjs from 'dayjs'

import * as XLSX from 'xlsx';
import { useSearchParams } from 'react-router-dom'

async function getWithdraws () {
  return await pb.collection('withdraws').getFullList({
    filter: `status = 'created'`,
    sort: '-created',
    expand: 'user, agent, dog',
  })
}

async function getWithdrawsEnded (page = 1) {
  return await pb.collection('withdraws').getList(page, 20, {
    filter: `status != 'created'`,
    sort: '-created',
    expand: 'user, agent, dog',
  })
}

async function getDogs () {
  return await pb.collection('dogs').getFullList()
}

export const Withdraws = () => {

  const [withdraws, setWithdraws] = React.useState([])
  const [endedWithdraws, setEndedWithdraws] = React.useState({})

  const [dogs, setDogs] = React.useState([])
  const [dog, setDog] = React.useState({
    name: '',
    iin: '',
    iban: '',
  })

  const [params, setParams] = useSearchParams() 

  React.useEffect(() => {
    getDogs()
    .then(res => {
      setDogs(res)
      pb.collection('dogs').subscribe('*', () => {
        pb.collection('dogs').getFullList()
        .then(res => {
          setDogs(res)
        })
      })
    })
  }, [])

  async function handleWithdraws (page) {
    getWithdrawsEnded(page)
    .then(res => {
      console.log(res, 'res');
      setEndedWithdraws(res)
    })
  }

  async function confirmWithdraw (withdraw) {
    await pb.collection('withdraws').update(withdraw?.id, {
      status: 'paid',
    })
    .then(async res => {
      await createBonusRecord('withdraws', {
        ...(withdraw?.agent 
        ? {to: withdraw?.agent, who: withdraw?.agent} 
        : {to: withdraw?.user, who: withdraw?.user}),
        sum: withdraw?.sum
      })
    })
  }

  async function deleteWithdraw (withdraw) {
    await pb.collection('withdraws').update(withdraw?.id, {
      status: 'rejected'
    })
    .then(async () => {
      const withdrawsUser = await pb.collection(withdraw?.agent ? 'agents' : 'users').getOne(withdraw?.agent ? withdraw?.agent : withdraw?.user)
      console.log(withdrawsUser);
      await pb.collection(withdraw?.agent ? 'agents' : 'users').update(withdraw?.agent ? withdraw?.agent : withdraw?.user, {
        balance: withdrawsUser?.balance + Number(withdraw?.sum)
      })
    })
  }

  const confirmWithdrawConfirm = (withdraw) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    labels: { confirm: 'Подтвердить', cancel: 'Отмена'},
    children: (
      <>
        Вы действительно хотите отправить данную сумму?
      </>
    ),
    onConfirm: () => confirmWithdraw(withdraw)
  })
  
  const removeWithdrawConfirm = (withdraw) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    labels: { confirm: 'Подтвердить', cancel: 'Отмена'},
    children: (
      <>Вы действительно хотите отклонить данную отправку?</>
    ),
    onConfirm: () => deleteWithdraw(withdraw)
  })

  React.useEffect(() => {
    getWithdraws()
    .then(res => {
      setWithdraws(res)
    })

    getWithdrawsEnded()
    .then(res => {
      console.log(res, 'res');
      setEndedWithdraws(res)
    })

    pb.collection('withdraws').subscribe('*', function ({_, record}) {
      getWithdrawsEnded(endedWithdraws?.page)
      .then(res => {
        setEndedWithdraws(res)
      })
      getWithdraws()
      .then(res => {
        setWithdraws(res)
      })
    })

    return () => {
      pb.collection('withdraws').unsubscribe('*')
    }
  }, [])

  function exportToExcel () {
    const array = withdraws?.map((withdraw) => {
      return {
        создано: dayjs(withdraw?.created).format('YY/MM/DD, HH:mm'),
        пользователь: withdraw?.user,
        фио: `${withdraw?.expand?.user?.name} ${withdraw?.expand?.user?.surname}`,
        банк: withdraw?.bank, 
        сумма: withdraw?.sum,
        владелец_карты: withdraw?.owner,
        иин: withdraw?.iin,
        IBAN: withdraw?.iban,
        статус: (
          (withdraw?.status === 'created' && 'Создан') ||
          (withdraw?.status === 'paid' && 'Оплачен') ||
          (withdraw?.status === 'rejected' && 'Отклонен')
        ),
      }
    })
    const worksheet = XLSX.utils.json_to_sheet(array);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    saveAsExcelFile(excelBuffer, 'table_data.xlsx');
  };

  function exportToExcelDog () {
    const array = withdraws?.filter(q => q?.dog == params.get('value'))?.map((withdraw) => {
      return {
        создано: dayjs(withdraw?.created).format('YY/MM/DD, HH:mm'),
        пользователь: withdraw?.agent,
        телефон: withdraw?.phone,
        фио: withdraw?.fio,
        сумма: withdraw?.sum,
        город_пользователя: withdraw?.city,
        владелец_карты: withdraw?.expand?.dog?.fio,
        иин: withdraw?.expand?.dog?.iin,
        IBAN: withdraw?.expand?.dog?.iban,
        статус: (
          (withdraw?.status === 'created' && 'Создан') ||
          (withdraw?.status === 'paid' && 'Оплачен') ||
          (withdraw?.status === 'rejected' && 'Отклонен')
        ),
      }
    })
    
    const worksheet = XLSX.utils.json_to_sheet(array);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    saveAsExcelFile(excelBuffer, 'table_data.xlsx');
  };

  function saveAsExcelFile (buffer, fileName) {
    const data = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const banks = [
    "Народный банк Казахстана",
    "Kaspi Bank",
    "Банк ЦентрКредит",
    "Forte Bank",
    "Евразийский банк",
    "First Heartland Jusan Bank",
    "Bank RBK",
    "Bereke Bank",
    "Банк Фридом Финанс Казахстан",
    "Ситибанк Казахстан",
    "Home Credit Bank Kazakhstan",
    "Нурбанк"
  ]

  function customSort(a, b) {

    const indexA = banks.indexOf(a?.bank);
    const indexB = banks.indexOf(b?.bank);
  
    // If both elements are in the sortOrder array, compare their positions
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
  
    // If only one element is in the sortOrder array, prioritize it
    if (indexA !== -1) {
      return -1;
    }
    if (indexB !== -1) {
      return 1;
    }
  
    // If neither element is in the sortOrder array, maintain their original order
    return 0;
  }

  const sorted = withdraws?.sort(customSort)

  const [confirmModal, setConfirmModal] = React.useState(false)

  const [userData, setUserData] = React.useState({
    modal: false,
    data: null
  })

  const [search, setSearch] = React.useState("");

  async function searchByValue() {
    if (!search) {
      return;
    }
    const foundUsers = await pb.collection("withdraws").getFullList({
      filter: `
        user.id = '${search}' ||
        user.name ?~ '${search}'
      `,
    });

    if (foundUsers.length !== 0) {
      setEndedWithdraws({
        items: [...foundUsers]
      })
      // showNotification({
      //   title: 'Поиск',
      //   message: 'Не найдено',
      //   color: 'teal'
      // })
    }
  }

  return (
    <>

    </>
  )
}