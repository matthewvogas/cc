import React, { useEffect, useState } from 'react'
import { Dialog, Tab } from '@headlessui/react'
import { User } from '@prisma/client'
import { inter } from '@/app/fonts'
import Link from 'next/link'
import { ptMono } from '@/app/fonts'
import Spinner from '@/components/loading/spinner'

type Props = {
  creator: any
  session: any
}

export function Connect({ session, creator }: Props) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [email, setEmail] = useState('')
  const [enviadoStatus, setEnviadoStatus] = useState('bg-transparent')
  const [enviado, setEnviado] = useState('')
  const [inviteStatus, setInviteStatus] = useState('invite')
  const [linkToShareInvite, setLinkToShareInvite] = useState('')
  const [codeToShareInvite, setCodeToShareInvite] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event: any) => {
    setEnviado('');
    setEmail(event.target.value)
  }

  const sendInvite = async () => {
    setLoading(true);
    const creatorId = await creator.users.find(
      (user: any) => user.role === 'CREATOR',
    ).id
    try {
      const res = await fetch('/api/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: session?.user?.id,
          receiverId: creatorId,
        }),
      })

      if (res.status === 200) console.log(res.status)
    } catch (error: any) { }
    setIsOpen(false)
    setLoading(false);
  }

  const sendGetRequest = async () => {
    const recipientEmail = email

    if (!recipientEmail) {
      setEnviado('Error, write the email correctly');
      return;
    }

    setLoading(true);

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
    setLoading(false);
  }

  useEffect(() => {
    const url =
      'https://codecoco.co/invites/' + String(session?.user?.email)
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
        onClick={() => setIsOpen(true)}
        className={`flex justify-center rounded-full px-5 py-3 border border-[#FACEBC] bg-transparent`}>
        {' '}
        invite{' '}
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-[99]'>
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <Dialog.Panel
            className={`flex w-full max-w-xl flex-col rounded-xl bg-white`}>
            {creator.uuid ? (
              <>
                <Dialog.Title className='text-lg font-medium px-12 mt-12'>
                  bungalowslasiguanas already have a codecoco account, only
                  connect with
                </Dialog.Title>

                <div className='px-12'>
                  <label className='text-xs text-black opacity-50' htmlFor=''>
                    Invite your creators to connect with your campaign{' '}
                    <span className='font-bold'> like creators</span> below so
                    their stats can be tracked. This gets you a more accurate
                    look at your campaign success and saves both of you hours of
                    collecting stats!{' '}
                    <Link className='underline' href={'/privacy'}>
                      Learn more about privacy and security.
                    </Link>
                  </label>

                  <div className='mt-6 text-right'>
                    <button
                      onClick={sendInvite}
                      className='rounded-full mb-12 bg-active px-8 py-2 '>
                      Connect with
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Dialog
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                  className='relative z-[99]'>
                  {/* The backdrop, rendered as a fixed sibling to the panel container */}
                  <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

                  {/* Full-screen container to center the panel */}
                  <div className='fixed inset-0 flex items-center justify-center p-4'>
                    <Dialog.Panel className={`flex w-full max-w-xl flex-col rounded-xl bg-white  `}>
                      <Dialog.Title className='text-lg font-medium px-12 mt-12 mb-8 text-center'>
                        invite creators <br />
                        {loading ? (<Spinner width='w-4' height='h-4' border='border-2' />) : ''}
                      </Dialog.Title>
                      <Tab.Group>
                        <Tab.List className={`flex flex-row items-center justify-center gap-6 mb-6 ${ptMono.className}`}>
                          <Tab
                            className={({ selected }) =>
                              ` rounded-3xl border-2 border-primary px-12 py-2 ${selected ? 'bg-primary' : ''
                              }`
                            }>
                            add manually
                          </Tab>

                          <Tab
                            className={({ selected }) =>
                              `rounded-3xl border-2 border-primary px-8  py-2 ${selected ? 'bg-primary' : ''
                              }`
                            }>
                            invite to connect
                          </Tab>
                        </Tab.List>
                        <Tab.Panels className=''>
                          <Tab.Panel>
                            <div className='px-12'>
                              <p className='text-md font-medium mb-3'>
                                First invite the creator so you can access their social media
                                data, then you can connect with them
                              </p>
                              <label
                                className='text-xs text-black opacity-50'
                                htmlFor=''>
                                Invite your creators to connect with your campaign{' '}
                                <span className='font-bold'> like creators</span>{' '}
                                below so their stats can be tracked. This gets you a
                                more accurate look at your campaign success and saves
                                both of you hours of collecting stats!{' '}
                                <Link className='underline' href={'/privacy'}>
                                  Learn more about privacy and security.
                                </Link>
                              </label>
                              <p className={`text-sm font-medium pb-2 pt-6 ${inter.className}`}>
                                Send an invite via email to
                              </p>
                              <div>
                                <div className='flex gap-2 '>
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
                              </div>
                            </div>
                          </Tab.Panel>
                          <Tab.Panel>
                            <div className='px-12 mt-2'>
                              <label className='text-xs text-black opacity-50' htmlFor=''>
                                Invite your creators to connect with your campaign below
                                so their stats can be tracked. This gets you a more
                                accurate look at your campaign success and saves both of
                                you hours of collecting stats!{' '}
                                <Link className='underline' href={'/privacy'}>
                                  Learn more about privacy and security.
                                </Link>
                              </label>
                              <p className={`text-sm font-medium pb-2 mt-6 ${inter.className}`}>
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
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
