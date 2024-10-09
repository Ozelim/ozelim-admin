import React from "react";
import { Button, Modal, Table, Tabs, TextInput, Textarea } from "@mantine/core";
import dayjs from "dayjs";
import { pb } from "shared/api";
import { BidsForm } from "./BidsForm";
import { CiCircleRemove } from "react-icons/ci";
import { openConfirmModal } from "@mantine/modals";

import { BiAccessibility, BiBadgeCheck } from 'react-icons/bi'
import { useAuth } from "shared/hooks";
import { BsCheckCircle } from "react-icons/bs";

async function getAnswers () {
  return await pb.collection("questions").getFullList({
    filter: `question = false`,
    sort: '-created'
  });
}

async function get123 () {
  return await pb.collection("123").getFullList();
}

async function getQuestions () {
  return (await pb.collection('questions').getFirstListItem(`question = true`))
}

async function getBids () {
  return await pb.collection('bids').getFullList({
    sort: '-created'
  })
}

async function getDualBids () {
  return await pb.collection('dual_bids').getFullList()
}

async function getInsuranceBids () {
  return await pb.collection('insurance_bids').getFullList()
}

async function getVacaBids () {
  return await pb.collection('vaca_bids').getFullList()
}

async function getHealthBids () {
  return await pb.collection('health_bids').getFullList()
}

async function getToursBids () {
  return await pb.collection('tours_bids2').getFullList()
}

async function getFundBids () {
  return await pb.collection('fund_bids').getFullList()
}

