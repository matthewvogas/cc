import Image from 'next/image'
import registerBg from '../../../public/assets/register/register-bg.jpg'
import { Sen } from 'next/font/google'
import Link from 'next/link'

const sen = Sen({ weight: '700', subsets: ['latin'] })
export default function Register() {
  return (
    <section className='relative flex h-screen items-center justify-center'>
      <Image
        className='absolute -z-20 h-full w-full object-cover object-center brightness-75'
        src={registerBg}
        alt='background'
      />

      <div className='flex w-[500px] flex-col items-center justify-center gap-4  text-center text-white'>
        <div className='flex flex-col gap-4'>
          <h1 className={` ${sen.className} text-7xl font-bold text-primary`}>
            codecoco
          </h1>
          <p className='text-lg text-white'>create your account</p>
        </div>

        <form className='flex flex-col items-center justify-center gap-4'>
          <input
            type='text'
            placeholder='username or email'
            className='input input-lg w-full bg-opacity-40  pl-10 placeholder-white '
          />
          <input
            type='text'
            placeholder='name'
            className='input input-lg w-full  bg-opacity-40 pl-10 placeholder-white'
          />
          <input
            type='password'
            placeholder='password'
            className='input input-lg w-full  bg-opacity-40 pl-10 placeholder-white'
          />
          <div className='flex flex-row items-center justify-center gap-2 px-2 py-8'>
            <input
              type='checkbox'
              className='checkbox rounded-md bg-white bg-opacity-50'
            />
            <label>
              by creating an account, you accept our terms and conditions.
            </label>
          </div>

          <button className='btn-lg btn w-full lowercase'>
            create your account
          </button>
        </form>

        <div className='divider' />

        <p>
          already have an account? <Link href='/login'>log in</Link>
        </p>
      </div>
    </section>
  )
}
