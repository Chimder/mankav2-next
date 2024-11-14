import Link from 'next/link'

import s from './aside-bar.module.css'

export default function AsideBar() {
  return (
    <>
      <div className={s.container}>
        <Link href={`/search`}>Find Manga</Link>
        {/* <Link href={}></Link>
      <Link href={}></Link> */}
      </div>
    </>
  )
}
