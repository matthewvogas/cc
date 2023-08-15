import Image from 'next/image'
import logo from 'public/assets/register/codecoco.svg'
import arrow from 'public/assets/register/arrowButtonIcon.svg'
import { ptMono } from '@/app/fonts'
import Link from 'next/link'

// Componente para el header de la página de invitación por parte de la agencia al creador
export default function HeaderCreatorInvitation() {
  return (
    <>
      <div className='mb-10 lg:mb-10 flex justify-between py-5 px-5  lg:px-7 lg:py-5'>
        <div className='flex items-center'>
          <Image
            className='h-auto w-[120px] lg:w-[150px] md:w-[140px]'
            src={logo}
            alt=''
          />
        </div>
      </div>
    </>
  )
}
