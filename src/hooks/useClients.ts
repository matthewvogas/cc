import { fetcher } from '@/utils/ValidationsHelper'
import useSWR from 'swr'

export default function useClients(fallbackData?: any) {
  const { data, error, mutate, isLoading } = useSWR('/api/clients', fetcher, {
    fallbackData: fallbackData || [],
  })

  return {
    clients: data,
    areClientsLoading: isLoading,
    clientsError: error,
    refreshClients: mutate,
  }
}
