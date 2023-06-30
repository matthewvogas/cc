import Image from 'next/image'
import exampleGrid from 'public/assets/register/examplePosts.png'
import Rosalind from 'public/assets/register/Rosalind-white.svg'
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
        <button className='absolute left-[50%] -mt-[230px] flex w-[500px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-2 rounded-full border-2 border-white px-10 py-4 text-lg text-white'>
          start creating campaigns now with Codecoco 🥥
        </button>
      </div>
    </>
  )
}
