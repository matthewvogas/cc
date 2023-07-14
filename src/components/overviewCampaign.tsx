import { inter } from '@/app/fonts'
import { ptMono } from '@/app/fonts'

const fallbackDescription =
  'With Rosalind was enlisted to help with the promotion of the LOreal Paris Telescopic Mascara. To achieve this we selected 300 Gen Z, Millennials, Gen X and baby boomers content creators from our platform with a TikTok following of 10k + to take part in this campaign.\n \nIn exchange for gifted product content creator followed the L’Oreal Paris brief, each creating professional content made up of Instagram Re....'

export default function OverviewCampaign(props: {
  brief: string
  creators: number
  content: number
  audience: number
  plays: number
}) {
  return (
    <div className={`mb-4 flex w-full md:px-12 ${ptMono.className}`}>
      <div className='w-full'>
        <h4 className={`text-xm mb-4 ${inter.className}`}>Campaign brief</h4>
        <textarea
          readOnly
          value={props.brief || fallbackDescription}
          id='message'
          className={`${inter.className} block h-52 w-full rounded-lg border border-gray-300 bg-gray-50 p-8 text-sm text-gray-500 focus:border focus:border-gray-400 focus:outline-0`}
          placeholder='Brief of the campaign...'
        />
      </div>
      <div className='ml-8 w-full'>
        <h4 className={`text-xm mb-4 ml-4 ${inter.className}`}>Results</h4>
        <div className='m-4 flex'>
          <span className='rounded-full bg-normalRose px-6 py-2 '>
            Creators: {props.creators || 100}
          </span>
        </div>
        <div className='m-4 flex'>
          <span className='rounded-full bg-normalRose px-6 py-2 '>
            Content: {props.content || 100}
          </span>
        </div>
        <div className='m-4 flex'>
          <span className='rounded-full bg-normalRose px-6 py-2 '>
            Audience: {props.audience || 100}
          </span>
        </div>
        <div className='m-4 flex'>
          <span className='rounded-full bg-normalRose px-6 py-2 '>
            Plays: {props.plays || 100}
          </span>
        </div>
      </div>
    </div>
  )
}
