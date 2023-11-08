import React from 'react'

export default function InfoCards(props: { description: string }) {
  return (
    <div className=' flex w-full flex-col gap-3 rounded-xl bg-white px-6 pb-4 lg:pb-8 pt-4 text-center shadow-[1px_2px_20px_0px_#bbbbbb6b]  '>
      <p className='text-base'>🥥</p>
      <h4 className='font-[#4F3727] text-base font-semibold text-[#4F3727]'>
        {props.description}
      </h4>
    </div>
  )
}
