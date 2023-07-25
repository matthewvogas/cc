'use client'

// Style Variables
const ActionButtonStyle =
  'flex text-lg flex items-center  border-2 inline-block py-2.5 px-8 mx-2 text-back h-12 font-medium rounded-full  hover:bg-rose-100 cursor-pointer '

// Arrays
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

const button = [
  {
    label: 'newer',
    action: 'Hello',
  },
  {
    label: 'older',
    action: '',
  },
]

// Show Arrays
const buttons = button.map((btn, index) => (
  <button
    key={index}
    className=' rounded-full bg-beigeFirst px-6 py-2.5  hover:bg-beigeSelected focus:bg-beigeSelected'>
    {btn.label}
  </button>
))

const clients = client.map((client, index) => (
  <option value={index} id='companies-menu' key={index}>
    {client.name}
  </option>
))

export default function CampaignFilter() {
  return (
    <div className='dropdown-end dropdown '>
      <label tabIndex={0} className={`${ActionButtonStyle}`}>
        filter
      </label>
      <div
        tabIndex={0}
        className='dropdown-content menu rounded-box mr-4 mt-2 w-auto border-2 border-gray-100 bg-white p-2'>
        <div className='m-4 flex flex-col gap-5'>
          <div className='flex flex-row gap-2'>{buttons}</div>
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
              {clients}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
