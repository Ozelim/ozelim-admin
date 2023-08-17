import { TextInput } from "@mantine/core";
import React from "react";
import { pb } from "shared/api";
import { BidsForm } from "./BidsForm";

export const Bids = () => {
  const [bids, setBids] = React.useState([]);

  async function getBids() {
    return await pb.collection("questions").getList(1, 50, {
      filter: `id != "111111111111111"`,
    });
  }

  console.log(bids);

  React.useEffect(() => {
    getBids().then((res) => {
      console.log(res);
      setBids(res);
    });
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-center text-2xl text-primary-600">
        Заявки на консультацию
      </h2>
      {bids?.items?.map((bid) => (
        <BidsForm bid={bid} key={bid.id} />
      ))}
    </div>
  );
};
