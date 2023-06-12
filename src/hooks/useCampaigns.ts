import useSWR from 'swr'

export default function useCampaigns(fallbackData: any) {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then(res => res.json())
  const { data, error, mutate, isLoading } = useSWR('/api/campaigns', fetcher, {
    fallbackData,
  })

  return {
    campaigns: data,
    areCampaignsLoading: isLoading,
    campaignsError: error,
    refreshCampaigns: mutate,
  }
}
