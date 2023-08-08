import React from 'react'
import { NewsCard } from 'widgets'

export const News = () => {
  return (
    <div className='w-full'>
      <div className="grid grid-cols-1 gap-6">
        {Array(6).fill(1).map((_, i) => {
          return <NewsCard key={i}/>
        })}
      </div>
    </div>
  )
}
