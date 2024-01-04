'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import { Tab } from '@headlessui/react'
import imageCover from 'public/assets/register/campaignCover.jpg'
import { useEffect, useState } from 'react'
import TitleSingleClient from '@/components/labels/titleSingleClient'
import coverImage from 'public/assets/campaigns/coverImage.png'
import { useRouter } from 'next/navigation'
import imageCompression from 'browser-image-compression'

export default function ClientTabs({
  client,
  campaigns,
}: {
  client: any
  campaigns: any
}) {
  const [activeSocial, setActiveTab] = useState('Campaigns')
  const router = useRouter()
  const [name, setName] = useState(client.name)
  const [fetchError, setFetchError] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [image, setImage] = useState('')
  const [showChangeText, setShowChangeText] = useState(false)

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

        // Crear una URL de objeto para mostrar la imagen seleccionada
        setImage(URL.createObjectURL(compressedFile))
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleCreate = async () => {
    const formData = new FormData()
    formData.append('name', selectedFile!.name)
    formData.append('image', selectedFile!)

    if (client.id) {
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
  }
  useEffect(() => {
    try {
      if (client.id) {
        const fetchCoverImage = async () => {
          const res = await fetch(`/api/clients/${client.id}/cover`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          const data = await res.json()
          // console.log(data)
          setImage(data)
        }
        fetchCoverImage()
      }
    } catch (error) {
      console.log(error)
    }
  }, [client?.id])

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/clients/${client.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
        }),
      })

      if (res.status === 200) router.refresh()
    } catch (error: any) {
      setFetchError(error?.message)
    }
  }

  const handleRemove = async () => {
    try {
      const res = await fetch(`/api/clients/${client.id}`, {
        method: 'DELETE',
      })

      if (res.status === 200)
        router.push('/dashboard/clients'), router.refresh()
    } catch (error: any) {
      setFetchError(error?.message)
    }
  }

  return (
    <>
      <TitleSingleClient client={client} />

      <div>
        <Tab.Group>
          <Tab.List className={`flex gap-6 border-b-[#E4E3E2] border-b mt-16`}>
            <Tab
              className={` ml-2 md:ml-12p-2 text-base font-medium outline-none ${
                activeSocial === 'Campaigns'
                  ? 'border-b-4 border-[#7E7E7D]'
                  : 'opacity-50'
              }`}
              onClick={() => setActiveTab('Campaigns')}>
              Campaigns
            </Tab>
            <Tab
              className={`p-2 text-base font-medium outline-none ${
                activeSocial === 'Settings'
                  ? 'border-b-4 border-[#7E7E7D]'
                  : 'opacity-50'
              }`}
              onClick={() => setActiveTab('Settings')}>
              Settings
            </Tab>
          </Tab.List>
          <Tab.Panels>
            {/* panel 1 */}
            <Tab.Panel>
              <div className='flex mt-12 overflow-scroll overflow-y-hidden gap-4 md:px-12'>
                {campaigns.length > 0 ? (
                  campaigns.map((card: any, index: any) => (
                    <Link
                      href={`/dashboard/campaigns/${card.id}`}
                      key={index}
                      className={`inline-block bg-beigeTransparent border min-w-[250px] ${ptMono.className}`}>
                      <Image
                        className={`object-cover`}
                        src={card.imageUrl || imageCover}
                        alt={card.name}
                        style={{ width: '250px', height: '310px' }}
                        width={250}
                        height={310}
                      />
                      <div className='mb-4 flex justify-between gap-4 px-6 pt-4'>
                        <h5>{card.name}</h5>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className=' ml-8 h-6 w-6'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                          />
                        </svg>
                      </div>
                      <hr className=' h-px bg-gray-200'></hr>
                      <div className='flex  flex-col gap-2 px-6 py-[14px]'>
                        <h4 className=' self-baseline rounded-full bg-white px-4 py-3 text-base'>
                          {card?._count?.creators || 0} {`creators`}
                        </h4>
                        <h4 className=' self-baseline rounded-full bg-white px-4 py-3 text-base'>
                          {card?._count?.posts || 0} {`posts`}
                        </h4>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p
                    className={`px-8 py-3 border-gray border rounded-full text-center bg-[#F4F2EE] ${ptMono.className}`}>
                    {' '}
                    This client has no campaigns
                  </p>
                )}
              </div>
            </Tab.Panel>

            {/* panel 2 */}

            <Tab.Panel>
              <div className={`mt-7 w-full justify-start`}>
                <div className='flex w-full justify-end px-14'>
                  <div className='flex gap-4'>
                    <button
                      className='bg-[#D9F0F1] px-10 py-3 rounded-full'
                      onClick={() => {
                        handleUpdate(), handleCreate()
                      }}>
                      Update Information
                    </button>
                    <label
                      htmlFor='my-modal-4'
                      className='flex items-center cursor-pointer bg-[#f1e2df] px-10 h-full rounded-full hover:bg-[#f8ddd8]'>
                      remove connection
                    </label>
                    <input
                      type='checkbox'
                      id='my-modal-4'
                      className='  modal-toggle'
                    />
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
                            By deleting this client, it will be disassociated
                            from the associated campaigns; you will not be able
                            to reverse this action.
                          </p>
                          <button
                            onClick={() => {
                              handleRemove()
                            }}
                            className='bg-[#ffdede] flex  hover:bg-[#ffcbcb] text-sm align-center items-center  px-4  py-3  rounded-full'>
                            remove client
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                      </div>

                      <div className='w-full'>
                        <Image
                          className={`w-full`}
                          src={coverImage}
                          alt={''}
                          width={1160}
                          height={150}
                        />
                      </div>
                    </div>

                    <div className='flex w-full gap-6'>
                      <div className='w-2/3 flex gap-6 flex-col'></div>
                    </div>
                  </div>
                </form>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  )
}
