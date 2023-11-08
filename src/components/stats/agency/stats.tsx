'use client'

import imageCover from 'public/assets/register/campaignCover.jpg'
import ActionalTitle from '@/components/labels/actionalTitle'
import useCampaigns from '@/hooks/useCampaigns'
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

  const leftBorderStatStyle: React.CSSProperties = {
    ...statStyle,
    borderLeft: '1px solid black',
    paddingLeft: '56px',
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
          <div className='flex'>
            <h3 className='mb-5 font-medium text-lg mr-32'>Content</h3>
            <h3 className='mb-5 font-medium text-lg ml-2 mr-80'>Result</h3>
            <h3 className='mb-5 font-medium text-lg ml-6'>Engagement</h3>
          </div>
        )}

        <div style={gridContainerStyle}>
          {stats
            ?.find((section: any) => section.section === 'private')
            ?.data.map((stat: any, index: number, statArray: any) => {
              let dynamicStyle = { ...statStyle }

              if (index > 1) {
                dynamicStyle.borderRight = 'none'
                dynamicStyle.marginRight = '0px'
              }

              if (index === 6 || index === 7) {
                dynamicStyle.borderLeft = '1px solid black'
                dynamicStyle.paddingLeft = '56px'
              }

              // Determine if this is one of the last two stats
              const isLastTwo = index >= statArray.length - 2
              const textClasses = `${descriptionStatStyle} ${
                isLastTwo ? 'text-green-500' : ''
              } ${ptMono.className}`

              return (
                <div key={index} style={dynamicStyle}>
                  <h4
                    className={`${titleStatStyle} ${
                      isLastTwo ? 'text-green-500' : ''
                    }`}>
                    {stat.title}
                  </h4>
                  <p className={textClasses}>{stat.description}</p>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}
