import React from 'react'

export const PriceCard = ({price}) => {
  return (
    <div
			className="grow flex flex-col md:flex-row justify-between shadow-md rounded-primary p-4 bg-white"
    >
			<p className="font-medium">
				{price?.title}
			</p>
			<div className="flex flex-col items-center">
				<div className="text-blue-500 text-xl font-bold">{price?.cost}</div>
			</div>
		</div>
  )
}
