export interface CreatorsByCampaignRes {
  id: number
  name: null
  uuid: string
  imageUrl: null
  username: string
  platform: string
  followersCount: number
  accessToken: string
  refreshToken: null
  createdAt: Date
  updatedAt: Date
  _count: Count
}

export interface Count {
  posts: number
}
