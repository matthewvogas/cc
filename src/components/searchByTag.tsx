'use client'
import { PT_Mono } from 'next/font/google'
import { useState } from 'react'

// Fonts
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

export default function SearchByTag(props: {
  tagSelected: string
  setSearchTags: any
  searchTags: any
}) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setSearchTags(event.target.value)
  }

  return (
    <div className=''>
      <p className={`${ptMono.className} mb-2 text-sm`}>tags</p>
      <div className='relative inline-block'>
        <div
          className={`h-[42px] flex cursor-pointer content-center items-center justify-center gap-5 rounded-full bg-transparent border border-gray-400 px-6 py-2 text-gray-500 ${ptMono.className}`}>
          <select
            value={props.tagSelected}
            onChange={handleChange}
            className='bg-transparent outline-none cursor-pointer'>
            <option value={''}>search by tag</option>
            {props.searchTags.map(
              (tag: any, index: number) =>
                tag.tags?.map((tag: any, index: number) => (
                  <option key={index} value={tag.name}>
                    {tag.name}
                  </option>
                )),
            )}
          </select>
        </div>
      </div>
    </div>
  )
}
