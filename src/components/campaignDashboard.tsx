'use client'

import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import imageCover from 'public/assets/register/campaignCover.jpg'
import { Campaign } from '@prisma/client'
import Link from 'next/link'
import useCampaigns from '@/hooks/useCampaigns'
import ActionalTitle from './actionalTitle'

type Props = {
  campaignsFallback: (Campaign & {
    _count: {
      posts: number
    }
  })[]
  clientsFallback: any
}

export default function DashboardCampaign({
  campaignsFallback,
  clientsFallback,
}: Props) {
  const { areCampaignsLoading, campaigns, campaignsError, refreshCampaigns } =
    useCampaigns(campaignsFallback)
  const postData = campaigns

  return (
    <>
      <ActionalTitle
        title={'your campaigns'}
        frome={'campaigns'}
        campaigns={campaignsFallback}
        clients={clientsFallback}
        userPositionId={0} stats={undefined}
      />

      <div className='bg-white flex overflow-x-auto gap-4 md:px-12'>
        {postData.map((card: any, index: any) => (
          <Link
            href={`/dashboard/campaigns/${card.id}`}
            key={index}
            className={`bg-beigeTransparent border min-w-[250px] ${ptMono.className}`}>
            <Image
              className={`object-cover`}
              src={imageCover}
              alt={card.name}
              style={{ width: '250px', height: '310px' }}
            />
            <div className='mb-4 flex justify-between gap-4 px-6 pt-4'>
              <h5>{card.name}</h5>
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
                {card?._count?.creators || 0} {`creators`}
              </h4>
              <h4 className=' self-baseline rounded-full bg-white px-4 py-3 text-base'>
                {card?._count?.posts || 0} {`posts`}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
