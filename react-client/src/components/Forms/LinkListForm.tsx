import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ChangeEvent, useState, KeyboardEvent } from 'react'
import toast from 'react-hot-toast'
import isURL from 'validator/lib/isURL'

export default function LinkListForm() {
  const [links, setLinks] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleAddLink = () => {
    if (!inputValue) {
      toast.error('Empty input')
      return
    }
    if (!isURL(inputValue)) {
      toast.error('Wrong url')
      return
    }
    setLinks([...links, inputValue])
    setInputValue('')
  }

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index))
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddLink()
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  return (
    <div className="w-full">
      <p className="mb-1 text-sm text-gray-700 dark:text-neutral-300">Links</p>
      <div className="flex h-28 w-full flex-col overflow-hidden rounded-lg border border-black/[.2] dark:border-white/[.2]">
        <div className="flex h-8 w-full items-center border-b border-b-black/[.2] dark:border-b-white/[.2]">
          <input
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="h-full w-full border-none bg-transparent pl-3 pr-1 text-sm focus:ring-0 dark:placeholder:text-neutral-700"
            placeholder="https://www.example.com"
          />
          <button type="button" onClick={handleAddLink}>
            <PlusCircleIcon className="mr-2 h-5 w-5 stroke-1 text-gray-500 hover:text-gray-800 active:text-black dark:text-neutral-400 dark:hover:text-neutral-200 dark:active:text-white" />
          </button>
        </div>
        <div className="h-full w-full overflow-y-auto bg-gray-50 scrollbar-thin dark:bg-neutral-900">
          <ul className="flex h-full flex-col gap-1 py-1">
            {links.map((item, index) => (
              <li key={item} className="last:pb-1">
                <div className="grid w-full grid-cols-[1.2rem,1fr,1rem] gap-2 pr-2 text-sm text-gray-700 dark:text-neutral-300">
                  <p className="mt-[2px] text-right text-xs">{index + 1}</p>
                  <p className="line-clamp-1">{item}</p>
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(index)}
                    className="flex h-full w-full items-center justify-center"
                  >
                    <TrashIcon className="h-3 w-3 text-red-500 hover:text-red-600 active:text-red-700" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
