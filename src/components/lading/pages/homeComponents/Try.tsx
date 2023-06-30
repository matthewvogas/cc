'use client'
import Image from 'next/image'
import exampleGrid from 'public/assets/register/examplePosts.png'
import { useState } from 'react'
import HomePostCard from './postCard'

import imageOne from 'public/assets/SandBox/InstagramPosts/onePost.jpg'
import imageTwo from 'public/assets/SandBox/InstagramPosts/TwoPost.jpg'
import imageThree from 'public/assets/SandBox/InstagramPosts/ThreePost.jpg'
import imageFour from 'public/assets/SandBox/InstagramPosts/FourPost.jpg'
import imageFive from 'public/assets/SandBox/InstagramPosts/FivePost.jpg'
import imageSix from 'public/assets/SandBox/InstagramPosts/SixPost.jpg'

const DataOne = {
  username: 'milkbar.co',
  followers: '2,7k',
  views: '128k',
  comments: '231',
  likes: '3k',
}
const DataTwo = {
  username: 'milkbar.co',
  followers: '2,7k',
  views: '8k',
  comments: '345',
  likes: '91k',
}

const DataThree = {
  username: 'milkbar.co',
  followers: '2,7k',
  views: '1k',
  comments: '12',
  likes: '18k',
}
const DataFour = {
  username: 'milkbar.co',
  followers: '2,7k',
  views: '56k',
  comments: '39',
  likes: '22k',
}

export default function Try() {
  const [instagramLinks, setInstagramLinks] = useState(
    'https://www.instagram.com/p/Cnc2jMhSuzx/, https://www.instagram.com/p/CgmcwluoaxO/, https://www.instagram.com/p/Cf7IhxTL9fl/',
  )
  const [blur, setBlur] = useState('blur-lg')
  return (
    <>
      <div className='m-auto flex w-[598px] flex-col items-center justify-center py-16'>
        <div className='mb-4 flex flex-col items-center gap-5'>
          <h2 className='text-2xl font-bold text-black'>Try Codecoco 🥥</h2>
          <p className='mb-4 text-center text-base text-black'>
            Test drive a little part of Codecoco. Create your own mini campaign.
            Drop in up to 3 social media links.
          </p>
        </div>

        <div className='mb-8 flex w-full flex-col gap-3 rounded-3xl bg-[#F9F8F7] px-10 py-6'>
          <p className='text-sm font-medium'>
            your Instagram, Facebook, or TikTok link
          </p>
          <div className='flex gap-2'>
            <input
              className=' border-gray max-h-max w-full rounded-lg border bg-transparent py-2 pl-4 outline-none'
              placeholder='https://'
              value={instagramLinks}
              readOnly
              id=''
            />
            {/* <button
              onClick={() =>
                setInstagramLinks(
                  'https://www.instagram.com/p/Cnc2jMhSuzx/, https://www.instagram.com/p/CgmcwluoaxO/, https://www.instagram.com/p/Cf7IhxTL9fl/',
                )
              }
              className='w-auto rounded-lg border bg-black px-4 text-white hover:bg-opacity-80'>
              autofill
            </button> */}
            <button
              onClick={() => setBlur('')}
              className='w-auto rounded-lg border bg-white px-4  text-black hover:bg-black hover:text-white'>
              try
            </button>
          </div>
          <button className='text-left text-xs text-gray-500'>
            {' '}
            bulk add links{' '}
          </button>
        </div>
        <div className='mt-4 flex gap-6'>
          <HomePostCard
            firstImage={imageOne}
            secondImage={imageTwo}
            firstData={DataOne}
            secondData={DataTwo}
            flex={'flex-col-reverse'}
            blur={blur}
          />
          <HomePostCard
            firstImage={imageThree}
            secondImage={imageFour}
            firstData={DataThree}
            secondData={DataFour}
            flex={'flex-col'}
            blur={blur}
          />
          <HomePostCard
            firstImage={imageFive}
            secondImage={imageSix}
            firstData={DataThree}
            secondData={DataFour}
            flex={'flex-col-reverse'}
            blur={blur}
          />
        </div>
      </div>
    </>
  )
}
