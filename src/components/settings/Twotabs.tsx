import React, { useState } from 'react'
import img from '/public/assets/creatorRegister/exampleImage.jpg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Dialog, Transition } from '@headlessui/react'

import { ptMono } from '@/app/fonts'
type Props = {
  tabs: any[]
  session: any
  user: any
}

function CustomTabs({ tabs }: Props) {
  const [activeTab, setActiveTab] = useState(0)
  const handleTabClick = (index: React.SetStateAction<number>) => {
    setActiveTab(index)
  }

  return (
    <div className='flex flex-row mt-10'>
      <div className='flex flex-col text-start ml-12 w-56 rounded-lg font-semibold'>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`p-3 ${
              activeTab === index
                ? 'text-brown bg-greenCTA rounded-md bg-opacity-50'
                : 'text-brown'
            } inline-block cursor-pointer`}
            onClick={() => handleTabClick(index)}>
            {tab.label}
          </div>
        ))}
      </div>
      <div className='p-4 ml-10 -mt-8 w-full mr-20'>
        {tabs[activeTab].content}
      </div>
    </div>
  )
}

export default function Settings({ session, user }: Props) {
  const [name, setName] = useState(session.user.name)
  const [email, setEmail] = useState(session.user.email)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const [fetchError, setFetchError] = useState('')

  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`api/user/${session.user.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        router.push('/login')
      }
    } catch (error: any) {
      setFetchError(error?.message)
    }
  }

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/user/${session.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      })

      const data = await res.json()

      if (res.status === 200) {
        const updatedUserRes = await fetch(`/api/user/${session.user.id}`)
        const updatedUser = await updatedUserRes.json()
        setName(updatedUser.name)
        setEmail(updatedUser.email)
      } else {
        setFetchError(data.error || 'An error occurred')
      }
    } catch (error: any) {
      setFetchError(error?.message)
    }
  }
  const tabs = [
    {
      label: 'Profile Settings',
      content: (
        <div>
          <div className='bg-background rounded-lg bg-opacity-20 mr-20'>
            <div className='flex flex-row space-x-96 p-10 content-center justify-between items-center'>
              <h1 className='font-semibold text-xl'>Profile Settings</h1>
              <button
                className='bg-greenCTA p-4 rounded-full px-10 font-semibold bg-opacity-50'
                onClick={() => {
                  handleUpdate()
                }}>
                save
              </button>
            </div>
            <div className='divider -mt-5'></div>

            <div className='flex flex-row items-center gap-10'>
              <div className='flex flex-col p-10 -mt-80 '>
                <div className='mask mask-circle'>
                  <Image
                    priority
                    className={``}
                    width={180}
                    height={180}
                    src={img}
                    alt='background'
                  />
                </div>
                <button className='bg-greenCTA -mt-3 z-10 self-center rounded-full px-8 py-1.5'>
                  edit
                </button>
              </div>
              <div className='flex flex-col gap-4 mt-10 '>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type='text'
                  placeholder='Name'
                  className={`${ptMono.className} text-black placeholder-black rounded-full py-6 pl-8 bg-background px-96 bg-opacity-40 outline-none`}
                />
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type='text'
                  placeholder='Email - Username'
                  className={`${ptMono.className} text-black placeholder-black rounded-full py-6 pl-8 bg-background px-96 bg-opacity-40 outline-none`}
                />

                <div className='flex flex-col gap-4 dropdown'>
                  <label tabIndex={0} className='text-[#99A09D] ml-2'>
                    Password-Info
                  </label>
                  <input
                    type='password'
                    placeholder='Current password'
                    className={`${ptMono.className} text-black placeholder-black rounded-full py-6 pl-8 bg-background px-96 bg-opacity-40 outline-none`}
                  />
                  <input
                    type='password'
                    placeholder='New password'
                    className={`${ptMono.className} text-black placeholder-black rounded-full py-6 pl-8 bg-background px-96 bg-opacity-40 outline-none`}
                  />
                  <div className='divider'></div>
                </div>
                <div className=''>
                  <span className='font-semibold'>Categories</span>
                  <div className='flex flex-row gap-3 mt-5'>
                    <button className='border-2 border-[#E2DED4] rounded-full px-8 py-3 hover:bg-color-[#E2DED4]'>
                      beauty
                    </button>
                    <button className='border-2 border-[#E2DED4] rounded-full px-8 py-3'>
                      fashion
                    </button>
                    <button className='border-2 border-[#E2DED4] rounded-full px-8 py-3 hover:bg-color-[#E2DED4]'>
                      skincare
                    </button>
                    <button className='border-dashed border-2 border-[#859991] rounded-full px-8 py-3'>
                      add
                    </button>
                  </div>
                </div>
                <div>
                  <div className='gap-10 mt-5'>
                    <span className='font-semibold'>Location</span>
                  </div>
                  <div className='flex flex-row gap-20 mt-5'>
                    <div className='flex flex-col gap-2'>
                      <span className='font-semibold'>Country</span>
                      <input
                        className={`${ptMono.className} text-black placeholder-black bg-background bg-opacity-40 outline-none rounded-md py-2 pl-1 px-10`}
                        placeholder='Costa Rica'></input>
                    </div>
                    <div className='flex flex-col gap-2 mb-10'>
                      <span className='font-semibold'>City</span>
                      <input
                        className={`${ptMono.className} text-black placeholder-black bg-background bg-opacity-40 outline-none rounded-md py-2 pl-1 px-10`}
                        placeholder='San Jose'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-[#F5F5F5] flex flex-row mr-20 mt-10 justify-between items-center rounded-lg'>
            <div className='flex flex-col p-10'>
              <span className='font-bold text-lg'>Deactivate your account</span>
              <span>Delete your Codecoco account and all data.</span>
            </div>
            <div>
              <button
                onClick={openModal}
                className='border bg-[#FACEBC] p-4 px-8 rounded-full font-semibold mr-10 bg-opacity-40'>
                delete your account
              </button>
              <Transition appear show={isOpen}>
                <Dialog
                  as='div'
                  className='fixed inset-0 z-50 overflow-y-auto'
                  onClose={closeModal}>
                  <div className='flex items-center justify-center min-h-screen px-4 text-center'>
                    <Transition.Child
                      enter='ease-out duration-300'
                      enterFrom='opacity-0'
                      enterTo='opacity-100'
                      leave='ease-in duration-200'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'>
                      <Dialog.Overlay className='fixed inset-0 bg-black opacity-60' />
                    </Transition.Child>

                    <Transition.Child
                      enter='ease-out duration-300'
                      enterFrom='opacity-0 scale-95'
                      enterTo='opacity-100 scale-100'
                      leave='ease-in duration-200'
                      leaveFrom='opacity-100 scale-100'
                      leaveTo='opacity-0 scale-95'>
                      <Dialog.Panel className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                        <Dialog.Title
                          as='h3'
                          className='text-lg font-medium leading-6 text-red-600'>
                          DELETE YOUR ACCOUNT
                        </Dialog.Title>
                        <div className='mt-4'>
                          <p className='text-sm text-gray-600'>
                            Are you sure you want to DELETE your codecoco
                            account?
                            <span className='block text-red-500'>
                              By doing this, all your data will be permanently
                              deleted from our database.
                            </span>
                          </p>
                        </div>
                        <div className='mt-6 flex gap-5'>
                          <button
                            type='button'
                            className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500'
                            onClick={handleDelete}>
                            Yes, Delete My Account!
                          </button>
                          <button
                            type='button'
                            className='inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500'
                            onClick={closeModal}>
                            No, Keep My Account
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </Dialog>
              </Transition>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Notifications',
      content: (
        <div className='bg-background rounded-lg bg-opacity-20 mr-20'>
          <div className='flex flex-row space-x-96 p-10 content-center justify-between items-center'>
            <h1 className='font-semibold text-xl '>Notifications</h1>
            <button className='bg-greenCTA p-4 rounded-full px-10 font-semibold bg-opacity-50'>
              save
            </button>
          </div>
          <div className='divider -mt-5'></div>
          <div className='flex flex-col p-10'>
            <span className='font-bold text-xl mb-8'>
              Let us know what you’d like to be notified about and how
            </span>
            <span className='font-semibold text-lg mb-5'>
              Email for notifications
            </span>
            <div>
              <input
                type='email'
                placeholder='Email'
                className={`${ptMono.className} text-black placeholder-black rounded-full -ml-3 py-6 pl-8 px-80 bg-background bg-opacity-40 outline-none`}
              />
            </div>
          </div>
          <div className='flex flex-col p-10 -mt-10 gap-3'>
            <span className='font-semibold mb-5'>
              Select notifications you want to receive
            </span>
            <div className='flex flex-row gap-3'>
              <input
                type='checkbox'
                name=''
                id=''
                className='accent-[#E2DED4]'
              />
              <span className={`${ptMono.className}`}>
                Product updates from Codecoco team
              </span>
            </div>
            <div className='flex flex-row gap-3'>
              <input
                type='checkbox'
                name=''
                id=''
                className='accent-[#E2DED4]'
              />
              <span className={`${ptMono.className}`}>
                New views on your portfolio if private
              </span>
            </div>
            <div className='flex flex-row gap-3'>
              <input
                type='checkbox'
                name=''
                id=''
                className='accent-[#E2DED4]'
              />
              <span className={`${ptMono.className}`}>Our newsletter</span>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div>
      <CustomTabs tabs={tabs} session={session} user={user} />
    </div>
  )
}
