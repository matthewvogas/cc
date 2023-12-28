import imageCover from 'public/assets/register/campaignCover.jpg'
import AddPortfolio from '@/components/modals/agency/addPortofolio'
import PerformingContent from './performingContent'
import Stats from '@/components/stats/agency/stats'
import React, { useMemo, useState } from 'react'
import CardPortfolio from './cardPortfolio'
import { FiCoffee } from 'react-icons/fi'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import Link from 'next/link'
import useConnections from '@/hooks/useConnections'

type Props = {
  clients: any
  campaigns: any
  instagramPages: any
}
export default function CampaignsAgency({
  clients,
  campaigns,
  instagramPages,
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

  // new design, "fix bugs" for sophia
  const [filterPosts, setFilterPosts] = React.useState('hidden')

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

  const filteredCards = data?.connections[0]?.user1.campaigns.flatMap(
    (card: any) => {
      const filteredPosts = card.posts.filter((post: any) =>
        instagramPages.some(
          (page: any) => post.creator.username === page.username,
        ),
      )

      if (filteredPosts.length > 0) {
        return [{ ...card, posts: filteredPosts }]
      } else {
        return []
      }
    },
  )

  return (
    <div>
      <section>
        <div className='flex justify-between mb-8'>
          <div className='w-full flex justify-between items-center overflow-x-auto gap-4 overflow-y-hidden mt-4 '>
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
                clientsFallback={clients}
                text={'create a portfolio'}
                icon={undefined}
              />
            </div>
          </div>
        </div>

        {/* // cambiar aqui */}

        <div className='flex flex-col bg-white pt-12'>
          <div className='flex overflow-scroll overflow-y-hidden gap-4 md:px-12'>
            {filteredCards?.length > 0 ? (
              filteredCards.map((card: any, index: any) => (
                <Link
                  href={`/dashboard/campaigns/${card.id}`}
                  key={index}
                  className={`inline-block bg-beigeTransparent border min-w-[250px] `}>
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
                  <div
                    className={`flex justify-between items-center gap-2 px-6 py-[14px] ${ptMono.className}`}>
                    <h4 className='flex w-full rounded-full bg-white px-4 py-3 text-base'>
                      {card?._count?.posts || 0} {`posts`}
                    </h4>
                    <div className='max-w-[50px]'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='h-6 w-6'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div
                className={`bg-transparent border min-w-[250px] opacity-40 ${ptMono.className}`}>
                <div className='w-[250px] h-[310px] gap-3 flex flex-col justify-center items-center p-12'>
                  <FiCoffee style={{ width: '24px' }} />
                  <p className=' text-center text-base'>{`No Campaigns in sight! Don't worry, they're just shy. Try a different search term or connect with a agency`}</p>
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
