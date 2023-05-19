import { PT_Mono } from 'next/font/google'
import AddNewCampaign from './addNewCampaign'
import CampaignFilter from './campaignFilter'

// Fonts
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

// Style Variables
const ActionButtonStyle =
  'flex text-sm  border-rose-100 border-2 inline-block py-2.5 px-8 mx-2 text-back font-medium bg-transparent rounded-full  hover:bg-rose-100 '
const ActiveLabel = 'bg-active px-8 mx-2 py-3 rounded-full text-black text-sm'
const InActiveLabel =
  'bg-inactive px-8 mx-2 py-3 rounded-full text-black text-sm'

type Props = {
  title: string
  onSubmit: any
}

export default function TitlePage({ title }: Props) {
  return (
    <div className='w-full pt-20 '>
      <div className='mx-auto mb-8 w-full justify-between px-4 md:px-12'>
        <div className='w-full'>
          <h3
            className={`pb-8 align-middle text-2xl font-semibold text-gray-800 `}>
            {title}
          </h3>

          <div className={`flex items-center justify-between`}>
            <label
              className={`rounded-full bg-background px-8 py-1 text-sm text-black ${ptMono.className}`}>
              Client Name
            </label>
            <div className={`flex ${ptMono.className}`}>
              <CampaignFilter />
              <button className={`${ActionButtonStyle} `}>
                view as client
              </button>
              <AddNewCampaign />

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
