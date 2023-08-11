import NextAuth from 'next-auth/next'
import type { NextAuthOptions, Profile, TokenSet } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import InstagramProvider from './(providers)/instagram.provider'
import TiktokProvider from './(providers)/tiktok.provider'
import db from '@/lib/db'
import { compare } from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
  // debug: true,
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
      id: 'credentials',
      type: 'credentials',
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
      allowDangerousEmailAccountLinking: true,
    }),
    TiktokProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.TIKTOK_CLIENT_KEY!,
      clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
    }),
    InstagramProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async session({ token, session, newSession, trigger, user }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
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
    async signIn({ user, account, profile, credentials, email }) {
      if (
        account &&
        profile &&
        (account.provider === 'instagram' || account.provider === 'tiktok')
      ) {
        await db.creator.upsert({
          where: {
            username_platform: {
              username: profile?.username!,
              platform: account?.provider,
            },
          },
          update: {
            name: profile?.name,
            username: profile?.username,
            followersCount: profile?.followersCount,
            accessToken: account?.access_token,
            refreshToken: account?.refresh_token,
            platform: account?.provider,
            imageUrl: profile?.image,
            uuid: account?.providerAccountId,
          },
          create: {
            name: profile?.name,
            username: profile?.username!,
            followersCount: profile?.followersCount,
            accessToken: account?.access_token,
            refreshToken: account?.refresh_token,
            platform: account?.provider,
            imageUrl: profile?.image,
            uuid: account?.providerAccountId,
          },
        })
      }
      return true
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
