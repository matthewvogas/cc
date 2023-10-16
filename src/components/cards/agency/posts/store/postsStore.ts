import { create } from 'zustand'

interface PostStore {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  codeToCopy: string
  setCodeToCopy: (codeToCopy: string) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const usePostStore = create<PostStore>(set => ({
  isOpen: false,
  setIsOpen: isOpen => set({ isOpen }),
  codeToCopy: '',
  setCodeToCopy: codeToCopy => set({ codeToCopy }),
  loading: false,
  setLoading: loading => set({ loading }),
}))
