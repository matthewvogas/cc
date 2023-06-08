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

  return (
    <div className='flex flex-col justify-start '>
      <TitleSingleClient title={`Revolve Clothing`} onSubmit={undefined} />
      <p className=' mb-4 px-12 italic'>stats et glance</p>
      <div className='flex w-full gap-4 px-12 '>
        <ClientStat />
        <ClientStat />
        <ClientStat />
      </div>
      <FilterCreators />
      <CreatorRow />
    </div>
  )
}
