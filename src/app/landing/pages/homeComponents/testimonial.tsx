import Image from 'next/image'
import Rosalind from 'public/assets/register/Rosalind-white.svg'
import testimonial from 'public/assets/register/testimonial.jpg'
import { ptMono } from '@/app/fonts'

export default function Testimonial() {
  return (
    <>
      <div className='flex '>
        <div className='flex w-3/6  flex-col items-end bg-beigeSelected pr-20 pt-14 '>
          <h5 className='text-2xl font-bold'>A word from Codecoco lovers 🥥</h5>

          <div className=' relative left-60 mt-7 rounded-2xl bg-white px-16 py-12 shadow-[1px_2px_10px_0px_#F9EEE0]  '>
            <Image
              src={Rosalind}
              className=' mb-8 w-[200px] object-cover'
              alt={''}
            />
            <p className={`mb-5 ${ptMono.className}`}>
              “As the owner of a marketing agency, I have always searched for an
              effective way to visualize and analyze the results of our social
              media campaigns. And I finally found the perfect solution with
              Codecoco, has completely changed the way we manage our campaigns!”
            </p>
            <p className='mb-7 font-bold'>
              Rosalind Weinberg, agency owner + creator @withrosalind
            </p>
            {/* <button
              className={`rounded-full border border-black px-6 py-3 text-sm hover:bg-black hover:text-white ${ptMono.className}`}>
              see codecoco at work for Rosalind
            </button> */}
          </div>
        </div>
        <div className='w-3/6'>
          <Image src={testimonial} className=' w-full  object-cover' alt={''} />
        </div>
      </div>
    </>
  )
}
