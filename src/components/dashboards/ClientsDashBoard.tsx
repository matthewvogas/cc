'use client'

import useSWR from 'swr'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Search from '../search'
import { useState } from 'react'
import { ptMono } from '@/app/fonts'
import TitlePage from '../titlePage'
import CreatorRow from '../creatorRow'
import SearchByTag from '../searchByTag'
import useClients from '@/hooks/useClients'
import imageCover from 'public/assets/register/TopPost.jpg'
import AddClients from '../modals/addClients'

export default function ClientsDashBoard({ clientsFallback }: any) {
  const { clients, areClientsLoading, clientsError, refreshClients } =
    useClients(clientsFallback)

  const [tagSelected, setSearchTags] = useState('')
  const [sort, setSort] = React.useState('')
  const [inputSearchValue, setInputSearchValue] = useState('')

  const filteredClients = clients.filter((client: any) => {
    const clientNameMatches = client.name
      .toLowerCase()
      .includes(inputSearchValue.toLowerCase())
    const tagFilterIsActive = !tagSelected ? false : true
    const tagSearchIsActive = inputSearchValue === '' ? false : true

    if (!tagSearchIsActive && !tagFilterIsActive) {
      return true
    } else if (tagFilterIsActive && tagSearchIsActive) {
      const tagsMatch = client.tags.some(
        (tag: { name: string }) => tag.name === tagSelected,
      )
      return clientNameMatches && tagsMatch
    } else if (tagFilterIsActive) {
      return client.tags.some(
        (tag: { name: string }) => tag.name === tagSelected,
      )
    } else if (tagSearchIsActive) {
      return clientNameMatches
    }
  })

  return (
    <>
      <TitlePage
        title={'Clients'}
        moduleText={'clients'}
        client={''}
        clientsFallback={clients}
        campaignsFallback={null}
        setSort={setSort}
      />

      <div className='flex flex-col bg-white'>
        <div className='flex items-start px-12 gap-3 justify-between overflow-x-auto mt-8'>
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
                searchTags={clients}
              />
            </div>
          </div>

          <AddClients
            campaignsFallback={undefined}
            clientsFallback={clients}
            text={'add new'}
            icon={undefined}
          />
        </div>
        <div className='mt-12 flex gap-4 md:px-12 flex-wrap'>
          {filteredClients.map((client: any, index: any) => (
            <Link
              href={`/dashboard/clients/${client.id || 1}`}
              key={index}
              className='h-80 min-w-[320px] w-80 border-gray-100 relative'>
              <Image
                priority
                className={`h-64 object-cover`}
                src={client.image || imageCover}
                alt={client.name}
              />
              <div className='h-auto border border-gray-200 bg-white px-2 py-4 pl-4'>
                <p className={`text-lg font-medium text-gray-800`}>
                  {client.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
