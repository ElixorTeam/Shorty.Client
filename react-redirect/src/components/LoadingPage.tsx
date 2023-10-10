import LoadingSpinner from '@/components/LoadingSpinner'

export default function LoadingPage() {
  return (
    <div className="flex items-center gap-4">
      <LoadingSpinner />
      <p className="animate-pulse">Loading...</p>
    </div>
  )
}
