import { Modal, Table, Tabs, TextInput } from "@mantine/core";
import dayjs from "dayjs";
import React from "react";
import { pb } from "shared/api";
import { BidsForm } from "./BidsForm";
import { CiCircleRemove } from "react-icons/ci";
import { openConfirmModal } from "@mantine/modals";

async function getAnswers () {
  return await pb.collection("questions").getFullList({
    filter: `question = false`,
  });
}
async function getBids () {
  return await pb.collection('bids').getFullList()
}

export const Bids = () => {

  const [answers, setAnswers] = React.useState([])
  const [bids, setBids] = React.useState([]);

  React.useEffect(() => {
    getAnswers().then((res) => {
      setAnswers(res);
    });

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
  const priceBids = bids?.filter(bid => bid?.type === 'price')

  async function deleteWithdraw (id) {
    await pb.collection('bids').delete(id)
  }

  const removeWithdrawConfirm = (id) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    labels: { confirm: 'Подтвердить', cancel: 'Отмена'},
    children: (
      <>Вы действительно хотите отклонить данную отправку?</>
    ),
    onConfirm: () => deleteWithdraw(id)
  })


  return (
    <>
      <div className="w-full">
        <Tabs>
          <Tabs.List grow>
            <Tabs.Tab value="question">Опросник</Tabs.Tab>
            <Tabs.Tab value="health">Здоровье</Tabs.Tab>
            <Tabs.Tab value="courses">Курсы</Tabs.Tab>
            <Tabs.Tab value="price">Прайс</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="question">
            {/* <Table className="mt-8" bg="white" striped>
              <thead>
                <tr>
                  <td>Имя</td>
                  <td>Телефон</td>
                  <td>Патология</td>
                  <td>Область</td>
                  <td>Дата</td>
                </tr>
              </thead>
              <tbody>
                {answers?.map((answer) => {
                  return (
                    <tr key={answer?.id}>
                      <td>{answer?.[3]}</td>
                      <td>{answer?.[4]}</td>
                      <td>{answer?.[1]}</td>
                      <td>{answer?.[2]}</td>
                      <td>
                        {dayjs(answer?.created).format("YY-MM-DD, HH:mm")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table> */}
            {answers?.map((bid) => (
              <BidsForm bid={bid} key={bid.id} />
            ))}
          </Tabs.Panel>
          <Tabs.Panel value="health">
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
          </Tabs.Panel>
          <Tabs.Panel value="courses">
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
                {coursesBids?.map((course) => {
                  return (
                    <tr key={course?.id}>
                      <td>
                        {dayjs(course?.created).format("YY-MM-DD, HH:mm")}
                      </td>
                      <td>{course?.name}</td>
                      <td>{course?.email}</td>
                      <td>{course?.phone}</td>
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
                        <CiCircleRemove
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
