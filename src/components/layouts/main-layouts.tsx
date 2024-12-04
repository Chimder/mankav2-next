import Header from '../aside-bar/header'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <nav className="h-screen overflow-x-hidden bg-white">
      <Header />
      <main className="bg-black">{children}</main>
    </nav>
  )
}
