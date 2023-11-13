import { CampaignRes } from '@/types/campaign/campaignRes'
import { Client, Campaign } from '@prisma/client'
import useCampaigns from '@/hooks/useCampaigns'
import useClients from '@/hooks/useClients'
import { Dialog } from '@headlessui/react'
import React, { useState } from 'react'
import { ptMono } from '@/app/fonts'
import imageCompression from 'browser-image-compression'

type Props = {
  campaignsFallback: CampaignRes
  clientsFallback: any
  text: string
  icon: any
}

export default function AddCampaign({
  campaignsFallback,
  clientsFallback,
  text,
  icon,
}: Props) {
  const { campaigns, areCampaignsLoading, campaignsError, refreshCampaigns } =
    useCampaigns(campaignsFallback)
  const { clients, areClientsLoading, clientsError, refreshClients } =
    useClients(clientsFallback)

  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [hashtag, setHashtag] = useState('')
  const [clientId, setClientId] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const originalFile = e.target.files[0]
      setFileName(originalFile.name)
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }
      try {
        const compressedFile = await imageCompression(originalFile, options)
        setSelectedFile(compressedFile)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('title', title)
    formData.append('name', name)
    formData.append('description', description)
    formData.append('clientId', clientId!)
    formData.append('hashtag', hashtag)

    if (selectedFile) {
      formData.append('image', selectedFile)
    }
    console.log(formData.values())
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        body: formData,
      })

      if (res.status === 200) refreshCampaigns()
      console.log(res.status)
      setIsOpen(false)
      setFileName(null)
    } catch (error: any) {
      setFetchError(error?.message)
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true)
        }}>
        <label
          tabIndex={0}
          className={`bg-[#E9F7F0] flex bg-text-lg align-center items-center border-rose-100 mx-2 px-9 py-3 text-back font-medium h-14 rounded-full cursor-pointer`}>
          {text}
          {icon}
        </label>
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-[99]'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className='fixed inset-0 bg-black bg-opacity-25' />

        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          {/* The actual dialog panel  */}
          <Dialog.Panel className='flex max-w-lg flex-col items-center justify-center rounded-xl bg-white px-20 py-12'>
            <Dialog.Title className='text-lg font-bold'>
              Add New Campaign
            </Dialog.Title>
            <form
              onSubmit={handleCreate}
              className={`w-full justify-start ${ptMono.className}`}>
              <div>
                <p className='py-4'>Client</p>
                <select
                  required
                  onChange={e => setClientId(e.target.value)}
                  className='block w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'>
                  <option value={0} disabled>
                    Choose a client
                  </option>
                  <option>No Client</option>
                  {clients.map((client: Client, index: any) => (
                    <option value={client.id} key={index}>
                      {client.name}
                    </option>
                  ))}
                </select>

                {title === 'new hashtag campaign' && (
                  <>
                    <p className='py-4'>Hashtag</p>
                    <input
                      value={hashtag}
                      onChange={e => setHashtag(e.target.value)}
                      className='w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
                      placeholder='hashtag to track'
                      type='text'
                      required
                    />
                  </>
                )}
              </div>
              <p className='py-4'>Campaign Title</p>
              <input
                onChange={e => setName(e.target.value)}
                required
                type='text'
                id='name'
                placeholder='Campaign Name'
                className='w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
              />
              <p className='py-4'>Campaign Description</p>
              <textarea
                required
                className=' textarea-bordered textarea w-full rounded-lg mb-3'
                onChange={e => setDescription(e.target.value)}
                placeholder='A brief description about your campaign'
              />
              <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                id='file-upload'
                className='hidden'
              />

              <label
                htmlFor='file-upload'
                className='cursor-pointer text-black rounded-full bg-rose-200 px-2 py-1 transition duration-300 ease-in-out flex flex-col items-center'>
                Upload Image
                {fileName && (
                  <div className='mt-2 text-sm text-center text-gray-600 truncate w-full'>
                    {fileName}
                  </div>
                )}
              </label>

              <hr className='my-8 h-px border-0 bg-gray-200' />
              {fetchError && (
                <div className='alert alert-error shadow-lg'>
                  <div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6 flex-shrink-0 stroke-current'
                      fill='none'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <span>{fetchError}</span>
                  </div>
                </div>
              )}
              <div className='flex items-center justify-center'>
                <button
                  type='submit'
                  className='rounded-full bg-rose-200 px-6 py-2 '>
                  create campaign
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
