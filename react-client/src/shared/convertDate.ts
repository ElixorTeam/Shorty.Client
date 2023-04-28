export function convertDateTime(utcString: string) {
  return new Date(utcString).toLocaleString()
}

export function convertDate(utcString: string) {
  return new Date(utcString).toLocaleDateString()
}
