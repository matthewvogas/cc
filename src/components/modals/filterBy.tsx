import { inter } from '@/app/fonts'
import { ptMono } from '@/app/fonts'
import React from 'react'

export default function FilterBy() {
  const creator = [
    {
      username: 'mvttheo',
      creatorName: 'Creator Name',
    },
    {
      username: 'stmbind',
      creatorName: 'Creator Name',
    },
    {
      username: 'sophia',
      creatorName: 'Creator Name',
    },
  ]

  const [searchValue, setsearchValue] = React.useState('')

  const [creatorList, setCreator] = React.useState(creator)

  const searchedCreators = creatorList.filter(creatorKey =>
    creatorKey.username.toLowerCase().includes(searchValue.toLowerCase()),
  )

  return (
    <div>
      <div className={`w-full justify-start ${ptMono.className}`}>
        <input
          onChange={event => {
            setsearchValue(event.target.value)
          }}
          type='text'
          id='default-input'
          placeholder='Search'
          className='w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
        />
        <p className={`text-xm mb-4 pb-2 pt-6 ${inter.className}`}>
          Select creators below to view only their posts
        </p>

        <div className='flex flex-wrap justify-between gap-2'>
          {searchedCreators.map(creatorKey => (
            <div
              className='flex flex-col rounded-lg bg-beigeSelected px-8 py-2'
              key={creatorKey.username}>
              <label className=''>@{creatorKey.username}</label>
              <label className='text-sm'>{creatorKey.creatorName}</label>
            </div>
          ))}
        </div>

        <hr className='my-8 h-px border-0 bg-gray-200'></hr>

        <div className='text-right'>
          <button className='rounded-full bg-green-100 px-6 py-2 '>
            filter
          </button>
        </div>
      </div>
    </div>
  )
}
