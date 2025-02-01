import { PeopleImages } from "../api/jikan/generated";

export function getPersoneImg(img?: PeopleImages) {
  if (img?.jpg?.image_url) return img.jpg.image_url
}
