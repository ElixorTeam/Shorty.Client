const calculateTotal = (data: Record<string, number>): number =>
  Object.values(data).reduce((acc, value) => acc + value, 0)

const filterLabels = (
  data: Record<string, number>,
  total: number
): Set<string> =>
  new Set(Object.keys(data).filter((label) => data[label] / total >= 0.05))

const calculateOthersSum = (
  data: Record<string, number>,
  labels: Set<string>
): number =>
  Object.entries(data)
    .filter(([label]) => !labels.has(label))
    .reduce((acc, [, value]) => acc + value, 0)

const prepareChartData = (
  data: Record<string, number>
): Record<string, number> => {
  const total = calculateTotal(data)
  const labels = filterLabels(data, total)
  const othersSum = calculateOthersSum(data, labels)
  const newData = Object.fromEntries(
    Object.entries(data).filter(([label]) => labels.has(label))
  )
  if (othersSum > 0) newData.Others = othersSum
  return newData
}

export default prepareChartData
