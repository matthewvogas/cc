'use client'

import imageCover from 'public/assets/register/campaignCover.jpg'
import Link from 'next/link'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Client, Campaign } from '@prisma/client'
import TitlePage from '../titlePage'
import useCampaigns from '@/hooks/useCampaigns'
import { CampaignRes } from '@/types/campaign/campaignRes'
import useCreators from '@/hooks/useCreators'
import { CreatorsByCampaignRes } from '@/types/creators/CreatorsByCampaignRes'

import React from 'react'
import FilterCreators from '../filtersCreators'
import CreatorRow from '../creatorRow'

export default function CreatorsDashBoard({
  creatorsFallback,
  campaignsFallback,
}: {
  creatorsFallback: CreatorsByCampaignRes
  campaignsFallback: CampaignRes
}) {
  const { creators, areCreatorsLoading, creatorsError, refreshCreators } =
    useCreators(creatorsFallback)

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
      <TitlePage
        title={'Creators'}
        moduleText={'creators'}
        client={''}
        clientsFallback={null}
        campaignsFallback={null}
        setSort={null}
      />

      <div className='flex h-full w-full flex-col gap-4 bg-white'>
        <FilterCreators
          campaigns={campaigns}
          socialActiveFilter={socialActiveFilter}
          setSocialActiveFilter={setSocialActiveFilter}
          followerCountFilter={followerCountFilter}
          setFollowerCountFilter={setFollowerCountFilter}
          followerCountFilterSecond={followerCountFilterSecond}
          setFollowerCountFilterSecond={setFollowerCountFilterSecond}
          selectedCampaign={selectedCampaign}
          setSelectedCampaign={setSelectedCampaign}
        />

        {/* active social filter */}
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
          creators={creators}
          clients={[]}
          search={''}
          creatorsFilter={filters}
          campaign={undefined}
        />
      </div>
    </>
  )
}
