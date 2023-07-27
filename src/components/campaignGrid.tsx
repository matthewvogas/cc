import { ptMono } from '@/app/fonts'

const clients = [
  {
    name: "L'Oreal",
    email: 'loreal@lroeal.com',
  },
  {
    name: "Matthew's, Client",
    email: 'loreal@lroeal.com',
  },
  {
    name: "Sophia's Client",
    email: 'loreal@lroeal.com',
  },
]

export default function CampaignGrid() {
  return (
    <div className={`flex items-center justify-between`}>
      <label
        className={`rounded-full bg-background px-8 py-1 text-sm text-black ${ptMono.className}`}>
        Client Name
      </label>
      <div className={`flex ${ptMono.className}`}>
        <div className='dropdown-end dropdown '>
          <label
            tabIndex={0}
            className={`text-back mx-2 flex cursor-pointer rounded-full border-2 border-rose-100 bg-transparent px-8 py-2.5 text-sm  font-medium hover:bg-rose-100`}>
            filter
          </label>
          <div
            tabIndex={0}
            className='dropdown-content menu rounded-box mr-4 mt-2 w-auto border-2 border-gray-100 bg-white p-2'>
            <div className='m-4 flex flex-col gap-5'>
              <div className='flex flex-row gap-2'>
                <button className='rounded-full bg-beigeFirst px-6 py-2.5  hover:bg-beigeSelected focus:bg-beigeSelected'>
                  XD
                </button>
                <button className='rounded-full bg-beigeFirst px-6 py-2.5  hover:bg-beigeSelected focus:bg-beigeSelected'>
                  XD
                </button>
              </div>
              <div className='w-full'>
                <label className='' htmlFor=''>
                  Client
                </label>
                <select
                  id='countries'
                  className='mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-rose-400 focus:ring-rose-300 '>
                  <option value={0} disabled>
                    Choose a client
                  </option>
                  {clients.map((client, index) => (
                    <option value={index} id='companies-menu' key={index}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className='dropdown-end dropdown cursor-pointer'>
          <label
            tabIndex={0}
            className={` mx-2  flex cursor-pointer rounded-full border-2 border-rose-100 bg-transparent px-8 py-2.5 text-lg font-medium hover:bg-rose-100`}>
            add new
            <svg
              fill='none'
              viewBox='0 0 26 26'
              strokeWidth='1.5'
              stroke='currentColor'
              className='text-midBlack ml-4 h-5 w-5'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 8.25l-7.5 7.5-7.5-7.5'
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu rounded-box mr-4 mt-2 w-auto border-2 border-gray-100 bg-white p-2'>
            <button className=' rounded-full bg-beigeFirst px-6 py-2.5  hover:bg-beigeSelected focus:bg-beigeSelected'>
              xd
            </button>
            <button className=' rounded-full bg-beigeFirst px-6 py-2.5  hover:bg-beigeSelected focus:bg-beigeSelected'>
              xd
            </button>
          </ul>
        </div>
      </div>
    </div>
  )
}
