'use client'
import coverImage from 'public/assets/campaigns/coverImage.png'
import React, { useState } from 'react'
import Image from 'next/image'
export default function CreatorsPortfolio() {
  {
    const [activeSocial, setActiveTab] = useState('Campaigns')

    const [name, setName] = useState('campaign.name')
    const [description, setDescription] = useState('campaign.description')
    const [fetchError, setFetchError] = useState('')
    const [loading, setLoading] = useState(false)

    return (
      <div>
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
          </form>
        </div>
      </div>
    )
  }
}
