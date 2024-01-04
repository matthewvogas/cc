'use client'
import coverImage from 'public/assets/campaigns/coverImage.png'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import imageCompression from 'browser-image-compression'
import { useRouter } from 'next/navigation'

type Props = {
  session: any
}

export default function CreatorsPortfolio({ session }: Props) {
  {
    const [activeSocial, setActiveTab] = useState('Campaigns')

    const [name, setName] = useState(session.portfolioName)
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [image, setImage] = useState(session.imageUrl)
    const [showChangeText, setShowChangeText] = useState(false)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const originalFile = e.target.files[0]
        try {
          setSelectedFile(originalFile)
          setImage(URL.createObjectURL(originalFile))
        } catch (error) {
          console.error(error)
        }
      }
    }

    useEffect(() => {
      const uploadImage = async () => {
        if (selectedFile) {
          const formData = new FormData()
          formData.append('name', selectedFile.name)
          formData.append('image', selectedFile)

          try {
            const response = await fetch('/api/user/images/portfolio', {
              method: 'POST',
              body: formData,
            })
            if (response.ok) {
              const data = await response.json()
              setImage(data.imageUrl)
            }
          } catch (error) {
            console.error('Error uploading:', error)
          }
        }
      }

      const reWrite = async () => {
        if (name) {
          const formData = new FormData()
          formData.append('name', name)

          try {
            const response = await fetch('/api/user/images/portfolio/name', {
              method: 'POST',
              body: formData,
            })
            if (response.ok) {
              const data = await response.json()
              setImage(data.imageUrl)
            }
          } catch (error) {
            console.error('Error uploading:', error)
          }
        }
      }

      uploadImage()
      reWrite()
    }, [selectedFile, name])
    
    return (
      <div>
        <div className={`mt-7 w-full justify-start`}>
          <form className='p-4 px-12 '>
            <div className='flex flex-col gap-6 mt-4'>
              <div className='flex w-full gap-5 '>
                <div className='flex flex-col gap-8 w-2/3'>
                  <div>
                    <label className={`text-sm`}>Portfolio name</label>
                    <input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      type='text'
                      id='default-input'
                      placeholder='Portfolio Name'
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
