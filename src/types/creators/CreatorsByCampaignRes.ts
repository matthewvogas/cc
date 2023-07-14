export interface CreatorsByCampaignRes {
  id?: number
  name?: string
  status?: string
  uuid?: string
  imageUrl?: string
  username?: string
  platform?: string
  followersCount?: number
  accessToken?: string
  refreshToken?: string
  createdAt?: Date
  updatedAt?: Date
  _count?: Count
}

export interface Count {
  posts?: number
}
