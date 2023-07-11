import { inter } from '@/app/fonts'
import { ptMono } from '@/app/fonts'
import ClientStat from './clientStat'

const fallbackDescription =
  'With Rosalind was enlisted to help with the promotion of the LOreal Paris Telescopic Mascara. To achieve this we selected 300 Gen Z, Millennials, Gen X and baby boomers content creators from our platform with a TikTok following of 10k + to take part in this campaign.\n \nIn exchange for gifted product content creator followed the L’Oreal Paris brief, each creating professional content made up of Instagram Re....'

export default function OverviewCampaignPublic(props: {
  creators: number
  content: number
  audience: number
  plays: number
}) {
  return (
    <div className={`mb-4 flex w-full md:px-12 ${ptMono.className}`}>
      <div className='flex w-full gap-5'>
        <ClientStat
          icon={'👤'}
          value={props.creators || 100}
          text={'creators:'}
        />
        <ClientStat icon={'👤'} value={props.content || 100} text={'posts'} />
        <ClientStat icon={'👤'} value={props.audience || 100} text={'views'} />
        <ClientStat icon={'👤'} value={props.plays || 100} text={'plays'} />
      </div>
    </div>
  )
}
