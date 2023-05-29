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

const Tabs = () => {
  const [openTab, setOpenTab] = React.useState(1)
  return (
    <>
      <div className='flex w-full flex-wrap'>
        <div className='w-full'>
          <div className='mb-8 md:px-12'>
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
                  <p>4</p>
                </div>
                <div className={openTab === 5 ? 'block' : 'hidden'} id='link3'>
                  <TabsToShare />
                </div>
                <div className={openTab === 6 ? 'block' : 'hidden'} id='link3'>
                  <p>6</p>
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
