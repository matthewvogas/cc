import { ptMono } from '@/app/fonts'
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

export default function ActionalTitle({ title }: Props) {
  return (
    <div className='w-full '>
      <div className='mx-auto mb-8 w-full justify-between px-4 md:px-14'>
        <div className='mt-8 flex w-full content-center justify-between align-middle'>
          <h3 className={`self-center text-xl font-bold text-gray-800`}>
            {title}
          </h3>
          <div className={`flex items-center justify-between`}>
            {/* <div className={`flex ${ptMono.className}`}>
              <button className={`${ActiveLabel} `}>
                Action Buttons
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
              </label> */
            /* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
