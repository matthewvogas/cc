'use client'

import imageCover from 'public/assets/register/TopPost.jpg'
import SearchByTag from '../../inputs/searchByTag'
import TitlePage from '../../labels/titlePage'
import { inter, ptMono } from '@/app/fonts'
import Search from '../../inputs/search'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AgenciesDashBoard({ agenciesConnections }: any) {
  const [tagSelected, setSearchTags] = useState('')
  const [sort, setSort] = React.useState('')
  const [inputSearchValue, setInputSearchValue] = useState('')

  const filteredAgencies = agenciesConnections.filter((agency: any) => {
    const agencyNameMatches = agency.user1.name
      .toLowerCase()
      .includes(inputSearchValue.toLowerCase())
    const tagFilterIsActive = !tagSelected ? false : true
    const tagSearchIsActive = inputSearchValue === '' ? false : true

    if (!tagSearchIsActive && !tagFilterIsActive) {
      return true
    } else if (tagFilterIsActive && tagSearchIsActive) {
      const tagsMatch = agency.tags.some(
        (tag: { name: string }) => tag.name === tagSelected,
      )
      return agencyNameMatches && tagsMatch
    } else if (tagFilterIsActive) {
      return agency.tags.some(
        (tag: { name: string }) => tag.name === tagSelected,
      )
    } else if (tagSearchIsActive) {
      return agencyNameMatches
    }
  })
  return (
    <>
      <TitlePage
        title={'Agencies'}
        moduleText={'agencies'}
        client={''}
        clientsFallback={null}
        campaignsFallback={null}
        setSort={setSort}
      />

      <div className='flex flex-col bg-white'>
        <div className='flex px-12 gap-3 items-end justify-between overflow-x-auto mt-8'>
          <div className=' flex gap-3'>
            <div>
              <p className={`${ptMono.className} mb-2 text-sm`}>by Name</p>
              <Search
                inputSearchValue={inputSearchValue}
                setInputSearchValue={setInputSearchValue}
              />
            </div>
            <div>
              <p className={`${ptMono.className} mb-2 text-sm`}>tags</p>
              <SearchByTag
                setSearchTags={setSearchTags}
                tagSelected={tagSelected}
                searchTags={agenciesConnections}
              />
            </div>
          </div>

          <button onClick={() => {}}>
            <label
              tabIndex={0}
              className={`bg-[#E9F7F0] flex bg-text-lg align-center items-center border-rose-100 mx-2 px-9 py-3 text-back font-medium h-14 rounded-full cursor-pointer`}>
              connect with a new agency 🥥
            </label>
          </button>
        </div>
        <div className='mt-12 flex gap-4 md:px-12 flex-wrap'>
          {filteredAgencies.length > 0 ? (
            filteredAgencies.map((agency: any, index: any) => (
              <Link
                href={`/dashboard/agencies/${agency.id || 1}`}
                key={index}
                className='h-80 min-w-[320px] w-80 border-gray-100 relative '>
                <Image
                  priority
                  className={` object-cover`}
                  src={agency.image || imageCover}
                  alt={agency.user1.name}
                />
                <div className='h-auto border border-gray-200 px-2 py-4 pl-4'>
                  <p className={`text-lg font-medium text-gray-800`}>
                    {agency.user1.name}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className='min-h-[250px] min-w-[250px] opacity-40  '>
              <div className='border border-gray-200 w-[250px] h-[310px] gap-3 flex flex-col justify-center items-center p-12'>
                <p className={` text-center text-base ${ptMono.className}`}>
                  Create as many clients as you want and associate them to your
                  campaigns
                </p>
              </div>
              <div className=' h-auto border border-gray-200 bg-white px-2 py-4 pl-4'>
                <p
                  className={`text-lg font-medium text-gray-800 ${inter.className}`}>
                  - - -
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
