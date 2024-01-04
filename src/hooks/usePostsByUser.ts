import useSWR from 'swr'
import { fetcher } from '@/lib/Utils'

export default function usePosts(
  campaignId: string,
  limit: number,
  offset: number,
  activeSocial: string,
  order?: string,
  performance?: boolean,
  tags?: string[],
  creators?: any[],
) {

  const creatorIdsString = creators ? creators.map(creator => creator.id).join(',') : ''
  const tagsString = tags ? tags.join(',') : ''

  let params = new URLSearchParams()
  params.set('campaignId', campaignId)
  params.set('limit', limit.toString())
  params.set('offset', offset.toString())
  params.set('activeSocial', activeSocial)
  params.set('creators', creatorIdsString)
  params.set('tags', tagsString) 
  params.set('order', order!)
  params.set('performance', performance!.toString())

  const { data, error, mutate, isLoading } = useSWR(
    `/api/posts/agency?${params.toString()}`,
    fetcher,
  )

  return {
    data: data,
    arePostsLoading: isLoading,
    postsError: error,
    refreshPosts: mutate,
  }
}
