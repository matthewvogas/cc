'use client'

import PaginationScroll from '@/components/pagination/scroll/scroll'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import imageCover from 'public/assets/register/TopPost.jpg'
import ActionalTitle from '../../../labels/actionalTitle'
import 'react-loading-skeleton/dist/skeleton.css'
import useClients from '@/hooks/useClients'
import { inter, ptMono } from '@/app/fonts'
import { FiUsers } from 'react-icons/fi'
import { Client } from '@prisma/client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ClientCard({
  clientsFallback,
  campaignsFallback,
}: {
  clientsFallback: Client[]
  campaignsFallback: any
}) {
  const [page, setPage] = useState([0])
  const currentPage = page[page.length - 1]
  const limit = 5

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

  return (
    <>
      {' '}
      <ActionalTitle
        title={'your clients'}
        frome={'clients'}
        campaigns={campaignsFallback}
        clients={clientsFallback}
        userPositionId={0}
        stats={undefined}
      />{' '}
      <div className='justify-start grid grid-cols-2 md:grid-cols-5 xl:grid-cols-5 gap-x-6 2xl:grid-cols-5 gap-y-6  px-12'>
        {data.clients.length > 0 ? (
          data.clients.map((card: Client, index: any) => (
            <Link
              href={`/dashboard/clients/${card.id || 1}`}
              key={index}
              className='h-80 w-full border-gray-100 relative'>
              <Image
                priority
                className={`h-64 w-full object-cover`}
                src={card.imageUrl || imageCover}
                alt={card?.name || 'card'}
                width={320}
                height={180}
              />
              <div className=' h-auto border border-gray-200 bg-white px-2 py-4 pl-4'>
                <p
                  className={`text-lg font-medium text-gray-800 ${inter.className}`}>
                  {card.name}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className='min-h-[250px] min-w-[250px] opacity-40  '>
            <div className='border border-gray-200 w-[250px] h-[310px] gap-3 flex flex-col justify-center items-center p-12'>
              <FiUsers style={{ width: '24px' }} />
              <p
                className={` text-center text-base ${ptMono.className}`}>{`Looks like the party hasn't started yet. Create a new client to get the night started `}</p>
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
      <PaginationScroll
        pageLength={page.length}
        currentPage={currentPage}
        totalPages={totalPages}
        loadPrevious={loadPreviousClients}
        loadMore={loadMoreClients}
      />
    </>
  )
}
