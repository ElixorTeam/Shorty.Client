const generateUrlPath = (length: number = 6): string => {
  const characters: string = '0123456789abcdefghijklmnopqrstuvwxyz'
  let result: string = ''

  for (let i: number = 0; i < length; i += 1) {
    const randomIndex: number = Math.floor(Math.random() * characters.length)
    const randomCharacter: string = characters.charAt(randomIndex)
    result += randomCharacter
  }

  return result
}

export default generateUrlPath