export const Bids = () => {

  const { user } = useAuth()

  const [answers, setAnswers] = React.useState([])
  const [bids, setBids] = React.useState([]);

  const [questions, setQuestions] = React.useState([])
  
  const [q, setQ] = React.useState([])
  const [qs, setQs] = React.useState([])
  const [qr, setQr] = React.useState([])

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

  React.useEffect(() => {
    get123()
    .then(res => {
      setQ(res?.filter(w => w?.status === ''))
      setQs(res?.filter(w => w?.status === 'succ'))
      setQr(res?.filter(w => w?.status === 'ref'))
    })

    getInsuranceBids()
    .then(res => {
      setS(res?.filter(w => w?.status === ''))
      setSs(res?.filter(w => w?.status === 'succ'))
      setSr(res?.filter(w => w?.status === 'ref'))
    })

    getHealthBids()
    .then(res => {
      setH(res?.filter(w => w?.status === ''))
      setHs(res?.filter(w => w?.status === 'succ'))
      setHr(res?.filter(w => w?.status === 'ref'))
    })

    getVacaBids()
    .then(res => {
      setX(res?.filter(w => w?.status === ''))
      setXs(res?.filter(w => w?.status === 'succ'))
      setXr(res?.filter(w => w?.status === 'ref'))
    })

    getDualBids()
    .then(res => {
      setD(res?.filter(w => w?.status === ''))
      setDs(res?.filter(w => w?.status === 'succ'))
      setDr(res?.filter(w => w?.status === 'ref'))
    })

    getAnswers().then((res) => {
      setAnswers(res);
    });

    getQuestions().then(res => {
      setQuestions(res)
    })

    getToursBids().then(res => {
      setT(res?.filter(w => w?.status === ''))
      setTs(res?.filter(w => w?.status === 'succ'))
      setTr(res?.filter(w => w?.status === 'ref'))
    }) 

    getBids().then((res) => {
      setBids(res);
    });

    getFundBids().then((res) => {
      setF(res?.filter(w => w?.status === ''));
      setFs(res?.filter(w => w?.status === 'succ'))
      setFr(res?.filter(w => w?.status === 'ref'))
    });

    pb.collection('bids').subscribe('*', function () {
      getBids().then((res) => {
        setBids(res);
      });
    })

    pb.collection('questions').subscribe('*', function () {
      getAnswers().then((res) => {
        setAnswers(res);
      });
    })

  }, []);

  const healthBids = bids?.filter(bid => bid?.type === 'health')
  const coursesBids = bids?.filter(bid => bid?.type === 'course')

  const activeAnswers = answers?.filter(bid => bid?.status === 'created')
  const endedAndwers = answers?.filter(bid => bid?.status !== 'created')

  const priceBids = bids?.filter(bid => bid?.type === 'price' && bid?.status === 'created')
  const resortsBids = bids?.filter(bid => bid?.type === 'resort' && bid?.status === 'created')

  const priceBids1 = bids?.filter(bid => bid?.type === 'price' && bid?.status !== 'created')
  const resortsBids1 = bids?.filter(bid => bid?.type === 'resort' && bid?.status !== 'created')

  async function deleteWithdraw (id, bid) {
    await pb.collection(bid ? 'questions' : 'bids').update(id, {
      status: 'succ',
      admin: user?.email
    })
  }

  async function deleteWithdraw1 (id, bid) {
    await pb.collection(bid ? 'questions' : 'bids').update(id, {
      status: 'fall',
      admin: user?.email
    })
  }

  const removeWithdrawConfirm = (id, bid) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    labels: { confirm: 'Успешно', cancel: 'Отклонено'},
    children: (
      <></>
    ),
    onConfirm: () => deleteWithdraw(id, bid),
    onCancel: () => deleteWithdraw1(id, bid)
  })

  return (
    <>
      <div className="w-full">
        <Tabs>
          <Tabs.List grow>
            <Tabs.Tab value="question">Опросник</Tabs.Tab>
            <Tabs.Tab value="price">Прайс лист</Tabs.Tab>
            <Tabs.Tab value="resort">Курорты</Tabs.Tab>
            <Tabs.Tab value="question1">Опросник ( Завер. )</Tabs.Tab>
            <Tabs.Tab value="price1">Прайс лист ( Завер. )</Tabs.Tab>
            <Tabs.Tab value="resort1">Курорты ( Завер. )</Tabs.Tab>

            <Tabs.Tab value="123">Заявки органицазий</Tabs.Tab>

            <Tabs.Tab value="456">Заявки (дуальное об.)</Tabs.Tab>
            <Tabs.Tab value="456">Заявки (дуальное об.)</Tabs.Tab>
            <Tabs.Tab value="456">Заявки (дуальное об.)</Tabs.Tab>

            <Tabs.Tab value="789">Заявки (страхование)</Tabs.Tab>

            <Tabs.Tab value="zxc">Заявки (вакансии)</Tabs.Tab>

            <Tabs.Tab value="asd">Заявки (мир здоровья)</Tabs.Tab>

            <Tabs.Tab value="tours">Заявки (туры)</Tabs.Tab>

            <Tabs.Tab value="fund">Заявки (фонд)</Tabs.Tab>
          </Tabs.List>
          
          <Tabs.Panel value="123">
            <Tabs defaultValue="bids">
              <Tabs.List>
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
                            <div className='flex gap-4'>
                              <Textarea
                                autosize
                                value={w?.comment}
                                onChange={e => {
                                  const newQ = q?.map(r => {
                                    if (r?.id === w?.id) return {
                                      ...r, comment: e?.currentTarget?.value
                                    }
                                    return {...r}
                                  })
                                  setQ([...newQ])
                                }}
                              />
                              <BsCheckCircle
                                size={30} 
                                color='green'
                                // onClick={() => handleConfirmBid(q)}
                                onClick={async () => {
                                  openConfirmModal({
                                    labels: {cancel: 'Назад', confirm: 'Одобрить'},
                                    centered: true,
                                    onConfirm: async () => {
                                      await pb.collection('123').update(w?.id, {
                                        status: 'succ',
                                        comment: w?.comment
                                      })
                                      .then(() => {
                                        get123()
                                        .then(res => {
                                          setQ(res?.filter(w => w?.status === ''))
                                          setQs(res?.filter(w => w?.status === 'succ'))
                                          setQr(res?.filter(w => w?.status === 'ref'))
                                        })
                                      })
                                    }
                                    
                                  })
                                }}
                                className='cursor-pointer hover:fill-yellow-500'
                              />
                              <CiCircleRemove 
                                size={35}
                                color='red'
                                onClick={async () => {
                                  openConfirmModal({
                                    labels: {cancel: 'Назад', confirm: 'Одобрить'},
                                    centered: true,
                                    onConfirm: async () => {
                                      await pb.collection('123').update(w?.id, {
                                        status: 'ref',
                                        comment: w?.comment
                                      })
                                      .then(() => {
                                        get123()
                                        .then(res => {
                                          setQ(res?.filter(w => w?.status === ''))
                                          setQs(res?.filter(w => w?.status === 'succ'))
                                          setQr(res?.filter(w => w?.status === 'ref'))
                                        })
                                      })
                                    }
                                    
                                  })
                                }}
                                className='cursor-pointer hover:fill-yellow-500'
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
                          <td>
                            {w?.comment}
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
                          <td>
                            {w?.comment}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Tabs.Panel>
            </Tabs>
          </Tabs.Panel>

          <Tabs.Panel value="fund">
            <Tabs>
              <Tabs.List>
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
                            <div className='flex gap-4'>
                              <Textarea
                                autosize
                                value={w?.comment}
                                onChange={e => {
                                  const newQ = f?.map(r => {
                                    if (r?.id === w?.id) return {
                                      ...r, comment: e?.currentTarget?.value
                                    }
                                    return {...r}
                                  })
                                  setF([...newQ])
                                }}
                              />
                              <BsCheckCircle
                                size={30} 
                                color='green'
                                // onClick={() => handleConfirmBid(q)}
                                onClick={async () => {
                                  openConfirmModal({
                                    labels: {cancel: 'Назад', confirm: 'Одобрить'},
                                    centered: true,
                                    onConfirm: async () => {
                                      await pb.collection('fund_bids').update(w?.id, {
                                        status: 'succ',
                                        comment: w?.comment
                                      })
                                      .then(() => {
                                        getFundBids()
                                        .then(res => {
                                          setF(res?.filter(w => w?.status === ''))
                                          setFs(res?.filter(w => w?.status === 'succ'))
                                          setFr(res?.filter(w => w?.status === 'ref'))
                                        })
                                      })
                                    }
                                    
                                  })
                                }}
                                className='cursor-pointer hover:fill-yellow-500'
                              />
                              <CiCircleRemove 
                                size={35}
                                color='red'
                                onClick={async () => {
                                  openConfirmModal({
                                    labels: {cancel: 'Назад', confirm: 'Одобрить'},
                                    centered: true,
                                    onConfirm: async () => {
                                      await pb.collection('123').update(w?.id, {
                                        status: 'ref',
                                        comment: w?.comment
                                      })
                                      .then(() => {
                                        get123()
                                        .then(res => {
                                          setQ(res?.filter(w => w?.status === ''))
                                          setQs(res?.filter(w => w?.status === 'succ'))
                                          setQr(res?.filter(w => w?.status === 'ref'))
                                        })
                                      })
                                    }
                                    
                                  })
                                }}
                                className='cursor-pointer hover:fill-yellow-500'
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
                    {fs.map((w) => {
                      return (
                        <tr key={w?.id}>
                          <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                          <td>{w?.name}</td>
                          <td>{w?.email}</td>
                          <td>{w?.phone}</td>
                          <td>
                            {w?.comment}
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
                      <th>Наименование орг.</th>
                      <th>Эл. почта</th>
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
                          <td>{w?.email}</td>
                          <td>{w?.phone}</td>
                          <td>
                            {w?.comment}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Tabs.Panel>
            </Tabs>

          </Tabs.Panel>

          <Tabs.Panel value="tours">
            <Tabs defaultValue="bids">
              <Tabs.List>
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
                    {t?.map((w) => {
                      return (
                        <tr key={w?.id}>
                          <td>{dayjs(w?.created).format('YYYY-MM-DD')}</td>
                          <td>{w?.name}</td>
                          <td>{w?.phone}</td>
                          <td>
                            <div className='flex gap-4'>
                              <Textarea
                                autosize
                                value={w?.comment}
                                onChange={e => {
                                  const newQ = t?.map(r => {
                                    if (r?.id === w?.id) return {
                                      ...r, comment: e?.currentTarget?.value
                                    }
                                    return {...r}
                                  })
                                  setT([...newQ])
                                }}
                              />
                              <BsCheckCircle
                                size={30} 
                                color='green'
                                // onClick={() => handleConfirmBid(q)}
                                onClick={async () => {
                                  openConfirmModal({
                                    labels: {cancel: 'Назад', confirm: 'Одобрить'},
                                    centered: true,
                                    onConfirm: async () => {
                                      await pb.collection('tours_bids2').update(w?.id, {
                                        status: 'succ',
                                        comment: w?.comment
                                      })
                                      .then(() => {
                                        getToursBids()
                                        .then(res => {
                                          setT(res?.filter(w => w?.status === ''))
                                          setTs(res?.filter(w => w?.status === 'succ'))
                                          setTr(res?.filter(w => w?.status === 'ref'))
                                        })
                                      })
                                    }
                                    
                                  })
                                }}
                                className='cursor-pointer hover:fill-yellow-500'
                              />
                              <CiCircleRemove 
                                size={35}
                                color='red'
                                onClick={async () => {
                                  openConfirmModal({
                                    labels: {cancel: 'Назад', confirm: 'Одобрить'},
                                    centered: true,
                                    onConfirm: async () => {
                                      await pb.collection('123').update(w?.id, {
                                        status: 'ref',
                                        comment: w?.comment
                                      })
                                      .then(() => {
                                        getToursBids()
                                        .then(res => {
                                          setT(res?.filter(w => w?.status === ''))
                                          setTs(res?.filter(w => w?.status === 'succ'))
                                          setTr(res?.filter(w => w?.status === 'ref'))
                                        })
                                      })
                                    }
                                    
                                  })
                                }}
                                className='cursor-pointer hover:fill-yellow-500'
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
                          <td>
                            {w?.comment}
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
                          <td>
                            {w?.comment}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Tabs.Panel>
            </Tabs>
            

          </Tabs.Panel>

          <Tabs.Panel value="456">
            <Tabs defaultValue="bids">
              <Tabs.List>
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
                            <div className='flex gap-4'>
                              <Textarea
                                autosize
                                value={w?.comment}
                                onChange={e => {
                                  const newQ = d?.map(r => {
                                    if (r?.id === w?.id) return {
                                      ...r, comment: e?.currentTarget?.value
                                    }
                                    return {...r}
                                  })
                                  setD([...newQ])
                                }}
                              />
                              <BsCheckCircle
                                size={30} 
                                color='green'
                                // onClick={() => handleConfirmBid(q)}
                                onClick={async () => {
                                  openConfirmModal({
                                    labels: {cancel: 'Назад', confirm: 'Одобрить'},
                                    centered: true,
                                    onConfirm: async () => {
                                      await pb.collection('dual_bids').update(w?.id, {
                                        status: 'succ',
                                        comment: w?.comment
                                      })
                                      .then(() => {
                                        getDualBids()
                                        .then(res => {
                                          setD(res?.filter(w => w?.status === ''))
                                          setDs(res?.filter(w => w?.status === 'succ'))
                                          setDr(res?.filter(w => w?.status === 'ref'))
                                        })
                                      })
                                    }
                                    
                                  })
                                }}
                                className='cursor-pointer hover:fill-yellow-500'
                              />
                              <CiCircleRemove 
                                size={35}
                                color='red'
                                onClick={async () => {
                                  openConfirmModal({
                                    labels: {cancel: 'Назад', confirm: 'Одобрить'},
                                    centered: true,
                                    onConfirm: async () => {
                                      await pb.collection('dual_bids').update(w?.id, {
                                        status: 'ref',
                                        comment: w?.comment
                                      })
                                      .then(() => {
                                        getToursBids()
                                        .then(res => {
                                          setD(res?.filter(w => w?.status === ''))
                                          setDs(res?.filter(w => w?.status === 'succ'))
                                          setDr(res?.filter(w => w?.status === 'ref'))
                                        })
                                      })
                                    }
                                    
                                  })
                                }}
                                className='cursor-pointer hover:fill-yellow-500'
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
                          <td>
                            {w?.comment}
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
                          <td>
                            {w?.comment}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>

              </Tabs.Panel>
            </Tabs>
          </Tabs.Panel>

          
          
          <Tabs.Panel value="789">
            <Tabs defaultValue="bids">
              <Tabs.List>
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
                        <div className='flex gap-4'>
                                <Textarea
                                  autosize
                                  value={w?.comment}
                                  onChange={e => {
                                    const newQ = s?.map(r => {
                                      if (r?.id === w?.id) return {
                                        ...r, comment: e?.currentTarget?.value
                                      }
                                      return {...r}
                                    })
                                    sets([...newQ])
                                  }}
                                />
                                <BsCheckCircle
                                  size={30} 
                                  color='green'
                                  // onClick={() => handleConfirmBid(q)}
                                  onClick={async () => {
                                    openConfirmModal({
                                      labels: {cancel: 'Назад', confirm: 'Одобрить'},
                                      centered: true,
                                      onConfirm: async () => {
                                        await pb.collection('insurance_bids').update(w?.id, {
                                          status: 'succ',
                                          comment: w?.comment
                                        })
                                        .then(() => {
                                          getDualBids()
                                          .then(res => {
                                            setS(res?.filter(w => w?.status === ''))
                                            setSs(res?.filter(w => w?.status === 'succ'))
                                            setSr(res?.filter(w => w?.status === 'ref'))
                                          })
                                        })
                                      }
                                      
                                    })
                                  }}
                                  className='cursor-pointer hover:fill-yellow-500'
                                />
                                <CiCircleRemove 
                                  size={35}
                                  color='red'
                                  onClick={async () => {
                                    openConfirmModal({
                                      labels: {cancel: 'Назад', confirm: 'Одобрить'},
                                      centered: true,
                                      onConfirm: async () => {
                                        await pb.collection('insurance_bids').update(w?.id, {
                                          status: 'ref',
                                          comment: w?.comment
                                        })
                                        .then(() => {
                                          getToursBids()
                                          .then(res => {
                                            setS(res?.filter(w => w?.status === ''))
                                            setSs(res?.filter(w => w?.status === 'succ'))
                                            setSr(res?.filter(w => w?.status === 'ref'))
                                          })
                                        })
                                      }
                                      
                                    })
                                  }}
                                  className='cursor-pointer hover:fill-yellow-500'
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
                        <td>
                        {w?.comment}
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
                        <td>
                          {w?.comment}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
             </Table>
              </Tabs.Panel>
            </Tabs>

          </Tabs.Panel>
          <Tabs.Panel value="zxc">
            <Tabs value="bids">
              <Tabs.List>
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
                      <div className='flex gap-4'>
                                <Textarea
                                  autosize
                                  value={w?.comment}
                                  onChange={e => {
                                    const newQ = x?.map(r => {
                                      if (r?.id === w?.id) return {
                                        ...r, comment: e?.currentTarget?.value
                                      }
                                      return {...r}
                                    })
                                    setX([...newQ])
                                  }}
                                />
                                <BsCheckCircle
                                  size={30} 
                                  color='green'
                                  // onClick={() => handleConfirmBid(q)}
                                  onClick={async () => {
                                    openConfirmModal({
                                      labels: {cancel: 'Назад', confirm: 'Одобрить'},
                                      centered: true,
                                      onConfirm: async () => {
                                        await pb.collection('vaca_bids').update(w?.id, {
                                          status: 'succ',
                                          comment: w?.comment
                                        })
                                        .then(() => {
                                          getVacaBids()
                                          .then(res => {
                                            setX(res?.filter(w => w?.status === ''))
                                            setXs(res?.filter(w => w?.status === 'succ'))
                                            setXr(res?.filter(w => w?.status === 'ref'))
                                          })
                                        })
                                      }
                                      
                                    })
                                  }}
                                  className='cursor-pointer hover:fill-yellow-500'
                                />
                                <CiCircleRemove 
                                  size={35}
                                  color='red'
                                  onClick={async () => {
                                    openConfirmModal({
                                      labels: {cancel: 'Назад', confirm: 'Одобрить'},
                                      centered: true,
                                      onConfirm: async () => {
                                        await pb.collection('vaca_bids').update(w?.id, {
                                          status: 'ref',
                                          comment: w?.comment
                                        })
                                        .then(() => {
                                          getVacaBids()
                                          .then(res => {
                                            setX(res?.filter(w => w?.status === ''))
                                            setXs(res?.filter(w => w?.status === 'succ'))
                                            setXr(res?.filter(w => w?.status === 'ref'))
                                          })
                                        })
                                      }
                                      
                                    })
                                  }}
                                  className='cursor-pointer hover:fill-yellow-500'
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
                      <td>
                      {w?.comment}
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
                      <td>
                        {w?.comment}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
              </Tabs.Panel>
            </Tabs>
        
          </Tabs.Panel>
          <Tabs.Panel value="asd">

            <Tabs defaultValue="bids">
              <Tabs.List>
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
                      <div className='flex gap-4'>
                                <Textarea
                                  autosize
                                  value={w?.comment}
                                  onChange={e => {
                                    const newQ = h?.map(r => {
                                      if (r?.id === w?.id) return {
                                        ...r, comment: e?.currentTarget?.value
                                      }
                                      return {...r}
                                    })
                                    setH([...newQ])
                                  }}
                                />
                                <BsCheckCircle
                                  size={30} 
                                  color='green'
                                  // onClick={() => handleConfirmBid(q)}
                                  onClick={async () => {
                                    openConfirmModal({
                                      labels: {cancel: 'Назад', confirm: 'Одобрить'},
                                      centered: true,
                                      onConfirm: async () => {
                                        await pb.collection('health_bids').update(w?.id, {
                                          status: 'succ',
                                          comment: w?.comment
                                        })
                                        .then(() => {
                                          getVacaBids()
                                          .then(res => {
                                            setH(res?.filter(w => w?.status === ''))
                                            setHs(res?.filter(w => w?.status === 'succ'))
                                            setHr(res?.filter(w => w?.status === 'ref'))
                                          })
                                        })
                                      }
                                      
                                    })
                                  }}
                                  className='cursor-pointer hover:fill-yellow-500'
                                />
                                <CiCircleRemove 
                                  size={35}
                                  color='red'
                                  onClick={async () => {
                                    openConfirmModal({
                                      labels: {cancel: 'Назад', confirm: 'Одобрить'},
                                      centered: true,
                                      onConfirm: async () => {
                                        await pb.collection('health_bids').update(w?.id, {
                                          status: 'ref',
                                          comment: w?.comment
                                        })
                                        .then(() => {
                                          getVacaBids()
                                          .then(res => {
                                            setH(res?.filter(w => w?.status === ''))
                                            setHs(res?.filter(w => w?.status === 'succ'))
                                            setHr(res?.filter(w => w?.status === 'ref'))
                                          })
                                        })
                                      }
                                      
                                    })
                                  }}
                                  className='cursor-pointer hover:fill-yellow-500'
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
                      <td>
                      {w?.comment}
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
                      <td>
                        {w?.comment}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
              </Tabs.Panel>
            </Tabs>

          </Tabs.Panel>
          
          <Tabs.Panel value="question">
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
          <Tabs.Panel value="question1">
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
                  <BidsForm bid={bid} key={bid.id} ended/>
                ))}
              </tbody>
            </Table>
          </Tabs.Panel>

          <Tabs.Panel value="price">
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
                      <td>{dayjs(price?.created).format("YY-MM-DD, HH:mm")}</td>
                      <td>{price?.name}</td>
                      <td>{price?.email}</td>
                      <td>{price?.phone}</td>
                      <td>
                        <BiBadgeCheck
                          size={35}
                          color='red'
                          onClick={() => removeWithdrawConfirm(price?.id)}
                          className='cursor-pointer hover:fill-yellow-500'
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Tabs.Panel>
          <Tabs.Panel value="resort">
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
                        {dayjs(resort?.created).format("YY-MM-DD, HH:mm")}
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
                  );
                })}
              </tbody>
            </Table>
          </Tabs.Panel>
          <Tabs.Panel value="price1">
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
                      <td>{dayjs(price?.created).format("YY-MM-DD, HH:mm")}</td>
                      <td>{price?.name}</td>
                      <td>{price?.email}</td>
                      <td>{price?.phone}</td>
                      <td>{price?.status === 'succ' ? 'Успешно' : 'Отклонено'}</td>
                      <td>{price?.admin}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Tabs.Panel>
          <Tabs.Panel value="resort1">
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
                        {dayjs(resort?.created).format("YY-MM-DD, HH:mm")}
                      </td>
                      <td>{resort?.name}</td>
                      <td>{resort?.email}</td>
                      <td>{resort?.phone}</td>
                      <td>
                        <a href={`https://oz-elim.kz/resort/${resort?.data}`} target="_blank">
                          {resort?.data}
                        </a>
                      </td>
                      <td>{resort?.status === 'succ' ? 'Успешно' : 'Отклонено'}</td>
                      <td>{resort?.admin}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Tabs.Panel>
        </Tabs>
        {/* <h2 className="text-center text-2xl text-primary-600">
          Заявки на консультацию
        </h2>
        {answers?.map((bid) => (
          <BidsForm bid={bid} key={bid.id} />
        ))} */}
      </div>
    </>
  );
};
