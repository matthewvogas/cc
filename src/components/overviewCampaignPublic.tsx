import { inter } from '@/app/fonts'
import { ptMono } from '@/app/fonts'
import ClientStat from './clientStat'
import eye from 'public/assets/shareCampaign/eye.svg'
import caret from 'public/assets/shareCampaign/caret-square-right.svg'
import clone from 'public/assets/shareCampaign/clone.svg'
import user from 'public/assets/shareCampaign/user-alt.svg'

const fallbackDescription =
  'With Rosalind was enlisted to help with the promotion of the LOreal Paris Telescopic Mascara. To achieve this we selected 300 Gen Z, Millennials, Gen X and baby boomers content creators from our platform with a TikTok following of 10k + to take part in this campaign.\n \nIn exchange for gifted product content creator followed the L’Oreal Paris brief, each creating professional content made up of Instagram Re....'

export default function OverviewCampaignPublic(props: {
  creators: number
  content: number
  audience: number
  plays: number
}) {
  return (
    <div
      className={`mb-0 md:mb-4 flex w-full mx-6 md:px-12  ${ptMono.className}`}>
      <div className='flex flex-wrap w-full gap-3 mb-16'>
        <ClientStat
          icon={user}
          value={props.creators || 0}
          text={'creators:'}
        />
        <ClientStat icon={clone} value={props.content || 0} text={'posts:'} />
        <ClientStat icon={eye} value={props.audience || 0} text={'views:'} />
        <ClientStat icon={caret} value={props.plays || 0} text={'plays:'} />
      </div>
    </div>
  )
}
