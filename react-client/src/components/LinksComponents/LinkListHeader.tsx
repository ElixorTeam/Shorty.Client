import LinkSortSelect from '@/components/LinksComponents/LinkSortSelect'
import { SortOptionsType } from '@/shared/SortKeyEnum'
import LinkSearch from '@/components/LinksComponents/LinkSearch'

export default function LinkListHeader({
  sortOptions,
  placeholderText,
  searchString,
  setSearchString,
  selectedSort,
  setSelectedSort
}: {
  sortOptions: SortOptionsType[]
  placeholderText: string
  searchString: string
  setSearchString: (state: string) => void
  selectedSort: SortOptionsType
  setSelectedSort: (state: SortOptionsType) => void
}) {
  return (
    <div className="sticky top-0 z-40 flex w-full flex-col items-center bg-white dark:bg-[#23212e]">
      <div className="w-full border-b dark:border-b-white/[.1]">
        <div className="my-2 flex h-7 w-full items-center gap-2 px-4">
          <LinkSearch
            searchText={searchString}
            setSearchString={setSearchString}
            placeholderText={placeholderText}
          />
        </div>
      </div>
      <div className="w-full border-b px-10 dark:border-b-white/[.1]">
        <LinkSortSelect
          sortOptions={sortOptions}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
      </div>
    </div>
  )
}
