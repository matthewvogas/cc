'use client'

import PaginationScroll from '@/components/pagination/scroll/scroll'
import imageCover from 'public/assets/register/campaignCover.jpg'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ActionalTitle from '../../../labels/actionalTitle'
import 'react-loading-skeleton/dist/skeleton.css'
import useCampaigns from '@/hooks/useCampaigns'
import { FiCoffee } from 'react-icons/fi'
import { Campaign } from '@prisma/client'
import { ptMono } from '@/app/fonts'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  campaignsFallback: (Campaign & {
    _count: {
      posts: number
    }
  })[]
  clientsFallback: any
}

export default function CampaignCard({
  campaignsFallback,
  clientsFallback,
}: Props) {
  const [page, setPage] = useState([0])
  const currentPage = page[page.length - 1]
  const limit = 5

  const { data, areCampaignsLoading, campaignsError, refreshCampaigns } =
    useCampaigns(Number(limit), Number(currentPage * limit))

  const loadMoreCampaigns = () => {
    if (data?.hasMore) {
      setPage(prevPage => [...prevPage, prevPage[prevPage.length - 1] + 1])
    }
  }

  const loadPreviousCampaigns = () => {
    setPage(prevPage => prevPage.slice(0, -1))
  }

  const totalPages = Math.ceil(data?.totalCampaigns / limit)

  if (areCampaignsLoading) {
    return (
      <SkeletonTheme>
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
      <ActionalTitle
        title={'your campaigns'}
        frome={'campaigns'}
        campaigns={campaignsFallback}
        clients={clientsFallback}
        userPositionId={0}
        stats={undefined}
      />

      <div className='justify-start grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 2xl:grid-cols-5 gap-y-6 px-12'>
        {data.campaigns.length > 0 ? (
          data.campaigns.map((card: any, index: any) => (
            <Link
              href={`/dashboard/campaigns/${card.id}`}
              key={index}
              className={`bg-beigeTransparent border min-w-[236px]`}>
              <Image
                className={` w-full h-80 object-cover`}
                src={card.imageUrl || imageCover}
                alt={card.name}
                width={250}
                height={310}
              />
              <div className='mb-4 flex max-w-[250px] justify-between gap-4 px-6 pt-4'>
                <div className='max-w-[200px] overflow-clip'>
                  <h5 className='truncate font-medium text-base'>
                    {card.name}
                  </h5>
                </div>
                <div className='max-w-[50px]'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-6 w-6'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                    />
                  </svg>
                </div>
              </div>
              <hr className=' h-px bg-gray-200'></hr>
              <div
                className={`flex  flex-col gap-2 px-6 py-[14px] ${ptMono.className}`}>
                <h4 className=' self-baseline rounded-full bg-white px-4 py-3 text-base'>
                  {card?._count?.creators || 0} {`creators`}
                </h4>
                <h4 className=' self-baseline rounded-full bg-white px-4 py-3 text-base'>
                  {card?._count?.posts || 0} {`posts`}
                </h4>
              </div>
            </Link>
          ))
        ) : (
          <div
            className={`bg-transparent border min-w-[250px] opacity-40 ${ptMono.className}`}>
            <div className='w-[250px] h-[310px] gap-3 flex flex-col justify-center items-center p-12'>
              <FiCoffee style={{ width: '24px' }} />
              <p className=' text-center text-base'>
                grab a cup of coffee and start creating a campaign
              </p>
            </div>
            <div className='mb-4 flex justify-between gap-4 px-6 pt-4'>
              <h5>- - - -</h5>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className=' ml-8 h-6 w-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                />
              </svg>
            </div>
            <hr className=' h-px bg-gray-200'></hr>
            <div className='flex  flex-col gap-2 px-6 py-[14px]'>
              <h4 className=' self-baseline rounded-full bg-white px-4 py-3 text-base'>
                - - {`creators`}
              </h4>
              <h4 className=' self-baseline rounded-full bg-white px-4 py-3 text-base'>
                - - {`posts`}
              </h4>
            </div>
          </div>
        )}
      </div>
      <PaginationScroll
        pageLength={page.length}
        currentPage={currentPage}
        totalPages={totalPages}
        loadPrevious={loadPreviousCampaigns}
        loadMore={loadMoreCampaigns}
      />
    </>
  )
}
