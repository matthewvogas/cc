'use client'

import FilterCampaignsContainer from '@/components/filters/filterCampaignsContainer'
import imageCover from 'public/assets/register/campaignCover.jpg'
import img from '/public/assets/creatorRegister/exampleImage.jpg'
import angleDown from 'public/assets/register/angle-down.svg'
import { CampaignRes } from '@/types/campaign/campaignRes'
import AddCampaign from '../../modals/agency/addCampaigns'
import { Client, Campaign } from '@prisma/client'
import useCampaigns from '@/hooks/useCampaigns'
import TitlePage from '../../labels/titlePage'
import useClients from '@/hooks/useClients'
import { Dialog } from '@headlessui/react'
import { FiCoffee } from 'react-icons/fi'
import Search from '../../inputs/search'
import { ptMono } from '@/app/fonts'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CampaignsDashBoardInfluencer({
  campaignsFallback,
}: {
  campaignsFallback: any
}) {
  const [title, setTitle] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [hashtag, setHashtag] = useState('')
  const [clientId, setClientId] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [sort, setSort] = React.useState('')
  const [show, setShow] = React.useState('hidden')

  const [clientFilterSelected, setClientFilterSelected] = useState<number[]>([])
  const [clientNameFilterSelected, setClientNametFilterSelected] = useState('')
  const [inputSearchValue, setInputSearchValue] = useState('')
  const [tagSelected, setSearchTags] = useState('')

  // const filteredCampaigns = campaignsFallback.filter((campaign: any) => {
  //   if (clientFilterSelected.length == 0) {
  //     return true
  //   }

  //   if (campaign?.clientId == clientFilterSelected) {
  //     return true
  //   }

  //   return false
  // })

  return (
    <>
      <TitlePage
        title={'Your associated campaigns'}
        moduleText={'campaigns'}
        client={''}
        clientsFallback={null}
        campaignsFallback={campaignsFallback}
        setSort={setSort}
      />

      <div className='flex justify-between items-center px-12 w-full'>
        <div className='w-full'>
          {/* <div className='flex gap-4'>
            <button
              type='button'
              onClick={() => {
                show == 'hidden' ? setShow('block') : setShow('hidden')
              }}
              className={` flex border px-8 py-3 text-base rounded-full items-center p-2 text-black font-medium hover:border-gray-400  whitespace-nowrap`}>
              filters
              <Image
                src={angleDown}
                className={`ml-8 w-[22px] h-[22px]`}
                alt=''
              />
            </button>

            <button
              type='button'
              onClick={() => {}}
              className={`bg-[#D9F0F1] text-xm whitespace-nowrap text-base md:text-base items-center rounded-full p-2 px-8 py-3 text-gray-900 `}>
              top performing 🥥
            </button>

            <button
              type='button'
              onClick={() => {}}
              className={`px-8 py-3 text-base rounded-full items-center p-2 text-black font-medium whitespace-nowrap bg-beigeFirst`}>
              latest
            </button>
          </div> */}

          {/* <FilterCampaignsContainer
            show={show}
            campaignsFallback={campaignsFallback}
            clientsFallback={null}
          /> */}
        </div>
        <div className='mt-4'>
          {clientFilterSelected.length != 0 ? (
            <div
              className={`w-fit border flex flex-col rounded-full bg-white px-8 py-2`}>
              <div className='flex gap-2'>
                <label className={`${ptMono.className} mr-4`}>
                  {clientNameFilterSelected}
                </label>
                <button onClick={() => setClientFilterSelected([])}>
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
          ) : null}
        </div>
      </div>

      <div className='flex flex-col bg-white pt-12'>
        <div className='flex overflow-scroll overflow-y-hidden gap-4 md:px-12'>
          {campaignsFallback.length > 0 ? (
            campaignsFallback[0].user1.campaigns.map(
              (card: any, index: any) => {
                return (
                  <Link
                    href={`/dashboard/campaigns/${card.id}`}
                    key={index}
                    className={`bg-beigeTransparent border min-w-[250px]`}>
                    <Image
                      className={`object-cover`}
                      src={card.imageUrl || imageCover}
                      alt={card.name}
                      style={{ width: '250px', height: '310px' }}
                      height={310}
                      width={250}
                    />
                    <div className='mb-4 flex max-w-[250px] justify-between gap-4 px-6 pt-4'>
                      <div className='max-w-[200px] overflow-clip'>
                        {/* <h5 className='truncate font-medium text-base'>
                      
                      </h5> */}
                        <div className='flex justify-center items-center flex-row'>
                          <div className='flex  justify-center mask mask-circle mr-8 h-50 w-50'>
                            <Image
                              priority
                              className={`h-12 w-12`}
                              width={150}
                              src={img}
                              alt='background'
                            />
                          </div>
                          <div className='-ml-5'>
                            <span>{card.name}</span>
                          </div>
                        </div>
                      </div>
                      <div className='max-w-[50px]'></div>
                    </div>
                    <hr className='h-px bg-gray-200'></hr>
                    <div className={`flex px-6 py-[14px] ${ptMono.className}`}>
                      <div className='flex justify-center items-center space-x-20'>
                        {/* <h4 className=' self-baseline rounded-full bg-white px-4 py-3 text-base'>
                        {card?._count?.posts || 0} {`posts`}
                      </h4> */}

                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='h-5 w-5'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                )
              },
            )
          ) : (
            <div
              className={`bg-transparent border min-w-[250px] opacity-40 ${ptMono.className}`}>
              <div className='w-[250px] h-[310px] gap-3 flex flex-col justify-center items-center p-12'>
                <FiCoffee style={{ width: '24px' }} />
                <p className=' text-center text-base'>{`No campaigns in sight! Don't worry, they're just shy. Try a different search term or create a new one`}</p>
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
          <div className='absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent'></div>
        </div>
      </div>
    </>
  )
}
