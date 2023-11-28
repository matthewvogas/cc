import useSWR from 'swr'
import { fetcher } from '@/lib/Utils'

export default function useConnections(limit: number, offset: number) {
  const { data, error, mutate, isLoading } = useSWR(
    `/api/connections?limit=${limit}&offset=${offset}`,
    fetcher,
    {},
  )

  return {
    data: data,
    areAgenciesLoading: isLoading,
    agenciesError: error,
    refreshAgencies: mutate,
  }
}
