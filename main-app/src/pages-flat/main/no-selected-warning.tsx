export default function NoSelectedWarning() {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <div className="w-full max-w-xs px-2">
        <p className="text-center leading-relaxed">
          Please select a link. If you don’t have any, then click on{' '}
          <span className="inline-flex items-center justify-center overflow-hidden rounded-md border px-2 py-1 align-middle text-xs">
            New
          </span>
        </p>
      </div>
    </div>
  )
}
