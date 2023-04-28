export default function GroupInput({
  value,
  label
}: {
  value: string
  label: string
}) {
  return (
    <div className="flex flex-nowrap items-stretch">
      <span
        className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 bg-neutral-100 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:bg-black/[.20] dark:text-neutral-200 dark:placeholder:text-neutral-200"
        id="addon-wrapping"
      >
        {label}
      </span>
      <input
        type="text"
        value={value}
        readOnly
        className="relative m-0 block w-1 min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
        aria-label="Username"
        aria-describedby="addon-wrapping"
      />
    </div>
  )
}
