import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { createSelectors } from './create-selectors'

export type Persone = {
  id?: number
  type?: 'character' | 'voices'
}

export type PersoneAction = {
  setPersone: (id?: number, type?: 'character' | 'voices') => void
  resetPersone: () => void
}
export const personeStore = create<Persone & PersoneAction>()(
  immer(set => ({
    id: undefined,
    type: 'character',
    setPersone: (id, type) => {
      set(state => {
        state.id = id
        state.type = type
      })
    },
    resetPersone: () => {
      set(state => {
        state.id = undefined
        state.type = 'character'
      })
    },
  })),
)

export const usePersoneStore = createSelectors(personeStore)
