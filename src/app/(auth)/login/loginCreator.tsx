'use client'
import { ptMono } from '@/app/fonts'
import Spinner from '@/components/loading/spinner'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { SiTiktok } from 'react-icons/si'
import { SiInstagram } from 'react-icons/si'

export default function LoginCreator() {
  const [loading, setLoading] = useState(false)

  return (
    <div className='flex flex-col items-center justify-center  gap-4'>
      <button
        disabled={loading}
        onClick={() => signIn('tiktok', { callbackUrl: '/connectionsuccess' })}
        type='submit'
        className='h-14 w-full rounded-full bg-loginButtons text-black'>
        {loading ? (
          <Spinner width='w-4' height='h-4' border='border-2' />
        ) : (
          <div className='flex items-center justify-center gap-2'>
            <SiTiktok size={20} />
            <p className='text-sm'>Login with TikTok</p>
          </div>
        )}
      </button>

      <button
        disabled={loading}
        onClick={() =>
          signIn('instagram', { callbackUrl: '/connectionsuccess' })
        }
        type='submit'
        className='h-14 w-full rounded-full bg-loginButtons text-black'>
        {loading ? (
          <Spinner width='w-4' height='h-4' border='border-2' />
        ) : (
          <div className='flex items-center justify-center gap-2'>
            <SiInstagram size={20} />
            <p className='text-sm'>Login with Instagram</p>
          </div>
        )}
      </button>
    </div>
  )
}
