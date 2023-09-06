'use client'

import Link from 'next/link'
import Image from 'next/image'
import { inter, ptMono } from '@/app/fonts'
import { Tab } from '@headlessui/react'
import imageCover from 'public/assets/register/campaignCover.jpg'
import { useState } from 'react'
import TitleSingleClient from '@/components/titleSingleClient'
import { useRouter } from 'next/router'
import coverImage from 'public/assets/campaigns/coverImage.png'

export default function ClientTabs({
  client,
  campaigns,
}: {
  client: any
  campaigns: any
}) {
  const [activeSocial, setActiveTab] = useState('Campaigns')

  const [name, setName] = useState('campaign.name')
  const [description, setDescription] = useState('campaign.description')
  const [fetchError, setFetchError] = useState('')
  const [loading, setLoading] = useState(false)

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
                  <p
                    className={`px-8 py-3 border-gray border rounded-full text-center bg-[#F4F2EE] ${ptMono.className}`}>
                    {' '}
                    This client has no campaigns
                  </p>
                )}
              </div>
            </Tab.Panel>

            {/* panel 2 */}

            <Tab.Panel>
              <div className={`mt-7 w-full justify-start`}>
                <form className='p-4 px-12 '>
                  <div className='flex flex-col gap-6 mt-4'>
                    <div className='flex w-full gap-5 '>
                      <div className='flex flex-col gap-8 w-2/3'>
                        <div>
                          <label className={`text-sm`}>Client name</label>
                          <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type='text'
                            id='default-input'
                            placeholder='Campaign Name'
                            className={`mt-2 w-full rounded-lg border border-gray-300  p-3.5 px-6 text-base text-gray-900 focus:outline-0`}
                          />
                        </div>

                        <div>
                          <div className='flex flex-col h-full'>
                            <p className={`text-sm`}>Your cover image</p>
                            <Image
                              className={`object-cover mt-2 rounded-xl w-full h-[200px] p-2 border outline-none`}
                              src={coverImage}
                              alt={''}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='w-full'>
                        <Image className={`w-full`} src={coverImage} alt={''} />
                      </div>
                    </div>

                    <div className='flex w-full gap-6'>
                      <div className='w-2/3 flex gap-6 flex-col'></div>
                    </div>
                  </div>

                  {/* <p className={`text-xm pb-2 pt-6 `}>add a cover image</p>
                  <div className='flex justify-between'>
                    <div>
                      <input
                        type='file'
                        id='default-input'
                        placeholder='#example'
                        className=' mt-2 w-full rounded-full border border-gray-300 bg-gray-50 p-2 px-6 text-sm text-gray-900 focus:outline-0'
                      />
                    </div>
                  </div> */}
                </form>

                {/* <button
                  type='submit'
                  className='mr-6 w-72 rounded-full bg-green-200 px-8 py-2'>
                  save changes
                </button> */}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  )
}
