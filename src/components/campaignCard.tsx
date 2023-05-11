import Image from 'next/image'
import { Inter } from 'next/font/google'
import imageCover from 'public/assets/register/register-bg.jpg'

const inter = Inter({ weight: '400', subsets: ['latin'] })

const card = [
  {
    ImageSrc: imageCover,
    label: 'Campaign Name',
  },
  {
    ImageSrc: imageCover,
    label: 'Campaign Name',
  },
  {
    ImageSrc: imageCover,
    label: 'Campaign Name',
  },
  {
    ImageSrc: imageCover,
    label: 'Campaign Name',
  },
]

const cards = card.map((card, index) => (
  <div key={index} className='h-90 m-auto w-64 overflow-hidden'>
    <Image
      priority
      className={`h-64 object-cover`}
      src={card.ImageSrc}
      alt='background'
    />
    <div className='relative w-full bg-white p-4'>
      <p className={`text-sm font-medium text-gray-800 ${inter.className}`}>
        {card.label}
      </p>
    </div>
  </div>
))

export default function campaignCard() {
  return <div className='flex flex-wrap gap-x-4 gap-y-12'>{cards}</div>
}
