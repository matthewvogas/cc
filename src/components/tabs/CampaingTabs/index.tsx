'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { Dialog } from '@headlessui/react'
import TopPost from '@/components/topPost'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/ui/spinner'
import { Campaign, Post } from '@prisma/client'
import PostCard from '@/components/postCard'
import CreatorRow from '@/components/creatorRow'
import { excelToJson } from '@/utils/ExcelHelper'
import SettingsTab from '@/components/settingsTab'
import TabsToShare from '@/components/tabsToShare'
import OverviewCampaign from '@/components/overviewCampaign'
import FeatureNotImplemented from '@/components/ui/featureNotImplemented'
import ManagePosts from '@/components/ManagePosts'
import { ptMono } from '@/app/fonts'
import { CampaignRes } from '@/types/campaign/campaignRes'
import { CreatorsByCampaignRes } from '@/types/creators/CreatorsByCampaignRes'
import TagsInput from '@/components/TagsInput'
import Image from 'next/image'
import modalCover from 'public/assets/register/addpostToTrack.jpg'

// type campaignWithStats = Campaign & {
//   posts: Post[]
//   stats: {
//     postCount: number
//     creatorsCount: number
//     engagement: {
//       likes: number
//       comments: number
//     }
//   }
// }
export default function CampaingTabs({
  campaign,
  creators,
}: {
  campaign: CampaignRes
  creators: any
}) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [openTab, setOpenTab] = useState(1)
  // const [creators, setCreators] = useState(campaign?.stats?.creatorsCount || 0)
  // const [audience, setAudience] = useState(
  //   campaign?.stats?.engagement?.likes +
  //     campaign?.stats?.engagement?.comments || 0,
  // )
  const [loading, setLoading] = useState(false)
  // const [content, setContent] = useState(campaign.stats?.postCount)
  const [newPosts, setNewPosts] = useState('')
  const [fetchError, setFetchError] = useState<string | null>(null)

  const [tags, setTags] = useState<string[]>([])
  const [creatorsSelecteds, setCreatorsSelecteds] = useState<any[]>([])
  const [activePlatforms, setActivePlatforms] = useState<any[]>([])
  const [activeButton, setActiveButton] = useState('galleryView')

  const filteredPosts = campaign?.posts?.filter(post => {
    if (!post.caption) return false

    const isInstagramActive = activePlatforms.includes('Instagram')
    const isFilterActive = activePlatforms.length > 0

    if (!isFilterActive || (isFilterActive && isInstagramActive)) {
      const postTags = post.caption.split(' ')
      const filteredTags = tags.filter(tag => postTags.includes(tag))

      if (tags.length === 0 || filteredTags.length > 0) {
        if (activeButton === 'most') {
          if (post.impressionsCount && post.impressionsCount > 0) {
            return true
          }
        } else {
          return true
        }
      }
    }

    return false
  })

  const handlePosts = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/instagram/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPosts,
          campaignId: campaign.id,
        }),
      })

      //If res is loading

      if (res.status === 200) {
        setIsOpen(false)
        router.refresh()
      } else {
        setFetchError('There was an error fetching the posts!')
      }
    } catch (error: any) {
      setFetchError(error.message)
    }
    setLoading(false)
  }

  const handleFileSubmit = async (e: React.FormEvent) => {
    setFetchError(null)
    e.preventDefault()
    const file = (e.target as HTMLFormElement).campaignExcel.files[0]
    if (!file) {
      setFetchError('Please select a file')
      return
    }
    const data = await excelToJson(file)

    const res = await fetch('/api/instagram/excel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
        campaignId: campaign.id,
      }),
    })

    if (res.status === 200) {
      router.refresh()
    } else {
      console.log('error')
    }
  }

  return (
    <>
      <div className='flex w-full flex-wrap'>
        <div className='w-full'>
          <div className='mb-8 md:px-12'>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(1)
              }}
              data-toggle='tab'
              role='tablist'
              className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8 py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200 `}>
              overview
            </button>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(2)
              }}
              data-toggle='tab'
              role='tablist'
              className='text-xm -mb-px mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8 py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200'>
              creators
            </button>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(3)
              }}
              data-toggle='tab'
              role='tablist'
              className='text-xm -mb-px mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8 py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200'>
              posts
            </button>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(4)
              }}
              data-toggle='tab'
              role='tablist'
              className='text-xm -mb-px mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8  py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200'>
              stats
            </button>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(5)
              }}
              className='text-xm -mb-px mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8  py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200'>
              share
            </button>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(6)
              }}
              className='text-xm -mb-px mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8  py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200'>
              settings
            </button>
          </div>

          <div className='relative mb-6 flex w-full min-w-0 flex-col break-words bg-white '>
            <div className='flex-auto '>
              <div className='tab-content tab-space'>
                <section className={openTab === 1 ? 'block' : 'hidden'}>
                  <div className='pt-6'>
                    <OverviewCampaign
                      brief={campaign?.description || ''}
                      creators={campaign?._count?.creators || 0}
                      content={campaign?._count?.posts || 0}
                      audience={campaign?.stats?.impressionsCount || 0}
                      plays={campaign?.stats?.playsCount || 0}
                    />

                    <ManagePosts
                      addPost={setIsOpen}
                      shared={false}
                      title={'Grid'}
                      tags={tags}
                      setTags={setTags}
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
                      <div className='ml-12 flex flex-wrap gap-x-6 gap-y-8'>
                        {filteredPosts?.map((post, index: any) => (
                          <PostCard key={index} post={post} />
                        ))}
                        {campaign?.posts?.length === 0 && (
                          <>
                            <h1>{`Seems like you dont have posts! :(`}</h1>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
                <div className={openTab === 2 ? 'block' : 'hidden'}>
                  <CreatorRow comeFrom={'campigns'} creators={creators} />
                </div>
                <div className={openTab === 3 ? 'block' : 'hidden'}>
                  <div className='pt-6'>
                    <div className='ml-12 flex flex-wrap gap-x-6 gap-y-8'>
                      {filteredPosts?.map((post, index: any) => (
                        <PostCard key={index} post={post} />
                      ))}
                      {campaign?.posts?.length === 0 && (
                        <>
                          <h1>{`Seems like you dont have posts! :(`}</h1>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className={openTab === 4 ? 'block' : 'hidden'}>
                  <div className='flex gap-8'>
                    <div className='w-96 px-12'>
                      <p className='my-8 text-xl font-bold'>Stats</p>
                      <div className='flex flex-col gap-4'>
                        <p className={`w-44 rounded-lg bg-green-50 px-6 py-4`}>
                          {`👤 ${campaign?._count?.creators} Creators`}
                        </p>
                        <p className={`w-44 rounded-lg bg-green-50 px-6 py-4`}>
                          {`📝 ${campaign?.posts?.length} Posts`}
                        </p>
                      </div>
                      {/* <p className='my-8 italic'>by platform</p>
                      <SinglePlatform /> */}
                    </div>
                    <div className=''>
                      <p className='mb-8 mt-12'>Top posts by views</p>
                      <TopPost posts={campaign.posts} />
                    </div>
                  </div>
                </div>
                <div className={openTab === 5 ? 'block' : 'hidden'}>
                  <TabsToShare campaignId={campaign.id} />
                </div>
                <div className={openTab === 6 ? 'block' : 'hidden'}>
                  <SettingsTab campaign={campaign} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-[99]'>
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <Dialog.Panel
            className={`${ptMono.className} flex w-full max-w-lg flex-col rounded-md bg-white p-16 sm:px-0`}>
            <Dialog.Title className='mb-8 text-center'>add posts</Dialog.Title>
            <Tab.Group>
              <Tab.List className='flex flex-row items-center justify-center gap-6'>
                <Tab
                  className={({ selected }) =>
                    ` rounded-3xl border-2 border-primary px-8 py-2 hover:shadow ${
                      selected ? 'bg-primary' : ''
                    }`
                  }>
                  add manually
                </Tab>

                <Tab
                  className={({ selected }) =>
                    `rounded-3xl border-2 border-primary px-8  py-2 hover:shadow ${
                      selected ? 'bg-primary' : ''
                    }`
                  }>
                  upload from file
                </Tab>
              </Tab.List>
              <Tab.Panels className='mt-2'>
                <Tab.Panel className='px-12 py-8'>
                  <FeatureNotImplemented />
                  <form onSubmit={handlePosts} className='flex flex-col gap-3'>
                    <label>{`Instagram Link(s)`}</label>
                    <textarea
                      className='textarea-bordered textarea rounded-md'
                      placeholder='copy and paste multiple links here'
                      onChange={e => setNewPosts(e.target.value)}
                      required
                    />
                    {fetchError && (
                      <div className='alert alert-error flex justify-center shadow-lg'>
                        <div className='flex flex-row gap-4'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6 flex-shrink-0 stroke-current'
                            fill='none'
                            viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                          <span>{fetchError}</span>
                        </div>
                      </div>
                    )}

                    <button
                      disabled={true}
                      className='flex self-end rounded-full bg-green-200 px-8 py-2'
                      type='submit'>
                      {loading ? (
                        <Spinner width='w-4' height='h-4' border='border-2' />
                      ) : (
                        'add'
                      )}
                    </button>
                  </form>
                </Tab.Panel>

                <Tab.Panel className='flex flex-col gap-4 px-16 py-8'>
                  <h2>
                    Download a{' '}
                    <Link href={'/'}>
                      sample CSV template to see an example of the format
                      required
                    </Link>
                  </h2>
                  <form
                    className='flex flex-col gap-3'
                    onSubmit={handleFileSubmit}>
                    <input name='test' id='test' type='text' />
                    <input
                      name='campaignExcel'
                      id='campaignExcel'
                      type='file'
                      accept='.xlsx, .xls'
                      className='file-input-bordered file-input w-full'
                    />
                    <button
                      className='flex self-end rounded-full bg-green-200 px-8 py-2'
                      type='submit'>
                      add
                    </button>
                  </form>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </Dialog.Panel>
        </div>
      </Dialog> */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-[99]'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          {/* The actual dialog panel  */}
          <Dialog.Panel
            className={`flex w-full max-w-xl flex-col rounded-xl bg-white  `}>
            <Image src={modalCover} className='rounded-t-xl' alt={''} />
            <Dialog.Title className=' text-lg font-medium mb-8 text-center'>
              Automatically track when your creators post 🥥
            </Dialog.Title>

            <Tab.Group>
              <Tab.List
                className={`flex flex-row items-center justify-center gap-6 ${ptMono.className}`}>
                <Tab
                  className={({ selected }) =>
                    ` rounded-3xl border-2 border-primary px-12 py-2 ${
                      selected ? 'bg-primary' : ''
                    }`
                  }>
                  add manually
                </Tab>

                <Tab
                  className={({ selected }) =>
                    `rounded-3xl border-2 border-primary px-8  py-2 ${
                      selected ? 'bg-primary' : ''
                    }`
                  }>
                  upload from file
                </Tab>
              </Tab.List>
              <Tab.Panels className='mt-2'>
                <Tab.Panel className=''>
                  <div className='divider px-8'></div>
                  <div className='flex gap-4  px-7 justify-between mb-4'>
                    <div className='w-full'>
                      <p className='text-sm font-semibold'>Assign to creator</p>
                      <select
                        className='w-full mt-4 rounded-xl border border-gray-300 bg-gray-50 pl-4 py-3 text-sm text-gray-900 flex-grow bg-transparent outline-none'
                        name=''
                        id=''></select>
                    </div>
                    <div className='w-full'>
                      <p className='text-sm font-semibold'>
                        Hashtag(s) your creator will use
                      </p>
                      <TagsInput tags={tags} setTags={setTags} />
                    </div>
                  </div>
                  <div className='flex w-full flex-col justify-end items-end px-7 mb-6'>
                    <span className='text-xs italic font-light mb-4'>
                      separate multiple with a enter
                    </span>
                    <button
                      className={`px-9 py-3 bg-green-200 ${ptMono.className} rounded-full`}>
                      start tracking
                    </button>
                  </div>
                </Tab.Panel>

                <Tab.Panel className=''>
                  <div className='flex gap-4  px-7 justify-between mb-4 flex-col'>
                    <h2>
                      Download a{' '}
                      <Link href={'/'}>
                        sample CSV template to see an example of the format
                        required
                      </Link>
                    </h2>
                    <form
                      className='flex flex-col gap-3'
                      onSubmit={handleFileSubmit}>
                      <input
                        name='campaignExcel'
                        id='campaignExcel'
                        type='file'
                        accept='.xlsx, .xls'
                        className='file-input-bordered file-input w-full'
                      />
                      {fetchError && (
                        <div className='alert alert-error flex justify-center shadow-lg'>
                          <div className='flex flex-row gap-4'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 flex-shrink-0 stroke-current'
                              fill='none'
                              viewBox='0 0 24 24'>
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                              />
                            </svg>
                            <span>{fetchError}</span>
                          </div>
                        </div>
                      )}
                      <button
                        className='flex self-end rounded-full bg-green-200 px-8 py-2'
                        type='submit'>
                        add
                      </button>
                    </form>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
