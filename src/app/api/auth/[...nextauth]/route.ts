import NextAuth from 'next-auth/next'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import InstagramProvider from 'next-auth/providers/instagram'
import FacebookProvider from 'next-auth/providers/facebook'
import db from '@/lib/db'
import { compare } from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: 'hello@example.com',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) return null

        const isPasswordValid = await compare(
          credentials.password,
          user.password!,
        )

        if (!isPasswordValid) return null

        return {
          ...user,
          id: user.id.toString(),
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    // InstagramProvider({
    //   clientId: process.env.INSTAGRAM_CLIENT_ID!,
    //   clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!
    // }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            'instagram_basic,instagram_manage_insights,pages_show_list,read_insights',
        },
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
  // callbacks: {
  //   session: ({ session, token }) => {
  //     // console.log('Session Callback', { session, token })
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         id: token.id as number,
  //         randomKey: token.randomKey,
  //       },
  //     }
  //   },
  //   jwt: ({ token, user }) => {
  //     // console.log('JWT Callback', { token, user })
  //     if (user) {
  //       const u = user as any
  //       return {
  //         ...token,
  //         id: u.id as number,
  //         randomKey: u.randomKey,
  //       }
  //     }
  //     return token
  //   },
  // },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
