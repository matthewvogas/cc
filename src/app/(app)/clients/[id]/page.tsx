import ButtonGroup from '@/components/buttonsGroup'
import CreatorCard from '@/components/postCard'
import OverviewCampaign from '@/components/overviewCampaign'
import TitleSingleClient from '@/components/titleSingleClient'
import ClientStat from '@/components/clientStat'
import FilterCreators from '@/components/filtersCreators'
import CreatorRow from '@/components/creatorRow'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { ClientsService } from '@/services/ClientsServices'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function CampaignPage({
  params,
}: {
  params: { id: number }
}) {
  const session = await getServerSession(authOptions)
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  })

  const clientsService = new ClientsService(currentUser!.id)
  const client = await clientsService.findUnique(params.id)

  return (
    <div className='flex flex-col justify-start '>
      <TitleSingleClient title={client.name} />
      <p className=' mb-4 px-12 italic'>stats et glance</p>
      <div className='flex w-full gap-4 px-12 '>
        <p className={`w-44 rounded-lg bg-green-50 px-6 py-4`}>
          {'🥥'} {client._count.campaigns} {'Campaign(s)'}
        </p>
      </div>
    </div>
  )
}
