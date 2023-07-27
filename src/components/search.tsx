'use client'
import { PT_Mono } from 'next/font/google'
import { useState } from 'react'

// Fonts
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

export default function Search(props: {
  inputSearchValue: any
  setInputSearchValue: any
}) {
  const handleChange = (event: any) => {
    props.setInputSearchValue(event.target.value)
  }

  return (
    <div className='px-12'>
      <p className={`${ptMono.className} mb-2 text-sm`}>search</p>
      <input
        placeholder='Name'
        value={props.inputSearchValue}
        onChange={handleChange}
        className={`flex cursor-pointer content-center items-center justify-center gap-5 rounded-full border border-gray-400 px-6 py-2 text-gray-500 ${ptMono.className}  focus:outline-none`}
      />
    </div>
  )
}
