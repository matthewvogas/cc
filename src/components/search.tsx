'use client'
import { PT_Mono } from 'next/font/google'

// Fonts
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

export default function Search() {
  return (
    <div>
      <p className={`${ptMono.className} mb-2 text-sm`}>Search</p>
      <input
        placeholder='Name'
        className={`flex cursor-pointer content-center items-center justify-center gap-5 rounded-full border-2 border-gray-200 px-6 py-2 text-gray-500 ${ptMono.className}  focus:outline-none`}
      />
    </div>
  )
}
