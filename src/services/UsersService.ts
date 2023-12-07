import { UserRole } from '@prisma/client'
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

  static async findManyAgencies() {
    const users = await db.user.findMany(
      {
        where: {
          role: 'AGENCY'
        }
      }
    )
    return users
  }

  static async findUnique(id: string) {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }
  static async findUniqueByEmail(email: string) {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  static async findByInstagram(username: string) {
    const user = await db.user.findFirst({
      where: {
        instagramPages : {
          some: {
            username 
          }
        },
      },
    })

    return user
  }

  static async updateRole(id: string, role: UserRole) {
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        role: role
      }
    })

    return updatedUser
  }

  static async delete(id: string) {
    const deletedUser = await db.user.delete({
      where: {
        id,
      },
    })

    return deletedUser
  }
  
}
