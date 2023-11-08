'use client'

import imageCover from 'public/assets/register/campaignCover.jpg'
import useCampaigns from '@/hooks/useCampaigns'
import ActionalTitle from '../../labels/actionalTitle'
import { Campaign } from '@prisma/client'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import Link from 'next/link'
import SingleStat from '../agency/singleStat'

type Props = {
  campaignsFallback: any
  agencies: any
  stats: any
  frome: string
  userPositionId: number
}

export default function StatsCreator({
  campaignsFallback,
  agencies,
  stats,
  frome,
  userPositionId,
}: Props) {
  const influencerStats = [
    {
      icon: '🥥',
      value: campaignsFallback.length,
      label: 'campaigns',
    },
    {
      icon: '',
      value: agencies.length,
      label: 'agencies',
    },
    // {
    //   icon: '',
    //   value: '4',
    //   label: 'agencies',
    // },
    // {
    //   icon: '',
    //   value: '124',
    //   label: 'posts',
    // },
    // {
    //   icon: '',
    //   value: '58,000',
    //   label: 'views',
    // },
    // {
    //   icon: '',
    //   value: '58,000',
    //   label: 'plays',
    // },
  ]

  return (
    <>
      {frome == 'dashboard' ? (
        <ActionalTitle
          userPositionId={userPositionId}
          title={'your stats stats at a glance'}
          frome={''}
          stats={stats}
          campaigns={campaignsFallback}
          clients={agencies}
        />
      ) : null}
      <div
        className={`${frome !== 'dashboard' ? 'bg-[#F8F7F4]' : ''} ${
          frome === 'campaign' ? 'bg-[#FCFBFA] mx-12 rounded-xl' : ''
        } ${
          frome === 'shareCampaign' ? 'h-full' : ''
        } gap-6 px-12 pb-8 pt-4 mb-12`}>
        {frome === 'campaign' && (
          <div className='flex'>
            <h3 className='mb-5 font-medium text-lg mr-32'>Content</h3>
            <h3 className='mb-5 font-medium text-lg ml-2 mr-80'>Result</h3>
            <h3 className='mb-5 font-medium text-lg ml-6'>Engagement</h3>
          </div>
        )}
        <SingleStat influencerStats={influencerStats} />
      </div>
    </>
  )
}
