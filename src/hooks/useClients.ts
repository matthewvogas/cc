import { fetcher } from '@/lib/Utils'
import useSWR from 'swr'

export default function useClients(limit: number, offset: number) {
  const { data, error, mutate, isLoading } = useSWR(
    `/api/clients?limit=${limit}&offset=${offset}`,
    fetcher,
  )

  return {
    data: data,
    areClientsLoading: isLoading,
    clientsError: error,
    refreshClients: mutate,
  }
}
