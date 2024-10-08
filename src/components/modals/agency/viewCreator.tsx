import PostsByPlatformAndCreator from '@/components/tabs/CampaingTabs/postsByPlatformAndCreator'
import avatar from 'public/assets/register/avatar.jpg'
import { Dialog } from '@headlessui/react'
import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'

type Props = {
  creator: any
  campaigns: any
}

export default function ViewCreator({ creator, campaigns }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true)
        }}>
        <label
          tabIndex={0}
          className={`text-sm border-2 inline-block py-3.5 px-8 m-2 text-back font-medium bg-whiteBrown rounded-2xl w-64 hover:bg-transparent hover:border-orange-100`}>
          view creator
        </label>
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-[99]'>
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <Dialog.Panel
            className={`flex w-full max-w-5xl flex-col rounded-xl bg-white  `}>
            <Tab.Group>
              <div className='flex justify-between px-12 py-8'>
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
                    <div className='font-medium text-xl'>
                      @{creator.creatorUsername}
                    </div>
                    <div className='text-xs opacity-50 font-normal'>
                      {/* {creator.followersCount} followers */}
                      {creator.creatorUsername}
                    </div>
                  </div>
                </div>

              </div>

              <PostsByPlatformAndCreator
                creator={creator.creatorId}
                campaigns={campaigns}
              />
           
            </Tab.Group>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
