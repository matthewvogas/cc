'use client'
import { ptMono } from '@/app/fonts'
import { useState } from 'react'

export default function Search(props: {
  inputSearchValue: any
  setInputSearchValue: any
}) {
  const handleChange = (event: any) => {
    props.setInputSearchValue(event.target.value)
  }

  return (
    <>
      <input
        placeholder='search'
        value={props.inputSearchValue}
        onChange={handleChange}
        className={`flex cursor-pointer content-center items-center justify-center gap-5 rounded-full border border-gray-400 px-6 py-2 text-gray-500 ${ptMono.className}  focus:outline-none`}
      />
    </>
  )
}
