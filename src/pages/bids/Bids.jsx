import React from "react";
import { Modal, Table, Tabs, TextInput } from "@mantine/core";
import dayjs from "dayjs";
import { pb } from "shared/api";
import { BidsForm } from "./BidsForm";
import { CiCircleRemove } from "react-icons/ci";
import { openConfirmModal } from "@mantine/modals";

import { BiAccessibility, BiBadgeCheck } from 'react-icons/bi'
import { useAuth } from "shared/hooks";

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

export const Bids = () => {

  const [answers, setAnswers] = React.useState([])
  const [bids, setBids] = React.useState([]);

  const [questions, setQuestions] = React.useState([])
  
  const [q, setQ] = React.useState([])
  
  const { user } = useAuth()

  React.useEffect(() => {
    get123()
    .then(res => {
      setQ(res)
    })

    getAnswers().then((res) => {
      setAnswers(res);
    });

    getQuestions().then(res => {
      setQuestions(res)
    })

    getBids().then((res) => {
      setBids(res);
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
            {/* <Tabs.Tab value="health">Оздоровление</Tabs.Tab> */}
            {/* <Tabs.Tab value="courses">Курсы туризма</Tabs.Tab> */}
            <Tabs.Tab value="price">Прайс лист</Tabs.Tab>
            <Tabs.Tab value="resort">Курорты</Tabs.Tab>
            <Tabs.Tab value="question1">Опросник ( Завер. )</Tabs.Tab>
            <Tabs.Tab value="price1">Прайс лист ( Завер. )</Tabs.Tab>
            <Tabs.Tab value="resort1">Курорты ( Завер. )</Tabs.Tab>
            <Tabs.Tab value="123">Заявки органицазий</Tabs.Tab>
          </Tabs.List>
          
          <Tabs.Panel value="123">
            <Table>
              <thead>
                <tr>
                  <th>Наименование орг.</th>
                  <th>Эл. почта</th>
                  <th>Номер телефона</th>
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
          {/* <Tabs.Panel value="health">
            <Table>
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Имя</th>
                  <th>Почта</th>
                  <th>Телефон</th>
                  <th>Дейтсвие</th>
                </tr>
              </thead>
              <tbody>
                {healthBids?.map((health) => {
                  return (
                    <tr key={health?.id}>
                      <td>
                        {dayjs(health?.created).format("YY-MM-DD, HH:mm")}
                      </td>
                      <td>{health?.name}</td>
                      <td>{health?.email}</td>
                      <td>{health?.phone}</td>
                      <td>
                        <CiCircleRemove
                          size={35}
                          color='red'
                          onClick={() => removeWithdrawConfirm(health?.id)}
                          className='cursor-pointer hover:fill-yellow-500'
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Tabs.Panel> */}
          {/* <Tabs.Panel value="courses">
            <Table>
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Имя</th>
                  <th>Почта</th>
                  <th>Телефон</th>
                  <th>Курс</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {coursesBids?.map((course) => {
                  return (
                    <tr key={course?.id}>
                      <td>
                        {dayjs(course?.created).format("YY-MM-DD, HH:mm")}
                      </td>
                      <td>{course?.name}</td>
                      <td>{course?.email}</td>
                      <td>{course?.phone}</td>
                      <td>{course?.data}</td>
                      <td>
                        <CiCircleRemove
                          size={35}
                          color='red'
                          onClick={() => removeWithdrawConfirm(course?.id)}
                          className='cursor-pointer hover:fill-yellow-500'
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Tabs.Panel> */}
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
