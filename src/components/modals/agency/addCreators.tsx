'use client'

import { CampaignRes } from '@/types/campaign/campaignRes'
import EmailsInput from '@/components/inputs/email'
import { Dialog, Tab } from '@headlessui/react'
import { inter, ptMono } from '@/app/fonts'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import React from 'react'
import Search from '@/components/inputs/search'

type Props = {
  userCreators: any
  session: any
}

export default function AddCreators({ userCreators, session }: Props) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [linkToShareInvite, setLinkToShareInvite] = useState('')
  const [codeToShareInvite, setCodeToShareInvite] = useState('')
  const [emails, setEmails] = useState<string[]>([])
  const [inputSearchValue, setInputSearchValue] = useState('')

  const [isCopied, setIsCopied] = useState(false)

  const [email, setEmail] = useState('')
  const [enviadoStatus, setEnviadoStatus] = useState('bg-transparent')
  const [enviado, setEnviado] = useState('')
  const [inviteStatus, setInviteStatus] = useState('invite')
  const handleChange = (event: any) => {
    setEmail(event.target.value)
  }

  const [creatorSelected, setCreatorSelected] = useState('')
  const filteredCreators = userCreators.filter((creator: any) => {
    const creatorNameMatches = creator?.name
      ?.toLowerCase()
      .includes(inputSearchValue.toLowerCase())
    return creatorNameMatches
  })

  const sendInvite = async () => {
    try {
      const res = await fetch('/api/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: session?.user?.id,
          receiverId: creatorSelected,
        }),
      })

      if (res.status === 200) console.log(res.status)
    } catch (error: any) {}

    setIsOpen(false)
  }

  const sendGetRequest = async () => {
    const recipientEmail = email

    try {
      const response = await fetch(`/api/email?to=${recipientEmail}`, {
        method: 'GET',
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data.message)
        setEnviadoStatus('bg-green-400 text-white')
        setEnviado('')
        setTimeout(() => {
          setIsOpen(false)
          setEnviadoStatus('bg-transparent')
          setInviteStatus('invited')
        }, 2000)
      } else {
        console.error('Error en la solicitud:', response.statusText)
        setEnviado('Error, write the email correctly')
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  useEffect(() => {
    const url =
      'https://dev.codecoco.co/invites/' + String(session?.user?.email)
    const iframeString = `<iframe src="${url}" width="600" height="400" frameborder="0" allowfullscreen></iframe>`
    setLinkToShareInvite(url)
    setCodeToShareInvite(iframeString)
  }, [session])

  const copyToClipboardLink = async () => {
    try {
      await navigator.clipboard.writeText(linkToShareInvite)

      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Error al copiar al portapapeles: ', err)
    }
  }
  const copyToClipboardCode = async () => {
    try {
      await navigator.clipboard.writeText(codeToShareInvite)

      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Error al copiar al portapapeles: ', err)
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
          className={`bg-[#E9F7F0] flex bg-text-lg align-center items-center border-rose-100 py-2.5 px-9 text-back font-medium h-full rounded-full cursor-pointer`}>
          Add creators
        </label>
      </button>

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
            <Dialog.Title className=' text-lg font-medium mb-8 text-center mt-12'>
              add creators
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
                  invite to connect
                </Tab>
              </Tab.List>
              <Tab.Panels className='mt-2'>
                <Tab.Panel className=''>
                  <div className='px-12 mt-8'>
                    <label className='text-xs text-black opacity-50' htmlFor=''>
                      Manually adding creators is to assign posts to their
                      profile and organize them within campaigns. To collect
                      additional stats, invite creators to connect instead.
                    </label>

                    <p
                      className={`text-sm font-medium pb-2 pt-6 ${inter.className}`}>
                      Search for a creator
                    </p>
                    {/* <input
                      type='text'
                      id='default-input'
                      placeholder='search Codecoco database'
                      className={`w-full rounded-xl border border-gray-300 bg-white p-2.5 px-4 text-sm text-gray-900 focus:outline-0 ${ptMono.className}`}
                    /> */}
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
                            <span className='text-xs italic'>
                              last creators
                            </span>
                            {filteredCreators
                              .slice(0, 1)
                              .map((creator: any, index: any) => (
                                <button
                                  key={index}
                                  onClick={() => {
                                    setCreatorSelected(creator.id)
                                    setInputSearchValue(creator.name)
                                  }}>
                                  {creator.name}
                                </button>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='mt-6 text-right'>
                      <button
                        onClick={sendInvite}
                        className='rounded-full bg-active px-8 py-2 '>
                        Send
                      </button>
                    </div>
                    <hr className='my-8 h-px border-0 bg-gray-200'></hr>

                    <div className='flex mb-12'>
                      <button
                        className={`text-sm mr-6 w-80 rounded-full bg-[#FACEBC] bg-opacity-70 px-8 py-2 ${ptMono.className}`}>
                        upload from file
                      </button>
                      <label
                        className='text-xs text-black opacity-70'
                        htmlFor=''>
                        Download a{' '}
                        <span className='underline'>sample CSV template</span>{' '}
                        to see an example fo the format required.
                      </label>
                    </div>
                  </div>
                </Tab.Panel>

                <Tab.Panel className=''>
                  <div className='px-12 mt-8'>
                    <label className='text-xs text-black opacity-50' htmlFor=''>
                      Invite your creators to connect with your campaign below
                      so their stats can be tracked. This gets you a more
                      accurate look at your campaign success and saves both of
                      you hours of collecting stats!{' '}
                      <Link className='underline' href={'/privacy'}>
                        Learn more about privacy and security.
                      </Link>
                    </label>

                    <p
                      className={`text-sm font-medium pb-2 pt-6 ${inter.className}`}>
                      Send an invite via email
                    </p>
                    <div className='flex gap-2'>
                      <input
                        value={email}
                        onChange={handleChange}
                        type='text'
                        className='flex items-center bg-transparent px-2 text-sm rounded-xl border bg-gray-50  gap-2 w-full pl-2 py-2 pr-2 outline-none'
                        placeholder='sophia@codecoco.co'
                      />
                      <button
                        onClick={sendGetRequest}
                        className={`rounded-xl border px-8 py-2  ${enviadoStatus}`}>
                        send
                      </button>
                    </div>
                    <div className='mb-12 mt-2'>
                      <p className='text-sm text-red-600 font-semibold'>
                        {enviado}
                      </p>
                      <label
                        className='text-xs text-black opacity-50 '
                        htmlFor=''>
                        write only one email
                      </label>
                    </div>
                    <p
                      className={`text-sm font-medium pb-2 ${inter.className}`}>
                      Copy link
                    </p>
                    <div className='flex gap-2'>
                      <input
                        value={linkToShareInvite}
                        type='text'
                        id='default-input'
                        className={`w-full rounded-xl border border-gray-300 bg-white p-2.5 px-4 text-sm text-gray-900 focus:outline-0 ${ptMono.className}`}
                      />
                      <button
                        onClick={copyToClipboardLink}
                        className='rounded-xl bg-active px-8 py-2 '>
                        copy
                      </button>
                    </div>
                    <hr className='my-8 h-px border-0 bg-gray-200'></hr>

                    <div className='flex mb-12'>
                      <label
                        className='text-xs text-black opacity-70'
                        htmlFor=''>
                        Have your own site you want to invite your creators to
                        sign up for this campaign from? Copy this embed code.
                      </label>
                      <button
                        onClick={copyToClipboardCode}
                        className={`text-sm ml-6 w-80 rounded-full border border-[#FACEBC] active:bg-opacity-10 px-8 focus:border-[#c98e77] hover:border-[#eeaf97] active:bg-rose-300 ${ptMono.className}`}>
                        embed a form
                      </button>
                    </div>
                    {isCopied && (
                      <div className='shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 px-4 py-2 rounded-md'>
                        Code copied!
                      </div>
                    )}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
