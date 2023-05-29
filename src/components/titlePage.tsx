import { ptMono } from '@/app/fonts'
import AddNewCampaign from './addNewCampaign'
import CampaignFilter from './campaignFilter'

// Fonts

// Style Variables
const ActionButtonStyle =
  'flex text-lg   border-rose-100 border-2 inline-block py-2.5 px-8 mx-2 text-back font-medium bg-transparent rounded-full  hover:bg-rose-100 '
const ActiveLabel =
  'flex items-center bg-active px-8 mx-2 py-3 rounded-full text-black text-lg '
const InActiveLabel =
  'bg-inactive px-8 mx-2 py-3 rounded-full text-black text-lg '

type Props = {
  title: string
}

export default function TitlePage({ title }: Props) {
  return (
    <div className='w-full pt-20 '>
      <div className='mx-auto mb-8 w-full justify-between px-4 md:px-12'>
        <div className='w-full'>
          <h3
            className={`pb-8 align-middle text-3xl font-semibold text-gray-800 `}>
            {title}
          </h3>

          <div className={`flex items-center justify-between`}>
            <label
              className={`rounded-full bg-background px-8 py-1 text-sm text-black ${ptMono.className}`}>
              Client Name
            </label>
            <div className={`flex ${ptMono.className}`}>
              <CampaignFilter />
              <AddNewCampaign />
              <button className={`${ActiveLabel} `}>
                add a client
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='ml-4 inline h-4 w-4'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 4.5v15m7.5-7.5h-15'
                  />
                </svg>
              </button>

              {/* <label className={`${ActiveLabel}`}>
                active
              </label>
              <label className={`${InActiveLabel}`}>
                Inactive
              </label> */}
            </div>
          </div>
        </div>
      </div>
      <div className='divider' />
    </div>
  )
}
