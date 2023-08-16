'use client'
import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import PostCard from './postCard'
import TikTokNotAccountConnected from './tiktokNotAccountsConnected'
import ManagePosts from './ManagePosts'

type Props = {
  readonly tiktokPosts: any
  readonly campaign: any
  readonly id: number
  readonly addPost: any
  readonly shared: boolean
  readonly tags: string[]
  readonly setTags: React.Dispatch<React.SetStateAction<string[]>>
  readonly creators: any[]
  readonly creatorsSelecteds: any[]
  readonly setCreatorsSelecteds: any
  readonly activePlatforms: any[]
  readonly setActivePlatforms: any
  readonly activeButton: any
  readonly setActiveButton: any
}
export default function ButtonsGroupTabs2({
  tiktokPosts,
  campaign,
  id,
  addPost,
  shared,
  tags,
  setTags,
  creators,
  creatorsSelecteds,
  setCreatorsSelecteds,
  activePlatforms,
  setActivePlatforms,
  activeButton,
  setActiveButton,
}: Props) {
  const [activeTab, setActiveTab] = useState('All')

  const filteredPosts = campaign?.posts?.filter((post: { platform: any }) => {
    const allowedPlatforms =
      activeTab === 'Instagram'
        ? ['instagram']
        : activeTab === 'TikTok'
        ? ['tiktok']
        : ['tiktok', 'instagram']
    return allowedPlatforms.includes(post.platform)
  })

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName) // Actualizar el tab activo al cambiar de tab
  }

  return (
    <>
      <div className=''>
        <Tab.Group>
          <Tab.List className={`flex gap-6 border-b-[#E4E3E2] border-b`}>
            <Tab
              className={` ml-12 p-2 text-base font-medium outline-none ${
                activeTab === 'All'
                  ? 'border-b-4 border-[#7E7E7D]'
                  : 'opacity-50'
              }`}
              onClick={() => handleTabChange('All')}>
              All posts
            </Tab>
            <Tab
              className={`p-2 text-base font-medium outline-none ${
                activeTab === 'Instagram'
                  ? 'border-b-4 border-[#7E7E7D]'
                  : 'opacity-50'
              }`}
              onClick={() => handleTabChange('Instagram')}>
              Instagram
            </Tab>
            <Tab
              className={`p-2 text-base font-medium outline-none ${
                activeTab === 'TikTok'
                  ? 'border-b-4 border-[#7E7E7D]'
                  : 'opacity-50'
              }`}
              onClick={() => handleTabChange('TikTok')}>
              TikTok
            </Tab>
          </Tab.List>
          <Tab.Panels>
            {/* panel 1 */}
            <Tab.Panel>
              <ManagePosts
                addPost={addPost}
                shared={shared}
                tags={tags}
                setTags={setTags}
                creators={creators}
                creatorsSelecteds={creatorsSelecteds}
                setCreatorsSelecteds={setCreatorsSelecteds}
                activePlatforms={activePlatforms}
                setActivePlatforms={setActivePlatforms}
                id={campaign.id!}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                mostView={activeButton}
              />

              <div className='pt-6'>
                <div className='mx-6 lg:ml-12 justify-start flex flex-wrap gap-x-4 lg:gap-x-6 gap-y-8 pb-32'>
                  {filteredPosts!.map((post: any, index: any) => (
                    <PostCard key={index} post={post} />
                  ))}
                  {campaign?.posts?.length === 0 && (
                    <>
                      <h1>{`Seems like you dont have posts! :(`}</h1>
                    </>
                  )}
                </div>
              </div>
            </Tab.Panel>

            {/* panel 2 */}

            <Tab.Panel>
              <ManagePosts
                addPost={addPost}
                shared={shared}
                tags={tags}
                setTags={setTags}
                creators={creators}
                creatorsSelecteds={creatorsSelecteds}
                setCreatorsSelecteds={setCreatorsSelecteds}
                activePlatforms={activePlatforms}
                setActivePlatforms={setActivePlatforms}
                id={campaign.id!}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                mostView={activeButton}
              />

              <div className='pt-6'>
                <div className='mx-6 lg:ml-12 justify-start flex flex-wrap gap-x-4 lg:gap-x-6 gap-y-8 pb-32'>
                  {filteredPosts!.map((post: any, index: any) => (
                    <PostCard key={index} post={post} />
                  ))}

                  {campaign?.posts?.length === 0 && (
                    <>
                      <h1>{`Seems like you dont have posts! :(`}</h1>
                    </>
                  )}
                </div>
              </div>
            </Tab.Panel>

            {/* panel 3  */}
            <Tab.Panel>
              {/* tiktok handler */}
              {/* <div className='mt-8'>
                {tiktokPosts.length !== 0 && (
                  <TikTokNotAccountConnected tiktokCards={tiktokPosts} />
                )}
              </div> */}

              <ManagePosts
                addPost={addPost}
                shared={shared}
                tags={tags}
                setTags={setTags}
                creators={creators}
                creatorsSelecteds={creatorsSelecteds}
                setCreatorsSelecteds={setCreatorsSelecteds}
                activePlatforms={activePlatforms}
                setActivePlatforms={setActivePlatforms}
                id={campaign.id!}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                mostView={activeButton}
              />

              <div className='pt-6'>
                <div className='mx-6 lg:ml-12 justify-start flex flex-wrap gap-x-4 lg:gap-x-6 gap-y-8 pb-32'>
                  {filteredPosts!.map((post: any, index: any) => (
                    <PostCard key={index} post={post} />
                  ))}
                  {campaign?.posts?.length === 0 && (
                    <>
                      <h1>{`Seems like you dont have posts! :(`}</h1>
                    </>
                  )}
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  )
}
