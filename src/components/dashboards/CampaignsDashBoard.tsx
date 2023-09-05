'use client'

import imageCover from 'public/assets/register/campaignCover.jpg'
import Link from 'next/link'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'

import { Client, Campaign } from '@prisma/client'
import useCampaigns from '@/hooks/useCampaigns'
import useClients from '@/hooks/useClients'
import TitlePage from '../titlePage'
import { CampaignRes } from '@/types/campaign/campaignRes'
import React from 'react'
import Search from '../search'
import AddCampaign from '../modals/addCampaigns'
import { FiCoffee } from 'react-icons/fi'

export default function CampaignsDashBoard({
  clientsFallback,
  campaignsFallback,
}: {
  campaignsFallback: CampaignRes
  clientsFallback: any
}) {
  const { campaigns, areCampaignsLoading, campaignsError, refreshCampaigns } =
    useCampaigns(campaignsFallback)
  const { clients, areClientsLoading, clientsError, refreshClients } =
    useClients(clientsFallback)

  const [title, setTitle] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [hashtag, setHashtag] = useState('')
  const [clientId, setClientId] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          name,
          description,
          clientId,
          hashtag,
        }),
      })

      if (res.status === 200) refreshCampaigns()
      console.log(res.status)
      setIsOpen(false)
    } catch (error: any) {
      setFetchError(error?.message)
    }
  }

  const [sort, setSort] = React.useState('')

  const [clientFilterSelected, setClientFilterSelected] = useState<number[]>([])
  const [clientNameFilterSelected, setClientNametFilterSelected] = useState('')
  const [inputSearchValue, setInputSearchValue] = useState('')
  const [tagSelected, setSearchTags] = useState('')

  const filteredClients = clients.filter((client: any) => {
    const clientNameMatches = client.name
      .toLowerCase()
      .includes(inputSearchValue.toLowerCase())
    const tagFilterIsActive = !tagSelected ? false : true
    const tagSearchIsActive = inputSearchValue === '' ? false : true

    if (!tagSearchIsActive && !tagFilterIsActive) {
      return true
    } else if (tagFilterIsActive && tagSearchIsActive) {
      const tagsMatch = client.tags.some(
        (tag: { name: string }) => tag.name === tagSelected,
      )
      return clientNameMatches && tagsMatch
    } else if (tagFilterIsActive) {
      return client.tags.some(
        (tag: { name: string }) => tag.name === tagSelected,
      )
    } else if (tagSearchIsActive) {
      return clientNameMatches
    }
  })

  const filteredCampaigns = campaigns.filter((campaign: any) => {
    if (clientFilterSelected.length == 0) {
      return true
    }

    if (campaign?.clientId == clientFilterSelected) {
      return true
    }

    return false
  })

  return (
    <>
      <TitlePage
        title={'Campaigns'}
        moduleText={'campaigns'}
        client={''}
        clientsFallback={clientsFallback}
        campaignsFallback={campaignsFallback}
        setSort={setSort}
      />

      <div className='flex justify-between items-end px-12 '>
        <div className='flex gap-6'>
          <div className=''>
            <div>
              <p className='font-medium text-base mb-2'>by client</p>
              <div className='dropdown'>
                <Search
                  inputSearchValue={inputSearchValue}
                  setInputSearchValue={setInputSearchValue}
                />
                <div
                  tabIndex={0}
                  className={`dropdown-content rounded-box mt-2 w-auto border-2 border-gray-100 bg-white ${ptMono.className}`}>
                  <div className='p-6'>
                    <div className='gap-2 flex flex-col'>
                      <span className='text-xs italic'>last clients</span>
                      {filteredClients
                        .slice(0, 3)
                        .map((client: Client, index: any) => (
                          <button
                            onClick={() => {
                              setClientFilterSelected([client.id])
                              setClientNametFilterSelected(String(client.name))
                            }}
                            className='w-full py-2 px-4 border border-gray-100 rounded-lg hover:bg-gray-100'
                            value={client.id}
                            key={index}>
                            {client.name}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>

                <div></div>
              </div>
            </div>
            <div className='mt-4'>
              {clientFilterSelected.length != 0 ? (
                <div
                  className={`w-fit border flex flex-col rounded-full bg-white px-8 py-2`}>
                  <div className='flex gap-2'>
                    <label className={`${ptMono.className} mr-4`}>
                      {clientNameFilterSelected}
                    </label>
                    <button onClick={() => setClientFilterSelected([])}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-4 w-4'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* by tag */}

          {/* <div>
                  <p className='font-medium text-base mb-2'>by tag/category</p>
                  <div className='dropdown'>
                    <label
                      tabIndex={0}
                      className={`flex border px-8 py-3 text-base rounded-full items-center p-2 text-black font-medium hover:border-gray-400  whitespace-nowrap`}>
                      Search
                      <FiChevronDown style={{ marginLeft: '42px' }} />
                    </label>
                    <div
                      tabIndex={0}
                      className={`dropdown-content rounded-box mt-2 w-auto border-2 border-gray-100 bg-white ${ptMono.className}`}>
                      <div className='p-6'>
                        <SearchByTag
                          setSearchTags={setSearchTags}
                          tagSelected={tagSelected}
                          searchTags={clients}
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
        </div>
        <AddCampaign
          clientsFallback={clientsFallback}
          campaignsFallback={campaignsFallback}
          text={'add new'}
          icon={undefined}
        />
      </div>

      <div className='flex flex-col bg-white pt-12'>
        <div className='flex overflow-scroll overflow-y-hidden gap-4 md:px-12'>
          {filteredCampaigns.length > 0 ?
            filteredCampaigns.map((card: any, index: any) => (
              <Link
                href={`/dashboard/campaigns/${card.id}`}
                key={index}
                className={`inline-block bg-beigeTransparent border min-w-[250px] ${ptMono.className}`}>
                <Image
                  className={`object-cover`}
                  src={imageCover}
                  alt={card.name}
                  style={{ width: '250px', height: '310px' }}
                />
                <div className='mb-4 flex justify-between gap-4 px-6 pt-4'>
                  <h5>{card.name}</h5>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className=' ml-8 h-6 w-6'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                    />
                  </svg>
                </div>
                <hr className=' h-px bg-gray-200'></hr>
                <div className='flex  flex-col gap-2 px-6 py-[14px]'>
                  <h4 className=' self-baseline rounded-full bg-white px-4 py-3 text-base'>
                    {card?._count?.creators || 0} {`creators`}
                  </h4>
                  <h4 className=' self-baseline rounded-full bg-white px-4 py-3 text-base'>
                    {card?._count?.posts || 0} {`posts`}
                  </h4>
                </div>
              </Link>
            )) : (
              <div
                className={`bg-transparent border min-w-[250px] opacity-40 ${ptMono.className}`}>
                <div className='w-[250px] h-[310px] gap-3 flex flex-col justify-center items-center p-12'>
                  <FiCoffee style={{ width: '24px' }} />
                  <p className=' text-center text-base'>{`No campaigns in sight! Don't worry, they're just shy. Try a different search term or create a new one`}</p>
                </div>
                <div className='mb-4 flex justify-between gap-4 px-6 pt-4'>
                  <h5>- - - -</h5>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className=' ml-8 h-6 w-6'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                    />
                  </svg>
                </div>
                <hr className=' h-px bg-gray-200'></hr>
                <div className='flex  flex-col gap-2 px-6 py-[14px]'>
                  <h4 className=' self-baseline rounded-full bg-white px-4 py-3 text-base'>
                    - - {`creators`}
                  </h4>
                  <h4 className=' self-baseline rounded-full bg-white px-4 py-3 text-base'>
                    - - {`posts`}
                  </h4>
                </div>
              </div>
            )}
          <div className='absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent'></div>
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
              <div>
                <p className='py-4'>Client</p>
                <select
                  required
                  onChange={e => setClientId(e.target.value)}
                  className='block w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'>
                  <option value={0} disabled>
                    Choose a client
                  </option>
                  <option>No Client</option>
                  {clients.map((client: Client, index: any) => (
                    <option value={client.id} key={index}>
                      {client.name}
                    </option>
                  ))}
                </select>

                {title === 'new hashtag campaign' && (
                  <>
                    <p className='py-4'>Hashtag</p>
                    <input
                      value={hashtag}
                      onChange={e => setHashtag(e.target.value)}
                      className='w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
                      placeholder='hashtag to track'
                      type='text'
                      required
                    />
                  </>
                )}
              </div>

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
