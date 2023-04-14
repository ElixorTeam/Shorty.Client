export default function convertDate(utcString: string) {
  return new Date(utcString).toLocaleDateString()
}
