import db from '@/lib/db'

export async function getPendingInvitationsbyUserId(userId: string) {
  const invitations = await db.invite.findMany({
    where: {
      senderId: userId,
      status: 'PENDING',
    },
    include: {
      sender: true,
      receiver: true,
    },
  })

  return invitations
}
