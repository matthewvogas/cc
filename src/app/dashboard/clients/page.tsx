import { getServerSession } from 'next-auth'
import { ClientsService } from '@/services/ClientsServices'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ClientsDashBoard from '@/components/dashboards/agency/ClientsDashBoard'

export const dynamic = 'force-dynamic'

export default async function clients() {
  const session = await getServerSession(authOptions)
  const clients = await ClientsService.findMany(session!.user.id)
  

  return <ClientsDashBoard clientsFallback={clients} />
}
