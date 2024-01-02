import InputSearchValue from '@/components/modals/agency/filterBy'
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

  inputSearchValue: string
  setInputSearchValue: (inputSearchValue: string) => void

  inputSearchValueModal: string
  setInputSearchValueModal: (inputSearchValueModal: string) => void

  SecondStep: boolean
  setSecondStep: (SecondStep: boolean) => void
}

export const useAgenciesDashboard = create<AgenciesDashboard>(set => ({
  agenciesSelected: undefined,
  setAgenciesSelected: agenciesSelected => set({ agenciesSelected }),

  tagSelected: '',
  setSearchTags: tagSelected => set({ tagSelected }),

  inputSearchValue: '',
  setInputSearchValue: inputSearchValue => set({ inputSearchValue }),

  inputSearchValueModal: '',
  setInputSearchValueModal: inputSearchValueModal => set({ inputSearchValueModal }),

  SecondStep: false,
  setSecondStep: SecondStep => set({ SecondStep }),
}))
