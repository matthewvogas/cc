import { ptMono } from '@/app/fonts'
import { Dialog } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import React from 'react'
import FilterBy from './modals/filterBy'

const buttonsStyle =
  'px-8 py-2 mr-4 border-2 border-transparent text-xm rounded-full items-center rounded-full p-2 text-gray-900 hover:border-2 hover:border-rose-200 focus:border-rose-200'

export default function ManagePosts(props: { addPost: any }) {
  const [openDialog, handleDisplay] = React.useState(false)

  const [typeOfCampaign, setTypeOfCampaign] = React.useState('creator')
  const [titleCampaign, setTitleCampaign] = React.useState(
    'filter view by creator',
  )

  // Usar los estados anteriores para manejar el listado de botones, se debe usar los sets tomando la data de la db para establecerlo como creator o hasgtag

  const handleClose = () => {
    handleDisplay(false)
  }

  const openDialogBox = () => {
    handleDisplay(true)
  }

  const openCreateCard = () => {
    props.addPost(true)
  }

  const manageType = (key: any) => {
    switch (key) {
      case 'hashtag':
        return (
          <Dialog.Panel className='flex max-w-lg flex-col items-center justify-center rounded-xl bg-white px-20 py-12'>
            <Dialog.Title className='mb-8 text-lg font-bold'>
              {titleCampaign}
            </Dialog.Title>
            <FilterBy />
          </Dialog.Panel>
        )
      case 'creator':
        return (
          <Dialog.Panel className='flex max-w-lg flex-col items-center justify-center rounded-xl bg-white px-20 py-12'>
            <Dialog.Title className='mb-8 text-lg font-bold'>
              filter view by hashtag
            </Dialog.Title>
            <FilterBy />
          </Dialog.Panel>
        )
      default:
        break
    }
  }

  return (
    <>
      <div className=' my-4 mb-5 w-full md:px-12'>
        <h3 className='mb-4 mt-16 text-lg font-bold'>Grid</h3>
        <div className='flex justify-between'>
          <div className='z-10 flex items-center gap-6'>
            <button type='button' className={buttonsStyle}>
              gallery view
            </button>

            {/* MODAL TO OPEN MODAL */}

            <button
              type='button'
              onClick={openDialogBox}
              className={buttonsStyle}>
              by {typeOfCampaign}
            </button>

            <div className='dropdown-end dropdown '>
              <button tabIndex={0} type='button' className={buttonsStyle}>
                by platform
              </button>
              <div
                tabIndex={0}
                className='dropdown-content menu rounded-box mr-4 mt-2 w-auto border-2 border-gray-100 bg-white p-2'>
                <div className='m-4 flex flex-col gap-5'>
                  <div className='flex flex-row gap-2'>
                    <button className=' rounded-full bg-beigeFirst px-6 py-2.5  hover:bg-beigeSelected focus:bg-beigeSelected'>
                      Instagram
                    </button>
                    <button className=' rounded-full bg-beigeFirst px-6 py-2.5  hover:bg-beigeSelected focus:bg-beigeSelected'>
                      TikTok
                    </button>
                    <button className=' rounded-full bg-beigeFirst px-6 py-2.5  hover:bg-beigeSelected focus:bg-beigeSelected'>
                      Facebook
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button type='button' className={buttonsStyle}>
              latest
            </button>
            <button type='button' className={buttonsStyle}>
              most viewed
            </button>
          </div>
          <div className='flex gap-6'>
            <button
              onClick={openCreateCard}
              className={`mx-2 flex items-center rounded-full bg-active px-8 py-3 text-lg text-black ${ptMono.className}`}>
              add a post
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='ml-4 inline h-4 w-4'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 4.5v15m7.5-7.5h-15'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        className='relative z-[99]'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className='fixed inset-0 bg-black bg-opacity-25' />
        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          {/* The actual dialog panel  */}
          {manageType('hashtag')}
        </div>
      </Dialog>
    </>
  )
}
