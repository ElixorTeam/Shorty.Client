import HomeHeader from '@/components/Layout/HomeHeader'

export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HomeHeader />
      <div className="mx-auto h-[calc(100vh-64px)] max-w-screen-xl">
        {children}
      </div>
    </>
  )
}
