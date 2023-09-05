import { fetcher } from '@/lib/Utils'
import useSWR from 'swr'

export default function useStories(campaignId: string, fallbackData?: any) {
  const { data, error, mutate, isLoading } = useSWR(
    `/api/stories?campaign=${campaignId}`,
    fetcher,
    {
      fallbackData: fallbackData || [],
    },
  )

  return {
    stories: data,
    areStoriesLoading: isLoading,
    storiesError: error,
    refreshPosts: mutate,
  }
}
