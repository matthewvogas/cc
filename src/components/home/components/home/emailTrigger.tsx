import React, { useState } from 'react'
import Link from 'next/link'

const EmailTrigger = () => {
  const [email, setEmail] = useState('')

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  return (
    <>
      <div className='flex mt-2 justify-center'>
        <div className='w-2/4 lg:w-auto border py-3 pl-6 rounded-s-full bg-white'>
          <input
            placeholder='your email'
            value={email}
            onChange={handleEmailChange}
            className='text-sm lg:text-base font-medium border-none outline-none'
            type='text'
            name=''
            id=''
          />
        </div>
        <Link
          className='text-sm bg-[#DEF4EA] px-6 rounded-e-full font-medium lg:text-base items-center flex'
          href={`/signup?email=${encodeURIComponent(email)}`}
          passHref>
          get started 🥥
        </Link>
      </div>
    </>
  )
}

export default EmailTrigger
