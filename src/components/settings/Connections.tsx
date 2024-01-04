import React from 'react'
import Spinner from '../loading/spinner'
import { useRouter } from 'next/navigation'
import plus from 'public/Check.svg'
import instagram from 'public/instagram.svg'
import tiktok from 'public/tiktok.svg'
import Image from 'next/image'

type Props = {
  session: any
  tiktokPages: any
  instagramPages: any
  InstagramConnection: any
  tiktokConnection: any
}

export default function Connections({
  session,
  tiktokPages,
  instagramPages,
  InstagramConnection,
  tiktokConnection,
}: Props) {
  const router = useRouter()

  const [loading, setLoading] = React.useState(false)

  const handleDelete = async () => {
    setLoading(true)
    const res = await fetch('/api/socialConnections', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: InstagramConnection.id,
      }),
    })
    if (res.ok) {
      router.refresh()
      setLoading(false)
    }

    const resPages = await fetch('/api/pageList', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: session.user.id,
      }),
    })
    if (resPages.ok) {
      router.refresh()
      setLoading(false)
    }
  }

  const handleDeleteTikTok = async () => {
    setLoading(true)
    const res = await fetch('/api/socialConnections', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: tiktokConnection.id,
      }),
    })
    if (res.ok) {
      router.refresh()
      setLoading(false)
    }

    const resPages = await fetch('/api/oauth/connect/tiktokPages', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: session.user.id,
      }),
    })
    if (resPages.ok) {
      router.refresh()
      setLoading(false)
    }
  }

  const instagramUsernames = instagramPages.map((page: any) => page.username).join(" - ");
  const tiktokUsername = tiktokPages.find((page: any) => page.userId === InstagramConnection.userId)?.username || 'No TikTok User Found';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tiktokConnection.token)
      .then(() => {
      })
      .catch(err => {
      });
  };

  return (
    <div className='bg-[#FBFAF9] mx-12 mt-6'>
      <div className='flex justify-between items-center text-sm font-medium px-8 py-8'>
        <h3>Connections</h3>
        <button className='bg-[#E7F5EE] text-xs px-8 py-3 rounded-full font-medium'>
          save
        </button>
      </div>
      <div className=' border-t-2 flex flex-col gap-6 px-8 py-8'>
        <div>
          <div className='flex gap-2 mb-4 font-medium text-base'> <Image src={instagram} className='mt-[2px]' alt={''} /> Instagram (with facebook page)</div>
          <div className='flex gap-4 '>
            {InstagramConnection == null ? (
              <a
                href={`/api/oauth/connect/facebook`}
                className='bg-[#E7F5EE] flex gap-2 text-xs px-8 py-3 rounded-full font-medium'>
                connect <Image src={plus} alt={''} />
              </a>
            ) : (
              <div className='flex gap-4'>
                <label className='bg-[#F5F3F0] flex gap-2 text-xs px-8 py-3 rounded-full font-medium'>
                  {instagramUsernames}
                </label>
                <label className='bg-[#E7F5EE] flex gap-2 text-xs px-8 py-3 rounded-full font-medium'>
                  connected <Image src={plus} alt={''} />
                </label>
                {loading ? (
                  <Spinner width='w-4' height='h-4' border='border-2' />
                ) : (
                  <button
                    onClick={handleDelete}
                    className='underline flex text-sm items-center'>
                    Disconnect
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div>
          <div className='flex gap-2  mb-4 font-medium text-base'> <Image src={tiktok} className='mt-[2px]' alt={''} />  TikTok</div>
          <div className='flex gap-4 '>
            {tiktokConnection == null ? (
              <a
                href={`/api/oauth/connect/tiktok`}
                className='bg-[#E7F5EE] text-xs px-8 py-3 rounded-full font-medium'>
                connect
              </a>
            ) : (
              <div className='flex gap-4'>
                 <label onClick={copyToClipboard} className='bg-[#F5F3F0] flex gap-2 text-xs px-8 py-3 rounded-full font-medium'>
                  {tiktokUsername} 
                </label>
                <label className='bg-[#E7F5EE] flex gap-2 text-xs px-8 py-3 rounded-full font-medium'>
                  connected <Image src={plus} alt={''} />
                </label>
                {loading ? (
                  <Spinner width='w-4' height='h-4' border='border-2' />
                ) : (
                  <button
                    onClick={handleDeleteTikTok}
                    className='underline flex text-sm items-center'>
                    Disconnect
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
