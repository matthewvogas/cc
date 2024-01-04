import imageCover from 'public/assets/register/campaignCover.jpg'
import AddPortfolio from '@/components/modals/agency/addPortofolio'
import PerformingContent from './performingContent'
import Stats from '@/components/stats/agency/stats'
import React, { useEffect, useMemo, useState } from 'react'
import CardPortfolio from './cardPortfolio'
import { FiCoffee } from 'react-icons/fi'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import Link from 'next/link'
import { CampaignRes } from '@/types/campaign/campaignRes'
import { useRouter } from 'next/navigation'
import { excelToJson } from '@/lib/Utils'
import { FiChevronDown } from 'react-icons/fi'
import TagsInput from '@/components/inputs/tag'
import DropdownCheckbox from '@/components/inputs/dropdownCheckbox'
import Spinner from '@/components/loading/spinner'
import useSWR from 'swr'
import Pagination from '@/components/pagination/pagination/pagination'
import SelectPostCard from '@/components/cards/influencer/posts/SelectPostCard'

type Props = {
  connections: any
  clients: any
  campaigns: any
  instagramPages: any
  tokenIg: any
}

interface CheckboxOption {
  id: string
  username: string
  checked: boolean
}

export default function CampaignsPortfolio({
  connections,
  clients,
  campaigns,
  instagramPages,
  tokenIg,
}: Props) {
  const stats = [
    {
      section: 'private',
      data: [
        { title: '50', description: 'brand posts' },
        { title: '50,000', description: 'likes' },
        { title: '10', description: 'campaigns' },
        { title: '35,000', description: 'views' },
        { title: '5000', description: 'comments' },
      ],
    },
    {
      section: 'public',
      data: [{ title: 'creators.length', description: 'creators' }],
    },
  ]

  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [links, setLinks] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [rowsLinks, setRowsLinks] = useState(1)

  const [isOpen, setIsOpen] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const [activeSection, setActiveSection] = useState<number>(0)

  const [activeCampaign, setActiveCampaign] = useState<CampaignRes | null>(null)

  const handleButtonClick = (campaign: CampaignRes, section: number) => {
    if (activeSection !== section) {
      setActiveSection(section)
      setActiveCampaign(campaign)
    }
  }

  const [checkboxOptions, setCheckboxOptions] = useState<CheckboxOption[]>([])

  useEffect(() => {
    const transformedOptions = instagramPages.map((page: any) => ({
      id: page.accountId,
      username: page.username,
      checked: false,
      token: tokenIg,
    }))

    setCheckboxOptions(transformedOptions)
  }, [instagramPages, tokenIg])

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

        URL.revokeObjectURL(objectUrl)
      } catch (error) {
        console.error('Error al descargar el archivo:', error)
      }
    }
  }

  const handleOptionChange = (id: string, checked: boolean) => {
    const updatedOptions = checkboxOptions.map(option => {
      if (option.id === id) {
        return { ...option, checked }
      }
      return option
    })
    setCheckboxOptions(updatedOptions)
  }

  const [errorText, setErrorText] = useState('')

  const handleLinksSubmit =
    (campaignId: string) => async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      setFetchError(null)

      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      const file = formData.get('file') as File
      const posts: Array<string> = file.name
        ? await excelToJson(file)
        : links.split(',').map(post => post.trim())

      if (
        posts.some(
          post =>
            !post.startsWith('https://') &&
            !post.includes('instagram') &&
            !post.includes('tiktok'),
        )
      ) {
        setLoading(false)
        setFetchError('Please add valid links')
        return
      }

      try {
        const res = await fetch('/api/urls', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            posts,
            campaignId: campaignId,
          }),
        })

        if (res.ok) {
          form.reset()
          setLinks('')
          setIsOpen(false)
          router.refresh()
        } else {
          setFetchError('An error occurred')
        }
      } catch (error) {
        console.log(error)
        setFetchError('An error occurred')
      } finally {
        setLoading(false)
      }
    }

  interface SectionProps {
    campaign: CampaignRes
  }

  const [page, setPage] = useState([0])
  const currentPage = page[page.length - 1]
  const limit = 10
  const [activeSocial, setActiveSocial] = useState('All')

  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error } = useSWR(
    `/api/posts/creator?limit=${limit}&offset=${
      currentPage * limit
    }&activeSocial=${activeSocial}`,
    fetcher,
  )

  const totalPages = Math.ceil(data?.totalPosts / limit)

  const loadMorePosts = () => {
    if (data?.hasMore) {
      setPage(prevPage => [...prevPage, prevPage[prevPage.length - 1] + 1])
    }
  }

  const loadPreviousPosts = () => {
    setPage(prevPage => prevPage.slice(0, -1))
  }

  const track = (Id: string) => async () => {
    setLoading(true)

    const creators = checkboxOptions.filter(option => option.checked)
    const campaignId = Id

    try {
      const res = await fetch('/api/collect/track/instagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creators,
          tags,
          campaignId,
        }),
      })

      if (res.ok) {
        setLoading(false)
        setErrorText('')
        setIsOpen(false)
      } else {
        setLoading(false)
        setErrorText(
          'An error occurred, refresh the page and try again. Make sure you have correctly included the hashtags without # and creators',
        )
        setFetchError('An error occurred')
      }
    } catch (error) {
      setFetchError('An error occurred')
    }
  }

  useEffect(() => {
    if (campaigns && campaigns.length > 0) {
      setActiveCampaign(campaigns[0])
    }
  }, [campaigns])

  const [selectedPostIds, setSelectedPostIds] = useState<string[]>([])

  const toggleSelectPost = (postId: string) => {
    setSelectedPostIds((prevSelected: any) =>
      prevSelected.includes(postId)
        ? prevSelected.filter((id: any) => id !== postId)
        : [...prevSelected, postId],
    )
  }

  const SectionOne: React.FC<SectionProps> = ({ campaign }) => {
    return (
      <div className={`flex flex-col w-full`}>
        <div className='mt-12 mx-8'>
          <div className='flex justify-between w-full'>
            <p className='text-xl'>Select from posts</p>
            <div className='flex gap-4'>
              <p className='px-3 py-2 bg-[#E9F7F0] rounded-full text-center'>
                {selectedPostIds.length} posts selected
              </p>
              <button
                // on clik para guardar posts
                disabled={loading}
                className='flex self-end bg-[#E2DED4] rounded-lg px-7 py-2'
                type='submit'>
                {loading ? <span>Loading...</span> : 'done'}
              </button>
            </div>
          </div>
        </div>

        <div className='divider'></div>

        <div className='px-4 overflow-y-auto '>
          <div className='justify-start grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-x-2 2xl:grid-cols-5 gap-y-2  pb-12'>
            {loading ? (
              <Spinner width='w-4' height='h-4' border='border-2' />
            ) : (
              Array.isArray(data?.posts) &&
              data.posts.map((post: any) => (
                <SelectPostCard
                  key={post.id}
                  post={post}
                  isSelected={selectedPostIds.includes(post.id)}
                  onToggleSelect={() => toggleSelectPost(post.id)}
                />
              ))
            )}
          </div>

          <Pagination
            pageLength={page.length}
            currentPage={currentPage}
            totalPages={totalPages}
            loadPrevious={loadPreviousPosts}
            loadMore={loadMorePosts}
          />
        </div>
      </div>
    )
  }

  const SectionTwo: React.FC<SectionProps> = ({ campaign }) => {
    return (
      <div className={`flex flex-col w-full`}>
        <div className='mt-12 mx-8'>
          <div className='flex justify-between w-full'>
            <p className='text-xl'>Add posts from links</p>
          </div>
        </div>

        <div className='divider'></div>

        <div className='px-8'>
          <form
            className='flex'
            onSubmit={handleLinksSubmit(String(campaign.id))}>
            <div className='w-full'>
              <div className='flex flex-col gap-4 px-7'>
                <h2 className='text-left font-medium'>
                  Instagram, Facebook, or TikTok link
                </h2>
                <textarea
                  value={links}
                  onChange={e => setLinks(e.target.value)}
                  rows={rowsLinks}
                  className='border px-4 py-3 outline-none rounded-lg border-[#7F7F7F] text-[#7F7F7F] h-full'
                  placeholder='https://'></textarea>
              </div>

              <div className='flex w-full flex-col justify-end items-end px-7 mb-6'>
                <div className='flex justify-between w-full mt-3'>
                  <button
                    type='button'
                    onClick={() =>
                      rowsLinks == 1 ? setRowsLinks(5) : setRowsLinks(1)
                    }
                    className='text-xs font-light mb-4 flex gap-2 items-center'>
                    <span className='text-[#7F7F7F]'>
                      {rowsLinks === 1 ? 'bulk add links' : 'add one link'}
                    </span>
                    <FiChevronDown
                      style={{
                        color: '#7F7F7F',
                        transform: rowsLinks == 1 ? '' : 'rotate(180deg)',
                      }}
                    />
                  </button>

                  <p className='text-xs italic font-light mb-4'>
                    separate multiple with a comma
                  </p>
                </div>
              </div>
            </div>

            <div className='flex gap-4  px-7 justify-between mb-4  w-full flex-col'>
              <h2 className='text-sm -mb-3'>Upload a spreadsheet</h2>

              <div className='flex flex-col gap-3'>
                <input
                  type='file'
                  className='file-input file-input-bordered w-full max-w-xs'
                  name='file'
                  accept='.xlsx, .xls, .csv'
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
              </div>

              <p className='text-xs'>
                Download a{' '}
                <button className='underline' onClick={handleDownloadClick}>
                  sample CSV template
                </button>
                {''}
                to see an example of the format required.
              </p>

              <button
                disabled={loading}
                className='flex self-end bg-[#E2DED4] rounded-lg px-7 py-2'
                type='submit'>
                {loading ? <span>Loading...</span> : 'done'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const SectionThree: React.FC<SectionProps> = ({ campaign }) => {
    return (
      <div className={`flex flex-col w-full`}>
        <div className='mt-12 mx-8'>
          <div className='flex justify-between w-full'>
            <p className='text-xl'>Auto Tracking</p>
          </div>
        </div>

        <div className='divider'></div>

        <div className='px-8'>
          <div className='px-7'>
            <p className='text-sm font-semibold mb-2'>
              Hashtag(s) you will use
            </p>
            <TagsInput required tags={tags} setTags={setTags} />
            <span className='text-xs italic font-light mb-4'>
              separate multiple with a comma
            </span>
          </div>

          <div className='px-7'>
            <p className='text-sm font-semibold'>
              Assign to one of your associated accounts
            </p>
            <div className='flex gap-3'>
              <div className='w-full'>
                <DropdownCheckbox
                  options={checkboxOptions}
                  onOptionChange={handleOptionChange}
                />
              </div>
            </div>
          </div>

          <div className='flex w-full flex-col justify-end items-end px-7 mt-4 mb-4 '>
            <button
              disabled={loading}
              onClick={track(String(campaign.id))}
              className={`flex self-end bg-[#D3F0E2] rounded-lg px-8 py-2`}>
              {loading ? (
                <Spinner width='w-4' height='h-4' border='border-2' />
              ) : (
                'start tracking'
              )}
            </button>
            <p className='pt-2 text-sm'>{errorText}</p>
          </div>
        </div>
      </div>
    )
  }

  const sections = [
    { component: SectionOne, title: 'Select from your posts' },
    { component: SectionTwo, title: 'Add links' },
    { component: SectionThree, title: 'Auto track ✨' },
  ]
  return (
    <div>
      <section>
        <div className='flex justify-between mb-8'>
          <div className='w-full flex justify-between items-center overflow-x-auto gap-4 overflow-y-hidden mt-4 mx-12'>
            <div className='flex gap-4'>
              {/* <FilterPostsTrigger
                filterPosts={filterPosts}
                setFilterPosts={setFilterPosts}
              /> */}

              {/* <button
                type='button'
                className={`
                      text-xm whitespace-nowrap text-base md:text-base mr-4 items-center rounded-full p-2 px-8 py-3 text-gray-900 `}>
                top performing 🥥
              </button> */}
            </div>

            <div className='flex gap-4 justify-end'>
              <AddPortfolio
                clientsFallback={connections}
                text={'create a portfolio'}
                icon={undefined}
              />
            </div>
          </div>
        </div>

        {/* // cambiar aqui */}

        <div className='flex flex-col bg-white pt-6'>
          <div className='flex overflow-scroll overflow-y-hidden gap-4 md:px-12'>
            {campaigns.length > 0 ? (
              campaigns.map((card: any, index: any) => (
                <div
                  className={`inline-block bg-[#f8f7f4c7] border min-w-[250px] `}
                  key={index}>
                  <Link href={`/dashboard/campaigns/${card.id}`}>
                    <Image
                      className={`object-cover`}
                      src={card.imageUrl || imageCover}
                      alt={card.name}
                      style={{ width: '250px', height: '310px' }}
                      width={250}
                      height={310}
                    />
                    <div className='mb-4 flex max-w-[250px] justify-between gap-4 px-6 pt-4'>
                      <div className='max-w-[200px] overflow-clip'>
                        <h5 className='truncate font-medium text-base'>
                          {card.name}
                        </h5>
                      </div>
                    </div>
                    <hr className=' h-px bg-gray-200'></hr>
                  </Link>

                  <div>
                    <div
                      className={`flex justify-between items-center gap-2 px-6 py-[14px] ${ptMono.className}`}>
                      <label
                        htmlFor='my-modal-3'
                        className='flex justify-center w-full rounded-full bg-[#E9F7F0] px-4 py-3 text-base'>
                        add posts
                      </label>
                    </div>

                    <input
                      type='checkbox'
                      id='my-modal-3'
                      className='modal-toggle'
                    />
                    <div className='modal align-bottom items-end'>
                      <div className='modal-box max-w-[90vw] relative flex overflow-hidden  bg-white p-0 rounded-b-none h-full'>
                        <label
                          htmlFor='my-modal-3'
                          className='absolute z-10 right-4 top-2 cursor-pointer text-lg text-black'>
                          ✕
                        </label>

                        <div className='w-auto flex flex-col items-center bg-headerMenu h-full'>
                          <div className='flex flex-col items-center mt-10 w-80 '>
                            <span className=' text-xl'>🥥</span>
                            <h2 className='text-xl font-bold'>Add posts</h2>
                          </div>
                          <div className='flex flex-col mt-10 gap-5 w-full px-12'>
                            {[
                              'Select from your posts',
                              'Add links',
                              'Auto track ✨',
                            ].map((title, index) => (
                              <button
                                key={index}
                                className={`bg-[#F7F4F1] px-6 py-3 rounded-2xl flex justify-center ${
                                  activeSection === index
                                    ? 'bg-[#fff] text-black'
                                    : ''
                                }`}
                                onClick={() => handleButtonClick(card, index)}>
                                {title}
                              </button>
                            ))}
                          </div>
                        </div>
                        {activeCampaign &&
                          React.createElement(
                            sections[activeSection].component,
                            {
                              campaign: activeCampaign,
                            },
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                className={`bg-transparent border min-w-[250px] opacity-40 ${ptMono.className}`}>
                <div className='w-[250px] h-[310px] gap-3 flex flex-col justify-center items-center p-12'>
                  <FiCoffee style={{ width: '24px' }} />
                  <p className=' text-center text-base'>{`No portfolios in sight! Don't worry, they're just shy. Try a different search term or create a new one`}</p>
                </div>
                <div className='mb-4 flex justify-between gap-4 px-6 pt-4'>
                  <h5>- - - -</h5>
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
                    - - {`creators`}
                  </h4>
                  <h4 className=' self-baseline rounded-full bg-white px-4 py-3 text-base'>
                    - - {`posts`}
                  </h4>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
