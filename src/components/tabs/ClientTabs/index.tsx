'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import { Tab } from '@headlessui/react'
import imageCover from 'public/assets/register/campaignCover.jpg'
import coverImageClient from 'public/assets/uniqueClient/clientCoverPage.jpg'

import { useState } from 'react'
import TitleSingleClient from '@/components/titleSingleClient'

export default function ClientTabs({
  client,
  campaigns,
}: {
  client: any
  campaigns: any
}) {
  const [activeSocial, setActiveTab] = useState('Campaigns')

  return (
    <>
      <TitleSingleClient client={client} />

      <div>
        <Tab.Group>
          <Tab.List className={`flex gap-6 border-b-[#E4E3E2] border-b mt-16`}>
            <Tab
              className={` ml-12 p-2 text-base font-medium outline-none ${
                activeSocial === 'Campaigns'
                  ? 'border-b-4 border-[#7E7E7D]'
                  : 'opacity-50'
              }`}
              onClick={() => setActiveTab('Campaigns')}>
              Campaigns
            </Tab>
            <Tab
              className={`p-2 text-base font-medium outline-none ${
                activeSocial === 'Settings'
                  ? 'border-b-4 border-[#7E7E7D]'
                  : 'opacity-50'
              }`}
              onClick={() => setActiveTab('Settings')}>
              Settings
            </Tab>
          </Tab.List>
          <Tab.Panels>
            {/* panel 1 */}
            <Tab.Panel>
              <div className='flex mt-12 overflow-scroll overflow-y-hidden gap-4 md:px-12'>
                {campaigns.length > 0 ? (
                  campaigns.map((card: any, index: any) => (
                    <Link
                      href={`/dashboard/campaigns/${card.id}`}
                      key={index}
                      className={`inline-block bg-beigeTransparent border min-w-[250px] ${ptMono.className}`}>
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
                  ))
                ) : (
                  <p className='px-8 py-3 border-gray border rounded-lg mx-12 my-12 text-center bg-gray-100 '>
                    {' '}
                    This client has no campaigns
                  </p>
                )}
              </div>
            </Tab.Panel>

            {/* panel 2 */}

            <Tab.Panel>
              <p className='px-8 py-3 border-gray border rounded-lg mx-12 my-12 text-center bg-gray-100 '>
                {' '}
                under construction
              </p>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  )
}
