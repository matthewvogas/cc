import coverImage from 'public/assets/campaigns/coverImage.png'
import { CampaignRes } from '@/types/campaign/campaignRes'
import { useRouter } from 'next/navigation'
import { inter } from '@/app/fonts'
import { useState } from 'react'
import Image from 'next/image'

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
    <div className={`mt-7 w-full justify-start`}>
      <h5 className={`mb-2 text-xl font-medium px-12 ${inter.className}`}>
        Campaign settings
      </h5>

      <div className='divider '></div>

      <form onSubmit={handleEdit} className='p-4 px-12 '>
        <div className='flex flex-col gap-6 mt-4'>
          <div className='flex w-full gap-5 '>
            <div className={`flex flex-col h-full gap-5 justify-between w-2/3`}>
              <div className=''>
                <label className={`text-sm`}>Campaign name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type='text'
                  id='default-input'
                  placeholder='Campaign Name'
                  className={`mt-2 w-full rounded-lg border border-gray-300  p-3.5 px-6 text-base text-gray-900 focus:outline-0`}
                />
              </div>
              <div className=''>
                <label className={`text-sm`}>Client</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type='text'
                  id='default-input'
                  placeholder='Campaign Name'
                  className={`mt-2 w-full rounded-lg border border-gray-300  p-3.5 px-6 text-base text-gray-900 focus:outline-0`}
                />
              </div>
            </div>

            <div className=' flex flex-col w-full '>
              <p className={`text-sm`}>Campaign description</p>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                name=''
                id=''
                placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                className={`mt-2 w-full h-full rounded-lg border border-gray-300  p-3.5 px-6 text-base text-gray-900 focus:outline-0`}
              />
            </div>
          </div>

          <div className='flex w-full gap-6'>
            <div className='w-2/3 flex gap-6 flex-col'>
              <div className='flex flex-col h-full'>
                <p className={`text-sm`}>Your cover image</p>
                <Image
                  className={`object-cover mt-2 rounded-xl w-full h-[200px] p-2 border outline-none`}
                  src={coverImage}
                  alt={''}
                />
              </div>
              <div className='flex flex-col h-full'>
                <p className={`text-sm`}>Custom CSS</p>
                <textarea
                  placeholder='>>>'
                  name=''
                  id=''
                  className='resize-none mt-2 bg-[#F7F5F1] rounded-xl w-full h-full p-6 outline-none'></textarea>
              </div>
            </div>
            <div className='w-full'>
              <Image className={`w-full`} src={coverImage} alt={''} />
            </div>
          </div>
        </div>

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
      </form>

      {/* <button
        type='submit'
        className='mr-6 w-72 rounded-full bg-green-200 px-8 py-2'>
        save changes
      </button> */}
    </div>
  )
}
