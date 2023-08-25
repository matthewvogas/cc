'use client'

import Image from 'next/image'
import { inter } from '@/app/fonts'
import imageCover from 'public/assets/register/TopPost.jpg'
import Link from 'next/link'
import { Client } from '@prisma/client'
import useClients from '@/hooks/useClients'
import ActionalTitle from './actionalTitle'

export default function ClientCard({
  clientsFallback,
  campaignsFallback,
}: {
  clientsFallback: Client[]
  campaignsFallback: any
}) {
  const { clients, refreshClients, areClientsLoading, clientsError } =
    useClients(clientsFallback)

  const data = clients

  const cards = data.map((card: Client, index: any) => (
    <Link
      href={`/dashboard/clients/${card.id || 1}`}
      key={index}
      className='min-h-[250px] min-w-[250px]  '>
      <Image
        priority
        className={`h-64 object-cover`}
        src={imageCover}
        alt={card?.name || 'card'}
      />
      <div className=' h-auto border border-gray-200 bg-white px-2 py-4 pl-4'>
        <p className={`text-lg font-medium text-gray-800 ${inter.className}`}>
          {card.name}
        </p>
      </div>
    </Link>
  ))

  return (
    <>
      {' '}
      <ActionalTitle
        title={'your clients'}
        frome={'clients'}
        campaigns={campaignsFallback}
        clients={clientsFallback}
      />{' '}
      <div className='flex overflow-x-auto gap-4 md:px-12'>{cards} </div>{' '}
    </>
  )
}
