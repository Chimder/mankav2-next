import AsideBar from '../aside-bar'
import s from './main-layouts.module.css'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <nav className={s.container}>
      <AsideBar />
      <main>{children}</main>
    </nav>
  )
}
