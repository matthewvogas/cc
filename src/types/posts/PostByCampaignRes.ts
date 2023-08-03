export interface Posts {
  id?: number
  uuid?: string
  userId?: string
  campaignId?: number
  creatorId?: number
  caption?: string
  permalink?: string
  shortcode?: string
  platform?: string
  imageUrl?: string
  mediaUrl?: string
  commentsCount?: number
  likesCount?: number
  engagementCount?: number
  impressionsCount?: number
  reachCount?: number
  savesCount?: number
  sharesCount?: number
  playsCount?: number
  createdAt?: Date
  updatedAt?: Date
  creator?: Creator
}

export interface Creator {
  id?: number
  name?: string
  uuid?: string
  imageUrl?: string
  status?: string
  username?: string
  platform?: string
  followersCount?: number
  accessToken?: string
  refreshToken?: string
  createdAt?: Date
  updatedAt?: Date
}
