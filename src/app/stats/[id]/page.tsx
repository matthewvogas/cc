import { CampaignsService } from '@/services/CampaignsService'
import { CreatorsService } from '@/services/CreatorsService'
import { PostsService } from '@/services/PostsSerivce'
import { UserService } from '@/services/UsersService'
import { SharedStat } from './sharedStat'

export default async function shareCampaign({
  params,
}: {
  params: { id: number }
}) {
  const { id } = params
  // Obtener información del usuario
  const getUser = await UserService.findByPosition(id)

  if (!getUser) {
    return (
      <div className='flex justify-center items-center h-screen bg-[#F3F0EC]'>
        <h3 className='text-lg px-6 py-3 bg-[#8a7356] text-white shadow-xl rounded-xl'>
          ¡Hola! Es posible que estas estadísticas no existan, lo siento.
        </h3>
      </div>
    )
  }

  // Obtener información relacionada con el usuario
  const campaigns = await CampaignsService.findMany(getUser.id)
  const creators = await CreatorsService.findMany(getUser.id)
  // const totalViews = await PostsService.findAllViewsFromUser(getUser.id);
  const totalPlays = 300

  const stats = [
    { title: creators.length, description: 'creators' },
    { title: campaigns.length, description: 'campaigns' },
    // { title: totalViews, description: 'views' },
    // { title: totalPlays, description: 'plays' },
  ]

  return (
    <div>
      <SharedStat stats={stats} />
    </div>
  )
}
