'use client'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import logo from 'public/assets/register/codecoco.png'
import { Navigation } from '@/components/menus/activeNavigation'
import { SingOutButton, SingInButton } from '@/components/auth/AuthButtons'
import img from '/public/assets/creatorRegister/exampleImage.jpg'
import { useEffect, useState } from 'react'
import imageCompression from 'browser-image-compression'
import { set } from 'zod'

const links = [
  {
    href: '/dashboard',
    name: 'dashboard',
  },
  {
    href: '/dashboard/campaigns',
    name: 'campaigns',
  },
  {
    href: '/dashboard/invitations',
    name: 'agencies',
  },

  {
    href: '/dashboard/settings',
    name: 'your account',
  },
  {
    href: '/privacy',
    name: 'policies',
  },
]

export default function SidebarCreators() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showChangeText, setShowChangeText] = useState(false)
  const [profileImage, setProfileImage] = useState('')

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
          const response = await fetch('/api/user/images/profile', {
            method: 'POST',
            body: formData,
          })
          if (response.ok) {
            const data = await response.json()
            setProfileImage(data.image)
          }
        } catch (error) {
          console.error('Error uploading:', error)
        }
      }
    }

    uploadImage()
  }, [selectedFile])

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch('/api/user/images/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error('Error uploading')
        }
        const data = await response.json()
        setProfileImage(data.image)
      } catch (error) {
        console.error('Error uploading:', error)
      }
    }

    fetchProfileImage()
  }, [])

  return (
    <aside className='sticky inset-0 z-[51] h-screen w-64' aria-label='Sidebar'>
      <div className='flex h-screen w-64 flex-col overflow-y-auto bg-sidebarBackground px-6 py-4  '>
        <div>
          <div
            className='relative hover:cursor-pointer italic font-light text-center text-gray-400'
            onMouseEnter={() => setShowChangeText(true)}
            onMouseLeave={() => setShowChangeText(false)}>
            <Image
              priority
              className='pl-4 ml-5 -mb-4'
              width={150}
              src={logo}
              alt='background'
            />
            <span>for creators</span>
            {showChangeText && (
              <div className='absolute mt-25 left-8 top-7 z-10 h-[300px] w-[143px] mask mask-circle flex items-center justify-center bg-black bg-opacity-50 text-white'>
                Change photo
              </div>
            )}
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange} // Función para manejar el cambio de archivo
              className='absolute inset-0 w-full h-full mt-36 z-20 opacity-0 cursor-pointer'
            />
          </div>
          <div className='flex ml-8 mt-10 mb-10 justify-center mask mask-circle mr-8 h-50 w-50'>
            <Image
              priority
              className={``}
              width={300}
              height={300}
              src={profileImage || img}
              alt='background'
            />
          </div>

          <div className='divider'></div>
          <nav
            className={`flex flex-col gap-3 font-medium ${ptMono.className}`}>
            <Navigation navLinks={links} />
          </nav>
        </div>

        <div className='divider'></div>

        <div className=' flex w-full justify-center  items-center gap-4 p-2'>
          <SingInButton />
          <SingOutButton />
        </div>
      </div>
    </aside>
  )
}
