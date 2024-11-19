import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { createSelectors } from './create-Selectors'

export type Card = {
  type: 'boxes' | 'two'
}

export type CardSwitcherAction = Card & {
  setCardSwitcher: (text: 'boxes' | 'two') => void
}

export const CardSwitcherStore = create<CardSwitcherAction>()(
  persist(
    immer(set => ({
      type: 'boxes',
      setCardSwitcher: text => {
        set(state => {
          state.type = text
        })
      },
    })),
    {
      name: 'CardSwitcher',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useCardSwitcherStore = createSelectors(CardSwitcherStore)
