import AsideBar from "../aside-bar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <AsideBar />
        <main>{children}</main>
    </>
  );
}
