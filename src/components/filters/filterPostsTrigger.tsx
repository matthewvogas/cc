'use client'

import angleDown from 'public/assets/register/angle-down.svg'
import Image from 'next/image'

type Props = {
  filterPosts: any
  setFilterPosts: any
}

export default function FilterPostsTrigger({
  filterPosts,
  setFilterPosts,
}: Props) {
  return (
    <button
      type='button'
      onClick={() => {
        filterPosts == 'hidden'
          ? setFilterPosts('block')
          : setFilterPosts('hidden')
      }}
      className={` flex border px-8 py-3 text-base rounded-full items-center p-2 text-black font-medium hover:border-gray-400  whitespace-nowrap`}>
      filters
      <Image
        src={angleDown}
        className={`ml-8 w-[22px] h-[22px] ${
          filterPosts == 'block' ? '' : 'rotate-180 transform-g'
        }`}
        alt=''
      />
    </button>
  )
}
