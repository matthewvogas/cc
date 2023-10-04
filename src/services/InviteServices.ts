import db from '@/lib/db'
export class InviteService {
  static async getPendingInvitationsbyUserId(userId: string) {
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

  static async getPendingInvitationsbyCreatorId(userId: string) {
    const invitations = await db.invite.findMany({
      where: {
        receiverId: userId,
        status: 'PENDING',
      },
      include: {
        sender: true,
        receiver: true,
      },
    })

    return invitations
  }
}
