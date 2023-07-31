'use client'

import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import avatar from 'public/assets/register/avatar.jpg'
import { PostHashtagStatus, type ChipStateName } from './postHashtagStatus'
import { CreatorStatus } from './creatorStatus'
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  SetStateAction,
  useState,
} from 'react'
import { Dialog, Tab } from '@headlessui/react'
import TagsInput from './TagsInput'
import modalCover from 'public/assets/register/addpostToTrack.jpg'
import { CreatorsByCampaignRes } from '@/types/creators/CreatorsByCampaignRes'
import Link from 'next/link'

const dropdownButton =
  'text-sm border-2 inline-block py-2 px-8 m-2 text-back font-medium bg-whiteBrown rounded-full hover:bg-transparent hover:border-orange-100'
const thTable = 'bg-white text-sm normal-case '
const infoLabel = 'bg-active px-8 py-3 rounded-full text-black text-sm '

type Props = {
  comeFrom: string
  creators: CreatorsByCampaignRes[]
  clients: any
  search: string
  searchByTag?: any
}

export default function CreatorRow({
  comeFrom,
  creators,
  clients,
  search,
  searchByTag,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [editClientModal, setEditClientModal] = useState(false)
  const [tags, setTags] = useState<string[]>([])

  const filteredClients = clients.filter((client: any) => {
    const clientNameMatches = client.name
      .toLowerCase()
      .includes(search.toLowerCase())
    const tagFilterIsActive = searchByTag == false ? false : true
    const tagSearchIsActive = search === '' ? false : true

    if (!tagSearchIsActive && !tagFilterIsActive) {
      return true
    } else if (tagFilterIsActive && tagSearchIsActive) {
      // Si ambos filtros están activos, se deben cumplir ambas condiciones
      const tagsMatch = client.tags.some(
        (tag: { name: string }) => tag.name === searchByTag,
      )
      return clientNameMatches && tagsMatch
    } else if (tagFilterIsActive) {
      // Si solo el filtro de etiqueta está activo, se comprueba si coincide con alguna etiqueta
      return client.tags.some(
        (tag: { name: string }) => tag.name === searchByTag,
      )
    } else if (tagSearchIsActive) {
      // Si solo la búsqueda de nombre está activa, se comprueba si el nombre coincide
      return clientNameMatches
    }
  })

  return (
    <>
      <div className='my-5 h-screen w-full md:px-12'>
        <table className='table w-full'>
          <thead className=' border-b border-gray-200'>
            <tr>
              {comeFrom === 'campigns' && (
                <>
                  <th className={`${thTable} ${ptMono.className}`}>creator</th>
                  <th className={`${thTable} ${ptMono.className}`}>status</th>
                  <th className={`${thTable} ${ptMono.className}`}>
                    posts assigned
                  </th>
                  <th className={`${thTable} ${ptMono.className}`}>
                    post status
                  </th>
                </>
              )}

              {comeFrom === 'clients' && (
                <>
                  <th className={`${thTable} ${ptMono.className}`}>client</th>
                  <th className={`${thTable} ${ptMono.className}`}>
                    campaigns
                  </th>
                  <th className={`${thTable} ${ptMono.className}`}>tags</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {creators.map((creator, index) => (
              <tr key={index} className={`text-sm ${ptMono.className} `}>
                {comeFrom === 'campigns' && (
                  <>
                    <td className='bg-white'>
                      <div className={`flex items-center space-x-3 `}>
                        <div className='avatar'>
                          <div className='mask mask-circle mr-8 h-12 w-12'>
                            <Image
                              priority
                              className={``}
                              width={100}
                              height={100}
                              src={creator.imageUrl || avatar}
                              alt='background'

                            />
                          </div>
                        </div>
                        <div>
                          <div className='font-bold'>{creator.name}</div>
                          <div className='text-sm opacity-50'>
                            {creator.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='bg-white'>
                      <CreatorStatus state={'INVITE'} />
                    </td>
                    <td className='bg-white'>
                      <div className='flex items-center justify-between '>
                        <div className='flex'>
                          <label className={`${infoLabel}`}>
                            {creator._count?.posts}
                          </label>
                          <button className='px-2 text-lg font-bold text-gray-400'>
                            {' '}
                            +{' '}
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className='flex'>
                      <PostHashtagStatus state={'NOT'} />
                    </td>
                    <td>
                      <div className='dropdown-end dropdown cursor-pointer'>
                        <svg
                          tabIndex={0}
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='h-6 w-6'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                          />
                        </svg>
                        <ul
                          tabIndex={0}
                          className='dropdown-content menu rounded-box w-max  border-2 border-gray-100 bg-white p-2'>
                          <button
                            onClick={() => setIsOpen(true)}
                            className={`${dropdownButton}`}>
                            add post tracking 🥥
                          </button>
                          <button className={`${dropdownButton}`}>
                            View Creator
                          </button>
                          <button className={`${dropdownButton}`}>
                            Remove creator
                          </button>
                        </ul>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}

            {filteredClients.map((client: any, index: any) => (
              <tr key={index} className={`text-sm ${ptMono.className} `}>
                {comeFrom === 'clients' && (
                  <>
                    <td className='bg-white'>
                      <div className={`flex items-center space-x-3 `}>
                        <div className='avatar'>
                          <div className='mask mask-circle mr-8 h-12 w-12'>
                            <Image
                              priority
                              className={``}
                              width={100}
                              height={100}
                              src={client.image || avatar}
                              alt='background'

                            />
                          </div>
                        </div>
                        <div>
                          <div>
                            <div className='font-bold'>{client.name}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='bg-white'>{client?._count.campaigns}</td>
                    <td className='bg-white'>
                      <div className='flex items-center justify-between '>
                        <div className='flex gap-4 flex-wrap'>
                          {client.tags.length === 0 ? (
                            <span>-</span>
                          ) : (
                            client.tags.map(
                              (tag: {
                                id: number
                                name: string
                                key: number
                              }) => (
                                <span key={tag.id} className={`underline`}>
                                  {tag.name}
                                </span>
                              ),
                            )
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='dropdown-end dropdown cursor-pointer'>
                        <svg
                          tabIndex={0}
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='h-6 w-6 relative z-0'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                          />
                        </svg>
                        <ul
                          tabIndex={0}
                          className='dropdown-content menu rounded-box w-max  border-2 border-gray-100 bg-white p-2'>
                          <Link
                            href={'clients/' + client.id}
                            className={`${dropdownButton}`}>
                            view client
                          </Link>

                          <button
                            onClick={() => setEditClientModal(true)}
                            className={`${dropdownButton}`}>
                            edit client
                          </button>
                        </ul>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-[99]'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          {/* The actual dialog panel  */}
          <Dialog.Panel
            className={`flex w-full max-w-xl flex-col rounded-xl bg-white  `}>
            <Image src={modalCover} className='rounded-t-xl' alt={''} />
            <Dialog.Title className=' text-lg font-medium mb-8 text-center'>
              Automatically track when your creators post 🥥
            </Dialog.Title>

            <Tab.Group>
              <Tab.List
                className={`flex flex-row items-center justify-center gap-6 ${ptMono.className}`}>
                <Tab
                  className={({ selected }) =>
                    ` rounded-3xl border-2 border-primary px-12 py-2 ${
                      selected ? 'bg-primary' : ''
                    }`
                  }>
                  add manually
                </Tab>

                <Tab
                  className={({ selected }) =>
                    `rounded-3xl border-2 border-primary px-8  py-2 ${
                      selected ? 'bg-primary' : ''
                    }`
                  }>
                  upload from file
                </Tab>
              </Tab.List>
              <Tab.Panels className='mt-2'>
                <Tab.Panel className=''>
                  <div className='divider px-8'></div>
                  <div className='flex gap-4  px-7 justify-between mb-4'>
                    <div className='w-full'>
                      <p className='text-sm font-semibold'>Assign to creator</p>
                      <select
                        className='w-full mt-4 rounded-xl border border-gray-300 bg-gray-50 pl-4 py-3 text-sm text-gray-900 flex-grow bg-transparent outline-none'
                        name=''
                        id=''></select>
                    </div>
                    <div className='w-full'>
                      <p className='text-sm font-semibold'>
                        Hashtag(s) your creator will use
                      </p>
                      <TagsInput tags={tags} setTags={setTags} />
                    </div>
                  </div>
                  <div className='flex w-full flex-col justify-end items-end px-7 mb-6'>
                    <span className='text-xs italic font-light mb-4'>
                      separate multiple with a enter
                    </span>
                    <button
                      className={`px-9 py-3 bg-green-200 ${ptMono.className} rounded-full`}>
                      start tracking
                    </button>
                  </div>
                </Tab.Panel>

                <Tab.Panel className=''>
                  <div className='flex gap-4  px-7 justify-between mb-4 flex-col'>
                    <h2>
                      Download a{' '}
                      <Link href={'/'}>
                        sample CSV template to see an example of the format
                        required
                      </Link>
                    </h2>
                    <form className='flex flex-col gap-3'>
                      <input
                        name='campaignExcel'
                        id='campaignExcel'
                        type='file'
                        accept='.xlsx, .xls'
                        className='file-input-bordered file-input w-full'
                      />
                      <button
                        className='flex self-end rounded-full bg-green-200 px-8 py-2'
                        type='submit'>
                        add
                      </button>
                    </form>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Dialog
        open={editClientModal}
        onClose={() => setEditClientModal(false)}
        className='relative z-[99]'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className='fixed inset-0 bg-black bg-opacity-25' />

        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          {/* The actual dialog panel  */}
          <Dialog.Panel className='mx-auto flex max-w-lg flex-col items-center justify-center rounded-xl bg-white px-20 py-12'>
            <Dialog.Title className='mb-8 text-lg font-bold'>
              Edit client
            </Dialog.Title>
            <div className={`w-full justify-start ${ptMono.className}`}>
              <form className='flex flex-col gap-4'>
                <label htmlFor='name'>client name</label>
                <input
                  // onChange={e => setName(e.target.value)}
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

                {/* {fetchError && (
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
                )} */}

                <button
                  type='submit'
                  className='rounded-full bg-rose-200 px-6 py-2 '>
                  save changes
                </button>
              </form>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
