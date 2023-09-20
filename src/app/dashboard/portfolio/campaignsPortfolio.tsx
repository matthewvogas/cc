import React from 'react'
import Image from 'next/image'
import img from 'public/assets/register/campaignCover.jpg'

export default function CampaignsPortfolio() {
  return (
    <div>
      <section>
        <div className='flex flex-row justify-between items-center mt-10'>
          <h2 className='font-semibold text-lg'>Campaigns</h2>
          <button className='border px-10 py-2 rounded-full'>edit</button>
        </div>

        <div className='flex flex-col mt-3'>
          <Image
            src={img}
            alt='Descripción de la imagen'
            width={300}
            height={200}
          />
          <div className='bg-sidebarBackground'>
            <img src='' alt='' />
            <span className='font-semibold '>with Rosalind</span>
          </div>
        </div>
      </section>
    </div>
  )
}
