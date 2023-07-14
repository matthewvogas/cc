import NextAuth from 'next-auth/next'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import FacebookProvider from 'next-auth/providers/facebook'
import InstagramProvider from 'next-auth/providers/instagram'
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
    {
      id: 'tiktok',
      name: 'tiktok',
      type: 'oauth',
      clientId: process.env.TIKTOK_CLIENT_ID!,
      clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
      authorization: {
        url: 'https://www.tiktok.com/v2/auth/authorize',
        params: {
          scope: 'user.info.basic,video.list',
          client_key: process.env.TIKTOK_CLIENT_KEY,
          response_type: 'code',
          client_id: process.env.TIKTOK_CLIENT_ID,
        },
      },
      token: {
        async request({ checks, client, params, provider }) {
          const data = await client.grant({
            code: params.code,
            redirect_uri: provider.callbackUrl,
            params,
            grant_type: 'authorization_code',
            client_key: process.env.TIKTOK_CLIENT_KEY,
            client_secret: process.env.TIKTOK_CLIENT_SECRET,
            code_verifier: checks.code_verifier,
          })
          console.log(data)
          return {
            tokens: {
              access_token: data.access_token,
              refresh_token: data.refresh_token,
              token_type: data.token_type,
              expires_in: data.expires_in,
              expires_at: data.expires_at,
              id_token: data.id_token,
              scope: data.scope,
              session_state: data.session_state,
            }
          }
        },
        url: 'https://open.tiktokapis.com/v2/oauth/token',
        params: {
          client_key: process.env.TIKTOK_CLIENT_KEY,
          client_secret: process.env.TIKTOK_CLIENT_SECRET,
          grant_type: 'client_credentials',
          client_id: process.env.TIKTOK_CLIENT_ID,
        },
      },
      userinfo: 'https://open.tiktokapis.com/v2/user/info',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.kakao_account?.profile.nickname,
          email: profile.kakao_account?.email,
          image: profile.kakao_account?.profile.profile_image_url,
        }
      },
    },
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            'email,instagram_basic,instagram_manage_insights,read_insights,pages_show_list',
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
    async signIn({ user, account, profile, credentials, email }) {
      console.log('user', user)
      console.log('account', account)
      console.log('profile', profile)
      credentials && console.log('credentials', credentials)
      email && console.log('email', email)
      if (account && profile && account.provider === 'facebook') {
        await db.creator.upsert({
          where: {
            uuid: account?.providerAccountId,
          },
          update: {
            name: profile?.name,
            accessToken: account?.access_token,
            refreshToken: account?.refresh_token,
            platform: account?.provider,
            imageUrl: profile?.image,
            uuid: account?.providerAccountId,
          },
          create: {
            name: profile?.name,
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
