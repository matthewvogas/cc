import { FiPlus, FiRotateCw, FiChevronDown } from 'react-icons/fi'
import AddCampaign from '../modals/agency/addCampaigns'
import AddClients from '../modals/agency/addClients'
import ShareStat from '../modals/agency/shareStats'
import Link from 'next/link'
import SharePortafolio from '../modals/influencer/sharePortafolio'

type Props = {
  userPositionId: any
  title: string
  frome: string
  stats: any
  campaigns: any
  clients: any
}

export default function ActionalTitle({
  userPositionId,
  title,
  frome,
  stats,
  campaigns,
  clients,
}: Props) {
  return (
    <div className='w-full mt-9 pt-8 mb-8 flex content-center justify-between align-middle px-12'>
      <h3
        className={`self-center text-[18px] leading-[1.75rem] font-semibold mt-10 text-gray-800`}>
        {title}
      </h3>
      <div className={`flex items-center justify-between`}>
        <div className={`flex`}>
          {frome == 'stats' ? (
            <ShareStat userPositionId={userPositionId} stats={stats} />
          ) : null}
          {frome == 'clients' ? (
            <AddClients
              campaignsFallback={campaigns}
              clientsFallback={clients}
              text={'create new'}
              icon={
                <FiPlus
                  style={{
                    color: '#00000080',
                    fontSize: '1.2em',
                    marginLeft: '12px',
                  }}
                />
              }
            />
          ) : null}

          {frome == 'campaigns' ? (
            <AddCampaign
              campaignsFallback={campaigns}
              clientsFallback={clients}
              text={'create new'}
              icon={
                <FiPlus
                  style={{
                    color: '#00000080',
                    fontSize: '1.2em',
                    marginLeft: '12px',
                  }}
                />
              }
            />
          ) : null}

          {frome == 'statsCreators' ? (
            <SharePortafolio userPositionId={userPositionId} stats={stats} />
          ) : null}

          <Link
            href={`/dashboard/${frome}`}
            className={`flex items-center bg-transparent border border-black mx-2 px-9 py-3 rounded-full text-black text-lg`}>
            {frome == 'stats' ? 'go to reports' : ''}
            {frome == 'campaigns' ? 'view all' : ''}
            {frome == 'campaignsInfluencer' ? 'view all' : ''}
            {frome === 'statsCreators' ? 'view portafolio' : ''}
            {frome === 'agencies' ? 'view all' : ''}
          </Link>
        </div>
      </div>
    </div>
  )
}
