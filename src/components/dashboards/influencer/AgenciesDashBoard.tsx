'use client'

import imageCover from 'public/assets/register/TopPost.jpg'
import SearchByTag from '../../inputs/searchByTag'
import TitlePage from '../../labels/titlePage'
import { inter, ptMono } from '@/app/fonts'
import Search from '../../inputs/search'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { RegisterNextButton } from '@/app/onboarding/agency/registerNextButton'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Session } from 'inspector'
import { any } from 'zod'
import { useRouter } from 'next/navigation'
import { useAgenciesDashboard } from './store/AgencyDashBoardStore'

// import './swiper.css'
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
    SecondStep,
    setSecondStep,
  } = useAgenciesDashboard()

  const filteredAgenciesSearch = agency?.filter((creator: any) => {
    const AgenciesNameMatches = creator.name
      .toLowerCase()
      .includes(inputSearchValue.toLowerCase())
    return AgenciesNameMatches
  })

  const filteredAgencies = agenciesConnections.filter((agency: any) => {
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

  const router = useRouter()

  const sendInvite = async () => {
    try {
      const res = await fetch('/api/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agencyId: agenciesSelected?.id,
          creatorId: session,
        }),
      })

      if (res.status === 200) router.refresh()
    } catch (error: any) {}
  }

  const handleRemoveConnection = async (agencyId: string) => {
    try {
      const res = await fetch('http://localhost:3000/api/connections', {
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
      console.log('hi')
    }
  }

  return (
    <>
      <div className='flex flex-col bg-white'>
        <div className='flex px-12 gap-3 items-start justify-between overflow-x-auto mt-8'>
          <div className=' flex gap-3'>
            <div>
              <p className={`${ptMono.className} mb-2 text-sm`}>by Name</p>
              <Search
                inputSearchValue={inputSearchValue}
                setInputSearchValue={setInputSearchValue}
              />
            </div>
            <div>
              <p className={`${ptMono.className} mb-2 text-sm`}>tags</p>
              <SearchByTag
                setSearchTags={setSearchTags}
                tagSelected={tagSelected}
                searchTags={agenciesConnections}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='my-modal-3'
              className='bg-[#E9F7F0] flex bg-text-lg align-center items-center border-rose-100 mx-2 px-9 py-3 text-back font-medium h-14 rounded-full cursor-pointer'>
              Connect with agencies
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
                      className={`bg-white px-9 py-5 rounded-full ${
                        SecondStep == true ? '' : 'bg-opacity-40'
                      }`}>
                      2. Connect Instagram
                    </label>
                    {/* <label
                      htmlFor=''
                      className='bg-white px-9 py-5 rounded-full bg-opacity-40 '>
                      3. Connect TikTok
                    </label> */}
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
                    <div className='flex flex-col px-20 pb-20 justify-between mt-[96px] h-[483px] text-black'>
                      <div className=''>
                        <span>{`Let's find you a new agency`}</span>
                        <div className='mt-4'>
                          <div className='dropdown'>
                            <div className='flex items-center gap-5'>
                              <Search
                                inputSearchValue={inputSearchValue}
                                setInputSearchValue={setInputSearchValue}
                              />
                              <p className='bg-[#F1EFEA] rounded-full p-3 px-5'>
                                {agenciesSelected?.name}
                              </p>
                            </div>

                            <div
                              className={` mt-4   bg-white ${ptMono.className}`}>
                              <div className=''>
                                <div className='gap-2'>
                                  {/* <p>{agenciesSelected?.id}</p> */}
                                  {filteredAgenciesSearch
                                    .slice(0, 2)
                                    .map((agency: any, index: any) => (
                                      <button
                                        className='mr-10 hover:bg-[#F1EFEA] rounded-lg p-3'
                                        key={index}
                                        onClick={() => {
                                          setAgenciesSelected(agency)
                                        }}>
                                        <div className='flex flex-col gap-1 justify-start items-start'>
                                          <p className='text-base font-semibold'>
                                            {agency.name}
                                          </p>
                                          <p className='text-sm font-light'>
                                            {agency.role}
                                          </p>
                                        </div>
                                      </button>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <RegisterNextButton
                        onClickCapture={() => {
                          setSecondStep(true)
                        }}
                        className={`w-1/5 self-end  rounded-full bg-[#F1EFEA] px-2 py-4 text-black  ${ptMono.className} `}>
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
                        className={`w-1/5 self-end rounded-full bg-[#F1EFEA] px-2 py-4 text-black  ${ptMono.className} `}>
                        next
                      </RegisterNextButton>
                    </div>
                  </SwiperSlide>

                  {/* <SwiperSlide style={{ borderRadius: '10px' }}>
                    <div className='flex flex-col px-20 pb-20 justify-between mt-[96px] h-[483px] text-black'>
                      <div>
                        <div>
                          <h2 className='font-bold text-lg'>
                            {`We're connecting you to`}
                          </h2>
                          <p>{agenciesSelected?.name}</p>
                          <div>
                            <button className='bg-[#859991] p-5 px-20 text-white rounded-lg '>
                              Connect to Tiktok
                            </button>
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
                  </SwiperSlide> */}

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
                        className={`w-1/5 self-end rounded-full bg-[#F1EFEA] px-2 py-4 text-black text-center ${ptMono.className} `}>
                        Done
                      </label>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-12 flex gap-4 md:px-12 flex-wrap'>
          {agenciesConnections.length > 0 ? (
            agenciesConnections.map((agency: any, index: any) => (
              <div
                key={index}
                className='h-80 min-w-[320px] mb-24 w-80 border-gray-100 relative '>
                <Image
                  priority
                  className={` object-cover`}
                  src={agency.image || imageCover}
                  alt={agency.user1.name}
                />
                <div className='h-auto border border-gray-200 px-5 py-4 pl-4 flex justify-between items-baseline'>
                  <p className={`text-lg font-medium text-gray-800`}>
                    {agency.user1.name}
                  </p>
                  <label
                    htmlFor='my-modal-4'
                    className='text-sm  text-gray-400 hover:text-black'>
                    remove connection
                  </label>
                  <input
                    type='checkbox'
                    id='my-modal-4'
                    className='  modal-toggle'
                  />
                  <div className='modal '>
                    <div className='modal-box relative border max-w-[456px] flex flex-col justify-start overflow-hidden rounded-xl bg-white  p-0'>
                      <label
                        htmlFor='my-modal-4'
                        className='absolute right-4 top-2 cursor-pointer text-lg text-black'>
                        ✕
                      </label>

                      <div className='px-10 py-8'>
                        <h3 className='text-xl font-bold mb-2'>Important</h3>
                        <p className='mb-4'>
                          Make sure you want to remove the connection with{' '}
                          {agency.user1.name}. This will cause{' '}
                          {agency.user1.name} will no longer be able to access
                          your new data, but will still be able to see
                          information you already submitted before you deleted
                          the connection. Additionally, you will no longer be
                          able to see the campaigns where you are associated with this agency.
                        </p>
                        <button
                          onClick={() => {
                            handleRemoveConnection(agency.user1.id)
                          }}
                          className='bg-[#ffdede] flex  hover:bg-[#ffcbcb] text-sm align-center items-center  px-4  py-3  rounded-full'>
                          Remove Connection
                        </button>
                      </div>
                    </div>
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
