import { ptMono } from '@/app/fonts'

// components
import CTA from './homeComponents/CTA'
import Try from './homeComponents/Try'
import Stats from './homeComponents/stats'
import Share from './homeComponents/Share'
import HomePostCard from './homeComponents/postCard'
import FunctionalityCard from './homeComponents/functionalityCard'
import Testimonial from './homeComponents/testimonial'
import CardsText from './homeComponents/functionalityCardText'

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
import OneCard from 'public/assets/SandBox/Cards/CreateCampaign.svg'
import TwoCard from 'public/assets/SandBox/Cards/AddPostsToTrack.svg'
import ThreeCard from 'public/assets/SandBox/Cards/Populate.svg'
import FourCard from 'public/assets/SandBox/Cards/FilterAndExplore.svg'

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
    size: '550px',
    imageCard: OneCard,
  },
  {
    size: '350px',
    imageCard: TwoCard,
  },
  {
    size: '368px',
    imageCard: ThreeCard,
  },
  {
    size: '500px',
    imageCard: FourCard,
  },
]
const cardTextData = [
  {
    title: '1 Create a campaign',
    text: 'Create a campaign. Organize your campaigns by client or by tags.',
  },
  {
    title: '2 Add posts to track',
    text: 'Paste links from social media or upload in bulk via file.',
  },
  {
    title: '3 Codecoco populates your live campaign results automatically',
    text: 'Posts will populate automatically and data will be updated dynamically. You can filter your view of the campaign by creator, platform, posting date, etc.',
  },
  {
    title: '4 Filter and explore live results',
    text: 'Codecoco helps you and your clients identify top performing content from your creators and put it to use.',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className='-mb-[380px] w-full bg-white'>
        <div className='m-auto flex w-[920px] flex-col justify-center bg-white'>
          <div className='mb-16 flex flex-col items-center gap-5'>
            <h1 className='text-4xl font-bold text-black'>
              Real-Time Campaign Insights Made Easy
            </h1>
            <h3 className={`${ptMono.className} text-lg text-textBlack `}>
              The solution for tracking and analyzing your <br /> campaign
              results across multiple platforms.
            </h3>
          </div>

          <div className=' flex gap-5 '>
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
        </div>
      </section>

      {/* Steps */}
      <section className='relative z-10 w-full bg-secondBackground pb-24'>
        <div className='m-auto flex w-[1060px] flex-col justify-center pt-24 '>
          <div className='mb-16 flex flex-col items-center gap-5'>
            <h3 className={`text-4xl font-bold text-black`}>
              Track results with 4 simples steps
            </h3>
          </div>
          <div className='flex h-full '>
            <div className='w-full'>
              <div className='flex flex-col gap-5'>
                <FunctionalityCard cards={cardData} />
              </div>
            </div>

            <div className='ml-9 flex w-full'>
              <CardsText cards={cardTextData} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}

      <section className='w-full'>
        <Stats />
      </section>

      {/* Share */}

      <section className='w-full'>
        <div className='m-auto flex h-[746px] w-[920px] py-28'>
          <Share />
        </div>
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
