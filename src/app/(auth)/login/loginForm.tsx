'use client'

import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const callbackError = searchParams.get('error')
    ? 'Invalid email or password.'
    : null
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signIn('credentials', {
      email,
      password,
      callbackUrl,
    })
  }

  return (
    <form
      onSubmit={handleLogin}
      className='flex flex-col items-center justify-center gap-4'>
      <label htmlFor='email' />
      <input
        name='email'
        type='text'
        onChange={e => setEmail(e.target.value)}
        value={email}
        placeholder='username or email'
        className='input input-lg w-full bg-opacity-40  pl-10 placeholder-white '
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
        className='input input-lg w-full  bg-opacity-40 pl-10 placeholder-white'
        required
      />
      {callbackError && (
        <div className='alert alert-error justify-center shadow-lg'>
          <div>
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
      <button
        type='submit'
        className='btn-secondary btn-lg btn w-full lowercase'>
        login
      </button>
    </form>
  )
}
