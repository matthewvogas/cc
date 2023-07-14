import Image from 'next/image'
import { inter } from '@/app/fonts'
import HeaderCreatorInvitation from './header'
import { InvitationOption } from './invitationOption'
import userAgency from 'public/assets/creatorRegister/user-agency.png'
import registerBg from 'public/assets/creatorRegister/bg-creator_invitation.jpg'

export default function LoginPage() {
  // constante que define que agencia envió la notificación
  const agency = 'WithRosalind'

  return (
    <>
      {/* fondo de la página */}
      <Image
        priority
        className='absolute -z-20 h-full w-full object-cover object-center '
        src={registerBg}
        alt='background'
        fill
      />
      {/* header de la página */}
      <HeaderCreatorInvitation />
      <section className='relative flex w-screen items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-4  p-10 text-center text-white '>
          <div className={`flex flex-col gap-4 items-center  `}>
            <Image priority className='w-[100px]' src={userAgency} alt='' />
            <p
              className={`mb-12 text-lg text-white tracking-wider font-normal ${inter.className}`}>
              you’ve been invited to connect with {agency}
            </p>
          </div>
          {/* invocando componente para registrar las invitaciones */}
          <InvitationOption />
        </div>
      </section>
    </>
  )
}
