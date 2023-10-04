import React from 'react'

type Props = {
  InstagramConnection: any
}

export default function Connections({ InstagramConnection }: Props) {
  
  const handleDelete = async () => {
    const res = await fetch('/api/socialConnections', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: InstagramConnection.id
      }),
    })
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
                target='_blank'
                href='/api/oauth/connect/facebook'
                className='bg-[#E7F5EE] text-xs px-8 py-3 rounded-full font-medium'>
                connect
              </a>
            ) : (
              <div className='flex gap-4'>
                <label className='bg-[#E7F5EE] text-xs px-8 py-3 rounded-full font-medium'>
                  connected
                </label>
                <button
                  onClick={
                    handleDelete
                  }
                  className='underline flex text-sm items-center'>
                  Disconnected -
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
