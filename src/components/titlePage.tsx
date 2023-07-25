'use client'
import { inter, ptMono } from '@/app/fonts'
import AddNewCampaign from './addNewCampaign'
import CampaignFilter from './campaignFilter'
import avatar from 'public/assets/register/avatar.jpg'
import angleDown from 'public/assets/register/angle-down.svg'
import FeatureNotImplemented from './ui/featureNotImplemented'
import React from 'react'
import Image from 'next/image'

// Style Variables
const ActionButtonStyle =
  'flex text-lg   border-rose-100 border-2 inline-block py-2.5 px-8 mx-2 text-back font-medium bg-transparent rounded-full  hover:bg-rose-100 '
const ActiveLabel =
  'flex items-center bg-active px-8 mx-2 py-2 rounded-full text-black text-lg '
const InActiveLabel =
  'bg-inactive px-8 mx-2 py-3 rounded-full text-black text-lg '

const campaigns = (
  title: string,
  createCampaign: any,
  createCampaignModal: any,
) => {
  return (
    <>
      <h3 className={`pb-8 align-middle text-2xl font-semibold text-gray-800 `}>
        {title}
      </h3>
      <div className={`flex ${ptMono.className}`}>
        <CampaignFilter />
        <AddNewCampaign
          createCampaign={createCampaign}
          campaignType={createCampaignModal}
        />
      </div>
    </>
  )
}

const singleCampaign = (
  title: string,
  client: string,
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
    <>
      <div>
        <h3
          className={`pb-8 align-middle text-[22px] font-medium text-gray-800 `}>
          {title}
        </h3>
        <div className='flex items-center'>
          <div className='avatar'>
            <div className='mask mask-circle mr-3 h-10 w-10'>
              <Image
                priority
                className={``}
                width={100}
                height={100}
                src={avatar}
                alt='background'
                unoptimized
              />
            </div>
            <p
              className={`flex items-center rounded-full text-base font-medium text-black`}>
              {client}
            </p>
          </div>
        </div>
      </div>
      <div className={`flex ${ptMono.className}`}>
        {/* <label className={`${ActionButtonStyle}`}>
        view as client
      </label> */}
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
                className={`${active == true ? '' : 'transform rotate-180'}`}
                width={100}
                height={100}
                src={angleDown}
                alt='background'
                unoptimized
              />
            </div>
          </button>
        </div>
      </div>
    </>
  )
}

const creators = (title: string) => {
  return (
    <>
      <div>
        <FeatureNotImplemented />
        <h3
          className={`pb-4 align-middle text-2xl font-semibold text-gray-800 `}>
          {title}
        </h3>
        <label className={`opacity-60 ${ptMono.className}`}>
          here you can invite and manage your creators between campaigns.
        </label>
      </div>
    </>
  )
}

const clients = (title: string, createClient: any) => {
  return (
    <>
      <h3 className={`pb-8 align-middle text-2xl font-semibold text-gray-800 `}>
        {title}
      </h3>
      <div className={`flex ${ptMono.className}`}>
        <CampaignFilter />
        <button
          onClick={() => createClient(true)}
          className={`${ActiveLabel} `}>
          add a client
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='ml-4 inline h-4 w-4'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
        </button>
      </div>
    </>
  )
}

export default function TitlePage(props: {
  title: String
  moduleText: String
  client: String
  createClient: any
  createCampaign: any
}) {
  const [active, setActive] = React.useState(true)

  const builder: any = (
    title: string,
    moduleText: string,
    client: string,
    createClient: any,
    createCampaign: any,
  ) => {
    switch (moduleText) {
      case 'clients':
        return clients(title, createClient)
      case 'creators':
        return creators(title)
      case 'singleCampaign':
        return singleCampaign(title, client, active, setActive)
      case 'campaigns':
        return campaigns(title, createCampaign[0], createCampaign[1])
      default:
        break
    }
  }

  return (
    <div className=' w-full pt-20 relative z-30'>
      <div className='mx-auto mb-8 w-full justify-between px-4 md:px-12'>
        <div className='w-full'>
          <div className={`flex items-center justify-between`}>
            {builder(
              props.title,
              props.moduleText,
              props.client,
              props.createClient,
              props.createCampaign,
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
