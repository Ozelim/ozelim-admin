import React from "react";
import { ActionIcon, Button, FileInput, clsx } from "@mantine/core";

import { AiOutlineDelete } from "react-icons/ai";
import { getImageUrl } from "shared/lib";
// import useModal from '../../../../hooks/useModal'

export function Image({
  label,
  record,
  image,
  index,
  errors,
  onChange,
  onDelete,
  className,
}) {

  return (
    <div>
      {image ? (
        <div className="flex items-center">
          <img
            src={
              image instanceof File
                ? URL.createObjectURL(image)
                : getImageUrl(record, image)
            }
            alt=""
            className={clsx("w-80 rounded-lg", className)}
            // onClick={() => openModal.image({innerProps: {
            //   record: variant,
            //   url: variant?.[type]
            // }})}
          />
          <ActionIcon color="red" onClick={() => onDelete(index)}>
            <AiOutlineDelete />
          </ActionIcon>
        </div>
      ) : (
        <FileInput
          label={label}
          onChange={(e) => onChange(e, index)}
          variant="filled"
          className="max-w-[120px] "
          withAsterisk
          // error={errors?.[index]?.[0]}
        />
      )}
    </div>
  );
}
