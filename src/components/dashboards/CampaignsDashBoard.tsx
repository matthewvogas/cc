'use client'

import imageCover from 'public/assets/register/campaignCover.jpg'
import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'

import { Client, campaign } from '@prisma/client'
import useCampaigns from '@/hooks/useCampaigns'
import useClients from '@/hooks/useClients'
import TitlePage from '../titlePage'

export default function CampaignsDashBoard({
  campaignsFallback,
  clientsFallback,
}: {
  campaignsFallback: campaign[]
  clientsFallback: Client[]
}) {
  const { campaigns, areCampaignsLoading, campaignsError, refreshCampaigns } =
    useCampaigns(campaignsFallback)
  const { clients, areClientsLoading, clientsError, refreshClients } =
    useClients(clientsFallback)

  const [title, setTitle] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [clientId, setClientId] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const handleType: any = (title: string) => {
    switch (title) {
      case 'new manual campaign':
        return (
          <div>
            <p className='py-4'>Client</p>
            <select
              required
              onChange={e => setClientId(e.target.value)}
              className='block w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'>
              <option value={0} disabled>
                Choose a client
              </option>
              <option value={549}>No Client</option>
              {clients.map((client: Client, index: any) => (
                <option value={client.id} key={index}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
        )

      case 'new hashtag campaign':
        return (
          <div>
            <p className='py-4'>Hashtag</p>
            <input
              className='w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
              placeholder='hashtag to track'
              type='text'
            />
          </div>
        )
      default:
        return <h1>Error</h1>
    }
  }

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          clientId,
        }),
      })

      if (res.status === 200) refreshCampaigns()
      console.log(res.status)
      setIsOpen(false)
    } catch (error: any) {
      setFetchError(error?.message)
    }
  }

  return (
    <>
      <TitlePage
        title={'Campaigns'}
        moduleText={'campaigns'}
        client={''}
        createClient={null}
        createCampaign={[setIsOpen, setTitle]}
      />

      <div className='flex flex-col gap-4 bg-white pt-12'>
        <div className='flex flex-wrap gap-6 md:px-12'>
          {campaigns.map((card: any, index: any) => (
            <Link
              href={`/campaigns/${card.id || 1}`}
              key={index}
              className='border-gray-100 '>
              <Image
                priority
                className={`h-64 w-64`}
                src={card.image || imageCover}
                alt={card.name}
                unoptimized
              />
              <div className=' bg-white px-2 py-4'>
                <p className={`text-sm font-medium text-gray-800`}>
                  {card.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Esta es el modal  */}
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
            <Dialog.Title className='text-lg font-bold'>{title}</Dialog.Title>
            <form
              onSubmit={handleCreate}
              className={`w-full justify-start ${ptMono.className}`}>
              {handleType(title)}

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
                className=' textarea-bordered textarea w-full rounded-lg'
                onChange={e => setDescription(e.target.value)}
                placeholder='A brief description about your campaign'
              />

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

              <button
                type='submit'
                className='rounded-full bg-rose-200 px-6 py-2 '>
                create campaign
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
