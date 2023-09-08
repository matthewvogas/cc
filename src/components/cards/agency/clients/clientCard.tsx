'use client'

import imageCover from 'public/assets/register/TopPost.jpg'
import useClients from '@/hooks/useClients'
import { inter, ptMono } from '@/app/fonts'
import ActionalTitle from '../../../labels/actionalTitle'
import { FiUsers } from 'react-icons/fi'
import { Client } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

export default function ClientCard({
  clientsFallback,
  campaignsFallback,
}: {
  clientsFallback: Client[]
  campaignsFallback: any
}) {
  const { clients, refreshClients, areClientsLoading, clientsError } =
    useClients(clientsFallback)

  return (
    <>
      {' '}
      <ActionalTitle
        title={'your clients'}
        frome={'clients'}
        campaigns={campaignsFallback}
        clients={clientsFallback}
        userPositionId={0}
        stats={undefined}
      />{' '}
      <div className='flex overflow-x-auto gap-4 md:px-12'>
        {clients.length > 0 ? (
          clients.map((card: Client, index: any) => (
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
                <p
                  className={`text-lg font-medium text-gray-800 ${inter.className}`}>
                  {card.name}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className='min-h-[250px] min-w-[250px] opacity-40  '>
            <div className='border border-gray-200 w-[250px] h-[310px] gap-3 flex flex-col justify-center items-center p-12'>
              <FiUsers style={{ width: '24px' }} />
              <p
                className={` text-center text-base ${ptMono.className}`}>{`Looks like the party hasn't started yet. Create a new client to get the night started `}</p>
            </div>
            <div className=' h-auto border border-gray-200 bg-white px-2 py-4 pl-4'>
              <p
                className={`text-lg font-medium text-gray-800 ${inter.className}`}>
                - - -
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
