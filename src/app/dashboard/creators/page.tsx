'use client'
import ButtonGroup from '@/components/buttonsGroup'
import TitlePage from '@/components/titlePage'
import ShareStat from '@/components/modals/shareStats'
import React from 'react'

export default async function creators() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4 bg-white'>
      <TitlePage
        title={'Creators'}
        moduleText={'creators'}
        client={''}
        createClient={null}
        createCampaign={null}
        setSort={null}
      />
      <ShareStat />
      <ButtonGroup title='' />
      {/* <CreatorRow comeFrom={'creators'} creators={} /> */}
    </div>
  )
}
