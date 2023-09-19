import TagsInput from '@/components/inputs/tag'
import useClients from '@/hooks/useClients'
import { Dialog } from '@headlessui/react'
import React, { useState } from 'react'
import { ptMono } from '@/app/fonts'

type Props = {
  campaignsFallback: any
  clientsFallback: any
  text: string
  icon: any
}

export default function AddClients({
  campaignsFallback,
  clientsFallback,
  text,
  icon,
}: Props) {
  const { clients, areClientsLoading, clientsError, refreshClients } =
    useClients(clientsFallback)

  const [tags, setTags] = useState<string[]>([])

  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [fetchError, setFetchError] = useState<string | null>(null)

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
      <button
        onClick={() => {
          setIsOpen(true)
        }}>
        <label
          tabIndex={0}
          className={`bg-[#E9F7F0] flex bg-text-lg align-center items-center border-rose-100 mx-2 px-9 py-3 text-back font-medium h-14 rounded-full cursor-pointer`}>
          {text}
          {icon}
        </label>
      </button>

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
