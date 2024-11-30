import AsideBar from '../aside-bar/aside-bar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <nav className="bg-black overflow-x-hidden h-screen">
      <AsideBar />
      <main className=' bg-black'>{children}</main>
    </nav>
  )
}
