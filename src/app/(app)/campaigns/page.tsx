import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import CampaignsDashBoard from '@/components/dashboards/CampaignsDashBoard'
import { CamapignsService } from '@/services/CampaignsService'
import { getServerSession } from 'next-auth'

export default async function CampaignPage() {
  const session = await getServerSession(authOptions)

  const CampaignsService = new CamapignsService(session!.user.id)

  const XDD = await CampaignsService.findMany()

  return <CampaignsDashBoard campaigns={XDD} />
}
