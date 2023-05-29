'use client'
import { Dialog } from '@headlessui/react'
import { ptMono } from '@/app/fonts'
import { useState } from 'react'

// Fonts

export default function AddNewCampaign() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Style Variables
  const dropdownButton =
    'text-lg  border-2 inline-block py-2 px-8 m-2 text-back font-medium bg-whiteBrown rounded-full hover:border-orange-100'
  const ActionButtonStyle =
    'flex text-lg align-center items-center border-rose-100 border-2 inline-block py-2.5 px-8 mx-2 text-back font-medium bg-transparent rounded-full  hover:bg-rose-100 cursor-pointer'

  // Arrays
  const button = [
    {
      label: 'manual',
      action: 'Hello',
    },
    {
      label: 'hashtag',
      action: '',
    },
  ]

  // Arrays
  const title = [
    {
      label: 'New Manual Campaign',
    },
    {
      label: 'New Hashtag Campaign',
    },
  ]
  const client = [
    {
      name: "L'Oreal",
      email: 'loreal@lroeal.com',
    },
    {
      name: "Matthew's, Client",
      email: 'loreal@lroeal.com',
    },
    {
      name: "Sophia's Client",
      email: 'loreal@lroeal.com',
    },
  ]

  // Show Arrays
  const clients = client.map((client, index) => (
    <option value={index} id='companies-menu' key={index}>
      {client.name}
    </option>
  ))

  // Show Arrays
  const buttons = button.map((btn, index) => (
    <button
      key={index}
      className={`${dropdownButton}`}
      onClick={() => setIsOpen(true)}>
      {btn.label}
    </button>
  ))

  const handleCreate = async () => {
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        body: JSON.stringify({ name, description: 'test' }),
        headers: { 'Content-Type': 'application/json' },
      })
      setIsOpen(false)
    } catch (error: any) {
      setError(error?.message)
    }
  }

  return (
    <>
      <div className='dropdown-end dropdown cursor-pointer'>
        <label tabIndex={0} className={`${ActionButtonStyle}`}>
          add new
          <svg
            fill='none'
            viewBox='0 0 26 26'
            strokeWidth='1.5'
            stroke='currentColor'
            className='text-midBlack ml-4 h-5 w-5'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 8.25l-7.5 7.5-7.5-7.5'
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className='dropdown-content menu rounded-box mr-4 mt-2 w-auto border-2 border-gray-100 bg-white p-2'>
          {buttons}
        </ul>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-50'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          {/* The actual dialog panel  */}
          <Dialog.Panel className='mx-auto flex max-w-sm flex-col items-center justify-center rounded-xl bg-white px-20 py-12'>
            <Dialog.Title className='text-lg font-bold'>
              {title[1].label}
            </Dialog.Title>
            <div className={`w-full justify-start ${ptMono.className}`}>
              <p className='py-4'>Client</p>
              <select
                id='countries'
                className='block w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'>
                <option value={0} disabled>
                  Choose a client
                </option>
                {clients}
              </select>

              <p className='py-4'>Campaign Title</p>
              <input
                onChange={e => setName(e.target.value)}
                type='text'
                id='name'
                placeholder='Campaign Name'
                className='w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
              />

              <hr className='my-8 h-px border-0 bg-gray-200'></hr>

              {error && (
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
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <div className='text-center'>
                <button
                  onClick={handleCreate}
                  className='rounded-full bg-rose-200 px-6 py-2 '>
                  create project
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
