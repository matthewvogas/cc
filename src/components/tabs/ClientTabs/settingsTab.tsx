import coverImage from 'public/assets/campaigns/coverImage.png'
import { CampaignRes } from '@/types/campaign/campaignRes'
import { useRouter } from 'next/navigation'
import { inter } from '@/app/fonts'
import { useState } from 'react'
import Image from 'next/image'

export default function SettingsTab({ campaign }: { campaign: CampaignRes }) {
  const router = useRouter()
  const [campaignName, setCampaignName] = useState(campaign.name)
  const [clientName, setClientName] = useState('') // Nuevo estado para el nombre del cliente
  const [description, setDescription] = useState(campaign.description)
  const [fetchError, setFetchError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEdit = async () => {
    try {
      const res = await fetch(`/api/campaigns/${campaign.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: campaignName,
          description: description,
        }),
      })

      if (res.status === 200) router.refresh()
    } catch (error: any) {
      setFetchError(error?.message)
    }
  }

  return (
    <div className={`mt-7 w-full justify-start`}>
      <div className='flex flex-row justify-between'>
        <h5 className={`mb-2 text-xl font-medium px ml-12 ${inter.className}`}>
          Campaign settings
        </h5>
        <button
          className='mr-20 bg-[#D9F0F1] px-10 py-2 rounded-full'
          onClick={() => {
            handleEdit()
          }}>
          Update Information
        </button>
      </div>
      <div className='divider '></div>

      <form onSubmit={handleEdit} className='p-4 px-12 '>
        <div className='flex flex-col gap-6 mt-4'>
          <div className='flex w-full gap-5 '>
            <div className={`flex flex-col h-full gap-5 justify-between w-2/3`}>
              <div className=''>
                <label className={`text-sm`}>Campaign name</label>
                <input
                  value={campaignName}
                  onChange={e => setCampaignName(e.target.value)}
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
      </form>
    </div>
  )
}
