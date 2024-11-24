import AsideBar from '../aside-bar/aside-bar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <nav className="bg-black w-screen">
      <AsideBar />
      <main>{children}</main>
    </nav>
  )
}
