import { ptMono } from '@/app/fonts'
import AddNewCampaign from './addNewCampaign'
import CampaignFilter from './campaignFilter'
import FeatureNotImplemented from './ui/featureNotImplemented'
import React from 'react'

// Fonts

// Style Variables
const ActionButtonStyle =
  'flex text-lg   border-rose-100 border-2 inline-block py-2.5 px-8 mx-2 text-back font-medium bg-transparent rounded-full  hover:bg-rose-100 '
const ActiveLabel =
  'flex items-center bg-active px-8 mx-2 py-3 rounded-full text-black text-lg '
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

const singleCampaign = (title: string, client: string) => {
  return (
    <>
      <div>
        <h3
          className={`pb-8 align-middle text-2xl font-semibold text-gray-800 `}>
          {title}
        </h3>
        <label
          className={`rounded-full bg-background px-8 py-2 text-sm text-black ${ptMono.className}`}>
          {client}
        </label>
      </div>
      <div className={`flex ${ptMono.className}`}>
        {/* <label className={`${ActionButtonStyle}`}>
        view as client
      </label> */}
        <label className={`${ActiveLabel}`}>active</label>
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
        return singleCampaign(title, client)
      case 'campaigns':
        return campaigns(title, createCampaign[0], createCampaign[1])
      default:
        break
    }
  }

  return (
    <div className='w-full pt-20 '>
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
