import TagsInput from '@/components/inputs/tag'
import React, { useState } from 'react'
import { ptMono } from '@/app/fonts'
import { inter } from '@/app/fonts'

export default function inputSearchValue(props: {
  type: string
  creators: any
  creatorsSelecteds: any
  setCreatorsSelecteds: any
  tags: any
  setTags: any
  handleDialog: any
}) {
  const [searchValue, setSearchValue] = React.useState('')

  const handleClick = (creator: any) => {
    props.setCreatorsSelecteds((prevSelectedIds: any) => {
      if (prevSelectedIds.includes(creator.id)) {
        return prevSelectedIds.filter(
          (selectedId: any) => selectedId !== creator.id,
        )
      } else {
        return [...prevSelectedIds, creator]
      }
    })
  }

  const searchedCreators = props.creators?.filter(
    (creatorKey: { username: string }) =>
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

            <div className='flex flex-wrap gap-2 h-48 md:BUSINESS_TOKEN_DEWIh-auto justify-center md:justify-start overflow-scroll'>
              {searchedCreators.map((creator: any) => (
                <div
                  className={`flex w-full md:w-auto h-[42px] flex-col rounded-lg bg-beigeSelected px-8 py-2 ${
                    creator.selected ? 'active-border' : ''
                  }`}
                  key={creator.username}
                  onClick={() => {
                    handleClick(creator)
                  }}
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
                    (creator: any) => creator.selected,
                  )
                  props.handleDialog(false)
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
                  props.handleDialog(false)
                }}
                className='rounded-full bg-green-100 px-6 py-2 '>
                filter hashtags
              </button>
            </div>
          </div>
        )
      case 'campaign':
        return (
          <div>
            <TagsInput tags={props.tags} setTags={props.setTags} />
            <hr className='my-8 h-px border-0 bg-gray-200'></hr>

            <div className='text-right'>
              <button
                onClick={() => {
                  props.handleDialog(false)
                }}
                className='rounded-full bg-green-100 px-6 py-2 '>
                filter campaigns
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
