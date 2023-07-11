import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import avatar from 'public/assets/register/avatar.jpg'
import { PostHashtagStatus, type ChipStateName } from './postHashtagStatus'
import { CreatorStatus } from './creatorStatus'

const dropdownButton =
  'text-sm border-2 inline-block py-2 px-8 m-2 text-back font-medium bg-whiteBrown rounded-full hover:bg-transparent hover:border-orange-100'
const thTable = 'bg-white text-sm normal-case '
const infoLabel = 'bg-active px-8 py-3 rounded-full text-black text-sm '

export default function CreatorRow(props: { comeFrom: string }) {
  return (
    <div className='my-5 h-screen w-full md:px-12'>
      <table className='table w-full'>
        <thead className=' border-b border-gray-200'>
          <tr>
            {props.comeFrom === 'campigns' && (
              <>
                <th className={`${thTable} ${ptMono.className}`}>creator</th>
                <th className={`${thTable} ${ptMono.className}`}>status</th>
                <th className={`${thTable} ${ptMono.className}`}>
                  posts assigned
                </th>
                <th className={`${thTable} ${ptMono.className}`}>
                  post status
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          <tr className={`text-sm ${ptMono.className} `}>
            {props.comeFrom === 'campigns' && (
              <>
                <td className='bg-white'>
                  <div className={`flex items-center space-x-3 `}>
                    <div className='avatar'>
                      <div className='mask mask-circle mr-8 h-12 w-12'>
                        <Image
                          priority
                          className={``}
                          width={100}
                          height={100}
                          src={avatar}
                          alt='background'
                        />
                      </div>
                    </div>
                    <div>
                      <div className='font-bold'>Name</div>
                      <div className='text-sm opacity-50'>mail@hotmail.com</div>
                    </div>
                  </div>
                </td>
                <td className='bg-white'>
                  <CreatorStatus state={'SIGNEDUP'} />
                </td>
                <td className='bg-white'>
                  <div className='flex items-center justify-between '>
                    <div className='flex'>
                      <label className={`${infoLabel}`}>2 posts</label>
                      <button className='px-2 text-lg font-bold text-gray-400'>
                        {' '}
                        +{' '}
                      </button>
                    </div>
                  </div>
                </td>
                <td className='flex'>
                  <PostHashtagStatus state={'NOT'} link={''} />
                </td>
                <td>
                  <div className='dropdown-end dropdown cursor-pointer'>
                    <svg
                      tabIndex={0}
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-6 w-6'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                      />
                    </svg>
                    <ul
                      tabIndex={0}
                      className='dropdown-content menu rounded-box w-max  border-2 border-gray-100 bg-white p-2'>
                      <button className={`${dropdownButton}`}>
                        add post tracking 🥥
                      </button>
                      <button className={`${dropdownButton}`}>
                        View Creator
                      </button>
                      <button className={`${dropdownButton}`}>
                        Remove creator
                      </button>
                    </ul>
                  </div>
                </td>
              </>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
