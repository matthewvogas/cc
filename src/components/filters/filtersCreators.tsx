'use client'
import { ptMono } from '@/app/fonts'
import { useState } from 'react'
import React from 'react'
import AddCreators from '../modals/agency/addCreators'

const comment = [
  {
    label:
      'Manually adding creators is to assign posts to their profile and organize them within campaigns. To collect additional stats, invite creators to connect instead. ',
  },
  {
    label: '',
  },
]

type Props = {
  campaigns: any
  socialActiveFilter: any[]
  setSocialActiveFilter: any
  followerCountFilter: number
  setFollowerCountFilter: any
  followerCountFilterSecond: number
  setFollowerCountFilterSecond: any
  selectedCampaign: any
  setSelectedCampaign: any
  userCreators: any
  session: any
}

export default function FilterCreators({
  campaigns,
  socialActiveFilter,
  setSocialActiveFilter,
  followerCountFilter,
  setFollowerCountFilter,
  followerCountFilterSecond,
  setFollowerCountFilterSecond,
  selectedCampaign,
  setSelectedCampaign,
  userCreators,
  session,
}: Props) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [emails, setEmails] = useState<string[]>([])
  const [linkToShareInvite, setLinkToShareInvite] = useState<string[]>([])
  const [customRangeFirst, setCustomRangeFirst] = useState('')
  const [customRangeSecond, setCustomRangeSecond] = useState('')
  
  const handleInputChangeRangeFirst = (event: any) => {
    setCustomRangeFirst(event.target.value)
    setFollowerCountFilter(parseInt(event.target.value))
  }
  const handleInputChangeRangeSecond = (event: any) => {
    setCustomRangeSecond(event.target.value)
    setFollowerCountFilterSecond(parseInt(event.target.value))
  }

  const handleSelectCampaignChange = (event: any) => {
    setSelectedCampaign(event.target.value)
  }

  const handlSocialActiveClick = (social: string) => {
    if (socialActiveFilter.includes(social)) {
      const updatedPlatforms = socialActiveFilter.filter(
        (p: string) => p !== social,
      )
      setSocialActiveFilter(updatedPlatforms)
    } else {
      setSocialActiveFilter([...socialActiveFilter, social])
    }
  }

  return (
    <>
      <div className='my-5 flex w-full justify-between md:px-12 relative z-50'>
        <div>
          <div className='dropdown'>
            <label
              tabIndex={0}
              className={`flex cursor-pointer content-center items-center justify-center gap-5 rounded-full border border-gray-200 px-6 py-2 text-gray-500 ${ptMono.className}`}>
              Filter
              <svg
                fill='none'
                viewBox='0 0 26 26'
                strokeWidth='1.5'
                stroke='currentColor'
                className='text-midBlack ml-4 h-5 w-5'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                />
              </svg>
            </label>
            <div
              tabIndex={0}
              className={`dropdown-content rounded-box mt-2 w-auto border-2 border-gray-100 bg-white ${ptMono.className}`}>
              <div className='p-6'>
                <div className='mb-4 flex flex-row gap-2'>
                  <button
                    onClick={() => {
                      handlSocialActiveClick('instagram')
                    }}
                    className='rounded-full bg-beigeFirst px-6 py-2.5 hover:bg-beigeSelected'>
                    Instagram
                  </button>
                  <button
                    onClick={() => {
                      handlSocialActiveClick('tiktok')
                    }}
                    className='rounded-full bg-beigeFirst px-6 py-2.5 hover:bg-beigeSelected'>
                    TikTok
                  </button>
                </div>
                <label htmlFor=''>Follower count (in thousands)</label>
                <div className='my-4 flex flex-row gap-2'>
                  <button
                    onClick={() => {
                      setFollowerCountFilter(0)
                      setFollowerCountFilterSecond(10000)
                    }}
                    className='rounded-full border border-gray-200 bg-white px-6  py-2.5 hover:bg-gray-100'>
                    10
                  </button>
                  <button
                    onClick={() => {
                      setFollowerCountFilter(10000)
                      setFollowerCountFilterSecond(50000)
                    }}
                    className='rounded-full border border-gray-200 bg-white px-6  py-2.5 hover:bg-gray-100'>
                    10-50
                  </button>
                  <button
                    onClick={() => {
                      setFollowerCountFilter(50000)
                      setFollowerCountFilterSecond(100000)
                    }}
                    className='rounded-full border border-gray-200 bg-white px-6  py-2.5 hover:bg-gray-100'>
                    50-100
                  </button>
                  <button
                    onClick={() => {
                      setFollowerCountFilter(100000)
                      setFollowerCountFilterSecond(500000)
                    }}
                    className='rounded-full border border-gray-200 bg-white px-6  py-2.5 hover:bg-gray-100'>
                    100-500
                  </button>
                  <button
                    onClick={() => {
                      setFollowerCountFilter(500000)
                      setFollowerCountFilterSecond(100000000)
                    }}
                    className='rounded-full border border-gray-200 bg-white px-6  py-2.5 hover:bg-gray-100'>
                    +500
                  </button>
                </div>
                <label htmlFor=''>Custom range</label>
                <div className='flex gap-4'>
                  <input
                    type='number'
                    placeholder='Type here'
                    className='outline-none my-4 w-full max-w-xs rounded-md bg-beigeFirst p-2 pl-4 text-gray-600'
                    value={customRangeFirst}
                    onChange={handleInputChangeRangeFirst}
                  />
                  <input
                    type='number'
                    placeholder='Type here'
                    className='outline-none my-4 w-full max-w-xs rounded-md bg-beigeFirst p-2 pl-4 text-gray-600'
                    value={customRangeSecond}
                    onChange={handleInputChangeRangeSecond}
                  />
                </div>
                {Array.isArray(campaigns) && (
                  <div className='w-full'>
                    <label htmlFor=''>By Campaign</label>
                    <select
                      value={selectedCampaign}
                      onChange={handleSelectCampaignChange}
                      id='countries'
                      className='outline-none mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-rose-400 focus:ring-rose-300 '>
                      <option value={''}>Choose a Campaign</option>
                      {campaigns.map((campaign: any, index: number) => (
                        <option key={index}>{campaign.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* <AddCreators userCreators={userCreators} session={session} /> */}
        </div>
      </div>
    </>
  )
}
