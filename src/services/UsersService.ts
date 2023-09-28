import db from '@/lib/db'

export class UserService {
  static async findByPosition(position: number) {
    const users = await db.user.findMany()

    return users[position]
  }

  static async findPositionById(id: string) {
    const users = await db.user.findMany()

    const position = users.findIndex(user => user.id === id)

    return position
  }

  static async findManyCreators() {
    const users = await db.user.findMany(
      {
        where: {
          role: 'CREATOR'
        }
      }
    )


    return users
  }


}
