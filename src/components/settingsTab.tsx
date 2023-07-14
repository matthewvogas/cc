import { inter } from '@/app/fonts'
import { ptMono } from '@/app/fonts'
import { CampaignRes } from '@/types/campaign/campaignRes'
import { fetcher } from '@/utils/ValidationsHelper'
import { Campaign } from '@prisma/client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SettingsTab({ campaign }: { campaign: CampaignRes }) {
  const router = useRouter()
  const [name, setName] = useState(campaign.name)
  const [description, setDescription] = useState(campaign.description)
  const [fetchError, setFetchError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEdit = async (e: any) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/campaigns', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          id: campaign.id,
        }),
      })

      if (res.status === 200) router.refresh()
    } catch (error: any) {
      setFetchError(error?.message)
    }
  }

  return (
    <div className={`mt-7 w-full justify-start md:px-12 ${ptMono.className}`}>
      <h5 className={`mb-2 text-2xl font-bold ${inter.className}`}>Settings</h5>

      <form onSubmit={handleEdit} className='p-4 '>
        <div className={`$ flex gap-5`}>
          <div className='mt-4 w-full '>
            <label className={`text-xm pb-2 pt-6`}>campaign title</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              type='text'
              id='default-input'
              placeholder='Campaign Name'
              className={`${ptMono.className} mt-2 w-full rounded-full border border-gray-300 bg-gray-50 p-3.5 px-6 text-lg text-gray-900 focus:outline-0`}
            />
          </div>
        </div>

        <p className={`text-xm pb-2 pt-6`}>campaign description</p>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          name=''
          id=''
          placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          className={`${ptMono.className} h-44  w-full rounded-r-3xl rounded-s-3xl border border-gray-300 bg-gray-50 p-3.5 px-6 text-lg  text-gray-900 focus:outline-0`}
        />
        {/*
        <p className={`text-xm pb-2 pt-6 `}>add a cover image</p>
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
        <button
          type='submit'
          className='mr-6 w-72 rounded-full bg-green-200 px-8 py-2'>
          save changes
        </button>
      </form>
    </div>
  )
}
