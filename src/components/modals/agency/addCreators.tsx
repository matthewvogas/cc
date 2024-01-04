'use client'

import { CampaignRes } from '@/types/campaign/campaignRes'
import EmailsInput from '@/components/inputs/email'
import { Dialog, Tab } from '@headlessui/react'
import { inter, ptMono } from '@/app/fonts'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import React from 'react'
import Search from '@/components/inputs/search'
import { useRouter } from 'next/navigation'
import imageCover from 'public/assets/register/TopPost.jpg'
import Image from 'next/image'
import Spinner from '@/components/loading/spinner'

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
    setEnviado('');
    setEmail(event.target.value)
  }

  const [creatorSelected, setCreatorSelected] = useState('')
  const filteredCreators = userCreators.filter((creator: any) => {
    const creatorNameMatches = creator?.name
      ?.toLowerCase()
      .includes(inputSearchValue.toLowerCase())
    return creatorNameMatches
  })

  const [codeToCopy, setcodeToCopy] = React.useState('');
  const router = useRouter()
  const [isOpenSend, setIsOpenSend] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const html =
    '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Stats</title> </head> <body>' +
    codeToShareInvite + '</body> </html>';

  const iframe = codeToShareInvite;

  const sendInvite = async () => {
    setLoading(true);
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
    setLoading(false);
    setIsOpen(false)
  }

  const sendGetRequest = async () => {
    const recipientEmail = email;

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
          setEmail('')
          setIsOpenSend(true);
        }, 2000)
      } else {
        console.error('Error en la solicitud:', response.statusText);
        setEnviado('Error, write the email correctly');
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

  const copiarTexto = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      const copiadoModal = document.getElementById('copiadoModal')
      copiadoModal?.classList.remove('hidden')
      setTimeout(() => {
        copiadoModal?.classList.add('hidden')
      }, 1000)
    } catch (err) {
      console.error('Could not copy text: ', err)
    }
  }

  const cleanData = () => {
    setEnviado('');
    setIsCopied(false);
    setEnviadoStatus('');
    setEmail('');
    setIsOpen(false);
    setIsOpenSend(false);
    setLoading(false);
    router.refresh();
  }

  const styles = {
    centered: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#FFFFFF',
    },
  };


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
        onClose={() => {
          cleanData();
        }}
        className='relative z-[99]'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          {/* The actual dialog panel  */}
          <Dialog.Panel
            className={`flex w-full max-w-xl flex-col rounded-xl bg-white  `}>
            <Dialog.Title className=' text-lg font-medium mb-8 text-center mt-12'>
              add creators  <br />
              {loading ? (<Spinner width='w-4' height='h-4' border='border-2' />) : ''}
            </Dialog.Title>
            <Tab.Group>
              <Tab.List
                className={`flex flex-row items-center justify-center gap-6 ${ptMono.className}`}>
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

                    <div className='flex mb-12 grid grid-cols-2 gap-4'>
                      <div>
                        <label
                          className='text-xs text-black opacity-70 font-bold'
                          htmlFor=''>
                          Have your own site you want to invite your creators to
                          sign up for this campaign from? Copy this embed code.
                        </label>
                      </div>
                      <div>
                        <label htmlFor='my-modal-3' className={`cursor-pointer text-sm m-6 w-40 rounded-full border border-[#FACEBC] active:bg-opacity-10 px-8 focus:border-[#c98e77] hover:border-[#eeaf97] active:bg-rose-300 w-full p-4 block text-center ${ptMono.className}`}>
                          embed a form
                        </label>
                        <input type='checkbox' id='my-modal-3' className='  modal-toggle' />
                        <div className='modal'>
                          <div className='modal-box relative flex max-w-max flex-col justify-start overflow-hidden rounded-xl bg-white  p-0'>
                            <label
                              htmlFor='my-modal-3'
                              className='absolute right-4 top-2 cursor-pointer text-lg text-white'>
                              ✕
                            </label>

                            <div className='px-10 py-8'>
                              <h3 className='text-xl font-bold'>
                                Embed your total live stats on to a webpage
                              </h3>

                              <div className={`w-full justify-start `}>
                                <p className={` pb-6 text-xs text-[#7F7F7F] mt-2`}>
                                  Copy and paste a code below. You can manage styles via CSS.
                                </p>

                                <div className='flex gap-6'>
                                  <div className=' flex w-56 text-sm flex-col gap-3'>
                                    <button
                                      onClick={() => setcodeToCopy(html)}
                                      className='w-full rounded-full border border-[#FACEBC] px-8 py-2 hover:bg-[#FACEBC]'>
                                      HTML + CSS
                                    </button>
                                    <button
                                      onClick={() => setcodeToCopy(iframe)}
                                      className='w-full rounded-full border border-[#FACEBC] px-8 py-2 hover:bg-[#FACEBC]'>
                                      iframe
                                    </button>
                                  </div>

                                  <div
                                    className={`w-full rounded-xl border border-[#7F7F7F] p-6 ${ptMono.className}`}>
                                    <textarea
                                      value={codeToCopy}
                                      readOnly
                                      placeholder='https://'
                                      className='h-[124px] min-w-full resize-none text-gray-600 outline-none'
                                    />
                                    <div
                                      id='copiadoModal'
                                      className={` ${inter.className} fixed top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 px-4 py-2 border border-[#b6fcdb] bg-[#e9faf2] bg-opacity-90 text-sm rounded-md z-50 hidden`}>
                                      link copied successfully!
                                    </div>
                                  </div>
                                </div>

                                <hr className=' h-px bg-gray-200 my-8'></hr>

                                <div className='text-right'>
                                  <button
                                    onClick={() => {
                                      copiarTexto(codeToCopy)
                                    }}
                                    className={`${ptMono.className} rounded-lg bg-[#D3F0E2] px-8 py-2`}>
                                    {'copy </>'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
      <Dialog
        open={isOpenSend}
        onClose={() => {
          cleanData();
        }}
        className='relative z-[99]'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className='fixed inset-0 bg-black bg-opacity-25' />

        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          {/* The actual dialog panel  */}
          <Dialog.Panel className='mx-auto flex  flex-col items-center justify-center rounded-lg bg-white'>
            <div className={`w-full justify-start ${ptMono.className}`}>
              <p style={styles.centered}>your creators have been invited.</p>
              <Image
                priority
                className={`object-cover`}
                src={imageCover}
                alt={'card'}
                width={500}
                height={500}></Image>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
