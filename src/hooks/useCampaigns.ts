import { fetcher } from '@/lib/Utils'
import useSWR from 'swr'

export default function useCampaigns(fallbackData?: any) {
  const { data, error, mutate, isLoading } = useSWR('/api/campaigns', fetcher, {
    fallbackData: fallbackData || [],
  })

  return {
    campaigns: data,
    areCampaignsLoading: isLoading,
    campaignsError: error,
    refreshCampaigns: mutate,
  }
}
