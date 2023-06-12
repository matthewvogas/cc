'use client'

import imageCover from 'public/assets/register/TopPost.jpg'
import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import axios from 'axios'
import useClients from '@/hooks/useClients'

export default function ClientsDashBoard({ clientsFallback }: any) {
  const { clients, areClientsLoading, clientsError, refreshClients } =
    useClients(clientsFallback)

  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [fetchError, setFetchError] = useState<string | null>(null)

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/clients', {
        name,
      })

      if (res.status === 200) refreshClients()
      console.log(res.status)
      setIsOpen(false)
    } catch (error: any) {
      setFetchError(error?.message)
    }
  }

  return (
    <>
      <div className='flex flex-col gap-4 bg-white'>
        <div className='w-full pt-20 '>
          <div className='mx-auto mb-8 w-full justify-between px-4 md:px-12'>
            <div className='flex w-full  flex-row justify-between'>
              <h3 className={`text-3xl font-semibold text-gray-800  `}>
                Clients
              </h3>
              <button
                className='flex rounded-full bg-green-200 px-8 py-2 text-lg'
                onClick={() => setIsOpen(true)}>
                add a client
              </button>
            </div>
          </div>
          <div className='divider' />
        </div>
        <div className=' flex  flex-wrap gap-4 md:px-12'>
          {clients.map((card: any, index: any) => (
            <Link
              href={`/clients/${card.id || 1}`}
              key={index}
              className='h-80 w-80 border-gray-100 '>
              <Image
                priority
                className={`h-64 object-cover`}
                src={card.image || imageCover}
                alt={card.name}
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
          <Dialog.Panel className='mx-auto flex max-w-lg flex-col items-center justify-center rounded-xl bg-white px-20 py-12'>
            <Dialog.Title className='mb-8 text-lg font-bold'>
              Add New Client
            </Dialog.Title>
            <div className={`w-full justify-start ${ptMono.className}`}>
              <form onSubmit={handleCreate} className='flex flex-col gap-4'>
                <label htmlFor='name'>client name</label>
                <input
                  onChange={e => setName(e.target.value)}
                  type='text'
                  id='name'
                  required
                  placeholder='client name'
                  className='w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
                />
                <hr className='my-2 h-px border-0 bg-gray-200' />

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
                  create client
                </button>
              </form>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
