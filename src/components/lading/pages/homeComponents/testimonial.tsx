import Image from 'next/image'
import Rosalind from 'public/assets/register/Rosalind-white.png'
import testimonial from 'public/assets/register/testimonial.jpg'
import { ptMono } from '@/app/fonts'
import Link from 'next/link'

export default function Testimonial() {
  return (
    <>
      <div className='flex '>
        <div className='w-3/6'>
          <Image src={testimonial} className='w-full  object-cover' alt={''} />
          <div className='absolute ml-24 -mt-44 '>
            <Image src={Rosalind} className='mb-5' alt={''} />
            <div className='flex gap-4'>
              <Link
                className={`text-white text-sm  ${ptMono.className}`}
                href={'https://withrosalind.com'}>
                withrosalind.com
              </Link>
              <Link
                className={`text-white text-sm  ${ptMono.className}`}
                href={'https://www.instagram.com/withrosalind'}>
                @withrosalind
              </Link>
            </div>
          </div>
        </div>
        <div className='flex w-3/6 px-20 flex-col gap-16 bg-beigeSelected pr-20 pt-14 '>
          <div>
            <h3 className='font-semibold text-2xl mb-4'>
              “Codecoco saves my team{' '}
              <span className='font-extrabold'>entire days of work</span> and
              gives my clients a clear view of the success of our campaigns.”
            </h3>
            <p className='text-base'>Rosalind Weinberg </p>
            <p className='text-base'>
              Influencer marketing agency CEO + influencer
            </p>
          </div>
          <div className='flex flex-col gap-11'>
            <div>
              <h4 className='font-semibold text-4xl'>30+</h4>
              <p className='font-medium text-xl'>hours saved per campaign</p>
            </div>
            <div>
              <h4 className='font-semibold text-4xl'>10x</h4>
              <p className='font-medium text-xl'>
                return of investment (ROI) per month
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
