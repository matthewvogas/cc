import db from '@/lib/db'
import { SharedPost } from './sharedPost'

// Aquí se debe enviar la data correcta del post

export default async function sharePost({
  params,
}: {
  params: { id: number }
}) {
  const { id } = params

  const post: any = await db.post.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return (
    <div>
      <SharedPost post={post} id={id} />
    </div>
  )
}
