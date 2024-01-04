import useSWR from 'swr'
import { fetcher } from '@/lib/Utils'

export default function useCreators(
  limit: number,
  offset: number,
  socialActiveFilters: string[],
  followerCountFilterFirst: number,
  followerCountFilterSecond: number,
  selectedCampaign: string
) {

  const socialActives = socialActiveFilters ? socialActiveFilters.join(',') : ''

  let params = new URLSearchParams()
  params.set('limit', limit.toString())
  params.set('offset', offset.toString())
  params.set('socials', socialActives)
  params.set('followers1', followerCountFilterFirst.toString())
  params.set('followers2', followerCountFilterSecond.toString())
  params.set('campaign', selectedCampaign)

  const { data, error, mutate, isLoading } = useSWR(
    `/api/creators?${params.toString()}`,
    fetcher,
    {},
  )

  return {
    data: data,
    areCreatorsLoading: isLoading,
    creatorsError: error,
    refreshCreators: mutate,
  }
}
