'use client'

import Image from 'next/image'
import { inter } from '@/app/fonts'
import imageCover from 'public/assets/register/TopPost.jpg'
import Link from 'next/link'
import { Client } from '@prisma/client'
import useClients from '@/hooks/useClients'

// Fonts

// Arrays
const card = [
  {
    ImageSrc: imageCover,
    name: "L'Oréal",
  },
  {
    ImageSrc: imageCover,
    name: 'Rosalia',
  },
  {
    ImageSrc: imageCover,
    name: 'Example',
  },
  {
    ImageSrc: imageCover,
    name: 'Example',
  },
]

export default function ClientCard({
  clientsFallback,
}: {
  clientsFallback: Client[]
}) {
  // Show Arrays
  const { clients, refreshClients, areClientsLoading, clientsError } =
    useClients(clientsFallback)

  const data = clients || card

  const cards = data.map((card: Client, index: any) => (
    <Link
      href={`/dashboard/clients/${card.id || 1}`}
      key={index}
      className='h-80 w-80 '>
      <Image
        priority
        className={`h-64 object-cover`}
        src={imageCover}
        alt={card?.name || 'card'}
      />
      <div className=' h-auto border border-gray-200 bg-white  px-2 py-4 pl-4'>
        <p className={`text-lg font-medium text-gray-800 ${inter.className}`}>
          {card.name}
        </p>
      </div>
    </Link>
  ))

  return <div className=' flex  flex-wrap gap-4 self-start'>{cards}</div>
}
