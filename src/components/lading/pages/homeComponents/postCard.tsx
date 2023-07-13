import Image from 'next/image'
import imageCover from 'public/assets/register/creatorImg.jpg'
import { ptMono } from '@/app/fonts'

// user: '',
// image: '',
// followers: '',
// views: '',
// comments: '',
// likes:'',

export default function HomePostCard(props: {
  firstImage: any
  secondImage: any
  firstData: any
  secondData: any
  flex: String
  blur: String
}) {
  return (
    <>
      <div className={`flex gap-4 ${props.flex} ${props.blur}`}>
        <div
          className={`w-56  max-w-sm overflow-hidden rounded-2xl border-2 border-borderCards bg-cardBackground shadow-[1px_2px_10px_0px_#F9EEE0] ${ptMono.className}`}>
          <Image
            priority
            className={` h-96 w-full rounded-b-2xl object-cover`}
            src={props.firstImage}
            alt='background'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: '100%', height: 'auto' }}
            unoptimized
          />
          <div className='px-4 pt-4'>
            <h4 className=' mb-2 rounded-xl bg-cardRose py-2 pl-5 text-xs text-black'>
              @{props.firstData?.username}
            </h4>
            <span className='mb-3 ml-4 flex h-6 w-full items-center gap-1 rounded text-center text-xs text-gray-500 '>
              <svg width='12' height='12' viewBox='0 0 8 8' aria-hidden='true'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.32861 3.47677C4.20491 3.47677 4.91587 2.76581 4.91587 1.88951C4.91587 1.01321 4.20491 0.302246 3.32861 0.302246C2.45231 0.302246 1.74134 1.01321 1.74134 1.88951C1.74134 2.76581 2.45231 3.47677 3.32861 3.47677ZM4.73951 3.8295H4.13216C3.88746 3.94193 3.6152 4.00586 3.32861 4.00586C3.04202 4.00586 2.77086 3.94193 2.52506 3.8295H1.91771C1.1384 3.8295 0.506805 4.4611 0.506805 5.2404V5.41676C0.506805 5.70886 0.743793 5.94585 1.03589 5.94585H5.62132C5.91342 5.94585 6.15041 5.70886 6.15041 5.41676V5.2404C6.15041 4.4611 5.51881 3.8295 4.73951 3.8295Z'
                />
              </svg>
              {props.firstData?.followers} followers
            </span>
            <div className='flex-grow border-t border-gray-200 pb-2'></div>
          </div>
          <div className='w-full px-6 pb-2 '>
            <span className=' text-xs font-normal text-gray-700'>
              Views: {props.firstData?.views} Comments:{' '}
              {props.firstData?.comments} Likes: {props.firstData?.likes}
            </span>
            <div className='flex justify-end align-middle'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='gray'
                className='h-6 w-6'>
                <path
                  fillRule='evenodd'
                  d='M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>
        </div>

        <div
          className={`w-56  max-w-sm overflow-hidden rounded-2xl border-2 border-borderCards bg-cardBackground shadow-[1px_2px_10px_0px_#F9EEE0] ${ptMono.className}`}>
          <Image
            priority
            className={` h-64 w-full rounded-b-2xl object-cover`}
            src={props.secondImage}
            alt='background'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: '100%' }}
            unoptimized
          />
          <div className='px-4 pt-4'>
            <h4 className=' mb-2 rounded-xl bg-cardRose py-2 pl-5 text-xs text-black'>
              @{props.secondData?.username}
            </h4>
            <span className='mb-3 ml-4 flex h-6 w-full items-center gap-1 rounded text-center text-xs text-gray-500 '>
              <svg width='12' height='12' viewBox='0 0 8 8' aria-hidden='true'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.32861 3.47677C4.20491 3.47677 4.91587 2.76581 4.91587 1.88951C4.91587 1.01321 4.20491 0.302246 3.32861 0.302246C2.45231 0.302246 1.74134 1.01321 1.74134 1.88951C1.74134 2.76581 2.45231 3.47677 3.32861 3.47677ZM4.73951 3.8295H4.13216C3.88746 3.94193 3.6152 4.00586 3.32861 4.00586C3.04202 4.00586 2.77086 3.94193 2.52506 3.8295H1.91771C1.1384 3.8295 0.506805 4.4611 0.506805 5.2404V5.41676C0.506805 5.70886 0.743793 5.94585 1.03589 5.94585H5.62132C5.91342 5.94585 6.15041 5.70886 6.15041 5.41676V5.2404C6.15041 4.4611 5.51881 3.8295 4.73951 3.8295Z'
                />
              </svg>
              {props.secondData?.followers} followers
            </span>
            <div className='flex-grow border-t border-gray-200 pb-2'></div>
          </div>
          <div className='w-full px-6 pb-2 '>
            <span className=' text-xs font-normal text-gray-700'>
              Views: {props.secondData?.views} Comments:{' '}
              {props.secondData?.comments} <br /> Likes:{' '}
              {props.secondData?.likes}
            </span>
            <div className='flex justify-end align-middle'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='gray'
                className='h-6 w-6'>
                <path
                  fillRule='evenodd'
                  d='M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
