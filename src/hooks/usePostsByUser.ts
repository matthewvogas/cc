import useSWR from 'swr'
import { fetcher } from '@/lib/Utils'

export default function usePosts(
  UserId: string,
  page: number,
  limit: number = 1,
  fallbackData?: any,
) {
  const offset = (page - 1) * limit

  const { data, error, mutate, isLoading } = useSWR(
    `/api/posts?userId=${UserId}&limit=${limit}&offset=${offset}`,
    fetcher,
    { fallbackData: fallbackData || [] },
  )

  console.log(data)
  return {
    posts: data || [],
    arePostsLoading: isLoading,
    postsError: error,
    hasMore: data?.hasMore,
    refreshPosts: mutate,
  }
}
