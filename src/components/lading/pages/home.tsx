import { ptMono } from '@/app/fonts'
import Image from 'next/image'
// components
import CTA from './homeComponents/CTA'
import Try from './homeComponents/Try'
import Stats from './homeComponents/stats'
import Share from './homeComponents/Share'
import HomePostCard from './homeComponents/postCard'
import FunctionalityCard from './homeComponents/functionalityCard'
import Testimonial from './homeComponents/testimonial'
import CardsText from './homeComponents/functionalityCardText'

//Mobile
import heroImage from 'public/assets/SandBox/Mobile/heroImage.png'

// images section 1
import imageOne from 'public/assets/SandBox/headSection/FirstCardImage.jpg'
import imageTwo from 'public/assets/SandBox/headSection/SecondCardImage.jpg'
import imageThree from 'public/assets/SandBox/headSection/ThridCardImage.jpg'
import imageFour from 'public/assets/SandBox/headSection/FourCardImage.jpg'
import imageFive from 'public/assets/SandBox/headSection/FiveCardImage.jpg'
import imageSix from 'public/assets/SandBox/headSection/SixCardImage.jpg'
import imageSeven from 'public/assets/SandBox/headSection/SevenCardImage.jpg'
import imageEight from 'public/assets/SandBox/headSection/EightCardImage.jpg'

// cards section 3
import OneCard from 'public/assets/SandBox/Cards/liveTracking.svg'
import TwoCard from 'public/assets/SandBox/Cards/FilterAndExplore.svg'
import ThreeCard from 'public/assets/SandBox/Cards/automaticTracking.svg'
import FourCard from 'public/assets/SandBox/Cards/shareCampaigns.svg'
import InfoCards from './homeComponents/infoCards'
import SliderCard from './homeComponents/sliderCard'

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
    imageCard: OneCard,
    subTitle: 'live campaign tracking',
    title:
      'Create campaigns to organize and track post analytics across platforms',
    features: {
      1: 'Live post analytics in one place',
      2: 'A clear view of your campaigns + their results',
      3: 'Post stats automatically pulled',
    },
  },
  {
    size: '100%',
    imageCard: TwoCard,
    subTitle: 'live campaign tracking',
    title:
      'Create campaigns to organize and track post analytics across platforms',
    features: {
      1: 'Live post analytics in one place',
      2: 'A clear view of your campaigns + their results',
      3: 'Post stats automatically pulled',
    },
  },
  {
    size: '550px',
    imageCard: ThreeCard,
    subTitle: 'live campaign tracking',
    title:
      'Create campaigns to organize and track post analytics across platforms',
    features: {
      1: 'Live post analytics in one place',
      2: 'A clear view of your campaigns + their results',
      3: 'Post stats automatically pulled',
    },
  },
  {
    size: '100%',
    imageCard: FourCard,
    subTitle: 'live campaign tracking',
    title:
      'Create campaigns to organize and track post analytics across platforms',
    features: {
      1: 'Live post analytics in one place',
      2: 'A clear view of your campaigns + their results',
      3: 'Post stats automatically pulled',
    },
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className=' lg:-mb-[380px] w-full bg-white'>
        <div className='m-auto flex w-full lg:w-[920px] flex-col justify-center bg-white'>
          <div className='mb-16 text-center px-10 lg:px-[20%] flex flex-col items-center gap-5'>
            <h1 className='text-2xl lg:text-4xl font-bold text-black'>
              Real-Time Campaign Insights Made Easy
            </h1>
            <h3
              className={`${ptMono.className} text-sm lg:text-lg text-textBlack `}>
              The solution for tracking and analyzing your campaign results
              across multiple platforms.
            </h3>
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
              unoptimized
            />
          </div>
        </div>
      </section>

      <section className='relative z-10 w-full bg-white pb-24  hidden lg:block '></section>

      <section className='relative z-10 w-full bg-secondBackground pb-24 hidden lg:block'>
        <div className='m-auto flex lg:w-[1060px] flex-col justify-center   '>
          <div className='-mt-16 flex gap-4'>
            <InfoCards
              description={'Create campaigns to track posts across platforms'}
            />
            <InfoCards description={'View, filter, and analyze live results'} />
            <InfoCards
              description={'Automated tracking of when your creators post'}
            />
            <InfoCards
              description={
                'Share campaigns publicly and privately with clients'
              }
            />
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className='relative z-10 bg-secondBackground pb-24 hidden lg:block'>
        <div className='m-auto flex lg:w-[1290px] flex-col justify-center  '>
          {cardData.map((card, index) => (
            <FunctionalityCard
              key={index}
              card={card}
              flex={index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}
              justify={index % 2 === 0 ? 'justify-end' : ''}
            />
          ))}
        </div>
      </section>

      {/* Slider Cards */}
      <section>
        <div className='m-auto flex lg:w-[1290px] flex-col justify-center lg:pt-20'>
          <h2 className='mb-9 text-2xl font-bold text-black text-center lg:text-left px-20 lg:px-0'>
            <span className='hidden lg:block'>
              How to create a Codecoco campaign 🥥
            </span>
            <span className=' lg:hidden '>
              Track results with 4 simples steps
            </span>
          </h2>
        </div>
        <SliderCard />
      </section>

      {/* Stats */}
      <section className='w-full'>
        <Stats />
      </section>

      {/* Stats */}

      <section className='w-full'>{/* <Testimonial /> */}</section>

      {/* try */}
      <section className='w-full'>
        <Try />
      </section>

      {/* try */}
      <section className='w-full'>
        <CTA />
      </section>
    </>
  )
}
