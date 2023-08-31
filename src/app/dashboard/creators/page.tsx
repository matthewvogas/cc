// 'use client'
import React from 'react'
import { CreatorsService } from '@/services/CreatorsService'
import { CampaignsService } from '@/services/CampaignsService'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CreatorsByCampaignRes } from '@/types/creators/CreatorsByCampaignRes'
import { CampaignRes } from '@/types/campaign/campaignRes'
import CreatorsDashBoard from '@/components/dashboards/CreatorsDashboard'

export const dynamic = 'force-dynamic'

export default async function Creators() {
  const session = await getServerSession(authOptions)

  const creators = (await CreatorsService.findMany(
    session!.user.id,
  )) as CreatorsByCampaignRes

  const campaigns = (await CampaignsService.findMany(
    session!.user.id,
  )) as CampaignRes

  return (
    <CreatorsDashBoard
      creatorsFallback={creators}
      campaignsFallback={campaigns}
    />
  )
}
