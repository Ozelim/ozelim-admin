import React from 'react'
import { ActionIcon, FileInput } from '@mantine/core'
import { AiOutlineDelete } from 'react-icons/ai'

export const Doc = ({ label, file, index, errors, onChange, onDelete, className,}) => {

  return (
    <div>
      {file instanceof File 
        ? file?.name
        : file
      }
      {file && (
        <ActionIcon color="red" onClick={() => onDelete(index)}>
          <AiOutlineDelete />
        </ActionIcon>
      )}
      <FileInput
        label={label}
        onChange={(e) => onChange(e, index)}
        variant="filled"
        className="max-w-[120px] "
        withAsterisk
        // error={errors?.[index]?.[0]}
      />
    </div>
  )
}
