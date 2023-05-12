import Image from 'next/image'
import { Inter } from 'next/font/google'
import imageCover from 'public/assets/register/campaignCover.jpg'
import Link from 'next/link'

const inter = Inter({ weight: '400', subsets: ['latin'] })

const card = [
  {
    ImageSrc: imageCover,
    label: "L'Oréal Campaign",
  },
  {
    ImageSrc: imageCover,
    label: 'Rosalia Campaign',
  },
  {
    ImageSrc: imageCover,
    label: 'Example Campaign',
  },
  {
    ImageSrc: imageCover,
    label: 'Example Campaign',
  },
  {
    ImageSrc: imageCover,
    label: 'Example Campaign',
  },
  {
    ImageSrc: imageCover,
    label: 'Example Campaign',
  },
  {
    ImageSrc: imageCover,
    label: 'Example Campaign',
  },
]

const cards = card.map((card, index) => (
  <Link href="/campaigns/1" key={index} className='h-80 w-80 border-gray-100 '>
    <Image
      priority
      className={`h-64 object-cover`}
      src={card.ImageSrc}
      alt='background'
    />
    <div className=' bg-white py-4 px-2'>
      <p className={`text-sm font-medium text-gray-800 ${inter.className}`}>
        {card.label}
      </p>
    </div>
  </Link>
))

export default function CampaignCard() {
  return <div className=' flex  flex-wrap md:px-12 gap-4'>{cards}</div>
}
