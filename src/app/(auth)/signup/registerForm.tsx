'use client'

import Image from 'next/image'
import InstagramIcon from 'public/assets/register/InstagramRegister.svg'
import TikTokIcon from 'public/assets/register/TikTokRegister.svg'
import Spinner from '@/components/ui/spinner'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { ptMono } from '@/app/fonts'

export const RegisterForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackError = searchParams.get('error')
    ? 'Email has already been taken.'
    : null
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password }),
    })

    if (res.ok) {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/dashboard',
      })
    } else {
      router.push('/register?error=email')
    }
    setLoading(false)
  }
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-col justify-center ${ptMono.className}`}>
      <input
        type='text'
        placeholder='username or email'
        className='input  mb-4 h-14 w-full  bg-opacity-25 pl-10 placeholder-white '
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type='text'
        placeholder='name'
        value={name}
        onChange={e => setName(e.target.value)}
        className='input  mb-4 h-14 w-full  bg-opacity-25 pl-10 placeholder-white'
        required
      />
      <input
        type='password'
        placeholder='password'
        autoComplete='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        className='input  mb-4 h-14 w-full  bg-opacity-25 pl-10 placeholder-white'
        required
      />
      <div className='flex items-center justify-center gap-2 px-2 py-8'>
        <input
          id='terms'
          name='terms'
          type='checkbox'
          className='checkbox rounded-md bg-white bg-opacity-50'
        />
        <label className='ml-4 text-left text-sm' htmlFor='terms'>
          by creating an account, you accept our terms and conditions.
        </label>
      </div>
      {callbackError && (
        <div className='mb-4 flex h-14 w-full flex-col items-center justify-center rounded-full bg-red-400 shadow-lg'>
          <div className='flex flex-row gap-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 flex-shrink-0 stroke-current'
              fill='none'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>{callbackError}</span>
          </div>
        </div>
      )}

      <div className='flex flex-col items-center justify-center gap-3'>
        <button
          disabled={loading}
          type='submit'
          className=' h-14 w-full rounded-full bg-loginButtons lowercase text-black'>
          {loading ? (
            <Spinner width='w-4' height='h-4' border='border-2' />
          ) : (
            'create your account'
          )}
        </button>
        {/* <div className='flex w-full gap-5'>
          <button className=' flex h-14 w-full items-center justify-center rounded-full border border-white hover:text-black hover:opacity-80  '>
            <Image className={`mr-4 w-8`} src={InstagramIcon} alt={''} />
          </button>
          <button
            className=' flex w-full h-14 justify-center items-center rounded-full border border-white hover:text-black hover:opacity-80  '>
            <Image className={`w-8 mr-4`} src={TikTokIcon} alt={''} />
          </button>
        </div> */}
      </div>
    </form>
  )
}
