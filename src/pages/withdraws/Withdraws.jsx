import React from 'react'
import { Button, Modal, Pagination, Table, Tabs, TextInput, clsx } from '@mantine/core'
import { createBonusRecord, pb } from 'shared/api'
import { formatNumber, getImageUrl } from 'shared/lib'

import { BsCheckCircle } from 'react-icons/bs'
import { CiCircleRemove } from 'react-icons/ci'
import { openConfirmModal } from '@mantine/modals'

import dayjs from 'dayjs'

import { utils, write } from 'xlsx';
import { useSearchParams } from 'react-router-dom'

const now = new Date();

// Calculate the first and last days of the previous month
const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

// Calculate the "nowadays" period (e.g., last 7 days)
const startOfNowadays = new Date(now);
startOfNowadays.setDate(now.getDate() - 7); // Adjust the range as needed

// Convert the dates to ISO strings
const startOfLastMonth = firstDayOfLastMonth.toISOString();

async function getWithdraws () {
  return await pb.collection('withdraws').getFullList({
    filter: `status = 'created'`,
    sort: '-created',
    expand: 'user, agent, dog',
  })
}

async function getWithdrawsEnded (page = 1) {
  return await pb.collection('withdraws').getList(page, 20, {
    filter: `status != 'created' && created >= '${startOfLastMonth}'`,
    sort: '-created',
    expand: 'user, agent, dog',
  })
}

async function getDogs () {
  return await pb.collection('dogs').getFullList()
}

