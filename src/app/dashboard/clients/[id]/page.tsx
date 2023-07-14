import PostCard from '@/components/postCard'
import OverviewCampaign from '@/components/overviewCampaign'
import TitleSingleClient from '@/components/titleSingleClient'
import ClientStat from '@/components/clientStat'
import FilterCreators from '@/components/filtersCreators'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { ClientsService } from '@/services/ClientsServices'
export const dynamic = 'force-dynamic'

export default async function CampaignPage({
  params,
}: {
  params: { id: number }
}) {
  const session = await getServerSession(authOptions)
  const client = await ClientsService.findUnique(params.id)

  return (
    <div className='flex flex-col justify-start '>
      <TitleSingleClient title={client?.name || 'xd'} tags={client?.tags} />
      <p className=' mb-4 px-12 italic'>stats et glance</p>
      <div className='flex w-full gap-4 px-12 '>
        <p className={`w-50 rounded-lg bg-green-50 px-6 py-4`}>
          {`🥥  ${client?._count.campaigns} campaign(s)`}
        </p>
        <p className={`w-50 rounded-lg bg-green-50 px-6 py-4`}>
          {`👩‍🎓  ${client?._count.creators} creators(s)`}
        </p>
      </div>
    </div>
  )
}
