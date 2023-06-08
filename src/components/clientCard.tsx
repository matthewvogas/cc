import Image from 'next/image'
import { inter } from '@/app/fonts'
import imageCover from 'public/assets/register/TopPost.jpg'
import Link from 'next/link'
import { Client } from '@prisma/client'

// Fonts

// Arrays
const card = [
  {
    ImageSrc: imageCover,
    name: "L'Oréal",
  },
  {
    ImageSrc: imageCover,
    name: 'Rosalia',
  },
  {
    ImageSrc: imageCover,
    name: 'Example',
  },
  {
    ImageSrc: imageCover,
    name: 'Example',
  },
]

export default function ClientCard({ clients }: { clients: Client[] }) {
  // Show Arrays
  const data = clients|| card

  const cards = data.map((card: Client, index: any) => (
    <Link
      href={`/clients/${card.id || 1}`}
      key={index}
      className='h-80 w-80 border-gray-100 '>
      <Image
        priority
        className={`h-64 object-cover`}
        src={imageCover}
        alt={card.name}
      />
      <div className=' bg-white px-2 py-4'>
        <p className={`text-sm font-medium text-gray-800 ${inter.className}`}>
          {card.name}
        </p>
      </div>
    </Link>
  ))

  return <div className=' flex  flex-wrap gap-4 self-start'>{cards}</div>
}
