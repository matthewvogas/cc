'use client'
import { ptMono } from '@/app/fonts'
import { Dialog } from '@headlessui/react'
import FilterBy from './modals/filterBy'
import React, { useState } from 'react'
import { RedirectLink } from '@/app/campaign/[id]/linkShare'

const buttonsStyle =
  'px-8 py-2  border-2 text-base rounded-full items-center rounded-full p-2 text-gray-900 hover:border-rose-200  whitespace-nowrap'

export interface Props {
  readonly id: number
  readonly addPost: any
  readonly shared: boolean
  readonly title: string
  readonly tags: string[]
  readonly setTags: React.Dispatch<React.SetStateAction<string[]>>
  readonly creatorsSelecteds: any[]
  readonly setCreatorsSelecteds: any
  readonly activePlatforms: any[]
  readonly setActivePlatforms: any
  readonly activeButton: any
  readonly setActiveButton: any
  readonly mostView: string
}

export default function ManagePosts({
  id,
  addPost,
  shared,
  title,
  tags,
  setTags,
  creatorsSelecteds,
  setCreatorsSelecteds,
  activePlatforms,
  setActivePlatforms,
  activeButton,
  setActiveButton,
  mostView,
}: Props) {
  const [openDialog, handleDisplay] = React.useState(false)
  const [titleCampaign, setTitleCampaign] = React.useState('')

  const handleRemoveTag = (tag: string) => {
    const updatedTags = tags.filter(t => t !== tag)
    setTags(updatedTags)
  }

  const handleRemoveCreator = (creator: any) => {
    const updatedCreators = creatorsSelecteds.filter(c => c !== creator)
    setCreatorsSelecteds(updatedCreators)
  }

  const handleRemovePlatform = (platform: string) => {
    const updatedPlatforms = activePlatforms.filter(p => p !== platform)
    setActivePlatforms(updatedPlatforms)
  }

  const handlePlatformClick = (platform: string) => {
    if (activePlatforms.includes(platform)) {
      const updatedPlatforms = activePlatforms.filter(p => p !== platform)
      setActivePlatforms(updatedPlatforms)
    } else {
      setActivePlatforms([...activePlatforms, platform])
    }
  }

  const handleClearArrays = () => {
    setTags([])
    setCreatorsSelecteds([])
    setActivePlatforms([])
  }

  const handleClose = () => {
    handleDisplay(false)
  }

  const openDialogBoxCreator = () => {
    handleDisplay(true)
  }
  const openDialogBoxHashtag = () => {
    handleDisplay(true)
  }

  const manageType = (key: any) => {
    switch (key) {
      case 'creator':
        return (
          <Dialog.Panel className='flex max-w-lg flex-col items-center justify-center rounded-xl bg-white px-10 py-12'>
            <Dialog.Title className='mb-8 text-lg font-bold'>
              {titleCampaign}
            </Dialog.Title>
            <FilterBy
              type={'creator'}
              setCreatorsSelecteds={setCreatorsSelecteds}
              setTags={setTags}
              tags={tags}
              handleDisplay={handleClose}
            />
          </Dialog.Panel>
        )
      case 'hashtag':
        return (
          <Dialog.Panel className='flex max-w-lg flex-col items-center justify-center rounded-xl bg-white px-10 py-12'>
            <Dialog.Title className='mb-8 text-lg font-bold'>
              {titleCampaign}
            </Dialog.Title>
            <FilterBy
              type={'hashtag'}
              setCreatorsSelecteds={[]}
              setTags={setTags}
              tags={tags}
              handleDisplay={handleClose}
            />
          </Dialog.Panel>
        )
      default:
        break
    }
  }

  return (
    <>
      <div className=' my-0 md:my-4 mb-5 w-full px-6 md:px-12 '>
        <h3 className='mb-4 mt-16 text-lg font-bold'>{title}</h3>
        <div className='flex justify-between '>
          <div className=' flex items-center justify-start overflow-x-auto gap-4 overflow-y-hidden'>
            <button
              type='button'
              onClick={() => {
                setActiveButton('galleryView')
                handleClearArrays()
              }}
              className={`${
                activeButton == 'galleryView'
                  ? 'border-2 border-rose-200'
                  : 'border-2 border-transparent'
              } ${buttonsStyle}`}>
              gallery view
            </button>

            <button
              onClick={() => {
                setActiveButton('creator')
                openDialogBoxCreator()
                setTitleCampaign('filter view by creator')
              }}
              className={`${
                activeButton === 'creator'
                  ? 'border-2 border-rose-200'
                  : 'border-2 border-transparent'
              } ${buttonsStyle}`}
              type='button'>
              by influencer
            </button>

            <button
              onClick={() => {
                setActiveButton('hashtag')
                openDialogBoxHashtag()
                setTitleCampaign('filter view by hashtag')
              }}
              className={`${
                activeButton === 'hashtag'
                  ? 'border-2 border-rose-200'
                  : 'border-2 border-transparent'
              } ${buttonsStyle}`}
              type='button'>
              by hashtag
            </button>

            {/* <div className='dropdown-end dropdown '>
              <button
                tabIndex={0}
                type='button'
                onClick={() => {
                  setActiveButton('platform')
                }}
                className={`${activeButton == 'platform'
                    ? 'border-2 border-rose-200'
                    : 'border-2 border-transparent'
                  } ${buttonsStyle}`}>
                by platform
              </button>
              <div
                tabIndex={0}
                className='  relative z-50 menu rounded-box mr-4 mt-2 w-auto border-2 border-gray-100 bg-white p-2  '>
                <div className='m-4 flex flex-col gap-5'>
                  <div className='flex flex-row gap-2'>
                    <button
                      onClick={() => handlePlatformClick('Instagram')}
                      className=' rounded-full bg-beigeFirst px-6 py-2.5  hover:bg-beigeSelected focus:bg-beigeSelected'>
                      Instagram
                    </button>
                    <button
                      onClick={() => handlePlatformClick('TikTok')}
                      className=' rounded-full bg-beigeFirst px-6 py-2.5  hover:bg-beigeSelected focus:bg-beigeSelected'>
                      TikTok
                    </button>
                    <button
                      onClick={() => handlePlatformClick('Facebook')}
                      className=' rounded-full bg-beigeFirst px-6 py-2.5  hover:bg-beigeSelected focus:bg-beigeSelected'>
                      Facebook
                    </button>
                  </div>
                </div>
              </div>
            </div> */}

            <button
              type='button'
              onClick={() => {
                setActiveButton('most')
              }}
              className={`${
                activeButton == 'most'
                  ? 'border-2 border-rose-200'
                  : 'border-2 border-transparent'
              } ${buttonsStyle}`}>
              most viewed
            </button>

            <button
              type='button'
              onClick={() => {
                setActiveButton('topPerforming')
              }}
              className={`${
                activeButton == 'topPerforming'
                  ? 'border-2 border-[#D9F0F1] bg-[#D9F0F1]'
                  : ''
              } text-xm whitespace-nowrap text-base md:text-base mr-4 items-center rounded-full  border-2  border-transparent p-2 px-8 py-2 text-gray-900 hover:border-2 hover:border-[#D9F0F1] `}>
              top performing 🥥
            </button>
          </div>
        </div>

        <div className='mt-4 flex flex-col gap-3'>
          <div className=' flex flex-wrap gap-3'>
            {creatorsSelecteds?.map(creator => (
              <div
                className={`} flex flex-col rounded-xl bg-beigeSelected px-8
                py-2`}
                key={creator.username}>
                <div className='flex gap-2'>
                  <label className={`${ptMono.className}`}>
                    @{creator.username}
                  </label>
                  <button onClick={() => handleRemoveCreator(creator)}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-4 w-4'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className=' flex flex-wrap gap-3'>
            {tags?.map(tag => (
              <div
                className='flex flex-col rounded-xl border-2 border-beigeFirst px-8 py-2'
                key={tag}>
                <div className='flex gap-2'>
                  <label className={`${ptMono.className}`}>{tag}</label>
                  <button onClick={() => handleRemoveTag(tag)}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-4 w-4'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className='flex flex-wrap gap-3'>
            {activePlatforms?.map(platform => (
              <div
                className='flex flex-col rounded-xl  bg-rose-100 bg-opacity-50  px-8 py-2'
                key={platform}>
                <div className='flex gap-2'>
                  <label className={`${ptMono.className} text-gray-500`}>
                    {platform}
                  </label>
                  <button onClick={() => handleRemovePlatform(platform)}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-4 w-4'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex  flex-wrap md:flex-nowrap justify-between'>
          {activeButton == 'topPerforming' && (
            <div className=''>
              <h5 className='mb-4 mt-4 font-semibold italic'>
                Why are these top performing?
              </h5>
              <p className='font-light'>
                Top performing content is identified but by view count but by
                the engagement and share rate meaning Codecoco finds your
                standout pieces of content across micro and macro influencers so
                you can leverage these images and videos to their full
                potential.
              </p>
            </div>
          )}

          <div className='flex w-full items-end md:justify-end mt-4'>
            {shared === true && (
              <RedirectLink
                id={id}
                tags={tags}
                creatorsSelecteds={creatorsSelecteds}
                activePlatforms={activePlatforms}
                mostView={mostView}
              />
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        className='relative z-[99]'>
        <div className='fixed inset-0 bg-black bg-opacity-25' />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          {manageType(activeButton)}
        </div>
      </Dialog>
    </>
  )
}
