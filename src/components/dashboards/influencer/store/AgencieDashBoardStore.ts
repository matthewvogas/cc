import { create } from 'zustand'

interface User {
  id: string
  role: string
  name: string
}

interface AgenciesDashboard {
  agenciesSelected: User | undefined
  setAgenciesSelected: (agenciesSelected: User | undefined) => void

  tagSelected: string
  setSearchTags: (tagSelected: string) => void
}

export const useAgenciesDashboard = create<AgenciesDashboard>(set => ({
  agenciesSelected: undefined,
  setAgenciesSelected: agenciesSelected => set({ agenciesSelected }),

  tagSelected: '',
  setSearchTags: tagSelected => set({ tagSelected }),
}))
