import useSWR from 'swr'
import { fetcher } from '@/lib/Utils'

export default function usePosts(
  campaignId: string,
  limit: number,
  offset: number,
  activeSocial: string,
) {
  const { data, error, mutate, isLoading } = useSWR(
    `/api/posts/agency?campaignId=${campaignId}&limit=${limit}&offset=${offset}&activeSocial=${activeSocial}`,
    fetcher,
  )

  return {
    data: data,
    arePostsLoading: isLoading,
    postsError: error,
    refreshPosts: mutate,
  }
}
