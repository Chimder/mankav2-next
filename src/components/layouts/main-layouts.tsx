import Header from '../header/header'

export default function MainLayout({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <nav className="bg-black">
      <Header />
      <main className="h-full">{children}</main>
    </nav>
  )
}
