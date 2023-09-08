'use client'

import angleDown from 'public/assets/register/angle-down.svg'
import avatar from 'public/assets/register/avatar.jpg'
import { inter, ptMono } from '@/app/fonts'
import React, { useState } from 'react'
import Image from 'next/image'

const campaigns = (title: string, clientsFallback: any) => {
  return (
    <div
      style={{
        background:
          'linear-gradient(180deg, rgba(226, 222, 212, 0.75) 0%, rgba(226, 222, 212, 0.00) 65%)',
      }}
      className=' w-full pt-20 relative z-30 '>
      <div className='mx-auto mb-8 w-full justify-between px-4 md:px-12'>
        <div className='w-full'>
          <div>
            <div>
              <h3
                className={`pb-8 align-middle text-2xl font-semibold text-gray-800 `}>
                {title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const singleCampaign = (
  title: string,
  client: any,
  active: boolean,
  setActive: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const CampaignStatus = async () => {
    try {
      const status = document.getElementById('campaignStatusChange')
      status?.classList.remove('hidden')
      setTimeout(() => {
        status?.classList.add('hidden')
      }, 1000)
    } catch (err) {
      console.error('error ', err)
    }
  }

  return (
    <div className=' w-full pt-20 relative z-30 '>
      <div className='mx-auto mb-8 w-full justify-between px-4 md:px-12'>
        <div className='w-full'>
          <div>
            <h3 className={` text-[22px] font-medium text-gray-800 `}>
              {title}
            </h3>
            <div className='flex items-center justify-between mt-8 '>
              <div className='avatar flex items-center'>
                {client ? (
                  <div className=' mask mask-circle mr-3 h-10 w-10'>
                    <Image
                      priority
                      className={``}
                      width={100}
                      height={100}
                      src={client?.imageUrl || avatar}
                      alt='background'
                    />
                  </div>
                ) : null}

                <p
                  className={`flex items-center rounded-full text-base font-medium text-black`}>
                  {client?.name || ''}
                </p>
              </div>

              <div className='flex items-center gap-3'>
                <div
                  className={`w-[15px] h-[15px] ${
                    active == true ? 'bg-active' : 'bg-[#B6BDBA]'
                  } rounded-full`}></div>
                <label
                  className={`flex items-center  rounded-full text-black text-lg`}>
                  {active == true ? 'active' : 'inactive'}
                </label>
                <button
                  onClick={() => {
                    setActive(active == true ? false : true)
                    CampaignStatus()
                  }}>
                  <div
                    id='campaignStatusChange'
                    className={`${inter.className} fixed top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 px-4 py-2 border border-[#b6fcdb] bg-[#e9faf2] bg-opacity-90 text-sm rounded-md z-50 hidden`}>
                    status of campaig changed
                  </div>
                  <div className=' h-5 w-5'>
                    <Image
                      priority
                      className={`${
                        active == true ? '' : 'transform rotate-180'
                      }`}
                      width={100}
                      height={100}
                      src={angleDown}
                      alt='background'
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className={`flex ${ptMono.className}`}></div>
        </div>
      </div>
    </div>
  )
}

const creators = (title: string) => {
  return (
    <div className=' w-full pt-20 relative z-30 '>
      <div className='mx-auto mb-8 w-full justify-between px-4 md:px-12'>
        <div className='w-full'>
          <div>
            <h3
              className={`pb-4 align-middle text-2xl font-semibold text-gray-800 `}>
              {title}
            </h3>
            <label className={`opacity-60 ${ptMono.className}`}>
              here you can invite and manage your creators between campaigns.
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

const clients = (
  title: string,
  clientsFallback: any,
  setSort: React.Dispatch<React.SetStateAction<string>>,
) => {
  return (
    <div
      style={{
        background:
          'linear-gradient(180deg, rgba(226, 222, 212, 0.75) 0%, rgba(226, 222, 212, 0.00) 65%)',
      }}
      className=' w-full pt-20 relative z-30 '>
      <div className='mx-auto mb-8 w-full justify-between px-4 md:px-12'>
        <div className='w-full'>
          <div>
            <div>
              <h3
                className={`pb-8 align-middle text-2xl font-semibold text-gray-800 `}>
                {title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TitlePage(props: {
  title: String
  moduleText: String
  client: any
  clientsFallback: any
  campaignsFallback: any
  setSort: React.Dispatch<React.SetStateAction<string>> | any
}) {
  const [active, setActive] = React.useState(true)

  const builder: any = (
    title: string,
    moduleText: string,
    client: any,
    clientsFallback: any,
    campaignsFallback: any,
  ) => {
    switch (moduleText) {
      case 'clients':
        return clients(title, clientsFallback, campaignsFallback)
      case 'creators':
        return creators(title)
      case 'singleCampaign':
        return singleCampaign(title, client, active, setActive)
      case 'campaigns':
        return campaigns(title, clientsFallback)
      default:
        break
    }
  }

  return (
    <div className={`flex items-center justify-between`}>
      {builder(
        props.title,
        props.moduleText,
        props.client,
        props.clientsFallback,
        props.campaignsFallback,
      )}
    </div>
  )
}
