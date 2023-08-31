'use client'
import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import PostCard from './postCard'
import { ptMono } from '@/app/fonts'
import AddNewPosts from './modals/addPosts'
import FilterPostsTrigger from './filterPostsTrigger'
import FilterPostsContainer from './filterPostsContainer'
import AddNewStories from './modals/addStories'
import BrokeSocialLinks from './brokeSocialLinks'
import { FiRotateCw } from 'react-icons/fi'
import TikTokNotAccountConnected from './tiktokNotAccountsConnected'
import { EmptyPost } from './emptyPost'

type Props = {
  readonly id: number
  readonly campaign: any
  readonly creators: any[]
  readonly shared: boolean
}
export default function PostsByPlatform({
  id,
  campaign,
  creators,
  shared,
}: Props) {
  const [filterPosts, setFilterPosts] = React.useState('hidden')
  const [tags, setTags] = useState<string[]>([])
  const [activePlatforms, setActivePlatforms] = useState<any[]>([])
  const [creatorsSelecteds, setCreatorsSelecteds] = useState<any[]>([])
  const [activeButton, setActiveButton] = useState('galleryView')
  const [activeSocial, setActiveSocial] = useState('All')

  const tiktokPosts = campaign.posts?.filter((post: any) => post.platform === 'tiktok')
  const filteredPosts = campaign?.posts?.filter((post: any) => {
    const isInstagramActive = activePlatforms.includes('Instagram')
    const isFilterActive = activePlatforms.length > 0

    const allowedPlatforms =
      activeSocial === 'Instagram'
        ? ['instagram']
        : activeSocial === 'TikTok'
          ? ['tiktok']
          : ['tiktok', 'instagram']

    if (
      allowedPlatforms.includes(post.platform || '') &&
      (!isFilterActive || (isFilterActive && isInstagramActive)) &&
      (creatorsSelecteds.length === 0 ||
        creatorsSelecteds.some(creator => creator.id == post.creator?.id)) &&
      (tags.length === 0 ||
        post.caption?.split(' ').some((tag: any) => tags.includes(tag)))
    ) {
      if (activeButton === 'most') {
        if (post.reachCount && post.reachCount > 0) {
          return true
        }
      } else if (activeButton === 'topPerforming') {
        if (post.engagementCount && post.reachCount && post.reachCount > 0) {
          const ratio = (post.engagementCount / post.reachCount) * 100
          return ratio > 0
        }
      } else {
        return true
      }
    }

    return false
  })

  return (
    <>
      <div className=''>
        <Tab.Group>
          <Tab.List className={`flex gap-6 border-b-[#E4E3E2] border-b`}>
            <Tab
              className={` ml-12 p-2 text-base font-medium outline-none ${activeSocial === 'All'
                ? 'border-b-4 border-[#7E7E7D]'
                : 'opacity-50'
                }`}
              onClick={() => setActiveSocial('All')}>
              All posts
            </Tab>
            <Tab
              className={`p-2 text-base font-medium outline-none ${activeSocial === 'Instagram'
                ? 'border-b-4 border-[#7E7E7D]'
                : 'opacity-50'
                }`}
              onClick={() => setActiveSocial('Instagram')}>
              Instagram
            </Tab>
            <Tab
              className={`p-2 text-base font-medium outline-none ${activeSocial === 'TikTok'
                ? 'border-b-4 border-[#7E7E7D]'
                : 'opacity-50'
                }`}
              onClick={() => setActiveSocial('TikTok')}>
              TikTok
            </Tab>
            <Tab
              className={`p-2 text-base font-medium outline-none ${activeSocial === 'Stories'
                ? 'border-b-4 border-[#7E7E7D]'
                : 'opacity-50'
                }`}
              onClick={() => setActiveSocial('Stories')}>
              Stories
            </Tab>
          </Tab.List>
          <Tab.Panels>
            {/* All Posts */}
            <Tab.Panel>
              <div className='flex justify-between mx-12 mb-8'>
                <div className='w-full flex justify-between items-center overflow-x-auto gap-4 overflow-y-hidden mt-4 '>
                  <div className='flex gap-4'>
                    <FilterPostsTrigger
                      filterPosts={filterPosts}
                      setFilterPosts={setFilterPosts}
                    />

                    {/* <button
                      type='button'
                      onClick={() => {
                        activeButton != 'topPerforming'
                          ? setActiveButton('topPerforming')
                          : setActiveButton('')
                      }}
                      className={`${
                        activeButton == 'topPerforming'
                          ? ' bg-[#D9F0F1]'
                          : 'bg-[#EBF6F6]'
                      } text-xm whitespace-nowrap text-base md:text-base mr-4 items-center rounded-full p-2 px-8 py-3 text-gray-900 `}>
                      top performing 🥥
                    </button> */}
                  </div>



                  {shared != true && (
                    <div className='flex gap-4 justify-end'>
                      <button
                        className={` flex items-center rounded-full bg-active min-w-max max-h-6 min-h-[52px] px-8 py-3 text-lg text-black ${ptMono.className}`}>
                        refresh data
                        <FiRotateCw
                          style={{
                            color: '#00000080',
                            fontSize: '1.2em',
                            marginLeft: '12px',
                          }}
                        />
                      </button>
                      <AddNewPosts
                        campaignsFallback={campaign}
                        clientsFallback={undefined}
                        text={''}
                        icon={undefined}
                      />
                    </div>
                  )}
                </div>
              </div>

              <BrokeSocialLinks brokeLinks={[]} />

              <FilterPostsContainer
                id={id}
                shared={shared}
                creators={creators}
                filterPosts={filterPosts}
                setFilterPosts={setFilterPosts}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                tags={tags}
                setTags={setTags}
                creatorsSelecteds={creatorsSelecteds}
                setCreatorsSelecteds={setCreatorsSelecteds}
                activePlatforms={activePlatforms}
                setActivePlatforms={setActivePlatforms}
              />

              <div className='pt-6'>
                <div className='mx-6 md:ml-12 justify-start grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2  2xl:grid-cols-5 gap-y-2 pb-32'>
                  {filteredPosts!.map((post: any, index: any) => (
                    <PostCard key={index} post={post} />
                  ))}
                  {campaign?.posts?.length === 0 && (
                    <div className='col-span-4 md:col-span-2'>
                      <EmptyPost />
                    </div>
                  )}
                </div>
              </div>
            </Tab.Panel>

            {/* Instagram */}

            <Tab.Panel>
              <div className='flex justify-between mx-12 mb-8 '>
                <div className='w-full flex justify-between items-center overflow-x-auto gap-4 overflow-y-hidden mt-4 '>
                  <FilterPostsTrigger
                    filterPosts={filterPosts}
                    setFilterPosts={setFilterPosts}
                  />
                  {/* <div className='flex gap-4'>
                    <FilterPostsTrigger filterPosts={filterPosts} setFilterPosts={setFilterPosts} />
                    <button
                      type='button'
                      onClick={() => {
                        activeButton != 'topPerforming' ? setActiveButton('topPerforming') : setActiveButton('')
                      }}
                      className={`${activeButton == 'topPerforming'
                        ? ' bg-[#D9F0F1]'
                        : 'bg-[#EBF6F6]'
                        } text-xm whitespace-nowrap text-base md:text-base mr-4 items-center rounded-full p-2 px-8 py-3 text-gray-900 `}>
                      top performing 🥥
                    </button>
                  </div> */}

                  {shared != true && (
                    <div className='flex gap-4 justify-end'>
                      <button
                        className={` flex items-center rounded-full bg-active min-w-max max-h-6 min-h-[52px] px-8 py-3 text-lg text-black ${ptMono.className}`}>
                        refresh data
                        <FiRotateCw
                          style={{
                            color: '#00000080',
                            fontSize: '1.2em',
                            marginLeft: '12px',
                          }}
                        />
                      </button>
                      <AddNewPosts
                        campaignsFallback={campaign}
                        clientsFallback={undefined}
                        text={''}
                        icon={undefined}
                      />
                    </div>
                  )}
                </div>
              </div>

              <BrokeSocialLinks brokeLinks={[]} />

              <FilterPostsContainer
                id={id}
                shared={shared}
                creators={creators}
                filterPosts={filterPosts}
                setFilterPosts={setFilterPosts}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                tags={tags}
                setTags={setTags}
                creatorsSelecteds={creatorsSelecteds}
                setCreatorsSelecteds={setCreatorsSelecteds}
                activePlatforms={activePlatforms}
                setActivePlatforms={setActivePlatforms}
              />

              <div className='pt-6'>
                <div className='mx-6 md:ml-12 justify-start grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2  2xl:grid-cols-5 gap-y-2 pb-32'>
                  {filteredPosts!.map((post: any, index: any) => (
                    <PostCard key={index} post={post} />
                  ))}
                  {campaign?.posts?.length === 0 && (
                    <div className='col-span-4 md:col-span-2'>
                      <EmptyPost />
                    </div>
                  )}
                </div>
              </div>
            </Tab.Panel>

            {/* TikTok  */}
            <Tab.Panel>
              <div className='flex justify-between mx-12 mb-8 '>
                <div className='w-full flex justify-between items-center overflow-x-auto gap-4 overflow-y-hidden mt-4 '>
                  <div className='flex gap-4'>
                    <FilterPostsTrigger
                      filterPosts={filterPosts}
                      setFilterPosts={setFilterPosts}
                    />
                    {/* <button
                      type='button'
                      onClick={() => {
                        activeButton != 'topPerforming'
                          ? setActiveButton('topPerforming')
                          : setActiveButton('')
                      }}
                      className={`${
                        activeButton == 'topPerforming'
                          ? ' bg-[#D9F0F1]'
                          : 'bg-[#EBF6F6]'
                      } text-xm whitespace-nowrap text-base md:text-base mr-4 items-center rounded-full p-2 px-8 py-3 text-gray-900 `}>
                      top performing 🥥
                    </button> */}
                  </div>

                  {shared != true && (
                    <div className='flex gap-4 justify-end'>
                      <button
                        className={` flex items-center rounded-full bg-active min-w-max max-h-6 min-h-[52px] px-8 py-3 text-lg text-black ${ptMono.className}`}>
                        refresh data
                        <FiRotateCw
                          style={{
                            color: '#00000080',
                            fontSize: '1.2em',
                            marginLeft: '12px',
                          }}
                        />
                      </button>
                      <AddNewPosts
                        campaignsFallback={campaign}
                        clientsFallback={undefined}
                        text={''}
                        icon={undefined}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className='flex flex-col gap-4'>
                <BrokeSocialLinks brokeLinks={[]} />
                <TikTokNotAccountConnected tiktokCards={tiktokPosts} />
              </div>


              <FilterPostsContainer
                id={id}
                shared={shared}
                creators={creators}
                filterPosts={filterPosts}
                setFilterPosts={setFilterPosts}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                tags={tags}
                setTags={setTags}
                creatorsSelecteds={creatorsSelecteds}
                setCreatorsSelecteds={setCreatorsSelecteds}
                activePlatforms={activePlatforms}
                setActivePlatforms={setActivePlatforms}
              />

              <div className='pt-6'>
                <div className='mx-6 md:ml-12 justify-start grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2  2xl:grid-cols-5 gap-y-2 pb-32'>
                  {filteredPosts!.map((post: any, index: any) => (
                    <PostCard key={index} post={post} />
                  ))}
                  {campaign?.posts?.length === 0 && (
                    <div className='col-span-4 md:col-span-2'>
                      <EmptyPost />
                    </div>
                  )}
                </div>
              </div>
            </Tab.Panel>

            {/* Stories */}
            <Tab.Panel>
              <div className='flex justify-between mx-12 mb-8 '>
                <div className='w-full flex justify-between items-center overflow-x-auto gap-4 overflow-y-hidden mt-4 '>
                  <div className='flex gap-4'>
                    {/* <button
                      type='button'
                      onClick={() => {
                        activeButton != 'topPerforming'
                          ? setActiveButton('topPerforming')
                          : setActiveButton('')
                      }}
                      className={`${
                        activeButton == 'topPerforming'
                          ? ' bg-[#D9F0F1]'
                          : 'bg-[#EBF6F6]'
                      } text-xm whitespace-nowrap text-base md:text-base mr-4 items-center rounded-full p-2 px-8 py-3 text-gray-900 `}>
                      top performing 🥥
                    </button> */}
                  </div>

                  {shared != true && (
                    <div className='flex gap-4 justify-end'>
                      <button
                        className={` flex items-center rounded-full bg-active min-w-max max-h-6 min-h-[52px] px-8 py-3 text-lg text-black ${ptMono.className}`}>
                        refresh data
                        <FiRotateCw
                          style={{
                            color: '#00000080',
                            fontSize: '1.2em',
                            marginLeft: '12px',
                          }}
                        />
                      </button>
                      <AddNewStories
                        campaignFallback={campaign}
                        clientFallback={undefined}
                      />
                    </div>
                  )}
                </div>
              </div>

              <FilterPostsContainer
                id={id}
                shared={shared}
                creators={creators}
                filterPosts={filterPosts}
                setFilterPosts={setFilterPosts}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                tags={tags}
                setTags={setTags}
                creatorsSelecteds={creatorsSelecteds}
                setCreatorsSelecteds={setCreatorsSelecteds}
                activePlatforms={activePlatforms}
                setActivePlatforms={setActivePlatforms}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* <Dialog
        open={openDialog}
        onClose={handleClose}
        className='relative z-[99]'>
        <div className='fixed inset-0 bg-black bg-opacity-25' />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          {manageType(activeButton)}
        </div>
      </Dialog> */}
    </>
  )
}
