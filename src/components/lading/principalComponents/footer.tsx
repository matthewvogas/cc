import Image from 'next/image'
import logo from 'public/assets/register/codecoco.svg'
import arrow from 'public/assets/register/arrowButtonIcon.svg'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <div className='flex justify-around bg-[#181818] py-14 '>
        <div className='flex gap-16 '>
          <div className='flex flex-col items-start justify-start gap-2'>
            <h5 className='mb-5 text-xs text-[#ffffff]'>Legal</h5>
            <Link className='text-sm text-[#ffffff]' href={'./terms'}>
              Terms of service
            </Link>
            <Link className='text-sm text-[#ffffff]' href={'./privacy'}>
              Privacy policy
            </Link>
            {/* <button className='text-sm text-[#0D2247]'>Security</button> */}
            {/* <button className='text-sm text-[#0D2247]'>Talk to sales</button> */}
          </div>
          {/* <div className='flex flex-col items-start justify-start gap-2'>
            <h5 className='mb-5 text-xs text-[#8690A3]'>Contact</h5>
            <button className='text-sm text-[#0D2247]'>Messages</button>
            <button className='text-sm text-[#0D2247]'>Direction</button>
            <button className='text-sm text-[#0D2247]'>Mail</button>
          </div>
          <div className='flex flex-col items-start justify-start gap-2'>
            <h5 className='mb-5 text-xs text-[#8690A3]'>Social</h5>
            <button className='text-sm text-[#0D2247]'>Instagram</button>
            <button className='text-sm text-[#0D2247]'>TikTok</button>
            <button className='text-sm text-[#0D2247]'>Facebook</button>
          </div> */}
        </div>

        <div className='flex items-center'>
          <Image className='h-auto w-[150px] bg-[#]' src={logo} alt='' />
        </div>
      </div>
    </>
  )
}
