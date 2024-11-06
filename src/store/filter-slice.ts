import { create } from 'zustand'
import { redux } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { tagsApi } from '@/hooks/tag'

import { createSelectors } from './create-Selectors'

export type Filter = {
  input: string
  sortBy: string
  tags: string[]
  languages: string
  status: string
}

export type FilterAction = Filter & {
  setInpute: (text: string) => void
  setFilter: (key: keyof Filter, value: string) => void
}

export const filterStore = create<FilterAction>()(
  immer((set, get) => ({
    languages: '',
    sortBy: '',
    status: '',
    input: '',
    tags: [],
    setFilter: (key, value) => {
      set(state => {
        if (key === 'tags') {
          const include = state.tags.includes(value)
          state.tags = include
            ? state.tags.filter(t => t !== value)
            : [...state.tags, value]
        } else {
          state[key] = value as string
        }
      })
    },
    setInpute: (text: string) => {
      set({ input: text })
    },
  })),
)

export const useFilterStore = createSelectors(filterStore)
