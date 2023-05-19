import Image from 'next/image'
import { Inter } from 'next/font/google'
import imageCover from 'public/assets/register/campaignCover.jpg'
import Link from 'next/link'

// Fonts
const inter = Inter({ weight: '400', subsets: ['latin'] })

// Arrays
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

export default function CampaignCard({ campaigns }: any) {
  // Show Arrays
  const cards = campaigns.map((card:any, index:any) => (
    <Link
      href={`/campaigns/${card.id || 1}`}
      key={index}
      className='h-80 w-80 border-gray-100 '>
      <Image
        priority
        className={`h-64 object-cover`}
        src={card.image || imageCover}
        alt={card.name}
      />
      <div className=' bg-white px-2 py-4'>
        <p className={`text-sm font-medium text-gray-800 ${inter.className}`}>
          {card.name}
        </p>
      </div>
    </Link>
  ))

  return <div className=' flex  flex-wrap gap-4 md:px-12'>{cards}</div>
}
