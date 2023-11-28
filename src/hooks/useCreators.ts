import useSWR from 'swr'
import { fetcher } from '@/lib/Utils'

export default function useCreators(limit: number, offset: number) {
  const { data, error, mutate, isLoading } = useSWR(
    `/api/creators?limit=${limit}&offset=${offset}`,
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
