'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Spinner from '@/components/loading/spinner'
import { signIn } from 'next-auth/react'
import { ptMono } from '@/app/fonts'
import React from 'react'
import Link from 'next/link'
import LoginCreator from './loginCreator'

export const Login = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const callbackError = searchParams.get('error')
    ? 'Invalid email or password.'
    : null
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await signIn('credentials', {
      email,
      password,
      callbackUrl,
    })
    setLoading(false)
  }

  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-2 ${ptMono.className}`}>
      <form
        onSubmit={handleLogin}
        className={`flex w-full flex-col items-center  justify-center ${ptMono.className}`}>
        <label htmlFor='email' />
        <input
          name='email'
          type='text'
          onChange={e => setEmail(e.target.value)}
          value={email}
          placeholder='username or email'
          className='input  mb-4 h-14 w-full  bg-opacity-25 pl-10 placeholder-white'
          required
        />
        <label htmlFor='password' />
        <input
          onChange={e => setPassword(e.target.value)}
          value={password}
          name='password'
          type='password'
          placeholder='password'
          autoComplete='password'
          className='input  mb-10 h-14  w-full bg-opacity-25 pl-10 placeholder-white'
          required
        />
        {callbackError && (
          <div className='mb-4 flex h-14 w-full flex-row items-center justify-center gap-3 rounded-full bg-red-400 shadow-lg'>
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
        )}
        <div className='flex w-full flex-col items-center justify-center gap-3'>
          <button
            disabled={loading}
            type='submit'
            className='h-14 w-full rounded-full bg-loginButtons text-black'>
            {loading ? (
              <Spinner width='w-4' height='h-4' border='border-2' />
            ) : (
              'login'
            )}
          </button>
        </div>

        {/* <div className='divider'> or </div>

        <div className='w-full max-w-md px-2 sm:px-0 mb-6'>
          <LoginCreator />
        </div> */}
      </form>

      <div className='flex w-full gap-5 flex-col'>
        {/* <button
          onClick={async () => await signIn('instagram')}
          className=' flex h-14 w-full items-center justify-center gap-3 rounded-full border border-white hover:opacity-80  '>
          <p>Log in with instagram</p>
        </button> */}
        {/* <button
          onClick={async () => await signIn('tiktok')}
          className=' flex h-14 w-full items-center justify-center rounded-full border border-white hover:text-black hover:opacity-80  '>
          <Image className={`mr-4 w-8`} src={TikTokIcon} alt={''} />
          <p>Log in with Tiktok</p>
        </button>
        <button
          onClick={async () => await signIn('google')}
          className=' flex h-14 w-full items-center justify-center gap-3 rounded-full border border-white hover:text-black hover:opacity-80  '>
          <Image className={`mr-4 w-8`} src={InstagramIcon} alt={''} />
          <p>Log in with google</p>
        </button>
        <button
          onClick={async () => await signIn('github')}
          className=' flex h-14 w-full items-center justify-center gap-3 rounded-full border border-white hover:text-black hover:opacity-80  '>
          <Image className={`mr-4 w-8`} src={InstagramIcon} alt={''} />
          <p>Log in with github</p>
        </button> */}
      </div>
      <hr className='my-7 h-px w-full rounded-r-full bg-white opacity-50' />

      <div className='flex w-full flex-col gap-4 justify-center px-4'>
        <Link href='/signup/agency' className='text-lg '>
          create a new account like Agency
        </Link>
        <Link href='/signup/creator' className='text-lg '>
          create a new account like Creator
        </Link>
        {/* <Link href='/signup' className='text-lg'>
    reset your password
  </Link> */}
      </div>
    </div>
  )
}
