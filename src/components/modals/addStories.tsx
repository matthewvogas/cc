import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { CampaignRes } from '@/types/campaign/campaignRes'
import modalCover from 'public/assets/register/addpostToTrack.jpg'
import ImageUploader from './imageUploader'

type Props = {
  campaignFallback: CampaignRes
  clientFallback: any
}

export default function AddNewStories({
  campaignFallback,
  clientFallback,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true)
        }}>
        <label
          tabIndex={0}
          className={`flex items-center rounded-full bg-active px-8 min-w-max max-h-6 min-h-[52px] py-3 text-lg text-black cursor-pointer ${ptMono.className}`}>
          upload stories
        </label>
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-[99]'>
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <Dialog.Panel
            className={`flex w-full max-w-xl flex-col rounded-xl bg-white`}>
            <Dialog.Title className=' text-lg font-medium mb-2 text-center mt-16'>
              add stories
            </Dialog.Title>
            <Tab.Panels className=''>
              <p className='text-xs font-medium mx-12 my-4'>
                Upload screenshots of stories here so they display with your
                other posts.
              </p>
              <div className='w-full flex justify-center mb-12'>
                <ImageUploader
                  setIsOpen={setIsOpen}
                  campaignFallback={campaignFallback}
                />
              </div>
            </Tab.Panels>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
