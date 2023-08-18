'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import { Tab } from '@headlessui/react'
import { excelToJson } from '@/lib/Utils'
import { Dialog } from '@headlessui/react'
import TopPost from '@/components/topPost'
import { useRouter } from 'next/navigation'
import PostCard from '@/components/postCard'
import Spinner from '@/components/ui/spinner'
import TagsInput from '@/components/TagsInput'
import { SetStateAction, useState } from 'react'
import CreatorRow from '@/components/creatorRow'
import SettingsTab from '@/components/settingsTab'
import TabsToShare from '@/components/tabsToShare'
import { Posts } from '@/types/posts/PostByCampaignRes'
import FilterCreators from '@/components/filtersCreators'
import { CampaignRes } from '@/types/campaign/campaignRes'
import OverviewCampaign from '@/components/overviewCampaign'
import modalCover from 'public/assets/register/addpostToTrack.jpg'
import ButtonsGroupTabsSocial from '@/components/socialPostsPlatform'
import TikTokNotAccountConnected from '@/components/tiktokNotAccountsConnected'

export default function CampaingTabs({
  campaign,
  creators,
  posts,
}: {
  campaign: CampaignRes
  creators: any
  posts: Posts[]
}) {
  const tiktokPosts = posts.filter(post => post.platform === 'tiktok')
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [openTab, setOpenTab] = useState(1)

  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [links, setLinks] = useState<string>('')

  const [tags, setTags] = useState<string[]>([])
  const [creatorsSelecteds, setCreatorsSelecteds] = useState<Posts[]>([])
  const [activePlatforms, setActivePlatforms] = useState<any[]>([])
  const [activeButton, setActiveButton] = useState('galleryView')

  const [socialActiveFilter, setSocialActiveFilter] = useState<string[]>([])
  const [followerCountFilter, setFollowerCountFilter] = useState(0)
  const [followerCountFilterSecond, setFollowerCountFilterSecond] = useState(0)
  const [selectedCampaign, setSelectedCampaign] = useState('')

  const handleRemoveSocial = (red: any) => {
    const updatedSocialFilter = socialActiveFilter.filter(c => c !== red)
    setSocialActiveFilter(updatedSocialFilter)
  }

  const handleRemoveCount = (count: any) => {
    setFollowerCountFilter(0)
    setFollowerCountFilterSecond(0)
  }

  const handleRemoveCampaign = (count: any) => {
    setSelectedCampaign('')
  }

  const filters = {
    socialActiveFilter: socialActiveFilter,
    followerCountFilter: followerCountFilter,
    followerCountFilterSecond: followerCountFilterSecond,
    selectedCampaign: selectedCampaign,
  }

  const [activeSocial, setActiveTab] = useState('All')

  const filteredPosts = campaign?.posts?.filter(post => {
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
        post.caption?.split(' ').some(tag => tags.includes(tag)))
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

  const handleDownloadClick = async () => {
    const url = 'https://dewinu.com/docs/example.xlsx'
    if (url) {
      try {
        const response = await fetch(url)
        const blob = await response.blob()
        const filename = 'example_codecoco.xlsx'
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = objectUrl
        link.download = filename
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Liberar el objeto URL
        URL.revokeObjectURL(objectUrl)
      } catch (error) {
        console.error('Error al descargar el archivo:', error)
      }
    }
  }

  const handleFileSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    setFetchError(null)
    e.preventDefault()
    const file = (e.target as HTMLFormElement).campaignExcel.files[0]
    if (!file) {
      setFetchError('Please select a file')
      return
    }
    const posts = await excelToJson(file)

    try {
      const res = await fetch('/api/urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          posts,
          campaignId: campaign.id,
        }),
      })

      if (res.status === 200 && res.ok) {
        setLoading(false)
        setIsOpen(false)
        await router.refresh()
      } else {
        console.log('error')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleLinksSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFetchError(null)

    console.log(links)
    console.log(campaign.id)
    try {
      const res = await fetch('/api/urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          posts: links,
          campaignId: campaign.id,
        }),
      })

      if (res.status === 200 && res.ok) {
        setLinks('')
        setLoading(false)
        setIsOpen(false)
        await router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleHashTagSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFetchError(null)
    setLoading(false)
  }

  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full'>
          <div className='mb-8 md:px-12 flex justify-between flex-wrap gap-5'>
            <div className='whitespace-nowrap overflow-y-hidden overflow-x-auto pb-2'>
              <button
                onClick={e => {
                  e.preventDefault()
                  setOpenTab(1)
                }}
                data-toggle='tab'
                role='tablist'
                className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full border-2 p-2 px-8 py-2 text-left text-gray-900 last:mr-0 ${
                  openTab == 1
                    ? 'border border-[#FACEBC]'
                    : 'border border-[#ffffff]'
                }`}>
                overview
              </button>
              <button
                onClick={e => {
                  e.preventDefault()
                  setOpenTab(2)
                }}
                data-toggle='tab'
                role='tablist'
                className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full border-2 p-2 px-8 py-2 text-left text-gray-900 last:mr-0 ${
                  openTab == 2
                    ? 'border border-[#FACEBC]'
                    : 'border border-[#ffffff]'
                }`}>
                creators
              </button>
              <button
                onClick={e => {
                  e.preventDefault()
                  setOpenTab(3)
                }}
                data-toggle='tab'
                role='tablist'
                className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full border-2 p-2 px-8 py-2 text-left text-gray-900 last:mr-0 ${
                  openTab == 3
                    ? 'border border-[#FACEBC]'
                    : 'border border-[#ffffff]'
                }`}>
                posts
              </button>
              <button
                onClick={e => {
                  e.preventDefault()
                  setOpenTab(4)
                }}
                data-toggle='tab'
                role='tablist'
                className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full border-2 p-2 px-8 py-2 text-left text-gray-900 last:mr-0 ${
                  openTab == 4
                    ? 'border border-[#FACEBC]'
                    : 'border border-[#ffffff]'
                }`}>
                stats
              </button>
              <button
                onClick={e => {
                  e.preventDefault()
                  setOpenTab(5)
                }}
                className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full border-2 p-2 px-8 py-2 text-left text-gray-900 last:mr-0 ${
                  openTab == 5
                    ? 'border border-[#FACEBC]'
                    : 'border border-[#ffffff]'
                }`}>
                share
              </button>
              <button
                onClick={e => {
                  e.preventDefault()
                  setOpenTab(6)
                }}
                className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full border-2 p-2 px-8 py-2 text-left text-gray-900 last:mr-0 ${
                  openTab == 6
                    ? 'border border-[#FACEBC]'
                    : 'border border-[#ffffff]'
                }`}>
                settings
              </button>
            </div>
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

                    <ButtonsGroupTabsSocial
                      setActiveButton={setActiveButton}
                      filteredPosts={filteredPosts}
                      activeSocial={activeSocial}
                      setActiveSocial={setActiveTab}
                      campaign={campaign}
                      tiktokPosts={tiktokPosts}
                      id={campaign.id!}
                      addPost={setIsOpen}
                      shared={false}
                      tags={tags}
                      setTags={setTags}
                      creators={creators}
                      creatorsSelecteds={creatorsSelecteds}
                      setCreatorsSelecteds={setCreatorsSelecteds}
                      activePlatforms={activePlatforms}
                      setActivePlatforms={setActivePlatforms}
                      activeButton={activeButton}
                    />
                  </div>
                </section>
                <div className={openTab === 2 ? 'block' : 'hidden'}>
                  <div className='relative z-50'>
                    <FilterCreators
                      campaigns={campaign}
                      socialActiveFilter={socialActiveFilter}
                      setSocialActiveFilter={setSocialActiveFilter}
                      followerCountFilter={followerCountFilter}
                      setFollowerCountFilter={setFollowerCountFilter}
                      followerCountFilterSecond={followerCountFilterSecond}
                      setFollowerCountFilterSecond={
                        setFollowerCountFilterSecond
                      }
                      selectedCampaign={selectedCampaign}
                      setSelectedCampaign={setSelectedCampaign}
                    />
                  </div>
                  <div className='flex h-full w-full flex-col items-center justify-center gap-4 bg-white'>
                    {/* active social filter */}
                    <div className='flex justify-start w-full gap-4 px-12'>
                      {socialActiveFilter?.map((social: any, index: number) => (
                        <div
                          className={`flex flex-col rounded-xl bg-beigeSelected px-8 py-2`}
                          key={index}>
                          <div className='flex gap-2 items-center'>
                            <label className={`${ptMono.className}`}>
                              {social}
                            </label>
                            <button onClick={() => handleRemoveSocial(social)}>
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

                    {/* active follower count filter */}
                    {followerCountFilter != 0 ||
                    followerCountFilterSecond != 0 ? (
                      <div className='flex justify-start w-full gap-4 px-12'>
                        <div
                          className={`flex flex-col rounded-xl border-2 bg-beigeFirst border-beigeBorder px-8 py-2`}>
                          <div className='flex gap-2 items-center'>
                            <label className={`${ptMono.className}`}>
                              <p>
                                {followerCountFilter} -{' '}
                                {followerCountFilterSecond}
                              </p>
                            </label>
                            <button
                              onClick={() =>
                                handleRemoveCount(followerCountFilter)
                              }>
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
                      </div>
                    ) : (
                      <div className='hidden'></div>
                    )}

                    {selectedCampaign != '' ? (
                      <div className='flex justify-start w-full gap-4 px-12'>
                        <div
                          className={`flex flex-col rounded-xl  bg-beigeBorder px-8 py-2`}>
                          <div className='flex gap-2 items-center'>
                            <label className={`${ptMono.className}`}>
                              <p>{selectedCampaign}</p>
                            </label>
                            <button
                              onClick={() =>
                                handleRemoveCampaign(selectedCampaign)
                              }>
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
                      </div>
                    ) : (
                      <div className='hidden'></div>
                    )}
                  </div>
                  <CreatorRow
                    comeFrom={'campigns'}
                    creators={creators}
                    clients={[]}
                    search={''}
                    creatorsFilter={filters}
                  />
                </div>
                <div className={openTab === 3 ? 'block' : 'hidden'}>
                  <div className='pt-6'>
                    <div className='mx-6 md:ml-12 justify-start grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2  2xl:grid-cols-5 gap-y-2 pb-32'>
                      {filteredPosts?.map((post, index: any) => (
                        <PostCard key={index} post={post} />
                      ))}
                      {campaign?.posts?.length === 0 && (
                        <div className='col-span-4 md:col-span-2'>
                          <h1>{`Seems like you don't have posts! :(`}</h1>
                        </div>
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
                    </div>

                    <div className='relative'></div>
                    <div className='overflow-scroll'>
                      <p className='absolute '>Top posts by views</p>
                      <div className='w-full mt-12'>
                        <TopPost posts={campaign.posts!} />
                      </div>
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

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-[99]'>
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
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
                  <form onSubmit={handleHashTagSubmit}>
                    <div className='flex gap-4  px-7 justify-between mb-4'>
                      <div className='w-full'>
                        <p className='text-sm font-semibold'>
                          Assign to creator
                        </p>
                        <select
                          required
                          className='w-full mt-4 rounded-xl border border-gray-300 bg-gray-50 pl-4 py-3 text-sm text-gray-900 flex-grow bg-transparent outline-none'
                          name=''
                          id=''></select>
                      </div>
                      <div className='w-full'>
                        <p className='text-sm font-semibold'>
                          Hashtag(s) your creator will use
                        </p>
                        <TagsInput required tags={tags} setTags={setTags} />
                      </div>
                    </div>
                    <div className='flex w-full flex-col justify-end items-end px-7 mb-2'>
                      <span className='text-xs italic font-light mb-4'>
                        separate multiple with a enter
                      </span>
                      <button
                        className={`px-9 py-3 bg-green-200 ${ptMono.className} rounded-full`}>
                        {loading ? (
                          <Spinner width='w-4' height='h-4' border='border-2' />
                        ) : (
                          'start tracking'
                        )}
                      </button>
                    </div>
                  </form>
                  <div className='divider mx-0'>OR</div>
                  <form onSubmit={handleLinksSubmit}>
                    <div className='flex flex-col gap-4 px-7'>
                      <h2 className='text-center font-medium'>
                        Drop the link(s) of your creators
                      </h2>
                      <textarea
                        value={links}
                        onChange={e => setLinks(e.target.value)}
                        required
                        className='textarea textarea-bordered rounded-md'
                        placeholder='Intagram, Tiktok, Pinterest links'></textarea>
                    </div>
                    <div className='flex w-full flex-col justify-end items-end px-7 mb-6'>
                      <span className='text-xs italic font-light mb-4'>
                        separate multiple with a comma
                      </span>
                      <button
                        className={`px-9 py-3 bg-green-200 ${ptMono.className} rounded-full`}>
                        {loading ? (
                          <Spinner width='w-4' height='h-4' border='border-2' />
                        ) : (
                          'add'
                        )}
                      </button>
                    </div>
                  </form>
                </Tab.Panel>

                <Tab.Panel className=''>
                  <div className='flex gap-4  px-7 justify-between mb-4 flex-col'>
                    <h2>
                      Download a{' '}
                      <button onClick={handleDownloadClick}>
                        sample CSV template to see an example of the format
                        required
                      </button>
                    </h2>
                    <form
                      className='flex flex-col gap-3'
                      onSubmit={handleFileSubmit}>
                      <input
                        name='campaignExcel'
                        id='campaignExcel'
                        type='file'
                        accept='.xlsx, .xls, .csv'
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
                        disabled={loading}
                        className='flex self-end rounded-full bg-green-200 px-8 py-2'
                        type='submit'>
                        {loading ? (
                          <Spinner width='w-4' height='h-4' border='border-2' />
                        ) : (
                          'add'
                        )}
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
