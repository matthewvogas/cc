'use client'

import imageCover from 'public/assets/register/TopPost.jpg'
import SearchByTag from '../../inputs/searchByTag'
import TitlePage from '../../labels/titlePage'
import { inter, ptMono } from '@/app/fonts'
import Search from '../../inputs/search'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { RegisterNextButton } from '@/app/onboarding/agency/registerNextButton'
import { Pagination } from 'swiper/modules'
import PaginationScroll from '@/components/pagination/pagination/pagination'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useRouter } from 'next/navigation'
import { useAgenciesDashboard } from './store/AgencyDashBoardStore'
import useConnections from '@/hooks/useConnections'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

type Props = {
  agenciesConnections: any
  agency: any
  session: any
  instagramConnection: any
}

export default function AgenciesDashBoard({
  agenciesConnections,
  agency,
  session,
  instagramConnection,
}: Props) {
  const {
    agenciesSelected,
    setAgenciesSelected,
    tagSelected,
    setSearchTags,
    inputSearchValue,
    setInputSearchValue,
    inputSearchValueModal,
    setInputSearchValueModal,
    SecondStep,
    setSecondStep,
  } = useAgenciesDashboard()

  const router = useRouter()

  const [page, setPage] = useState([0])
  const currentPage = page[page.length - 1]
  const limit = 10

  const { data, areAgenciesLoading, agenciesError, refreshAgencies } =
    useConnections(limit, currentPage * limit)

  const loadMoreCconnections = () => {
    if (data?.hasMore) {
      setPage(prevPage => [...prevPage, prevPage[prevPage.length - 1] + 1])
    }
  }

  const loadPreviousConnections = () => {
    setPage(prevPage => prevPage.slice(0, -1))
  }

  const totalPages = Math.ceil(data?.totalAgencies / limit)

  const [hidden, setHidden] = useState('hidden')

  if (areAgenciesLoading) {
    return(
      <SkeletonTheme inline={false}>
        <p className='px-12'>
          <Skeleton borderRadius={'18px'} height={'100px'} count={1} />
        </p>
        <p className='px-12'>
          <Skeleton borderRadius={'18px'} height={'100px'} count={1} />
        </p>
        <p className='px-12'>
          <Skeleton borderRadius={'18px'} height={'100px'} count={1} />
        </p>
      </SkeletonTheme>
    )
  }

  const filteredAgencies = data.connections.filter((agency: any) => {
    const agencyNameMatches = agency.user1.name
      .toLowerCase()
      .includes(inputSearchValue.toLowerCase())
    const tagFilterIsActive = !tagSelected ? false : true
    const tagSearchIsActive = inputSearchValue === '' ? false : true

    if (!tagSearchIsActive && !tagFilterIsActive) {
      return true
    } else if (tagFilterIsActive && tagSearchIsActive) {
      const tagsMatch = agency.tags.some(
        (tag: { name: string }) => tag.name === tagSelected,
      )
      return agencyNameMatches && tagsMatch
    } else if (tagFilterIsActive) {
      return agency.tags.some(
        (tag: { name: string }) => tag.name === tagSelected,
      )
    } else if (tagSearchIsActive) {
      return agencyNameMatches
    }
  })


  const sendInvite = async () => {
    try {
      const res = await fetch('/api/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: session,
          receiverId: agenciesSelected?.id,
        }),
      })

      if (res.status === 200) router.refresh()
    } catch (error: any) {}
  }

  const handleRemoveConnection = async (agencyId: string) => {
    try {
      const res = await fetch('/api/connections', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId1: agencyId,
          userId2: session,
        }),
      })

      if (res.status === 200)
        router.push('/dashboard/invitations'), router.refresh()
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex flex-col bg-white'>
        <div className='flex mx-12 gap-3 items-start justify-between overflow-x-auto mt-4'>
          <div className=' flex gap-3'>
            <div>
              <p className={`${ptMono.className} mb-2 text-sm`}>by Name</p>
              <Search
                inputSearchValue={inputSearchValue}
                setInputSearchValue={setInputSearchValue}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='my-modal-3'
              className={`bg-[#ECF7F8] flex bg-text-lg align-center items-center border-rose-100 px-9 py-3 text-back font-medium h-14 rounded-full cursor-pointer`}>
              connect with a new agency 🥥
            </label>
            <input type='checkbox' id='my-modal-3' className='modal-toggle' />
            <div className='modal '>
              <div className='modal-box max-w-[956px] relative flex overflow-hidden rounded-xl bg-white p-0'>
                <label
                  htmlFor='my-modal-3'
                  className='absolute z-10 right-4 top-2 cursor-pointer text-lg text-black'>
                  ✕
                </label>

                <div className='w-auto h-[580px] flex flex-col items-center bg-headerMenu'>
                  <div className='flex flex-col items-center mt-10 w-80 '>
                    <span className=' text-2xl'>🥥</span>
                    <h2 className='text-2xl font-bold'>Get connected</h2>
                  </div>
                  <div className='flex flex-col mt-10 gap-5 '>
                    <label
                      htmlFor=''
                      className='bg-white px-9 py-5 rounded-full'>
                      1. Find your agency
                    </label>
                    <label
                      htmlFor=''
                      className={`bg-white px-9 py-5 rounded-full ${SecondStep == true ? '' : 'bg-opacity-40'}`}>
                      2. Connect Instagram
                    </label>
                    <label
                      htmlFor=''
                      className={`bg-white px-9 py-5 rounded-full ${SecondStep == true ? '' : 'bg-opacity-40'}`}>
                      3. Connect Tiktok
                    </label>
                  </div>
                </div>

                <Swiper
                  pagination={{ type: 'custom' }}
                  slidesPerView={1}
                  modules={[Pagination]}
                  allowTouchMove={false}
                  className='h-full w-full'>
                  {/* 1 */}

                  <SwiperSlide style={{ borderRadius: '10px' }}>
                    <div className='relative flex flex-col px-20 pb-20 justify-between mt-[96px] h-[483px] text-black'>
                      <div className=''>
                        <span>{'Let´s find you a new agency '}</span>
                        <div className='mt-4'>
                          <div className='dropdown'>
                            <div
                              onFocus={() => setHidden('')}
                              onBlur={() => {
                                setTimeout(() => setHidden('hidden'), 100)
                              }}>
                              <Search
                                inputSearchValue={inputSearchValueModal}
                                setInputSearchValue={setInputSearchValueModal}
                              />
                            </div>
                            <div className={`mt-4 bg-white ${ptMono.className}`}>
                              <div className={`${hidden}`}>
                                <div className='gap-2 flex flex-col'>
                                  {
                                    agency
                                      .filter((agen: any) => agen.name.toLowerCase().includes(inputSearchValueModal.toLowerCase()))
                                      .slice(0, 3) 
                                      .map((agen: any, index: number) => (
                                        <button
                                          className='text-start px-5 py-2 hover:bg-[#F1EFEA] rounded-lg'
                                          key={index}
                                          onClick={() => {
                                            setInputSearchValueModal(agen.name)
                                            setAgenciesSelected(agen)
                                          }}>
                                          {agen.name}
                                        </button>
                                      ))
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <RegisterNextButton
                        className={`absolute bottom-10 left-96 w-1/5 rounded-full bg-[#F1EFEA] px-2 py-4 text-black  ${ptMono.className} `}
                        onClickCapture={() => {
                          setSecondStep(true)
                        }}>
                        next
                      </RegisterNextButton>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide style={{ borderRadius: '10px' }}>
                    <div className='flex flex-col px-20 pb-20 justify-between mt-[96px] h-[483px] text-black'>
                      <div>
                        <div>
                          <h2 className='font-bold text-lg mb-12'>
                            {`We're connecting you to`} {agenciesSelected?.name}
                          </h2>
                          <div>
                            {instagramConnection == null ? (
                              <a
                                href='/api/oauth/connect/facebook'
                                className='bg-[#859991] p-5 px-20 text-white rounded-lg '>
                                Connect to Instagram
                              </a>
                            ) : (
                              <label className='bg-[#859991] p-5 px-20 text-white rounded-lg'>
                                Already Connected
                              </label>
                            )}
                          </div>
                        </div>
                      </div>

                      <RegisterNextButton
                        onClickCapture={() => {
                          // handlePositionSlide()
                          sendInvite()
                        }}
                        className={`absolute bottom-10 left-96 w-1/5 rounded-full bg-[#F1EFEA] px-2 py-4 text-black  ${ptMono.className} `}>
                        next
                      </RegisterNextButton>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide style={{ borderRadius: '10px' }}>
                    <div className='flex flex-col px-20 pb-20 justify-between mt-[96px] h-[483px] text-black'>
                      <div>
                        <div>
                          <h2 className='font-bold text-lg'>
                            {`We're connecting you to`}
                          </h2>
                          <p>{agenciesSelected?.name}</p>
                          <div>
                          <div>
                            {instagramConnection == null ? (
                              <a
                                href='/api/oauth/connect/facebook'
                                className='bg-[#859991] p-5 px-20 text-white rounded-lg '>
                                Connect to Instagram
                              </a>
                            ) : (
                              <label className='bg-[#859991] p-5 px-20 text-white rounded-lg'>
                                Already Connected
                              </label>
                            )}
                          </div>
                          </div>
                        </div>
                      </div>

                      <RegisterNextButton
                        onClickCapture={() => {
                          // handlePositionSlide()
                          sendInvite()
                        }}
                        className={`w-1/5 self-center rounded-full bg-[#F1EFEA] px-2 py-4 text-black  ${ptMono.className} `}>
                        Send Invite!
                      </RegisterNextButton>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide style={{ borderRadius: '10px' }}>
                    <div className='flex flex-col px-20 pb-20 justify-between mt-[96px] h-[483px] text-black'>
                      <div>
                        <div>
                          <h2 className='font-bold text-lg'>
                            With that done, we will let {agenciesSelected?.name}
                            &rsquo;s know 🥂
                          </h2>
                          <p className='pt-4'>
                            From now on, you don&rsquo;t need to follow up about
                            posting or send stats. <br />
                            {agenciesSelected?.name}&rsquo;s will be able to see
                            automatically. Isn&rsquo;t that nice?
                          </p>
                        </div>
                      </div>

                      <label
                        htmlFor='my-modal-3'
                        className={`absolute bottom-10 left-96 w-1/5 rounded-full bg-[#F1EFEA] px-2 py-4 text-black text-center ${ptMono.className} `}>
                        Done
                      </label>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>

        <PaginationScroll
          pageLength={page.length}
          currentPage={currentPage}
          totalPages={totalPages}
          loadPrevious={loadPreviousConnections}
          loadMore={loadMoreCconnections}
        />

        <div className='mt-12 flex gap-4 md:px-12 flex-wrap'>
          {filteredAgencies.length > 0 ? (
            filteredAgencies.map((agency: any, index: any) => (
              <div
                key={index}
                className='h-80 min-w-[320px] mb-24 w-80 border-gray-100 relative '>
                <Image
                  priority
                  className={` object-cover`}
                  src={agency.image || imageCover}
                  alt={agency.user1.name}
                />
                <div className='h-auto border border-gray-200 px-5 py-4 pl-4 flex justify-between items-center'>
                  <p className={`text-lg font-medium text-gray-800`}>
                    {agency.user1.name}
                  </p>
                  <div className='dropdown-end dropdown cursor-pointer '>
                    <div className='flex justify-end outline-none '>
                      <svg
                        tabIndex={0}
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-6 w-6 outline-none'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                        />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className=' dropdown-content menu rounded-box  w-max border-2 border-gray-100 bg-white p-2'>
                      <button
                        onClick={() => {
                          handleRemoveConnection(agency.user1.id)
                        }}
                        className='text-back m-2 rounded-full border-2 bg-whiteBrown px-8 py-2 text-sm font-medium hover:border-orange-100'>
                        Remove Connection
                      </button>
                      <Link
                        href={'/dashboard/campaigns'}
                        className='text-back m-2 text-center rounded-full border-2 bg-whiteBrown px-8 py-2 text-sm font-medium hover:border-orange-100'>
                        View campaigns
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='min-h-[250px] min-w-[250px] opacity-40  '>
              <div className='border border-gray-200 w-[250px] h-[310px] gap-3 flex flex-col justify-center items-center p-12'>
                <p className={` text-center text-base ${ptMono.className}`}>
                  Associate with agenies now
                </p>
              </div>
              <div className=' h-auto border border-gray-200 bg-white px-2 py-4 pl-4'>
                <p
                  className={`text-lg font-medium text-gray-800 ${inter.className}`}>
                  - - -
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
