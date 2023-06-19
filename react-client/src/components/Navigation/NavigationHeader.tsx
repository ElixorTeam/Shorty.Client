import NavigationSortSelect from '@/components/Navigation/NavigationSortSelect'
import NavigationSearchBar from '@/components/Navigation/NavigationSearchBar'
import { useTranslations } from 'next-intl'

export default function NavigationHeader() {
  const t = useTranslations('app')
  const sortSelectTranslation = {
    sortKeyName: t('sortKeyName'),
    sortKeyDate: t('sortKeyDate')
  }
  return (
    <header className="sticky top-0 z-40 flex w-full flex-col items-center bg-white dark:bg-[#23212e]">
      <div className="w-full border-b dark:border-b-white/[.1]">
        <div className="my-2 flex h-7 w-full items-center gap-2 px-4">
          <NavigationSearchBar placeholderText={t('linkSearch')} />
        </div>
      </div>
      <div className="w-full border-b dark:border-b-white/[.1]">
        <NavigationSortSelect translate={sortSelectTranslation} />
      </div>
    </header>
  )
}
