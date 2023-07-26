'use client'
import { Dialog, Tab } from '@headlessui/react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import prev from 'public/assets/register/sharePublicModal.jpg'

export const RedirectLink = (props: {
  id: number
  tags: any
  creatorsSelecteds: any
  activePlatforms: any
  mostView: string
}) => {
  const baseUrl = 'codecoco.co/campaign'
  const params = `?tags=${props.tags?.join(
    ',',
  )}&creators=${props.creatorsSelecteds?.join(
    ',',
  )}&platforms=${props.activePlatforms?.join(',')}&view=${props.mostView}`

  const link = `${baseUrl}/${props.id}${params}`
  const [isOpen, setIsOpen] = React.useState(false)
  const [openTab, setOpenTab] = React.useState(1)
  const [codeToCopy, setcodeToCopy] = React.useState('')

  const iframe = '<iframe src="' + link + '" height="200" width="300"></iframe>'

  const html =
    '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Campaign</title> </head> <body>' +
    '<iframe src="' +
    link +
    '" height="200" width="300"></iframe>' +
    '</body> </html>'

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='rounded-full text-sm border border-black px-8 py-3 md:text-base hover:bg-black hover:text-white'>
        share this view
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-[99] '>
        <div className='fixed inset-0  bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center p-4 '>
          <Dialog.Panel
            className={`flex w-full max-w-2xl flex-col rounded-xl bg-white sm:px-0`}>
            <Image
              className='rounded-t-xl'
              priority
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              src={prev}
              alt='prev'
            />
            <div className='-mt-[170px]'>
              <div className='flex'>
                <h5 className='ml-20 rounded-t-xl pb-4 pt-8 text-xl font-medium text-white '>
                  Share these filtered posts via link or add it to your site 🥥
                </h5>
                <Link
                  target='_blank'
                  href={link}
                  className='mr-20 w-[40%] self-end rounded-t-xl pb-4 pt-8 text-right text-base italic text-white underline'>
                  fun sharing ideas
                </Link>
              </div>

              <ul
                className='mb-0 flex list-none flex-row pt-4 md:px-14 '
                role='tablist'>
                <li className=' -mb-px mr-2 w-full flex-auto rounded-t-3xl text-center last:mr-0'>
                  <a
                    className={
                      ' block h-full  w-full rounded-t-xl p-2 px-5 py-3 text-left text-xs leading-normal text-black ' +
                      (openTab === 1
                        ? ' bg-white'
                        : ' rounded-t-xl bg-white bg-opacity-70')
                    }
                    onClick={e => {
                      e.preventDefault()
                      setOpenTab(1)
                    }}
                    data-toggle='tab'
                    href='#link1'
                    role='tablist'>
                    <p className='pb-1 text-base font-medium'>share via link</p>
                  </a>
                </li>

                <li className='-mb-pxrounded-t-3xl  mr-2 w-full flex-auto text-center last:mr-0 '>
                  <a
                    className={
                      'block h-full  w-full rounded-t-xl p-2 px-5 py-3 text-left text-xs leading-normal text-black' +
                      (openTab === 2
                        ? ' bg-white'
                        : ' rounded-t-xl bg-white bg-opacity-70')
                    }
                    onClick={e => {
                      e.preventDefault()
                      setOpenTab(2)
                    }}
                    data-toggle='tab'
                    href='#link1'
                    role='tablist'>
                    <p className='pb-1 text-base font-medium'>embed</p>
                  </a>
                </li>
              </ul>
            </div>

            <div
              className={`flex w-full flex-col rounded-b-xl bg-white md:px-14`}>
              <div className='mt-8'>
                <div className='tab-content tab-space'>
                  {/* tab 1 */}
                  <div
                    className={openTab === 1 ? 'block ' : 'hidden'}
                    id='link1'>
                    {/* Campaign permalink */}
                    <div className='mb-12 rounded-xl bg-greenPastel p-7'>
                      <p className='mb-4 text-xl'>Campaign permalink</p>
                      <input
                        className='mb-2 w-full select-all rounded-xl px-5 py-3 focus:outline-none'
                        placeholder='https://campaign.codecoco.co/349500'
                        type='text'
                        value={'https://dev.codecoco.co' + link}
                        readOnly
                      />
                    </div>

                    {/* Invite people to view */}
                  </div>

                  {/* tab 2 */}

                  {/* technology to share */}
                  <div
                    className={openTab === 2 ? 'mb-4 block' : 'hidden'}
                    id='link2'>
                    <div className='flex '>
                      <button
                        onClick={() => {
                          setcodeToCopy(iframe)
                        }}
                        className='text-xm mr-4 items-center rounded-full border-2 border-transparent p-2 px-8 py-2 text-gray-900 hover:bg-green-200 hover:bg-opacity-50 '>
                        iframe
                      </button>
                      <button
                        onClick={() => {
                          setcodeToCopy(html)
                        }}
                        className='text-xm mr-4 items-center rounded-full border-2 border-transparent p-2 px-8 py-2 text-gray-900 hover:bg-green-200 hover:bg-opacity-50 '>
                        HTML y CSS
                      </button>
                    </div>

                    {/* share */}
                    <div className='mt-6 flex h-auto '>
                      {/* share code */}
                      {/* code */}
                      <div className='mb-8 w-full '>
                        <textarea
                          placeholder='<<<<<'
                          className=' h-full w-full select-all resize-none rounded-xl bg-gray-100 p-6 outline-none'
                          value={codeToCopy}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
