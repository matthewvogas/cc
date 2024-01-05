'use client'

import imageCover from 'public/assets/register/campaignCover.jpg'
import FilterPostsTrigger from '../../filters/filterPostsTrigger'
import BrokeSocialLinks from '../../errors/agency/brokeSocialLinks'
import { EmptyPost } from '../../empty/emptyPost'
import { FiRotateCw } from 'react-icons/fi'
import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import Link from 'next/link'
import PostCard from '@/components/cards/test/posts/postCard'

type Props = {
  creator: any
  campaigns: any
}
export default function PostsByPlatformAndCreator({
  creator,
  campaigns,
}: Props) {
  const [filterPosts, setFilterPosts] = React.useState('hidden')
  const [tags, setTags] = useState<string[]>([])
  const [activePlatforms, setActivePlatforms] = useState<any[]>([])
  const [creatorsSelecteds, setCreatorsSelecteds] = useState<any[]>([])
  const [activeButton, setActiveButton] = useState('galleryView')
  const [activeSocial, setActiveSocial] = useState('All')

  const creatorFilteredPosts = campaigns.reduce(
    (result: any, campaign: any) => {
      const posts = campaign?.posts?.filter(
        (post: any) => post.creatorId === creator,
      )
      if (posts.length > 0) {
        result.push(...posts)
      }
      return result
    },
    [],
  )




  function findCreatorUsername(campaigns: any, creatorId: string) {
    for (const campaign of campaigns) {
        const creator = campaign.creators.find((creator: any) => creator.id === creatorId);
        
        if (creator) {
            return creator; // Retorna el nombre de usuario si el creador es encontrado
        }
    }

    return null; // Retorna null si no se encuentra el creador
}

const creatorUsername = findCreatorUsername(campaigns, creator);
console.log(creatorUsername)


  const filteredPosts = creatorFilteredPosts.filter((post: any) => {
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
        creatorsSelecteds.some(creator => creator.id === post.creator?.id)) &&
      (tags.length === 0 ||
        post.caption?.split(' ').some((tag: any) => tags.includes(tag))) &&
      (activeButton !== 'topPerforming' ||
        (post.reachCount && post.reachCount > 0)) &&
      (activeButton !== 'most' ||
        (post.engagementCount && post.reachCount && post.reachCount > 0))
    ) {
      return true
    }

    return false
  })

  const campaignsByCreator = campaigns.filter((campaign: any) => {
    const creators = campaign.creators
    const containsCreator = findCreator(creators, creator)
    return containsCreator
  })

  function findCreator(creators: any[], creatorID: any): boolean {
    for (const creator of creators) {
      if (String(creator.id) === String(creatorID)) {
        return true
      }
    }
    return false
  }

  return (
    <>
      <div className=''>
        <Tab.Group>
          <Tab.List className={`flex gap-6 border-b-[#E4E3E2] border-b`}>
            <Tab
              className={` ml-2 md:ml-12 p-2 text-base font-medium outline-none ${
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
            <Tab
              className={`p-2 text-base font-medium outline-none ${
                activeSocial === 'Stories'
                  ? 'border-b-4 border-[#7E7E7D]'
                  : 'opacity-50'
              }`}
              onClick={() => setActiveSocial('Stories')}>
              Stories
            </Tab>
            <Tab
              className={`p-2 text-base font-medium outline-none ${
                activeSocial === 'Campaigns'
                  ? 'border-b-4 border-[#7E7E7D]'
                  : 'opacity-50'
              }`}
              onClick={() => setActiveSocial('Campaigns')}>
              Campaigns
            </Tab>
          </Tab.List>
          <Tab.Panels>
            {/* All Posts */}
            <Tab.Panel>
              <div className='flex justify-between mx-12 mb-8'>
                <div className='w-full flex justify-between items-center overflow-x-auto gap-4 overflow-y-hidden mt-4 '>
                  <div className='flex gap-4'>

                  </div>


                </div>
              </div>

              <BrokeSocialLinks brokeLinks={[]} />

           

              <div className='pt-6'>
                <div className='mx-6 md:ml-12 justify-start grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2  2xl:grid-cols-5 gap-y-2 pb-32'>
                  {filteredPosts!.map((post: any, key: number) => (
                    <PostCard key={key} post={post} creator={creatorUsername} />
                  ))}
                  {campaignsByCreator?.posts?.length === 0 && (
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
               
                </div>
              </div>

              <BrokeSocialLinks brokeLinks={[]} />

           

              <div className='pt-6'>
                <div className='mx-6 md:ml-12 justify-start grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2  2xl:grid-cols-5 gap-y-2 pb-32'>
                  {filteredPosts!.map((post: any, index: any) => (
                    <PostCard key={index} post={post} creator={creatorUsername} />
                  ))}
                  {campaignsByCreator?.posts?.length === 0 && (
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
                   
                  </div>
                </div>
              </div>

             

              <div className='pt-6'>
                <div className='mx-6 md:ml-12 justify-start grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2  2xl:grid-cols-5 gap-y-2 pb-32'>
                  {filteredPosts!.map((post: any, index: any) => (
                    <PostCard key={index} post={post} creator={creatorUsername} />
                  ))}
                  {campaignsByCreator?.posts?.length === 0 && (
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
                   
                  </div>

                
                </div>
              </div>

              
            </Tab.Panel>

            {/* Campaigns */}
            <Tab.Panel>
              <div className='flex justify-between mx-12 mb-8 '>
                <div className='w-full flex justify-between items-center overflow-x-auto gap-4 overflow-y-hidden mt-4 '>
                  <div className='flex gap-4'>
                   
                    {campaignsByCreator?.map((card: any, index: any) => (
                      <Link
                        href={`/dashboard/campaigns/${card.id}`}
                        key={index}
                        className={`inline-block bg-beigeTransparent border min-w-[250px] ${ptMono.className}`}>
                        <Image
                          className={`object-cover`}
                          src={imageCover}
                          alt={card.name}
                          style={{ width: '250px', height: '310px' }}
                        />
                        <div className='mb-4 flex justify-between gap-4 px-6 pt-4'>
                          <h5>{card.name}</h5>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className=' ml-8 h-6 w-6'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                            />
                          </svg>
                        </div>
                        <hr className=' h-px bg-gray-200'></hr>
                        <div className='flex  flex-col gap-2 px-6 py-[14px]'>
                          <h4 className=' self-baseline rounded-full bg-white px-4 py-3 text-base'>
                            {card?._count?.creators || 0} {`creators`}
                          </h4>
                          <h4 className=' self-baseline rounded-full bg-white px-4 py-3 text-base'>
                            {card?._count?.posts || 0} {`posts`}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>


    </>
  )
}
