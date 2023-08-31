import { ptMono } from "@/app/fonts"

export const EmptyPost = () => {
  return (
    <>
      <div
        className={`h-fit w-auto max-w-sm overflow-visible rounded-2xl bg-transparent border border-gray-400 opacity-40 ${ptMono.className}`}>
        <div className='w-full h-[320px] flex justify-center items-center'>
          <p className='mx-8 text-center'> add posts through the link or spreadsheet</p>
        </div>
        <div className='px-6 pt-6'>
          <h4 className=' mb-2 rounded-xl bg-transparent border border-gray-400 px-3 py-2 md:px-4 md:py-3 text-[10px] lg:text-base'>
            <div className='flex gap-1 md:gap-2 items-center'>
              {/* svg de la red social */}
              <div >

              </div>
              <div>

              </div>
              <span className='truncate text-sm lg:text-lg'>
                @ - - -
              </span>
            </div>
          </h4>

          {/* followers */}

          <span className=' inline-flex h-6 w-full rounded text-center text-[10px] lg:text-sm text-gray-500 '>
            <svg
              fill='none'
              stroke='currentColor'
              strokeWidth={1.5}
              viewBox='0 0 30 30'
              aria-hidden='true'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
            - - - followers
          </span>
          <div className='flex-grow border-t border-gray-200 pb-2'></div>
        </div>
        <div className='flex flex-col px-6 pb-2'>
          {/* Posts data */}

          <div>
            <span className='mb-2 mr-2 inline-block py-1 pr-2 text-[10px] lg:text-sm font-semibold text-gray-700'>
              Comments: - - -
            </span>
            <span className='mb-2 mr-2 inline-block py-1 pr-2 text-[10px] lg:text-sm font-semibold text-gray-700'>
              Likes: - - -
            </span>
          </div>
          <div className='flex justify-end outline-none'>
            <svg
              tabIndex={0}
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6 outline-none'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
