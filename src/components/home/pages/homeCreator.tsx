'use client'

import heroImage from 'public/assets/SandBox/Mobile/heroImage.png'
import FunctionalityCard from '../components/home/functionalityCard'
import cta_image from 'public/assets/register/cta_creator.jpg'
import Testimonial from '../components/home/testimonial'
import HomePostCard from '../components/home/postCard'
import Stats from '../components/home/stats'
import Try from '../components/home/Try'
import CTA from '../components/home/CTA'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'

import imageOne from 'public/assets/homeCreator/creator_principal_card1.jpg'
import imageTwo from 'public/assets/homeCreator/creator_principal_card2.jpg'
import imageThree from 'public/assets/homeCreator/creator_principal_card3.jpg'
import imageFour from 'public/assets/homeCreator/creator_principal_card4.jpg'
import imageFive from 'public/assets/homeCreator/creator_principal_card5.jpg'
import imageSix from 'public/assets/homeCreator/creator_principal_card6.jpg'
import imageSeven from 'public/assets/SandBox/headSection/ThridCardImage.jpg'
import imageEight from 'public/assets/SandBox/headSection/FirstCardImage.jpg'

import OneCard from 'public/assets/SandBox/Cards/liveTracking.png'
import OneCardMobile from 'public/assets/SandBox/Cards/liveTrackingMobile.png'
import TwoCard from 'public/assets/homeCreator/TopPerformingC.png'
import TwoCardMobile from 'public/assets/homeCreator/TopPerformingC.png'
import ThreeCard from 'public/assets/homeCreator/Tracking.png'
import ThreeCardMobile from 'public/assets/homeCreator/Tracking.png'
import FourCard from 'public/assets/SandBox/Cards/automaticTracking.png'
import FourCardMobile from 'public/assets/SandBox/Cards/automaticTrackingMobile.png'
import InfoCards from '../components/home/infoCards'
import SliderCardCreator from '../components/home/sliderCardCreator'
import EmailTrigger from '../components/home/emailTrigger'

const DataOne = {
  username: 'stmbind',
  followers: '50k',
  views: '128k',
  comments: '231',
  likes: '3k',
}
const DataTwo = {
  username: 'kali',
  followers: '127k',
  views: '8k',
  comments: '345',
  likes: '91k',
}
const DataThree = {
  username: 'john_12',
  followers: '63k',
  views: '1k',
  comments: '12',
  likes: '18k',
}
const DataFour = {
  username: 'iris',
  followers: '12k',
  views: '56k',
  comments: '39',
  likes: '22k',
}
const DataFive = {
  username: 'hector_tn',
  followers: '50k',
  views: '28k',
  comments: '674',
  likes: '26k',
}
const DataSix = {
  username: 'black',
  followers: '91k',
  views: '67k',
  comments: '869',
  likes: '67k',
}
const DataSeven = {
  username: 'joustintim',
  followers: '4k',
  views: '71',
  comments: '53',
  likes: '2k',
}
const DataEight = {
  username: 'devany',
  followers: '7k',
  views: '38',
  comments: '842',
  likes: '47k',
}

const cardData = [
  {
    size: '700px',
    bg: 'bg-secondBackground',
    imageCard: OneCard,
    imageCardMobile: OneCardMobile,
    subTitle: 'live post results tracking',
    title:
      'Track the live results of your best sponsored content',
    features: {
      1: 'Live post analytics in one place',
      2: 'A clear view of your campaigns + their results',
      3: 'Post stats automatically pulled',
    },
  },
]

const cardData1 = [
  {
    size: '700px',
    bg: 'bg-[#F2EDE7]',
    imageCard: TwoCard,
    imageCardMobile: TwoCardMobile,
    subTitle: 'know your best, show your best',
    title: 'Identify your top performing posts with detailed insights',
    features: {
      1: 'Display your best posts across platforms in a grid view',
      2: 'Filter down by results, brands, platform, + more',
      3: 'Identify top performing content',
    },
  },
]

const cardData2 = [
  {
    size: '550px',
    bg: 'bg-secondBackground',
    imageCard: ThreeCard,
    imageCardMobile: ThreeCardMobile,
    subTitle: 'know when your creators have posted',
    title: 'Don\'t waste time with links or screenshots. Track your content via hashtag.',
    features: {
      1: 'Codecoco can track when your creators post for you with hashtags',
      2: 'Codecoco automatically adds posts to your campaign',
      3: 'Get a running portfolio of your work',
    },
  },
]

const cardData3 = [
  {
    size: '700px',
    bg: 'bg-[#F2EDE7]',
    imageCard: FourCard,
    imageCardMobile: FourCardMobile,
    subTitle: 'share live campaigns in seconds',
    title: 'Share best content publicly or privately with your clients',
    features: {
      1: 'Share live post results in real time with clients',
      2: 'Create public and private links',
      3: 'Embed posts on your own site',
    },
  },
]

