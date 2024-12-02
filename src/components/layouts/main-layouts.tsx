import Header from '../aside-bar/header'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode

}) {
  return (
    <nav className="bg-white overflow-x-hidden h-screen">
      <Header />
      <main className=' bg-black'>{children}</main>
    </nav>
  )
}
