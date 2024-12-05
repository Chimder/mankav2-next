import Header from '../aside-bar/header'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <nav className="h-screen overflow-x-hidden bg-black">
      <Header />
      <main className="">{children}</main>
    </nav>
  )
}
