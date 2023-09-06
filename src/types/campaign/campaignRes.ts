import { Story } from '@prisma/client'

export interface CampaignRes {
  id?: number
  name?: string
  description?: string
  createdAt?: Date
  updatedAt?: Date
  clientId?: number
  userId?: string
  client?: Client
  posts?: Post[]
  stories?: Story[]
  creators?: Creator[]
  _count?: Count
  stats?: Stats
}

export interface Count {
  creators?: number
  posts?: number
}

export interface Client {
  id?: number
  name?: string
  imageUrl?: string
  email?: string
  phone?: string
  userId?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Post {
  id?: number
  userId?: string
  platform?: string
  campaignId?: number
  creatorId?: number
  caption?: string
  permalink?: string
  shortcode?: string
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
  name?: null
  uuid?: string
  status?: string
  imageUrl?: string
  username?: string
  platform?: string
  followersCount?: number
  accessToken?: string
  refreshToken?: null
  createdAt?: Date
  updatedAt?: Date
}

export interface Stats {
  likesCount?: number
  commentsCount?: number
  engagementCount?: number
  impressionsCount?: number
  playsCount?: number
  savesCount?: number
  sharesCount?: number
}
