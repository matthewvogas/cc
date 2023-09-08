import imageCover from 'public/assets/register/examplePosts.png'
import videoCover from 'public/assets/register/creatorImg.jpg'
import backArrow from 'public/assets/register/backArrow.svg'
import CardCarouselPostItem from './cardCarouselPostItem'
import CardCarouselPost from './cardCarouselPost'
import { Dialog, Tab } from '@headlessui/react'
import { ReactNode, useState } from 'react'
import UseThisPost from './useThisPost'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import Link from 'next/link'

export type ChipStateName = 'INFO' | 'PENDING' | 'NOT'
export type ChipState = {
  classNames: string
  content: string
  icon: ReactNode
}

const handleMedia = () => {
  const tab = document.querySelector('.useThisPost')

  tab?.classList.remove('flex')
  tab?.classList.add('hidden')
}

export const chipStateMap: { [key in ChipStateName]: ChipState } = {
  INFO: {
    classNames: 'bg-active',
    content: 'posted',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 22 22'
        strokeWidth={3}
        stroke='black'
        className='h-4 w-4'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M4.5 12.75l6 6 9-13.5'
        />
      </svg>
    ),
  },
  PENDING: {
    classNames: 'bg-beigeFirst',
    content: 'not tracking',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 20 20'
        strokeWidth={3}
        stroke='gray'
        className='h-4 w-4'>
        {' '}
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
    ),
  },
  NOT: {
    classNames: 'bg-orange-100',
    content: 'not yet',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 20 20'
        strokeWidth={3}
        stroke='gray'
        className='h-4 w-4'>
        {' '}
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
    ),
  },
}

export const PostHashtagStatus = ({ state }: { state: ChipStateName }) => {
  const [isOpen, setIsOpen] = useState(false)

  //const post = undefined

  return (
    <>
      <div className='flex justify-start gap-2'>
        <div
          className={`${chipStateMap[state].classNames} flex gap-3 rounded-full px-8 py-3 text-sm text-black`}>
          {chipStateMap[state].icon} {chipStateMap[state].content}
        </div>
        {state == 'INFO' && (
          <button
            onClick={() => {
              setIsOpen(true)
            }}
            className='self-center italic underline'>
            view
          </button>
        )}
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-[99]'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex items-center justify-center p-4 overflow-auto'>
          {/* The actual dialog panel  */}
          <Dialog.Panel
            className={`flex flex-col rounded-xl bg-white w-[665px] `}>
            <Dialog.Title className=' text-lg font-medium mb-4 text-center px-8 py-6 bg-[#F8F5F2] rounded-t-xl'>
              <div className='flex items-center justify-between'>
                <h4 className='text-xl'>View posts</h4>
                <div className={`text-sm ${ptMono.className} flex gap-4`}>
                  <span className='px-8 bg-white py-3 rounded-lg'>
                    @jasminecauntt
                  </span>
                  <span className='px-8 bg-white py-3 rounded-lg'>
                    #examplecampaigntag2023
                  </span>
                </div>
              </div>
            </Dialog.Title>
            <Tab.Group>
              <Tab.List className={` flex-row hidden gap-6 useThisPost`}>
                <Tab
                  onClick={() => {
                    handleMedia()
                  }}
                  className={({ selected }) =>
                    ` text-xs outline-none rounded-3xl mx-6 bg-[#EAE7DF] px-4 py-2  flex items-center gap-2 ${
                      selected ? '' : ''
                    }`
                  }>
                  <Image src={backArrow} className='' alt='' />
                  back to all posts
                </Tab>
              </Tab.List>
              <Tab.Panels className='mt-2'>
                <Tab.Panel className=''>
                  <div>
                    <div
                      className={`flex flex-col rounded-xl bg-white pt-6 px-6 `}>
                      <div className='carousel '>
                        {/* map que recorre todos los pots enviando cada post como card en el carrusel */}
                        <CardCarouselPost post={undefined} key={0} />
                      </div>
                    </div>
                    <div className='flex justify-center w-full py-4 gap-2'>
                      {/* map que recorre todos los pots enviando cada post como item para luego buscarlo*/}
                      <CardCarouselPostItem key={0} />
                    </div>
                  </div>
                </Tab.Panel>

                <Tab.Panel className=''>
                  <UseThisPost />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
