import React, { useState } from 'react'
import imageCompression from 'browser-image-compression'
import TagsInput from '@/components/inputs/tag'
import useClients from '@/hooks/useClients'
import { Dialog } from '@headlessui/react'
import { ptMono } from '@/app/fonts'

type Props = {
  campaignsFallback: any
  clientsFallback: any
  text: string
  icon: any
}

export default function AddClients({
  campaignsFallback,
  clientsFallback,
  text,
  icon,
}: Props) {


  const [tags, setTags] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
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

  const handleCreate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('tags', JSON.stringify(tags))
      if (selectedFile) {
        formData.append('image', selectedFile)
      }

      const res = await fetch('/api/clients', {
        method: 'POST',
        body: formData,
      })

      if (res.status === 200) 
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
        <div className='fixed inset-0 bg-black bg-opacity-25' />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <Dialog.Panel className='mx-auto flex max-w-lg flex-col items-center justify-center rounded-lg bg-white px-20 py-12'>
            <Dialog.Title className='mb-8 text-lg font-medium'>
              Add New Client
            </Dialog.Title>
            <div className={`w-full justify-start ${ptMono.className}`}>
              <form onSubmit={handleCreate} className='flex flex-col gap-4'>
                <label htmlFor='name'>Client Name</label>
                <input
                  onChange={e => setName(e.target.value)}
                  type='text'
                  id='name'
                  required
                  placeholder='Name'
                  className='w-full rounded-full border border-gray-300 bg-[#0000] p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
                />

                <div>
                  <p className='pb-4'>Tags</p>
                  <TagsInput tags={tags} setTags={setTags} />
                </div>

                <hr className='my-2 h-px border-0 bg-gray-200' />

                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  id='file-upload'
                  className='hidden'
                />

                <label
                  htmlFor='file-upload'
                  className='cursor-pointer text-center text-black rounded-full bg-[#FCDDD1] px-4 py-2 transition duration-300 ease-in-out'>
                  Upload Image
                </label>
                  {fileName && (
                    <div className='flex text-sm justify-center w-full text-gray-600'>
                      image selected
                    </div>
                  )}

                {fetchError && (
                  <div className='alert alert-error shadow-lg'>
                    <div>
                      {/* ... */}
                      <span>{fetchError}</span>
                    </div>
                  </div>
                )}

                <button
                  type='submit'
                  className='rounded-full bg-[#FCDDD1] px-6 py-2 '>
                  Create Client
                </button>
              </form>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
