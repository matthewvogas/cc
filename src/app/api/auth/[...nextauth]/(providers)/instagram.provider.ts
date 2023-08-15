import S3Service from '@/lib/S3Service'
import { TokenSet } from 'next-auth'
import { OAuthConfig, OAuthUserConfig } from 'next-auth/providers'
import { FacebookProfile } from 'next-auth/providers/facebook'

export default function Instagram<P extends FacebookProfile>(
  options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: 'instagram',
    name: 'instagram',
    type: 'oauth',
    allowDangerousEmailAccountLinking: true,
    token: {
      async request({ checks, client, params, provider }) {
        const res = await fetch(
          `https://graph.facebook.com/${process.env.FACEBOOK_GRAPH_VERSION}/oauth/access_token?client_id=${provider.clientId}&client_secret=${provider.clientSecret}&redirect_uri=${provider.callbackUrl}&code=${params.code}`,
        ).then(res => res.json())

        const longToken = await fetch(
          `https://graph.facebook.com/${process.env.FACEBOOK_GRAPH_VERSION}/oauth/access_token?grant_type=fb_exchange_token&client_id=${provider.clientId}&client_secret=${provider.clientSecret}&fb_exchange_token=${res.access_token}`,
        ).then(res => res.json())
        const tokens: TokenSet = {
          access_token: longToken.access_token,
          token_type: longToken.token_type,
          expires_in: longToken.expires_in,
        }

        return {
          tokens,
        }
      },
    },
    authorization: {
      url: `https://www.facebook.com/${process.env.FACEBOOK_GRAPH_VERSION}/dialog/oauth`,
      params: {
        scope:
          'email,instagram_basic,instagram_manage_insights,pages_read_engagement,pages_read_engagement,pages_show_list,read_insights,business_management',
      },
    },
    userinfo: {
      url: `https://graph.facebook.com/${process.env.FACEBOOK_GRAPH_VERSION}/me/?fields=name,email,picture,accounts{instagram_business_account{id}}`,
      async request({ client, provider, tokens }) {
        const res: any = await client.userinfo(tokens.access_token!)
        const id = res.accounts?.data[0].instagram_business_account?.id ?? null
        if (!id)
          throw new Error(
            'You need to have a instagram account connected to a facebook page',
          )
        const instagramRes = await fetch(
          `https://graph.facebook.com/v17.0/${id}/?fields=username,profile_picture_url,followers_count&access_token=${tokens.access_token}`,
        ).then(res => res.json())

        let avatar_url = res.picture?.data.url
        const instagramProfilePic = await fetch(
          instagramRes.profile_picture_url,
        ).then(res => res.blob())
        const url = await S3Service.uploadObject(
          instagramProfilePic,
          id,
          'instagram',
          'creators',
        )
        avatar_url = url
        // console.log(res)
        // console.log(tokens)
        return {
          name: res.name ?? null,
          image: avatar_url ?? null,
          id: id ?? null,
          username: instagramRes?.username ?? null,
          follower_count: instagramRes?.followers_count ?? null,
          email: res.email ?? null,
        }
      },
    },
    async profile(profile, tokens) {
      return {
        id: profile?.id ?? null,
        email: profile?.email ?? null,
        image: profile?.image ?? null,
        name: profile?.name ?? null,
      }
    },
    options,
  }
}
