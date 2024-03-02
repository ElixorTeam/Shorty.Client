const getFormattedDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
  }

  if (date.getFullYear() !== new Date().getFullYear()) options.year = '2-digit'
  return date.toLocaleDateString('en-US', options)
}

export default getFormattedDate
