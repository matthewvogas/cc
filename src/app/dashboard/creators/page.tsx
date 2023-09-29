// 'use client'
import React from 'react'
import { CreatorsService } from '@/services/CreatorsService'
import { CampaignsService } from '@/services/CampaignsService'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CreatorsByCampaignRes } from '@/types/creators/CreatorsByCampaignRes'
import { CampaignRes } from '@/types/campaign/campaignRes'
import CreatorsDashBoard from '@/components/dashboards/agency/CreatorsDashboard'
import { ConnectionService } from '@/services/ConnectionService'
import { UserService } from '@/services/UsersService'

export const dynamic = 'force-dynamic'

export default async function Creators() {
  const session = await getServerSession(authOptions)

  const UserCreators = (await UserService.findManyCreators())

  const connections = await ConnectionService.findManyByUserId(session!.user.id)

  const creators = (await CreatorsService.findMany(
    session!.user.id,
  )) as CreatorsByCampaignRes

  const campaigns = (await CampaignsService.findMany(
    session!.user.id,
  )) as CampaignRes

  return (
    <CreatorsDashBoard
      connectionsFallback={connections}
      creatorsFallback={creators}
      campaignsFallback={campaigns}
      userCreatorsFallback={UserCreators}
      session={session}
    />
  )
}
