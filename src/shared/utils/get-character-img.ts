import { CharacterImages } from "../api/jikan/generated";

export function getCharacterImg(img?: CharacterImages) {
  return img?.jpg?.image_url ?? undefined
}