export const Withdraws = () => {

  const [params, setParams] = useSearchParams() 

  const [withdraws, setWithdraws] = React.useState([])
  const [endedWithdraws, setEndedWithdraws] = React.useState({})

  const [dogs, setDogs] = React.useState([])
  const [dog, setDog] = React.useState({
    name: '',
    iin: '',
    iban: '',
  })

  const [confirmModal, setConfirmModal] = React.useState(false)

  const [userData, setUserData] = React.useState({
    modal: false,
    data: null
  })

  const [search, setSearch] = React.useState("");

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
    const worksheet = utils.json_to_sheet(array);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });

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
    
    const worksheet = utils.json_to_sheet(array);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });

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

  // const sorted = withdraws?.sort(customSort)
  
  async function searchByValue() {
    if (!search) {
      return;
    }
    const foundUsers = await pb.collection("withdraws").getFullList({
      filter: `
        (user.id = '${search}' ||
        user.name ?~ '${search}') && (
          status = 'ended'
        )
      `,
    });

    if (foundUsers.length !== 0) {
      setEndedWithdraws({
        items: [...foundUsers]
      })
      showNotification({
        title: 'Поиск',
        message: `Найдено ${foundUsers.length} выводов`,
        color: 'teal'
      })
    }
  }

  console.log(withdraws, 'withdraws');

  return (
    <>
      <div className='w-full bg-white'>
        <Tabs>
          <Tabs.List>
            <Tabs.Tab value='withdraws'>Созданные</Tabs.Tab>
            <Tabs.Tab value='ended'>Завершенные</Tabs.Tab>
            <Tabs.Tab value='directors'>Региональные директоры</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value='directors'>
            <div className='grid grid-cols-[15%_auto] min-h-screen'>
              <div className='bg-white border-r shadow-sm'>
                <div 
                  className={clsx('p-4 text-sm', {
                    'bg-teal-600 text-white': params.get('value') == 0,
                  })}
                  onClick={() => {
                    params.set('value', 0)
                    setParams(params)
                  }}
                >
                  <span className="cursor-pointer">
                    Добавить директора
                  </span>
                </div>
                {dogs?.map((q, i) => {
                  return (
                    <div 
                      key={i} 
                      className={clsx('p-4 text-sm', {
                        'bg-teal-600 text-white': params.get('value') == q?.id,
                      })}
                      onClick={() => {
                        params.set('value', q?.id)
                        setParams(params)
                      }}
                    >
                      <span className="cursor-pointer">
                        {q?.name}
                      </span>
                    </div>
                  )
                })}
              </div>

              {params.get('value') == 0 && (
                <div className='p-4'>
                  {params.get('value') == 0 && (
                    <div className='max-w-xs'>
                      <p>Региональный директор</p>
                      <TextInput
                        label='ФИО'
                        value={dog?.name}
                        onChange={e => setDog({...dog, name: e.currentTarget.value})}
                      />
                      <TextInput
                        label='ИИН'
                        value={dog?.iin}
                        onChange={e => setDog({...dog, iin: e.currentTarget.value})}
                      />
                      <TextInput
                        label='Номер счета карты (IBAN)'
                        value={dog?.iban}
                        onChange={e => setDog({...dog, iban: e.currentTarget.value})}
                      />
                      <Button
                        onClick={async () => {
                          await pb.collection('dogs').create({
                            ...dog
                          })
                          .then(async () => {
                            getDogs()
                            .then(res => {
                              setDogs(res)
                            })
                          })
                        }}
                        className='mt-2'
                      >
                        Добавить
                      </Button>
                    </div>
                  )}
                </div>
              )}
              {params.get('value') != 0 && (
                <Tabs defaultValue='created'>
                  <Tabs.List>
                    <Tabs.Tab value='created'>Созданные</Tabs.Tab>
                    <Tabs.Tab value='ended'>Завершенные</Tabs.Tab>
                  </Tabs.List>
                  <Tabs.Panel value='created'>
                    <Button onClick={exportToExcelDog}>Скачать Excel</Button>
                    <Table
                      striped
                      className='mt-4'
                    >
                      <thead>
                        <tr>
                          <th>Дата</th>
                          <th>ID Пользователя</th>
                          <th>Номер телефона</th>
                          <th>ФИО</th>
                          <th>Сумма</th>
                          <th>Город</th>
                          <th>Статус</th>
                          <th>Действие</th>
                        </tr>
                      </thead>
                      <tbody>
                        {withdraws?.filter(q => q?.dog == params.get('value'))?.map((withdraw, i) => {
                          return (
                            <tr 
                              key={i}
                            >
                              <td className='!text-lg'>{dayjs(withdraw?.created).format('YY-MM-DD, HH:mm')}</td>
                              <td 
                                className='!text-lg'
                                onClick={() => setUserData({modal: true, data: withdraw?.agent ? withdraw?.expand?.agent : withdraw?.expand?.user})}
                              >
                                <Button compact variant='outline'>
                                  {withdraw?.user ? withdraw?.user : withdraw?.agent}
                                </Button>
                              </td>
                              <td className='!text-lg whitespace-nowrap'>{withdraw?.phone}</td>
                              <td className='!text-lg whitespace-nowrap'>{withdraw?.fio}</td>
                              <td className='!text-lg whitespace-nowrap'>{formatNumber(withdraw?.sum)}</td>
                              <td className='!text-lg whitespace-nowrap'>{withdraw?.city}</td>
                              <td className='!text-lg whitespace-nowrap'>
                                {withdraw?.status === 'created' && 'Создан'}
                                {withdraw?.status === 'paid' && <span className='text-green-500'>Оплачен</span>}
                                {withdraw?.status === 'rejected' && <span className='text-red-500'>Отклонен</span>}
                              </td>
                              <td className='flex gap-2 items-center'>
                                {withdraw?.status === 'created' && (
                                  <>
                                    <BsCheckCircle 
                                      size={30} 
                                      color='green'
                                      onClick={() => confirmWithdrawConfirm(withdraw)}
                                      className='cursor-pointer hover:fill-yellow-500'
                                    />
                                    <CiCircleRemove 
                                      size={35}
                                      color='red'
                                      onClick={() => removeWithdrawConfirm(withdraw)}
                                      className='cursor-pointer hover:fill-yellow-500'
                                    />
                                  </>
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </Tabs.Panel>
                  <Tabs.Panel value='ended'>
                    <Table
                      striped
                      className='mt-4'
                    >
                      <thead>
                        <tr>
                          <th>Дата</th>
                          <th>ID Пользователя</th>
                          <th>Сумма</th>
                          <th>Владелец карты</th>
                          <th>ИИН</th>
                          <th>IBAN</th>
                          <th>Статус</th>
                        </tr>
                      </thead>
                      <tbody>
                        {endedWithdraws?.items?.filter(q => q?.dog == params.get('value'))?.map((withdraw, i) => {
                          return (
                            <tr 
                              key={i}
                            >
                              <td className='!text-lg'>{dayjs(withdraw?.created).format('YY-MM-DD, HH:mm')}</td>
                              <td 
                                className='!text-lg'
                                onClick={() => setUserData({modal: true, data: withdraw?.agent ? withdraw?.expand?.agent : withdraw?.expand?.user})}
                              >
                                <Button compact variant='outline'>
                                  {withdraw?.user ? withdraw?.user : withdraw?.agent}
                                </Button>
                              </td>
                              <td className='!text-lg whitespace-nowrap'>{formatNumber(withdraw?.sum)}</td>
                              <td className='!text-lg whitespace-nowrap'>{withdraw?.expand?.dog?.name}</td>
                              <td className='!text-lg whitespace-nowrap'>{withdraw?.expand?.dog?.iin}</td>
                              <td className='!text-lg whitespace-nowrap'>{withdraw?.expand?.dog?.iban}</td>
                              <td className='!text-lg whitespace-nowrap'>
                                {withdraw?.status === 'created' && 'Создан'}
                                {withdraw?.status === 'paid' && <span className='text-green-500'>Оплачен</span>}
                                {withdraw?.status === 'rejected' && <span className='text-red-500'>Отклонен</span>}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </Tabs.Panel>
                </Tabs>
              )}

            </div>
          </Tabs.Panel>
          <Tabs.Panel value='withdraws'>
            <Button onClick={exportToExcel}>Скачать Excel</Button>
            <Table
              className='mt-4'
            >
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>ID Пользователя</th>
                  <th>ФИО</th>
                  <th>Ур.</th>
                  <th>Банк</th>
                  <th>Сумма</th>
                  <th>Владелец карты</th>
                  <th>ИИН</th>
                  <th>IBAN</th>
                  <th>Статус</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {withdraws?.map((withdraw, i) => {
                  return (
                    <tr 
                      key={withdraw?.id}
                    >
                      <td className='!text-lg whitespace-nowrap'>{dayjs(withdraw?.created).format('YY-MM-DD, HH:mm')}</td>
                      <td 
                        className='!text-lg'
                        onClick={() => setUserData({modal: true, data: withdraw?.agent ? withdraw?.expand?.agent : withdraw?.expand?.user})}
                      >
                        <Button compact variant='outline'>
                          {withdraw?.user ? withdraw?.user : withdraw?.agent}
                        </Button>
                      </td>
                      <td className='!text-lg whitespace-nowrap'>
                        {withdraw?.agent ? withdraw?.expand?.agent?.fio : `${withdraw?.expand?.user?.name} ${withdraw?.expand?.user?.surname}`}
                      </td>
                      <td className='!text-lg whitespace-nowrap'>
                        <span className='text-lg mr-2'>
                          {withdraw.expand.user?.level}
                        </span>
                      </td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.bank}</td>
                      <td className='!text-lg whitespace-nowrap'>{formatNumber(withdraw?.sum)}</td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.owner}</td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.iin}</td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.iban}</td>
                      <td className='!text-lg whitespace-nowrap'>
                      {withdraw?.status === 'created' && <span>Создан</span>}
                      {withdraw?.status === 'paid' && <span className='text-green-500'>Оплачен</span>}
                      {withdraw?.status === 'rejected' && <span className='text-red-500'>Отклонен</span>}
                      </td>
                      <td className='flex gap-2 items-center'>
                        {withdraw?.status === 'created' && (
                          <>
                            <BsCheckCircle 
                              size={30} 
                              color='green'
                              onClick={() => confirmWithdrawConfirm(withdraw)}
                              className='cursor-pointer hover:fill-yellow-500'
                            />
                            <CiCircleRemove 
                              size={35}
                              color='red'
                              onClick={() => removeWithdrawConfirm(withdraw)}
                              className='cursor-pointer hover:fill-yellow-500'
                            />
                          </>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Tabs.Panel> 
          <Tabs.Panel value='ended'>
            <div className="flex items-end">
              <TextInput
                label="Поиск"
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                className='w-96'
              />
              <Button
                onClick={() => searchByValue()}
              >
                Поиск
              </Button>
            </div>
            <Table
              striped
              className='mt-4'
            >
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>ID Пользователя</th>
                  <th>ФИО</th>
                  <th>Банк</th>
                  <th>Сумма</th>
                  <th>Владелец карты</th>
                  <th>ИИН</th>
                  <th>IBAN</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {endedWithdraws?.items?.filter(q => !q?.dog)?.map((withdraw, i) => {
                  return (
                    <tr 
                      key={i}
                    >
                      <td className='!text-lg whitespace-nowrap'>{dayjs(withdraw?.created).format('YY-MM-DD, HH:mm')}</td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.user}</td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.expand?.user?.name} {withdraw?.expand?.user?.surname}</td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.bank}</td>
                      <td className='!text-lg whitespace-nowrap'>{formatNumber(withdraw?.sum)}</td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.owner}</td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.iin}</td>
                      <td className='!text-lg whitespace-nowrap'>{withdraw?.iban}</td>
                      <td className='!text-lg whitespace-nowrap'>
                      {withdraw?.status === 'created' &&  <span>Создан</span>}
                      {withdraw?.status === 'paid' && <span className='text-green-500'>Оплачен</span>}
                      {withdraw?.status === 'rejected' && <span className='text-red-500'>Отклонен</span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          <div className='flex justify-center'>
            <Pagination
              value={endedWithdraws?.page}
              total={endedWithdraws?.totalPages}
              onChange={e => handleWithdraws(e)}
            />
          </div>
          </Tabs.Panel>
        </Tabs>
      </div>

      <Modal 
        opened={confirmModal}
        onClose={() => setConfirmModal(false)}
        centered
        title='Подтвердите действие'
      >
        Вы действительно хотите отправить данную сумму?
        <div className='flex justify-end gap-4'>
          <Button>
            Подтвердить
          </Button>
          <Button>
            Отмена
          </Button>
        </div>
      </Modal>
      <Modal
        opened={userData.modal}
        onClose={() => setUserData({data: null, modal: false})}
        centered
      >
        <img 
          src={getImageUrl(userData?.data, userData.data?.avatar)} 
          alt="" 
          className='w-[150px] h-[150px] object-cover rounded-full mx-auto mb-5'
        />
        <ul className='space-y-2'>
          <li className='grid grid-cols-2'>
            <p>ID:</p>
            <p>{userData?.data?.id}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>ФИО:</p>
            <p>{userData?.data?.fio}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Имя:</p>
            <p>{userData?.data?.name}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Фамилия:</p>
            <p>{userData?.data?.surname}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Телефон:</p>
            <p>{userData?.data?.phone}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Область:</p>
            <p>{userData?.data?.region}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Партнеры:</p>
            <p>{userData?.data?.referals?.length}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Баланс:</p>
            <p>{userData?.data?.balance}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Бонусы:</p>
            <p>{userData?.data?.bonuses}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Бинар:</p>
            <p>{userData?.data?.bin ? 'Да' : 'Нет'}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Уровень:</p>
            <p>{userData?.data?.level}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Дата рег:</p>
            <p>{dayjs(userData?.data?.created).format('DD.MM.YY')}</p>
          </li>
        </ul>
      </Modal>
    </>
  )
}