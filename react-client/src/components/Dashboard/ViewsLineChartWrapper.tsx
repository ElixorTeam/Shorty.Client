'use client'

import { useState } from 'react'

import LineChart from '@/components/Charts/LineChart'
import ChartCategoryMenu from '@/components/Dialogs/ChartCategoryMenu'

export default function ViewsLineChartWrapper() {
  const categories = ['Day', 'Week', 'Month', 'Year']
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  return (
    <div className="flex h-full w-full flex-col overflow-hidden px-6 py-4">
      <div className="mb-4 flex w-full justify-between">
        <p className="text-2xl font-semibold text-stone-800 dark:text-neutral-300">
          Views statistics
        </p>
        <ChartCategoryMenu
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
      </div>
      <div className="h-full w-full">
        <LineChart />
      </div>
    </div>
  )
}
