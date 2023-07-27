'use client'

const ActionButtonStyle =
  'flex text-lg flex items-center  border-2 inline-block py-2.5 px-8 mx-2 text-back h-12 font-medium rounded-full  hover:bg-rose-100 cursor-pointer '

type Props = {
  list: any
  setSort: React.Dispatch<React.SetStateAction<string>>
}

export default function HeadFilter({ list, setSort }: Props) {
  return (
    <div className='dropdown-end dropdown '>
      <label tabIndex={0} className={`${ActionButtonStyle}`}>
        filter
      </label>
      <div
        tabIndex={0}
        className='dropdown-content menu rounded-box mr-4 mt-2 w-auto border-2 border-gray-100 bg-white p-2'>
        <div className='m-4 flex flex-col gap-5'>
          <div className='flex flex-row gap-2'>
            <button
              onClick={() => setSort('newest')}
              className=' rounded-full bg-beigeFirst px-6 py-2.5  hover:bg-beigeSelected focus:bg-beigeSelected'>
              newest
            </button>
            <button
              onClick={() => setSort('oldest')}
              className=' rounded-full bg-beigeFirst px-6 py-2.5  hover:bg-beigeSelected focus:bg-beigeSelected'>
              oldest
            </button>
          </div>
          {/* <div className='w-full'>
            <label className='' htmlFor=''>
              Client or Campaign
            </label>
            <select
              id='countries'
              className='mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-rose-400 focus:ring-rose-300 '>
              <option value={0} disabled>
                Choose a client
              </option>
              {list.map((item: any, index: number) => (
                < option value={index} id='companies-menu' key={index} >
                  {item.name}
                </option>
              ))}
            </select>
          </div> */}
        </div>
      </div>
    </div>
  )
}
