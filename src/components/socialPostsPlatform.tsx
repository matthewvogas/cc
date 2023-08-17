'use client'
import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import PostCard from './postCard'
import TikTokNotAccountConnected from './tiktokNotAccountsConnected'
import ManagePosts from './ManagePosts'

type Props = {
  readonly filteredPosts: any
  readonly activeSocial: any
  readonly setActiveSocial: any
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
export default function ButtonsGroupTabsSocial({
  filteredPosts,
  activeSocial,
  setActiveSocial,
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
  return (
    <>
      <div className=''>
        <Tab.Group>
          <Tab.List className={`flex gap-6 border-b-[#E4E3E2] border-b`}>
            <Tab
              className={` ml-12 p-2 text-base font-medium outline-none ${
                activeSocial === 'All'
                  ? 'border-b-4 border-[#7E7E7D]'
                  : 'opacity-50'
              }`}
              onClick={() => setActiveSocial('All')}>
              All posts
            </Tab>
            <Tab
              className={`p-2 text-base font-medium outline-none ${
                activeSocial === 'Instagram'
                  ? 'border-b-4 border-[#7E7E7D]'
                  : 'opacity-50'
              }`}
              onClick={() => setActiveSocial('Instagram')}>
              Instagram
            </Tab>
            <Tab
              className={`p-2 text-base font-medium outline-none ${
                activeSocial === 'TikTok'
                  ? 'border-b-4 border-[#7E7E7D]'
                  : 'opacity-50'
              }`}
              onClick={() => setActiveSocial('TikTok')}>
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
              />

              <div className='pt-6'>
                <div className='mx-6 md:ml-12 justify-start grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2  2xl:grid-cols-5 gap-y-2 pb-32'>
                  {filteredPosts!.map((post: any, index: any) => (
                    <PostCard key={index} post={post} />
                  ))}
                  {campaign?.posts?.length === 0 && (
                    <div className='col-span-4 md:col-span-2'>
                      <h1>{`Seems like you dont have posts! :(`}</h1>
                    </div>
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
              />

              <div className='pt-6'>
                <div className='mx-6 md:ml-12 justify-start grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2  2xl:grid-cols-5 gap-y-2 pb-32'>
                  {filteredPosts!.map((post: any, index: any) => (
                    <PostCard key={index} post={post} />
                  ))}
                  {campaign?.posts?.length === 0 && (
                    <div className='col-span-4 md:col-span-2'>
                      <h1>{`Seems like you dont have posts! :(`}</h1>
                    </div>
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
              />

              <div className='pt-6'>
                <div className='mx-6 md:ml-12 justify-start grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2  2xl:grid-cols-5 gap-y-2 pb-32'>
                  {filteredPosts!.map((post: any, index: any) => (
                    <PostCard key={index} post={post} />
                  ))}
                  {campaign?.posts?.length === 0 && (
                    <div className='col-span-4 md:col-span-2'>
                      <h1>{`Seems like you dont have posts! :(`}</h1>
                    </div>
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
