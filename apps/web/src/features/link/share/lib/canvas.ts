const downloadCanvas = async (
  canvas: HTMLCanvasElement,
  filename: string,
  mimeType: string = 'image/png',
  quality?: number
) => {
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, mimeType, quality)
  })
  if (!blob) throw new Error('Failed to create blob from canvas')

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()

  URL.revokeObjectURL(url)
  link.remove()
}

const copyCanvasToClipboard = async (canvas: HTMLCanvasElement) => {
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/png')
  })
  if (!blob) throw new Error('Failed to create blob from canvas')

  await navigator.clipboard.write([
    new ClipboardItem({
      [blob.type]: blob,
    }),
  ])
}

export { copyCanvasToClipboard, downloadCanvas }
