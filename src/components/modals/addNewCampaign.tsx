import { PT_Mono } from 'next/font/google'

// Fonts
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

// Arrays
const title = [
  {
    label: 'New Manual Campaign',
  },
  {
    label: 'New Hashtag Campaign',
  },
]
const client = [
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

// Show Arrays
const clients = client.map((client, index) => (
  <option value={index} id='companies-menu' key={index}>
    {client.name}
  </option>
))

export default function AddNewCampaign() {
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
          <h3 className='text-lg font-bold'>{title[1].label}</h3>

          <div className={`w-full justify-start ${ptMono.className}`}>
            <p className='py-4'>Client</p>
            <select
              id='countries'
              className='block w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'>
              <option value={0} disabled>
                Choose a client
              </option>
              {clients}
            </select>

            <p className='py-4'>Campaign Title</p>
            <input
              type='text'
              id='default-input'
              placeholder='Campaign Name'
              className='w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
            />

            <hr className='my-8 h-px border-0 bg-gray-200'></hr>

            <div className='text-center'>
              <button className='rounded-full bg-rose-200 px-6 py-2 '>
                create project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
