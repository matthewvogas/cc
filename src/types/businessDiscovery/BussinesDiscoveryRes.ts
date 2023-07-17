export interface BussinesDiscoveryRes {
  business_discovery?: BusinessDiscovery
  id?: string
}

export interface BusinessDiscovery {
  followers_count?: number
  username?: string
  name?: string
  profile_picture_url?: string
  media_count?: number
  media?: Media
  id?: string
}

export interface Media {
  data?: Datum[]
  paging?: Paging
}

export interface Datum {
  caption?: string
  media_url?: string
  permalink?: string
  id?: string
  comments_count?: number
  like_count?: number
}

export interface Paging {
  cursors?: Cursors
}

export interface Cursors {
  after?: string
}
