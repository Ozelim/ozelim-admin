import React from 'react'
import { AiOutlineInstagram, AiOutlinePhone } from 'react-icons/ai'
import { Button } from '@mantine/core'

export const BomjPlaza = ({resort}) => {

  return (
    <div className="flex justify-between items-center max-w-2xl shadow-md border p-4 rounded-primary w-full bg-white" >
      <div className='flex flex-col'>
        <div className="hover:border-green-500 hover:text-green-500 transition-all border-solid rounded-md font-bold text-2xl font-head">
          {resort?.title} 
        </div>
        <p className="text-sm text">
          {resort?.region}
        </p>
        <div className=''>
          <p className='flex gap-4 mt-4'>
            {resort?.diseas?.map(q => {
              return <span className='text-blue-400'>{q}</span>
            })}
          </p>
          <p className='flex gap-4'>
            <span className='text-sm text'>
              Адрес:
            </span>
            <span>
              {resort?.adress}
            </span>
          </p>
          <p className='flex gap-4'>
            <span className='text-sm text'>
              Стоимость:
            </span>
            <span>
              {resort?.cost}
            </span>
          </p>
          <p className='flex gap-4'>
            <span className='text-sm text'>
              Телефон:
            </span>
            <span>
              {resort?.phone}
            </span>
          </p>
          <p className='flex gap-4'>
            <span className='text-sm text'>
              Почта:
            </span>
            <span>
              {resort?.email}
            </span>
          </p>
          <p className='flex gap-4'>
            <span className='text-sm text'>
              Доп услуги:
            </span>
            <span>
              {resort?.content}
            </span>
          </p>
          <p className='flex gap-4'>
            <span className='text-sm text'>
              Доп инфо:
            </span>
            <span>
              {resort?.info}
            </span>
          </p>
        </div>
      </div>
      <div className='flex gap-4 text-primary-500'>
        {resort?.inst && (
          <Button variant='outline' p={8} radius={9999}>
            <AiOutlineInstagram className='text-2xl' />
          </Button>
        )}
        {resort?.whats && (
          <Button variant='outline' p={8} radius={9999}>
            <AiOutlinePhone className='text-2xl' />
          </Button>
        )}
      </div>
    </div>
  )
}
