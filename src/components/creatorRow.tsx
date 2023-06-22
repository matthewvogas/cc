import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import avatar from 'public/assets/register/avatar.jpg'

// Fonts

// Style Variables
const addPostButton =
  'text-sm  border-rose-100 border-2 inline-block py-2.5 px-8 mx-2 text-back font-medium bg-transparent rounded-full  hover:bg-rose-100 '
const dropdownButton =
  'text-sm border-2 inline-block py-2 px-8 m-2 text-back font-medium bg-whiteBrown rounded-full hover:border-orange-100'
const thTable = 'bg-white text-sm normal-case '
const signedUpLabel = 'bg-active px-8 py-3 rounded-full text-black text-sm '
const inviteLabel =
  'bg-white border-2 border-rose-100 px-8 py-3 rounded-full text-black text-sm '
const pendingLabel = 'bg-beigeFirst px-8 py-3 rounded-full text-black text-sm '
const infoLabel = 'bg-active px-8 mx-2 py-3 rounded-full text-black text-sm '

// Arrays
const titleTable = [
  {
    label: 'row',
  },
  {
    label: 'campaigns',
  },
  {
    label: 'tags',
  },
  {
    label: 'status',
  },
  {
    label: 'follower count',
  },
  {
    label: 'posts assigned',
  },
]

const row = [
  {
    name: 'Matthew',
    mail: 'hi@mvttheo.com',
    img: avatar,
    followes: 14.0,
    qtyPosts: 86,
    campaignsAssociated: 4,
    tags: ['beaty, ', 'lifestyle'],
  },
  {
    name: 'Matthew',
    mail: 'hi@mvttheo.com',
    img: avatar,
    followes: 14.0,
    qtyPosts: 21,
    campaignsAssociated: 2,
    tags: ['beaty, ', 'lifestyle'],
  },
]

const button = [
  {
    label: 'View row',
    path: '',
  },
  {
    label: 'Add To Campaign',
    path: '',
  },
  {
    label: 'Remove row',
    path: '',
  },
  {
    label: 'Editx row',
    path: '',
  },
]

// Show Arrays
// const titleTables = titleTable.map((title, index) => (
//   <th key={index} className={`${thTable} ${ptMono.className}`}>
//     {title.label}
//   </th>
// ))
// const buttons = button.map((button, index) => (
//   <button key={index} className={`${dropdownButton}`}>
//     {button.label}
//   </button>
// ))

// const creators = row.map((row, index) => (
//   <tr key={index} className={`text-sm ${ptMono.className} `}>
//     <td className='bg-white'>
//       <div className={`flex items-center space-x-3 `}>
//         <div className='avatar'>
//           <div className='mask mask-circle mr-8 h-12 w-12'>
//             <Image
//               priority
//               className={``}
//               width={100}
//               height={100}
//               src={row.img}
//               alt='background'
//             />
//           </div>
//         </div>
//         <div>
//           <div className='font-bold'>{row.name}</div>
//           <div className='text-sm opacity-50'>{row.mail}</div>
//         </div>
//       </div>
//     </td>

//     <td className='bg-white'>{row.qtyPosts}</td>

//     <td className='bg-white'>{row.tags}</td>

//     <td className='bg-white'>
//       <label className={`${pendingLabel}`}>pending</label>
//     </td>
//     <td className='bg-white'>{row.followes}</td>
//     <td className='bg-white'>
//       <div className='flex items-center justify-between '>
//         <div>
//           <label className={`${infoLabel}`}>{row.qtyPosts} posts</label>
//           <button className={`${addPostButton}`}>add post</button>
//         </div>
//         <div className='dropdown-end dropdown cursor-pointer'>
//           <svg
//             tabIndex={0}
//             fill='none'
//             viewBox='0 0 24 24'
//             strokeWidth={1.5}
//             stroke='currentColor'
//             className='h-6 w-6'>
//             <path
//               strokeLinecap='round'
//               strokeLinejoin='round'
//               d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
//             />
//           </svg>
//           <ul
//             tabIndex={0}
//             className='dropdown-content menu rounded-box w-auto border-2 border-gray-100 bg-white p-2'>
//             {buttons}
//           </ul>
//         </div>
//       </div>
//     </td>
//   </tr>
// ))

export default function CreatorRow({
  titles,
  rows,
}: {
  titles?: any
  rows?: any
}) {
  return (
    <div className='my-5 h-screen w-full md:px-12'>
      <table className='table w-full'>
        <thead className=' border-b border-gray-200'>
          <tr>
            {titleTable.map((title, index) => (
              <th key={index} className={`${thTable} ${ptMono.className}`}>
                {title.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {row.map((row, index) => (
            <tr key={index} className={`text-sm ${ptMono.className} `}>
              <td className='bg-white'>
                <div className={`flex items-center space-x-3 `}>
                  <div className='avatar'>
                    <div className='mask mask-circle mr-8 h-12 w-12'>
                      <Image
                        priority
                        className={``}
                        width={100}
                        height={100}
                        src={row.img}
                        alt='background'
                      />
                    </div>
                  </div>
                  <div>
                    <div className='font-bold'>{row.name}</div>
                    <div className='text-sm opacity-50'>{row.mail}</div>
                  </div>
                </div>
              </td>

              <td className='bg-white'>{row.qtyPosts}</td>

              <td className='bg-white'>{row.tags}</td>

              <td className='bg-white'>
                <label className={`${pendingLabel}`}>pending</label>
              </td>
              <td className='bg-white'>{row.followes}</td>
              <td className='bg-white'>
                <div className='flex items-center justify-between '>
                  <div>
                    <label className={`${infoLabel}`}>
                      {row.qtyPosts} posts
                    </label>
                    <button className={`${addPostButton}`}>add post</button>
                  </div>
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
                      className='dropdown-content menu rounded-box w-auto border-2 border-gray-100 bg-white p-2'>
                      {button.map((button, index) => (
                        <button key={index} className={`${dropdownButton}`}>
                          {button.label}
                        </button>
                      ))}
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
