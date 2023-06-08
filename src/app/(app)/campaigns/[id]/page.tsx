import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CamapignsService } from '@/services/CampaignsService'
import ButtonsGroupTabs from '@/components/buttonsGroupTabs'
import prisma from '@/lib/prisma'
import { ptMono } from '@/app/fonts'
import CampaingsTabs from '@/components/tabs/CampaingTabs'

export const dynamic = 'force-dynamic'

export default async function CampaignPage({
  params,
}: {
  params: { id: number }
}) {
  const { id } = params

  const session = await getServerSession(authOptions)

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  })

  const CampaignsService = new CamapignsService(currentUser!.id)

  try {
    const campaign = await CampaignsService.findUnique(id)

    return (
      <div className='flex flex-col items-center justify-center'>
        <div className='w-full pt-20 '>
          <div className='mx-auto mb-8 w-full justify-between px-4 md:px-12'>
            <div className='w-full'>
              <h3
                className={`pb-8 align-middle text-3xl font-semibold text-gray-800 `}>
                {campaign?.name}
              </h3>

              <div className={`flex items-center justify-between`}>
                <label
                  className={`rounded-full bg-background px-8 py-1 text-sm text-black ${ptMono.className}`}>
                  {campaign?.client?.name}
                </label>
              </div>
            </div>
          </div>
          <div className='divider' />
        </div>
        <CampaingsTabs campaign={campaign} />
      </div>
    )
  } catch (err: any) {
    return <div className='text-center'>404 {err.message}</div>
  }
}
