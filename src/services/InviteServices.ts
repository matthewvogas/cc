import db from '@/lib/db'
export class InviteService {
  static async getPendingInvitationsbSenderId(userId: string) {
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

  static async getPendingInvitationsbyReceiverId(userId: string) {
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
