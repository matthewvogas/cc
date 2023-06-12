import useSWR from 'swr'

export default function useClients(fallbackData: any) {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then(res => res.json())
  const { data, error, mutate, isLoading } = useSWR('/api/clients', fetcher, {
    fallbackData,
  })

  return {
    clients: data,
    areClientsLoading: isLoading,
    clientsError: error,
    refreshClients: mutate,
  }
}
