import { create } from 'zustand'

interface SubscriptionStore {
  yesPlan: string
  setYesPlan: (yesPlan: string) => void
  absolutelyPlan: string
  setAbsolutelyPlan: (absolutelyPlan: string) => void
}

export const useSubscriptionStore = create<SubscriptionStore>(set => ({
  yesPlan: 'price_1O2KKTDud2nVdnbnF0aAHFFy',
  setYesPlan: yesPlan => set({ yesPlan }),
  absolutelyPlan: 'price_1O2KhqDud2nVdnbnn0pVhFKG',
  setAbsolutelyPlan: absolutelyPlan => set({ absolutelyPlan }),
}))
