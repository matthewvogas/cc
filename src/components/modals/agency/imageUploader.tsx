import { CampaignRes } from '@/types/campaign/campaignRes'
import Spinner from '@/components/loading/spinner'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ptMono } from '@/app/fonts'

type Props = {
  campaignFallback: CampaignRes
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ImageUploader = ({ campaignFallback, setIsOpen }: Props) => {
  const router = useRouter()
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const dropAreaRef = useRef<HTMLDivElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const MAX_IMAGE_COUNT = 50

  const handleImageChange = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files)
      if (newImages.length + selectedImages.length > MAX_IMAGE_COUNT) {
        setFetchError(`You can upload a maximum of ${MAX_IMAGE_COUNT} images.`)
      } else {
        setSelectedImages([...selectedImages, ...newImages])
        setFetchError(null)
      }
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    if (selectedImages.length === 0) {
      setFetchError('Please select at least one image')
      setIsUploading(false)
      return
    }

    const form = e.target as HTMLFormElement
    const formData = new FormData()
    selectedImages.forEach(image => {
      formData.append('images', image)
    })

    if (formData.getAll('images').length === 0) {
      setFetchError('Please select at least one image')
      setIsUploading(false)
      return
    }
    const campaignId = campaignFallback.id!.toString()

    try {
      const res = await fetch(`/api/stories?campaign=${campaignId}`, {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        setFetchError(data.error)
        setIsUploading(false)
        return
      }
      setIsUploading(false)
      setIsOpen(false)
      router.refresh()
    } catch (err) {
      setFetchError('Error uploading Stories')
    }

    setSelectedImages([])
    form.reset()
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsHovered(true)
  }

  const handleDragLeave = () => {
    setIsHovered(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsHovered(false)
    const files = event.dataTransfer.files
    handleImageChange(files)
  }

  return (
    <>
      <form
        onSubmit={handleUpload}
        className='flex flex-col gap-4 mx-12 items-end w-full'>
        <div
          ref={dropAreaRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border border-[#7F7F7F] p-6 w-full rounded-lg ${
            isHovered ? 'bg-gray-50' : ''
          }`}>
          <div className='flex justify-center mb-12 mt-12'>
            <input
              type='file'
              accept='.jpg, .jpeg, .png, .webp, .svg, .heif, .heic'
              className='hidden'
              onChange={e => handleImageChange(e.target.files)}
              id='imageInput'
              name='images'
              multiple
            />
            <label
              htmlFor='imageInput'
              className={`px-8 py-3 cursor-pointer bg-[#F4F2EE] text-black rounded-full ${ptMono.className}`}>
              {!isHovered ? 'tap, or drag screenshots here' : 'drop the images'}
            </label>
          </div>
          {selectedImages.length > 0 ? (
            <div className={`flex justify-center items-center`}>
              <div className='text-center'>
                <p className={`${ptMono.className} mb-2`}>
                  {selectedImages.length} items uploaded
                </p>
              </div>
            </div>
          ) : null}
        </div>
        {fetchError && (
          <div className='alert alert-error flex justify-center shadow-lg'>
            <div className='flex flex-row gap-4'>
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
        <button
          disabled={selectedImages.length === 0 || isUploading}
          type='submit'
          className={`px-8 py-3 bg-[#F4F2EE] text-black rounded-full ${ptMono.className}`}>
          {isUploading ? (
            <Spinner width='w-4' height='h-4' border='border-2' />
          ) : (
            'upload'
          )}
        </button>
      </form>
    </>
  )
}

export default ImageUploader
