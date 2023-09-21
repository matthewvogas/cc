import Stats from '@/components/stats/agency/stats'
import React, { useMemo, useState } from 'react'
import CardPortfolio from './cardPortfolio'
import Image from 'next/image'
import PerformingContent from './performingContent'

export default function CampaignsPortfolio() {
  const stats = [
    {
      section: 'private',
      data: [
        { title: '50', description: 'brand posts' },
        { title: '50,000', description: 'likes' },
        { title: '10', description: 'campaigns' },
        { title: '35,000', description: 'views' },
        { title: '5000', description: 'comments' },
      ],
    },
    {
      section: 'public',
      data: [{ title: 'creators.length', description: 'creators' }],
    },
  ]

  return (
    <div>
      <section>
        <div className='flex flex-row justify-between items-center mt-10 p-10'>
          <h2 className='font-semibold text-lg'>Campaigns</h2>
          <button className='border px-10 py-2 rounded-full'>edit</button>
        </div>

        <div className='flex flex-row gap-10 justify-evenly mt-10'>
          <CardPortfolio />
          <CardPortfolio />
          <CardPortfolio />
          <CardPortfolio />
        </div>
      </section>

      <section className='mt-20 bg-sidebarBackground'>
        <div className='p-10 flex justify-end'>
          <button className='border px-10 py-2 rounded-full '>edit</button>
        </div>
        <div>
          <Stats
            campaignsFallback={[]}
            clientsFallback={undefined}
            stats={stats}
            frome={''}
            userPositionId={0}
          />
        </div>
      </section>

      <section className='mt-10'>
        <div className=''>
          <PerformingContent />
          <div className='flex-row flex gap-20 mt-10 ml-10 '>
            <CardPortfolio />
            <CardPortfolio />
            <CardPortfolio />
            <CardPortfolio />
          </div>
        </div>
      </section>
    </div>
  )
}
