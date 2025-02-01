import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { createSelectors } from './create-selectors'

export type Chapter = {
  chaptersLanguage?: string
}

export type chapterAction = Chapter & {
  setChapterLanguage: (text?: string) => void
}

export const chapterStore = create<chapterAction>()(
  immer((set, get) => ({
    chaptersLanguage: undefined,
    setChapterLanguage: text => {
      set(state => {
        state.chaptersLanguage = text
      })
    },
  })),
)

export const useChapterStore = createSelectors(chapterStore)
