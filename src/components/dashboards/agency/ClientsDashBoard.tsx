'use client'

import imageCover from 'public/assets/register/TopPost.jpg'
import AddClients from '@/components/modals/agency/addClients'
import useClients from '@/hooks/useClients'
import { inter, ptMono } from '@/app/fonts'
import SearchByTag from '../../inputs/searchByTag'
import TitlePage from '../../labels/titlePage'
import { useEffect, useState } from 'react'
import Search from '../../inputs/search'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Pagination from '@/components/pagination/pagination/pagination'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function ClientsDashBoard({ clientsFallback }: any) {

  const [page, setPage] = useState([0])
  const currentPage = page[page.length - 1]
  const limit = 10

  const { data, areClientsLoading, clientsError, refreshClients } = useClients(
    limit,
    currentPage * limit,
  )

  const loadMoreClients = () => {
    if (data?.hasMore) {
      setPage(prevPage => [...prevPage, prevPage[prevPage.length - 1] + 1])
    }
  }

  const loadPreviousClients = () => {
    setPage(prevPage => prevPage.slice(0, -1))
  }
  
  const totalPages = Math.ceil(data?.totalClients / limit)
  
  const [tagSelected, setSearchTags] = useState('')
  const [sort, setSort] = React.useState('')
  const [inputSearchValue, setInputSearchValue] = useState('')



  if (areClientsLoading) {
    return (
      <SkeletonTheme inline={false}>
      <p className='px-12'>
        <Skeleton borderRadius={'18px'} height={'100px'} count={1} />
      </p>
      <p className='px-12'>
        <Skeleton borderRadius={'18px'} height={'100px'} count={1} />
      </p>
      <p className='px-12'>
        <Skeleton borderRadius={'18px'} height={'100px'} count={1} />
      </p>
    </SkeletonTheme>
      )
  }
  
  const filteredClients = data?.clients?.filter((client: any) => {
    const clientNameMatches = client?.name
      .toLowerCase()
      .includes(inputSearchValue.toLowerCase())
    const tagFilterIsActive = !tagSelected ? false : true
    const tagSearchIsActive = inputSearchValue === '' ? false : true

    if (!tagSearchIsActive && !tagFilterIsActive) {
      return true
    } else if (tagFilterIsActive && tagSearchIsActive) {
      const tagsMatch = client?.tags.some(
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
        clientsFallback={data.clients}
        campaignsFallback={null}
        setSort={setSort}
      />

      <div className='flex flex-col bg-white'>
        <div className='flex items-start px-12 gap-3 justify-between overflow-x-auto mt-8 mb-8'>
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
                searchTags={data.clients}
              />
            </div>
          </div>

          <AddClients
            campaignsFallback={undefined}
            clientsFallback={data.clients}
            text={'add new'}
            icon={undefined}
          />
        </div>

        <Pagination
          pageLength={page.length}
          currentPage={currentPage}
          totalPages={totalPages}
          loadPrevious={loadPreviousClients}
          loadMore={loadMoreClients}
        />

        <div className='justify-start grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 2xl:grid-cols-4 gap-y-6 pb-48 px-12'> 
          {filteredClients?.length > 0 ? (
            filteredClients?.map((client: any, index: any) => (
              <Link
                href={`/dashboard/clients/${client.id || 1}`}
                key={index}
                className='h-80 w-full border-gray-100 relative'>
                <Image
                  priority
                  className={`h-64 w-full object-cover`}
                  src={client?.imageUrl || imageCover}
                  alt={client?.name}
                  width={320}
                  height={180}
                />
                <div className='h-auto border border-gray-200 bg-white px-2 py-4 pl-4'>
                  <p className={`text-lg font-medium text-gray-800`}>
                    {client?.name}
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
