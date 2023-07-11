import db from '@/lib/db'
import { SharedCampaign } from './sharedCampaign'

export default async function shareCampaign({
  params,
}: {
  params: { id: number }
}) {
  const { id } = params

  const campaign: any = await db.campaign.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      name: true,
      client: true,
      createdAt: true,
      creators: true,
      description: true,
      updatedAt: true,
      user: true,
      posts: true,
      _count: {
        select: {
          creators: true,
          posts: true,
        },
      },
    },
  })

  return (
    <div>
      <SharedCampaign campaign={campaign} id={id}></SharedCampaign>
    </div>
  )
}
