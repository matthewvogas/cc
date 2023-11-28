'use client'

import Pagination from '@/components/pagination/pagination/pagination'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import imageCover from 'public/assets/register/TopPost.jpg'
import ActionalTitle from '../../../labels/actionalTitle'
import useConnections from '@/hooks/useConnections'
import useClients from '@/hooks/useClients'
import { inter, ptMono } from '@/app/fonts'
import { FiUsers } from 'react-icons/fi'
import { Client } from '@prisma/client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function AgenciesCard({
  agencies,
  campaignsFallback,
}: {
  agencies: any
  campaignsFallback: any
}) {
  const [page, setPage] = useState([0])
  const currentPage = page[page.length - 1]
  const limit = 10

  const { data, areAgenciesLoading, agenciesError, refreshAgencies } =
    useConnections(limit, currentPage * limit)

  const loadMoreCconnections = () => {
    if (data?.hasMore) {
      setPage(prevPage => [...prevPage, prevPage[prevPage.length - 1] + 1])
    }
  }

  const loadPreviousConnections = () => {
    setPage(prevPage => prevPage.slice(0, -1))
  }

  const totalPages = Math.ceil(data?.totalAgencies / limit)

  if (areAgenciesLoading) {
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

  return (
    <>
      {' '}
      <ActionalTitle
        title={'Agencies you are connected with'}
        frome={'agencies'}
        campaigns={campaignsFallback}
        clients={agencies}
        userPositionId={0}
        stats={undefined}
      />{' '}
      <Pagination
        pageLength={page.length}
        currentPage={currentPage}
        totalPages={totalPages}
        loadPrevious={loadPreviousConnections}
        loadMore={loadMoreCconnections}
      />
      <div className='flex overflow-x-auto gap-4 md:px-12 mb-12'>
        {data.connections.length > 0 ? (
          data.connections.map((agency: any, index: any) => (
            <Link
              href={`/dashboard/clients/${agency.id || 1}`}
              key={index}
              className='min-h-[250px] min-w-[250px]  '>
              <Image
                priority
                className={`h-64 object-cover`}
                src={imageCover}
                alt={agency.user1.name || 'card'}
              />
              <div className=' h-auto border border-gray-200 bg-white px-2 py-4 pl-4'>
                <p
                  className={`text-lg font-medium text-gray-800 ${inter.className}`}>
                  {agency.user1.name}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className='min-h-[250px] min-w-[250px] opacity-40  '>
            <div className='border border-gray-200 w-[250px] h-[310px] gap-3 flex flex-col justify-center items-center p-12'>
              <FiUsers style={{ width: '24px' }} />
              <p
                className={` text-center text-base ${ptMono.className}`}>{`Looks like the party hasn't started yet. Connect with a Agency Now.`}</p>
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
    </>
  )
}
