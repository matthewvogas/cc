import { create } from 'zustand'

// const [tags, setTags] = useState<string[]>([])

interface AgencyCard {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void

  editClientModal: boolean
  setEditClientModal: (editClientModal: boolean) => void

  tags: string[]
  setTags: (tags: string[]) => void
}

export const useAgencyStore = create<AgencyCard>(set => ({
  isOpen: false,
  setIsOpen: isOpen => set({ isOpen }),

  editClientModal: false,
  setEditClientModal: editClientModal => set({ editClientModal }),

  tags: [],
  setTags: tags => set({ tags }),
}))
