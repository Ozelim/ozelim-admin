import React from 'react'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'

import { LiaCalendarAlt, LiaConciergeBellSolid } from 'react-icons/lia'
import { CiPlane } from 'react-icons/ci'
import { formatNumber, getImageUrl } from 'shared/lib'

export const Card = ({resort, deleteable, handleDelete}) => {

  const [image, setImage] = React.useState(null)

  React.useEffect(() => {
    if (resort?.[1] instanceof File) {
      setImage(URL.createObjectURL(resort?.[1]))
    } else {
      setImage(getImageUrl(resort, resort?.[1]))
    }
  }, [resort])

  return (
    <div className='flex flex-col shadow-md h-full rounded-primary overflow-hidden max-w-[300px]'>
     {image ? 
        <img 
        src={image} 
        alt=""
        className='object-cover h-48 aspect-video' 
      />
      : 
      <div className='bg-slate-100 object-cover h-48 aspect-video'></div> 
    }
      <div className='p-4'>
        <Link 
          to={`/resort/${resort?.id}`}
        >
          <span className='text-lg font-head text-primary-600'>
            {resort?.title}
          </span>
        </Link>
        <p className='mt-1'>
          {resort?.region}
        </p>
        <ul className='mt-4'>
          <li className='flex items-center gap-2'>
            <LiaCalendarAlt className='text-xl text-slate-400'/>
            <span className='text'>c 21.01 по 21.02</span>
          </li>
          <li className='flex items-center gap-2'>
            <CiPlane className='text-xl text-slate-400'/>
            <span className='text'>Выезд с алматы</span>
          </li>
          <li className='flex items-center gap-2'>
            <LiaConciergeBellSolid className='text-xl text-slate-400'/>
            <span className='text'>Все включено</span>
          </li>
        </ul>
        <div className='mt-4'>
          <span className='text-xl text-primary-600'>{formatNumber(resort?.cost)} ₸</span>
        </div>
        <div className='mt-4'>
          {deleteable 
            ?
              <Button 
                fullWidth
                onClick={() => handleDelete(resort?.id)}
              >
                Удалить
              </Button>
            :
              <Button 
                fullWidth
              >
                Подробнее
              </Button>
          }
        </div>
      </div>
    </div>
  )
}
