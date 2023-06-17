import LinkSortSelect from '@/components/LinksComponents/LinkSortSelect'
import LinkSearch from '@/components/LinksComponents/LinkSearch'

export default function LinkListHeader({
  translate
}: {
  translate: { [_: string]: string }
}) {
  return (
    <div className="sticky top-0 z-40 flex w-full flex-col items-center bg-white dark:bg-[#23212e]">
      <div className="w-full border-b dark:border-b-white/[.1]">
        <div className="my-2 flex h-7 w-full items-center gap-2 px-4">
          <LinkSearch placeholderText={translate.linkSearch} />
        </div>
      </div>
      <div className="w-full border-b dark:border-b-white/[.1]">
        <LinkSortSelect translate={translate} />
      </div>
    </div>
  )
}
