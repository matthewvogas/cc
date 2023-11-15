'use client'

import coverImageClient from 'public/assets/uniqueClient/clientCoverPage.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
  client: any
}

export default function TitleSingleClient({ client }: Props) {
  const [coverImage, setCoverImage] = useState('')

  useEffect(() => {
    try {
      if (client.id) {
        const fetchCoverImage = async () => {
          const res = await fetch(`/api/clients/${client?.id}/cover`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          const data = await res.json()
          console.log(data)
          setCoverImage(data)
        }
        fetchCoverImage()
      }
    } catch (error) {
      console.log(error)
    }
  }, [client?.id])

  return (
    <div className='w-full'>
      <div className='relative'>
        <Image
          className='w-full -mb-24 max-h-44 object-cover'
          src={coverImage || coverImageClient}
          alt=''
          width={1660}
          height={160}
        />
        <div className='absolute  inset-0 bg-gradient-to-t from-[#000000d0] to-transparent max-h-44'></div>
      </div>
      <div className='mx-auto  h-full w-full justify-between px-12'>
        <div className='w-full'>
          <div className={`flex items-center justify-between relative z-50`}>
            <h2 className={`text-2xl text-white`}>{client.name} 🥥</h2>
            <Link
              className='text-white rounded-full px-9 py-3 border border-white'
              href={'/dashboard/clients'}>
              all clients
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
