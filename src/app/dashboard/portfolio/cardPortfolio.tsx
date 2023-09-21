import React from 'react'
import Image from 'next/image'
import img from 'public/assets/register/campaignCover.jpg'

export default function CardPortfolio() {
  return (
    <div>
      <div className='flex-col border'>
        <Image src={img} alt={''} height={300} width={300}></Image>

        <div className='flex-row flex items-center p-5 gap-3 bg-sidebarBackground'>
          <div className='mask mask-circle'>
            <Image src={img} alt={''} height={50} width={50} />
          </div>
          <span>with Rosalind</span>
        </div>
      </div>
    </div>
  )
}
