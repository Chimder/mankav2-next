import { GetSearchMangaParams } from '@/shared/api/mangadex/generated'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { createSelectors } from './create-selectors'

type sortByObj = {
  order?: string
  type?: any
}

export type Filter = {
  input: string
  sortBy?: sortByObj
  tags: string[]
  languages: string
  status: string
}

export type GetSearchMangaOrderParams = Pick<
  GetSearchMangaParams,
  'order'
>['order']

export type FilterAction = Filter & {
  setInpute: (text: string) => void
  setFilter: (key: keyof Filter, value: string) => void
  setSortBy: ({ order, type }: sortByObj) => void
  reset: () => void
}

export const filterStore = create<FilterAction>()(
  immer(set => ({
    languages: '',
    sortBy: undefined,
    status: '',
    input: '',
    tags: [],
    setSortBy: ({ type, order }: sortByObj) => {
      set(state => {
        state.sortBy = { order, type }
      })
    },
    setFilter: (key, value) => {
      set(state => {
        if (key === 'tags') {
          console.log('ADDDED', value)
          const include = state.tags.includes(value)
          state.tags = include
            ? state.tags.filter(t => t !== value)
            : [...state.tags, value]
        } else {
          if (key !== 'sortBy') {
            state[key] = value as string
          }
        }
      })
    },
    setInpute: (text: string) => {
      set({ input: text })
    },
    reset: async () => {
      set({
        languages: '',
        sortBy: { order: 'desc', type: 'latestUploadedChapter' },
        status: '',
        input: '',
        tags: [],
      })
    },
  })),
)

export const useFilterStore = createSelectors(filterStore)
