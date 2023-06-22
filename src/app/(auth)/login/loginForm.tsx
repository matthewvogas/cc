'use client'

import Spinner from '@/components/ui/spinner'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import InstagramIcon from 'public/assets/register/InstagramRegister.svg'
import TikTokIcon from 'public/assets/register/TikTokRegister.svg'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { ptMono } from '@/app/fonts'
import Instagram from 'next-auth/providers/instagram'

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
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
      className={`flex w-full flex-col items-center justify-center  gap-4 ${ptMono.className}`}>
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
        <div className='flex w-full flex-col items-center justify-center  gap-3'>
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
      </form>
      <div className='flex w-full gap-5'>
        <button
          onClick={async () =>
            await signIn('facebook', {
              callbackUrl,
            })
          }
          className=' flex h-14 w-full items-center justify-center gap-3 rounded-full border border-white hover:text-black hover:opacity-80  '>
          <Image className={`mr-4 w-8`} src={InstagramIcon} alt={''} />
          <p>Log in with instagram</p>
        </button>
        {/* <button className=' flex h-14 w-full items-center justify-center rounded-full border border-white hover:text-black hover:opacity-80  '>
              <Image className={`mr-4 w-8`} src={TikTokIcon} alt={''} />
            </button> */}
      </div>
    </div>
  )
}
