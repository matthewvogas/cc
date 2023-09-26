import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { ConnectionService } from '@/services/ConnectionService'

export const dynamic = 'force-dynamic'

export default async function Connection() {
  const session = await getServerSession(authOptions)

  const connections = await ConnectionService.findManyByUserId(
    String(session?.user.id),
  )
  const connection = await ConnectionService.findUnique('0')

  return (
    <div>
      CONEXION
      <p>DE {connection?.userId2}</p>
      <p>PARA {session?.user.id}</p>
      {connections.map((connection: any, index: number) => (
        <div className=' z-10' key={index}>
          TOKEN DE {session?.user.id} :{' '}
          {connection.user2.socialConnections[0].token}
        </div>
      ))}
    </div>
  )
}
