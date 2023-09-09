function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-r-transparent" />
    </div>
  )
}

export default function LoadingPage() {
  return (
    <div className="flex items-center gap-4">
      <LoadingSpinner />
      <p className="animate-pulse">Loading...</p>
    </div>
  )
}
