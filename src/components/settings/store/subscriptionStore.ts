import { create } from 'zustand'

interface SubscriptionStore {
  yesPlan: string
  setYesPlan: (yesPlan: string) => void
  absolutelyPlan: string
  setAbsolutelyPlan: (absolutelyPlan: string) => void
}

export const useSubscriptionStore = create<SubscriptionStore>(set => ({
  yesPlan: 'price_1OAFFmDud2nVdnbnrrdKcgTK',
  setYesPlan: yesPlan => set({ yesPlan }),
  absolutelyPlan: 'price_1OAFKVDud2nVdnbn7WTBDc5U',
  setAbsolutelyPlan: absolutelyPlan => set({ absolutelyPlan }),
}))
