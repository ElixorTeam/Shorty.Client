'use client'

import { useState } from 'react'

import BarChart from '@/components/Charts/BarChart'
import ChartCategoryMenu from '@/components/Dialogs/ChartCategoryMenu'
import getRandomInt from '@/utils/getRandomInt'
import prepareChartData from '@/utils/prepareChartData'

export default function DeviceOsBrowserChartWrapper() {
  const categories = ['Devices', 'OS', 'Browser']
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const barChartData = prepareChartData({
    Phone: getRandomInt(100),
    Android: getRandomInt(100),
    MacOS: getRandomInt(100),
    Linux: getRandomInt(100),
  })
  return (
    <div className="flex h-full w-full flex-col overflow-hidden px-6 py-4">
      <div className="mb-2 flex w-full justify-between">
        <p className="text-2xl font-semibold text-stone-800 dark:text-neutral-300">
          Device statistics
        </p>
        <ChartCategoryMenu
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="h-full w-full overflow-hidden">
        <BarChart data={barChartData} />
      </div>
    </div>
  )
}
