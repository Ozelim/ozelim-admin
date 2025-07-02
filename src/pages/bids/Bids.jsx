import React from 'react'
import {
  Button,
  Modal,
  Table,
  Tabs,
  Loader,
  Overlay,
  TextInput,
  Textarea,
  clsx,
} from '@mantine/core'
import dayjs from 'dayjs'
import { pb } from 'shared/api'
import { BidsForm } from './BidsForm'
import { CiCircleRemove } from 'react-icons/ci'
import { openConfirmModal } from '@mantine/modals'

import { BiAccessibility, BiBadgeCheck } from 'react-icons/bi'
import { useAuth } from 'shared/hooks'
import { BsCheckCircle } from 'react-icons/bs'
import { useSearchParams } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { getImageUrl } from 'shared/lib'

async function getCompanyBids () {
  return await pb.collection('company_bids').getFullList({
    sort: '-created',
    expand: 'company'
  })
}


async function getAgentsBids() {
  return await pb
    .collection('agents_bids')
    .getFullList({ expand: 'agent', sort: '-created' })
}

async function getAnswers() {
  return await pb.collection('questions').getFullList({
    filter: `question = false`,
    sort: '-created',
  })
}

async function get123() {
  return await pb.collection('123').getFullList({
    sort: '-created'
  })
}

async function getQuestions() {
  return await pb.collection('questions').getFirstListItem(`question = true`)
}

async function getBids() {
  return await pb.collection('bids').getFullList({
    sort: '-created',
  })
}

async function getDualBids() {
  return await pb.collection('dual_bids').getFullList({
    sort: '-created'
  })
}

async function getInsuranceBids() {
  return await pb.collection('insurance_bids').getFullList({
    sort: '-created'
  })
}

async function getVacaBids() {
  return await pb.collection('vaca_bids').getFullList({
    sort: '-created'
  })
}

async function getHealthBids() {
  return await pb.collection('health_bids').getFullList({
    sort: '-created'
  })
}

async function getToursBids() {
  return await pb.collection('tours_bids').getFullList({
    sort: '-created'
  })
}

async function getToursBids2() {
  return await pb.collection('tours_bids2').getFullList({
    sort: '-created'
  })
}

async function getFundBids() {
  return await pb.collection('fund_bids').getFullList({
    sort: '-created'
  })
}

async function getTouristBids() {
  return await pb.collection('tourist_bids').getFullList({
    sort: '-created'
  })
}

async function getRightsbids() {
  return await pb.collection('rights_bids').getFullList({
    sort: '-created'
  })
}

