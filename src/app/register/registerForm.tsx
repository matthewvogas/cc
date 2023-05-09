'use client'

import { signIn } from 'next-auth/react'
import React from 'react'

export const RegisterForm = () => {
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('api/register', {
        method: 'POST',
        body: JSON.stringify({ email, name, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        signIn()
      } else {
        const { error } = await res.json()
        console.log(error)
        setError(error)
      }
    } catch (err: any) {
      setError(err?.message)
    }
    console.log('register!')
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center justify-center gap-4'>
      <input
        type='text'
        placeholder='username or email'
        className='input input-lg w-full bg-opacity-40  pl-10 placeholder-white '
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type='text'
        placeholder='name'
        value={name}
        onChange={e => setName(e.target.value)}
        className='input input-lg w-full  bg-opacity-40 pl-10 placeholder-white'
        required
      />
      <input
        type='password'
        placeholder='password'
        autoComplete='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        className='input input-lg w-full  bg-opacity-40 pl-10 placeholder-white'
        required
      />
      <div className='flex flex-row items-center justify-center gap-2 px-2 py-8'>
        <input
          id='terms'
          name='terms'
          type='checkbox'
          className='checkbox rounded-md bg-white bg-opacity-50'
        />
        <label htmlFor='terms'>
          by creating an account, you accept our terms and conditions.
        </label>
      </div>
      {error && (
        <div className='alert alert-error shadow-lg'>
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
            <span>{error}</span>
          </div>
        </div>
      )}
      <button className='btn-secondary btn-lg btn w-full lowercase'>
        create your account
      </button>
    </form>
  )
}
