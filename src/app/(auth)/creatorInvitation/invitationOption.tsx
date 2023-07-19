'use client'

import React from 'react'
import Link from 'next/link'

export const InvitationOption = () => {
  return (
    <div className='flex gap-3 w-[80%]'>
      {/* conexión sin cuenta */}
      <div
        className={` bg-white bg-opacity-80 flex flex-col w-full text-black rounded-lg `}>
        <div className={`bg-[#F2EDE7] bg-opacity-80 rounded-t-lg py-7`}>
          <p className={`text-xl mb-2 opacity-50`}>🥥</p>
          <p className={`text-base font-semibold opacity-70`}>
            Connect without an account
          </p>
        </div>
        <div className='px-11 flex flex-col gap-8 items-center justify-between  h-full py-8'>
          <p className='italic font-light'>all good</p>
          <ul className='flex flex-col items-center gap-2 font-medium '>
            <li className=''>
              you connect purely so your agency can check your stats
              automatically
            </li>
            <li>we cannot view or keep your login information</li>
            <li>end-to-end encrypted</li>
          </ul>
          <div className='flex flex-col gap-7 items-center'>
            <span className='italic'>
              view
              <Link className='underline' href={'/privacy'}>
                {' '}
                Privacy Policies{' '}
              </Link>{' '}
              and{' '}
              <Link className='underline' href={'/terms'}>
                Terms
              </Link>{' '}
              here
            </span>
            <Link
              href={'/creatorConectionSocialFlow'}
              className={`bg-[#C7C7C7] px-6 py-3 rounded-full text-white w-fit hover:bg-opacity-80`}>
              Get Started 🥥
            </Link>
          </div>
        </div>
      </div>

      {/* conexión creando una cuenta */}
      <div
        className={` bg-white bg-opacity-80 flex flex-col w-full text-black rounded-lg `}>
        <div className={`bg-[#DEECE6] bg-opacity-80 rounded-t-lg py-7`}>
          <p className={`text-xl mb-2`}>🥥 🥥</p>
          <p className={`text-base font-semibold opacity-90`}>
            Do better <span className='font-bold'>with</span> a Codecoco account
          </p>
        </div>
        <div className='px-11 flex flex-col gap-8 items-center justify-between  h-full py-8'>
          <p className='italic font-light'>why join Codecoco?</p>
          <ul className='flex flex-col items-center gap-2 font-medium '>
            <li>never send a single stats screenshot again</li>
            <li>track and review all your post results</li>
            <li>present your work beautifully to brands</li>
          </ul>
          <div className='flex flex-col gap-7 items-center'>
            <span className='italic'>
              view
              <Link className='underline' href={'/privacy'}>
                {' '}
                Privacy Policies{' '}
              </Link>{' '}
              and{' '}
              <Link className='underline' href={'/terms'}>
                Terms
              </Link>{' '}
              here
            </span>
            <Link
              href={'/creatorRegisterFlow'}
              className={`bg-[#859991] px-6 py-3 rounded-full text-white w-fit hover:bg-opacity-80`}>
              Get Started 🥥
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
