'use client'

import registerImage from 'public/assets/shareStats/statsBackground.jpg'
import Image from 'next/image'
import React from 'react'

export function SharedStat({ stats }: { stats: any }) {
  return (
    <>
      <div className='flex h-screen items-center justify-evenly px-14 py-20'>
        <Image
          src={registerImage}
          className='relative z-0 object-cover'
          fill
          alt='register-image'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-[#000000b0] to-transparent z-1'></div>
        {stats.map((stat: any, index: number) => (
          <div className='text-white z-10' key={index}>
            <h4 className=' font-medium text-3xl'>{stat.title}</h4>
            <span className='font-light'>{stat.description}</span>
          </div>
        ))}
      </div>
    </>
  )
}
