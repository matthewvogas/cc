import { PT_Mono } from 'next/font/google'

// Fonts
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

export default function EditClient() {
  return (
    <div>
      <label htmlFor='my-modal-3' className=''>
        MODAL
      </label>
      <input type='checkbox' id='my-modal-3' className='modal-toggle' />
      <div className='modal '>
        <div className='modal-box relative flex flex-col items-center justify-center rounded-xl bg-white px-20 py-12'>
          <label
            htmlFor='my-modal-3'
            className='absolute right-4 top-2 cursor-pointer text-lg'>
            ✕
          </label>
          <h3 className='text-lg font-bold'>Edit Client</h3>
          <div className={`w-full justify-start ${ptMono.className}`}>
            <p className='py-4'>Client</p>
            <input
              placeholder='Name'
              className={`${ptMono.className} flex w-full cursor-pointer content-center items-center justify-center gap-5 rounded-full border-2 border-gray-200 px-6 py-2 text-gray-500  focus:outline-none`}
            />
            <p className='py-4'>tags</p>
            <span className='rounded-full border-2 border-gray-200 px-6 py-2 text-gray-500 '>
              Example{' '}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='inline h-4 w-4'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </span>
            <p className='py-4'>add an image</p>
            <form>
              <label className='block rounded-full border-2'>
                <span className='sr-only'>Choose </span>
                <input
                  type='file'
                  className='block w-full text-sm text-black
                    file:mr-4 file:border-0
                    file:bg-transparent file:px-4
                    file:py-2 file:text-sm
                    file:font-semibold file:text-gray-600
                    hover:file:bg-transparent '
                />
              </label>
            </form>
            <hr className='my-8 h-px border-0 bg-gray-200'></hr>
            <div className='text-center'>
              <button className='rounded-full bg-rose-200 px-6 py-2 '>
                save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
