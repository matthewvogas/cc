import { fetcher } from '@/lib/Utils'
import useSWR from 'swr'

export default function usePosts(UserId: string, fallbackData?: any) {
  const { data, error, mutate, isLoading } = useSWR(
    `/api/posts?userId=${UserId}`,
    fetcher,
    {
      fallbackData: fallbackData || [],
    },
  )

  return {
    posts: data,
    arePostsLoading: isLoading,
    postsError: error,
    refreshPosts: mutate,
  }
}
