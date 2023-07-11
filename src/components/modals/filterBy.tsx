import { inter } from '@/app/fonts'
import { ptMono } from '@/app/fonts'
import React, { useState } from 'react'
import TagsInput from '../TagsInput'

export default function FilterBy(props: {
  type: string
  setCreatorsSelecteds: any
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  handleDisplay: any
}) {
  const [creator, setCreators] = React.useState([
    { id: 1, username: 'ma', creatorName: 'Creator', selected: false },
    { id: 2, username: 'cr', creatorName: 'Creator 2', selected: false },
    { id: 3, username: 'sa', creatorName: 'Creator 3', selected: false },
  ])

  const [searchValue, setSearchValue] = React.useState('')

  const handleClick = (id: number) => {
    setCreators(prevCreators =>
      prevCreators.map(creator => {
        if (creator.id === id) {
          return { ...creator, selected: !creator.selected }
        }
        return creator
      }),
    )
  }

  const searchedCreators = creator.filter(creatorKey =>
    creatorKey.username.toLowerCase().includes(searchValue.toLowerCase()),
  )

  const manageType = (key: any) => {
    switch (key) {
      case 'creator':
        return (
          <div className={`w-full justify-start ${ptMono.className}`}>
            <input
              onChange={event => {
                setSearchValue(event.target.value)
              }}
              type='text'
              id='default-input'
              placeholder='Search'
              className='w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
            />
            <p className={`text-xm mb-4 pb-2 pt-6 ${inter.className}`}>
              Select creators below to view only their posts
            </p>

            <div className='flex flex-wrap  gap-2'>
              {searchedCreators.map(creator => (
                <div
                  className={`flex w-auto flex-col rounded-lg bg-beigeSelected px-8 py-2 ${
                    creator.selected ? 'active-border' : ''
                  }`}
                  key={creator.username}
                  onClick={() => handleClick(creator.id)}
                  style={{
                    background: creator.selected ? '#F6EDEA' : '#F8F7F4',
                  }}>
                  <label className=''>@{creator.username}</label>
                  <label className='text-sm'>{creator.creatorName}</label>
                </div>
              ))}
            </div>

            <hr className='my-8 h-px border-0 bg-gray-200'></hr>

            <div className='text-right'>
              <button
                className='rounded-full bg-green-100 px-6 py-2'
                onClick={() => {
                  const selectedCreators = searchedCreators.filter(
                    creator => creator.selected,
                  )
                  props.setCreatorsSelecteds(selectedCreators)
                  props.handleDisplay()
                }}>
                filter creators
              </button>
            </div>
          </div>
        )
      case 'hashtag':
        return (
          <div>
            <TagsInput tags={props.tags} setTags={props.setTags} />
            <hr className='my-8 h-px border-0 bg-gray-200'></hr>

            <div className='text-right'>
              <button
                onClick={() => {
                  props.handleDisplay()
                }}
                className='rounded-full bg-green-100 px-6 py-2 '>
                filter hashtags
              </button>
            </div>
          </div>
        )
      default:
        break
    }
  }

  return <div>{manageType(props.type)}</div>
}
