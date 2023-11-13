import coverImage from 'public/assets/campaigns/coverImage.png'
import { CampaignRes } from '@/types/campaign/campaignRes'
import { useRouter } from 'next/navigation'
import { inter } from '@/app/fonts'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import imageCompression from 'browser-image-compression'

export default function SettingsTab({
  campaign,
  client,
}: {
  client: any
  campaign: CampaignRes
}) {
  const router = useRouter()
  const [campaignName, setCampaignName] = useState(campaign.name)
  const [description, setDescription] = useState(campaign.description)
  const [fetchError, setFetchError] = useState('')
  const [showChangeText, setShowChangeText] = useState(false)
  const [image, setImage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

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
  const handleCreate = async () => {
    const formData = new FormData()
    formData.append('name', selectedFile!.name)
    formData.append('image', selectedFile!)

    try {
      const res = await fetch(`/api/clients/${client.id}/cover`, {
        method: 'POST',
        body: formData,
      })
      if (res.status === 200) {
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemove = async () => {
    try {
      const res = await fetch(`/api/campaigns/${campaign.id}`, {
        method: 'DELETE',
      })

      if (res.status === 200)
        router.push('/dashboard/campaigns'), router.refresh()
    } catch (error: any) {
      setFetchError(error?.message)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const originalFile = e.target.files[0]
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }
      try {
        const compressedFile = await imageCompression(originalFile, options)
        setSelectedFile(compressedFile)

        setImage(URL.createObjectURL(compressedFile))
      } catch (error) {
        console.error(error)
      }
    }
  }
  useEffect(() => {
    const fetchCoverImage = async () => {
      const res = await fetch(`/api/clients/${client.id}/cover`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()
      console.log(data)
      setImage(data)
    }
    fetchCoverImage()
  }, [client.id])

  return (
    <div className={`mt-7 w-full justify-start`}>
      <div className='flex flex-row justify-between'>
        <h5
          className={`mb-2 text-xl font-medium py-2 ml-12 ${inter.className}`}>
          Campaign settings
        </h5>
        <div className='px-14 flex gap-4'>
          <button
            className=' bg-[#D9F0F1] px-10 h-full rounded-full hover:bg-[#caf0f1]'
            onClick={() => {
              handleEdit(), handleCreate()
            }}>
            update Information
          </button>
          <label
            htmlFor='my-modal-4'
            className='flex items-center cursor-pointer bg-[#f1e2df] px-10 h-full rounded-full hover:bg-[#f8ddd8]'>
            remove connection
          </label>
          <input type='checkbox' id='my-modal-4' className='  modal-toggle' />
          <div className='modal '>
            <div className='modal-box relative border max-w-[456px] flex flex-col justify-start overflow-hidden rounded-xl bg-white  p-0'>
              <label
                htmlFor='my-modal-4'
                className='absolute right-4 top-2 cursor-pointer text-lg text-black'>
                ✕
              </label>

              <div className='px-10 py-8'>
                <h3 className='text-xl font-bold mb-2'>Important</h3>
                <p className='mb-4'>
                  Deleting this campaign will delete all associated posts and
                  you will not be able to recover it again.
                </p>
                <button
                  onClick={() => {
                    handleRemove()
                  }}
                  className='bg-[#ffdede] flex  hover:bg-[#ffcbcb] text-sm align-center items-center  px-4  py-3  rounded-full'>
                  remove campaign
                </button>
              </div>
            </div>
          </div>
        </div>
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
              <div className='relative'>
                <p className='text-sm'>Your cover image</p>
                <div
                  className='relative mt-2 w-full h-[200px] overflow-hidden rounded-xl border p-2 hover:cursor-pointer'
                  onMouseEnter={() => setShowChangeText(true)}
                  onMouseLeave={() => setShowChangeText(false)}>
                  <Image
                    className='object-cover w-full h-full'
                    src={image || coverImage}
                    alt=''
                    layout='fill'
                  />
                  {showChangeText && (
                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white'>
                      Change cover image
                    </div>
                  )}

                  <input
                    type='file'
                    accept='image/*'
                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    onChange={handleFileChange}
                  />
                </div>
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
