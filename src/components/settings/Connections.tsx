import React from 'react'
import Spinner from '../loading/spinner'
import { useRouter } from 'next/navigation';

type Props = {
  session: any
  InstagramConnection: any
  instgramToken: any
  tiktokConnection: any
}

export default function Connections({ session, InstagramConnection, instgramToken, tiktokConnection }: Props) {

  const router = useRouter();

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
        id: InstagramConnection.id,
      }),
    })
    if (res.ok) {
      router.refresh()
      setLoading(false)
    }

    const resPages = await fetch('/api/pagesRosalind/', {
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

  return (
    <div className='bg-[#FBFAF9]'>
      <div className='flex justify-between items-center text-sm font-medium px-8 py-8'>
        <h3>Connections</h3>
        <button className='bg-[#E7F5EE] text-xs px-8 py-3 rounded-full font-medium'>
          save
        </button>
      </div>
      <div className=' border-t-2 flex flex-col gap-6 px-8 py-8'>
        <div>
          <div className='flex mb-4'>Instagram</div>
          <div className='flex gap-4 '>
            {InstagramConnection == null ? (
              <a
                href={`/api/oauth/connect/facebook`}
                className='bg-[#E7F5EE] text-xs px-8 py-3 rounded-full font-medium'>
                connect
              </a>
            ) : (
              <div className='flex gap-4'>
                <label className='bg-[#E7F5EE] text-xs px-8 py-3 rounded-full font-medium'>
                  Connected
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
          <div className='flex mb-4'>TikTok</div>
          <div className='flex gap-4 '>
            {tiktokConnection == null ? (
              <a
                href={`/api/oauth/connect/tiktok`}
                className='bg-[#E7F5EE] text-xs px-8 py-3 rounded-full font-medium'>
                connect
              </a>
            ) : (
              <div className='flex gap-4'>
                <label className='bg-[#E7F5EE] text-xs px-8 py-3 rounded-full font-medium'>
                  Connected with token {tiktokConnection}
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
      </div>
    </div>
  )
}