export const Bids = () => {
  const { user } = useAuth()

  const [globalLoading, setGlobalLoading] = React.useState(false);

  // const [legitUpdateInProgress, setLegitUpdateInProgress] = React.useState(false);

  const [modal, modalHandler] = useDisclosure()

  const [comment, setComment] = React.useState('')

  const [Abids, setABids] = React.useState([])

  const paidBids = Abids?.filter((q) => q?.status === 'paid')
  const confirmedBids = Abids?.filter((q) => q?.status === 'confirmed')
  const rejectedBids = Abids?.filter((q) => q?.status === 'rejected')

  const [loadiong, loading_h] = useDisclosure(false)

  const [bid, setBid] = React.useState({})

  const [answers, setAnswers] = React.useState([])
  const [bids, setBids] = React.useState([])

  const [questions, setQuestions] = React.useState([])

  const [params, setParams] = useSearchParams()

  const [c, setC] = React.useState([])
  const [cs, setCs] = React.useState([])
  const [cp, setCp] = React.useState([])

  const [q, setQ] = React.useState([])
  const [qs, setQs] = React.useState([])
  const [qr, setQr] = React.useState([])

  const [tours, setTours] = React.useState([])
  const [toursS, setToursS] = React.useState([])
  const [toursR, setToursR] = React.useState([])

  const [d, setD] = React.useState([])
  const [ds, setDs] = React.useState([])
  const [dr, setDr] = React.useState([])

  const [s, setS] = React.useState([])
  const [ss, setSs] = React.useState([])
  const [sr, setSr] = React.useState([])

  const [x, setX] = React.useState([])
  const [xs, setXs] = React.useState([])
  const [xr, setXr] = React.useState([])

  const [h, setH] = React.useState([])
  const [hs, setHs] = React.useState([])
  const [hr, setHr] = React.useState([])

  const [t, setT] = React.useState([])
  const [ts, setTs] = React.useState([])
  const [tr, setTr] = React.useState([])

  const [f, setF] = React.useState([])
  const [fs, setFs] = React.useState([])
  const [fr, setFr] = React.useState([])

  const [b, setB] = React.useState([])
  const [bs, setBs] = React.useState([])
  const [br, setBr] = React.useState([])

  const [r, setR] = React.useState([])
  const [rs, setRs] = React.useState([])

  React.useEffect(() => {

    getCompanyBids().then((res) => {
      setC(res?.filter((w) => w?.status === 'created'))
      setCs(res?.filter((w) => w?.status === 'succ'))
      setCp(res?.filter((w) => w?.status === 'payed'))
    })

    getRightsbids().then((res) => {
      setR(res?.filter((w) => w?.status === ''))
      setRs(res?.filter((w) => w?.status === 'succ'))
    })

    getToursBids().then((res) => {
      setTours(res?.filter((w) => w?.status === ''))
      setToursS(res?.filter((w) => w?.status === 'succ'))
      setToursR(res?.filter((w) => w?.status === 'ref'))
    })

    get123().then((res) => {
      setQ(res?.filter((w) => w?.status === ''))
      setQs(res?.filter((w) => w?.status === 'succ'))
      setQr(res?.filter((w) => w?.status === 'ref'))
    })

    getTouristBids().then((res) => {
      setB(res?.filter((w) => w?.status === ''))
      setBs(res?.filter((w) => w?.status === 'succ'))
      setBr(res?.filter((w) => w?.status === 'ref'))
    })

    getInsuranceBids().then((res) => {
      setS(res?.filter((w) => w?.status === ''))
      setSs(res?.filter((w) => w?.status === 'succ'))
      setSr(res?.filter((w) => w?.status === 'ref'))
    })

    getHealthBids().then((res) => {
      setH(res?.filter((w) => w?.status === ''))
      setHs(res?.filter((w) => w?.status === 'succ'))
      setHr(res?.filter((w) => w?.status === 'ref'))
    })

    getVacaBids().then((res) => {
      setX(res?.filter((w) => w?.status === ''))
      setXs(res?.filter((w) => w?.status === 'succ'))
      setXr(res?.filter((w) => w?.status === 'ref'))
    })

    getDualBids().then((res) => {
      setD(res?.filter((w) => w?.status === ''))
      setDs(res?.filter((w) => w?.status === 'succ'))
      setDr(res?.filter((w) => w?.status === 'ref'))
    })

    getAnswers().then((res) => {
      setAnswers(res)
    })

    getQuestions().then((res) => {
      setQuestions(res)
    })

    getToursBids2().then((res) => {
      setT(res?.filter((w) => w?.status === ''))
      setTs(res?.filter((w) => w?.status === 'succ'))
      setTr(res?.filter((w) => w?.status === 'ref'))
    })

    getBids().then((res) => {
      setBids(res)
    })

    getFundBids().then((res) => {
      setF(res?.filter((w) => w?.status === ''))
      setFs(res?.filter((w) => w?.status === 'succ'))
      setFr(res?.filter((w) => w?.status === 'ref'))
    })

    getAgentsBids().then((res) => {
      console.log(res, 'res')
      setABids(res)
    })

    pb.collection('bids').subscribe('*', function () {
      getBids().then((res) => {
        setBids(res)
      })
    })

    pb.collection('questions').subscribe('*', function () {
      getAnswers().then((res) => {
        setAnswers(res)
      })
    })
  }, [])

  const activeAnswers = answers?.filter((bid) => bid?.status === 'created')
  const endedAndwers = answers?.filter((bid) => bid?.status !== 'created')

  const priceBids = bids?.filter(
    (bid) => bid?.type === 'price' && bid?.status === 'created'
  )
  const resortsBids = bids?.filter(
    (bid) => bid?.type === 'resort' && bid?.status === 'created'
  )

  const priceBids1 = bids?.filter(
    (bid) => bid?.type === 'price' && bid?.status !== 'created'
  )
  const resortsBids1 = bids?.filter(
    (bid) => bid?.type === 'resort' && bid?.status !== 'created'
  )

  async function deleteWithdraw(id, bid) {
    await pb.collection(bid ? 'questions' : 'bids').update(id, {
      status: 'succ',
      admin: user?.email,
    })
  }

  async function deleteWithdraw1(id, bid) {
    await pb.collection(bid ? 'questions' : 'bids').update(id, {
      status: 'fall',
      admin: user?.email,
    })
  }

  const removeWithdrawConfirm = (id, bid) =>
    openConfirmModal({
      title: 'Подтвердите действие',
      centered: true,
      labels: { confirm: 'Успешно', cancel: 'Отклонено' },
      children: <></>,
      onConfirm: () => deleteWithdraw(id, bid),
      onCancel: () => deleteWithdraw1(id, bid),
    })

  const array = [
    { label: 'Заявки на пакеты', value: 'company-bids' },
    { label: 'Агенты по туризму', value: 'agents-bids' },
    { label: 'Опросник', value: 'question' },
    { label: 'Прайс-лист', value: 'price' },
    { label: 'Курорты', value: 'resort' },
    { label: 'Организации', value: 'home-bids' },
    { label: 'Дуальное об.', value: 'dual-bids' },
    { label: 'Страхование', value: 'insurance-bids' },
    { label: 'Вакансии', value: 'job-bids' },
    { label: 'Мир здоровья', value: 'health-bids' },
    { label: 'Туры', value: 'tours-bids' },
    { label: 'Туры с Ozelim', value: 'tours-ozelim' },
    { label: 'Фонд', value: 'fund-bids' },
    { label: 'Правовая защита', value: 'rights-bids' },
    // { label: 'Пользователь', value: 'user-bids' },
  ]




  async function makeAgent(id) {

  try {

    const collections = await pb.send('/api/collections', { method: 'GET' });
      const agents = collections?.items?.find(col => col.name === 'agents');
      console.log('Схема коллекции AGENTS:', agents?.schema);

      const verified = agents?.schema?.fields?.find(f => f.name === 'verified');
      console.log('Поле VERIFIED:', verified);
        const bidIsMax = bid?.max === true;
        const agent = await pb.collection('agents').getOne(bid?.agent);
        console.log('AGENT RECORD:', agent);

    if (bid?.max) {
      console.log('Bid is MAX', id);

      await pb.collection('agents').update(bid?.agent, {
        agent: true,
        agent_date: new Date(),
        legit: true,
        verified: true,
        // если verified_date === "" → ставим null, иначе new Date()
        verified_date: agent.verified_date === "" ? null : new Date(),
      });
    } else {
      console.log('Bid not Max', id);
      await pb.collection('agents').update(bid?.agent, {
        agent: true,
        agent_date: new Date(),
      });
    }

    const rewards = bidIsMax
      ? [6000, 4100, 1900]
      : [3000, 2000, 1000];

    let currentSponsorId = agent?.sponsor;

    for (let i = 0; i < 3; i++) {
      if (!currentSponsorId) break;

      const sponsor = await pb.collection('agents').getOne(currentSponsorId);

      // Обновляем баланс
      await pb.collection('agents').update(sponsor.id, {
        'balance+': rewards[i]
      });

      // Получаем или создаём бонусную запись
      let bonusRecord;
      try {
        bonusRecord = await pb.collection('user_bonuses').getOne(sponsor.id);
      } catch {
        bonusRecord = await pb.collection('user_bonuses').create({
          id: sponsor.id,
          referals: []
        });
      }

      const newReferral = {
        id: crypto.randomUUID(),
        created: new Date(),
        referal: id,
        sum: rewards[i],
        type: 'agent'
      };

      await pb.collection('user_bonuses').update(bonusRecord.id, {
        referals: [...(bonusRecord.referals || []), newReferral]
      });

      // Переходим к следующему спонсору
      currentSponsorId = sponsor.sponsor;
      console.log('Начисленный баланс', rewards[i]);
    }

    modalHandler.close();
    showNotification({
      title: 'Заявка',
      message: 'Пользователь теперь агент!',
      color: 'green',
    });

    // window.location.reload();
  } catch (error) {
    console.error('Ошибка makeAgent:', error);
    modalHandler.close();
    showNotification({
      title: 'Ошибка',
      message: 'Что-то пошло не так при выполнений функций',
      color: 'red',
    });
    throw error;
  }
}


  async function confirmPack (id) {
    openConfirmModal({
      title: 'Подтвердите действие',
      centered: true,
      labels: { confirm: 'Одобрить', cancel: 'Назад' },
      children: <></>,
      onConfirm: async () => {
        await pb.collection('company_bids').update(id, {
          status: 'succ',
        })
        .then(() => {
          getCompanyBids().then((res) => {
            setC(res?.filter((w) => w?.status === 'created'))
            setCs(res?.filter((w) => w?.status === 'succ'))
          })
          showNotification({
            title: 'Заявка',
            message: 'Заявка одобрена!',
            color: 'green',
          })
        })
      },
    })  
  }

  async function rejectPack (id) {
    openConfirmModal({  
      title: 'Подтвердите действие',
      centered: true,
      labels: { confirm: 'Отклонить', cancel: 'Назад' },
      children: <></>,
      onConfirm: async () => {
        await pb.collection('company_bids').delete(id)
        .then(() => {
          getCompanyBids().then((res) => {
        setC(res?.filter((w) => w?.status === 'created'))
        setCs(res?.filter((w) => w?.status === 'succ'))
      })
        showNotification({
            title: 'Заявка',
            message: 'Заявка отклонена!',
            color: 'red',
          })
        })
      },
    })
  }

  return (
    <>
    {globalLoading && (
      <>
        <Overlay blur={4} opacity={0.65} color="#000" zIndex={9999} />
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10000,
          }}
        >
          <Loader color="yellow" size="xl" variant="bars" />
        </div>
      </>
    )}
      <div className="w-full grid grid-cols-[10%_91%] gap-4 -mx-4 -my-4">
        <div className="bg-white ">
          {array.map((q) => {
            return (
              <div
                key={q?.value}
                className={clsx('p-4 text-sm', {
                  'bg-teal-600 text-white': params.get('value') === q?.value,
                })}
                onClick={() => {
                  params.set('value', q?.value)
                  setParams(params)
                }}
              >
                <span className="cursor-pointer">{q?.label}</span>
              </div>
            )
          })}
        </div>

        {params.get('value') === 'company-bids' && (
          <Tabs
            defaultValue="bids"
            classNames={{
              panel: 'pt-4',
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="bids">Заявки</Tabs.Tab>
              <Tabs.Tab value="succ">Одобренные</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="bids">
              <Table>
                <thead>
                  <tr>
                  <th>Дата</th>
                  <th>Организация</th>
                  <th>БИН</th>
                  <th>Пакет</th>
                  <th>Доверенное лицо</th>
                  <th>Почта дов. лица</th>
                  <th>Номер дов. лица</th>
                  <th>Whatsapp дов. лица</th>
                  <th>Документы</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {c?.map((w) => {

                  const company = w?.expand?.company

                  return (
                    <tr key={w?.id}>
                      <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                      <td>{company?.name}</td>
                      <td>{company?.bin}</td>
                      <td>{w?.plus ? 'Корпоративный +' : 'Корпоративный'}</td>
                      <td>{w?.trusted?.name}</td>
                      <td>{w?.trusted?.email}</td>
                      <td>{w?.trusted?.phone}</td>
                      <td>{w?.trusted?.whatsapp}</td>
                      <td className='space-y-2'>
                        {w?.docs?.map((doc) => {
                          return (
                            <div key={Math.random()}>
                              <a href={getImageUrl(w, doc)} target="_blank" rel="noreferrer" className='text-blue-500 underline'>
                                {doc}
                              </a>
                            </div>
                          )
                        })}
                      </td>
                      <td className='space-x-2'>
                        <Button compact variant='outline' onClick={() => confirmPack(w?.id)} >Одобрить</Button>
                        <Button compact variant='outline' color='red' onClick={() => rejectPack(w?.id)}>Отклонить</Button>
                      </td>
                    </tr>
                  )
                })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="succ">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Организация</th>
                    <th>БИН</th>
                    <th>Пакет</th>
                    <th>Оплачено</th>
                    <th>Доверенное лицо</th>
                  </tr>
                </thead>
                <tbody>
                  {cs?.map((w) => {
                    const company = w?.expand?.company
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{company?.name}</td>
                        <td>{company?.bin}</td>
                        <td>{w?.plus ? 'Корпоративный +' : 'Корпоративный'}</td>
                        <td>{w?.status === 'payed' ? 'Оплачено' : 'Не оплачено'}</td>
                        <td>{w?.trusted?.name}</td>
                      </tr>
                    )
                  })} 
                </tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        )}

        {params.get('value') === 'tours-ozelim' && (
          <Tabs
            defaultValue="bids"
            classNames={{
              panel: 'pt-4',
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="bids">Заявки</Tabs.Tab>
              <Tabs.Tab value="succ">Одобренные</Tabs.Tab>
              <Tabs.Tab value="ref">Отклоненные</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="bids">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Категория</th>
                    <th>Дата</th>
                    <th>Взрослых</th>
                    <th>Детей</th>
                    <th>Телефон</th>
                    <th>Курорт</th>
                  </tr>
                </thead>
                <tbody>
                  {tours?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>
                          {w?.category === 'standart' && 'Стандарт'}
                          {w?.category === 'eco' && 'Эконом'}
                          {w?.category === 'vip' && 'Вип'}
                        </td>
                        <td>
                          с {dayjs(w?.date_picked?.[0]).format('YY-MM-DD')} по{' '}
                          {dayjs(w?.date_picked?.[1]).format('YY-MM-DD')}
                        </td>
                        <td>{w?.adults}</td>
                        <td>{w?.child}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.resort?.name}</td>
                        <td>
                          <BsCheckCircle
                            size={30}
                            color="green"
                            // onClick={() => handleConfirmBid(q)}
                            onClick={async () => {
                              openConfirmModal({
                                labels: {
                                  cancel: 'Назад',
                                  confirm: 'Одобрить',
                                },
                                centered: true,
                                onConfirm: async () => {
                                  await pb
                                    .collection('tours_bids2')
                                    .update(w?.id, {
                                      status: 'succ',
                                      comment: w?.comment,
                                    })
                                    .then(() => {
                                      getToursBids().then((res) => {
                                        setTours(
                                          res?.filter((w) => w?.status === '')
                                        )
                                        setToursS(
                                          res?.filter(
                                            (w) => w?.status === 'succ'
                                          )
                                        )
                                        setToursR(
                                          res?.filter(
                                            (w) => w?.status === 'ref'
                                          )
                                        )
                                      })
                                    })
                                },
                              })
                            }}
                            className="cursor-pointer hover:fill-yellow-500"
                          />
                          <CiCircleRemove
                            size={35}
                            color="red"
                            onClick={async () => {
                              openConfirmModal({
                                labels: {
                                  cancel: 'Назад',
                                  confirm: 'Отклонить',
                                },
                                centered: true,
                                onConfirm: async () => {
                                  await pb
                                    .collection('tours_bids2')
                                    .update(w?.id, {
                                      status: 'ref',
                                      comment: w?.comment,
                                    })
                                    .then(() => {
                                      getToursBids().then((res) => {
                                        setTours(
                                          res?.filter((w) => w?.status === '')
                                        )
                                        setToursS(
                                          res?.filter(
                                            (w) => w?.status === 'succ'
                                          )
                                        )
                                        setToursR(
                                          res?.filter(
                                            (w) => w?.status === 'ref'
                                          )
                                        )
                                      })
                                    })
                                },
                              })
                            }}
                            className="cursor-pointer hover:fill-yellow-500"
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="succ">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Категория</th>
                    <th>Дата</th>
                    <th>Взрослых</th>
                    <th>Детей</th>
                    <th>Телефон</th>
                    <th>Курорт</th>
                  </tr>
                </thead>
                <tbody>
                  {toursS?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>
                          {w?.category === 'standart' && 'Стандарт'}
                          {w?.category === 'eco' && 'Эконом'}
                          {w?.category === 'vip' && 'Вип'}
                        </td>
                        <td>
                          с {dayjs(w?.date_picked?.[0]).format('YY-MM-DD')} по{' '}
                          {dayjs(w?.date_picked?.[1]).format('YY-MM-DD')}
                        </td>
                        <td>{w?.adults}</td>
                        <td>{w?.child}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.resort?.name}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="ref">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Категория</th>
                    <th>Дата</th>
                    <th>Взрослых</th>
                    <th>Детей</th>
                    <th>Телефон</th>
                    <th>Курорт</th>
                  </tr>
                </thead>
                <tbody>
                  {toursR?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>
                          {w?.category === 'standart' && 'Стандарт'}
                          {w?.category === 'eco' && 'Эконом'}
                          {w?.category === 'vip' && 'Вип'}
                        </td>
                        <td>
                          с {dayjs(w?.date_picked?.[0]).format('YY-MM-DD')} по{' '}
                          {dayjs(w?.date_picked?.[1]).format('YY-MM-DD')}
                        </td>
                        <td>{w?.adults}</td>
                        <td>{w?.child}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.resort?.name}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        )}

        {params.get('value') === 'agents-bids' && (
          <Tabs
            defaultValue="bids"
            classNames={{
              panel: 'pt-4',
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="bids">Заявки</Tabs.Tab>
              <Tabs.Tab value="succ">Одобренные</Tabs.Tab>
              <Tabs.Tab value="ref">Отклоненные</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="bids">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>ФИО</th>
                    <th>ИИН</th>
                    <th>Номер телефона</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {paidBids?.map((q) => {
                    return (
                      <tr key={q?.id}>
                        <td>{dayjs(q.created).format(`DD.MM.YY, HH:mm`)}</td>

                        <td>{q?.fio}</td>
                        <td>{q?.iin}</td>
                        <td>{q?.phone}</td>
                        <td>
                          <Button
                            onClick={() => {
                              setBid(q)
                              modalHandler.open()
                            }}
                          >
                            Договор
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="succ">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>ФИО</th>
                    <th>ИИН</th>
                    <th>Номер телефона</th>
                    <th>Договор</th>
                  </tr>
                </thead>
                <tbody>
                  {confirmedBids?.map((q) => {
                    return (
                      <tr key={q?.id}>
                        <td>{dayjs(q.created).format(`DD.MM.YY, HH:mm`)}</td>

                        <td>{q?.fio}</td>
                        <td>{q?.iin}</td>
                        <td>{q?.phone}</td>
                        <td>
                          {`Договор №${q?.inc} от ${dayjs(q?.created).format(
                            'DD.MM.YYYY'
                          )}`}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="ref">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>ФИО</th>
                    <th>ИИН</th>
                    <th>Номер телефона</th>
                    <th>Причина отказа</th>
                    <th>Договор</th>
                  </tr>
                </thead>
                <tbody>
                  {rejectedBids?.map((q) => {
                    return (
                      <tr key={q?.id}>
                        <td>{dayjs(q.created).format(`DD.MM.YY, HH:mm`)}</td>

                        <td>{q?.fio}</td>
                        <td>{q?.iin}</td>
                        <td>{q?.phone}</td>
                        <td>{q?.comment}</td>
                        <td>
                          {`Договор №${q?.inc} от ${dayjs(q?.created).format(
                            'DD.MM.YYYY'
                          )}`}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        )}

        {params.get('value') === 'rights-bids' && (
          <Tabs
            defaultValue="bids"
            classNames={{
              panel: 'pt-4',
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="bids">Заявки</Tabs.Tab>
              <Tabs.Tab value="succ">Одобренные</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="bids">
              <Table>
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Номер телефона</th>
                    <th>Тип</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {r?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{w?.name}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.type}</td>
                        <td className='flex gap-2'>

                          <BsCheckCircle
                            size={30}
                            color="green"
                            // onClick={() => handleConfirmBid(q)}
                            onClick={async () => {
                              openConfirmModal({
                                labels: {
                                  cancel: 'Назад',
                                  confirm: 'Одобрить',
                                },
                                centered: true,
                                onConfirm: async () => {
                                  await pb
                                    .collection('rights_bids')
                                    .update(w?.id, {
                                      status: 'succ',
                                      comment: w?.comment,
                                    })
                                    .then(() => {
                                      getRightsbids().then((res) => {
                                        setR(
                                          res?.filter((w) => w?.status === '')
                                        )
                                        setRs(
                                          res?.filter(
                                            (w) => w?.status === 'succ'
                                          )
                                        )
                                      })
                                    })
                                },
                              })
                            }}
                            className="cursor-pointer hover:fill-yellow-500"
                          />

                          <Button
                            onClick={() => {
                              openConfirmModal({
                                labels: {
                                  confirm: 'Удалить',
                                  cancel: 'Отмена',
                                },
                                centered: true,
                                onConfirm: async () => {
                                  await pb
                                    .collection('rights_bids')
                                    .delete(w?.id)
                                    .then(() => {
                                      getRightsbids().then((res) => {
                                        setR(
                                          res?.filter((w) => w?.status === '')
                                        )
                                        setRs(
                                          res?.filter(
                                            (w) => w?.status === 'succ'
                                          )
                                        )
                                      })
                                    })
                                },
                              })
                            }}
                            compact
                            variant="light"
                          >
                            Удалить
                          </Button>


                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="succ">
              <Table>
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Номер телефона</th>
                    <th>Тип</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {rs?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{w?.name}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.type}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        )}

        {params.get('value') === 'question' && (
          <Tabs
            defaultValue="bids"
            classNames={{
              panel: 'pt-4',
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="bids">Заявки</Tabs.Tab>
              <Tabs.Tab value="succ">Завершенные</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="bids">
              <Table>
                <thead>
                  <tr>
                    <th>Вопрос 1</th>
                    <th>Вопрос 2</th>
                    <th>Вопрос 3</th>
                    <th>Вопрос 4</th>
                    <th>Дата</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {activeAnswers?.map((bid) => (
                    <BidsForm bid={bid} key={bid.id} q={questions} />
                  ))}
                </tbody>
              </Table>
            </Tabs.Panel>

            <Tabs.Panel value="succ">
              <Table>
                <thead>
                  <tr>
                    <th>Вопрос 1</th>
                    <th>Вопрос 2</th>
                    <th>Вопрос 3</th>
                    <th>Вопрос 4</th>
                    <th>Дата</th>
                    <th>Статус</th>
                    <th>Завершил</th>
                  </tr>
                </thead>
                <tbody>
                  {endedAndwers?.map((bid) => (
                    <BidsForm bid={bid} key={bid.id} ended />
                  ))}
                </tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        )}

        {params.get('value') === 'price' && (
          <Tabs
            defaultValue="bids"
            classNames={{
              panel: 'pt-4',
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="bids">Заявки</Tabs.Tab>
              <Tabs.Tab value="succ">Завершенные</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="bids">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Имя</th>
                    <th>Почта</th>
                    <th>Телефон</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {priceBids?.map((price) => {
                    return (
                      <tr key={price?.id}>
                        <td>
                          {dayjs(price?.created).format('YY-MM-DD, HH:mm')}
                        </td>
                        <td>{price?.name}</td>
                        <td>{price?.email}</td>
                        <td>{price?.phone}</td>
                        <td>
                          <BiBadgeCheck
                            size={35}
                            color="red"
                            onClick={() => removeWithdrawConfirm(price?.id)}
                            className="cursor-pointer hover:fill-yellow-500"
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>

            <Tabs.Panel value="succ">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Имя</th>
                    <th>Почта</th>
                    <th>Телефон</th>
                    <th>Статус</th>
                    <th>Завершил</th>
                  </tr>
                </thead>
                <tbody>
                  {priceBids1?.map((price) => {
                    return (
                      <tr key={price?.id}>
                        <td>
                          {dayjs(price?.created).format('YY-MM-DD, HH:mm')}
                        </td>
                        <td>{price?.name}</td>
                        <td>{price?.email}</td>
                        <td>{price?.phone}</td>
                        <td>
                          {price?.status === 'succ' ? 'Успешно' : 'Отклонено'}
                        </td>
                        <td>{price?.admin}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        )}

        {params.get('value') === 'resort' && (
          <Tabs
            defaultValue="bids"
            classNames={{
              panel: 'pt-4',
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="bids">Заявки</Tabs.Tab>
              <Tabs.Tab value="succ">Завершенные</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="bids">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Имя</th>
                    <th>Почта</th>
                    <th>Телефон</th>
                    <th>Курорт</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {resortsBids?.map((resort) => {
                    return (
                      <tr key={resort?.id}>
                        <td>
                          {dayjs(resort?.created).format('YY-MM-DD, HH:mm')}
                        </td>
                        <td>{resort?.name}</td>
                        <td>{resort?.email}</td>
                        <td>{resort?.phone}</td>
                        <td>
                          {/* <a href={`https://oz-elim.kz/resort/${resort?.data}`} target="_blank"> */}
                          {resort?.data}
                          {/* </a> */}
                        </td>
                        <td>
                          <BiBadgeCheck
                            size={35}
                            color="red"
                            onClick={() => removeWithdrawConfirm(resort?.id)}
                            className="cursor-pointer hover:fill-yellow-500"
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>

            <Tabs.Panel value="succ">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Имя</th>
                    <th>Почта</th>
                    <th>Телефон</th>
                    <th>Курорт</th>
                    <th>Статус</th>
                    <th>Завершил</th>
                  </tr>
                </thead>
                <tbody>
                  {resortsBids1?.map((resort) => {
                    return (
                      <tr key={resort?.id}>
                        <td>
                          {dayjs(resort?.created).format('YY-MM-DD, HH:mm')}
                        </td>
                        <td>{resort?.name}</td>
                        <td>{resort?.email}</td>
                        <td>{resort?.phone}</td>
                        <td>
                          <a
                            href={`https://oz-elim.kz/resort/${resort?.data}`}
                            target="_blank"
                          >
                            {resort?.data}
                          </a>
                        </td>
                        <td>
                          {resort?.status === 'succ' ? 'Успешно' : 'Отклонено'}
                        </td>
                        <td>{resort?.admin}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        )}

        {params.get('value') === 'home-bids' && (
          <Tabs
            defaultValue="bids"
            classNames={{
              panel: 'pt-4',
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="bids">Заявки</Tabs.Tab>
              <Tabs.Tab value="succ">Одобренные</Tabs.Tab>
              <Tabs.Tab value="ref">Отклоненные</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="bids">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Наименование орг.</th>
                    <th>Эл. почта</th>
                    <th>Номер телефона</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {q?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.name}</td>
                        <td>{w?.email}</td>
                        <td>{w?.phone}</td>
                        <td>
                          <div className="flex gap-4">
                            <Textarea
                              autosize
                              value={w?.comment}
                              onChange={(e) => {
                                const newQ = q?.map((r) => {
                                  if (r?.id === w?.id)
                                    return {
                                      ...r,
                                      comment: e?.currentTarget?.value,
                                    }
                                  return { ...r }
                                })
                                setQ([...newQ])
                              }}
                            />
                            <BsCheckCircle
                              size={30}
                              color="green"
                              // onClick={() => handleConfirmBid(q)}
                              onClick={async () => {
                                openConfirmModal({
                                  labels: {
                                    cancel: 'Назад',
                                    confirm: 'Одобрить',
                                  },
                                  centered: true,
                                  onConfirm: async () => {
                                    await pb
                                      .collection('123')
                                      .update(w?.id, {
                                        status: 'succ',
                                        comment: w?.comment,
                                      })
                                      .then(() => {
                                        get123().then((res) => {
                                          setQ(
                                            res?.filter((w) => w?.status === '')
                                          )
                                          setQs(
                                            res?.filter(
                                              (w) => w?.status === 'succ'
                                            )
                                          )
                                          setQr(
                                            res?.filter(
                                              (w) => w?.status === 'ref'
                                            )
                                          )
                                        })
                                      })
                                  },
                                })
                              }}
                              className="cursor-pointer hover:fill-yellow-500"
                            />
                            <CiCircleRemove
                              size={35}
                              color="red"
                              onClick={async () => {
                                openConfirmModal({
                                  labels: {
                                    cancel: 'Назад',
                                    confirm: 'Одобрить',
                                  },
                                  centered: true,
                                  onConfirm: async () => {
                                    await pb
                                      .collection('123')
                                      .update(w?.id, {
                                        status: 'ref',
                                        comment: w?.comment,
                                      })
                                      .then(() => {
                                        get123().then((res) => {
                                          setQ(
                                            res?.filter((w) => w?.status === '')
                                          )
                                          setQs(
                                            res?.filter(
                                              (w) => w?.status === 'succ'
                                            )
                                          )
                                          setQr(
                                            res?.filter(
                                              (w) => w?.status === 'ref'
                                            )
                                          )
                                        })
                                      })
                                  },
                                })
                              }}
                              className="cursor-pointer hover:fill-yellow-500"
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="succ">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Наименование орг.</th>
                    <th>Эл. почта</th>
                    <th>Номер телефона</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {qs.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.name}</td>
                        <td>{w?.email}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.comment}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="ref">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Наименование орг.</th>
                    <th>Эл. почта</th>
                    <th>Номер телефона</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {qr?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.name}</td>
                        <td>{w?.email}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.comment}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        )}

        {params.get('value') === 'dual-bids' && (
          <Tabs
            defaultValue="bids"
            classNames={{
              panel: 'pt-4',
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="bids">Заявки</Tabs.Tab>
              <Tabs.Tab value="succ">Одобренные</Tabs.Tab>
              <Tabs.Tab value="ref">Отклоненные</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="bids">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Номер телефона</th>
                    <th>Эл. почта</th>
                    <th>Вид услуги</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {d?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.email}</td>
                        <td>{w?.service}</td>
                        <td>
                          <div className="flex gap-4">
                            <Textarea
                              autosize
                              value={w?.comment}
                              onChange={(e) => {
                                const newQ = d?.map((r) => {
                                  if (r?.id === w?.id)
                                    return {
                                      ...r,
                                      comment: e?.currentTarget?.value,
                                    }
                                  return { ...r }
                                })
                                setD([...newQ])
                              }}
                            />
                            <BsCheckCircle
                              size={30}
                              color="green"
                              // onClick={() => handleConfirmBid(q)}
                              onClick={async () => {
                                openConfirmModal({
                                  labels: {
                                    cancel: 'Назад',
                                    confirm: 'Одобрить',
                                  },
                                  centered: true,
                                  onConfirm: async () => {
                                    await pb
                                      .collection('dual_bids')
                                      .update(w?.id, {
                                        status: 'succ',
                                        comment: w?.comment,
                                      })
                                      .then(() => {
                                        getDualBids().then((res) => {
                                          setD(
                                            res?.filter((w) => w?.status === '')
                                          )
                                          setDs(
                                            res?.filter(
                                              (w) => w?.status === 'succ'
                                            )
                                          )
                                          setDr(
                                            res?.filter(
                                              (w) => w?.status === 'ref'
                                            )
                                          )
                                        })
                                      })
                                  },
                                })
                              }}
                              className="cursor-pointer hover:fill-yellow-500"
                            />
                            <CiCircleRemove
                              size={35}
                              color="red"
                              onClick={async () => {
                                openConfirmModal({
                                  labels: {
                                    cancel: 'Назад',
                                    confirm: 'Отклонить',
                                  },
                                  centered: true,
                                  onConfirm: async () => {
                                    await pb
                                      .collection('dual_bids')
                                      .update(w?.id, {
                                        status: 'ref',
                                        comment: w?.comment,
                                      })
                                      .then(() => {
                                        getDualBids().then((res) => {
                                          setD(
                                            res?.filter((w) => w?.status === '')
                                          )
                                          setDs(
                                            res?.filter(
                                              (w) => w?.status === 'succ'
                                            )
                                          )
                                          setDr(
                                            res?.filter(
                                              (w) => w?.status === 'ref'
                                            )
                                          )
                                        })
                                      })
                                  },
                                })
                              }}
                              className="cursor-pointer hover:fill-yellow-500"
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="succ">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Номер телефона</th>
                    <th>Эл. почта</th>
                    <th>Вид услуги</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {ds?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.email}</td>
                        <td>{w?.service}</td>
                        <td>{w?.comment}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="ref">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Номер телефона</th>
                    <th>Эл. почта</th>
                    <th>Вид услуги</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {dr?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.email}</td>
                        <td>{w?.service}</td>
                        <td>{w?.comment}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        )}
        {params.get('value') === 'insurance-bids' && (
          <Tabs
            defaultValue="bids"
            classNames={{
              panel: 'pt-4',
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="bids">Заявки</Tabs.Tab>
              <Tabs.Tab value="succ">Одобренные</Tabs.Tab>
              <Tabs.Tab value="ref">Отклоненные</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="bids">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Номер телефона</th>
                    <th>Имя</th>
                    <th>Вид услуги</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {s?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.name}</td>
                        <td>{w?.type}</td>
                        <td>
                          <div className="flex gap-4">
                            <Textarea
                              autosize
                              value={w?.comment}
                              onChange={(e) => {
                                const newQ = s?.map((r) => {
                                  if (r?.id === w?.id)
                                    return {
                                      ...r,
                                      comment: e?.currentTarget?.value,
                                    }
                                  return { ...r }
                                })
                                sets([...newQ])
                              }}
                            />
                            <BsCheckCircle
                              size={30}
                              color="green"
                              // onClick={() => handleConfirmBid(q)}
                              onClick={async () => {
                                openConfirmModal({
                                  labels: {
                                    cancel: 'Назад',
                                    confirm: 'Одобрить',
                                  },
                                  centered: true,
                                  onConfirm: async () => {
                                    await pb
                                      .collection('insurance_bids')
                                      .update(w?.id, {
                                        status: 'succ',
                                        comment: w?.comment,
                                      })
                                      .then(() => {
                                        getInsuranceBids().then((res) => {
                                          setS(
                                            res?.filter((w) => w?.status === '')
                                          )
                                          setSs(
                                            res?.filter(
                                              (w) => w?.status === 'succ'
                                            )
                                          )
                                          setSr(
                                            res?.filter(
                                              (w) => w?.status === 'ref'
                                            )
                                          )
                                        })
                                      })
                                  },
                                })
                              }}
                              className="cursor-pointer hover:fill-yellow-500"
                            />
                            <CiCircleRemove
                              size={35}
                              color="red"
                              onClick={async () => {
                                openConfirmModal({
                                  labels: {
                                    cancel: 'Назад',
                                    confirm: 'Отклонить',
                                  },
                                  centered: true,
                                  onConfirm: async () => {
                                    await pb
                                      .collection('insurance_bids')
                                      .update(w?.id, {
                                        status: 'ref',
                                        comment: w?.comment,
                                      })
                                      .then(() => {
                                        getInsuranceBids().then((res) => {
                                          setS(
                                            res?.filter((w) => w?.status === '')
                                          )
                                          setSs(
                                            res?.filter(
                                              (w) => w?.status === 'succ'
                                            )
                                          )
                                          setSr(
                                            res?.filter(
                                              (w) => w?.status === 'ref'
                                            )
                                          )
                                        })
                                      })
                                  },
                                })
                              }}
                              className="cursor-pointer hover:fill-yellow-500"
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="succ">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Номер телефона</th>
                    <th>Имя</th>
                    <th>Вид услуги</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {ss?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.name}</td>
                        <td>{w?.type}</td>
                        <td>{w?.comment}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="ref">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Номер телефона</th>
                    <th>Имя</th>
                    <th>Вид услуги</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {sr?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.name}</td>
                        <td>{w?.type}</td>
                        <td>{w?.comment}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        )}

        {params.get('value') === 'job-bids' && (
          <Tabs
            defaultValue="bids"
            classNames={{
              panel: 'pt-4',
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="bids">Заявки</Tabs.Tab>
              <Tabs.Tab value="succ">Одобренные</Tabs.Tab>
              <Tabs.Tab value="ref">Отклоненные</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="bids">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Номер телефона</th>
                    <th>Имя</th>
                    <th>Вид услуги</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {x?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.name}</td>
                        <td>{w?.vaca}</td>
                        <td>
                          <div className="flex gap-4">
                            <Textarea
                              autosize
                              value={w?.comment}
                              onChange={(e) => {
                                const newQ = x?.map((r) => {
                                  if (r?.id === w?.id)
                                    return {
                                      ...r,
                                      comment: e?.currentTarget?.value,
                                    }
                                  return { ...r }
                                })
                                setX([...newQ])
                              }}
                            />
                            <BsCheckCircle
                              size={30}
                              color="green"
                              // onClick={() => handleConfirmBid(q)}
                              onClick={async () => {
                                openConfirmModal({
                                  labels: {
                                    cancel: 'Назад',
                                    confirm: 'Одобрить',
                                  },
                                  centered: true,
                                  onConfirm: async () => {
                                    await pb
                                      .collection('vaca_bids')
                                      .update(w?.id, {
                                        status: 'succ',
                                        comment: w?.comment,
                                      })
                                      .then(() => {
                                        getVacaBids().then((res) => {
                                          setX(
                                            res?.filter((w) => w?.status === '')
                                          )
                                          setXs(
                                            res?.filter(
                                              (w) => w?.status === 'succ'
                                            )
                                          )
                                          setXr(
                                            res?.filter(
                                              (w) => w?.status === 'ref'
                                            )
                                          )
                                        })
                                      })
                                  },
                                })
                              }}
                              className="cursor-pointer hover:fill-yellow-500"
                            />
                            <CiCircleRemove
                              size={35}
                              color="red"
                              onClick={async () => {
                                openConfirmModal({
                                  labels: {
                                    cancel: 'Назад',
                                    confirm: 'Одобрить',
                                  },
                                  centered: true,
                                  onConfirm: async () => {
                                    await pb
                                      .collection('vaca_bids')
                                      .update(w?.id, {
                                        status: 'ref',
                                        comment: w?.comment,
                                      })
                                      .then(() => {
                                        getVacaBids().then((res) => {
                                          setX(
                                            res?.filter((w) => w?.status === '')
                                          )
                                          setXs(
                                            res?.filter(
                                              (w) => w?.status === 'succ'
                                            )
                                          )
                                          setXr(
                                            res?.filter(
                                              (w) => w?.status === 'ref'
                                            )
                                          )
                                        })
                                      })
                                  },
                                })
                              }}
                              className="cursor-pointer hover:fill-yellow-500"
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="succ">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Номер телефона</th>
                    <th>Имя</th>
                    <th>Вид услуги</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {xs?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.name}</td>
                        <td>{w?.vaca}</td>
                        <td>{w?.comment}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="ref">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Номер телефона</th>
                    <th>Имя</th>
                    <th>Вид услуги</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {xr?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.name}</td>
                        <td>{w?.vaca}</td>
                        <td>{w?.comment}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        )}

        {params.get('value') === 'health-bids' && (
          <Tabs
            defaultValue="bids"
            classNames={{
              panel: 'pt-4',
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="bids">Заявки</Tabs.Tab>
              <Tabs.Tab value="succ">Одобренные</Tabs.Tab>
              <Tabs.Tab value="ref">Отклоненные</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="bids">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Номер телефона</th>
                    <th>Имя</th>
                    <th>Курорт</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {h?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.name}</td>
                        <td>{w?.resort}</td>
                        <td>
                          <div className="flex gap-4">
                            <Textarea
                              autosize
                              value={w?.comment}
                              onChange={(e) => {
                                const newQ = h?.map((r) => {
                                  if (r?.id === w?.id)
                                    return {
                                      ...r,
                                      comment: e?.currentTarget?.value,
                                    }
                                  return { ...r }
                                })
                                setH([...newQ])
                              }}
                            />
                            <BsCheckCircle
                              size={30}
                              color="green"
                              // onClick={() => handleConfirmBid(q)}
                              onClick={async () => {
                                openConfirmModal({
                                  labels: {
                                    cancel: 'Назад',
                                    confirm: 'Одобрить',
                                  },
                                  centered: true,
                                  onConfirm: async () => {
                                    await pb
                                      .collection('health_bids')
                                      .update(w?.id, {
                                        status: 'succ',
                                        comment: w?.comment,
                                      })
                                      .then(() => {
                                        getHealthBids().then((res) => {
                                          setH(
                                            res?.filter((w) => w?.status === '')
                                          )
                                          setHs(
                                            res?.filter(
                                              (w) => w?.status === 'succ'
                                            )
                                          )
                                          setHr(
                                            res?.filter(
                                              (w) => w?.status === 'ref'
                                            )
                                          )
                                        })
                                      })
                                  },
                                })
                              }}
                              className="cursor-pointer hover:fill-yellow-500"
                            />
                            <CiCircleRemove
                              size={35}
                              color="red"
                              onClick={async () => {
                                openConfirmModal({
                                  labels: {
                                    cancel: 'Назад',
                                    confirm: 'Отклонить',
                                  },
                                  centered: true,
                                  onConfirm: async () => {
                                    await pb
                                      .collection('health_bids')
                                      .update(w?.id, {
                                        status: 'ref',
                                        comment: w?.comment,
                                      })
                                      .then(() => {
                                        getHealthBids().then((res) => {
                                          setH(
                                            res?.filter((w) => w?.status === '')
                                          )
                                          setHs(
                                            res?.filter(
                                              (w) => w?.status === 'succ'
                                            )
                                          )
                                          setHr(
                                            res?.filter(
                                              (w) => w?.status === 'ref'
                                            )
                                          )
                                        })
                                      })
                                  },
                                })
                              }}
                              className="cursor-pointer hover:fill-yellow-500"
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="succ">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Номер телефона</th>
                    <th>Имя</th>
                    <th>Курорт</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {hs?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.name}</td>
                        <td>{w?.resort}</td>
                        <td>{w?.comment}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="ref">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Номер телефона</th>
                    <th>Имя</th>
                    <th>Курорт</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {hr?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.name}</td>
                        <td>{w?.resort}</td>
                        <td>{w?.comment}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        )}

        {params.get('value') === 'tours-bids' && (
          <Tabs
            defaultValue="bids"
            classNames={{
              panel: 'pt-4',
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="bids">Заявки</Tabs.Tab>
              <Tabs.Tab value="succ">Одобренные</Tabs.Tab>
              <Tabs.Tab value="ref">Отклоненные</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="bids">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Наименование орг.</th>
                    <th>Имя</th>
                    <th>Номер телефона</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {t?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.tour}</td>
                        <td>{w?.name}</td>
                        <td>{w?.phone}</td>
                        <td>
                          <div className="flex gap-4">
                            <Textarea
                              autosize
                              value={w?.comment}
                              onChange={(e) => {
                                const newQ = t?.map((r) => {
                                  if (r?.id === w?.id)
                                    return {
                                      ...r,
                                      comment: e?.currentTarget?.value,
                                    }
                                  return { ...r }
                                })
                                setT([...newQ])
                              }}
                            />
                            <BsCheckCircle
                              size={30}
                              color="green"
                              // onClick={() => handleConfirmBid(q)}
                              onClick={async () => {
                                openConfirmModal({
                                  labels: {
                                    cancel: 'Назад',
                                    confirm: 'Одобрить',
                                  },
                                  centered: true,
                                  onConfirm: async () => {
                                    await pb
                                      .collection('tours_bids2')
                                      .update(w?.id, {
                                        status: 'succ',
                                        comment: w?.comment,
                                      })
                                      .then(() => {
                                        getToursBids2().then((res) => {
                                          setT(
                                            res?.filter((w) => w?.status === '')
                                          )
                                          setTs(
                                            res?.filter(
                                              (w) => w?.status === 'succ'
                                            )
                                          )
                                          setTr(
                                            res?.filter(
                                              (w) => w?.status === 'ref'
                                            )
                                          )
                                        })
                                      })
                                  },
                                })
                              }}
                              className="cursor-pointer hover:fill-yellow-500"
                            />
                            <CiCircleRemove
                              size={35}
                              color="red"
                              onClick={async () => {
                                openConfirmModal({
                                  labels: {
                                    cancel: 'Назад',
                                    confirm: 'Отклонить',
                                  },
                                  centered: true,
                                  onConfirm: async () => {
                                    await pb
                                      .collection('tours_bids2')
                                      .update(w?.id, {
                                        status: 'ref',
                                        comment: w?.comment,
                                      })
                                      .then(() => {
                                        getToursBids2().then((res) => {
                                          setT(
                                            res?.filter((w) => w?.status === '')
                                          )
                                          setTs(
                                            res?.filter(
                                              (w) => w?.status === 'succ'
                                            )
                                          )
                                          setTr(
                                            res?.filter(
                                              (w) => w?.status === 'ref'
                                            )
                                          )
                                        })
                                      })
                                  },
                                })
                              }}
                              className="cursor-pointer hover:fill-yellow-500"
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="succ">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Наименование орг.</th>
                    <th>Номер телефона</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {ts.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.name}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.comment}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="ref">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Наименование орг.</th>
                    <th>Номер телефона</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {tr.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.name}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.comment}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        )}
        {params.get('value') === 'fund-bids' && (
          <Tabs
            defaultValue="bids"
            classNames={{
              panel: 'pt-4',
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="bids">Заявки</Tabs.Tab>
              <Tabs.Tab value="succ">Одобренные</Tabs.Tab>
              <Tabs.Tab value="ref">Отклоненные</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="bids">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Наименование орг.</th>
                    <th>Номер телефона</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {f?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.name}</td>
                        <td>{w?.phone}</td>
                        <td>
                          <div className="flex gap-4">
                            <Textarea
                              autosize
                              value={w?.comment}
                              onChange={(e) => {
                                const newQ = f?.map((r) => {
                                  if (r?.id === w?.id)
                                    return {
                                      ...r,
                                      comment: e?.currentTarget?.value,
                                    }
                                  return { ...r }
                                })
                                setF([...newQ])
                              }}
                            />
                            <BsCheckCircle
                              size={30}
                              color="green"
                              // onClick={() => handleConfirmBid(q)}
                              onClick={async () => {
                                openConfirmModal({
                                  labels: {
                                    cancel: 'Назад',
                                    confirm: 'Одобрить',
                                  },
                                  centered: true,
                                  onConfirm: async () => {
                                    await pb
                                      .collection('fund_bids')
                                      .update(w?.id, {
                                        status: 'succ',
                                        comment: w?.comment,
                                      })
                                      .then(() => {
                                        getFundBids().then((res) => {
                                          setF(
                                            res?.filter((w) => w?.status === '')
                                          )
                                          setFs(
                                            res?.filter(
                                              (w) => w?.status === 'succ'
                                            )
                                          )
                                          setFr(
                                            res?.filter(
                                              (w) => w?.status === 'ref'
                                            )
                                          )
                                        })
                                      })
                                  },
                                })
                              }}
                              className="cursor-pointer hover:fill-yellow-500"
                            />
                            <CiCircleRemove
                              size={35}
                              color="red"
                              onClick={async () => {
                                openConfirmModal({
                                  labels: {
                                    cancel: 'Назад',
                                    confirm: 'Отклонить',
                                  },
                                  centered: true,
                                  onConfirm: async () => {
                                    await pb
                                      .collection('fund_bids')
                                      .update(w?.id, {
                                        status: 'ref',
                                        comment: w?.comment,
                                      })
                                      .then(() => {
                                        getFundBids().then((res) => {
                                          setF(
                                            res?.filter((w) => w?.status === '')
                                          )
                                          setFs(
                                            res?.filter(
                                              (w) => w?.status === 'succ'
                                            )
                                          )
                                          setFr(
                                            res?.filter(
                                              (w) => w?.status === 'ref'
                                            )
                                          )
                                        })
                                      })
                                  },
                                })
                              }}
                              className="cursor-pointer hover:fill-yellow-500"
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="succ">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Наименование орг.</th>
                    <th>Номер телефона</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {fs.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.name}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.comment}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="ref">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Наименование орг.</th>
                    <th>Номер телефона</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {fr.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.name}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.comment}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        )}
        {params.get('value') === 'user-bids' && (
          <Tabs
            defaultValue="bids"
            classNames={{
              panel: 'pt-4',
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="bids">Заявки</Tabs.Tab>
              <Tabs.Tab value="succ">Одобренные</Tabs.Tab>
              <Tabs.Tab value="ref">Отклоненные</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="bids">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Номер телефона</th>
                    <th>Имя</th>
                    <th>Вид услуги</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {b?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.name}</td>Ё<td>{w?.type}</td>
                        <td>
                          <div className="flex gap-4">
                            <Textarea
                              autosize
                              value={w?.comment}
                              onChange={(e) => {
                                const newQ = b?.map((r) => {
                                  if (r?.id === w?.id)
                                    return {
                                      ...r,
                                      comment: e?.currentTarget?.value,
                                    }
                                  return { ...r }
                                })
                                setB([...newQ])
                              }}
                            />
                            <BsCheckCircle
                              size={30}
                              color="green"
                              // onClick={() => handleConfirmBid(q)}
                              onClick={async () => {
                                openConfirmModal({
                                  labels: {
                                    cancel: 'Назад',
                                    confirm: 'Одобрить',
                                  },
                                  centered: true,
                                  onConfirm: async () => {
                                    await pb
                                      .collection('tourist_bids')
                                      .update(w?.id, {
                                        status: 'succ',
                                        comment: w?.comment,
                                      })
                                      .then(() => {
                                        getTouristBids().then((res) => {
                                          setB(
                                            res?.filter((w) => w?.status === '')
                                          )
                                          setBs(
                                            res?.filter(
                                              (w) => w?.status === 'succ'
                                            )
                                          )
                                          setBr(
                                            res?.filter(
                                              (w) => w?.status === 'ref'
                                            )
                                          )
                                        })
                                      })
                                  },
                                })
                              }}
                              className="cursor-pointer hover:fill-yellow-500"
                            />
                            <CiCircleRemove
                              size={35}
                              color="red"
                              onClick={async () => {
                                openConfirmModal({
                                  labels: {
                                    cancel: 'Назад',
                                    confirm: 'Одобрить',
                                  },
                                  centered: true,
                                  onConfirm: async () => {
                                    await pb
                                      .collection('tourist_bids')
                                      .update(w?.id, {
                                        status: 'ref',
                                        comment: w?.comment,
                                      })
                                      .then(() => {
                                        getTouristBids().then((res) => {
                                          setB(
                                            res?.filter((w) => w?.status === '')
                                          )
                                          setBs(
                                            res?.filter(
                                              (w) => w?.status === 'succ'
                                            )
                                          )
                                          setBr(
                                            res?.filter(
                                              (w) => w?.status === 'ref'
                                            )
                                          )
                                        })
                                      })
                                  },
                                })
                              }}
                              className="cursor-pointer hover:fill-yellow-500"
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="succ">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Номер телефона</th>
                    <th>Имя</th>
                    <th>Вид услуги</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {bs?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.name}</td>
                        <td>{w?.type}</td>
                        <td>{w?.comment}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
            <Tabs.Panel value="ref">
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Номер телефона</th>
                    <th>Имя</th>
                    <th>Вид услуги</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {br?.map((w) => {
                    return (
                      <tr key={w?.id}>
                        <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                        <td>{w?.phone}</td>
                        <td>{w?.name}</td>
                        <td>{w?.type}</td>
                        <td>{w?.comment}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        )}

        {/* <h2 className="text-center text-2xl text-primary-600">
          Заявки на консультацию
        </h2>
        {answers?.map((bid) => (
          <BidsForm bid={bid} key={bid.id} />
        ))} */}
      </div>

      <Modal
        opened={modal}
        centered
        onClose={() => {
          modalHandler.close()
          setBid({})
        }}
        title={`Договор №${bid?.inc} от ${dayjs(bid?.created).format(
          'DD.MM.YYYY'
        )}`}
      >
        <ul className="space-y-2">
          <li className="grid grid-cols-[20%_auto]">
            <span className="text-slate-500">ФИО:</span>{' '}
            {bid?.expand?.agent?.fio}
          </li>
          <li className="grid grid-cols-[20%_auto]">
            <span className="text-slate-500">ID:</span> {bid?.expand?.agent?.id}
          </li>
          <li className="grid grid-cols-[20%_auto]">
            <span className="text-slate-500">Email:</span>{' '}
            {bid?.expand?.agent?.email}
          </li>
          <li className="grid grid-cols-[20%_auto]">
            <span className="text-slate-500">Телефон:</span>{' '}
            {bid?.expand?.agent?.phone}
          </li>
        </ul>
        <p className="mt-4 text-sm">
          Подтвердите чтобы сделать данного пользователя агентом
        </p>
        <Textarea
          label="Или напишите причину отказа"
          classNames={{
            label: '!text-gray-500',
          }}
          className="mt-4"
          description="Если вы отказываете пользователю то обязательно напишите комментарий"
          value={comment}
          onChange={(e) => setComment(e?.currentTarget?.value)}
          variant="filled"
        />
        <div className="flex justify-center gap-4 mt-6">
          <Button
            disabled={!comment}
            loading={loadiong}
            onClick={async () => {
              loading_h.open()
              await pb
                .collection('agents_bids')
                .update(bid?.id, {
                  status: 'rejected',
                  comment,
                })
                .then((res) => {
                  loading_h.close()
                  modalHandler.close()
                  showNotification({
                    title: 'Заявка',
                    message: 'Отказано',
                    color: 'red',
                  })
                })
            }}
          >
            Отказать
          </Button>
          <Button
            loading={loadiong}
            onClick={async () => {
              try {
                setGlobalLoading(true);
                loading_h.open();

                // СНАЧАЛА делаем makeAgent — если он упадёт, дальше не пойдём
                await makeAgent(bid?.agent);

                // ЕСЛИ всё прошло — теперь уже можно менять статус заявки
                await pb.collection('agents_bids').update(bid?.id, {
                  status: 'confirmed',
                });

                // window.location.reload();
              } catch (error) {
                console.error(error);
                showNotification({
                  title: 'Ошибка',
                  message: 'Что-то пошло не так в подтверждении',
                  color: 'yellow',
                });
              } finally {
                loading_h.close();
                setGlobalLoading(false);
              }
            }}
            disabled={comment}
          >
            Принять в агенты
          </Button>

          {/* <Button
              loading={legitUpdateInProgress}
              onClick={async () => {
                setLegitUpdateInProgress(true);
                try {
                  const res = await fetch('https://ozelim-payment.netlify.app/api/legit', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });

                  const json = await res.json();
                  alert(json.message || json.error);
                } catch (err) {
                  alert('Что-то пошло не так при обновлении пользователей');
                  console.error(err);
                } finally {
                  setLegitUpdateInProgress(false);
                }
              }}
              color="red"
              variant="outline"
            >
              Обновить LEGIT
            </Button> */}

        </div>
      </Modal>
    </>
  )
}
