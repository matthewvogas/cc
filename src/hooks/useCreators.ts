import { fetcher } from '@/lib/Utils'
import useSWR from 'swr'

export default function useCreators(fallbackData?: any) {
  const { data, error, mutate, isLoading } = useSWR('/api/creators', fetcher, {
    fallbackData: fallbackData || [],
  })

  return {
    creators: data,
    areCreatorsLoading: isLoading,
    creatorsError: error,
    refreshCreators: mutate,
  }
}
