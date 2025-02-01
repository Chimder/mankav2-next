import { LocalizedString } from '../api/mangadex/generated'

export function getFirstTitle(title?: LocalizedString) {
  if (title?.en) {
    return title.en
  }
  if (title && title['ja-ro']) {
    return title['ja-ro']
  }
  if (title && typeof title === 'object') {
    const val = Object.values(title)
    return val.length > 0 ? val[0] : undefined
  }
}
