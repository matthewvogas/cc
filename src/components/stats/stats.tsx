'use client'

import imageCover from 'public/assets/register/campaignCover.jpg'
import useCampaigns from '@/hooks/useCampaigns'
import ActionalTitle from '../labels/actionalTitle'
import { Campaign } from '@prisma/client'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  campaignsFallback: (Campaign & {
    _count: {
      posts: number
    }
  })[]
  clientsFallback: any
  stats: any
  frome: string
  userPositionId: number
}

export default function Stats({
  campaignsFallback,
  clientsFallback,
  stats,
  frome,
  userPositionId,
}: Props) {
  const { areCampaignsLoading, campaigns, campaignsError, refreshCampaigns } =
    useCampaigns(campaignsFallback)
  const postData = campaigns

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateRows: 'repeat(2, auto)',
    gridAutoFlow: 'column',
    justifyContent: 'flex-start',
  }

  const titleStatStyle = 'text-2xl font-medium'
  const descriptionStatStyle = 'text-sm'
  const statStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid black',
    borderColor: '#E6E6E3',
    paddingRight: '56px',
    marginRight: '56px',
    paddingBottom: '20px',
  }

  return (
    <>
      {frome == 'dashboard' ? (
        <ActionalTitle
          userPositionId={userPositionId}
          title={'stats at a glance'}
          frome={'stats'}
          stats={stats}
          campaigns={campaignsFallback}
          clients={clientsFallback}
        />
      ) : null}
      <div
        className={`${frome !== 'dashboard' ? 'bg-[#F8F7F4]' : ''} ${
          frome === 'campaign' ? 'bg-[#FCFBFA] mx-12 rounded-xl' : ''
        } ${frome === 'shareCampaign' ? 'h-full' : ''} gap-6 px-12 py-9`}>
        {frome === 'campaign' && (
          <h3 className='mb-5 font-medium text-lg'>Results</h3>
        )}

        <div style={gridContainerStyle}>
          {stats?.find((section: any) => section.section === 'private')?.data
            .length === 0 ? (
            <p className={`opacity-60`}>
              More information like, engagement rate, likes, views, etc. will be
              displayed soon.
            </p>
          ) : null}
          {stats
            ?.find((section: any) => section.section === 'private')
            ?.data.map((stat: any, index: number) => (
              <div
                key={index}
                style={{
                  ...statStyle,
                  ...(index > 1 && { borderRight: 'none', marginRight: '0px' }),
                }}>
                <h4 className={`${titleStatStyle}`}>{stat.title}</h4>
                <p className={`${descriptionStatStyle} ${ptMono.className}`}>
                  {stat.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
