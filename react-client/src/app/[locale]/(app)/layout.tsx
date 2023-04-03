import AppNavbar from '@/components/Layout/AppNavbar'
import AppHeader from '@/components/Layout/AppHeader'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <div className="grid h-[calc(100vh-64px)] grid-cols-[50px_1fr] lg:grid-cols-[200px_1fr]">
        <div className="z-40 shadow-[8px_0px_10px_0px_rgba(0,0,0,0.02)]">
          <AppNavbar />
        </div>
        <main className="bg-[#eef1f6] dark:bg-[#1c1a25]">{children}</main>
      </div>
    </>
  )
}