const cardData4 = [
  {
    size: '700px',
    bg: 'bg-secondBackground',
    imageCard: FourCard,
    imageCardMobile: FourCardMobile,
    subTitle: 'connect with your clients',
    title: 'Connect with agencies on Codecoco so they can track your sponsored posts',
    features: {
      1: 'Don\'t waste time sending screenshots or stats',
      2: 'Your clients can get live results from your automatically',
      3: 'Verify your work with top agencies',
    },
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className=' lg:-mb-[380px] w-full bg-white'>
        <div className='m-auto flex w-full lg:w-[980px] flex-col justify-center bg-white'>
          <div className='mb-16 text-center px-10 flex flex-col items-center gap-5'>
            <h1 className='text-2xl lg:text-4xl font-bold text-black'>
              Create a running, live portfolio of your best sponsored content
            </h1>
            <h3
              className={`${ptMono.className} text-sm lg:text-lg text-textBlack `}>
              Display your most impressive brand sponsored content and track
              live stats to show potential sponsors
            </h3>
            <EmailTrigger />
          </div>

          <div className='gap-5 hidden lg:flex '>
            <div className='flex flex-col gap-5'>
              <HomePostCard
                firstImage={imageOne}
                secondImage={imageTwo}
                firstData={DataOne}
                secondData={DataTwo}
                flex={'flex-col'}
                blur={''}
              />
            </div>
            <div className='flex flex-col gap-5'>
              <HomePostCard
                firstImage={imageThree}
                secondImage={imageFour}
                firstData={DataThree}
                secondData={DataFour}
                flex={'flex-col-reverse'}
                blur={''}
              />
            </div>
            <div className='flex flex-col gap-5'>
              <HomePostCard
                firstImage={imageFive}
                secondImage={imageSix}
                firstData={DataFive}
                secondData={DataSix}
                flex={'flex-col'}
                blur={''}
              />
            </div>
            <div className='flex flex-col gap-5'>
              <HomePostCard
                firstImage={imageSeven}
                secondImage={imageEight}
                firstData={DataSeven}
                secondData={DataEight}
                flex={'flex-col-reverse'}
                blur={''}
              />
            </div>
          </div>

          <div className='gap-5 flex  justify-center lg:hidden '>
            <Image
              priority
              className={` h-96 w-full rounded-b-2xl object-cover`}
              src={heroImage}
              alt='background'
              width={0}
              height={0}
              style={{ width: '370px', height: 'auto' }}
            />
          </div>
        </div>
      </section>

      <section className='relative z-10 w-full bg-white pb-24 lg:block '></section>

      <section className='relative z-10 w-full bg-white px-10 lg:bg-secondBackground lg:pb-24  lg:block'>
        <div className='m-auto flex lg:w-[1060px] flex-col justify-center   '>
          <div className='-mt-16 flex gap-4 lg:flex-row flex-col'>
            <InfoCards
              description={'Create a grid of your best sponsored posts'}
            />
            <InfoCards description={'View, filter, and analyze live results'} />
            <InfoCards
              description={'Share results publicly and privately with clients'}
            />
            <InfoCards
              description={
                'Verify your work with top agencies and brands'
              }
            />
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className='relative z-10  lg:bg-secondBackground lg:pb-24  lg:block'>
        <div className='m-auto flex lg:w-[1290px] flex-col justify-center pt-[69px] '>
          {cardData.map((card, index) => (
            <FunctionalityCard
              key={index}
              card={card}
              flex={index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}
              justify={index % 2 === 0 ? 'justify-end' : ''}
            />
          ))}
        </div>
      </section>

      <section className='relative z-10  lg:bg-[#F2EDE7] lg:pb-24  lg:block'>
        <div className='m-auto flex lg:w-[1290px] flex-col justify-center lg:pt-[69px] '>
          {cardData1.map((card, index) => (
            <FunctionalityCard
              key={index}
              card={card}
              flex={index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row '}
              justify={index % 2 !== 0 ? 'justify-end' : ''}
            />
          ))}
        </div>
      </section>

      <section className='relative z-10  lg:bg-secondBackground lg:pb-24  lg:block'>
        <div className='m-auto flex lg:w-[1290px] flex-col justify-center lg:pt-[69px] '>
          {cardData2.map((card, index) => (
            <FunctionalityCard
              key={index}
              card={card}
              flex={index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}
              justify={index % 2 === 0 ? 'justify-end' : ''}
            />
          ))}
        </div>
      </section>

      <section className='relative z-10  lg:bg-[#F2EDE7] lg:pb-24  lg:block'>
        <div className='m-auto flex lg:w-[1290px] flex-col justify-center lg:pt-[69px] '>
          {cardData3.map((card, index) => (
            <FunctionalityCard
              key={index}
              card={card}
              flex={index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}
              justify={index % 2 !== 0 ? 'justify-end' : ''}
            />
          ))}
        </div>
      </section>

      <section className='relative z-10  lg:bg-secondBackground lg:pb-24  lg:block'>
        <div className='m-auto flex lg:w-[1290px] flex-col justify-center lg:pt-[69px] '>
          {cardData4.map((card, index) => (
            <FunctionalityCard
              key={index}
              card={card}
              flex={index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}
              justify={index % 2 === 0 ? 'justify-end' : ''}
            />
          ))}
        </div>
      </section>

      {/* Slider Cards */}
      <section>
        <div className='m-auto flex lg:w-[1190px] flex-col justify-center lg:pt-20'>
          <h2 className='mb-9 mt-9 text-2xl font-bold text-black text-center lg:text-left px-20 lg:px-0'>
            <span className='hidden lg:block lg:text-[28px]'>
              How to create a Codecoco Portfolio 🥥
            </span>
            <span className=' lg:hidden '>
              Track results with 4 simples steps
            </span>
          </h2>
        </div>
        <SliderCardCreator />
      </section>

      {/* try */}
      <section className='w-full'>
        <CTA cta_image={cta_image} />
      </section>
    </>
  )
}
