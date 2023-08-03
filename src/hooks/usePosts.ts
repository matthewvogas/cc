import { fetcher } from '@/utils/ValidationsHelper'
import useSWR from 'swr'

export default function useCampaigns(campaignId: string, fallbackData?: any) {
  const { data, error, mutate, isLoading } = useSWR(
    `/api/posts?campaign=${campaignId}`,
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
