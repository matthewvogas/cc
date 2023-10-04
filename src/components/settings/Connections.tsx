import React from 'react'

type Props = {
  InstagramConnection: any
}

export default function Connections({ InstagramConnection }: Props) {
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
            <p className='bg-[#F5F3F0] text-xs px-8 py-3 rounded-full font-normal'>
              @milkbar.co
            </p>
            {InstagramConnection == null ? (
              <a
                target='_blank'
                href='/api/oauth/connect/tiktok'
                className='bg-[#E7F5EE] text-xs px-8 py-3 rounded-full font-medium'>
                connect
              </a>
            ) : (
              <label className='bg-[#E7F5EE] text-xs px-8 py-3 rounded-full font-medium'>
                connected
              </label>
            )}
            <p className='underline text-xs px-8 py-3 rounded-full opacity-20'>
              disconnect
            </p>
          </div>
        </div>

        <div>
          <div className='flex mb-4'>Tiktok</div>
          <div className='flex gap-4 '>
            <p className='bg-[#F5F3F0] text-xs px-8 py-3 rounded-full font-normal'>
              @milkbar.co
            </p>

            <a
              target='_blank'
              href='/api/oauth/connect/tiktok'
              className='bg-[#E7F5EE] text-xs px-8 py-3 rounded-full font-medium'>
              connect
            </a>

            <p className='underline text-xs px-8 py-3 rounded-full opacity-20'>
              disconnect
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
