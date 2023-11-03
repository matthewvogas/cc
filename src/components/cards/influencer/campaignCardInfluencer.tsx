'use client'

import img from '/public/assets/creatorRegister/exampleImage.jpg'
import imageCover from 'public/assets/register/campaignCover.jpg'
import ActionalTitle from '@/components/labels/actionalTitle'
import useCampaigns from '@/hooks/useCampaigns'
import { FiCoffee } from 'react-icons/fi'
import { Campaign } from '@prisma/client'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
  user: any
  campaignsFallback: any
  clientsFallback: any
}

export default function CampaignCardIfluencer({
  campaignsFallback,
  clientsFallback,
  user,
}: Props) {
  const { areCampaignsLoading, campaigns, campaignsError, refreshCampaigns } =
    useCampaigns(campaignsFallback)
  const postData = campaignsFallback[0]?.user1?.campaigns
  const [profileImage, setProfileImage] = useState('')

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch('/api/user/images/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error('Error al cargar la imagen del perfil')
        }
        const data = await response.json()
        console.log(data.image)
        setProfileImage(data.image)
      } catch (error) {
        console.error('Error al cargar la imagen del perfil:', error)
      }
    }

    fetchProfileImage()
  }, [])

  return (
    <>
      <ActionalTitle
        title={'Your campaigns'}
        frome={'campaignsInfluencer'}
        campaigns={campaignsFallback}
        clients={clientsFallback}
        userPositionId={0}
        stats={undefined}
      />

      <div className='bg-white flex overflow-x-auto gap-4 md:px-12'>
        {postData?.length > 0 ? (
          postData?.map((card: any, index: any) => {
            return (
              <Link
                href={`/dashboard/campaigns/${card.id}`}
                key={index}
                className={`bg-beigeTransparent border min-w-[250px]`}>
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
                    {/* <h5 className='truncate font-medium text-base'>
                      {card.name}
                    </h5> */}
                    <div className='flex justify-center items-center flex-row'>
                      <div className='flex  justify-center mask mask-circle mr-8 h-50 w-50'>
                        <Image
                          priority
                          className={`h-12 w-12`}
                          width={150}
                          src={img}
                          alt='background'
                          height={150}
                        />
                      </div>
                      <div className='-ml-5'>
                        <span>{card.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className='max-w-[50px]'></div>
                </div>
                <hr className='h-px bg-gray-200'></hr>
                <div className={`flex px-6 py-[14px] ${ptMono.className}`}>
                  <div className='flex justify-center items-center space-x-20'>
                    {/* <h4 className=' self-baseline rounded-full bg-white px-4 py-3 text-base'>
                      {card?._count?.posts || 0} {`posts`}
                    </h4> */}

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='h-5 w-5'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })
        ) : (
          <div
            className={`bg-transparent border min-w-[250px] opacity-40 ${ptMono.className}`}>
            <div className='w-[250px] h-[310px] gap-3 flex flex-col justify-center items-center p-12'>
              <FiCoffee style={{ width: '24px' }} />
              <p className=' text-center text-base'>
                grab a cup of coffee and start creating a campaign
              </p>
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
    </>
  )
}
