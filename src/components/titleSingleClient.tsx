'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import { Tab } from '@headlessui/react'
import coverImageClient from 'public/assets/uniqueClient/clientCoverPage.jpg'

type Props = {
  client: any
}

export default function TitleSingleClient({ client }: Props) {
  return (
    <div className='w-full'>
      <div className='relative'>
        <Image className='w-full -mb-24' src={coverImageClient} alt='' />
        <div className='absolute  inset-0 bg-gradient-to-t from-[#000000d0] to-transparent'></div>
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
