import { Tabs, TextInput } from "@mantine/core";
import React from "react";
import { pb } from "shared/api";
import { BidsForm } from "./BidsForm";

async function getBids () {
  const questions = await pb.collection('question').getFullList({
    filter: `question != true`,
  })
  const bids = await pb.collection('bids').getFullList()
  return {
    questions,
    bids,
  }
}

export const Bids = () => {
  const [bids, setBids] = React.useState([]);

  // async function getBids() {
  //   return await pb.collection("questions").getList(1, 50, {
  //     filter: `id != "111111111111111"`,
  //   });
  // }

  React.useEffect(() => {
    getBids().then((res) => {
      setBids(res);
    });
  }, []);

  return (
    <div className="w-full">
      <Tabs>
        <Tabs.List grow>
          <Tabs.Tab value="question">Опросник</Tabs.Tab>
          <Tabs.Tab value="health">Здоровье</Tabs.Tab>
          <Tabs.Tab value="courses">Курсы</Tabs.Tab>
          <Tabs.Tab value="price">Прайс</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="question">
          Опросник
        </Tabs.Panel>
        <Tabs.Panel value="health">
        health
        </Tabs.Panel>
        <Tabs.Panel value="courses">
        courses
        </Tabs.Panel>
        <Tabs.Panel value="price">
        price
        </Tabs.Panel>
      </Tabs>
      {/* <h2 className="text-center text-2xl text-primary-600">
        Заявки на консультацию
      </h2>
      {bids?.items?.map((bid) => (
        <BidsForm bid={bid} key={bid.id} />
      ))} */}
    </div>
  );
};
