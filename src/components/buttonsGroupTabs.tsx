'use client'
import React from 'react'
import TabsToShare from './tabsToShare'
import CampaignCard from '@/components/campaignCard'
import CreatorRow from '@/components/creatorRow'
import Search from '@/components/search'
import Tags from '@/components/tags'
import CreatorCard from './postCard'
import OverviewCampaign from './overviewCampaign'
import ButtonGroup from './buttonsGroup'
import SettingsTab from './settingsTab'
import TopPost from './topPost'
import RelationalTopPost from './relationalTopPost'
import SingleStat from './stats/singleStat'
import SinglePlatform from './stats/singlePlatform'
import CampaignSocialStat from './stats/CampaignSocialStat'
import DashboardCampaign from './campaignDashboard'
import ClientStat from './clientStat'

const Tabs = () => {
  const [openTab, setOpenTab] = React.useState(1)
  return (
    <>
      <div className='flex w-full flex-wrap'>
        <div className='w-full'>
          <div className='mb-8 md:px-6'>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(1)
              }}
              data-toggle='tab'
              role='tablist'
              className='text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8 py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200 '>
              overview
            </button>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(2)
              }}
              data-toggle='tab'
              role='tablist'
              className='text-xm -mb-px mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8 py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200'>
              creators
            </button>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(3)
              }}
              data-toggle='tab'
              role='tablist'
              className='text-xm -mb-px mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8 py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200'>
              posts
            </button>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(4)
              }}
              data-toggle='tab'
              role='tablist'
              className='text-xm -mb-px mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8  py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200'>
              stats
            </button>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(5)
              }}
              className='text-xm -mb-px mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8  py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200'>
              share
            </button>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(6)
              }}
              className='text-xm -mb-px mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8  py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200'>
              settings
            </button>
          </div>

          <div className='relative mb-6 flex w-full min-w-0 flex-col break-words bg-white '>
            <div className='flex-auto '>
              <div className='tab-content tab-space'>
                <div className={openTab === 1 ? 'block' : 'hidden'} id='link1'>
                  <div className='pt-6'>
                    <OverviewCampaign />
                  </div>

                  <ButtonGroup title={'Grid'} />

                  <div className='pt-6'>
                    <CreatorCard />
                  </div>

                  {/* <p>
                    <div className='flex w-full justify-start  gap-4 py-5 md:px-12'>
                      <Search />
                      <Tags />
                    </div>
                    <div className='pt-6'>
                      <CampaignCard />
                    </div>
                    <CreatorRow />
                  </p> */}
                </div>
                <div className={openTab === 2 ? 'block' : 'hidden'} id='link2'>
                  <CreatorRow />
                </div>
                <div className={openTab === 3 ? 'block' : 'hidden'} id='link3'>
                  <CreatorCard />
                </div>
                <div className={openTab === 4 ? 'block' : 'hidden'} id='link3'>

                  <div className='flex gap-8'>

                    <div className='w-96 px-12'>
                      <p className='text-xl my-8 font-bold'>Stats</p>
                      <div className='flex flex-col gap-4'>
                        <ClientStat />
                        <ClientStat />
                      </div>
                      <p className='italic my-8'>by platform</p>
                      <SinglePlatform />
                    </div>

                    <div className=''>
                      <div className='h-96'></div>
                      
                      
                      <p className='mt-12 mb-8'>Top posts by views</p>

                      <div className='flex gap-6'>
                      <CampaignSocialStat />
                      <CampaignSocialStat />
                      <CampaignSocialStat />
                      </div>

                      <TopPost />

                      <p className='mt-12 mb-8'>Creators who drive the most views</p>

                      <RelationalTopPost />
                    </div>
                  </div>

                </div>
                <div className={openTab === 5 ? 'block' : 'hidden'} id='link3'>
                  <TabsToShare />
                </div>
                <div className={openTab === 6 ? 'block' : 'hidden'} id='link3'>
                  <SettingsTab />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function ButtonsGroupTabs() {
  return (
    <>
      <Tabs />
    </>
  )
}
