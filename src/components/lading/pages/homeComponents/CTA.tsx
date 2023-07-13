import Image from 'next/image'
import Link from 'next/link'
import cta_image from 'public/assets/register/cta_footer.jpg'

export default function Try() {
  return (
    <>
      <Image
        src={cta_image}
        className='h-[492px] w-full object-cover'
        alt={''}
      />
      <div>
        <Link
          href={'/signup'}
          className='text-[11px] absolute left-[50%] -mt-[230px] flex w-[360px] lg:w-[500px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-2 rounded-full border-2 border-white px-10 py-4 lg:text-lg text-white'>
          start creating campaigns now with Codecoco 🥥
        </Link>
      </div>
    </>
  )
}
