import { PT_Mono } from 'next/font/google'

// Fonts
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

export default function NewClient() {
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
          <h3 className='text-lg font-bold'>New Client</h3>
          <div className={`w-full justify-start ${ptMono.className}`}>
            <p className='py-4'>Client</p>

            <input
              placeholder='Name'
              className={`${ptMono.className} flex w-full cursor-pointer content-center items-center justify-center gap-5 rounded-full border-2 border-gray-200 px-6 py-2 text-gray-500  focus:outline-none`}
            />

            <p className='py-4'>tags</p>
            <input
              type='text'
              id='default-input'
              placeholder='Campaign Name'
              className='w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
            />

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
                create client
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
