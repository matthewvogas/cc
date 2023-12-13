'use client'

import { useEffect, useState } from 'react'
import React from 'react'
import { inter, ptMono } from '@/app/fonts'
import { User } from '@prisma/client'
import Link from 'next/link'

export function SharedForm({ user }: { user: User }) {
  const [email, setEmail] = useState('')
  const [enviadoStatus, setEnviadoStatus] = useState('bg-transparent')
  const [enviado, setEnviado] = useState('')
  const [inviteStatus, setInviteStatus] = useState('invite')
  const handleChange = (event: any) => {
    setEmail(event.target.value)
  }

  const [creatorSelected, setCreatorSelected] = useState('')

  const sendGetRequest = async () => {
    const recipientEmail = email

    try {
      const response = await fetch(`/api/email?to=${recipientEmail}`, {
        method: 'GET',
      })

      if (response.ok) {
        const data = await response.json()
        setEnviadoStatus('bg-green-400 text-white')
        setEnviado('Sent it')
      } else {
        console.error('Error en la solicitud:', response.statusText)
        setEnviado('Error, write the email correctly')
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  return (
    <div className='px-12 mt-8'>
      <h2>Connect with {user.name}</h2>
      <label className='text-xs text-black opacity-50' htmlFor=''>
        Connect with your agency using codecoco to facilitate access to
        information{' '}
        <Link className='underline' href={'/privacy'}>
          Learn more about privacy and security.
        </Link>
      </label>

      <p className={`text-sm font-medium pb-2 pt-6 ${inter.className}`}>
        Send me an invite via email
      </p>
      <div className='flex gap-2'>
        <input
          value={email}
          onChange={handleChange}
          type='text'
          className='flex items-center bg-transparent px-2 text-sm rounded-xl border bg-gray-50  gap-2 w-full pl-2 py-2 pr-2 outline-none'
          placeholder='sophia@codecoco.co'
        />
        <button
          onClick={sendGetRequest}
          className={`rounded-xl border px-8 py-2 hover:bg-black hover:bg-opacity-10 focus:bg-green-400 focus:text-black ${enviadoStatus}`}>
          send
        </button>
      </div>
      <div className='mb-12 mt-2'>
        <p className='text-sm text-red-600 font-semibold'>{enviado}</p>
        <label className='text-xs text-black opacity-50 ' htmlFor=''>
          write only one email
        </label>
      </div>
    </div>
  )
}
