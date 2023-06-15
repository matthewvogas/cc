import PostCard from '@/components/postCard'
import OverviewCampaign from '@/components/overviewCampaign'
import db from '@/lib/db'
import { post } from '@prisma/client'

export default async function shareCampaign({
  params,
}: {
  params: { id: number }
}) {
  const { id } = params

  const campaign = await db.campaign.findUnique({
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
    <div className='flex flex-col items-center justify-center'>
      <div className='w-full pt-20 '>
        <div className='mx-auto mb-8 w-full justify-between px-4 md:px-12'>
          <div className='w-full'>
            <h3
              className={`pb-8 align-middle text-3xl font-semibold text-gray-800 `}>
              {campaign!.name}
            </h3>
          </div>
        </div>
        <div className='divider' />
      </div>

      <div className='pt-6'>
        {/* llamar la info de la campaign con el id especifico */}

        <OverviewCampaign
          brief={campaign!.description}
          creators={1}
          content={campaign!._count.posts}
          audience={1}
          plays={1}
        />

        <div className='pt-6'>
          <div className='ml-12 flex flex-wrap gap-x-6 gap-y-8'>
            {campaign!.posts.map((post: post, index: any) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
      </div>

      {/* <CampaingsTabs campaign={campaign} /> */}
    </div>
  )
}
