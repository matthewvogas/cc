import Image from 'next/image'
import Link from 'next/link'
import cta_image from 'public/assets/register/cta_footer.jpg'
import EmailTrigger from './emailTrigger'
import check from 'public/assets/SandBox/Cards/check.svg'
import { BsCheck } from 'react-icons/bs'
import { useState } from 'react'

export default function Try() {
  const [email, setEmail] = useState('')

  const handleEmailSubmit = (submittedEmail: any) => {
    setEmail(submittedEmail)
  }

  return (
    <>
      <Image
        src={cta_image}
        className='h-[492px] w-full object-cover'
        alt={''}
      />
      <div>
        <div className='flex-col justify-center items-center absolute left-[50%]  -mt-[230px] flex w-[360px] lg:w-[900px] -translate-x-1/2 -translate-y-1/2 transform'>
          <h4 className='text-white text-[34px] font-bold flex text-center mb-6'>
            Start creating campaigns with Codecoco now{' '}
          </h4>
          <EmailTrigger />
          <div className='flex gap-6 mt-6'>
            <div className='flex gap-2'>
              <BsCheck
                style={{ color: 'white', width: '26px', height: 'auto' }}
              />
              <p className=' text-base font-medium text-white'>
                7 day free trial
              </p>
            </div>
            <div className='flex gap-2'>
              <BsCheck
                style={{ color: 'white', width: '26px', height: 'auto' }}
              />
              <p className=' text-base font-medium text-white'>
                7 day free trial
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
