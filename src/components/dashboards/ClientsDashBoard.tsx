'use client'

import imageCover from 'public/assets/register/TopPost.jpg'
import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'

import useClients from '@/hooks/useClients'
import TitlePage from '../titlePage'
import TagsInput from '../TagsInput'
import CreatorRow from '../creatorRow'
import React from 'react'
import Search from '../search'
import FilterBy from '../modals/filterBy'
import SearchByTag from '../searchByTag'

export default function ClientsDashBoard({ clientsFallback }: any) {
  const { clients, areClientsLoading, clientsError, refreshClients } =
    useClients(clientsFallback)

  const [tags, setTags] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [tagSelected, setSearchTags] = useState('')
  const [sort, setSort] = React.useState('')
  const [inputSearchValue, setInputSearchValue] = useState('')

  const handleCreate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          tags,
        }),
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
      <TitlePage
        title={'Clients'}
        moduleText={'clients'}
        client={''}
        createClient={setIsOpen}
        createCampaign={null}
        setSort={setSort}
      />

      <div className='flex flex-col gap-4 bg-white'>
        <label className='italic md:px-12' htmlFor=''>
          {sort !== 'newest' ? 'oldest' : 'lastest'}
        </label>
        <div className='flex gap-4 md:px-12 overflow-x-auto'>
          {(sort !== 'newest'
            ? clients.slice(0, 5).reverse()
            : clients.slice(0, 5)
          ).map((client: any, index: any) => (
            <Link
              href={`/dashboard/clients/${client.id || 1}`}
              key={index}
              className='h-80 min-w-[320px] w-80 border-gray-100 relative'>
              <Image
                priority
                className={`h-64 object-cover`}
                src={client.image || imageCover}
                alt={client.name}
              />
              <div className='h-auto border border-gray-200 bg-white px-2 py-4 pl-4'>
                <p className={`text-lg font-medium text-gray-800`}>
                  {client.name}
                </p>
              </div>
            </Link>
          ))}

          <div className='absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent'></div>
        </div>

        <div className='flex items-start px-12 gap-3 overflow-clip overflow-x-auto'>
          <Search
            inputSearchValue={inputSearchValue}
            setInputSearchValue={setInputSearchValue}
          />
          <SearchByTag
            setSearchTags={setSearchTags}
            tagSelected={tagSelected}
            searchTags={clients}
          />
        </div>

        <CreatorRow
          comeFrom={'clients'}
          creators={[]}
          clients={clients}
          search={inputSearchValue}
          searchByTag={tagSelected}
        />
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
                  placeholder='Name'
                  className='w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
                />

                <div>
                  <label>{`tags`}</label>
                  <TagsInput tags={tags} setTags={setTags} />
                </div>

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
