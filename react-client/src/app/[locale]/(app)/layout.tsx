import AppNavbar from '@/components/Layout/AppNavbar'
import AppHeader from '@/components/Layout/AppHeader'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1920px] m-auto">
      <AppHeader />
      <div className="grid h-[calc(100vh-64px)] grid-cols-[50px_1fr] overflow-hidden lg:grid-cols-[200px_1fr]">
        <div className="z-40">
          <AppNavbar />
        </div>
        <main className="bg-[#eef1f6] dark:bg-[#1c1a25]">{children}</main>
      </div>
    </div>
  )
}
