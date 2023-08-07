import React from 'react'

export const BomjCard = ({resort}) => {
  return (
    <div className="flex">
      <button className="mr-60 hover:border-green-500 hover:text-green-500 transition-all border-black border-[1px] border-solid rounded-md  px-12">
        {resort?.region}
      </button>
      <div>
        <p>{resort?.title}</p>
        <p className="text-xs">{resort?.adress}</p>
      </div>
    </div>
  )
}
