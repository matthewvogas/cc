import { fetcher } from '@/lib/Utils'
import useSWR from 'swr'


export default function useCampaigns(
  limit: number,
  offset: number,
  ) {
  const { data, error, mutate, isLoading } = useSWR(`/api/campaigns?limit=${limit}&offset=${offset}`, fetcher,)

  return {
    data: data,
    areCampaignsLoading: isLoading,
    campaignsError: error,
    refreshCampaigns: mutate,
  }
}
