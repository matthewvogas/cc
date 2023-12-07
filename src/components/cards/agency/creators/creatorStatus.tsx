import React, { useEffect, useState } from 'react'
import { Dialog, Tab } from '@headlessui/react'
import { User } from '@prisma/client'
import { inter } from '@/app/fonts'
import Link from 'next/link'

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

  const handleChange = (event: any) => {
    setEmail(event.target.value)
  }

  const sendInvite = async () => {
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
                <Dialog.Title className='text-lg font-medium px-12 mt-12'>
                  First invite the creator so you can access their social media
                  data, then you can connect with them
                </Dialog.Title>
                <Tab.Group>
                  <Tab.Panels className='mt-2'>
                    <Tab.Panel className=''>
                      <div className='px-12'>
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
                        <p
                          className={`text-sm font-medium pb-2 pt-6 ${inter.className}`}>
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
                  </Tab.Panels>
                </Tab.Group>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
