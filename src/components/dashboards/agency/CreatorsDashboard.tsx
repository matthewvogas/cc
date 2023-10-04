'use client'

import { CreatorsByCampaignRes } from '@/types/creators/CreatorsByCampaignRes'
import imageCover from 'public/assets/register/campaignCover.jpg'
import { CampaignRes } from '@/types/campaign/campaignRes'
import { Client, Campaign } from '@prisma/client'
import useCampaigns from '@/hooks/useCampaigns'
import useCreators from '@/hooks/useCreators'
import { Dialog } from '@headlessui/react'
import { ptMono } from '@/app/fonts'
import TitlePage from '../../labels/titlePage'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import React from 'react'
import FilterCreators from '../../filters/filtersCreators'
import CreatorRow from '../../cards/agency/creators/creatorCard'
import AddCreators from '@/components/modals/agency/addCreators'

export default function CreatorsDashBoard({
  connectionsFallback,
  campaignsFallback,
  creatorsFallback,
  userCreatorsFallback,
  session,
}: {
  connectionsFallback: any
  campaignsFallback: CampaignRes
  creatorsFallback: any
  userCreatorsFallback: any
  session: any
}) {
  const { campaigns, areCampaignsLoading, campaignsError, refreshCampaigns } =
    useCampaigns(campaignsFallback)

  const [socialActiveFilter, setSocialActiveFilter] = useState<string[]>([])
  const [followerCountFilter, setFollowerCountFilter] = useState(0)
  const [followerCountFilterSecond, setFollowerCountFilterSecond] = useState(0)

  const [selectedCampaign, setSelectedCampaign] = useState('')

  const filters = {
    socialActiveFilter: socialActiveFilter,
    followerCountFilter: followerCountFilter,
    followerCountFilterSecond: followerCountFilterSecond,
    selectedCampaign: selectedCampaign,
  }

  const handleRemoveSocial = (red: any) => {
    const updatedSocialFilter = socialActiveFilter.filter(c => c !== red)
    setSocialActiveFilter(updatedSocialFilter)
  }

  const handleRemoveCount = (count: any) => {
    setFollowerCountFilter(0)
    setFollowerCountFilterSecond(0)
  }

  const handleRemoveCampaign = (count: any) => {
    setSelectedCampaign('')
  }

  return (
    <>
      <div className='flex h-full w-full flex-col gap-4 bg-white'>
        {/* <FilterCreators
          campaigns={campaigns}
          socialActiveFilter={socialActiveFilter}
          setSocialActiveFilter={setSocialActiveFilter}
          followerCountFilter={followerCountFilter}
          setFollowerCountFilter={setFollowerCountFilter}
          followerCountFilterSecond={followerCountFilterSecond}
          setFollowerCountFilterSecond={setFollowerCountFilterSecond}
          selectedCampaign={selectedCampaign}
          setSelectedCampaign={setSelectedCampaign}
          userCreators={userCreatorsFallback}
          session={session}
        /> */}
        <div className='flex justify-end mt-6 px-12'>
          <AddCreators userCreators={creatorsFallback} session={session} />
        </div>

        <div className='flex justify-start w-full gap-4 px-12'>
          {socialActiveFilter?.map((social: any, index: number) => (
            <div
              className={`flex flex-col rounded-xl bg-beigeSelected px-8 py-2`}
              key={index}>
              <div className='flex gap-2 items-center'>
                <label className={`${ptMono.className}`}>{social}</label>
                <button onClick={() => handleRemoveSocial(social)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-4 w-4'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* active follower count filter */}
        {followerCountFilter != 0 || followerCountFilterSecond != 0 ? (
          <div className='flex justify-start w-full gap-4 px-12'>
            <div
              className={`flex flex-col rounded-xl border-2 bg-beigeFirst border-beigeBorder px-8 py-2`}>
              <div className='flex gap-2 items-center'>
                <label className={`${ptMono.className}`}>
                  <p>
                    {followerCountFilter} - {followerCountFilterSecond}
                  </p>
                </label>
                <button onClick={() => handleRemoveCount(followerCountFilter)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-4 w-4'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {selectedCampaign != '' ? (
          <div className='flex justify-start w-full gap-4 px-12'>
            <div
              className={`flex flex-col rounded-xl  bg-beigeBorder px-8 py-2`}>
              <div className='flex gap-2 items-center'>
                <label className={`${ptMono.className}`}>
                  <p>{selectedCampaign}</p>
                </label>
                <button onClick={() => handleRemoveCampaign(selectedCampaign)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-4 w-4'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <CreatorRow
          comeFrom={'campigns'}
          connections={connectionsFallback}
          clients={[]}
          search={''}
          creatorsFilter={filters}
          campaigns={campaignsFallback}
          creators={userCreatorsFallback}
        />
      </div>
    </>
  )
}
