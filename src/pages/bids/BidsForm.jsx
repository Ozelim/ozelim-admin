import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { Controller } from "react-hook-form";

export const BidsForm = ({ bid }) => {
  const [opened, { open, close }] = useDisclosure(false);

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
          <div>{bid?.created}</div>
        </form>
      </div>
      <Modal opened={opened} onClose={close}>
        <div>
          <TextInput readOnly label="Ваше имя?" placeholder={bid?.[1]} />
          <TextInput
            readOnly
            label="Какая у вас Область?"
            placeholder={bid?.[2]}
          />
          <TextInput
            readOnly
            label="Какая у вас болезнь?"
            placeholder={bid?.[3]}
          />
          <TextInput readOnly label="Ваш телефон?" placeholder={bid?.[4]} />
        </div>
      </Modal>
    </div>
  );
};
