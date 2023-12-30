'use client'
import { FiPlus, FiRotateCw, FiChevronDown } from 'react-icons/fi'
import { RedirectLink } from '@/app/(shares)/campaign/[id]/linkShare'
import FilterBy from '../modals/agency/filterBy'
import { Dialog } from '@headlessui/react'
import { ptMono } from '@/app/fonts'
import React from 'react'

type Props = {
  id: any
  shared: any
  creators: any
  filterPosts: any
  setFilterPosts: any
  activeButton: any
  setActiveSocial: any
  activeSocial: any
  setActiveButton: any
  tags: any
  setTags: any
  creatorsSelecteds: any
  setCreatorsSelecteds: any
  activePlatforms: any
  setActivePlatforms: any
}

export default function FilterPostsContainer({
  id,
  shared,
  creators,
  filterPosts,
  setFilterPosts,
  activeButton,
  setActiveSocial,
  activeSocial,
  setActiveButton,
  tags,
  setTags,
  creatorsSelecteds,
  setCreatorsSelecteds,
  activePlatforms,
  setActivePlatforms,
}: Props) {
  const [openDialog, handleDialog] = React.useState(false)

  const handleRemoveTag = (tag: string) => {
    const updatedTags = tags.filter((t: any) => t !== tag)
    setTags(updatedTags)
  }

  const handleRemoveCreator = (creator: any) => {
    const updatedCreators = creatorsSelecteds.filter((c: any) => c !== creator)
    setCreatorsSelecteds(updatedCreators)
  }

  const handleRemovePlatform = (platform: string) => {
    const updatedPlatforms = activePlatforms.filter((p: any) => p !== platform)
    setActivePlatforms(updatedPlatforms)
  }

  const handlePlatformClick = (platform: string) => {
    if (activePlatforms.includes(platform)) {
      const updatedPlatforms = activePlatforms.filter(
        (p: any) => p !== platform,
      )
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
    handleDialog(false)
  }

  const openDialogBoxCreator = () => {
    handleDialog(true)
  }
  const openDialogBoxHashtag = () => {
    handleDialog(true)
  }

  const manageType = (key: any) => {
    switch (key) {
      case 'creator':
        return (
          <Dialog.Panel className='flex max-w-lg flex-col items-center justify-center rounded-xl bg-white px-10 py-12'>
            <Dialog.Title className='mb-8 text-lg font-medium'>
              filter view by creator
            </Dialog.Title>
            <FilterBy
              type={'creator'}
              creators={creators}
              creatorsSelecteds={creatorsSelecteds}
              setCreatorsSelecteds={setCreatorsSelecteds}
              setTags={setTags}
              tags={tags}
              handleDialog={handleDialog}
            />
          </Dialog.Panel>
        )
      case 'hashtag':
        return (
          <Dialog.Panel className='flex max-w-lg flex-col items-center justify-center rounded-xl bg-white px-10 py-12'>
            <Dialog.Title className='mb-8 text-lg font-medium'>
              filter view by hashtag
            </Dialog.Title>
            <FilterBy
              type={'hashtag'}
              creators={creators}
              creatorsSelecteds={creatorsSelecteds}
              setCreatorsSelecteds={[]}
              setTags={setTags}
              tags={tags}
              handleDialog={handleDialog}
            />
          </Dialog.Panel>
        )
      default:
        break
    }
  }

  return (
    <>
      <div className='px-12'>
        <div
          className={`py-6 bg-[#F3F0EC] rounded-xl mt-4 w-full ${filterPosts}`}>
          <div className='flex gap-10 px-8 '>
            <div>
              <p className='font-medium text-base mb-2'>view by</p>
              <div className='flex gap-4'>
                <button
                  type='button'
                  onClick={() => {
                    setActiveButton('most')
                  }}
                  className={`${activeButton == 'most' ? ' bg-[#e4ddd5]' : ' bg-[#DADAD8]'
                    } px-8 py-3 text-base rounded-full items-center p-2 text-black font-medium whitespace-nowrap`}>
                  most viewed
                </button>

                <button
                  type='button'
                  onClick={() => {
                    setActiveButton('latest')
                  }}
                  className={`${activeButton == 'latest' ? ' bg-[#e4ddd5]' : ' bg-[#DADAD8]'
                    } px-8 py-3 text-base rounded-full items-center p-2 text-black font-medium whitespace-nowrap`}>
                  latest
                </button>
              </div>
            </div>

            <div className='flex flex-col'>
              <p className='font-medium text-base mb-2'>by creator</p>
              <button
                onClick={() => {
                  setActiveButton('creator')
                  openDialogBoxCreator()
                }}
                className={`${
                  activeButton === 'creator'
                }  bg-transparent flex items-center px-6 border border-[#7A7978] py-3 text-base rounded-full p-2 text-black font-medium   whitespace-nowrap `}
                type='button'>
                search influencers
                <FiChevronDown style={{ marginLeft: '32px' }} />
              </button>
            </div>

            {/* by hashtag */}
            <div>
              <p className='font-medium text-base mb-2'>by hashtag</p>
              <button
                onClick={() => {
                  setActiveButton('hashtag')
                  openDialogBoxHashtag()
                }}
                className={`${activeButton === 'hashtag'
                  ? 'border border-[#acacac]'
                  : 'border border-[#acacac]'
                  } bg-transparent flex items-center px-6 border border-[#7A7978] py-3 text-base rounded-full p-2 text-black font-medium   whitespace-nowrap`}
                type='button'>
                search hastags
              </button>
            </div>

            <div></div>
          </div>
          <div
            className={` flex flex-col gap-3 border-t-2 border-white pt-6 mt-8 ${
              creatorsSelecteds.length > 0 || tags.length > 0
                ? 'block'
                : 'hidden'
            }`}>
            <div className=' flex flex-wrap gap-3 px-8 '>
              {creatorsSelecteds?.map((creator: any) => (
                <div
                  className={`flex flex-col rounded-full bg-white px-8 py-2`}
                  key={creator.username}>
                  <div className='flex gap-2'>
                    <label className={`${ptMono.className} mr-6`}>
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

            <div className=' flex flex-wrap gap-3 px-8 '>
              {tags?.map((tag: any) => (
                <div
                  className='flex flex-col rounded-full bg-white px-8 py-2'
                  key={tag}>
                  <div className='flex gap-2'>
                    <label className={`${ptMono.className} mr-6`}>{tag}</label>
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
                mostView={activeButton}
                setActiveSocial={setActiveSocial}
                activeSocial={activeSocial}
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
