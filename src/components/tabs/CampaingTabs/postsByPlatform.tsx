'use client'

import FilterPostsContainer from '../../filters/filterPostsContainer'
import BrokeSocialLinks from '../../errors/agency/brokeSocialLinks'
import Pagination from '@/components/pagination/pagination/pagination'
import PostCard from '@/components/cards/influencer/posts/postCard'
import FilterPostsTrigger from '../../filters/filterPostsTrigger'
import AddNewStories from '@/components/modals/agency/addStories'
import PostCardTest from '@/components/cards/test/posts/postCard'
import AddNewPosts from '@/components/modals/agency/addPosts'
import StoryCard from '../../cards/agency/stories/storyCard'
import { CampaignRes } from '@/types/campaign/campaignRes'
import avatar from 'public/assets/register/avatar.jpg'
import { EmptyPost } from '../../empty/emptyPost'
import usePosts from '@/hooks/usePostsByUser'
import { FiRotateCw } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  readonly id: number
  readonly campaign: CampaignRes
  readonly creators: any[]
  readonly connections: any[]
  readonly shared: boolean
  readonly session: any
}
export default function PostsByPlatform({
  id,
  campaign,
  creators,
  connections,
  shared,
  session,
}: Props) {
  const [filterPosts, setFilterPosts] = React.useState('hidden')
  const [tags, setTags] = useState<string[]>([])

  const [activePlatforms, setActivePlatforms] = useState<any[]>([])
  const [creatorsSelecteds, setCreatorsSelecteds] = useState<any[]>([])
  const [activeButton, setActiveButton] = useState('galleryView')
  const [activeSocial, setActiveSocial] = useState('All')

  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState([0])
  const currentPage = page[page.length - 1]
  const limit = 10
  const router = useRouter()

  const { data, arePostsLoading, postsError } = usePosts(
    String(campaign.id),
    limit,
    currentPage * limit,
    activeSocial,
    tags,
    creatorsSelecteds,
  )

  const refreshPosts = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/collect/auto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: session.user.id,
          campaignId: campaign.id,
        }),
      })

      if (res.ok == true) {
        setLoading(false)
        router.push(`/dashboard/campaigns/${campaign.id}`)
      } 
    } catch (error) {
      console.log(error)
    }
  }

  const loadMorePosts = () => {
    if (data?.hasMore) {
      setPage(prevPage => [...prevPage, prevPage[prevPage.length - 1] + 1])
    }
  }

  const loadPreviousPosts = () => {
    setPage(prevPage => prevPage.slice(0, -1))
  }

  const totalPages = Math.ceil(data?.totalPosts / limit)
  
   
  if (arePostsLoading && activeSocial != "Stories") {
    return <p className='px-12'>loading posts...</p>
  }


  const tiktokPosts = data?.posts?.filter(
    (post: any) => post.platform === 'tiktok',
  )

  const filteredPosts = data?.posts?.filter((post: any) => {

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

  const instagramPostsCount = campaign.posts?.filter(
    (post: any) => post.platform === 'instagram',
  ).length

  const tiktokPostsCount = campaign.posts?.filter(
    (post: any) => post.platform === 'tiktok',
  ).length

  const storiesCount = campaign.stories?.length

  return (
    <>
      <div className=''>
        <Tab.Group>
          <Tab.List
            className={`flex justify-between gap-6 border-b-[#E4E3E2] border-b`}>
            <div className='flex gap-6'>
              <Tab
                className={` ml-2 md:ml-12 p-2 text-base font-medium outline-none ${
                  activeSocial === 'All'
                    ? 'border-b-4 border-[#7E7E7D]'
                    : 'opacity-50'
                }`}
                onClick={() => {
                  setActiveSocial('All'), setPage([0])
                }}>
                All posts
              </Tab>
              <Tab
                className={`p-2 text-base font-medium outline-none ${
                  activeSocial === 'instagram'
                    ? 'border-b-4 border-[#7E7E7D]'
                    : 'opacity-50'
                }`}
                onClick={() => {
                  setActiveSocial('instagram'), setPage([0])
                }}>
                Instagram{`(${instagramPostsCount})`}
              </Tab>
              <Tab
                className={`p-2 text-base font-medium outline-none ${
                  activeSocial === 'tiktok'
                    ? 'border-b-4 border-[#7E7E7D]'
                    : 'opacity-50'
                }`}
                onClick={() => {
                  setActiveSocial('tiktok'), setPage([0])
                }}>
                TikTok {`(${tiktokPostsCount})`}
              </Tab>
              <Tab
                className={`p-2 text-base font-medium outline-none ${
                  activeSocial === 'Stories'
                    ? 'border-b-4 border-[#7E7E7D]'
                    : 'opacity-50'
                }`}
                onClick={() => {
                  setActiveSocial('Stories'), setPage([0])
                }}>
                Stories {`(${storiesCount})`}
              </Tab>
            </div>
            <div className='avatar flex place-self-end items-center mx-12 mb-2'>
              {campaign?.client ? (
                <>
                  <div className=' mask mask-circle mr-3 h-10 w-10'>
                    <Image
                      priority
                      className={``}
                      width={100}
                      height={100}
                      src={campaign?.client.imageUrl || avatar}
                      alt='background'
                    />
                  </div>
                  <p>{campaign?.client.name}</p>
                </>
              ) : null}
            </div>
          </Tab.List>
          <Tab.Panels>
            {/* All Posts */}
            <Tab.Panel>
              <div className='flex justify-between mx-12 mb-8'>
                <div className='w-full flex justify-between items-center overflow-x-auto gap-4 overflow-y-hidden mt-4 '>
                  <div className='flex gap-4 w-full items-center justify-between'>
                    {/* usar aquí la variación de contenido */}

                    {session?.user.role == 'CREATOR' ? (
                      <>
                        <div className='flex gap-4 w-full justify-between'>
                          <div className='flex gap-4'>
                            <button className='flex border px-8 py-3 text-base rounded-full items-center p-2 text-black font-medium hover:border-gray-400  whitespace-nowrap'>
                              latest
                            </button>

                            <button
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
                            </button>

                            <Link target='_blank' href={`/campaign/${campaign.id}`} className='flex px-8 py-3 text-base rounded-full items-center p-2 text-black font-medium bg-[#E9F7F0] hover:border-gray-400  whitespace-nowrap'>
                              view public link
                            </Link>
                          </div>
                          <Link href={`/dashboard/portfolio`} className='flex  px-8 border py-3 text-base rounded-full items-center p-2 text-black font-medium hover:border-gray-400  whitespace-nowrap'>
                            view all
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
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
                        {shared != true && (
                          <div className='flex gap-4 justify-end'>
                            <button
                              onClick={refreshPosts}
                              className={` flex items-center rounded-full bg-active min-w-max max-h-6 min-h-[52px] px-8 py-3 text-lg text-black ${ptMono.className}`}>
                              {loading == true ? 'loading...' : 'refresh data'}
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
                              connections={connections}
                              text={''}
                              icon={undefined}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Pagination
                pageLength={page.length}
                currentPage={currentPage}
                totalPages={totalPages}
                loadPrevious={loadPreviousPosts}
                loadMore={loadMorePosts}
              />

              <BrokeSocialLinks brokeLinks={[]} />

              <FilterPostsContainer
                id={id}
                shared={shared}
                creators={creators}
                filterPosts={filterPosts}
                setFilterPosts={setFilterPosts}
                activeButton={activeButton}
                setActiveSocial={setActiveSocial}
                activeSocial={activeSocial}
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
                  {filteredPosts?.map((post: any, index: any) => (
                    <PostCard key={index} post={post} />
                  ))}
                  {data?.posts?.length === 0 && (
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
                        connections={connections}
                        text={''}
                        icon={undefined}
                      />
                    </div>
                  )}
                </div>
              </div>

              <Pagination
                pageLength={page.length}
                currentPage={currentPage}
                totalPages={totalPages}
                loadPrevious={loadPreviousPosts}
                loadMore={loadMorePosts}
              />

              <BrokeSocialLinks brokeLinks={[]} />

              <FilterPostsContainer
                id={id}
                shared={shared}
                creators={creators}
                filterPosts={filterPosts}
                setFilterPosts={setFilterPosts}
                activeButton={activeButton}
                setActiveSocial={setActiveSocial}
                activeSocial={activeSocial}
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
                  {/* funcion ternaria para preguntar por test user */}
                  {session?.user?.role == 'TESTER'
                    ? filteredPosts?.map((post: any, index: any) => (
                        <PostCardTest key={index} post={post} />
                      ))
                    : filteredPosts?.map((post: any, index: any) => (
                        <PostCard key={index} post={post} />
                      ))}
                  {data?.posts?.length === 0 && (
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
                        connections={connections}
                        text={''}
                        icon={undefined}
                      />
                    </div>
                  )}
                </div>
              </div>

              <Pagination
                pageLength={page.length}
                currentPage={currentPage}
                totalPages={totalPages}
                loadPrevious={loadPreviousPosts}
                loadMore={loadMorePosts}
              />

              <div className='flex flex-col gap-4'>
                <BrokeSocialLinks brokeLinks={[]} />
                {/* <TikTokNotAccountConnected tiktokCards={tiktokPosts} /> */}
              </div>

              <FilterPostsContainer
                id={id}
                shared={shared}
                creators={creators}
                filterPosts={filterPosts}
                setFilterPosts={setFilterPosts}
                activeButton={activeButton}
                setActiveSocial={setActiveSocial}
                activeSocial={activeSocial}
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
                  {session?.user?.role == 'TESTER'
                    ? filteredPosts?.map((post: any, index: any) => (
                        <PostCardTest key={index} post={post} />
                      ))
                    : filteredPosts?.map((post: any, index: any) => (
                        <PostCard key={index} post={post} />
                      ))}
                  {data?.posts?.length === 0 && (
                    <div className='col-span-4 md:col-span-2'>
                      <EmptyPost />
                    </div>
                  )}
                </div>
              </div>
            </Tab.Panel>

            {/* stories */}

            <Tab.Panel>
              <div className='flex justify-between mx-12 mb-8 '>
                <div className='w-full flex justify-between items-center overflow-x-auto gap-4 overflow-y-hidden mt-4 '>
                  <div className='flex gap-4'>{/* filters */}</div>

                  {shared != true && (
                    <div className='flex gap-4 justify-end'>
                      <AddNewStories
                        campaignFallback={campaign}
                        clientFallback={undefined}
                        connections={connections}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className='pt-6'>
                <div className='mx-6 md:ml-12 justify-start grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2  2xl:grid-cols-5 gap-y-2 pb-32'>
                  {campaign.stories?.map((story, index) => (
                    <StoryCard key={index} story={story} />
                  ))}
                  {campaign.stories?.length === 0 && (
                    <div className='col-span-4 md:col-span-2'>
                      <EmptyPost />
                    </div>
                  )}
                </div>
              </div>
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
